import { ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[37rem] bg-[radial-gradient(circle_at_50%_60%,oklch(0.93_0.09_145_/_0.82),transparent_29rem),radial-gradient(circle_at_7%_24%,oklch(0.82_0.12_165_/_0.78),transparent_23rem),radial-gradient(circle_at_95%_38%,oklch(0.86_0.08_145_/_0.72),transparent_24rem)]" />
        <div className="absolute left-[15%] top-28 size-52 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[7%] top-20 size-52 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute inset-x-[12%] top-28 h-48 opacity-25 [background-image:radial-gradient(oklch(0.31_0.075_145)_1px,transparent_1px)] [background-size:13px_13px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_68%)]" />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-9 lg:px-12">
          <a className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground" href="#top">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </span>
            Curalynx
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#how-it-works">How it works</a>
            <a className="transition-colors hover:text-foreground" href="#approach">Our approach</a>
            <a className="transition-colors hover:text-foreground" href="#resources">Resources</a>
          </nav>
          <a
            className="rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            href="/get-started"
          >
            Get started
          </a>
        </header>

        <div className="relative z-10 px-6 pb-0 pt-14 text-center sm:px-10 sm:pt-16 lg:pt-20">
          
          <h1 className="mx-auto mt-6 max-w-6xl font-heading text-5xl font-semibold tracking-[-0.075em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.75rem] lg:leading-[0.9]">
            Clinical documentation,
            <span className="block text-primary">automated with precision.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Curalynx listens to real consultations and creates structured
            notes, recommendations, and prescriptions—so you focus on care,
            not clerical work.
          </p>

          <div className="mx-auto mt-9 flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card/85 p-1.5 shadow-lg backdrop-blur sm:max-w-xl sm:flex-row sm:rounded-full">
            <a
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-85 sm:rounded-full"
              href="/get-started"
            >
              Get started
              <ArrowRight className="size-4" />
            </a>
            <a
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:rounded-full"
              href="/todays-session"
            >
              View live demo
            </a>
          </div>
          <dl className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-4 text-left sm:gap-x-12">
            <div>
              <dt className="text-2xl font-semibold tracking-tight text-foreground">~30%</dt>
              <dd className="mt-0.5 text-xs text-muted-foreground">Less time on paperwork</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold tracking-tight text-foreground">15+</dt>
              <dd className="mt-0.5 text-xs text-muted-foreground">Languages supported</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold tracking-tight text-foreground">100%</dt>
              <dd className="mt-0.5 text-xs text-muted-foreground">Data ownership</dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-14 overflow-hidden border-t border-border/70 bg-background/85 px-6 pb-8 pt-14 sm:mt-16 sm:px-10 sm:pt-20 lg:px-12">
          <div className="absolute inset-x-[-12%] -top-24 h-40 rounded-b-[50%] border-b border-border/60 bg-card/70" />
          <div className="relative grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="relative min-h-56 overflow-hidden pt-5 sm:min-h-64 sm:pl-2">
              <p className="max-w-44 text-lg font-medium leading-snug text-foreground">Turn every conversation into a clear clinical record.</p>
              <span className="absolute left-0 top-28 grid size-10 place-items-center rounded-full border border-primary/20 bg-card text-primary shadow-sm sm:left-2">
                <ArrowRight className="size-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(oklch(0.31_0.075_145_/_0.35)_0.7px,transparent_0.7px)] [background-size:4px_4px] [mask-image:linear-gradient(to_top,black,transparent)]" />
              <svg aria-hidden="true" className="absolute -bottom-36 right-0 h-[25rem] w-64 text-primary/85 sm:-bottom-32 sm:right-8" fill="none" viewBox="0 0 180 300">
                <path d="M31 315C163 245 7 183 143 116C190 93 126 40 162-12" stroke="currentColor" strokeWidth="14" />
                <path d="M151 315C20 245 174 183 38 116C-9 93 55 40 19-12" stroke="currentColor" strokeWidth="14" />
                {[45, 91, 137, 183, 229].map((position) => (
                  <path d={`M${position < 137 ? 41 : 34} ${position}h98`} key={position} stroke="currentColor" strokeOpacity="0.8" strokeWidth="8" />
                ))}
              </svg>
            </div>
            <div className="max-w-xl lg:pb-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck className="size-4" /> Real-time understanding</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Built for the way clinics work.</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                Natural live transcription and actionable outputs—not raw text
                blobs—help your team move from conversation to care.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["30", "15", "100"].map((initial, index) => (
                    <span className="grid size-9 place-items-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground" key={initial} style={{ opacity: 1 - index * 0.13 }}>
                      {initial}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground"><span className="font-semibold">~30% less paperwork</span> · 15+ languages · 100% data ownership</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
