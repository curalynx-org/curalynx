import {
  FeatureBlock,
  LandingSubpage,
} from "@/components/landing/landing-subpage";

export default function CompanyPage() {
  return (
    <LandingSubpage
      eyebrow="The company"
      title="Technology with a bedside manner."
      description="CuraLynx is building practical clinical tools that return attention to the people in the room."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <FeatureBlock
          title="Our mission"
          text="Make thoughtful care easier by removing the administrative friction around every visit."
        />
        <FeatureBlock
          title="Our approach"
          text="Useful workflows first, transparent AI assistance second, and clinician review at every important decision."
        />
        <FeatureBlock
          title="Our promise"
          text="The provider remains in control of the record, the recommendations, and the patient relationship."
        />
      </div>
      <div
        id="careers"
        className="mt-16 rounded-3xl bg-[#18181A] p-8 text-white md:p-12"
      >
        <h2 className="font-serif text-4xl">Careers</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">
          We are building the future of clinical work with people who care about
          craft, safety, and the human side of healthcare.
        </p>
        <a
          href="mailto:careers@curalynx.health"
          className="mt-6 inline-block rounded-full bg-[#E9D5FF] px-5 py-3 text-sm font-bold text-[#18181A]"
        >
          Email our team
        </a>
      </div>
      <div
        id="security"
        className="mt-5 rounded-3xl border border-[#18181A]/10 bg-white p-8 md:p-12"
      >
        <h2 className="font-serif text-4xl">Security & HIPAA</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#18181A]/60">
          CuraLynx is designed around provider review, controlled access, and
          responsible handling of clinical information. Contact us for
          implementation and compliance details.
        </p>
      </div>
      <div id="contact" className="mt-5 text-center">
        <h2 className="font-serif text-4xl">Talk to CuraLynx</h2>
        <a
          href="mailto:hello@curalynx.health"
          className="mt-5 inline-block rounded-full bg-[#0B392A] px-6 py-3 text-sm font-bold text-white"
        >
          hello@curalynx.health
        </a>
      </div>
    </LandingSubpage>
  );
}
