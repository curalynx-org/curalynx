import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import { PatientProfile } from "@/lib/models/PatientProfile";
import { Appointment } from "@/lib/models/Appointment";
import { Record } from "@/lib/models/Record";

export async function POST() {
  try {
    await connectToDatabase();

    // 1. Wipe existing data
    await User.deleteMany({});
    await PatientProfile.deleteMany({});
    await Appointment.deleteMany({});
    await Record.deleteMany({});

    // 2. Seed Provider
    const provider = await User.create({
      email: "doctor@clinic.com",
      passwordHash: "password123",
      role: "provider",
      firstName: "Aarav",
      lastName: "Desai",
    });

    // 3. Seed Realistic Indian Patients
    const patientsData = [
      { firstName: "Aarushi", lastName: "Verma", dob: "1992-05-14", gender: "Female", phone: "+91 98765 43210", history: ["Chronic Migraine", "Hypothyroidism"], meds: ["Thyroxine 50mcg"] },
      { firstName: "Rajesh", lastName: "Iyer", dob: "1978-11-22", gender: "Male", phone: "+91 99887 76655", history: ["Type 2 Diabetes Mellitus", "Hypertension"], meds: ["Metformin 1000mg", "Amlodipine 5mg"] },
      { firstName: "Neha", lastName: "Kapoor", dob: "1985-02-09", gender: "Female", phone: "+91 98123 45678", history: ["Polycystic Ovary Syndrome (PCOS)"], meds: ["Myo-inositol"] },
      { firstName: "Sunil", lastName: "Gavaskar", dob: "1960-08-30", gender: "Male", phone: "+91 91234 56789", history: ["Osteoarthritis", "Coronary Artery Disease"], meds: ["Atorvastatin 20mg", "Aspirin 75mg"] },
      { firstName: "Kavita", lastName: "Reddy", dob: "1988-04-12", gender: "Female", phone: "+91 97654 32109", history: ["Asthma"], meds: ["Budesonide/Formoterol Inhaler"] },
      { firstName: "Vivek", lastName: "Sharma", dob: "1995-12-01", gender: "Male", phone: "+91 98989 89898", history: ["Acid Reflux", "Anxiety"], meds: ["Pantoprazole 40mg"] },
      { firstName: "Meera", lastName: "Joshi", dob: "1975-07-19", gender: "Female", phone: "+91 95555 44444", history: ["Rheumatoid Arthritis"], meds: ["Methotrexate 15mg"] },
      { firstName: "Arjun", lastName: "Nair", dob: "2001-09-05", gender: "Male", phone: "+91 93333 22222", history: ["Allergic Rhinitis"], meds: ["Fexofenadine 120mg"] }
    ];

    const patients = [];
    for (const p of patientsData) {
      const patient = await PatientProfile.create({
        providerId: provider._id,
        firstName: p.firstName,
        lastName: p.lastName,
        dateOfBirth: new Date(p.dob),
        gender: p.gender,
        contactNumber: p.phone,
        medicalHistory: p.history,
        activeMedications: p.meds,
      });
      patients.push(patient);
    }

    const now = new Date();
    
    // 4. Seed Appointments
    await Appointment.create([
      {
        providerId: provider._id,
        patientId: patients[0]._id, // Aarushi
        date: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        type: "followup",
        status: "scheduled",
        notes: "Migraine frequency check. Evaluate response to new SOS medication.",
      },
      {
        providerId: provider._id,
        patientId: patients[1]._id, // Rajesh
        date: new Date(now.getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
        type: "checkup",
        status: "scheduled",
        notes: "Routine quarterly diabetes and BP monitoring.",
      },
      {
        providerId: provider._id,
        patientId: patients[4]._id, // Kavita
        date: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        type: "consultation",
        status: "scheduled",
        notes: "Asthma exacerbation due to seasonal changes. Needs inhaler review.",
      },
      {
        providerId: provider._id,
        patientId: patients[2]._id, // Neha
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        type: "consultation",
        status: "completed",
        notes: "Discuss ultrasound reports and menstrual cycle regularity.",
      },
      {
        providerId: provider._id,
        patientId: patients[3]._id, // Sunil
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        type: "followup",
        status: "completed",
        notes: "Severe knee pain. Recommended physiotherapy.",
      }
    ]);

    // 5. Seed Records
    await Record.create([
      {
        patientId: patients[1]._id, // Rajesh
        providerId: provider._id,
        type: "lab_result",
        title: "Fasting Blood Sugar & HbA1c",
        content: "HbA1c: 7.2% (Target < 7%). Fasting BG: 145 mg/dL. Renal profile within normal limits. Lipid profile shows mildly elevated LDL (130 mg/dL).",
        date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[1]._id, // Rajesh
        providerId: provider._id,
        type: "prescription",
        title: "Prescription: Diabetes Management",
        content: "1. Tab Metformin 1000mg Sustained Release OD\n2. Tab Amlodipine 5mg OD\n3. Cap Rosuvastatin 10mg HS\nAdvice: Strict diabetic diet, daily 30 min brisk walk.",
        date: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        patientId: patients[0]._id, // Aarushi
        providerId: provider._id,
        type: "soap_note",
        title: "SOAP: Chronic Migraine Follow-up",
        content: JSON.stringify({
          subjective: "Patient reports 3 migraine attacks in the last month, each lasting >24 hours. Photophobia and nausea present.",
          objective: "Vitals: BP 110/70. Neurological examination: Unremarkable. No focal deficits.",
          assessment: "Chronic Migraine without aura. Suboptimal control on current prophylactic regimen.",
          plan: "1. Start Tab Amitriptyline 10mg HS. \n2. Tab Naproxen 500mg SOS for acute attacks. \n3. Maintain headache diary. Review in 1 month."
        }),
        date: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      },
      {
        patientId: patients[3]._id, // Sunil
        providerId: provider._id,
        type: "prescription",
        title: "Prescription: Orthopedic",
        content: "1. Tab Etoricoxib 90mg OD for 5 days.\n2. Cap Omeprazole 20mg BBF for 5 days.\n3. Apply Diclofenac gel locally twice daily.\nReferral to physiotherapy for knee strengthening exercises.",
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      }
    ]);

    return NextResponse.json({ message: "Database seeded successfully with rich Indian data!" });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
