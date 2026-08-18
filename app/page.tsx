import { ArrowUpRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main>
      <div id="top">
        <HeroSection />
      </div>

      <section className="border-y border-border bg-card/50 px-6 py-16 sm:px-10 lg:px-16" id="how-it-works">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-primary">How it works</p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From conversation to care record in three steps.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="size-5" /></span>
              <h3 className="mt-4 font-semibold text-foreground">Listen</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Curalynx captures the live consultation audio and transcribes it in real time, in 15+ languages.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><ShieldCheck className="size-5" /></span>
              <h3 className="mt-4 font-semibold text-foreground">Structure</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Symptoms, history, and findings are organised into a clean clinical record automatically.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><HeartPulse className="size-5" /></span>
              <h3 className="mt-4 font-semibold text-foreground">Deliver</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Notes, recommendations, and prescriptions are ready to review—so you focus on care, not typing.</p>
            </div>
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
            <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> Clinical-grade accuracy built for real clinics.</li>
              <li className="flex items-start gap-2"><HeartPulse className="mt-0.5 size-4 shrink-0 text-primary" /> Privacy-first: your data stays with you, 100%.</li>
              <li className="flex items-start gap-2"><Sparkles className="mt-0.5 size-4 shrink-0 text-primary" /> Works in the language your clinic already speaks.</li>
            </ul>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline" href="#get-started">
            Discover Curalynx <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <section className="border-t border-border bg-card/50 px-6 py-16 sm:px-10 lg:px-16" id="resources">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-primary">Resources</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Learn more about Curalynx.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <a className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40" href="/session">
              <ArrowUpRight className="size-5 text-primary" />
              <h3 className="mt-4 font-semibold text-foreground">Live demo</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Watch Curalynx turn a real consultation into structured notes.</p>
            </a>
            <a className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40" href="/get-started">
              <ArrowUpRight className="size-5 text-primary" />
              <h3 className="mt-4 font-semibold text-foreground">Get started</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Bring Curalynx into your clinic in minutes, not weeks.</p>
            </a>
            <a className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40" href="#top">
              <ArrowUpRight className="size-5 text-primary" />
              <h3 className="mt-4 font-semibold text-foreground">Back to top</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Explore the pitch again from the start.</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
