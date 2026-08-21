"use client";

import { PatientSidebar } from "@/components/session/patient-sidebar";
import { LiveTranscript } from "@/components/session/live-transcript";
import { AIInsights } from "@/components/session/ai-insights";
import { SessionControls } from "@/components/session/session-controls";
import { useState, useRef, useEffect, useCallback } from "react";

export default function SessionPage() {
  const patientId = "demo-patient";

  const [messages, setMessages] = useState<any[]>([]);
  const [insights, setInsights] = useState<{ medicines: string[]; tests: string[] }>({
    medicines: [],
    tests: [],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-IN");

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const historyRef = useRef("");

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    historyRef.current = messages.map((m) => `${m.speaker}: ${m.text}`).join("\n");
  }, [messages]);

  const analyzeSpokenText = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || cleanText.length < 2) return;

    try {
      const res = await fetch("/api/session/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          history: historyRef.current,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages((prev) => [...prev, ...data.messages]);
        }
        if (data.insights) {
          setInsights((prev) => ({
            medicines: Array.from(
              new Set([...prev.medicines, ...(data.insights.medicines || [])])
            ),
            tests: Array.from(
              new Set([...prev.tests, ...(data.insights.tests || [])])
            ),
          }));
        }
      }
    } catch (err) {
      console.error("Speech analysis error:", err);
    }
  };

  const startSpeechRecognition = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Browser Speech Recognition is not supported on this browser. Please use Google Chrome, Microsoft Edge, or Safari."
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = selectedLang; // 'en-IN' supports Hinglish, English, Hindi words

      recognition.onresult = (event: any) => {
        const lastResultIndex = event.results.length - 1;
        const result = event.results[lastResultIndex];
        if (result && result[0]) {
          const transcriptText = result[0].transcript.trim();
          if (transcriptText) {
            analyzeSpokenText(transcriptText);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === "not-allowed") {
          alert("Microphone permission was denied. Please allow microphone access.");
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        // Auto-restart if user has not clicked stop
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
    }
  }, [selectedLang]);

  const stopSpeechRecognition = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#FDFBF2] overflow-hidden flex-col md:flex-row font-sans text-[#18181A]">
      {/* Left Sidebar - Patient Context & Extras */}
      <aside className="w-full md:w-80 lg:w-[350px] border-r border-[#18181A]/10 flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-transparent">
        <PatientSidebar />
      </aside>

      {/* Main Center Area - AI Insights */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-0 overflow-hidden bg-transparent">
        <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              if (isRecording) {
                stopSpeechRecognition();
                setTimeout(() => startSpeechRecognition(), 100);
              }
            }}
            className="bg-[#FDFBF2] border border-[#18181A]/20 text-[#18181A] text-xs font-semibold rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#18181A]"
          >
            <option value="en-IN">🇮🇳 Hinglish / English (India)</option>
            <option value="hi-IN">🇮🇳 Hindi (हिन्दी)</option>
            <option value="en-US">🇺🇸 English (US)</option>
          </select>

          <SessionControls />
        </div>

        <div className="flex-1 overflow-hidden pt-24 pb-8 px-6 sm:px-8 lg:px-12">
          <AIInsights patientId={patientId} insights={insights} />
        </div>
      </main>

      {/* Right Sidebar - Live Transcript */}
      <aside className="w-full md:w-80 lg:w-[400px] flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-[#FDFBF2] border-l border-[#18181A]/10">
        <LiveTranscript
          patientId={patientId}
          messages={messages}
          isRecording={isRecording}
          onToggleRecording={toggleRecording}
        />
      </aside>
    </div>
  );
}
