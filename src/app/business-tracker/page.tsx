import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { businessTracker, metadata as siteMetadata, primaryCta } from "@/content/site";

export const metadata: Metadata = {
  title: siteMetadata.businessTracker.title,
  description: siteMetadata.businessTracker.description,
  alternates: { canonical: "/business-tracker" }
};

export default function BusinessTrackerPage() {
  return (
    <>
      <PageReveals />
      <section className="section-pad pt-32">
        <div className="editorial-container">
          <p className="eyebrow">Business Tracker</p>
          <h1 className="display-xl mt-6 max-w-7xl" data-split>
            {businessTracker.coreLine}
          </h1>
          <p className="body-large mt-10 max-w-3xl text-ink/72" data-reveal>
            {businessTracker.explanation}
          </p>
        </div>
      </section>

      <section className="section-pad border-y border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="display-lg" data-split>
            From anonymous activity to qualified follow-up.
          </h2>
          <div className="space-y-6 body-large text-ink/72">
            <p data-reveal>{businessTracker.captures}</p>
            <p data-reveal>{businessTracker.commercialPoint}</p>
            <p className="text-2xl text-ink" data-reveal>{businessTracker.strap}</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container">
          <p className="eyebrow">Operating layers</p>
          <div className="mt-10 border-t border-ink/15">
            {businessTracker.modules.map(([number, title, body]) => (
              <div key={title} className="grid gap-5 border-b border-ink/12 py-8 md:grid-cols-[80px_0.7fr_1fr]" data-reveal>
                <span className="text-xs uppercase tracking-[0.08em] text-ink/45">{number}</span>
                <h2 className="text-4xl leading-none">{title}</h2>
                <p className="body-large text-ink/72">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container">
          <p className="eyebrow text-paper/55">Channel logic</p>
          <h2 className="display-lg mt-5 max-w-6xl" data-split>
            The Tracker connects the channels that usually sit apart.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {businessTracker.channels.map((channel) => (
              <div key={channel.title} className="border-t border-paper/20 pt-5" data-reveal>
                <h3 className="text-3xl leading-none">{channel.title}</h3>
                <p className="mt-5 leading-relaxed text-paper/70">{channel.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="editorial-container grid gap-8 md:grid-cols-[1fr_0.45fr] md:items-end">
          <div>
            <p className="eyebrow">Outcome</p>
            <h2 className="display-lg mt-5" data-split>
              {businessTracker.outcome}
            </h2>
          </div>
          <ButtonLink href={primaryCta.href}>Enquire Now</ButtonLink>
        </div>
      </section>
    </>
  );
}
