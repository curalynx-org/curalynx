import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";

export interface PrescriptionPdfData {
  patientId: string;
  patientName: string;
  patientGender?: string;
  patientAge?: string;
  patientMobile?: string;
  patientAddress?: string;
  patientWeight?: string;
  patientHeight?: string;
  patientBmi?: string;
  patientBp?: string;
  doctorName?: string;
  doctorQual?: string;
  doctorReg?: string;
  dateStr?: string;
  medicines?: Array<{
    name: string;
    category?: string;
    reasoning?: string;
  }>;
  tests?: Array<{
    name: string;
    category?: string;
    urgency?: string;
  }>;
  schedules?: Record<
    string,
    {
      morning?: number;
      afternoon?: number;
      night?: number;
      food?: string;
      duration?: string;
    }
  >;
  docMode?: "rx" | "lab_order";
}

export async function generatePrescriptionPdfBuffer(
  data: PrescriptionPdfData
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  // Standard A4: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { height, width } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontSerifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const isLab = data.docMode === "lab_order";

  // Colors
  const black = rgb(0.1, 0.1, 0.1);
  const darkGreen = rgb(0.04, 0.22, 0.16); // #0B392A
  const grey = rgb(0.35, 0.35, 0.35);
  const lightGrey = rgb(0.6, 0.6, 0.6);
  const red = rgb(0.86, 0.15, 0.15); // #DC2626
  const bgBox = rgb(0.97, 0.98, 0.99);

  // Logo Embed
  const logoPath = path.join(process.cwd(), "public", "curalynx-logo.png");
  if (fs.existsSync(logoPath)) {
    try {
      const logoImageBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoImageBytes);
      page.drawImage(logoImage, {
        x: width / 2 - 25,
        y: height - 85,
        width: 50,
        height: 50,
      });
    } catch {}
  }

  // 1. HEADER (Top Y = 805)
  // Left: Doctor info
  page.drawText(data.doctorName || "Dr. Vivek Vardhan", {
    x: 40,
    y: height - 48,
    size: 13,
    font: fontBold,
    color: black,
  });

  page.drawText(data.doctorQual || "M.B.B.S., M.D. (Internal Medicine)", {
    x: 40,
    y: height - 62,
    size: 8.5,
    font: fontRegular,
    color: black,
  });

  page.drawText(`Reg. No: ${data.doctorReg || "MMC 2018 / KMC 84729"}`, {
    x: 40,
    y: height - 74,
    size: 8,
    font: fontRegular,
    color: grey,
  });

  // Right: Hospital / Lab info
  const headerRightTitle = isLab ? "CuraLynx Diagnostic Laboratories" : "CuraLynx Hospital";
  const titleWidth = fontBold.widthOfTextAtSize(headerRightTitle, 12);
  page.drawText(headerRightTitle, {
    x: width - 40 - titleWidth,
    y: height - 48,
    size: 12,
    font: fontBold,
    color: darkGreen,
  });

  const addressLine = "B/503 Medical Arts Complex, Sector 44, Bengaluru - 560038.";
  const addrWidth = fontRegular.widthOfTextAtSize(addressLine, 7.5);
  page.drawText(addressLine, {
    x: width - 40 - addrWidth,
    y: height - 62,
    size: 7.5,
    font: fontRegular,
    color: black,
  });

  const phoneLine = "Ph: +91 98450 12849 | Timing: 08:00 AM - 08:00 PM";
  const phoneWidth = fontRegular.widthOfTextAtSize(phoneLine, 7.5);
  page.drawText(phoneLine, {
    x: width - 40 - phoneWidth,
    y: height - 74,
    size: 7.5,
    font: fontRegular,
    color: grey,
  });

  // Header bottom rule
  page.drawLine({
    start: { x: 40, y: height - 95 },
    end: { x: width - 40, y: height - 95 },
    thickness: 1.5,
    color: black,
  });

  // 2. PATIENT METADATA ROW
  let curY = height - 110;

  // Date on right
  const dateText = `Date: ${data.dateStr || "22-Aug-2026"}`;
  const dateWidth = fontBold.widthOfTextAtSize(dateText, 9);
  page.drawText(dateText, {
    x: width - 40 - dateWidth,
    y: curY,
    size: 9,
    font: fontBold,
    color: black,
  });

  curY -= 16;

  const pId = data.patientId ? data.patientId.slice(0, 8).toUpperCase() : "6A882CBD";
  const pName = (data.patientName || "Rahul Sharma").toUpperCase();
  const pGender = (data.patientGender || "M").toUpperCase();
  const pAge = data.patientAge || "25";
  const pMob = data.patientMobile || "+91 98450 12849";

  page.drawText(`ID: CX-${pId} — ${pName} (${pGender}) / ${pAge} Y`, {
    x: 40,
    y: curY,
    size: 11,
    font: fontBold,
    color: black,
  });

  const mobText = `Mob. No.: ${pMob}`;
  const mobWidth = fontBold.widthOfTextAtSize(mobText, 8.5);
  page.drawText(mobText, {
    x: width - 40 - mobWidth,
    y: curY,
    size: 8.5,
    font: fontBold,
    color: black,
  });

  curY -= 14;

  page.drawText(`Address: ${data.patientAddress || "B/503 Medical Arts Complex, Sector 44, Bengaluru"}`, {
    x: 40,
    y: curY,
    size: 8.5,
    font: fontRegular,
    color: black,
  });

  curY -= 13;

  const wt = data.patientWeight || "72";
  const ht = data.patientHeight || "176";
  const bmi = data.patientBmi || "23.24";
  const bp = data.patientBp || "120/80 mmHg";

  page.drawText(`Weight (Kg): ${wt}, Height (Cm): ${ht} (B.M.I. = ${bmi}), BP: ${bp}`, {
    x: 40,
    y: curY,
    size: 8.5,
    font: fontRegular,
    color: black,
  });

  curY -= 16;

  // 3. CHIEF COMPLAINTS & CLINICAL FINDINGS
  page.drawLine({
    start: { x: 40, y: curY },
    end: { x: width - 40, y: curY },
    thickness: 0.75,
    color: black,
  });

  curY -= 12;

  page.drawText("Chief Complaints:", {
    x: 40,
    y: curY,
    size: 8.5,
    font: fontBold,
    color: black,
  });

  page.drawText("Clinical Findings:", {
    x: 300,
    y: curY,
    size: 8.5,
    font: fontBold,
    color: black,
  });

  curY -= 12;

  page.drawText("* SNEEZING & RUNNY NOSE (3 DAYS)", {
    x: 40,
    y: curY,
    size: 8,
    font: fontRegular,
    color: black,
  });

  page.drawText("* BILATERAL TURBINATE CONGESTION", {
    x: 300,
    y: curY,
    size: 8,
    font: fontRegular,
    color: black,
  });

  curY -= 11;

  page.drawText("* NASAL CONGESTION & HEADACHE (2 DAYS)", {
    x: 40,
    y: curY,
    size: 8,
    font: fontRegular,
    color: black,
  });

  page.drawText("* CHEST CLEAR, S1 S2 NORMAL", {
    x: 300,
    y: curY,
    size: 8,
    font: fontRegular,
    color: black,
  });

  curY -= 10;

  page.drawLine({
    start: { x: 40, y: curY },
    end: { x: width - 40, y: curY },
    thickness: 0.75,
    color: black,
  });

  curY -= 14;

  // 4. DIAGNOSIS
  page.drawText("Diagnosis: * ALLERGIC RHINOSINUSITIS", {
    x: 40,
    y: curY,
    size: 8.5,
    font: fontBold,
    color: black,
  });

  curY -= 16;

  // 5. MAIN SECTION: Rx OR LAB REQUISITION
  if (isLab) {
    page.drawText("DIAGNOSTIC INVESTIGATIONS REQUISITION (PROCEED TO LAB FIRST)", {
      x: 40,
      y: curY,
      size: 9.5,
      font: fontBold,
      color: darkGreen,
    });

    curY -= 12;

    page.drawLine({
      start: { x: 40, y: curY },
      end: { x: width - 40, y: curY },
      thickness: 0.75,
      color: black,
    });

    curY -= 10;

    page.drawText("Investigation Name", { x: 40, y: curY, size: 8, font: fontBold, color: black });
    page.drawText("Department", { x: 300, y: curY, size: 8, font: fontBold, color: black });
    page.drawText("Priority", { x: 480, y: curY, size: 8, font: fontBold, color: black });

    curY -= 6;

    page.drawLine({
      start: { x: 40, y: curY },
      end: { x: width - 40, y: curY },
      thickness: 0.75,
      color: black,
    });

    curY -= 12;

    const tests = data.tests || [];
    if (tests.length > 0) {
      tests.forEach((t, i) => {
        page.drawText(`${i + 1}) ${t.name.toUpperCase()}`, {
          x: 40,
          y: curY,
          size: 8.5,
          font: fontBold,
          color: black,
        });

        page.drawText(t.category || "Clinical Pathology", {
          x: 300,
          y: curY,
          size: 8,
          font: fontRegular,
          color: black,
        });

        page.drawText((t.urgency || "ROUTINE").toUpperCase(), {
          x: 480,
          y: curY,
          size: 8,
          font: fontBold,
          color: darkGreen,
        });

        curY -= 16;
      });
    }

    page.drawLine({
      start: { x: 40, y: curY + 4 },
      end: { x: width - 40, y: curY + 4 },
      thickness: 0.5,
      color: black,
    });

    curY -= 10;

    // Guidance Box
    page.drawRectangle({
      x: 40,
      y: curY - 36,
      width: width - 80,
      height: 42,
      color: bgBox,
      borderColor: black,
      borderWidth: 0.75,
    });

    page.drawText("PATIENT INSTRUCTIONS & WORKFLOW:", {
      x: 50,
      y: curY - 8,
      size: 7.5,
      font: fontBold,
      color: black,
    });

    page.drawText("1. Proceed directly to Central Diagnostic Wing (Ground Floor) for sample collection & imaging.", {
      x: 50,
      y: curY - 20,
      size: 7.5,
      font: fontRegular,
      color: black,
    });

    page.drawText("2. Once verified reports are collected, return to Dr. Vivek Vardhan for definitive treatment finalization.", {
      x: 50,
      y: curY - 30,
      size: 7.5,
      font: fontRegular,
      color: black,
    });

    curY -= 50;
  } else {
    // ℞ Prescribed Medications
    page.drawText("R", {
      x: 40,
      y: curY,
      size: 16,
      font: fontSerifBold,
      color: black,
    });

    curY -= 12;

    page.drawLine({
      start: { x: 40, y: curY },
      end: { x: width - 40, y: curY },
      thickness: 0.75,
      color: black,
    });

    curY -= 10;

    page.drawText("Medicine Name", { x: 40, y: curY, size: 8, font: fontBold, color: black });
    page.drawText("Dosage", { x: 280, y: curY, size: 8, font: fontBold, color: black });
    page.drawText("Duration", { x: 450, y: curY, size: 8, font: fontBold, color: black });

    curY -= 6;

    page.drawLine({
      start: { x: 40, y: curY },
      end: { x: width - 40, y: curY },
      thickness: 0.75,
      color: black,
    });

    curY -= 14;

    const meds = data.medicines || [];
    if (meds.length > 0) {
      meds.forEach((m, i) => {
        const sch = (data.schedules && data.schedules[m.name]) || {
          morning: 1,
          afternoon: 0,
          night: 1,
          food: "After Food",
          duration: "5 Days",
        };

        const timing = [];
        if ((sch.morning || 0) > 0) timing.push(`${sch.morning} Morning`);
        if ((sch.afternoon || 0) > 0) timing.push(`${sch.afternoon} Afternoon`);
        if ((sch.night || 0) > 0) timing.push(`${sch.night} Night`);

        const daily = (sch.morning || 0) + (sch.afternoon || 0) + (sch.night || 0);
        const daysMatch = sch.duration?.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0], 10) : 5;
        const totalTabs = daily * days;

        page.drawText(`${i + 1}) ${m.name.toUpperCase()}`, {
          x: 40,
          y: curY,
          size: 8.5,
          font: fontBold,
          color: black,
        });

        page.drawText((m.category || "ORAL THERAPEUTIC FORMULATION").toUpperCase(), {
          x: 52,
          y: curY - 9,
          size: 7,
          font: fontRegular,
          color: grey,
        });

        page.drawText(timing.join(", ") || "1 Morning, 1 Night", {
          x: 280,
          y: curY,
          size: 8,
          font: fontBold,
          color: black,
        });

        page.drawText(`(${sch.food || "After Food"})`, {
          x: 280,
          y: curY - 9,
          size: 7.5,
          font: fontRegular,
          color: grey,
        });

        page.drawText(sch.duration || "5 Days", {
          x: 450,
          y: curY,
          size: 8,
          font: fontBold,
          color: black,
        });

        page.drawText(`(Total: ${totalTabs} Tabs)`, {
          x: 450,
          y: curY - 9,
          size: 7.5,
          font: fontRegular,
          color: grey,
        });

        curY -= 24;
      });
    }

    page.drawLine({
      start: { x: 40, y: curY + 4 },
      end: { x: width - 40, y: curY + 4 },
      thickness: 0.5,
      color: black,
    });

    curY -= 10;

    // Investigations Ordered in Rx
    const tests = data.tests || [];
    if (tests.length > 0) {
      page.drawText("Investigations Ordered (Get Done at Lab):", {
        x: 40,
        y: curY,
        size: 8,
        font: fontBold,
        color: black,
      });

      curY -= 10;

      tests.forEach((t) => {
        page.drawText(`* ${t.name.toUpperCase()} (${(t.urgency || "ROUTINE").toUpperCase()})`, {
          x: 48,
          y: curY,
          size: 7.5,
          font: fontRegular,
          color: black,
        });
        curY -= 9;
      });

      curY -= 4;
    }

    // Advice
    page.drawText("Advice:", {
      x: 40,
      y: curY,
      size: 8,
      font: fontBold,
      color: black,
    });

    curY -= 10;

    const adviceList = [
      "* TAKE ADEQUATE BED REST & HYDRATION",
      "* DO NOT EAT OUTSIDE OR COLD FOOD",
      "* DRINK WARM WATER & STEAM INHALATION TWICE DAILY",
    ];

    adviceList.forEach((adv) => {
      page.drawText(adv, {
        x: 48,
        y: curY,
        size: 7.5,
        font: fontRegular,
        color: black,
      });
      curY -= 9;
    });

    curY -= 4;

    // Follow Up
    page.drawText("Follow Up: 7 Days (or SOS if symptoms persist)", {
      x: 40,
      y: curY,
      size: 8,
      font: fontBold,
      color: black,
    });

    curY -= 16;
  }

  // 6. DOCTOR'S SIGNATURE BLOCK & RED DISCLAIMER AT BOTTOM
  const sigY = 95;

  // Horizontal top line for signature footer
  page.drawLine({
    start: { x: 40, y: sigY + 30 },
    end: { x: width - 40, y: sigY + 30 },
    thickness: 0.5,
    color: lightGrey,
  });

  // Red Legal Disclaimer (Left)
  page.drawText(
    "* THIS COMPUTER-GENERATED PRESCRIPTION IS VALID ONLY AFTER\n  THE DOCTOR'S PHYSICAL SIGNATURE AND CLINIC STAMP.",
    {
      x: 40,
      y: sigY + 12,
      size: 7,
      font: fontBold,
      color: red,
      lineHeight: 9,
    }
  );

  // Doctor Signature (Right)
  page.drawText(data.doctorName || "Dr. Vivek Vardhan", {
    x: width - 180,
    y: sigY + 18,
    size: 11,
    font: fontSerifItalic,
    color: black,
  });

  page.drawLine({
    start: { x: width - 180, y: sigY + 14 },
    end: { x: width - 40, y: sigY + 14 },
    thickness: 1,
    color: black,
  });

  page.drawText(data.doctorName || "Dr. Vivek Vardhan", {
    x: width - 180,
    y: sigY + 2,
    size: 8,
    font: fontBold,
    color: black,
  });

  page.drawText(data.doctorQual || "M.B.B.S., M.D.", {
    x: width - 180,
    y: sigY - 8,
    size: 7.5,
    font: fontRegular,
    color: black,
  });

  page.drawText(`Reg. No: ${data.doctorReg || "MMC 2018"}`, {
    x: width - 180,
    y: sigY - 17,
    size: 7,
    font: fontRegular,
    color: grey,
  });

  page.drawText("(Authorized Medical Practitioner)", {
    x: width - 180,
    y: sigY - 26,
    size: 6.5,
    font: fontRegular,
    color: lightGrey,
  });

  // 7. BOTTOM FOOTER
  const footerText = "Substitute with equivalent Generics as required. • CuraLynx Healthcare Platform";
  const footWidth = fontRegular.widthOfTextAtSize(footerText, 7);
  page.drawText(footerText, {
    x: width / 2 - footWidth / 2,
    y: 35,
    size: 7,
    font: fontRegular,
    color: grey,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
