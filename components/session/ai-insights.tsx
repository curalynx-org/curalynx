import { Brain, Pill, Syringe, AlertTriangle, ShieldAlert } from "lucide-react";

export function AIInsights() {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Cura AI</h2>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Analyzing conversation...
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        


        {/* AI Differential Diagnosis */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4" /> AI Differential Diagnosis
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 px-3 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
              <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">Tension Headache (85%)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap opacity-70">
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Migraine (40%)</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap opacity-70">
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gastritis (35%)</span>
            </div>
          </div>
        </div>

        {/* Main Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medication Recommendations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Pill className="h-4 w-4" /> Suggested Medications
            </h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Paracetamol 500mg</p>
                  <button className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    + Add
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-2">For reported headache</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">SOS</span>
                  <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">Max 3/day</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50" />
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Pantoprazole 40mg</p>
                  <button className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    + Add
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-2">For reported stomach pain</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">1 tab</span>
                  <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">Before Breakfast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Tests */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Syringe className="h-4 w-4" /> Recommended Tests
            </h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-sm flex justify-between items-center group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                <div className="pl-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">USG Abdomen</p>
                  <p className="text-xs text-slate-500 mt-0.5">To rule out abdominal pathology</p>
                </div>
                <button className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-2 rounded-full transition-colors">
                  <span className="sr-only">Add</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 1.00003C7.77605 1.00003 7.99991 1.22389 7.99991 1.50003V7.00003H13.5C13.7761 7.00003 14 7.22389 14 7.50003C14 7.77617 13.7761 8.00003 13.5 8.00003H7.99991V13.5C7.99991 13.7761 7.77605 14 7.49991 14C7.22377 14 6.99991 13.7761 6.99991 13.5V8.00003H1.5C1.22386 8.00003 1 7.77617 1 7.50003C1 7.22389 1.22386 7.00003 1.5 7.00003H6.99991V1.50003C6.99991 1.22389 7.22377 1.00003 7.49991 1.00003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-sm flex justify-between items-center group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-50" />
                <div className="pl-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">CBC & CRP</p>
                  <p className="text-xs text-slate-500 mt-0.5">Routine systemic evaluation</p>
                </div>
                <button className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-2 rounded-full transition-colors">
                  <span className="sr-only">Add</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 1.00003C7.77605 1.00003 7.99991 1.22389 7.99991 1.50003V7.00003H13.5C13.7761 7.00003 14 7.22389 14 7.50003C14 7.77617 13.7761 8.00003 13.5 8.00003H7.99991V13.5C7.99991 13.7761 7.77605 14 7.49991 14C7.22377 14 6.99991 13.7761 6.99991 13.5V8.00003H1.5C1.22386 8.00003 1 7.77617 1 7.50003C1 7.22389 1.22386 7.00003 1.5 7.00003H6.99991V1.50003C6.99991 1.22389 7.22377 1.00003 7.49991 1.00003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
