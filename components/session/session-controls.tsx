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
    <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-[#18181A]/20 bg-[#FDFBF2] p-1.5 sm:gap-2">
      <button
        onClick={onSkipPatient}
        className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-2 text-[13px] font-bold text-[#18181A]/60 transition-colors hover:bg-[#18181A]/5 hover:text-[#18181A] cursor-pointer sm:px-4"
      >
        <SkipForward className="h-4 w-4" />
        <span className="hidden sm:inline">Skip Patient</span>
      </button>

      <div className="w-px h-6 bg-[#18181A]/10 mx-1" />

      <button
        onClick={onEndSession}
        className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-2 text-[13px] font-bold text-[#18181A]/60 transition-colors hover:bg-orange-50 hover:text-orange-700 cursor-pointer sm:px-4"
      >
        <XCircle className="h-4 w-4" />
        <span className="hidden sm:inline">End Session</span>
      </button>

      <button
        onClick={onGeneratePrescription}
        className="ml-1 flex shrink-0 items-center gap-2 rounded-full border border-[#18181A] bg-[#E9D5FF] px-2.5 py-2 text-[13px] font-bold text-[#18181A] shadow-sm transition-all hover:bg-[#D8B4FE] active:scale-95 cursor-pointer sm:px-5"
      >
        <FileSignature className="h-4 w-4" />
        <span className="hidden sm:inline">Generate Prescription</span>
      </button>
    </div>
  );
}
