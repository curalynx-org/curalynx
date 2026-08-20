import { FileSignature, SkipForward, XCircle } from "lucide-react";

export function SessionControls() {
  return (
    <div className="flex items-center gap-2 bg-[#FDFBF2] p-2 rounded-full border border-[#18181A]/20">
      <button className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-[#18181A]/60 hover:bg-[#18181A]/5 hover:text-[#18181A] rounded-full transition-colors">
        <SkipForward className="h-4 w-4" />
        Skip Patient
      </button>
      
      <div className="w-px h-6 bg-[#18181A]/10 mx-1" />
      
      <button className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-[#18181A]/60 hover:bg-orange-50 hover:text-orange-700 rounded-full transition-colors">
        <XCircle className="h-4 w-4" />
        End Session
      </button>
      
      <button className="flex items-center gap-2 px-6 py-2.5 text-[13px] font-bold text-[#18181A] bg-[#E9D5FF] hover:bg-[#D8B4FE] border border-[#18181A] rounded-full shadow-sm transition-all active:scale-95 ml-1">
        <FileSignature className="h-4 w-4" />
        Generate Prescription
      </button>
    </div>
  );
}
