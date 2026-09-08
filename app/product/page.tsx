import {
  FeatureBlock,
  LandingSubpage,
} from "@/components/landing/landing-subpage";

export default function ProductPage() {
  return (
    <LandingSubpage
      eyebrow="The product"
      title="Less charting. More care."
      description="CuraLynx listens during the consultation and turns the conversation into structured clinical work your team can review and sign."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <FeatureBlock
          title="Live transcription"
          text="Capture the consultation as you speak with browser-based voice recognition and an always-visible transcript."
        />
        <FeatureBlock
          title="Structured notes"
          text="Turn the conversation into organized clinical content instead of rebuilding the visit from memory."
        />
        <FeatureBlock
          title="Ready-to-review Rx"
          text="Surface medications and tests from the discussion so the provider can review, adjust, and prescribe."
        />
      </div>
      <div
        id="individuals"
        className="mt-20 grid gap-8 rounded-3xl bg-[#E9D5FF] p-8 md:grid-cols-2 md:p-12"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest">
            For individuals
          </p>
          <h2 className="mt-3 font-serif text-4xl">
            A calmer consultation for every patient.
          </h2>
        </div>
        <p className="self-end text-sm leading-relaxed text-[#18181A]/70">
          Patients get more eye contact, clearer next steps, and a record that
          reflects the conversation instead of a rushed keyboard session.
        </p>
      </div>
      <div
        id="business"
        className="mt-5 rounded-3xl bg-[#0B392A] p-8 text-white md:p-12"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">
          For business
        </p>
        <h2 className="mt-3 font-serif text-4xl">
          A repeatable workflow for modern clinics.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
          Give providers a consistent way to capture visits, coordinate records,
          and move from conversation to action.
        </p>
      </div>
      <div id="pricing" className="mt-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0B392A]">
          Pricing
        </p>
        <h2 className="mt-3 font-serif text-4xl">
          Start with the workflow. Scale with your clinic.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#18181A]/60">
          Talk with the CuraLynx team about a plan for independent providers or
          multi-location practices.
        </p>
      </div>
    </LandingSubpage>
  );
}
