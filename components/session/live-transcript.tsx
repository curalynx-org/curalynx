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
      <div className="flex items-center justify-between mb-8 px-8 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            {isRecording && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isRecording ? 'bg-rose-500' : 'bg-muted-foreground/40'}`}></span>
          </div>
          <h2 className="text-xl font-bold text-foreground">Live Transcription</h2>
        </div>
        
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            isRecording 
              ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {isRecording ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {isRecording ? "Listening" : "Paused"}
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 px-8 pb-8"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-[85%] ${msg.speaker === 'doctor' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border-[3px] ${
              msg.speaker === 'doctor' 
                ? 'bg-primary/10 border-primary/20 text-primary' 
                : 'bg-muted border-border text-muted-foreground'
            }`}>
              {msg.speaker === 'doctor' ? <Stethoscope className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>

            <div className={`flex flex-col gap-1 ${msg.speaker === 'doctor' ? 'items-end' : 'items-start'}`}>
              <span className="text-[11px] font-bold text-muted-foreground px-1 uppercase tracking-wider">
                {msg.speaker === 'doctor' ? 'Dr. Sarah' : 'Priya'} &bull; {msg.timestamp}
              </span>
              <div className={`px-5 py-3.5 rounded-[20px] text-[15px] leading-relaxed shadow-sm ${
                msg.speaker === 'doctor'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isRecording && (
          <div className="flex gap-4 max-w-[85%]">
             <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border-[3px] bg-muted border-border text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-5 py-4 rounded-[20px] rounded-tl-sm shadow-sm h-[52px]">
              <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 bg-primary/40 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
