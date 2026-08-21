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
    role: string;
    regNo: string;
  }>({
    name: "Dr. Vivek Vardhan",
    role: "MBBS, MD (Internal Medicine)",
    regNo: "KMC-2020-84729",
  });

  const [patientInfo, setPatientInfo] = useState<{
    name: string;
    age: string;
    gender: string;
  }>({
    name: "Consultation Patient",
    age: "--",
    gender: "--",
  });

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const name = user.name || (user.firstName ? `Dr. ${user.firstName} ${user.lastName || ""}`.trim() : "Dr. Vivek Vardhan");
        setDoctorInfo({
          name,
          role: user.specialization || "MBBS, MD (Consultant Physician)",
          regNo: user.regNo || "KMC-2020-84729",
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
            const calculatedAge = birthYear ? `${currentYear - birthYear} Yrs` : "--";

            setPatientInfo({
              name: `${p.firstName || ""} ${p.lastName || ""}`.trim() || "Consultation Patient",
              age: calculatedAge,
              gender: p.gender || "--",
            });
          }
        })
        .catch(() => {});
    }
  }, [patientId]);

  if (!isOpen) return null;

  // STRICT: Only items explicitly added to prescription by the doctor
  const activeMedicines = medicines.filter((m) => addedItems[m.name]);
  const activeTests = tests.filter((t) => addedItems[t.name]);

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePrint = () => {
    const printDocElement = document.getElementById("prescription-document");
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
          <title>Prescription_CX-${patientId.slice(0, 8).toUpperCase()}</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm 15mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #18181A;
              background: #ffffff !important;
              margin: 0;
              padding: 10px;
            }
          </style>
        </head>
        <body class="bg-white text-[#18181A]">
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
CURALYNX HEALTHCARE CLINIC
${doctorInfo.name}, ${doctorInfo.role}
Reg. No: ${doctorInfo.regNo} | Date: ${currentDate}
Patient: ${patientInfo.name} (ID: CX-${patientId.slice(0, 8).toUpperCase()})

℞ PRESCRIBED MEDICATIONS:
${
  activeMedicines.length > 0
    ? activeMedicines
        .map((m, i) => {
          const sch = schedules[m.name] || {
            morning: 1,
            afternoon: 0,
            night: 1,
            food: "After Food",
            duration: "5 Days",
          };
          return `${i + 1}. ${m.name} -- Schedule: ${sch.morning}-${sch.afternoon}-${sch.night} (${sch.food}) for ${sch.duration}`;
        })
        .join("\n")
    : "No medications prescribed."
}

