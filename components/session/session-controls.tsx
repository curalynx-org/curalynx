"use client";

import { FileSignature, SkipForward, XCircle } from "lucide-react";

interface SessionControlsProps {
  onGeneratePrescription?: () => void;
  onSkipPatient?: () => void;
  onEndSession?: () => void;
}

export function SessionControls({
  onGeneratePrescription,
  onSkipPatient,
  onEndSession,
}: SessionControlsProps) {
  return (
    <div className="flex items-center gap-2 bg-[#FDFBF2] p-1.5 rounded-full border border-[#18181A]/20">
      <button
        onClick={onSkipPatient}
        className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#18181A]/60 hover:bg-[#18181A]/5 hover:text-[#18181A] rounded-full transition-colors cursor-pointer"
      >
        <SkipForward className="h-4 w-4" />
        Skip Patient
      </button>

      <div className="w-px h-6 bg-[#18181A]/10 mx-1" />

      <button
        onClick={onEndSession}
        className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#18181A]/60 hover:bg-orange-50 hover:text-orange-700 rounded-full transition-colors cursor-pointer"
      >
        <XCircle className="h-4 w-4" />
        End Session
      </button>

      <button
        onClick={onGeneratePrescription}
        className="flex items-center gap-2 px-5 py-2 text-[13px] font-bold text-[#18181A] bg-[#E9D5FF] hover:bg-[#D8B4FE] border border-[#18181A] rounded-full shadow-sm transition-all active:scale-95 ml-1 cursor-pointer"
      >
        <FileSignature className="h-4 w-4" />
        Generate Prescription
      </button>
    </div>
  );
}

