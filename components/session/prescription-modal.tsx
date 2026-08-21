"use client";

import {
  X,
  Printer,
  Share2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Activity,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ClinicalItem, MedicationSchedule } from "@/components/session/ai-insights";

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  medicines: ClinicalItem[];
  tests: ClinicalItem[];
  addedItems: Record<string, boolean>;
  schedules: Record<string, MedicationSchedule>;
}

export function PrescriptionModal({
  isOpen,
  onClose,
  patientId,
  medicines,
  tests,
  addedItems,
  schedules,
}: PrescriptionModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<{
    name: string;
    qualifications: string;
    regNo: string;
    specialty: string;
  }>({
    name: "Dr. Vivek Vardhan",
    qualifications: "M.B.B.S., M.D. (Internal Medicine)",
    regNo: "MMC 2018 / KMC 84729",
    specialty: "Consultant Physician",
  });

  const [patientInfo, setPatientInfo] = useState<{
    name: string;
    age: string;
    gender: string;
    mobile: string;
    address: string;
    weight: string;
    height: string;
    bmi: string;
    bp: string;
  }>({
    name: "Arjun Nair",
    age: "25",
    gender: "M",
    mobile: "98450 12849",
    address: "Medical Arts Complex, Bengaluru - 560038",
    weight: "72",
    height: "176",
    bmi: "23.24",
    bp: "120/80 mmHg",
  });

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const name = user.name || (user.firstName ? `Dr. ${user.firstName} ${user.lastName || ""}`.trim() : "Dr. Vivek Vardhan");
        setDoctorInfo({
          name,
          qualifications: user.qualifications || "M.B.B.S., M.D.",
          regNo: user.regNo || "MMC 2018",
          specialty: user.specialization || "Consultant Physician",
        });
      }
    } catch {}

    if (patientId) {
      fetch(`/api/patients?patientId=${patientId}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const p = data[0];
            const birthYear = p.dateOfBirth ? new Date(p.dateOfBirth).getFullYear() : null;
            const currentYear = new Date().getFullYear();
            const calculatedAge = birthYear ? `${currentYear - birthYear}` : "25";

            setPatientInfo((prev) => ({
              ...prev,
              name: `${p.firstName || ""} ${p.lastName || ""}`.trim() || prev.name,
              age: calculatedAge,
              gender: p.gender ? p.gender[0].toUpperCase() : "M",
            }));
          }
        })
        .catch(() => {});
    }
  }, [patientId]);

  if (!isOpen) return null;

  // STRICT: Only items explicitly added to prescription by the doctor
  const activeMedicines = medicines.filter((m) => addedItems[m.name]);
  const activeTests = tests.filter((t) => addedItems[t.name]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/ /g, "-");

  const followUpDate = new Date(today);
  followUpDate.setDate(today.getDate() + 7);
  const followUpStr = followUpDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/ /g, "-");

  const handlePrint = () => {
    const printDocElement = document.getElementById("hospital-prescription-document");
    if (!printDocElement) return;

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "0";
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow?.document;
    if (!doc) return;

    const contentHtml = printDocElement.innerHTML;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Prescription_${patientInfo.name.replace(/ /g, "_")}_${patientId.slice(0, 8).toUpperCase()}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              color: #000000;
              background: #ffffff !important;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body class="bg-white text-black">
          <div>
            ${contentHtml}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      try {
        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();
      } catch (err) {
        console.error("Print frame error:", err);
      } finally {
        setTimeout(() => {
          if (document.body.contains(printFrame)) {
            document.body.removeChild(printFrame);
          }
        }, 1500);
      }
    }, 450);
  };

  const handleCopyText = () => {
    const rxText = `
${doctorInfo.name}
${doctorInfo.qualifications} | Reg. No: ${doctorInfo.regNo}
CuraLynx Hospital
Date: ${dateStr}

Patient: ${patientInfo.name} (${patientInfo.gender}) / ${patientInfo.age} Y | ID: CX-${patientId.slice(0, 8).toUpperCase()}
BP: ${patientInfo.bp} | Wt: ${patientInfo.weight}kg

R
${activeMedicines
  .map((m, i) => {
    const sch = schedules[m.name] || {
      morning: 1,
      afternoon: 0,
      night: 1,
      food: "After Food",
      duration: "5 Days",
    };
    const timing = [];
    if (sch.morning > 0) timing.push(`${sch.morning} Morning`);
    if (sch.afternoon > 0) timing.push(`${sch.afternoon} Afternoon`);
    if (sch.night > 0) timing.push(`${sch.night} Night`);
    return `${i + 1}) ${m.name.toUpperCase()}\n   ${timing.join(", ")} (${sch.food}) - ${sch.duration}`;
  })
  .join("\n\n")}

Advice:
* TAKE ADEQUATE BED REST & HYDRATION
* AVOID COLD FOOD & DUST EXPOSURE
* STEAM INHALATION TWICE DAILY

Follow Up: ${followUpStr}
`.trim();

    navigator.clipboard.writeText(rxText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Helper to calculate total tablets
  const calculateTotalTabs = (sch: MedicationSchedule) => {
    const daily = (sch.morning || 0) + (sch.afternoon || 0) + (sch.night || 0);
    const daysMatch = sch.duration?.match(/\d+/);
    const days = daysMatch ? parseInt(daysMatch[0], 10) : 5;
    return daily * days;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150 font-sans">
      {/* Outer Modal Container */}
      <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[95vh]">
        {/* Modal Action Controls Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#18181A]/10 bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#0B392A] text-white flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#18181A]">
                Official Hospital Prescription Letterhead
              </h3>
              <p className="text-[11px] text-[#18181A]/60 font-medium">
                Standard Clinical Rx Format
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Summary */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#18181A] bg-white border border-[#18181A]/20 rounded-full hover:bg-[#18181A]/5 transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="h-3.5 w-3.5 text-[#18181A]/60" />
              {isCopied ? "Copied Rx!" : "Share / Copy"}
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#0B392A] hover:bg-[#07241A] rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full border border-[#18181A]/15 hover:bg-[#18181A]/10 flex items-center justify-center text-[#18181A]/70 transition-colors cursor-pointer ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE HOSPITAL RX DOCUMENT (Exact Layout as in Reference Image) */}
        <div
          id="hospital-prescription-document"
          className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white font-sans text-black select-text"
        >
          {/* 1. THREE-COLUMN HEADER */}
          <div className="flex justify-between items-start pb-4 border-b-2 border-black">
            {/* Doctor Info (Left) */}
            <div className="w-[38%]">
              <h2 className="text-xl font-bold text-black tracking-tight">
                {doctorInfo.name}
              </h2>
              <p className="text-xs font-semibold text-black mt-0.5">
                {doctorInfo.qualifications}
              </p>
              <p className="text-xs font-medium text-black">
                Reg. No: {doctorInfo.regNo}
              </p>
            </div>

            {/* Brand Logo / Medical Emblem (Center) */}
            <div className="w-[20%] flex justify-center items-center pt-0.5">
              <img
                src="/curalynx-logo.png"
                alt="CuraLynx Emblem"
                className="w-20 h-20 object-contain scale-110"
              />
            </div>

            {/* Hospital / Clinic Details (Right) */}
            <div className="w-[42%] text-left pl-4">
              <h3 className="text-lg font-bold text-blue-900 tracking-tight">
                CuraLynx Hospital
              </h3>
              <p className="text-[11.5px] text-black font-medium leading-tight mt-0.5">
                B/503 Medical Arts Complex, Sector 44, Bengaluru - 560038.
              </p>
              <p className="text-[11px] text-black font-medium leading-tight mt-0.5">
                Ph: +91 98450 12849, Timing: 09:00 AM - 01:00 PM, 06:00 PM - 08:00 PM | Closed: Sunday
              </p>
            </div>
          </div>

          {/* 2. DATE ROW & PATIENT METADATA */}
          <div className="pt-3 pb-3">
            <div className="text-right font-bold text-sm text-black mb-1">
              Date: {dateStr}
            </div>

            <div className="space-y-1 text-xs font-bold text-black">
              <div className="flex flex-wrap items-center justify-between">
                <span>
                  ID: {patientId.slice(0, 8).toUpperCase()} - {patientInfo.name.toUpperCase()} ({patientInfo.gender}) / {patientInfo.age} Y
                </span>
                <span>
                  Mob. No.: {patientInfo.mobile}
                </span>
              </div>

              <div>
                Address: {patientInfo.address}
              </div>

              <div className="pt-0.5">
                Weight (Kg): {patientInfo.weight}, Height (Cm): {patientInfo.height} (B.M.I. = {patientInfo.bmi}), BP: {patientInfo.bp}
              </div>
            </div>
          </div>

          {/* 3. CHIEF COMPLAINTS & CLINICAL FINDINGS (Two Columns with Top/Bottom Borders) */}
          <div className="border-t border-b border-black py-2.5 my-3 grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-bold text-black underline mb-1">
                Chief Complaints
              </h4>
              <ul className="space-y-0.5 text-black font-semibold uppercase">
                <li>* SNEEZING & RUNNY NOSE (3 DAYS)</li>
                <li>* NASAL CONGESTION & HEADACHE (2 DAYS)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-black underline mb-1">
                Clinical Findings
              </h4>
              <ul className="space-y-0.5 text-black font-semibold uppercase">
                <li>* BILATERAL TURBINATE CONGESTION</li>
                <li>* CHEST CLEAR, S1 S2 NORMAL</li>
              </ul>
            </div>
          </div>

          {/* 4. DIAGNOSIS */}
          <div className="my-3 text-xs">
            <h4 className="font-bold text-black">
              Diagnosis:
            </h4>
            <p className="font-semibold text-black uppercase mt-0.5">
              * ALLERGIC RHINOSINUSITIS
            </p>
          </div>

          {/* 5. ℞ / R SYMBOL & MEDICATIONS TABLE */}
          <div className="my-4">
            <div className="font-serif font-bold text-xl text-black mb-1">
              R
            </div>

            {/* Table Header */}
            <div className="border-t border-b border-black py-1.5 grid grid-cols-12 text-xs font-bold text-black">
              <div className="col-span-6 pl-1">Medicine Name</div>
              <div className="col-span-3 text-left">Dosage</div>
              <div className="col-span-3 text-left">Duration</div>
            </div>

            {/* Medication Rows */}
            <div className="divide-y divide-black/80">
              {activeMedicines.length > 0 ? (
                activeMedicines.map((med, idx) => {
                  const sch = schedules[med.name] || {
                    morning: 1,
                    afternoon: 0,
                    night: 1,
                    food: "After Food",
                    duration: "5 Days",
                  };

                  const dosageParts = [];
                  if (sch.morning > 0) dosageParts.push(`${sch.morning} Morning`);
                  if (sch.afternoon > 0) dosageParts.push(`${sch.afternoon} Afternoon`);
                  if (sch.night > 0) dosageParts.push(`${sch.night} Night`);

                  const totalTabs = calculateTotalTabs(sch);

                  // Extract generic composition
                  const genericName = med.category?.toUpperCase() || "ORAL THERAPEUTIC FORMULATION";

                  return (
                    <div key={idx} className="py-2.5 grid grid-cols-12 text-xs text-black">
                      {/* Medicine Name & Generic Formula */}
                      <div className="col-span-6 pl-1 pr-2">
                        <div className="font-bold uppercase">
                          {idx + 1}) {med.name.toUpperCase()}
                        </div>
                        <div className="text-[10px] font-semibold text-black/80 uppercase tracking-tight mt-0.5">
                          {genericName}
                        </div>
                      </div>

                      {/* Dosage */}
                      <div className="col-span-3 font-semibold">
                        <div>{dosageParts.join(", ") || "1 Morning, 1 Night"}</div>
                        <div className="text-[10.5px] font-normal text-black/80">({sch.food})</div>
                      </div>

                      {/* Duration */}
                      <div className="col-span-3 font-semibold">
                        <div>{sch.duration}</div>
                        <div className="text-[10.5px] font-normal text-black/80">
                          (Tot: {totalTabs} {med.name.toLowerCase().includes("cap") ? "Cap" : "Tab"})
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 text-center text-xs text-black/60 italic">
                  No medications selected in consultation.
                </div>
              )}
            </div>
            <div className="border-b border-black mt-1" />
          </div>

          {/* 6. INVESTIGATIONS ORDERED (if any) */}
          {activeTests.length > 0 && (
            <div className="my-4 text-xs">
              <h4 className="font-bold text-black">
                Investigations:
              </h4>
              <ul className="space-y-0.5 text-black font-semibold uppercase mt-0.5">
                {activeTests.map((t, idx) => (
                  <li key={idx}>* {t.name.toUpperCase()} ({t.urgency || "ROUTINE"})</li>
                ))}
              </ul>
            </div>
          )}

          {/* 7. ADVICE */}
          <div className="my-4 text-xs">
            <h4 className="font-bold text-black">
              Advice:
            </h4>
            <ul className="space-y-0.5 text-black font-semibold uppercase mt-0.5">
              <li>* TAKE ADEQUATE BED REST</li>
              <li>* DO NOT EAT OUTSIDE OR COLD FOOD</li>
              <li>* DRINK WARM WATER & STEAM INHALATION TWICE DAILY</li>
              <li>* EAT EASY TO DIGEST FOOD LIKE BOILED RICE WITH DAAL</li>
            </ul>
          </div>

          {/* 8. FOLLOW UP */}
          <div className="my-4 text-xs font-bold text-black">
            Follow Up: {followUpStr}
          </div>

          {/* 9. DOCTOR'S SIGNATURE BLOCK & PHYSICAL SIGN DISCLAIMER */}
          <div className="pt-8 pb-3 flex justify-between items-end border-t border-black/20 mt-6">
            <div className="text-left max-w-[55%] pb-1">
              <p className="text-red-600 font-bold text-[11px] uppercase tracking-wide leading-relaxed">
                * THIS COMPUTER-GENERATED PRESCRIPTION IS VALID ONLY AFTER THE DOCTOR&apos;S PHYSICAL SIGNATURE AND CLINIC STAMP.
              </p>
            </div>

            <div className="text-right pl-4">
              <div className="font-serif italic font-bold text-lg text-black pr-2 select-none">
                {doctorInfo.name}
              </div>
              <div className="w-48 h-0.5 bg-black ml-auto my-1" />
              <p className="text-xs font-bold text-black uppercase">
                {doctorInfo.name}
              </p>
              <p className="text-[11px] font-medium text-black">
                {doctorInfo.qualifications}
              </p>
              <p className="text-[10.5px] font-mono text-black/70">
                Reg. No: {doctorInfo.regNo}
              </p>
              <p className="text-[10px] font-semibold text-black/50 uppercase tracking-wider mt-0.5">
                (Authorized Medical Practitioner)
              </p>
            </div>
          </div>

          {/* 10. FOOTER NOTE */}
          <div className="pt-4 pb-2 text-center text-[11px] font-medium text-black/80">
            Substitute with equivalent Generics as required.
          </div>
        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 border-t border-[#18181A]/10 bg-white flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-[#18181A]/60 font-medium">
            {activeMedicines.length} Medication(s) Prescribed • Ready for Official Print / PDF
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-[#18181A]/70 hover:text-[#18181A] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0B392A] hover:bg-[#07241A] rounded-full shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
