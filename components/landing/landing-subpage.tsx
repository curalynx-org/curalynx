import Link from "next/link";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";

interface LandingSubpageProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function LandingSubpage({
  eyebrow,
  title,
  description,
  children,
}: LandingSubpageProps) {
  return (
    <main className="min-h-screen bg-[#FDFBF2] font-sans text-[#18181A]">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tighter"
        >
          <Activity className="h-5 w-5" /> CuraLynx
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-bold hover:opacity-70"
          >
            Log in
          </Link>
          <Link
            href="/session"
            className="rounded-full border border-[#18181A] bg-[#E9D5FF] px-5 py-2 text-sm font-bold hover:bg-[#D8B4FE]"
          >
            Start session
          </Link>
        </div>
      </nav>

      <section className="bg-[#18181A] px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#E9D5FF]">
            {eyebrow}
          </p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/session"
              className="inline-flex items-center gap-2 rounded-full bg-[#E9D5FF] px-6 py-3 text-sm font-bold text-[#18181A] hover:bg-[#D8B4FE]"
            >
              Try CuraLynx <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
        {children}
      </section>

      <footer className="border-t border-[#18181A]/10 px-6 py-8 text-center text-xs text-[#18181A]/50">
        <Link href="/" className="font-bold text-[#18181A]">
          CuraLynx
        </Link>{" "}
        · Care that moves with you
      </footer>
    </main>
  );
}

export function FeatureBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-[#18181A]/10 bg-white p-6 shadow-sm">
      <CheckCircle2 className="mb-5 h-6 w-6 text-[#0B392A]" />
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#18181A]/60">{text}</p>
    </div>
  );
}
