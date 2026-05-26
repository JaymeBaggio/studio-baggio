import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { businessTracker, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.businessTracker, path: "/business-tracker" });

export default function BusinessTrackerPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{businessTracker.pageKicker}</p>
              <h1 className="studio-page-title" data-split>
                {businessTracker.coreLine}
              </h1>
              <p className="studio-page-body" data-reveal>
                {businessTracker.explanation}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">Standalone system page</p>
            <div className="studio-page-copy" data-reveal>
              {businessTracker.pageSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <h2 className="studio-page-title" data-split>
                From anonymous activity to qualified follow-up.
              </h2>
              <div className="studio-page-copy">
                <p data-reveal>{businessTracker.captures}</p>
                <p data-reveal>{businessTracker.marketSpecificContext}</p>
                <p data-reveal>{businessTracker.commercialPoint}</p>
              </div>
            </div>
            <p className="studio-page-lead" data-reveal data-motion="emphasis">{businessTracker.strap}</p>
          </div>
        </section>

        <section className="studio-page-dark" data-header-theme="dark">
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">Operating layers</p>
            <div className="studio-page-rows is-full">
              {businessTracker.modules.map(([number, title, body]) => (
                <article key={title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">{number}</span>
                  <h2 className="studio-page-row-title">{title}</h2>
                  <p className="studio-page-row-copy">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">Channel logic</p>
              <h2 className="studio-page-title" data-split>
                The Tracker connects the channels that usually sit apart.
              </h2>
            </div>
            <div className="studio-page-rows is-full">
              {businessTracker.channels.map((channel, index) => (
                <article key={channel.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h3 className="studio-page-row-title">{channel.title}</h3>
                  <p className="studio-page-row-copy">{channel.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta-section studio-page-cta" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            <p className="eyebrow home-cta-eyebrow" data-reveal data-motion="label">Outcome</p>
            <h2 className="home-cta-title" data-split>
              {businessTracker.outcome}
            </h2>
            <div data-cta-button>
              <ButtonLink href={primaryCta.href}>
                Enquire Now
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
