import { ArrowUpRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main>
      <div id="top">
        <HeroSection />
      </div>

      <section className="border-y border-border bg-card/50 px-6 py-6 sm:px-10 lg:px-16" id="how-it-works">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Practical wellbeing support, designed to help you feel confident
            taking care of yourself.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-primary sm:gap-x-10">
            <span className="flex items-center gap-2"><Sparkles className="size-4" /> Thoughtful</span>
            <span className="flex items-center gap-2"><ShieldCheck className="size-4" /> Trusted</span>
            <span className="flex items-center gap-2"><HeartPulse className="size-4" /> Personal</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16" id="approach">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-3xl bg-accent p-8 sm:p-12 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-primary">One meaningful next step</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your health should fit into your life—not overwhelm it.
            </h2>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline" href="#get-started">
            Discover Curalynx <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
