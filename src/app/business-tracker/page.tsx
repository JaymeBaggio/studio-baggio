import type { Metadata } from "next";
import Image from "next/image";
import { BusinessTrackerInputMap } from "@/components/business-tracker/input-map";
import { FaqAccordion } from "@/components/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { businessTracker, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.businessTracker, path: "/business-tracker" });

export default function BusinessTrackerPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page business-tracker-page">
        <section
          className="studio-page-hero bt-hero"
          data-business-tracker-section="hero"
          data-home-section
          data-motion-section="bt-hero"
        >
          <div className="editorial-container studio-page-frame bt-hero-frame">
            <div className="bt-hero-copy">
              <p className="eyebrow" data-reveal data-motion="label">
                {businessTracker.hero.eyebrow}
              </p>
              <h1 className="studio-page-title" data-split>
                {businessTracker.hero.title}
              </h1>
              <p className="studio-page-body" data-reveal>
                {businessTracker.hero.sub}
              </p>
            </div>
          </div>
        </section>

        <section
          className="bt-what-section"
          data-business-tracker-section="what-it-does"
          data-home-section
          data-motion-section="bt-what"
        >
          <div className="editorial-container bt-what-frame">
            <header className="bt-what-header">
              <p className="eyebrow" data-reveal data-motion="label">
                {businessTracker.whatItDoes.eyebrow}
              </p>
              <h2 className="bt-section-title" data-split>
                {businessTracker.whatItDoes.title}
              </h2>
              <p className="bt-section-intro" data-reveal>
                {businessTracker.whatItDoes.intro}
              </p>
            </header>
            <div className="bt-signal-panel">
              <div className="bt-signal-copy">
                <div className="bt-calm-list is-signal-list" data-reveal>
                  <ul>
                    {businessTracker.whatItDoes.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bt-what-dashboard" data-reveal data-motion="evidence">
                <Image
                  src={businessTracker.hero.dashboard.src}
                  width={businessTracker.hero.dashboard.width}
                  height={businessTracker.hero.dashboard.height}
                  alt={businessTracker.hero.dashboard.alt}
                  priority
                  sizes="(max-width: 1023px) calc(100vw - 36px), min(640px, 52vw)"
                />
              </div>
            </div>
            <p className="bt-signal-proof" data-reveal>
              {businessTracker.whatItDoes.close}
            </p>
          </div>
        </section>

        <section
          className="bt-operating-section"
          data-business-tracker-section="operating-layers"
          data-home-section
          data-motion-section="bt-layers"
        >
          <div className="editorial-container bt-operating-frame">
            <p className="eyebrow" data-reveal data-motion="label">
              {businessTracker.operatingLayers.eyebrow}
            </p>
            <h2 className="bt-section-title" data-split>
              {businessTracker.operatingLayers.title}
            </h2>
            <div className="bt-operating-rows">
              {businessTracker.operatingLayers.items.map((item, index) => (
                <article key={item.title} className={index === 0 ? "bt-operating-row is-open" : "bt-operating-row"} data-reveal>
                  <span className="bt-operating-number">{item.number}</span>
                  <div className="bt-operating-copy">
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BusinessTrackerInputMap {...businessTracker.inputMap} />

        <section
          className="bt-outcome-section"
          data-business-tracker-section="outcome"
          data-home-section
          data-motion-section="bt-outcome"
        >
          <div className="editorial-container bt-outcome-frame">
            <p className="eyebrow" data-reveal data-motion="label">
              {businessTracker.outcome.eyebrow}
            </p>
            <h2 className="bt-section-title" data-split>
              {businessTracker.outcome.deliverable}
            </h2>
            <div className="bt-outcome-pillars" data-reveal>
              {businessTracker.outcome.deliverables.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <ul className="bt-outcome-list" data-reveal>
              {businessTracker.outcome.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="bt-hiring-section"
          data-business-tracker-section="hiring"
          data-home-section
          data-motion-section="bt-hiring"
        >
          <div className="editorial-container studio-page-stack">
            <p className="eyebrow" data-reveal data-motion="label">
              {businessTracker.hiring.eyebrow}
            </p>
            <h2 className="bt-section-title" data-split>
              {businessTracker.hiring.intro}
            </h2>
            <div className="bt-calm-list" data-reveal>
              <ul>
                {businessTracker.hiring.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="bt-fit-section"
          data-business-tracker-section="who-its-for"
          data-home-section
          data-motion-section="bt-fit"
        >
          <div className="editorial-container fit-section-frame">
            <p className="eyebrow" data-reveal data-motion="label">
              {businessTracker.fit.eyebrow}
            </p>
            <h2 className="bt-section-title" data-split>
              {businessTracker.fit.title}
            </h2>
            <div className="fit-list-grid bt-fit-list-grid" data-reveal>
              <BusinessTrackerFitList title={businessTracker.fit.bestForLabel} items={businessTracker.fit.bestForItems} />
              <BusinessTrackerFitList title={businessTracker.fit.notForLabel} items={businessTracker.fit.notForItems} />
            </div>
          </div>
        </section>

        <section
          className="faq-section bt-faq-section"
          data-business-tracker-section="faq"
          data-home-section
          data-motion-section="faq"
        >
          <div className="editorial-container faq-section-frame">
            <p className="eyebrow" data-reveal data-motion="label">
              {businessTracker.faq.eyebrow}
            </p>
            <FaqAccordion items={businessTracker.faq.items} />
          </div>
        </section>

        <section
          className="home-cta-section studio-page-cta"
          data-header-theme="dark"
          data-business-tracker-section="cta"
          data-home-section
          data-motion-section="cta"
        >
          <div className="editorial-container home-cta-frame">
            <div data-cta-button>
              <ButtonLink href={primaryCta.href}>
                {businessTracker.cta.label}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function BusinessTrackerFitList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="fit-list-column">
      <h3>{title}</h3>
      <ul className="fit-ruled-list">
        {items.map((item) => (
          <li key={item}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
