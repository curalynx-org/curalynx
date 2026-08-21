"use client";

import { useEffect, useRef } from "react";
import { Mic, MicOff, Stethoscope, User } from "lucide-react";

type Message = {
  id: string;
  speaker: "doctor" | "patient" | "unknown";
  text: string;
  timestamp: string;
};

interface LiveTranscriptProps {
  patientId: string;
  messages: Message[];
  isRecording: boolean;
  onToggleRecording: () => void;
}

export function LiveTranscript({
  patientId,
  messages,
  isRecording,
  onToggleRecording,
}: LiveTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on every new message or recording state change
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bottomAnchorRef.current) {
        bottomAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      } else if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [messages, isRecording]);

  return (
    <div className="flex flex-col h-full bg-[#FDFBF2] overflow-hidden font-sans">
      {/* Compact Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 flex-shrink-0 border-b border-[#18181A]/5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            {isRecording && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B392A] opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isRecording ? "bg-[#0B392A]" : "bg-[#18181A]/40"
              }`}
            ></span>
          </div>
          <h3 className="text-xs font-bold text-[#18181A] uppercase tracking-wider">
            Live Transcription
          </h3>
        </div>

        <button
          onClick={onToggleRecording}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all border cursor-pointer shadow-2xs ${
            isRecording
              ? "bg-[#0B392A] text-white border-[#0B392A] hover:bg-[#07241A]"
              : "bg-white text-[#18181A] border-[#18181A]/20 hover:bg-[#18181A]/5"
          }`}
        >
          {isRecording ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
          {isRecording ? "Listening" : "Start Mic"}
        </button>
      </div>

      {/* Transcript Stream Area */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto space-y-3 p-4 scroll-smooth"
      >
        {messages.length === 0 && !isRecording && (
          <div className="flex flex-col items-center justify-center h-full text-center py-6 px-3">
            <div className="h-9 w-9 rounded-full bg-white border border-[#18181A]/10 flex items-center justify-center text-[#18181A]/40 mb-2">
              <Mic className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium text-[#18181A]/50">
              Click &quot;Start Mic&quot; to begin capturing real-time doctor-patient conversation.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 max-w-[92%] ${
              msg.speaker === "doctor" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border text-xs ${
                msg.speaker === "doctor"
                  ? "bg-[#E9D5FF] border-[#18181A]/20 text-[#18181A]"
                  : "bg-white border-[#18181A]/20 text-[#18181A]/60"
              }`}
            >
              {msg.speaker === "doctor" ? (
                <Stethoscope className="h-3.5 w-3.5" />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`flex flex-col gap-0.5 ${
                msg.speaker === "doctor" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-[9.5px] font-bold text-[#18181A]/40 px-1 uppercase tracking-wider">
                {msg.speaker === "doctor" ? "Doctor" : "Patient"} • {msg.timestamp}
              </span>
              <div
                className={`px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-2xs border ${
                  msg.speaker === "doctor"
                    ? "bg-[#18181A] text-white border-[#18181A] rounded-tr-xs"
                    : "bg-white text-[#18181A] border-[#18181A]/15 rounded-tl-xs"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* Listening Indicator */}
        {isRecording && (
          <div className="flex gap-2 max-w-[85%]">
            <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border bg-white border-[#18181A]/20 text-[#18181A]/60">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-center gap-1 bg-white border border-[#18181A]/15 px-3 py-2 rounded-2xl rounded-tl-xs shadow-2xs h-8">
              <span className="h-1.5 w-1.5 bg-[#0B392A] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-1.5 w-1.5 bg-[#0B392A] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-1.5 w-1.5 bg-[#0B392A] rounded-full animate-bounce"></span>
            </div>
          </div>
        )}

        {/* Invisible Bottom Anchor for Auto-Scroll */}
        <div ref={bottomAnchorRef} className="h-1" />
      </div>
    </div>
  );
}
