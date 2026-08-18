import { FileSignature, SkipForward, XCircle } from "lucide-react";

export function SessionControls() {
  return (
    <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
        <SkipForward className="h-4 w-4" />
        Skip Patient
      </button>
      
      <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
      
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 rounded-xl transition-colors">
        <XCircle className="h-4 w-4" />
        End Session
      </button>
      
      <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 transition-all active:scale-95 ml-2">
        <FileSignature className="h-4 w-4" />
        Generate Prescription
      </button>
    </div>
  );
}
