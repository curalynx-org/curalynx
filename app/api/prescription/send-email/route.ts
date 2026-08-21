import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generatePrescriptionPdfBuffer } from "@/lib/generate-prescription-pdf";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      patientId = "6A882CBD",
      patientName = "Rahul Sharma",
      patientGender = "M",
      patientAge = "25",
      patientMobile = "+91 98450 12849",
      patientAddress = "B/503 Medical Arts Complex, Sector 44, Bengaluru",
      patientWeight = "72",
      patientHeight = "176",
      patientBmi = "23.24",
      patientBp = "120/80 mmHg",
      patientEmail = "abhay.24305@knit.ac.in",
      doctorName = "Dr. Vivek Vardhan",
      doctorQual = "M.B.B.S., M.D. (Internal Medicine)",
      doctorReg = "MMC 2018 / KMC 84729",
      dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      medicines = [],
      tests = [],
      schedules = {},
      documentHtml = "",
      docMode = "rx",
      pdfBase64 = "",
    } = body;

    // Hardcode recipient target as requested by user
    const recipientEmail = "abhay.24305@knit.ac.in";

    const host = process.env.EMAIL_HOST || "email-smtp.us-east-1.amazonaws.com";
    const port = Number(process.env.EMAIL_PORT) || 587;
    const user = process.env.EMAIL_USER || "AKIA5ILH5LATLZBXI7Y5";
    const pass = process.env.EMAIL_PASS || "BLBHJokfvwU6qMENaiPOXFVC8XX4dkcJJO1wJ9UpK4by";
    const fromAddress = process.env.EMAIL_FROM || "admin@ptsc.app";
    const fromHeader = `"Curalynx" <${fromAddress}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // 587 uses STARTTLS
      auth: {
        user,
        pass,
      },
    });

    // Build plain text summary
    const medLines = medicines.map((m: any, idx: number) => {
      const sch = schedules[m.name] || { morning: 1, afternoon: 0, night: 1, food: "After Food", duration: "5 Days" };
      return `${idx + 1}. ${m.name} — ${sch.morning}-${sch.afternoon}-${sch.night} (${sch.food}) for ${sch.duration}`;
    });

    const testLines = tests.map((t: any, idx: number) => `${idx + 1}. ${t.name} (${t.urgency || "Routine"})`);

    const emailSubject = docMode === "lab_order"
      ? `Diagnostic Lab Requisition PDF — ${patientName} (Ref: CX-${patientId.slice(0, 8).toUpperCase()})`
      : `Official Medical Prescription PDF — ${patientName} (Ref: CX-${patientId.slice(0, 8).toUpperCase()})`;

    const emailText = `
Dear ${patientName},

Please find your official ${docMode === "lab_order" ? "diagnostic lab investigation requisition" : "medical prescription"} attached as a PDF document from ${doctorName} (${doctorQual}) at CuraLynx Hospital.

Consultation Date: ${dateStr}
Patient ID: CX-${patientId.slice(0, 8).toUpperCase()}
Consultant: ${doctorName} | Reg. No: ${doctorReg}
Hospital: CuraLynx Hospital, Bengaluru

${docMode === "lab_order" ? `ORDERED DIAGNOSTIC INVESTIGATIONS:\n${testLines.join("\n") || "No tests ordered."}` : `PRESCRIBED MEDICATIONS:\n${medLines.join("\n") || "No medications prescribed."}`}

${docMode === "rx" && testLines.length > 0 ? `\nRECOMMENDED INVESTIGATIONS:\n${testLines.join("\n")}` : ""}

ADVICE & CLINICAL INSTRUCTIONS:
• Take adequate rest and stay hydrated.
• Take all medications strictly according to the specified food timing and schedule.
• If any adverse reaction or allergy occurs, contact the hospital immediately.

* Attached PDF File contains your complete official letterhead document with doctor's authorization.

* DISCLAIMER: This computer-generated document is valid only after doctor's physical signature and clinic stamp.

Wishing you good health and a speedy recovery!

