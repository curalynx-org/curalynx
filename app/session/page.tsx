import { PatientSidebar } from "@/components/session/patient-sidebar";
import { LiveTranscript } from "@/components/session/live-transcript";
import { AIInsights } from "@/components/session/ai-insights";
import { SessionControls } from "@/components/session/session-controls";

export default function SessionPage() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden flex-col md:flex-row">
      {/* Left Sidebar - Patient Context & Extras */}
      <aside className="w-full md:w-80 lg:w-[350px] border-r border-border flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-muted/40">
        <PatientSidebar />
      </aside>

      {/* Main Center Area - AI Insights */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-0 overflow-hidden bg-transparent">
        <div className="absolute top-8 right-8 z-20">
          <SessionControls />
        </div>
        <div className="flex-1 overflow-hidden pt-24 pb-8 px-6 sm:px-8 lg:px-12">
           <AIInsights />
        </div>
      </main>

      {/* Right Sidebar - Live Transcript */}
      <aside className="w-full md:w-80 lg:w-[400px] flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-card shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] border-l border-border">
        <LiveTranscript />
      </aside>
    </div>
  );
}
