import {
  FeatureBlock,
  LandingSubpage,
} from "@/components/landing/landing-subpage";

export default function IntegrationsPage() {
  return (
    <LandingSubpage
      eyebrow="Integrations"
      title="Fits the tools your clinic already uses."
      description="CuraLynx is designed to sit alongside your EHR and clinical workflow, from the first spoken symptom to the final signed record."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <FeatureBlock
          title="EHR-ready"
          text="Copy structured output into the systems your team already depends on, with a workflow built for review."
        />
        <FeatureBlock
          title="Cross-platform"
          text="Use the browser on Mac, Windows, iOS, and Android wherever consultations happen."
        />
        <FeatureBlock
          title="Flexible rollout"
          text="Start with one provider and expand to a clinic-wide workflow when your team is ready."
        />
      </div>
      <div className="mt-16 rounded-3xl bg-[#0B392A] p-8 text-white md:p-12">
        <h2 className="font-serif text-4xl">Have a specific EHR?</h2>
        <p className="mt-4 max-w-xl text-sm text-white/65">
          Tell our team what you use and we will map the best implementation
          path.
        </p>
        <a
          href="mailto:integrations@curalynx.health"
          className="mt-6 inline-block rounded-full bg-[#E9D5FF] px-6 py-3 text-sm font-bold text-[#18181A]"
        >
          Contact integrations
        </a>
      </div>
    </LandingSubpage>
  );
}
