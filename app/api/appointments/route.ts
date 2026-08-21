import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Appointment } from "@/lib/models/Appointment";
import "@/lib/models/PatientProfile";
import "@/lib/models/User";

// GET /api/appointments?providerId=xxx or ?patientId=xxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const providerId = searchParams.get("providerId");
    const patientId = searchParams.get("patientId");

    await connectToDatabase();

    const query: any = {};
    if (providerId) query.providerId = providerId;
    if (patientId) query.patientId = patientId;

    // Populate patient info for the provider's view
    const appointments = await Appointment.find(query)
      .populate("patientId", "firstName lastName")
      .sort({ date: 1 });

    return NextResponse.json(appointments);
  } catch (error: any) {
    console.error("Fetch appointments error:", error?.message || error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/appointments
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { providerId, patientId, date, time, type, notes } = body;

    if (!providerId || !patientId || !date || !time || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    // Combine date and time into a single Date object
    const dateTimeString = `${date}T${time}:00`;
    const appointmentDate = new Date(dateTimeString);

    const newAppointment = await Appointment.create({
      providerId,
      patientId,
      date: appointmentDate,
      type,
      notes,
      status: "scheduled",
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error: any) {
    console.error("Create appointment error:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
