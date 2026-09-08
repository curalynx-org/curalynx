import {
  FeatureBlock,
  LandingSubpage,
} from "@/components/landing/landing-subpage";

export default function ResourcesPage() {
  return (
    <LandingSubpage
      eyebrow="Resources"
      title="A better way to learn the workflow."
      description="Explore practical guidance for rolling out ambient documentation and clinical AI across your practice."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div id="help">
          <FeatureBlock
            title="Help Center"
            text="Find setup guidance, microphone tips, and answers for your first live session."
          />
        </div>
        <div id="case-studies">
          <FeatureBlock
            title="Case studies"
            text="See how providers use structured conversations to reclaim time and improve continuity."
          />
        </div>
        <div id="api">
          <FeatureBlock
            title="API docs"
            text="Learn how integrations can connect your clinical systems to the CuraLynx workflow."
          />
        </div>
      </div>
      <div id="blog" className="mt-16 rounded-3xl bg-[#E9D5FF] p-8 md:p-12">
        <p className="text-xs font-bold uppercase tracking-widest">
          From the blog
        </p>
        <h2 className="mt-3 font-serif text-4xl">
          Clinical AI, explained clearly.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#18181A]/65">
          Notes on ambient documentation, responsible recommendations, and
          designing technology that respects the consultation.
        </p>
      </div>
    </LandingSubpage>
  );
}
