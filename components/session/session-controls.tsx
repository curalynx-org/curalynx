import { FileSignature, SkipForward, XCircle } from "lucide-react";

export function SessionControls() {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md border border-zinc-100">
      <button className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors">
        <SkipForward className="h-4 w-4" />
        Skip Patient
      </button>
      
      <div className="w-px h-6 bg-zinc-200 mx-1" />
      
      <button className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-zinc-700 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-colors">
        <XCircle className="h-4 w-4" />
        End Session
      </button>
      
      <button className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-full shadow-sm transition-all active:scale-95 ml-1">
        <FileSignature className="h-4 w-4" />
        Generate Prescription
      </button>
    </div>
  );
}
