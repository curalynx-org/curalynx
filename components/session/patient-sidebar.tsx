"use client";

import {
  Activity,
  FileText,
  Heart,
  ShieldAlert,
  Pill,
  History,
  ChevronRight,
  X,
  Stethoscope,
  Clock,
  Sparkles,
  Printer,
  Download,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";

interface PatientSidebarProps {
  patientId?: string;
}

interface LabReport {
  id: string;
  title: string;
  category: string;
  date: string;
  doctor: string;
  status: "Normal" | "Attention" | "Elevated";
  summary: string;
  sampleType: string;
  labId: string;
  parameters: { name: string; value: string; range: string; status: "normal" | "high" | "low" }[];
  impression: string;
}

export function PatientSidebar({ patientId = "6a882cbda4d82aed0f6577b8" }: PatientSidebarProps) {
  const [patient, setPatient] = useState<{
    name: string;
    age: string;
    gender: string;
    uhid: string;
    bp: string;
    glucose: string;
    spo2: string;
    heartRate: string;
    bloodGroup: string;
    allergies: { allergen: string; type: string; reaction: string }[];
    chronicConditions: { condition: string; since: string; status: string; risk: "Low" | "Moderate" | "High" }[];
    activeMedications: { name: string; dosage: string; frequency: string; reason: string }[];
    pastVisits: { date: string; doctor: string; specialty: string; diagnosis: string; rx: string }[];
  }>({
    name: "Arjun Nair",
    age: "25 yrs",
    gender: "Male",
    uhid: `CX-${patientId.slice(0, 8).toUpperCase()}`,
    bp: "120/80",
    glucose: "96",
    spo2: "98%",
    heartRate: "72 bpm",
    bloodGroup: "B+",
    allergies: [
      { allergen: "Dust Mites", type: "Environmental", reaction: "Rhinitis / Sneezing" },
      { allergen: "Grass Pollen", type: "Seasonal", reaction: "Nasal congestion" },
      { allergen: "Penicillin & Sulfa", type: "Drug Profile", reaction: "NKDA (No Known Allergies)" },
    ],
    chronicConditions: [
      { condition: "Allergic Rhinitis", since: "March 2024", status: "Active (Seasonal flare-ups)", risk: "Moderate" },
      { condition: "Mild Reactive Airway", since: "Oct 2024", status: "Controlled", risk: "Low" },
    ],
    activeMedications: [
      { name: "Fexofenadine 120mg", dosage: "1 Tablet", frequency: "1 - 0 - 0 (Morning)", reason: "Allergy symptom control" },
      { name: "Fluticasone Spray", dosage: "2 Sprays", frequency: "Once daily (Morning)", reason: "Nasal anti-inflammatory" },
    ],
    pastVisits: [
      {
        date: "08 Feb 2026",
        doctor: "Dr. Priya Sharma",
        specialty: "Consultant Physician",
        diagnosis: "Acute rhinosinusitis flare-up with nasal obstruction",
        rx: "Fexofenadine 120mg, Fluticasone spray, Saline nasal douching",
      },
      {
        date: "14 Nov 2025",
        doctor: "Dr. K. Raman",
        specialty: "Pulmonologist",
        diagnosis: "Seasonal pollen allergen sensitization screening",
        rx: "Total Serum IgE panel ordered, advised allergen avoidance",
      },
    ],
  });

  const reportsList: LabReport[] = [
    {
      id: "rep-1",
      title: "Complete Blood Count (CBC)",
      category: "Hematology Panel",
      date: "18 Jan 2026",
      doctor: "Dr. Priya Sharma",
      status: "Attention",
      sampleType: "Whole Blood (EDTA)",
      labId: "LAB-HEM-94821",
      summary: "Normal hemoglobin & platelet counts. Moderate eosinophilia consistent with allergic diathesis.",
      parameters: [
        { name: "Hemoglobin (Hb)", value: "14.8 g/dL", range: "13.5 - 17.5 g/dL", status: "normal" },
        { name: "Total Leukocyte Count (WBC)", value: "7,400 /mcL", range: "4,000 - 11,000 /mcL", status: "normal" },
        { name: "Absolute Eosinophils", value: "540 /uL", range: "20 - 450 /uL", status: "high" },
        { name: "Differential Eosinophils", value: "7.2 %", range: "1.0 - 5.0 %", status: "high" },
        { name: "Differential Neutrophils", value: "58 %", range: "40 - 75 %", status: "normal" },
        { name: "Platelet Count", value: "245,000 /mcL", range: "150,000 - 450,000 /mcL", status: "normal" },
      ],
      impression: "Peripheral eosinophilia correlating with allergic rhinitis history. No acute bacterial or systemic infection.",
    },
    {
      id: "rep-2",
      title: "Total Serum IgE Allergy Panel",
      category: "Immunology & Allergy",
      date: "04 Nov 2025",
      doctor: "Dr. K. Raman",
      status: "Elevated",
      sampleType: "Serum (Clot Activator)",
      labId: "LAB-IMM-84910",
      summary: "Significantly elevated total IgE with specific sensitivity to Timothy grass and dust mites.",
      parameters: [
        { name: "Total Serum IgE", value: "285 IU/mL", range: "< 100 IU/mL", status: "high" },
        { name: "Dust Mites (D. pteronyssinus)", value: "Class 3 (Moderate)", range: "Class 0 (<0.35 kU/L)", status: "high" },
        { name: "Grass Pollen Mix", value: "Class 2 (Low-Mod)", range: "Class 0 (<0.35 kU/L)", status: "high" },
        { name: "Aspergillus fumigatus", value: "Class 0 (Negative)", range: "Class 0 (<0.35 kU/L)", status: "normal" },
      ],
      impression: "Atopic phenotype confirmed. Elevated IgE indicates ongoing allergen sensitivity.",
    },
    {
      id: "rep-3",
      title: "Digital Chest Radiograph (PA View)",
      category: "Diagnostic Radiology",
      date: "12 Aug 2025",
      doctor: "Dr. Vivek Vardhan",
      status: "Normal",
      sampleType: "Digital Radiography (X-Ray)",
      labId: "RAD-XR-49102",
      summary: "Normal broncho-vascular markings. Clear costophrenic angles.",
      parameters: [
        { name: "Lung Parenchyma", value: "Clear & Aerated", range: "Clear", status: "normal" },
        { name: "Cardiac Silhouette", value: "Normal Size (CTR < 0.5)", range: "Normal", status: "normal" },
        { name: "Costophrenic Angles", value: "Sharp & Clear", range: "Sharp", status: "normal" },
      ],
      impression: "Normal digital chest radiograph. No active pulmonary infiltration or consolidation.",
    },
  ];

  const [activeModal, setActiveModal] = useState<"reports" | "history" | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string>("rep-1");
  const [viewLetterhead, setViewLetterhead] = useState<boolean>(false);

  const currentReport = reportsList.find((r) => r.id === selectedReportId) || reportsList[0];

  useEffect(() => {
    if (!patientId) return;

    fetch(`/api/patients?patientId=${patientId}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const p = data[0];
          const birthYear = p.dateOfBirth ? new Date(p.dateOfBirth).getFullYear() : null;
          const currentYear = new Date().getFullYear();
          const calculatedAge = birthYear ? `${currentYear - birthYear} yrs` : "25 yrs";

          setPatient((prev) => ({
            ...prev,
            name: `${p.firstName || ""} ${p.lastName || ""}`.trim() || prev.name,
            age: calculatedAge,
            gender: p.gender || prev.gender,
            uhid: `CX-${patientId.slice(0, 8).toUpperCase()}`,
          }));
        }
      })
      .catch(() => {});
  }, [patientId]);

  // High-Resolution Lab Report PDF Print / Download Renderer
  const handlePrintReport = (report: LabReport) => {
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

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${report.title}_${patient.uhid}</title>
          <meta charset="utf-8" />
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
        <body class="bg-white text-[#18181A] p-6 font-sans">
          <!-- Diagnostic Lab Letterhead -->
          <div class="border-b-2 border-[#18181A] pb-5 mb-5 flex justify-between items-start">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <div class="h-8 w-8 rounded-lg bg-[#0B392A] text-white flex items-center justify-center font-bold text-sm">
                  CL
                </div>
                <h1 class="text-xl font-bold tracking-tight text-[#18181A]">
                  CuraLynx Central Diagnostic Laboratories
                </h1>
              </div>
              <p class="text-xs text-[#18181A]/70">NABL Accredited Lab • ISO 15189:2022 Certified • Bengaluru, KA</p>
              <p class="text-xs text-[#18181A]/70 mt-0.5">Phone: +91 (080) 4920-8800 • diagnostics@curalynx.health</p>
            </div>
            <div class="text-right">
              <span class="text-[11px] font-bold text-[#0B392A] bg-[#0B392A]/10 px-2.5 py-1 rounded-md">OFFICIAL REPORT</span>
              <p class="text-xs font-mono font-bold text-[#18181A] mt-1.5">Lab Ref: ${report.labId}</p>
              <p class="text-[11px] text-[#18181A]/60">Date: ${report.date}</p>
            </div>
          </div>

          <!-- Patient & Specimen Info Bar -->
          <div class="bg-[#FDFBF2] border border-[#18181A]/20 rounded-2xl p-4 mb-6 grid grid-cols-4 gap-4 text-xs">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">Patient Name</span>
              <span class="font-bold text-sm text-[#18181A]">${patient.name}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">Age / Gender / Blood</span>
              <span class="font-bold text-[#18181A]">${patient.age} / ${patient.gender} (${patient.bloodGroup})</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">Patient ID / UHID</span>
              <span class="font-mono font-bold text-[#18181A]">${patient.uhid}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">Referred By</span>
              <span class="font-bold text-[#18181A]">${report.doctor}</span>
            </div>
          </div>

          <!-- Investigation Banner -->
          <div class="flex items-center justify-between bg-[#18181A] text-white px-4 py-2.5 rounded-xl mb-4 text-xs">
            <div>
              <span class="text-white/60 uppercase font-semibold text-[10px] block">Investigation:</span>
              <span class="font-bold text-sm">${report.title}</span>
            </div>
            <div class="text-right">
              <span class="text-white/60 text-[10px] block">Sample:</span>
              <span class="font-semibold">${report.sampleType}</span>
            </div>
          </div>

          <!-- Quantitative Parameters Table -->
          <div class="border border-[#18181A]/20 rounded-xl overflow-hidden mb-6">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#FDFBF2] border-b border-[#18181A]/20 text-[#18181A]/70">
                  <th class="py-2.5 px-3.5 font-bold">Investigation Parameter</th>
                  <th class="py-2.5 px-3.5 font-bold text-center">Observed Value</th>
                  <th class="py-2.5 px-3.5 font-bold">Biological Reference Interval</th>
                  <th class="py-2.5 px-3.5 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#18181A]/10">
                ${report.parameters
                  .map(
                    (p) => `
                  <tr>
                    <td class="py-3 px-3.5 font-bold text-[#18181A]">${p.name}</td>
                    <td class="py-3 px-3.5 text-center font-mono font-bold text-sm text-[#18181A]">${p.value}</td>
                    <td class="py-3 px-3.5 text-xs text-[#18181A]/70">${p.range}</td>
                    <td class="py-3 px-3.5 text-center">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        p.status === "normal"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-amber-100 text-amber-900"
                      }">
                        ${p.status === "normal" ? "NORMAL" : "OUT OF RANGE"}
                      </span>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>

          <!-- Pathologist Impression -->
          <div class="p-4 rounded-xl border border-[#18181A]/15 bg-[#FDFBF2] text-xs mb-8">
            <span class="font-bold text-[#18181A] block mb-1">Pathologist / Radiologist Impression:</span>
            <p class="text-[#18181A]/80 leading-relaxed">${report.impression}</p>
          </div>

          <!-- Signatures Footer -->
          <div class="pt-6 border-t border-[#18181A]/20 flex justify-between items-end text-xs">
            <div>
              <p class="font-semibold text-[#18181A]/60">Verified Laboratory Record</p>
              <p class="text-[10px] text-[#18181A]/40 mt-0.5">Report generated with QR/Electronic validation.</p>
            </div>
            <div class="text-right">
              <p class="font-serif italic font-bold text-sm text-[#18181A]">Dr. Anuradha Sen, MD (Pathology)</p>
              <div class="w-36 h-0.5 bg-[#18181A] ml-auto my-1"></div>
              <p class="text-[11px] font-bold text-[#18181A]">Chief Pathologist & Lab Director</p>
            </div>
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

  return (
    <div className="flex flex-col h-full bg-transparent overflow-y-auto font-sans p-5 space-y-4">
      {/* Patient Profile Card Header */}
      <div className="flex items-center gap-3.5 bg-white border border-[#18181A]/10 p-3.5 rounded-2xl shadow-2xs">
        <div className="h-12 w-12 rounded-2xl border border-[#18181A]/15 bg-[#E9D5FF] flex items-center justify-center text-[#18181A] shadow-2xs font-bold text-base shrink-0">
          {patient.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold tracking-tight text-[#18181A] truncate leading-tight">
            {patient.name}
          </h2>
          <p className="text-xs text-[#18181A]/60 font-medium mt-0.5">
            {patient.age} • {patient.gender} • <span className="font-mono font-bold text-[#0B392A]">{patient.uhid}</span>
          </p>
        </div>
      </div>

      {/* Vitals Summary Card */}
      <div className="bg-white border border-[#18181A]/10 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#18181A]/70 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-red-500" /> Patient Vitals
          </span>
          <span className="text-[10.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
            Recorded Today
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-[#0B392A] text-white">
            <span className="text-[10px] text-white/70 block font-medium">Blood Pressure</span>
            <span className="text-base font-bold">{patient.bp} <span className="text-[10px] font-normal text-white/70">mmHg</span></span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#E9D5FF] text-[#18181A]">
            <span className="text-[10px] text-[#18181A]/70 block font-medium">Glucose</span>
            <span className="text-base font-bold">{patient.glucose} <span className="text-[10px] font-normal text-[#18181A]/70">mg/dL</span></span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#18181A]/70 font-semibold px-1 pt-1 border-t border-[#18181A]/5">
          <span>Pulse: <strong className="text-[#18181A]">{patient.heartRate}</strong></span>
          <span>•</span>
          <span>SpO2: <strong className="text-[#0B392A]">{patient.spo2}</strong></span>
          <span>•</span>
          <span>Blood: <strong className="text-[#18181A]">{patient.bloodGroup}</strong></span>
        </div>
      </div>

      {/* CLEAN ACTION TILES (Past Reports & Full History) */}
      <div className="space-y-2.5">
        {/* Past Reports Action Tile */}
        <div
          onClick={() => {
            setSelectedReportId("rep-1");
            setActiveModal("reports");
          }}
          className="group p-4 rounded-2xl bg-white hover:bg-blue-50/40 border border-[#18181A]/10 hover:border-blue-300 shadow-2xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18181A] group-hover:text-blue-700 transition-colors">
                Past Lab Reports
              </h4>
              <p className="text-xs text-[#18181A]/50 font-medium">
                {reportsList.length} diagnostic records • View & Download PDF
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#18181A]/40 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Full Clinical History Action Tile */}
        <div
          onClick={() => setActiveModal("history")}
          className="group p-4 rounded-2xl bg-white hover:bg-purple-50/40 border border-[#18181A]/10 hover:border-purple-300 shadow-2xs transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18181A] group-hover:text-purple-700 transition-colors">
                Clinical History & Meds
              </h4>
              <p className="text-xs text-[#18181A]/50 font-medium">
                Allergies, conditions & past visits
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#18181A]/40 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* POPUP: CLEAN & SPACIOUS LANDSCAPE MEDICAL DOSSIER */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-7 py-4 border-b border-[#18181A]/10 bg-white/90 flex-shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-2xl bg-[#E9D5FF] border border-[#18181A]/15 flex items-center justify-center text-[#18181A] font-bold text-sm">
                  {patient.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#18181A]">{patient.name}</h3>
                    <span className="font-mono text-xs font-bold text-[#0B392A] bg-[#0B392A]/10 px-2 py-0.5 rounded-md">
                      {patient.uhid}
                    </span>
                  </div>
                  <p className="text-xs text-[#18181A]/60 font-medium">
                    {patient.age} • {patient.gender} • Blood Group: {patient.bloodGroup}
                  </p>
                </div>
              </div>

              {/* Tab Switcher & Close */}
              <div className="flex items-center gap-3">
                <div className="flex bg-[#18181A]/5 p-1 rounded-full border border-[#18181A]/10">
                  <button
                    onClick={() => setActiveModal("reports")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      activeModal === "reports"
                        ? "bg-[#0B392A] text-white shadow-xs"
                        : "text-[#18181A]/70 hover:text-[#18181A]"
                    }`}
                  >
                    Lab Reports ({reportsList.length})
                  </button>
                  <button
                    onClick={() => setActiveModal("history")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      activeModal === "history"
                        ? "bg-[#0B392A] text-white shadow-xs"
                        : "text-[#18181A]/70 hover:text-[#18181A]"
                    }`}
                  >
                    Clinical History
                  </button>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="h-8 w-8 rounded-full border border-[#18181A]/15 hover:bg-[#18181A]/10 flex items-center justify-center text-[#18181A]/70 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* TAB 1: CLEAN LANDSCAPE LAB REPORTS (WITH DOWNLOAD / VIEW ORIGINAL PDF) */}
            {activeModal === "reports" && (
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
                {/* Left Column: Reports List */}
                <div className="md:col-span-5 p-5 border-r border-[#18181A]/10 overflow-y-auto space-y-2.5 bg-white/40">
                  <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block mb-1">
                    Select Report ({reportsList.length})
                  </span>

                  {reportsList.map((rep) => {
                    const isSelected = selectedReportId === rep.id;
                    return (
                      <div
                        key={rep.id}
                        onClick={() => setSelectedReportId(rep.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#0B392A] shadow-sm ring-2 ring-[#0B392A]/15"
                            : "bg-white/80 border-[#18181A]/10 hover:border-[#18181A]/30 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-bold text-[#18181A]">{rep.title}</p>
                          <span
                            className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              rep.status === "Normal"
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-amber-50 text-amber-900 border border-amber-200"
                            }`}
                          >
                            {rep.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#18181A]/60">{rep.category} • {rep.date}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Parameters & Findings + PDF Actions */}
                <div className="md:col-span-7 p-6 overflow-y-auto space-y-4 bg-white/80 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Report Header with Download Button */}
                    <div className="flex items-start justify-between border-b border-[#18181A]/10 pb-3.5">
                      <div>
                        <span className="text-xs font-bold text-[#0B392A] uppercase tracking-wider block">
                          {currentReport.category} • {currentReport.labId}
                        </span>
                        <h4 className="text-base font-bold text-[#18181A] mt-0.5">{currentReport.title}</h4>
                        <p className="text-xs text-[#18181A]/60 mt-0.5">
                          Date: <strong>{currentReport.date}</strong> • Doctor: <strong>{currentReport.doctor}</strong>
                        </p>
                      </div>

                      {/* Download / Print Original Lab PDF Button */}
                      <button
                        onClick={() => handlePrintReport(currentReport)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B392A] hover:bg-[#07241A] text-white text-xs font-bold rounded-full shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                        title="Download or Print Original Lab PDF"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Download Lab PDF</span>
                      </button>
                    </div>

                    {/* Quantitative Parameters Table */}
                    <div className="border border-[#18181A]/15 rounded-2xl overflow-hidden shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#FDFBF2] border-b border-[#18181A]/10 text-[#18181A]/80">
                            <th className="py-2.5 px-3.5 font-bold">Parameter Name</th>
                            <th className="py-2.5 px-3.5 font-bold text-center">Observed Value</th>
                            <th className="py-2.5 px-3.5 font-bold">Standard Range</th>
                            <th className="py-2.5 px-3.5 font-bold text-center">Flag</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#18181A]/10 bg-white">
                          {currentReport.parameters.map((param, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80">
                              <td className="py-2.5 px-3.5 font-bold text-[#18181A]">{param.name}</td>
                              <td className="py-2.5 px-3.5 text-center font-mono font-bold text-sm text-[#18181A]">{param.value}</td>
                              <td className="py-2.5 px-3.5 text-xs text-[#18181A]/70">{param.range}</td>
                              <td className="py-2.5 px-3.5 text-center">
                                <span
                                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    param.status === "normal"
                                      ? "bg-emerald-50 text-emerald-800"
                                      : "bg-amber-100 text-amber-900"
                                  }`}
                                >
                                  {param.status === "normal" ? "Normal" : "Out of Range"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Impression */}
                    <div className="p-3.5 rounded-2xl bg-[#FDFBF2] border border-[#18181A]/15 text-xs space-y-1">
                      <span className="font-bold text-[#18181A] block">
                        Clinical Impression:
                      </span>
                      <p className="text-xs text-[#18181A]/80 leading-relaxed font-normal">
                        {currentReport.impression}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Quick Print Action Bar */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#18181A]/10">
                    <span className="text-[11px] text-[#18181A]/50 font-medium">
                      Sample: {currentReport.sampleType}
                    </span>

                    <button
                      onClick={() => handlePrintReport(currentReport)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0B392A] hover:underline cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Save / Print Original Report Document</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CLEAN LANDSCAPE CLINICAL HISTORY */}
            {activeModal === "history" && (
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
                {/* Left Column: Chronic Profile & Allergies */}
                <div className="md:col-span-6 p-6 border-r border-[#18181A]/10 overflow-y-auto space-y-4 bg-white/40">
                  <div>
                    <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block mb-2">
                      Documented Chronic Conditions
                    </span>
                    <div className="space-y-2">
                      {patient.chronicConditions.map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-white border border-[#18181A]/10 rounded-2xl flex justify-between items-center text-xs shadow-2xs">
                          <div>
                            <p className="text-sm font-bold text-[#18181A]">{item.condition}</p>
                            <p className="text-xs text-[#18181A]/60 mt-0.5">Diagnosed: {item.since}</p>
                          </div>
                          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block mb-2">
                      Current Medications
                    </span>
                    <div className="space-y-2">
                      {patient.activeMedications.map((med, idx) => (
                        <div key={idx} className="p-3.5 bg-white border border-[#18181A]/10 rounded-2xl flex justify-between items-center text-xs shadow-2xs">
                          <div>
                            <p className="text-sm font-bold text-[#18181A]">{med.name}</p>
                            <p className="text-xs text-[#18181A]/60 mt-0.5">{med.frequency}</p>
                          </div>
                          <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                            {med.dosage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block mb-2">
                      Allergies Profile
                    </span>
                    <div className="p-3.5 bg-white border border-[#18181A]/10 rounded-2xl text-xs space-y-2 shadow-2xs">
                      {patient.allergies.map((al, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-[#18181A]/5 pb-1.5 last:border-none last:pb-0">
                          <span className="font-bold text-[#18181A]">{al.allergen} ({al.type})</span>
                          <span className="text-xs font-semibold text-red-800 bg-red-50 px-2.5 py-0.5 rounded-md">
                            {al.reaction}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Historical Consultations */}
                <div className="md:col-span-6 p-6 overflow-y-auto space-y-3.5 bg-white/80">
                  <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block">
                    Consultation History Timeline ({patient.pastVisits.length})
                  </span>

                  <div className="space-y-3">
                    {patient.pastVisits.map((visit, idx) => (
                      <div key={idx} className="p-4 bg-white border border-[#18181A]/10 rounded-2xl text-xs space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between border-b border-[#18181A]/5 pb-2">
                          <div>
                            <p className="text-sm font-bold text-[#18181A]">{visit.doctor}</p>
                            <p className="text-xs text-[#18181A]/50">{visit.specialty}</p>
                          </div>
                          <span className="text-xs font-bold text-[#0B392A] bg-[#0B392A]/10 px-2.5 py-0.5 rounded-full">
                            {visit.date}
                          </span>
                        </div>

                        <div>
                          <span className="text-xs font-bold text-[#18181A]/60 uppercase tracking-wider block">
                            Diagnosis:
                          </span>
                          <p className="text-xs text-[#18181A] font-bold mt-0.5">
                            {visit.diagnosis}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#FDFBF2] border border-[#18181A]/10 text-xs">
                          <strong>Rx:</strong> {visit.rx}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="px-7 py-3.5 border-t border-[#18181A]/10 bg-white/90 flex justify-end flex-shrink-0">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 text-xs font-bold text-white bg-[#18181A] hover:bg-black rounded-full shadow-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
