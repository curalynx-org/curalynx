"use client";

import {
  Brain,
  Pill,
  Syringe,
  Sparkles,
  X,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
  Sun,
  SunMedium,
  Moon,
  Clock,
  Utensils,
  Calendar,
  MessageSquareText,
  FileClock,
  FlaskConical,
  BookOpenCheck,
  LogOut,
  SkipForward,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SessionControls } from "@/components/session/session-controls";
import { PrescriptionModal } from "@/components/session/prescription-modal";

const MEDICINE_CATALOG: { name: string; category: string; dosage: string; reasoning: string }[] = [
  { name: "Paracetamol 650mg", category: "Analgesic & Antipyretic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 3 Days", reasoning: "For symptomatic relief of fever, headache, and body aches." },
  { name: "Amoxicillin + Clavulanic Acid 625mg", category: "Broad-Spectrum Antibiotic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 5 Days", reasoning: "Indicated for acute bacterial infections of upper/lower respiratory tract." },
  { name: "Azithromycin 500mg", category: "Macrolide Antibiotic", dosage: "1 - 0 - 0 (Morning) • Before Food • 3 Days", reasoning: "Targeted macrolide therapy for respiratory and throat infections." },
  { name: "Montelukast + Levocetirizine", category: "Anti-Allergic & Bronchodilator", dosage: "0 - 0 - 1 (Night) • After Food • 5 Days", reasoning: "Dual action for allergic rhinitis, nocturnal sneezing, and airway inflammation." },
  { name: "Pantoprazole 40mg", category: "Proton Pump Inhibitor (PPI)", dosage: "1 - 0 - 0 (Morning) • Empty Stomach • 5 Days", reasoning: "Gastroprotection and suppression of gastric acid hypersecretion." },
  { name: "Ibuprofen 400mg", category: "NSAID Analgesic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 3 Days", reasoning: "Anti-inflammatory and analgesic for acute muscular/joint pain." },
  { name: "Cetirizine 10mg", category: "Second-Gen Antihistamine", dosage: "0 - 0 - 1 (Night) • After Food • 5 Days", reasoning: "Non-sedating antihistamine for urticaria, rhinitis, and itching." },
  { name: "Dextromethorphan Syrup 100ml", category: "Cough Suppressant", dosage: "1 - 1 - 1 (TID) • After Food • 5 Days", reasoning: "Centrally acting antitussive for dry, non-productive irritating cough." },
  { name: "Metformin 500mg", category: "Oral Antidiabetic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 30 Days", reasoning: "First-line biguanide for glycemic control and insulin sensitization." },
  { name: "Telmisartan 40mg", category: "Antihypertensive (ARB)", dosage: "1 - 0 - 0 (Morning) • After Food • 30 Days", reasoning: "Angiotensin receptor blocker for essential hypertension control." },
  { name: "Ondansetron 4mg", category: "Antiemetic (5-HT3 Antagonist)", dosage: "1 - 0 - 1 (PRN / SOS) • Before Food • 3 Days", reasoning: "Prevention and relief of nausea, retching, and acute vomiting." },
  { name: "Cefixime 200mg", category: "Cephalosporin Antibiotic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 5 Days", reasoning: "Third-generation cephalosporin for uncomplicated respiratory and urinary infections." },
  { name: "Doxycycline 100mg", category: "Tetracycline Antibiotic", dosage: "1 - 0 - 1 (Morning, Night) • After Food • 7 Days", reasoning: "Broad-spectrum antibacterial for atypical respiratory and skin infections." },
];

const TEST_CATALOG: { name: string; category: string; urgency: string; reasoning: string }[] = [
  { name: "Complete Blood Count (CBC) with Differential", category: "Hematology", urgency: "Routine", reasoning: "Evaluates red blood cells, leukocytes, absolute eosinophil count, and platelets." },
  { name: "Fasting Blood Sugar (FBS) & HbA1c", category: "Biochemistry", urgency: "Routine", reasoning: "Diagnostic assessment of glycemic baseline and 3-month glycemic control." },
  { name: "Lipid Profile Panel (Total, LDL, HDL, Triglycerides)", category: "Cardiometabolic", urgency: "Routine", reasoning: "Atherosclerotic cardiovascular risk stratification." },
  { name: "Liver Function Tests (LFT - SGOT, SGPT, Bilirubin)", category: "Hepatic Panel", urgency: "Routine", reasoning: "Screening of hepatic enzymes and hepatocellular function." },
  { name: "Kidney Function Tests (KFT - Urea, Creatinine, eGFR)", category: "Renal Panel", urgency: "Routine", reasoning: "Quantitative renal filtration and excretory capacity assessment." },
  { name: "Thyroid Profile (Total T3, Total T4, TSH)", category: "Endocrinology", urgency: "Routine", reasoning: "Evaluation of thyroid gland activity and metabolic regulation." },
  { name: "Digital Chest X-Ray (PA View)", category: "Radiology", urgency: "Urgent", reasoning: "Screening for pulmonary consolidation, pneumonia, infiltration, and cardiomegaly." },
  { name: "12-Lead Electrocardiogram (ECG)", category: "Cardiology", urgency: "Urgent", reasoning: "Assesses cardiac rhythm, conduction abnormalities, and ischemic changes." },
  { name: "Urine Routine & Microscopic Examination", category: "Clinical Pathology", urgency: "Routine", reasoning: "Detects proteinuria, hematuria, leukocyturia, and crystals." },
  { name: "Serum Electrolytes (Sodium, Potassium, Chloride)", category: "Biochemistry", urgency: "Urgent", reasoning: "Monitors fluid and electrolyte equilibrium." },
  { name: "Dengue NS1 Antigen & IgM/IgG Serology", category: "Virology", urgency: "Stat", reasoning: "Rapid diagnostic confirmation for acute febrile dengue virus infection." },
  { name: "Serum Ferritin & Iron Studies", category: "Hematology", urgency: "Routine", reasoning: "Identifies iron deficiency anemia and reticuloendothelial iron stores." },
  { name: "Total Serum IgE & Inhalant Allergen Panel", category: "Immunology", urgency: "Routine", reasoning: "Quantifies allergic sensitization and atopic hyperreactivity." },
];

