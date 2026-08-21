import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { PatientProfile } from "@/lib/models/PatientProfile";

// GET /api/patients?providerId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const providerId = searchParams.get("providerId");

    await connectToDatabase();

    const query = providerId ? { providerId } : {};
    const patients = await PatientProfile.find(query).sort({ updatedAt: -1 });

    return NextResponse.json(patients);
  } catch (error: any) {
    console.error("Fetch patients error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

// POST /api/patients
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { providerId, firstName, lastName, dateOfBirth, gender, contactNumber, medicalHistory, activeMedications } = body;

    if (!providerId || !firstName || !lastName || !dateOfBirth) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    const newPatient = await PatientProfile.create({
      providerId,
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      contactNumber,
      medicalHistory: medicalHistory || [],
      activeMedications: activeMedications || [],
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error: any) {
    console.error("Create patient error:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
