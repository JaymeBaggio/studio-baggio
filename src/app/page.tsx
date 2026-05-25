import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { ProofTiles } from "@/components/proof-tiles";
import { ValueMap } from "@/components/value-map";
import { hero, home, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.home, path: "/" });

export default function HomePage() {
  const openingOutcomeLead = home.opening.outcomes.slice(0, -1);
  const openingOutcomeFinal = home.opening.outcomes[home.opening.outcomes.length - 1];
  const commercialSystemAreas = [
    "SEO, AI search",
    "market intelligence",
    "lead capture",
    "prospect research",
    "authority-building",
    "workflow acceleration"
  ];

  return (
    <>
      <PageReveals />
      <section className="home-reference-hero">
        <div className="editorial-container home-reference-frame">
          <div className="home-reference-meta">
            <div className="space-y-2">
              {hero.meta.map((line) => (
                <p key={line} data-hero-meta>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <h1 className="home-reference-wordmark uppercase" aria-label="Studio Baggio dot AI">
            {hero.wordmark.map((line) => (
              <span key={line} className="mask-line block">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <div className="home-reference-promise">
            <p data-hero-promise>{hero.promiseTitle}</p>
            <p data-hero-promise>{hero.promise}</p>
          </div>
        </div>
      </section>

      <div className="home-4b">
        <section className="opening-argument-section">
          <div className="editorial-container opening-argument-grid">
            <div className="opening-argument-top">
              <h2 className="opening-argument-headline" data-split>
                {home.opening.headline}
              </h2>
              <p className="opening-argument-qualifier" data-reveal>
                {home.opening.qualifier}
              </p>
            </div>
            <div className="opening-outcome-block">
              <p className="opening-outcome-setup" data-reveal>
                {home.opening.setup}
              </p>
              <div className="opening-outcome-stack" aria-label={home.opening.outcomes.join(" ")}>
                <div className="opening-outcome-muted-group" data-reveal>
                  {openingOutcomeLead.map((line) => (
                    <p key={line}>
                      {line}
                    </p>
                  ))}
                </div>
                {openingOutcomeFinal ? (
                  <p className="is-strong" data-reveal>
                    {openingOutcomeFinal}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section id="ai-gap" className="problem-clarifier-section">
          <div className="editorial-container problem-clarifier-frame">
            <div className="problem-clarifier-copy">
              <p className="eyebrow" data-reveal>{home.problem.eyebrow}</p>
              <h2 className="problem-clarifier-title" data-split>
                {home.problem.title}
              </h2>
              <div className="problem-stat-cards" aria-label="2026 UK AI ROI figures" data-reveal>
                <span>78%</span>
                <span>31%</span>
              </div>
              <p className="problem-stat" data-reveal>
                {home.problem.stat}
              </p>
              <a className="problem-source focus-ring" href={home.problem.sourceUrl} target="_blank" rel="noreferrer" data-reveal>
                {home.problem.source}
              </a>
            </div>
          </div>
        </section>

        <section className="commercial-systems-section">
          <div className="editorial-container commercial-systems-frame">
            {home.problem.body.map((paragraph) => (
              <p key={paragraph} className="commercial-systems-lead" data-reveal>
                {paragraph}
              </p>
            ))}
            <div className="commercial-systems-list" aria-label="Practical systems Studio Baggio builds">
              {commercialSystemAreas.map((area, index) => (
                <div key={area} className="commercial-systems-row" data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ValueMap />

        <section className="commercial-sprint-section">
          <div className="editorial-container commercial-sprint-frame">
            <p className="eyebrow" data-reveal>{home.commercialSprint.eyebrow}</p>
            <h2 className="commercial-sprint-title" data-split>
              {home.commercialSprint.title}
            </h2>
            <p className="commercial-sprint-subline" data-reveal>
              {home.commercialSprint.subline}
            </p>
            <p className="commercial-sprint-body" data-reveal>
              {home.commercialSprint.body}
            </p>
            <div className="commercial-deliverables">
              {home.commercialSprint.deliverables.map((item, index) => (
                <div key={item} className="commercial-deliverable-row" data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="working-promise-section">
          <div className="editorial-container working-promise-frame">
            <p className="eyebrow" data-reveal>{home.workingPromise.eyebrow}</p>
            <h2 className="working-promise-title" data-split>
              {home.workingPromise.title}
            </h2>
            <div className="working-promise-copy">
              {home.workingPromise.body.map((paragraph, index) => (
                <p key={paragraph} className={index >= home.workingPromise.body.length - 2 ? "is-emphasis" : ""} data-reveal>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-section">
          <div className="editorial-container proof-section-frame">
            <p className="eyebrow" data-reveal>{home.proof.eyebrow}</p>
            <h2 className="proof-section-title" data-split>
              {home.proof.title}
            </h2>
            <ProofTiles />
          </div>
        </section>

        <section className="fit-section">
          <div className="editorial-container fit-section-frame">
            <h2 className="fit-section-title" data-split>
              {home.fit.title}
            </h2>
            <div className="fit-card-grid">
              <FitList title={home.fit.goodLabel} items={home.fit.good} />
              <FitList title={home.fit.badLabel} items={home.fit.bad} dark />
            </div>
          </div>
        </section>

        <section className="home-cta-section" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            <p className="eyebrow home-cta-eyebrow" data-reveal>{home.cta.eyebrow}</p>
            <h2 className="home-cta-title" data-split>
              {home.cta.title}
            </h2>
            <p className="home-cta-body" data-reveal>
              {home.cta.body}
            </p>
            <div data-cta-button>
              <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
                {primaryCta.label}
              </ButtonLink>
            </div>
            <p className="home-cta-brand" data-reveal>{home.cta.brand}</p>
          </div>
        </section>
      </div>
    </>
  );
}

function FitList({ title, items, dark }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div className={dark ? "fit-card is-dark" : "fit-card"}>
      <h3>{title}</h3>
      <div className="fit-card-copy">
        {items.map((item) => (
          <p key={item}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