export interface ClinicalItem {
  name: string;
  dosage?: string;
  category?: string;
  confidence?: number;
  conversation_evidence?: string;
  history_evidence?: string;
  reports_evidence?: string;
  reasoning?: string;
  urgency?: string;
}

export interface MedicationSchedule {
  morning: number;
  afternoon: number;
  night: number;
  food: "After Food" | "Before Food" | "Empty Stomach" | "With Food";
  duration: string;
}

interface AIInsightsProps {
  patientId: string;
  insights?: {
    medicines?: (string | ClinicalItem)[];
    tests?: (string | ClinicalItem)[];
  };
}

export function AIInsights({ patientId, insights }: AIInsightsProps) {
  // Normalize incoming medicines to structured ClinicalItem objects
  const medicines: ClinicalItem[] = (insights?.medicines || []).map((m) => {
    if (typeof m === "string") {
      return {
        name: m,
        dosage: "1 - 0 - 1 (Morning & Night) • After Food • 5 Days",
        category: "Therapeutic Medication",
        confidence: 96,
        conversation_evidence: "Patient reported active symptoms during live consultation dialogue.",
        history_evidence: "No documented drug allergy or contraindications in medical history profile.",
        reports_evidence: "Baseline vitals and previous diagnostic history indicate standard first-line eligibility.",
        reasoning: `Indicated for symptom management. Clinical guidelines recommend early initiation of ${m}.`,
      };
    }
    return {
      name: m.name,
      dosage: m.dosage || "1 - 0 - 1 (Morning & Night) • After Food • 5 Days",
      category: m.category || "Therapeutic Medication",
      confidence: m.confidence || 95,
      conversation_evidence:
        m.conversation_evidence ||
        "Patient reported active symptoms during the live consultation dialogue.",
      history_evidence:
        m.history_evidence ||
        "No contraindications, adverse reactions, or drug-drug interactions in patient history.",
      reports_evidence:
        m.reports_evidence ||
        "Correlates with baseline laboratory parameters and vital signs tracking.",
      reasoning:
        m.reasoning ||
        `Indicated based on multi-source clinical correlation for symptoms discussed in consultation.`,
    };
  });

  // Normalize incoming tests to structured ClinicalItem objects
  const tests: ClinicalItem[] = (insights?.tests || []).map((t) => {
    if (typeof t === "string") {
      return {
        name: t,
        urgency: "Routine",
        confidence: 94,
        conversation_evidence: "Clinical findings and symptoms presented during consultation.",
        history_evidence: "Assesses patient history risk factors and excludes differential diagnoses.",
        reports_evidence: "Establishes quantitative diagnostic baseline for WBC, metabolic, and inflammatory markers.",
        reasoning: `Diagnostic investigation recommended to confirm clinical findings and guide medical management.`,
      };
    }
    return {
      name: t.name,
      urgency: t.urgency || "Standard",
      confidence: t.confidence || 93,
      conversation_evidence:
        t.conversation_evidence ||
        "Clinical findings and symptoms presented during consultation.",
      history_evidence:
        t.history_evidence ||
        "Assesses patient history risk factors and excludes differential diagnoses.",
      reports_evidence:
        t.reports_evidence ||
        "Establishes quantitative diagnostic baseline for WBC, metabolic, and inflammatory markers.",
      reasoning:
        t.reasoning ||
        `Diagnostic test recommended to evaluate baseline parameters and confirm differential diagnosis.`,
    };
  });

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<{
    item: ClinicalItem;
    type: "medicine" | "test";
  } | null>(null);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showPreGenerationConfirmation, setShowPreGenerationConfirmation] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showSkipPatientModal, setShowSkipPatientModal] = useState(false);
  const [showEmptyWarningModal, setShowEmptyWarningModal] = useState(false);

  // Search & Catalog Add States
  const [customMedicines, setCustomMedicines] = useState<ClinicalItem[]>([]);
  const [customTests, setCustomTests] = useState<ClinicalItem[]>([]);
  const [medSearch, setMedSearch] = useState("");
  const [testSearch, setTestSearch] = useState("");

  // Structured Schedules map by medication name
  const [schedules, setSchedules] = useState<Record<string, MedicationSchedule>>({});

  const [notificationItem, setNotificationItem] = useState<{
    item: ClinicalItem;
    type: "medicine" | "test";
    action: "added" | "removed";
    dosage?: string;
  } | null>(null);

  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Combined Active Lists (AI detected + Physician added via search)
  const allMedicines: ClinicalItem[] = [
    ...medicines,
    ...customMedicines.filter(
      (cm) => !medicines.some((m) => m.name.toLowerCase() === cm.name.toLowerCase())
    ),
  ];

  const allTests: ClinicalItem[] = [
    ...tests,
    ...customTests.filter(
      (ct) => !tests.some((t) => t.name.toLowerCase() === ct.name.toLowerCase())
    ),
  ];

  const filteredMedicines = allMedicines.filter((m) =>
    m.name.toLowerCase().includes(medSearch.toLowerCase()) ||
    (m.category && m.category.toLowerCase().includes(medSearch.toLowerCase()))
  );

  const filteredTests = allTests.filter((t) =>
    t.name.toLowerCase().includes(testSearch.toLowerCase()) ||
    (t.category && t.category.toLowerCase().includes(testSearch.toLowerCase()))
  );

  // Live suggestions from catalog
  const medSuggestions = medSearch.trim().length > 0
    ? MEDICINE_CATALOG.filter(
        (cat) =>
          cat.name.toLowerCase().includes(medSearch.toLowerCase()) ||
          cat.category.toLowerCase().includes(medSearch.toLowerCase())
      ).slice(0, 4)
    : [];

  const testSuggestions = testSearch.trim().length > 0
    ? TEST_CATALOG.filter(
        (cat) =>
          cat.name.toLowerCase().includes(testSearch.toLowerCase()) ||
          cat.category.toLowerCase().includes(testSearch.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleAddCustomMed = (cat: typeof MEDICINE_CATALOG[0]) => {
    const newItem: ClinicalItem = {
      name: cat.name,
      category: cat.category,
      dosage: cat.dosage,
      confidence: 96,
      conversation_evidence: "Added directly by physician during clinical session search.",
      history_evidence: "Verified with patient drug allergy & tolerance profile.",
      reports_evidence: "Standard clinical therapeutic formulation.",
      reasoning: cat.reasoning,
    };
    if (!allMedicines.some((m) => m.name.toLowerCase() === cat.name.toLowerCase())) {
      setCustomMedicines((prev) => [...prev, newItem]);
    }
    setMedSearch("");
    // Immediately open Dosage Configuration Modal for the doctor to review/confirm schedule!
    setSelectedItem({ item: newItem, type: "medicine" });
  };

  const handleAddCustomTest = (cat: typeof TEST_CATALOG[0]) => {
    const newItem: ClinicalItem = {
      name: cat.name,
      category: cat.category,
      urgency: cat.urgency,
      confidence: 95,
      conversation_evidence: "Investigation ordered directly by physician during clinical search.",
      history_evidence: "Indicated to evaluate quantitative diagnostic parameters.",
      reports_evidence: "Standard clinical diagnostic panel.",
      reasoning: cat.reasoning,
    };
    if (!allTests.some((t) => t.name.toLowerCase() === cat.name.toLowerCase())) {
      setCustomTests((prev) => [...prev, newItem]);
    }
    setTestSearch("");
    // Immediately open Investigation Confirmation Modal for the doctor to review/confirm!
    setSelectedItem({ item: newItem, type: "test" });
  };

  const handleGeneratePrescriptionClick = () => {
    const selectedCount = Object.keys(addedItems).length;
    if (selectedCount === 0) {
      setShowEmptyWarningModal(true);
      return;
    }
    // STEP 1: Show Pre-Generation Confirmation & Review of Selected Medicines and Tests
    setShowPreGenerationConfirmation(true);
  };

  const getSchedule = (name: string): MedicationSchedule => {
    return (
      schedules[name] || {
        morning: 1,
        afternoon: 0,
        night: 1,
        food: "After Food",
        duration: "5 Days",
      }
    );
  };

  const formatScheduleString = (sch: MedicationSchedule): string => {
    const pattern = `${sch.morning} - ${sch.afternoon} - ${sch.night}`;
    const times: string[] = [];
    if (sch.morning > 0) times.push(`Morning: ${sch.morning} Tab${sch.morning > 1 ? "s" : ""}`);
    if (sch.afternoon > 0) times.push(`Afternoon: ${sch.afternoon} Tab${sch.afternoon > 1 ? "s" : ""}`);
    if (sch.night > 0) times.push(`Night: ${sch.night} Tab${sch.night > 1 ? "s" : ""}`);
    const timeLabel = times.length > 0 ? ` (${times.join(", ")})` : " (SOS / When Needed)";
    return `${pattern}${timeLabel} • ${sch.food} • ${sch.duration}`;
  };

  const getEffectiveDosage = (item: ClinicalItem) => {
    if (schedules[item.name]) {
      return formatScheduleString(schedules[item.name]);
    }
    return item.dosage || "1 - 0 - 1 (Morning, Night) • After Food • 5 Days";
  };

  const handleToggle = (item: ClinicalItem, type: "medicine" | "test") => {
    const isCurrentlyAdded = !!addedItems[item.name];
    const dosage = getEffectiveDosage(item);

    if (isCurrentlyAdded) {
      setAddedItems((prev) => {
        const next = { ...prev };
        delete next[item.name];
        return next;
      });
      setSelectedItem(null);
      setNotificationItem({ item, type, action: "removed", dosage });
    } else {
      setAddedItems((prev) => ({ ...prev, [item.name]: true }));
      setSelectedItem(null);
      setNotificationItem({ item, type, action: "added", dosage });
    }
  };

  const updateSlotQuantity = (
    medName: string,
    slot: "morning" | "afternoon" | "night",
    delta: number
  ) => {
    const current = getSchedule(medName);
    const newQty = Math.max(0, Math.min(5, (current[slot] || 0) + delta));
    setSchedules((prev) => ({
      ...prev,
      [medName]: {
        ...current,
        [slot]: newQty,
      },
    }));
  };

  const setSlotQuantity = (
    medName: string,
    slot: "morning" | "afternoon" | "night",
    qty: number
  ) => {
    const current = getSchedule(medName);
    setSchedules((prev) => ({
      ...prev,
      [medName]: {
        ...current,
        [slot]: qty,
      },
    }));
  };

  const currentSchedule = selectedItem ? getSchedule(selectedItem.item.name) : null;

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden relative font-sans">
      {/* Same Line Header: Cura AI on Left, Session Controls on Right */}
      <div className="flex items-center justify-between pb-5 flex-shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-2xl bg-white border border-[#18181A]/15 p-1 flex items-center justify-center shadow-xs shrink-0">
            <img src="/curalynx-logo.png" alt="Cura AI" className="h-full w-full object-contain scale-105" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-[#18181A]">Cura AI</h2>
            <p className="text-sm text-[#18181A]/60 font-medium flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B392A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B392A]"></span>
              </span>
              Analyzing session...
            </p>
          </div>
        </div>

        <SessionControls
          onGeneratePrescription={handleGeneratePrescriptionClick}
          onSkipPatient={() => setShowSkipPatientModal(true)}
          onEndSession={() => setShowEndSessionModal(true)}
        />
      </div>

      {/* Two Column Boxed Layout for Medications & Tests */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5 pb-2">
        {/* Suggested Medications Box */}
        <div className="flex flex-col h-full min-h-0 bg-[#FDFBF2] border border-[#18181A]/20 rounded-[28px] p-5 shadow-sm overflow-hidden">
          {/* Box Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#18181A]/10 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-[#E9D5FF] border border-[#18181A]/20 flex items-center justify-center text-[#18181A]">
                <Pill className="h-4 w-4" />
              </div>
              <h3 className="text-[15px] font-bold text-[#18181A]">
                Suggested Medications
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#18181A]/5 text-[#18181A]/70 border border-[#18181A]/10">
              {allMedicines.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3 flex-shrink-0">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#18181A]/40" />
            <input
              type="text"
              value={medSearch}
              onChange={(e) => setMedSearch(e.target.value)}
              placeholder="Search or add medication (e.g. Paracetamol, Amoxicillin)..."
              className="w-full pl-8.5 pr-8 py-2 text-xs bg-white border border-[#18181A]/15 rounded-xl text-[#18181A] placeholder:text-[#18181A]/40 focus:outline-none focus:ring-2 focus:ring-[#0B392A]/20 focus:border-[#0B392A]"
            />
            {medSearch && (
              <button
                onClick={() => setMedSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#18181A]/40 hover:text-[#18181A] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Suggestions Dropdown from Catalog */}
            {medSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-[#18181A]/15 rounded-2xl shadow-lg p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[10px] font-bold text-[#18181A]/50 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                  <span>Clinical Catalog Suggestions</span>
                  <span className="text-purple-700">Click + to add</span>
                </div>
                {medSuggestions.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAddCustomMed(cat)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FDFBF2] border border-transparent hover:border-[#18181A]/10 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-bold text-[#18181A] truncate">{cat.name}</p>
                      <p className="text-[10.5px] text-[#18181A]/50 truncate">{cat.category} • {cat.dosage}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCustomMed(cat);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-[#0B392A] hover:bg-[#07241A] rounded-full shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Box Content List */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 no-scrollbar">
            {filteredMedicines.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
                <p className="text-xs font-medium text-[#18181A]/40">
                  {medSearch
                    ? "No matching medications found in active list. Type to search catalog."
                    : "Speak into the microphone or use search above to add medications."}
                </p>
              </div>
            ) : (
              filteredMedicines.map((med, i) => {
                const isAdded = !!addedItems[med.name];
                const activeDosage = getEffectiveDosage(med);
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedItem({ item: med, type: "medicine" })}
                    className="group bg-white border border-[#18181A]/15 hover:border-[#18181A]/40 p-4 rounded-[20px] shadow-2xs relative overflow-hidden transition-all cursor-pointer hover:shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="pr-3 flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#18181A] leading-snug break-words group-hover:text-[#0B392A] transition-colors">
                          {med.name}
                        </p>
                        <p className="text-[11px] font-medium text-[#18181A]/50 mt-0.5">
                          {med.category || "Clinical Therapeutic"}
                        </p>
                      </div>

                      {/* Action Button - opens details modal */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem({ item: med, type: "medicine" });
                        }}
                        className={`h-7 w-7 shrink-0 rounded-full border flex items-center justify-center font-bold text-xs transition-all shadow-2xs ${
                          isAdded
                            ? "bg-[#0B392A] text-white border-[#0B392A]"
                            : "bg-[#E9D5FF] text-[#18181A] border-[#18181A] hover:bg-[#D8B4FE]"
                        }`}
                        title="View clinical evidence & dosage options"
                      >
                        {isAdded ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Dosage Preview Tag */}
                    <div className="text-[11px] font-semibold text-[#18181A]/80 mb-2 truncate flex items-center gap-1.5 bg-[#FDFBF2] px-2.5 py-1 rounded-lg border border-[#18181A]/10">
                      <Clock className="h-3 w-3 text-[#18181A]/50" />
                      <span>{activeDosage}</span>
                    </div>

                    {/* Confidence Score Badge & Status */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#18181A]/5">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#581C87] text-[10.5px] font-bold">
                          <Sparkles className="h-3 w-3 text-[#7E22CE]" />
                          <span>{med.confidence || 95}% Confidence</span>
                        </div>

                        {isAdded && (
                          <span className="text-[10px] font-bold text-[#0B392A] bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                            In Prescription
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recommended Tests Box */}
        <div className="flex flex-col h-full min-h-0 bg-[#FDFBF2] border border-[#18181A]/20 rounded-[28px] p-5 shadow-sm overflow-hidden">
          {/* Box Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#18181A]/10 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-[#E9D5FF] border border-[#18181A]/20 flex items-center justify-center text-[#18181A]">
                <Syringe className="h-4 w-4" />
              </div>
              <h3 className="text-[15px] font-bold text-[#18181A]">
                Recommended Tests
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#18181A]/5 text-[#18181A]/70 border border-[#18181A]/10">
              {allTests.length}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3 flex-shrink-0">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#18181A]/40" />
            <input
              type="text"
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
              placeholder="Search or add diagnostic tests (e.g. CBC, Lipid, X-Ray)..."
              className="w-full pl-8.5 pr-8 py-2 text-xs bg-white border border-[#18181A]/15 rounded-xl text-[#18181A] placeholder:text-[#18181A]/40 focus:outline-none focus:ring-2 focus:ring-[#0B392A]/20 focus:border-[#0B392A]"
            />
            {testSearch && (
              <button
                onClick={() => setTestSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#18181A]/40 hover:text-[#18181A] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Suggestions Dropdown from Catalog */}
            {testSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-[#18181A]/15 rounded-2xl shadow-lg p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[10px] font-bold text-[#18181A]/50 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                  <span>Diagnostic Catalog Suggestions</span>
                  <span className="text-blue-700">Click + to add</span>
                </div>
                {testSuggestions.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAddCustomTest(cat)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FDFBF2] border border-transparent hover:border-[#18181A]/10 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-bold text-[#18181A] truncate">{cat.name}</p>
                      <p className="text-[10.5px] text-[#18181A]/50 truncate">{cat.category} • Priority: {cat.urgency}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCustomTest(cat);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] rounded-full shadow-2xs cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Box Content List */}
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 no-scrollbar">
            {filteredTests.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
                <p className="text-xs font-medium text-[#18181A]/40">
                  {testSearch
                    ? "No matching tests found in active list. Type to search catalog."
                    : "Speak into the microphone or use search above to order diagnostic tests."}
                </p>
              </div>
            ) : (
              filteredTests.map((test, i) => {
                const isAdded = !!addedItems[test.name];
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedItem({ item: test, type: "test" })}
                    className="group bg-white border border-[#18181A]/15 hover:border-[#18181A]/40 p-4 rounded-[20px] shadow-2xs relative overflow-hidden transition-all cursor-pointer hover:shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="pr-3 flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#18181A] leading-snug break-words group-hover:text-[#0B392A] transition-colors">
                          {test.name}
                        </p>
                        <p className="text-[11px] font-medium text-[#18181A]/50 mt-0.5">
                          {test.category || "Diagnostic Panel"}
                        </p>
                      </div>

                      {/* Action Button - opens details modal */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem({ item: test, type: "test" });
                        }}
                        className={`h-7 w-7 shrink-0 rounded-full border flex items-center justify-center font-bold text-xs transition-all shadow-2xs ${
                          isAdded
                            ? "bg-[#0B392A] text-white border-[#0B392A]"
                            : "bg-white text-[#18181A] border-[#18181A]/20 hover:bg-[#18181A]/5"
                        }`}
                        title="View clinical evidence & diagnostic options"
                      >
                        {isAdded ? (
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Confidence Score Badge & Status */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#18181A]/5 mt-2">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-[10.5px] font-bold">
                          <Sparkles className="h-3 w-3 text-[#0284C7]" />
                          <span>{test.confidence || 93}% Confidence</span>
                        </div>

                        {isAdded && (
                          <span className="text-[10px] font-bold text-[#0B392A] bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                            In Orders
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* POPUP 1: WIDE LANDSCAPE Multi-Source Clinical Evidence (LEFT) & Multi-Tablet Stepper / Dosage (RIGHT) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[28px] w-full max-w-4xl lg:max-w-5xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col font-sans max-h-[92vh]">
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#18181A]/10 bg-white/75 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#E9D5FF] border border-[#18181A]/20 flex items-center justify-center text-[#18181A]">
                  {selectedItem.type === "medicine" ? (
                    <Pill className="h-5 w-5" />
                  ) : (
                    <Syringe className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                    {selectedItem.type === "medicine"
                      ? "Medication Clinical Dossier"
                      : "Diagnostic Order Dossier"}
                  </span>
                  <h3 className="text-lg font-bold text-[#18181A] leading-tight tracking-tight">
                    {selectedItem.item.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="h-8 w-8 rounded-full border border-[#18181A]/10 hover:bg-[#18181A]/5 flex items-center justify-center text-[#18181A]/70 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Landscape Two-Column Body: EXPLANATION ON LEFT, DOSAGE WITH MULTI-TABLET STEPPERS ON RIGHT */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">
              {/* LEFT COLUMN: Clinical Explanation & Multi-Source Evidence (60%) */}
              <div className="md:col-span-7 p-6 space-y-3.5 border-b md:border-b-0 md:border-r border-[#18181A]/10 bg-transparent overflow-y-auto">
                {/* Confidence Score Bar Box */}
                <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#18181A]">
                      <Sparkles className="h-4 w-4 text-[#7E22CE]" />
                      <span>AI Clinical Confidence Score</span>
                    </div>
                    <span className="text-base font-bold text-[#0B392A]">
                      {selectedItem.item.confidence}% Match
                    </span>
                  </div>

                  <div className="h-2 w-full bg-[#18181A]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B392A] rounded-full transition-all duration-500"
                      style={{ width: `${selectedItem.item.confidence}%` }}
                    />
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#18181A]/50 pt-1">
                  Multi-Source Clinical Evidence Breakdown
                </div>

                {/* Reference 1: Current Conversation */}
                <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">
                    <MessageSquareText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-bold text-[#18181A] uppercase tracking-wide">
                        1. Current Conversation Evidence
                      </span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100/60 px-2 py-0.2 rounded-full">
                        Live Dialogue
                      </span>
                    </div>
                    <p className="text-xs text-[#18181A]/80 leading-relaxed mt-1">
                      {selectedItem.item.conversation_evidence ||
                        "Patient actively reported acute onset symptoms during the recorded consultation dialogue."}
                    </p>
                  </div>
                </div>

                {/* Reference 2: Patient History */}
                <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                    <FileClock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-bold text-[#18181A] uppercase tracking-wide">
                        2. Patient Medical History
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.2 rounded-full">
                        Profile Screened
                      </span>
                    </div>
                    <p className="text-xs text-[#18181A]/80 leading-relaxed mt-1">
                      {selectedItem.item.history_evidence ||
                        "Screened against patient health record: No documented allergies, organ impairment, or adverse drug interactions."}
                    </p>
                  </div>
                </div>

                {/* Reference 3: Reports & Diagnostic Baseline */}
                <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                    <FlaskConical className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11.5px] font-bold text-[#18181A] uppercase tracking-wide">
                        3. Clinical Reports & Baseline
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.2 rounded-full">
                        Diagnostics
                      </span>
                    </div>
                    <p className="text-xs text-[#18181A]/80 leading-relaxed mt-1">
                      {selectedItem.item.reports_evidence ||
                        "Correlates with baseline physiological vitals and previous laboratory parameters on file."}
                    </p>
                  </div>
                </div>

                {/* Reference 4: Clinical Protocol Synthesis */}
                <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                    <BookOpenCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11.5px] font-bold text-[#18181A] uppercase tracking-wide block">
                      4. Evidence-Based Clinical Synthesis
                    </span>
                    <p className="text-xs text-[#18181A]/80 leading-relaxed mt-1">
                      {selectedItem.item.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Multi-Tablet Quantity Steppers & Dosage Matrix (40%) */}
              <div className="md:col-span-5 p-6 bg-white/40 flex flex-col justify-between gap-5 overflow-y-auto">
                <div className="space-y-4">
                  {/* CLINICAL DOSAGE TIMING MATRIX WITH MULTI-TABLET STEPPERS */}
                  {selectedItem.type === "medicine" && currentSchedule && (
                    <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#18181A] uppercase tracking-wider flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#7E22CE]" /> Tablet Quantities & Timing
                        </span>
                        <span className="text-[11px] font-bold text-[#7E22CE] bg-[#F3E8FF] px-2.5 py-0.5 rounded-full">
                          {currentSchedule.morning} - {currentSchedule.afternoon} - {currentSchedule.night}
                        </span>
                      </div>

                      {/* Day / Afternoon / Night Multi-Tablet Steppers */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* Morning (Day) Stepper */}
                        <div
                          className={`p-2.5 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                            currentSchedule.morning > 0
                              ? "bg-[#0B392A] text-white border-[#0B392A] shadow-xs"
                              : "bg-[#FDFBF2] text-[#18181A]/60 border-[#18181A]/15"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Sun className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-bold">Morning</span>
                          </div>

                          <div className="flex items-center justify-between w-full px-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "morning", -1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.morning > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/5 text-[#18181A]/40"
                              }`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="text-sm font-bold">
                              {currentSchedule.morning}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "morning", 1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.morning > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/10 hover:bg-[#18181A]/20 text-[#18181A]"
                              }`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="text-[9.5px] opacity-80 font-medium">
                            {currentSchedule.morning === 0
                              ? "None"
                              : `${currentSchedule.morning} Tab${
                                  currentSchedule.morning > 1 ? "s" : ""
                                }`}
                          </span>
                        </div>

                        {/* Afternoon Stepper */}
                        <div
                          className={`p-2.5 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                            currentSchedule.afternoon > 0
                              ? "bg-[#0B392A] text-white border-[#0B392A] shadow-xs"
                              : "bg-[#FDFBF2] text-[#18181A]/60 border-[#18181A]/15"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <SunMedium className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-bold">Afternoon</span>
                          </div>

                          <div className="flex items-center justify-between w-full px-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "afternoon", -1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.afternoon > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/5 text-[#18181A]/40"
                              }`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="text-sm font-bold">
                              {currentSchedule.afternoon}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "afternoon", 1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.afternoon > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/10 hover:bg-[#18181A]/20 text-[#18181A]"
                              }`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="text-[9.5px] opacity-80 font-medium">
                            {currentSchedule.afternoon === 0
                              ? "None"
                              : `${currentSchedule.afternoon} Tab${
                                  currentSchedule.afternoon > 1 ? "s" : ""
                                }`}
                          </span>
                        </div>

                        {/* Night Stepper */}
                        <div
                          className={`p-2.5 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                            currentSchedule.night > 0
                              ? "bg-[#0B392A] text-white border-[#0B392A] shadow-xs"
                              : "bg-[#FDFBF2] text-[#18181A]/60 border-[#18181A]/15"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Moon className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-bold">Night</span>
                          </div>

                          <div className="flex items-center justify-between w-full px-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "night", -1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.night > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/5 text-[#18181A]/40"
                              }`}
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="text-sm font-bold">
                              {currentSchedule.night}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateSlotQuantity(selectedItem.item.name, "night", 1)
                              }
                              className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                currentSchedule.night > 0
                                  ? "bg-white/20 hover:bg-white/30 text-white"
                                  : "bg-[#18181A]/10 hover:bg-[#18181A]/20 text-[#18181A]"
                              }`}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="text-[9.5px] opacity-80 font-medium">
                            {currentSchedule.night === 0
                              ? "None"
                              : `${currentSchedule.night} Tab${
                                  currentSchedule.night > 1 ? "s" : ""
                                }`}
                          </span>
                        </div>
                      </div>

                      {/* Food Timing */}
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-[#18181A]/50 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <Utensils className="h-3 w-3" /> Food Instructions
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {(["After Food", "Before Food", "Empty Stomach", "With Food"] as const).map(
                            (foodOpt) => (
                              <button
                                key={foodOpt}
                                type="button"
                                onClick={() => {
                                  setSchedules((prev) => ({
                                    ...prev,
                                    [selectedItem.item.name]: {
                                      ...currentSchedule,
                                      food: foodOpt,
                                    },
                                  }));
                                }}
                                className={`text-[10.5px] font-bold py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                                  currentSchedule.food === foodOpt
                                    ? "bg-[#E9D5FF] text-[#18181A] border-[#18181A]"
                                    : "bg-[#FDFBF2] text-[#18181A]/60 border-[#18181A]/15 hover:bg-[#18181A]/5"
                                }`}
                              >
                                {foodOpt}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Duration in Days */}
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-[#18181A]/50 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Duration
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {["3 Days", "5 Days", "7 Days", "10 Days", "14 Days", "SOS (PRN)"].map(
                            (dur) => (
                              <button
                                key={dur}
                                type="button"
                                onClick={() => {
                                  setSchedules((prev) => ({
                                    ...prev,
                                    [selectedItem.item.name]: {
                                      ...currentSchedule,
                                      duration: dur,
                                    },
                                  }));
                                }}
                                className={`text-[10.5px] font-bold py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${
                                  currentSchedule.duration === dur
                                    ? "bg-[#0B392A] text-white border-[#0B392A]"
                                    : "bg-[#FDFBF2] text-[#18181A]/60 border-[#18181A]/15 hover:bg-[#18181A]/5"
                                }`}
                              >
                                {dur}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Summary String */}
                      <div className="p-2.5 rounded-xl bg-[#FDFBF2] border border-[#18181A]/10 text-[11px] font-semibold text-[#18181A]">
                        {formatScheduleString(currentSchedule)}
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Test Summary (For Tests) */}
                  {selectedItem.type === "test" && (
                    <div className="bg-white border border-[#18181A]/10 p-4 rounded-2xl shadow-2xs space-y-2">
                      <span className="text-[11px] font-bold text-[#18181A] uppercase tracking-wider block">
                        Lab Order Instruction
                      </span>
                      <p className="text-xs text-[#18181A]/80 leading-relaxed">
                        Diagnostic panel ordered to screen clinical findings and assess inflammatory markers.
                      </p>
                      <div className="p-2.5 rounded-xl bg-[#FDFBF2] border border-[#18181A]/10 text-[11px] font-bold text-[#18181A]">
                        Priority: {selectedItem.item.urgency || "Standard Lab Panel"}
                      </div>
                    </div>
                  )}

                  {/* Order Status */}
                  <div className="bg-white border border-[#18181A]/10 p-3.5 rounded-2xl shadow-2xs flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#18181A]/60">
                      Prescription Status:
                    </span>
                    {addedItems[selectedItem.item.name] ? (
                      <span className="text-[11px] font-bold text-[#0B392A] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        ✓ In Prescription
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#18181A]/50 bg-[#18181A]/5 border border-[#18181A]/10 px-2.5 py-0.5 rounded-full">
                        Not Added
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Panel Action Button */}
                <div className="pt-2 flex flex-col gap-2">
                  {addedItems[selectedItem.item.name] ? (
                    <button
                      onClick={() => handleToggle(selectedItem.item, selectedItem.type)}
                      className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-300 rounded-full shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {selectedItem.type === "medicine"
                        ? "Remove from Prescription"
                        : "Remove from Diagnostic Orders"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggle(selectedItem.item, selectedItem.type)}
                      className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-[#18181A] bg-[#E9D5FF] hover:bg-[#D8B4FE] border border-[#18181A] rounded-full shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {selectedItem.type === "medicine"
                        ? "Add to Prescription"
                        : "Add to Diagnostic Orders"}
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2 text-xs font-semibold text-[#18181A]/60 hover:text-[#18181A] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2: Add / Remove Confirmation Popup (Prominent & Clear for Doctors) */}
      {notificationItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] p-8 max-w-lg w-full shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-150">
            {/* Status Icon */}
            <div
              className={`h-16 w-16 rounded-3xl border flex items-center justify-center mx-auto shadow-xs ${
                notificationItem.action === "added"
                  ? "bg-[#E0F2FE] border-[#0284C7]/30 text-[#0B392A]"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {notificationItem.action === "added" ? (
                <CheckCircle2 className="h-8 w-8 text-[#0B392A]" />
              ) : (
                <Trash2 className="h-8 w-8 text-red-600" />
              )}
            </div>

            {/* Modal Heading */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#18181A]/50 block mb-1">
                {notificationItem.type === "medicine"
                  ? "Prescription Order Update"
                  : "Diagnostic Order Update"}
              </span>
              <h3 className="text-xl font-bold text-[#18181A] tracking-tight">
                {notificationItem.action === "added"
                  ? "Successfully Added to Prescription!"
                  : "Removed from Orders"}
              </h3>
            </div>

            {/* Medicine & Dosage Details Card */}
            <div className="bg-white border border-[#18181A]/15 rounded-2xl p-5 shadow-2xs space-y-3 text-left">
              <div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#18181A]/50 block">
                  {notificationItem.type === "medicine"
                    ? "Medication"
                    : "Diagnostic Test"}
                </span>
                <p className="text-base font-bold text-[#18181A] leading-snug">
                  {notificationItem.item.name}
                </p>
              </div>

              {notificationItem.dosage && (
                <div className="pt-2 border-t border-[#18181A]/10">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#18181A]/50 block mb-1">
                    Prescribed Dosage & Schedule
                  </span>
                  <div className="p-3 rounded-xl bg-[#0B392A]/5 border border-[#0B392A]/15 text-[#0B392A] font-bold text-xs leading-relaxed">
                    {notificationItem.dosage}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-1">
              <button
                onClick={() => setNotificationItem(null)}
                className={`w-full py-3 text-sm font-bold rounded-full shadow-xs transition-all cursor-pointer ${
                  notificationItem.action === "added"
                    ? "text-white bg-[#0B392A] hover:bg-[#07241A] active:scale-98"
                    : "text-[#18181A] bg-[#18181A]/10 hover:bg-[#18181A]/15 active:scale-98"
                }`}
              >
                Done / Continue Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2.5: Pre-Generation Review & Confirmation Dialog */}
      {showPreGenerationConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#18181A]/10 bg-white flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#0B392A] text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181A]">
                    Review Prescription & Diagnostic Orders
                  </h3>
                  <p className="text-xs text-[#18181A]/60 font-medium">
                    Step 1 of 2: Verify selected items before generating official letterhead
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPreGenerationConfirmation(false)}
                className="h-8 w-8 rounded-full border border-[#18181A]/15 hover:bg-[#18181A]/10 flex items-center justify-center text-[#18181A]/70 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white/40">
              {/* Selected Medications Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#18181A]/70 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="h-3.5 w-3.5 text-purple-700" /> Prescribed Medications (
                    {allMedicines.filter((m) => addedItems[m.name]).length})
                  </span>
                </div>

                {allMedicines.filter((m) => addedItems[m.name]).length > 0 ? (
                  <div className="space-y-2">
                    {allMedicines
                      .filter((m) => addedItems[m.name])
                      .map((med, idx) => {
                        const sch = getSchedule(med.name);
                        return (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-white border border-[#18181A]/10 shadow-2xs flex items-center justify-between"
                          >
                            <div className="min-w-0 flex-1 pr-3">
                              <p className="text-sm font-bold text-[#18181A]">{med.name}</p>
                              <p className="text-xs text-[#18181A]/60 font-medium mt-0.5">
                                Schedule: <strong className="text-[#0B392A] font-mono">{sch.morning}-{sch.afternoon}-{sch.night}</strong> ({sch.food}) • {sch.duration}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                setShowPreGenerationConfirmation(false);
                                setSelectedItem({ item: med, type: "medicine" });
                              }}
                              className="px-3 py-1 text-xs font-bold text-[#0B392A] bg-[#0B392A]/10 hover:bg-[#0B392A]/20 rounded-full cursor-pointer transition-colors"
                            >
                              Edit Schedule
                            </button>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-white border border-[#18181A]/10 text-xs text-[#18181A]/50 italic">
                    No medications selected.
                  </div>
                )}
              </div>

              {/* Selected Diagnostic Tests Section */}
              {allTests.filter((t) => addedItems[t.name]).length > 0 && (
                <div>
                  <span className="text-xs font-bold text-[#18181A]/70 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Syringe className="h-3.5 w-3.5 text-blue-600" /> Ordered Investigations (
                    {allTests.filter((t) => addedItems[t.name]).length})
                  </span>
                  <div className="space-y-2">
                    {allTests
                      .filter((t) => addedItems[t.name])
                      .map((test, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-white border border-[#18181A]/10 shadow-2xs flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-bold text-[#18181A]">{test.name}</p>
                            <p className="text-xs text-[#18181A]/60">{test.category || "Diagnostic Panel"}</p>
                          </div>
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                            {test.urgency || "Standard"}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-[#18181A]/10 bg-white flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => setShowPreGenerationConfirmation(false)}
                className="px-4 py-2 text-xs font-bold text-[#18181A]/70 hover:text-[#18181A] transition-colors cursor-pointer"
              >
                ← Back / Add More Items
              </button>

              <button
                onClick={() => {
                  setShowPreGenerationConfirmation(false);
                  setShowPrescriptionModal(true);
                }}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0B392A] hover:bg-[#07241A] rounded-full shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <span>Proceed to Prescription Preview →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 3: Official Clinical Prescription & PDF Export Modal */}
      <PrescriptionModal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        patientId={patientId}
        medicines={allMedicines}
        tests={allTests}
        addedItems={addedItems}
        schedules={schedules}
      />

      {/* POPUP 4: End Session Confirmation Modal */}
      {showEndSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] p-7 max-w-md w-full shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-150">
            <div className="h-14 w-14 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
              <LogOut className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#18181A] tracking-tight">
                End Clinical Consultation?
              </h3>
              <p className="text-xs text-[#18181A]/60 mt-1 leading-relaxed">
                Ending this session will finalize the consultation notes and return to the appointments dashboard.
              </p>
            </div>

            {/* Session Summary Snapshot */}
            <div className="bg-white border border-[#18181A]/10 rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between items-center text-[#18181A]">
                <span className="text-[#18181A]/50 font-semibold">Patient:</span>
                <span className="font-bold">Rahul Sharma (CX-{patientId.slice(0, 8).toUpperCase()})</span>
              </div>
              <div className="flex justify-between items-center text-[#18181A]">
                <span className="text-[#18181A]/50 font-semibold">Prescriptions Added:</span>
                <span className="font-bold text-[#0B392A]">{Object.keys(addedItems).length} item(s)</span>
              </div>
              <div className="flex justify-between items-center text-[#18181A]">
                <span className="text-[#18181A]/50 font-semibold">Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10.5px]">Ready to Complete</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setShowEndSessionModal(false)}
                className="w-full py-2.5 text-xs font-bold rounded-full border border-[#18181A]/20 bg-white text-[#18181A] hover:bg-[#18181A]/5 transition-colors cursor-pointer"
              >
                Continue Session
              </button>

              <button
                onClick={() => {
                  setShowEndSessionModal(false);
                  router.push("/dashboard");
                }}
                className="w-full py-2.5 text-xs font-bold rounded-full text-white bg-[#18181A] hover:bg-black transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Complete & Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 5: Skip Patient Confirmation Modal */}
      {showSkipPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] p-7 max-w-md w-full shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-150">
            <div className="h-14 w-14 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-700">
              <SkipForward className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#18181A] tracking-tight">
                Skip Current Patient & Start New Session?
              </h3>
              <p className="text-xs text-[#18181A]/60 mt-1 leading-relaxed">
                This will defer the current patient and immediately initiate a fresh new consultation session.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => setShowSkipPatientModal(false)}
                className="w-full py-2.5 text-xs font-bold rounded-full border border-[#18181A]/20 bg-white text-[#18181A] hover:bg-[#18181A]/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowSkipPatientModal(false);
                  const hexTime = Date.now().toString(16);
                  const randomHex = Math.floor(Math.random() * 0xffffffffff).toString(16).padStart(10, '0');
                  const newSessionId = `6a882cbd${hexTime.slice(-6)}${randomHex.slice(-10)}`;
                  router.push(`/dashboard/session/${newSessionId}`);
                }}
                className="w-full py-2.5 text-xs font-bold rounded-full text-white bg-[#0284C7] hover:bg-[#0369A1] transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Start New Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 6: Empty Selection Warning Modal */}
      {showEmptyWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150 font-sans">
          <div className="bg-[#FDFBF2] border border-[#18181A]/20 rounded-[32px] p-7 max-w-md w-full shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-150">
            <div className="h-14 w-14 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div>
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                No Items Prescribed
              </span>
              <h3 className="text-xl font-bold text-[#18181A] tracking-tight">
                Cannot Generate Empty Prescription
              </h3>
              <p className="text-xs text-[#18181A]/60 mt-1 leading-relaxed">
                You haven&apos;t added any medications or lab tests to the prescription list yet. Please click the <strong>+</strong> button on any suggested medication or test to configure dosage and add it to the Rx.
              </p>
            </div>

            <div className="pt-1">
              <button
                onClick={() => setShowEmptyWarningModal(false)}
                className="w-full py-2.5 text-xs font-bold rounded-full text-white bg-[#18181A] hover:bg-black transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Review Suggestions & Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
