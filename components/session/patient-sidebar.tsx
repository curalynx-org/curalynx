import { Activity, AlertCircle, Clock, FileText, History, User } from "lucide-react";

export function PatientSidebar() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Patient Profile Card - Styled like the header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full border border-[#18181A]/20 bg-[#FDFBF2] flex items-center justify-center overflow-hidden shadow-sm">
             {/* Using an image placeholder style since the reference has photos */}
            <User className="h-7 w-7 text-[#18181A]/60" />
          </div>
          <div>
            <h2 className="text-2xl font-serif tracking-tight text-[#18181A]">Priya Sharma</h2>
            <p className="text-sm text-[#18181A]/60 font-medium mt-0.5">38 years • Female • ID: PT-8472</p>
          </div>
        </div>

        {/* Vitals Grid - Themed with pastel colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0B392A] text-white p-5 rounded-[24px] flex flex-col justify-between border border-[#18181A]/10">
            <span className="text-[13px] font-semibold text-white/70 mb-6">Blood Pressure</span>
            <p className="text-3xl font-bold">118<span className="text-xl text-white/80">/75</span></p>
          </div>
          <div className="bg-[#E9D5FF] text-[#18181A] p-5 rounded-[24px] flex flex-col justify-between border border-[#18181A]/20">
            <span className="text-[13px] font-semibold text-[#18181A]/70 mb-6">Glucose</span>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold">92</p>
              <span className="text-sm font-semibold text-[#18181A]/80">mg/dL</span>
            </div>
          </div>
          <div className="bg-[#18181A] text-white p-5 rounded-[24px] col-span-2 flex justify-between items-center border border-[#18181A]/20">
            <span className="text-[13px] font-semibold text-white/70">Weight & Height</span>
            <span className="text-lg font-bold">68 kg • 165 cm</span>
          </div>
        </div>


      </div>

      {/* Medical Context */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        
        {/* Risk Factors */}
        <div>
          <h3 className="text-sm font-bold text-[#18181A] mb-4 uppercase tracking-wider">Predicted Risks</h3>
          <div className="bg-transparent p-1 rounded-[24px] flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 py-3 bg-[#FDFBF2] border border-[#18181A]/10 rounded-2xl">
              <span className="text-sm font-semibold text-[#18181A]">Hypertension</span>
              <span className="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">Moderate</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[#FDFBF2] border border-[#18181A]/10 rounded-2xl">
              <span className="text-sm font-semibold text-[#18181A]">Type 2 Diabetes</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">Low</span>
            </div>
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <h3 className="text-sm font-bold text-[#18181A] mb-4 uppercase tracking-wider">Current Medications</h3>
          <div className="bg-transparent p-1 flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 py-3 bg-[#FDFBF2] border border-[#18181A]/10 rounded-2xl">
              <span className="text-sm font-semibold text-[#18181A]">Cetirizine 10mg</span>
              <span className="text-xs font-semibold text-[#18181A]/60 bg-[#18181A]/5 px-3 py-1 rounded-full border border-[#18181A]/10">As needed</span>
            </div>
          </div>
        </div>

        {/* Past Reports */}
        <div>
          <h3 className="text-sm font-bold text-[#18181A] mb-4 uppercase tracking-wider">Past Reports</h3>
          <div className="bg-transparent p-1 flex flex-col gap-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#FDFBF2] border border-[#18181A]/10 hover:bg-[#18181A]/5 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[#18181A]/10 bg-white flex items-center justify-center">
                  <FileText className="h-4 w-4 text-[#18181A]/70" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#18181A]">Blood Count</p>
                  <p className="text-xs font-medium text-[#18181A]/50">Oct 12, 2025</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-[#FDFBF2] border border-[#18181A]/10 hover:bg-[#18181A]/5 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-[#18181A]/10 bg-white flex items-center justify-center">
                  <FileText className="h-4 w-4 text-[#18181A]/70" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#18181A]">Chest X-Ray</p>
                  <p className="text-xs font-medium text-[#18181A]/50">Mar 05, 2025</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
