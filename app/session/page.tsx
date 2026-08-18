import { PatientSidebar } from "@/components/session/patient-sidebar";
import { LiveTranscript } from "@/components/session/live-transcript";
import { AIInsights } from "@/components/session/ai-insights";
import { SessionControls } from "@/components/session/session-controls";

export default function SessionPage() {
  return (
    <div className="flex h-screen w-full bg-slate-50/30 dark:bg-slate-950 overflow-hidden flex-col md:flex-row">
      {/* Left Sidebar - Live Transcript */}
      <aside className="w-full md:w-80 lg:w-[400px] border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col h-full overflow-hidden z-10 bg-white dark:bg-slate-900">
        <LiveTranscript />
      </aside>

      {/* Main Center Area - AI Insights */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative bg-slate-50/50 dark:bg-slate-950/50 z-0 overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
          <SessionControls />
        </div>
        <div className="flex-1 overflow-hidden pt-20 pb-4 px-4 sm:px-6 lg:px-8">
           <AIInsights />
        </div>
      </main>

      {/* Right Sidebar - Patient Context & Extras */}
      <aside className="w-full md:w-80 lg:w-[350px] border-l border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col h-full overflow-hidden z-10">
        <PatientSidebar />
      </aside>
    </div>
  );
}
