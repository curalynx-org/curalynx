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
      patientEmail = "uuu202331@gmail.com",
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
    const recipientEmail = "uuu202331@gmail.com";

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

    // Build professional plain text summary
    const medLines = medicines.map((m: any, idx: number) => {
      const sch = schedules[m.name] || { morning: 1, afternoon: 0, night: 1, food: "After Food", duration: "5 Days" };
      return `  • ${m.name} — ${sch.morning}-${sch.afternoon}-${sch.night} (${sch.food}) for ${sch.duration}`;
    });

    const testLines = tests.map((t: any, idx: number) => `  • ${t.name} (${t.urgency || "Routine"})`);

    const isLab = docMode === "lab_order";
    const emailSubject = isLab
      ? `Diagnostic Lab Requisition — ${patientName} | CuraLynx Hospital`
      : `Medical Prescription & Consultation Summary — ${patientName} | CuraLynx Hospital`;

    const emailText = `
Dear ${patientName},

Thank you for visiting CuraLynx Hospital today. Please find your official ${isLab ? "diagnostic lab investigation requisition" : "medical prescription"} attached as a PDF document (${isLab ? "Diagnostic_Lab_Requisition.pdf" : "Medical_Prescription.pdf"}).

CONSULTATION DETAILS:
• Patient Name: ${patientName}
• Patient ID: CX-${patientId.slice(0, 8).toUpperCase()}
• Date of Visit: ${dateStr}
• Consulting Doctor: ${doctorName} (${doctorQual})
• Medical Registration: ${doctorReg}
• Diagnosis: Allergic Rhinosinusitis

${isLab ? `ORDERED INVESTIGATIONS:\n${testLines.join("\n") || "  • No investigations ordered."}` : `PRESCRIBED MEDICATIONS:\n${medLines.join("\n") || "  • No medications prescribed."}`}

${!isLab && testLines.length > 0 ? `\nRECOMMENDED DIAGNOSTIC TESTS:\n${testLines.join("\n")}` : ""}

CARE INSTRUCTIONS:
• Follow the dosage and food timings strictly as prescribed.
• Take adequate rest and maintain hydration.
• If symptoms persist or in case of any adverse reaction, please contact us immediately.

Follow-up: 7 Days (or SOS)

Warm regards,
Department of Internal Medicine
CuraLynx Hospital
B/503 Medical Arts Complex, Sector 44, Bengaluru - 560038
Contact: +91 98450 12849 | support@curalynx.com
`.trim();

    // Professional, clean Hospital HTML email template
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f4f5f7; padding: 32px 16px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .header-bar { background-color: #0B392A; padding: 24px 28px; text-align: left; }
    .brand-title { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.3px; }
    .brand-sub { color: #86efac; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
    .content { padding: 28px; }
    .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 10px 0; }
    .intro-text { font-size: 13.5px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
    .attachment-card { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; display: flex; align-items: center; }
    .attachment-text { font-size: 12.5px; font-weight: 600; color: #166534; }
    .meta-table { width: 100%; border-collapse: collapse; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px; }
    .meta-td { padding: 10px 14px; font-size: 12px; border-bottom: 1px solid #e2e8f0; }
    .meta-label { color: #64748b; font-weight: 600; width: 35%; }
    .meta-val { color: #0f172a; font-weight: 700; }
    .section-heading { font-size: 13px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 10px 0; border-bottom: 2px solid #0B392A; padding-bottom: 4px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12.5px; }
    .data-th { background-color: #f1f5f9; color: #334155; font-weight: 700; text-align: left; padding: 9px 12px; border-bottom: 1px solid #cbd5e1; font-size: 11px; text-transform: uppercase; }
    .data-td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; color: #1e293b; }
    .med-name { font-weight: 700; color: #0f172a; }
    .med-gen { font-size: 10.5px; color: #64748b; margin-top: 2px; }
    .notes-box { background-color: #fafafa; border-left: 3px solid #0B392A; padding: 12px 16px; margin: 20px 0; }
    .notes-title { font-size: 12px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }
    .notes-list { margin: 0; padding-left: 18px; font-size: 12px; color: #475569; line-height: 1.6; }
    .disclaimer-text { font-size: 10.5px; color: #dc2626; font-weight: 700; line-height: 1.5; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 12px; text-transform: uppercase; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; font-size: 11px; color: #64748b; line-height: 1.6; }
    .footer strong { color: #334155; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Hospital Header -->
      <div class="header-bar">
        <h1 class="brand-title">CuraLynx Hospital</h1>
        <div class="brand-sub">Department of Internal Medicine • Outpatient Consultation</div>
      </div>

      <!-- Main Content -->
      <div class="content">
        <h2 class="greeting">Dear ${patientName},</h2>
        <p class="intro-text">
          Thank you for visiting CuraLynx Hospital. Below is the summary of your consultation with <strong>${doctorName}</strong> on <strong>${dateStr}</strong>. Your official signed prescription has also been attached to this email.
        </p>

        <!-- PDF Attachment Notification -->
        <div class="attachment-card">
          <div class="attachment-text">
            📎 Attached: ${isLab ? "Diagnostic_Lab_Requisition.pdf" : "Medical_Prescription.pdf"} (Official Signed Document)
          </div>
        </div>

        <!-- Consultation Metadata -->
        <table class="meta-table">
          <tr>
            <td class="meta-td meta-label">Patient ID / UHID</td>
            <td class="meta-td meta-val">CX-${patientId.slice(0, 8).toUpperCase()}</td>
          </tr>
          <tr>
            <td class="meta-td meta-label">Consulting Physician</td>
            <td class="meta-td meta-val">${doctorName} (${doctorQual})</td>
          </tr>
          <tr>
            <td class="meta-td meta-label">Registration Number</td>
            <td class="meta-td meta-val">${doctorReg}</td>
          </tr>
          <tr>
            <td class="meta-td meta-label">Date of Consultation</td>
            <td class="meta-td meta-val">${dateStr}</td>
          </tr>
          <tr>
            <td class="meta-td meta-label" style="border-bottom: none;">Clinical Impression</td>
            <td class="meta-td meta-val" style="border-bottom: none; color: #0369a1;">Allergic Rhinosinusitis</td>
          </tr>
        </table>

        <!-- Prescribed Items Table -->
        <div class="section-heading">
          ${isLab ? "Ordered Diagnostic Investigations" : "Prescribed Medications"}
        </div>

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

        <!-- Clinical Instructions -->
        <div class="notes-box">
          <div class="notes-title">Clinical Guidance & Instructions:</div>
          <ul class="notes-list">
            <li>Take all medications strictly as directed with appropriate food timing.</li>
            <li>Ensure adequate rest and maintain hydration throughout recovery.</li>
            <li>Follow-up consultation recommended in 7 days or earlier if needed.</li>
          </ul>
        </div>

        <div class="disclaimer-text">
          * This computer-generated document is valid only after the doctor's physical signature and clinic stamp.
        </div>
      </div>

      <!-- Hospital Footer -->
      <div class="footer">
        <strong>CuraLynx Hospital</strong> • B/503 Medical Arts Complex, Sector 44, Bengaluru - 560038<br>
        Helpline: +91 98450 12849 • Email: support@curalynx.com<br>
        <span style="font-size: 10px; color: #94a3b8; display: block; margin-top: 6px;">
          Confidentiality Notice: This medical record is intended solely for the patient named above.
        </span>
      </div>
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

