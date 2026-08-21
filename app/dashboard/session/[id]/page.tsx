"use client";

import { PatientSidebar } from "@/components/session/patient-sidebar";
import { LiveTranscript } from "@/components/session/live-transcript";
import { AIInsights } from "@/components/session/ai-insights";
import { SessionControls } from "@/components/session/session-controls";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SessionPage() {
  const params = useParams();
  const patientId = params.id as string;

  const [messages, setMessages] = useState<any[]>([]);
  const [insights, setInsights] = useState({ medicines: [], tests: [] });
  const [isRecording, setIsRecording] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    // Connect to Python WebSocket Server
    const ws = new WebSocket("ws://localhost:8000/ws/session");
    
    ws.onopen = () => {
      console.log("Connected to AI Audio Server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      if (result.type === "transcription_update") {
        setMessages(result.data);
        if (result.insights) {
          setInsights(result.insights);
        }
      }
    };

    ws.onclose = () => console.log("Disconnected from AI Audio Server");

    return () => ws.close();
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0 && socket?.readyState === WebSocket.OPEN) {
            socket.send(e.data);
          }
        };

        // Send audio chunks every 1 second
        mediaRecorder.current.start(1000);
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or error:", err);
        alert("Microphone access is required to start the session.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#FDFBF2] overflow-hidden flex-col md:flex-row font-sans text-[#18181A]">
      {/* Main Center Area - AI Insights */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-0 overflow-hidden bg-transparent">
        <div className="absolute top-8 right-8 z-20">
          <SessionControls />
        </div>
        <div className="flex-1 overflow-hidden pt-24 pb-8 px-6 sm:px-8 lg:px-12">
           <AIInsights patientId={patientId} insights={insights} />
        </div>
      </main>

      {/* Right Sidebar - Live Transcript */}
      <aside className="w-full md:w-80 lg:w-[400px] flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-[#FDFBF2] border-l border-[#18181A]/10">
        <LiveTranscript 
          patientId={patientId} 
          messages={messages} 
          isRecording={isRecording} 
          onToggleRecording={toggleRecording} 
        />
      </aside>
    </div>
  );
}
