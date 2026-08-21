import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Record } from "@/lib/models/Record";

// GET /api/records?patientId=xxx or ?providerId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get("patientId");
    const providerId = searchParams.get("providerId");

    await connectToDatabase();

    const query: any = {};
    if (patientId) query.patientId = patientId;
    if (providerId) query.providerId = providerId;

    const records = await Record.find(query)
      .populate("patientId", "firstName lastName")
      .sort({ date: -1 });

    return NextResponse.json(records);
  } catch (error: any) {
    console.error("Fetch records error:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}
