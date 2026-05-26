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
                {businessTracker.title}
              </h1>
              <p className="studio-page-body" data-reveal>
                {businessTracker.coreLine}
              </p>
              <div className="studio-row-actions" data-reveal>
                <ButtonLink href={primaryCta.href}>
                  {businessTracker.cta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-page-dark" data-header-theme="dark">
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">{businessTracker.sectionLabels.operatingLayers}</p>
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
            <p className="eyebrow" data-reveal data-motion="label">{businessTracker.sectionLabels.inputMap}</p>
            <div className="studio-page-rows is-full">
              {businessTracker.inputs.map((input, index) => (
                <article key={input.title} className="studio-page-row" data-reveal>
                  <span className="studio-page-row-number">0{index + 1}</span>
                  <h2 className="studio-page-row-title">{input.title}</h2>
                  <div className="studio-page-row-copy">
                    <p>{input.body}</p>
                    <p>{input.note}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="studio-page-lead" data-reveal data-motion="emphasis">{businessTracker.bridge}</p>
          </div>
        </section>

        <section className="studio-page-dark" data-header-theme="dark">
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">{businessTracker.sectionLabels.outcome}</p>
            <div className="studio-page-copy" data-reveal>
              <p className="studio-page-lead">{businessTracker.outcome.deliverable}</p>
              <p>{businessTracker.outcome.impact}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">{businessTracker.sectionLabels.fit}</p>
            <div className="studio-page-rows is-full">
              <article className="studio-page-row" data-reveal>
                <span className="studio-page-row-number">01</span>
                <h2 className="studio-page-row-title">Best for:</h2>
                <p className="studio-page-row-copy">{businessTracker.fit.bestFor}</p>
              </article>
              <article className="studio-page-row" data-reveal>
                <span className="studio-page-row-number">02</span>
                <h2 className="studio-page-row-title">Not for:</h2>
                <p className="studio-page-row-copy">{businessTracker.fit.notFor}</p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container studio-page-stack">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{businessTracker.sectionLabels.commercial}</p>
              <p className="studio-page-lead" data-reveal>{businessTracker.commercial.lead}</p>
            </div>
            <div className="studio-page-rows is-full">
              <article className="studio-page-row" data-reveal>
                <span className="studio-page-row-number">01</span>
                <h2 className="studio-page-row-title">{businessTracker.commercial.includesLabel}</h2>
                <ul className="studio-page-list">
                  {businessTracker.commercial.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="home-cta-section studio-page-cta" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            <div data-cta-button>
              <ButtonLink href={primaryCta.href}>
                {businessTracker.cta}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
