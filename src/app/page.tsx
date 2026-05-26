import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { OpeningOutcomeStack } from "@/components/opening-outcome-stack";
import { PageReveals } from "@/components/page-reveals";
import { ProofTiles } from "@/components/proof-tiles";
import { ValueMap } from "@/components/value-map";
import { hero, home, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.home, path: "/" });

export default function HomePage() {
  const openingOutcomeLead = home.opening.outcomes.slice(0, -1);
  const openingOutcomeFinal = home.opening.outcomes[home.opening.outcomes.length - 1];
  const problemStats = [
    {
      value: "66%",
      label:
        "of organisations have achieved productivity or efficiency gains from AI.",
      source: "Source: Deloitte State of AI report, 2026"
    },
    {
      value: "20%",
      label:
        "report increased revenue.",
      source: "Source: Deloitte State of AI report, 2026"
    },
    {
      value: "12%",
      label:
        "of UK businesses using AI report a revenue increase.",
      source: "Source: UK Government AI Adoption Research, 2026"
    }
  ];
  const heroPromiseLines = [
    hero.promiseTitle,
    ...hero.promise.replace(" TO BUILD", " TO\nBUILD").split("\n")
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
                  {line === "BAGGIO.AI" ? (
                    <>
                      BAGGIO<span className="home-reference-wordmark-dot">.</span>AI
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <div className="home-reference-promise">
            {heroPromiseLines.map((line, index) => (
              <p
                key={line}
                className={index === heroPromiseLines.length - 1 ? "is-emphasis" : undefined}
                data-hero-promise
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="home-4b">
        <section className="opening-argument-section">
          <div className="editorial-container opening-argument-grid">
            <div className="opening-argument-top">
              <p className="opening-argument-qualifier" data-reveal>
                {home.opening.qualifier}
              </p>
              <h2 className="opening-argument-headline" data-split>
                {home.opening.headline}
              </h2>
            </div>
            <div className="opening-outcome-block">
              <p className="opening-outcome-setup" data-reveal>
                {home.opening.setup}
              </p>
              <OpeningOutcomeStack
                lead={openingOutcomeLead}
                final={openingOutcomeFinal}
                label={home.opening.outcomes.join(" ")}
              />
            </div>
          </div>
        </section>

        <section id="ai-gap" className="problem-clarifier-section">
          <div className="editorial-container problem-clarifier-frame">
            <div className="problem-clarifier-copy">
              <div className="problem-clarifier-opening">
                <p className="eyebrow" data-reveal data-motion="label">{home.problem.eyebrow}</p>
                <h2 className="problem-clarifier-title" data-split>
                  {home.problem.title}
                </h2>
              </div>
              <div className="problem-clarifier-evidence">
                <div className="problem-stat-grid" data-reveal data-motion="evidence">
                  {problemStats.map((stat) => (
                    <div className="problem-stat-card" key={stat.value}>
                      <p className="problem-stat-value">{stat.value}</p>
                      <p className="problem-stat-label">{stat.label}</p>
                      <p className="problem-stat-source">{stat.source}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="problem-clarifier-takeaway">
                <div className="section-rule" data-rule aria-hidden="true" />
                <p className="problem-strong" data-reveal data-motion="close">
                  {home.problem.close}
                </p>
              </div>
            </div>
          </div>
        </section>

        <ValueMap />

        <section className="commercial-sprint-section">
          <div className="editorial-container commercial-sprint-frame">
            <p className="eyebrow" data-reveal data-motion="label">{home.commercialSprint.eyebrow}</p>
            <h2 className="commercial-sprint-title" data-split>
              {home.commercialSprint.title}
            </h2>
            {home.commercialSprint.subline ? (
              <p className="commercial-sprint-subline" data-reveal>
                {home.commercialSprint.subline}
              </p>
            ) : null}
            {home.commercialSprint.body ? (
              <p className="commercial-sprint-body" data-reveal>
                {home.commercialSprint.body}
              </p>
            ) : null}
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
            {home.workingPromise.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.workingPromise.eyebrow}</p>
            ) : null}
            <h2 className="working-promise-title" data-split>
              {home.workingPromise.title}
            </h2>
            <div className="working-promise-copy">
              {home.workingPromise.body.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index >= home.workingPromise.body.length - 2 ? "is-emphasis" : ""}
                  data-reveal
                  data-motion={index >= home.workingPromise.body.length - 2 ? "emphasis" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-section">
          <div className="editorial-container proof-section-frame">
            {home.proof.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.proof.eyebrow}</p>
            ) : null}
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

        <section className="faq-section">
          <div className="editorial-container faq-section-frame">
            <p className="eyebrow" data-reveal data-motion="label">{home.faq.eyebrow}</p>
            <div className="faq-list">
              {home.faq.items.map((item) => (
                <div key={item.question} className="faq-row" data-reveal>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-cta-section" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            {home.cta.eyebrow ? (
              <p className="eyebrow home-cta-eyebrow" data-reveal data-motion="label">{home.cta.eyebrow}</p>
            ) : null}
            {home.cta.title ? (
              <h2 className="home-cta-title" data-split>
                {home.cta.title}
              </h2>
            ) : null}
            {home.cta.body ? (
              <p className="home-cta-body" data-reveal>
                {home.cta.body}
              </p>
            ) : null}
            <div data-cta-button>
              <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
                {primaryCta.label}
              </ButtonLink>
            </div>
            {home.cta.brand ? (
              <p className="home-cta-brand" data-reveal>{home.cta.brand}</p>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}

function FitList({ title, items, dark }: { title: string; items: string[]; dark?: boolean }) {
  return (
    <div className={dark ? "fit-card is-dark" : "fit-card"} data-reveal>
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
