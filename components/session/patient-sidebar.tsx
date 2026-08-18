import { Activity, AlertCircle, Clock, FileText, History, User } from "lucide-react";

export function PatientSidebar() {
  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Patient Profile Card - Styled like the header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden">
             {/* Using an image placeholder style since the reference has photos */}
            <User className="h-8 w-8 text-zinc-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Priya Sharma</h2>
            <p className="text-sm text-zinc-500 font-medium mt-0.5">38 years • Female • ID: PT-8472</p>
          </div>
        </div>

        {/* Vitals Grid - Themed with pastel colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FAD871] p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
            <span className="text-[13px] font-semibold text-zinc-800 mb-6">Blood Pressure</span>
            <p className="text-3xl font-bold text-zinc-900">118<span className="text-xl text-zinc-700">/75</span></p>
          </div>
          <div className="bg-[#C6D9E6] p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
            <span className="text-[13px] font-semibold text-zinc-800 mb-6">Glucose</span>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-zinc-900">92</p>
              <span className="text-sm font-semibold text-zinc-700">mg/dL</span>
            </div>
          </div>
          <div className="bg-[#E3D6E8] p-5 rounded-[24px] shadow-sm col-span-2 flex justify-between items-center">
            <span className="text-[13px] font-semibold text-zinc-800">Weight & Height</span>
            <span className="text-lg font-bold text-zinc-900">68 kg • 165 cm</span>
          </div>
        </div>


      </div>

      {/* Medical Context */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        
        {/* Risk Factors */}
        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-4">Predicted Risks</h3>
          <div className="bg-white p-2 rounded-[24px] shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-2xl">
              <span className="text-sm font-semibold text-zinc-800">Hypertension</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Moderate</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-2xl">
              <span className="text-sm font-semibold text-zinc-800">Type 2 Diabetes</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">Low</span>
            </div>
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-4">Current Medications</h3>
          <div className="bg-white p-2 rounded-[24px] shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-2xl">
              <span className="text-sm font-semibold text-zinc-800">Cetirizine 10mg</span>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-200/50 px-3 py-1 rounded-full">As needed</span>
            </div>
          </div>
        </div>

        {/* Past Reports */}
        <div>
          <h3 className="text-sm font-bold text-zinc-900 mb-4">Past Reports</h3>
          <div className="bg-white p-2 rounded-[24px] shadow-sm flex flex-col gap-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <FileText className="h-4 w-4 text-zinc-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-900">Blood Count</p>
                  <p className="text-xs font-medium text-zinc-500">Oct 12, 2025</p>
                </div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-colors group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <FileText className="h-4 w-4 text-zinc-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-zinc-900">Chest X-Ray</p>
                  <p className="text-xs font-medium text-zinc-500">Mar 05, 2025</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
