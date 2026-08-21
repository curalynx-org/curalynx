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

export function LiveTranscript({ patientId, messages, isRecording, onToggleRecording }: LiveTranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-8 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isRecording && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B392A] opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRecording ? 'bg-[#0B392A]' : 'bg-[#18181A]/40'}`}></span>
          </div>
          <h2 className="text-2xl font-serif text-[#18181A]">Live Transcription</h2>
        </div>
        
        <button
          onClick={onToggleRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
            isRecording 
              ? 'bg-[#0B392A] text-white border-[#0B392A] hover:bg-[#07241A]' 
              : 'bg-transparent text-[#18181A] border-[#18181A]/20 hover:bg-[#18181A]/5'
          }`}
        >
          {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isRecording ? "Listening" : "Paused"}
        </button>
      </div>

      {/* Transcript Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 px-8 pb-8"
      >
        {messages.length === 0 && !isRecording && (
          <div className="text-center text-muted-foreground mt-10 text-sm">
            Click "Paused" above to start the session.
          </div>
        )}
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-[85%] ${msg.speaker === 'doctor' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border ${
              msg.speaker === 'doctor' 
                ? 'bg-[#E9D5FF] border-[#18181A] text-[#18181A]' 
                : 'bg-white border-[#18181A]/20 text-[#18181A]/60'
            }`}>
              {msg.speaker === 'doctor' ? <Stethoscope className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>

            {/* Message Bubble */}
            <div className={`flex flex-col gap-1 ${msg.speaker === 'doctor' ? 'items-end' : 'items-start'}`}>
              <span className="text-[11px] font-bold text-[#18181A]/40 px-1 uppercase tracking-wider">
                {msg.speaker === 'doctor' ? 'Doctor' : 'Patient'} • {msg.timestamp}
              </span>
              <div className={`px-5 py-3.5 rounded-[20px] text-[15px] leading-relaxed shadow-sm border ${
                msg.speaker === 'doctor'
                  ? 'bg-[#18181A] text-white border-[#18181A] rounded-tr-sm'
                  : 'bg-[#FDFBF2] text-[#18181A] border-[#18181A]/10 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator / Listening effect */}
        {isRecording && (
          <div className="flex gap-4 max-w-[85%]">
             <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border bg-white border-[#18181A]/20 text-[#18181A]/60">
              <User className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5 bg-[#FDFBF2] border border-[#18181A]/10 px-5 py-4 rounded-[20px] rounded-tl-sm shadow-sm h-[52px]">
              <span className="h-2 w-2 bg-[#18181A]/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 bg-[#18181A]/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 bg-[#18181A]/40 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
