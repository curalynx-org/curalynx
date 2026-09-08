import Link from "next/link";
import { LandingSubpage } from "@/components/landing/landing-subpage";

export default function DemoPage() {
  return (
    <LandingSubpage
      eyebrow="See it in practice"
      title="Watch the consultation become the chart."
      description="Experience the CuraLynx workflow from live conversation to structured clinical insight."
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#18181A]/10 bg-white shadow-sm">
        <div className="flex aspect-video items-center justify-center bg-[#18181A] p-8 text-center text-white">
          <div>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#E9D5FF] text-[#18181A]">
              ▶
            </div>
            <p className="text-sm text-white/60">Product walkthrough</p>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="font-serif text-3xl">
            Ready to try the real workflow?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#18181A]/60">
            Start a live session to explore transcription, conversation
            analysis, and clinical suggestions in the app.
          </p>
          <Link
            href="/session"
            className="mt-6 inline-flex rounded-full bg-[#0B392A] px-6 py-3 text-sm font-bold text-white"
          >
            Open live session
          </Link>
        </div>
      </div>
    </LandingSubpage>
  );
}