Warm regards,
Curalynx Health Platform
Central Support: +91 98450 12849
`.trim();

    // Clean HTML email template
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f8; margin: 0; padding: 24px; color: #18181a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0B392A; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0 0 4px 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 0; font-size: 12px; opacity: 0.85; }
    .body { padding: 24px; }
    .meta-box { background: #fdfbf2; border: 1px solid #e5e5e5; border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
    .pdf-badge { background: #e0f2fe; border: 1px solid #bae6fd; color: #0369a1; padding: 10px 14px; border-radius: 8px; font-size: 12px; font-weight: bold; margin-bottom: 18px; display: block; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 20px; font-size: 13px; }
    .table th { background: #f4f4f5; text-align: left; padding: 10px; border-bottom: 2px solid #18181a; font-size: 11px; text-transform: uppercase; }
    .table td { padding: 10px; border-bottom: 1px solid #e4e4e7; vertical-align: top; }
    .disclaimer { font-size: 11px; color: #dc2626; font-weight: bold; text-transform: uppercase; margin-top: 20px; line-height: 1.5; border-top: 1px solid #e4e4e7; padding-top: 12px; }
    .footer { background: #fafafa; padding: 16px; text-align: center; font-size: 11px; color: #71717a; border-top: 1px solid #e4e4e7; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>CuraLynx Hospital</h1>
      <p>Official ${docMode === "lab_order" ? "Diagnostic Lab Requisition Slip" : "Clinical Medical Prescription"}</p>
    </div>
    <div class="body">
      <div class="pdf-badge">
        📎 Official PDF Document Attached: ${docMode === "lab_order" ? "Diagnostic_Lab_Requisition.pdf" : "Medical_Prescription.pdf"}
      </div>

      <div class="meta-box">
        <strong>Patient Name:</strong> ${patientName} &nbsp;|&nbsp; <strong>UHID:</strong> CX-${patientId.slice(0, 8).toUpperCase()}<br>
        <strong>Date:</strong> ${dateStr} &nbsp;|&nbsp; <strong>Doctor:</strong> ${doctorName} (${doctorQual})<br>
        <strong>Diagnosis:</strong> Allergic Rhinosinusitis
      </div>

      <h3 style="font-size: 15px; margin: 0 0 8px 0; color: #0B392A;">
        ${docMode === "lab_order" ? "Ordered Diagnostic Investigations" : "Prescribed Pharmacotherapy (Rx)"}
      </h3>

      ${
        docMode === "lab_order"
          ? `<table class="table">
              <thead><tr><th>#</th><th>Investigation</th><th>Department</th><th>Priority</th></tr></thead>
              <tbody>
                ${tests.map((t: any, i: number) => `<tr><td>${i + 1}</td><td><strong>${t.name}</strong></td><td>${t.category || "Pathology"}</td><td><span style="color:#0284c7;font-weight:bold;">${t.urgency || "Routine"}</span></td></tr>`).join("")}
              </tbody>
            </table>`
          : `<table class="table">
              <thead><tr><th>#</th><th>Medicine Name</th><th>Dosage Schedule</th><th>Duration</th></tr></thead>
              <tbody>
                ${medicines.map((m: any, i: number) => {
                  const sch = schedules[m.name] || { morning: 1, afternoon: 0, night: 1, food: "After Food", duration: "5 Days" };
                  return `<tr><td>${i + 1}</td><td><strong>${m.name}</strong><br><span style="font-size:11px;color:#71717a;">${m.category || "Oral Therapeutic"}</span></td><td>${sch.morning}-${sch.afternoon}-${sch.night} (${sch.food})</td><td>${sch.duration}</td></tr>`;
                }).join("")}
              </tbody>
            </table>`
      }

      <div class="disclaimer">
        * THIS COMPUTER-GENERATED PRESCRIPTION IS VALID ONLY AFTER THE DOCTOR'S PHYSICAL SIGNATURE AND CLINIC STAMP.
      </div>
    </div>
    <div class="footer">
      Sent securely via CuraLynx Healthcare Platform • Questions? Call +91 98450 12849
    </div>
  </div>
</body>
</html>
`.trim();

    // Generate real Vector PDF buffer
    let pdfBuffer: Buffer;
    if (pdfBase64) {
      pdfBuffer = Buffer.from(pdfBase64.replace(/^data:application\/pdf;base64,/, ""), "base64");
    } else {
      pdfBuffer = await generatePrescriptionPdfBuffer({
        patientId,
        patientName,
        patientGender,
        patientAge,
        patientMobile,
        patientAddress,
        patientWeight,
        patientHeight,
        patientBmi,
        patientBp,
        doctorName,
        doctorQual,
        doctorReg,
        dateStr,
        medicines,
        tests,
        schedules,
        docMode,
      });
    }

    const pdfFileName = `${docMode === "lab_order" ? "Diagnostic_Lab_Requisition" : "Prescription"}_${patientName.replace(/\s+/g, "_")}_CX${patientId.slice(0, 6).toUpperCase()}.pdf`;

    // Send email via Amazon SES SMTP with PDF Attachment
    const info = await transporter.sendMail({
      from: fromHeader,
      to: recipientEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      recipient: recipientEmail,
      attachedPdf: pdfFileName,
    });
  } catch (error: any) {
    console.error("Error sending prescription email with PDF attachment via SES:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}

