"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Stethoscope, User } from "lucide-react";

type Message = {
  id: string;
  speaker: "doctor" | "patient";
  text: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    speaker: "doctor",
    text: "Hello Priya, how are you feeling today?",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    speaker: "patient",
    text: "Hi doctor. Not great, honestly. I've been having this persistent headache for the last two days.",
    timestamp: "10:01 AM",
  },
  {
    id: "3",
    speaker: "patient",
    text: "And I am having some stomach pains too.",
    timestamp: "10:01 AM",
  },
];

export function LiveTranscript() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isRecording, setIsRecording] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isRecording && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRecording ? 'bg-rose-500' : 'bg-slate-400'}`}></span>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Live Transcription</h2>
        </div>
        
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            isRecording 
              ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isRecording ? "Listening..." : "Paused"}
        </button>
      </div>

      {/* Transcript Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-4 pb-24"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-[80%] ${msg.speaker === 'doctor' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 ${
              msg.speaker === 'doctor' 
                ? 'bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' 
                : 'bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400'
            }`}>
              {msg.speaker === 'doctor' ? <Stethoscope className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`flex flex-col gap-1 ${msg.speaker === 'doctor' ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-slate-500 dark:text-slate-400 px-1">
                {msg.speaker === 'doctor' ? 'Dr. Sarah' : 'Priya'} • {msg.timestamp}
              </span>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.speaker === 'doctor'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator / Listening effect */}
        {isRecording && (
          <div className="flex gap-4 max-w-[80%]">
             <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border-2 bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400">
              <User className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Real-time SOAP notes draft (Bottom fixed) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Auto-Drafting Clinical Note
          </h3>
          <span className="text-xs text-slate-500">Subjective</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          Patient reports persistent headache for the past two days, accompanied by stomach pain...
        </p>
      </div>
    </div>
  );
}
