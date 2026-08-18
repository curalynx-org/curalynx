import { Activity, AlertCircle, Clock, FileText, History, User } from "lucide-react";

export function PatientSidebar() {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
      {/* Patient Profile Card */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center border-2 border-emerald-500/20">
            <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Priya Sharma</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">38 years • Female • ID: PT-8472</p>
          </div>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <Activity className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-medium uppercase tracking-wider">Blood Pressure</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">118/75</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
              <div className="h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider">Glucose</span>
            </div>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">92 <span className="text-sm font-normal text-slate-500">mg/dL</span></p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm col-span-2 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Weight & Height</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">68 kg • 165 cm</span>
          </div>
        </div>

        {/* Health Score & Risk Level */}
        <div className="mt-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-md shadow-emerald-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium opacity-90">Overall Health Score</span>
            <span className="text-2xl font-bold">84<span className="text-sm font-normal opacity-70">/100</span></span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
            <div className="bg-white h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
          <p className="text-xs opacity-90">Good condition. Blood pressure slightly elevated.</p>
        </div>
      </div>

      {/* Medical Context */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Alerts / Conditions */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            Medical History
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-500/20 rounded-lg">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Allergic Rhinitis</p>
              <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mt-1">Diagnosed 2021</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Mild Asthma</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Childhood onset, well controlled</p>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-rose-500" />
            Predicted Risks
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hypertension</span>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">Moderate (45%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-lg shadow-sm">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Type 2 Diabetes</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Low (12%)</span>
            </div>
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-blue-500" />
            Current Medications
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Cetirizine 10mg</span>
              <span className="text-xs text-slate-500">As needed</span>
            </li>
          </ul>
        </div>

        {/* Past Reports */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
            <History className="h-4 w-4 text-emerald-500" />
            Past Reports
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors text-left group">
              <div className="h-8 w-8 rounded bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Complete Blood Count</p>
                <p className="text-xs text-slate-500">Oct 12, 2025</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50 shadow-sm transition-colors text-left group">
              <div className="h-8 w-8 rounded bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Chest X-Ray</p>
                <p className="text-xs text-slate-500">Mar 05, 2025</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