${
  activeTests.length > 0
    ? `DIAGNOSTIC INVESTIGATIONS:\n${activeTests
        .map((t, i) => `${i + 1}. ${t.name} (Priority: ${t.urgency || "Standard"})`)
        .join("\n")}\n`
    : ""
}
Advice: Complete the prescribed course of medication. Review if symptoms persist.
`.trim();

    navigator.clipboard.writeText(rxText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      {/* Outer Modal Box */}
      <div className="bg-white border border-[#18181A]/20 rounded-[28px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[95vh]">
        {/* Modal Action Controls Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#18181A]/10 bg-[#FDFBF2] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-[#0B392A] text-white flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#18181A]">
                Digital Prescription Preview
              </h3>
              <p className="text-[11px] text-[#18181A]/60 font-medium">
                Official Clinical Rx Letterhead
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

            {/* Print / Download PDF Button */}
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

        {/* PRINTABLE RX DOCUMENT */}
        <div
          id="prescription-document"
          className="flex-1 overflow-y-auto p-8 sm:p-10 bg-white font-sans text-[#18181A]"
        >
          {/* Document Header / Clinic Letterhead */}
          <div className="border-b-2 border-[#18181A] pb-6 mb-6">
            <div className="flex justify-between items-start">
              {/* Clinic Branding */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-[#18181A] text-white flex items-center justify-center font-bold text-sm">
                    CL
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-[#18181A]">
                    CuraLynx Health Clinic & Diagnostic Centre
                  </h1>
                </div>
                <p className="text-xs text-[#18181A]/70 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#18181A]/50 inline" />
                  Medical Arts Complex, Sector 44, Bengaluru, KA 560038
                </p>
                <p className="text-xs text-[#18181A]/70 flex items-center gap-3 mt-0.5">
                  <span>
                    <Phone className="h-3 w-3 inline mr-1 text-[#18181A]/50" />
                    +91 (080) 4920-8800
                  </span>
                  <span>
                    <Mail className="h-3 w-3 inline mr-1 text-[#18181A]/50" />
                    care@curalynx.health
                  </span>
                </p>
              </div>

              {/* Doctor Details */}
              <div className="text-right">
                <h2 className="text-base font-bold text-[#18181A]">
                  {doctorInfo.name}
                </h2>
                <p className="text-xs font-semibold text-[#0B392A]">
                  {doctorInfo.role}
                </p>
                <p className="text-[10.5px] font-mono text-[#18181A]/50 mt-0.5">
                  Reg. No: {doctorInfo.regNo}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Details Row */}
          <div className="bg-[#FDFBF2] border border-[#18181A]/15 rounded-2xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                Patient Name
              </span>
              <span className="font-bold text-sm text-[#18181A]">
                {patientInfo.name}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                Age / Gender
              </span>
              <span className="font-bold text-[#18181A]">
                {patientInfo.age} {patientInfo.gender !== "--" ? `/ ${patientInfo.gender}` : ""}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                Patient ID / UHID
              </span>
              <span className="font-mono font-bold text-[#18181A]">
                CX-{patientId.slice(0, 8).toUpperCase()}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                Date & Time
              </span>
              <span className="font-bold text-[#18181A]">
                {currentDate}, {currentTime}
              </span>
            </div>
          </div>

          {/* Rx Symbol Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#0B392A]">
              ℞
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#18181A]">
              Prescribed Medications ({activeMedicines.length})
            </h3>
          </div>

          {/* Medications Table */}
          {activeMedicines.length > 0 ? (
            <div className="border border-[#18181A]/20 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FDFBF2] border-b border-[#18181A]/20 text-[#18181A]/70">
                    <th className="py-2.5 px-3.5 font-bold w-10 text-center">#</th>
                    <th className="py-2.5 px-3.5 font-bold">Medication Name</th>
                    <th className="py-2.5 px-3.5 font-bold text-center">
                      Schedule (M - A - N)
                    </th>
                    <th className="py-2.5 px-3.5 font-bold">Instructions</th>
                    <th className="py-2.5 px-3.5 font-bold text-center">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#18181A]/10">
                  {activeMedicines.map((med, idx) => {
                    const sch = schedules[med.name] || {
                      morning: 1,
                      afternoon: 0,
                      night: 1,
                      food: "After Food",
                      duration: "5 Days",
                    };
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3.5 text-center font-bold text-[#18181A]/50">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3.5 font-bold text-[#18181A]">
                          {med.name}
                          <span className="block text-[10.5px] font-normal text-[#18181A]/60">
                            {med.category || "Oral Therapeutic"}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-[#0B392A]">
                          <span className="bg-[#0B392A]/10 px-2 py-0.5 rounded-md">
                            {sch.morning} - {sch.afternoon} - {sch.night}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 font-semibold text-[#18181A]/80">
                          {sch.food}
                        </td>
                        <td className="py-3 px-3.5 text-center font-bold text-[#18181A]">
                          {sch.duration}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-[#18181A]/10 bg-[#FDFBF2] text-xs text-[#18181A]/60 mb-6 text-center">
              No medications prescribed in this consultation.
            </div>
          )}

          {/* Diagnostic Investigations & Tests (Rendered ONLY if tests were selected) */}
          {activeTests.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181A] mb-2.5 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#0284C7]" /> Recommended
                Diagnostic Investigations ({activeTests.length})
              </h4>
              <div className="bg-[#FDFBF2] border border-[#18181A]/15 rounded-xl p-3.5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeTests.map((t, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 font-semibold text-[#18181A]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0B392A]" />
                      <span>{t.name}</span>
                      <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.2 rounded-full ml-auto">
                        {t.urgency || "Standard"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* General Advice */}
          <div className="mb-8 p-3.5 border border-[#18181A]/10 rounded-xl bg-white text-xs">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#18181A]/70 mb-1">
              General Clinical Advice:
            </h4>
            <p className="text-xs text-[#18181A]/80 leading-relaxed">
              • Complete the prescribed dosage regimen as instructed.
              <br />
              • Follow up in clinic or consult emergency if symptoms worsen.
            </p>
          </div>

          {/* Footer & Doctor's Signature Block */}
          <div className="pt-6 border-t border-[#18181A]/20 flex justify-between items-end">
            <div className="text-[10.5px] text-[#18181A]/50 space-y-0.5">
              <p className="font-semibold text-[#18181A]/70 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#7E22CE]" /> Digitally Generated with Cura AI Co-pilot
              </p>
              <p>Valid under IT Act 2000 (E-Prescription).</p>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-base text-[#18181A] pr-4">
                {doctorInfo.name}
              </div>
              <div className="w-36 h-0.5 bg-[#18181A] ml-auto my-1" />
              <p className="text-xs font-bold text-[#18181A]">
                {doctorInfo.name}
              </p>
              <p className="text-[10.5px] text-[#18181A]/60">
                {doctorInfo.role}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="px-6 py-4 border-t border-[#18181A]/10 bg-[#FDFBF2] flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-[#18181A]/60 font-medium">
            {activeMedicines.length} Medication(s) • {activeTests.length} Investigation(s) Prescribed
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
