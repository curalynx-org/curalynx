import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    let rawText = "";
    let history = "";

    // Support both JSON body and FormData
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await req.json();
      rawText = (body.text || "").trim();
      history = (body.history || "").trim();
    } else {
      const formData = await req.formData();
      rawText = ((formData.get("text") as string) || "").trim();
      history = ((formData.get("history") as string) || "").trim();
    }

    if (!rawText) {
      return NextResponse.json({
        messages: [],
        insights: { medicines: [], tests: [] },
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // LLM Speaker Diarization + Clinical Extraction & Recommendation
    const prompt = `
You are Cura AI, an expert clinical diagnostic co-pilot for doctors during live patient consultations.
Analyze this spoken consultation sentence/snippet (which may be in English, Hindi, or Hinglish):

Full Conversation History:
"""
${history}
"""

New Spoken Text:
"""
${rawText}
"""

Instructions:
1. DIALOGUE:
   - Identify whether the new text was spoken by the "doctor" or the "patient" based on conversational context.
2. MEDICINES:
   - Extract any medication/prescription mentioned by name or dosage.
   - If symptoms or clinical conditions are mentioned (e.g., fever, headache, body ache, acidity, pain, cough, nausea, diabetes, BP), PROACTIVELY recommend 2-3 standard first-line medications (e.g., "Paracetamol 650mg (for fever/pain)", "Pantoprazole 40mg (antacid)", "Cetirizine 10mg").
3. TESTS:
   - Extract any diagnostic test mentioned.
   - PROACTIVELY recommend 2-3 standard diagnostic lab investigations for the discussed symptoms (e.g., "Complete Blood Count (CBC)", "Dengue NS1 / Widal Test", "BP & Temperature Charting").

Respond STRICTLY in JSON format:
{
  "messages": [
    {
      "speaker": "doctor" or "patient",
      "text": "${rawText.replace(/"/g, '\\"')}"
    }
  ],
  "medicines": ["Medicine 1 with dosage/indication", "Medicine 2"],
  "tests": ["Test 1", "Test 2"]
}
`;

    // Try available Groq models with fallback
    let llmContent = "{}";
    const candidateModels = [
      "openai/gpt-oss-20b",
      "llama-3.3-70b-versatile",
      "llama3-8b-8192",
      "qwen/qwen3.6-27b",
    ];

    for (const modelName of candidateModels) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are an intelligent clinical medical AI assistant. Always output valid JSON strictly matching the requested format.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          model: modelName,
          response_format: { type: "json_object" },
        });
        llmContent = chatCompletion.choices[0]?.message?.content || "{}";
        if (llmContent && llmContent !== "{}") break;
      } catch (err: any) {
        console.warn(`Groq model ${modelName} notice:`, err?.message);
      }
    }

    let parsedResult: any = {};
    try {
      parsedResult = JSON.parse(llmContent);
    } catch {
      parsedResult = {
        messages: [{ speaker: "doctor", text: rawText }],
        medicines: [],
        tests: [],
      };
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const rawMessages =
      parsedResult.messages ||
      parsedResult.transcript ||
      parsedResult.dialogue ||
      [];
    const formattedMessages = rawMessages
      .map((m: any, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        speaker:
          m.speaker === "doctor" || m.speaker === "patient"
            ? m.speaker
            : "patient",
        text: (typeof m === "string" ? m : m.text || rawText).trim(),
        timestamp: timeStr,
      }))
      .filter((m: any) => m.text.length > 0);

    if (formattedMessages.length === 0 && rawText.length > 0) {
      formattedMessages.push({
        id: `${Date.now()}-0`,
        speaker: "doctor",
        text: rawText,
        timestamp: timeStr,
      });
    }

    // Robust parsing for medicines array (handles strings or objects)
    const rawMeds =
      parsedResult.medicines ||
      parsedResult.medications ||
      parsedResult.suggested_medicines ||
      parsedResult.prescriptions ||
      [];
    const extractedMedicines: string[] = rawMeds
      .map((item: any) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "object" && item !== null) {
          return `${item.name || item.medicine || item.drug || ""} ${
            item.dosage || item.frequency || ""
          }`.trim();
        }
        return "";
      })
      .filter((s: string) => s.length > 0);

    // Robust parsing for tests array
    const rawTests =
      parsedResult.tests ||
      parsedResult.lab_tests ||
      parsedResult.suggested_tests ||
      parsedResult.investigations ||
      [];
    const extractedTests: string[] = rawTests
      .map((item: any) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "object" && item !== null) {
          return (item.name || item.test || item.investigation || "").trim();
        }
        return "";
      })
      .filter((s: string) => s.length > 0);

    return NextResponse.json({
      rawText,
      messages: formattedMessages,
      insights: {
        medicines: extractedMedicines,
        tests: extractedTests,
      },
    });
  } catch (error: any) {
    console.error("Error in /api/session/analyze:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze speech" },
      { status: 500 }
    );
  }
}
