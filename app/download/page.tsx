import Link from "next/link";
import { Download, Monitor, Smartphone } from "lucide-react";
import { LandingSubpage } from "@/components/landing/landing-subpage";

export default function DownloadPage() {
  return (
    <LandingSubpage
      eyebrow="Available everywhere"
      title="Bring CuraLynx into every room."
      description="Use the web app today, then choose the workflow that fits your clinic and your rounds."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-[#18181A]/10 bg-white p-8">
          <Monitor className="h-7 w-7 text-[#0B392A]" />
          <h2 className="mt-5 font-serif text-3xl">Desktop workflow</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#18181A]/60">
            Open CuraLynx in your browser for a full consultation workspace with
            patient context, transcript, and AI insights.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B392A] px-5 py-3 text-sm font-bold text-white"
          >
            Open web app <Download className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-3xl border border-[#18181A]/10 bg-[#E9D5FF] p-8">
          <Smartphone className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-3xl">Mobile workflow</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#18181A]/65">
            Use the responsive session experience for ward rounds, quick
            dictation, and care on the move.
          </p>
          <Link
            href="/session"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#18181A] px-5 py-3 text-sm font-bold"
          >
            Try mobile session <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </LandingSubpage>
  );
}
