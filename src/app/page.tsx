import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { FrontDoorOfferInline } from "@/components/front-door-offer";
import { FaqSchema } from "@/components/faq-schema";
import { OpeningOutcomeStack } from "@/components/opening-outcome-stack";
import { PageReveals } from "@/components/page-reveals";
import { ProofTiles } from "@/components/proof-tiles";
import { hero, home, introDownload, metadata as siteMetadata, primaryCta, servicesPage } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { LastWordMark } from "@/components/last-word-mark";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.home, path: "/" });

function renderHeroMetaLine(line: string) {
  const phrase = "DELIVER MORE VALUE.";

  if (!line.includes(phrase)) {
    return line;
  }

  const [before, after] = line.split(phrase);

  return (
    <>
      {before}
      <span className="home-reference-nowrap home-reference-meta-accent">{phrase}</span>
      {after}
    </>
  );
}

function renderProblemTitle(title: string) {
  const lockedSecondLine = "but few are growing revenue with it.";

  if (!title.endsWith(lockedSecondLine)) {
    return title;
  }

  return (
    <>
      <span className="problem-title-line">{title.slice(0, -lockedSecondLine.length).trim()}</span>
      <span className="problem-title-line">{lockedSecondLine}</span>
    </>
  );
}

export default function HomePage() {
  const openingHeadlineParts = home.opening.headline.split(". ");
  const openingHeadlineLines = openingHeadlineParts.map((line, index) =>
    index < openingHeadlineParts.length - 1 ? `${line}.` : line
  );
  const openingSetupLines = home.opening.setup;
  const openingOutcomeLead = home.opening.outcomes.slice(0, -1);
  const openingOutcomeFinal = home.opening.outcomes[home.opening.outcomes.length - 1];
  const problemStats = [
    {
      value: "66%",
      label: "of organisations report productivity and efficiency gains from AI. Revenue growth is much rarer.",
      source: "Source: Deloitte, State of AI in the Enterprise 2026",
      href: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html"
    },
    {
      value: "20%",
      label: "of organisations are already growing revenue through AI. 74% hope to.",
      source: "Source: Deloitte, State of AI in the Enterprise 2026",
      href: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html"
    },
    {
      value: "12%",
      label: "of UK businesses using AI report an increase in revenue since adopting it.",
      source: "Source: UK Government (DSIT), AI Adoption Research, fieldwork 2025",
      href: "https://www.gov.uk/government/publications/ai-adoption-research/ai-adoption-research"
    }
  ];
  const heroPromiseLines = [
    hero.promiseTitle,
    ...hero.promise.replace(" TO BUILD", " TO\nBUILD").split("\n")
  ];

  return (
    <>
      <FaqSchema items={home.faq.items} />
      <PageReveals />
      <section className="home-reference-hero">
        <div className="editorial-container home-reference-frame">
          <div className="home-reference-meta">
            <div className="home-reference-meta-lines">
              {hero.meta.map((line) => (
                <p
                  key={line}
                  data-hero-meta
                >
                  {renderHeroMetaLine(line)}
                </p>
              ))}
            </div>
          </div>
          <h1 className="home-reference-wordmark uppercase" aria-label="Studio Baggio">
            {hero.wordmark.map((line) => (
              <span key={line} className="mask-line block">
                <span data-hero-line className="block">
                  {line === "BAGGIO" ? (
                    <>
                      <LastWordMark text="BAGGIO" />
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

      <FrontDoorOfferInline />

      <div className="home-4b">
        <section
          id="ai-gap"
          className="home-section problem-clarifier-section"
          data-home-section
          data-motion-section="gap"
        >
          <div className="editorial-container problem-clarifier-frame">
            <div className="problem-clarifier-copy">
              <div className="problem-clarifier-opening">
                <p className="eyebrow" data-reveal data-motion="label">{home.problem.eyebrow}</p>
                <h2 className="problem-clarifier-title problem-clarifier-title-manual" aria-label={home.problem.title}>
                  {renderProblemTitle(home.problem.title)}
                </h2>
              </div>
              <div className="problem-clarifier-evidence">
                <div className="problem-stat-grid" data-reveal data-motion="evidence">
                  {problemStats.map((stat) => (
                    <div className="problem-stat-card" key={stat.value} data-gap-stat-card>
                      <p className="problem-stat-value" data-gap-stat-value data-count-target={stat.value.replace("%", "")}>
                        {stat.value}
                      </p>
                      <p className="problem-stat-label">{stat.label}</p>
                      <p className="problem-stat-source">
                        <a className="underline-offset-4 hover:underline" href={stat.href} target="_blank" rel="noreferrer">
                          {stat.source}
                        </a>
                      </p>
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

        <section className="home-section opening-argument-section" data-home-section data-motion-section="opening">
          <div className="editorial-container opening-argument-grid">
            <div className="opening-argument-top">
              {home.opening.qualifier ? (
                <p className="opening-argument-qualifier" data-reveal>
                  {home.opening.qualifier}
                </p>
              ) : null}
              <h2 className="opening-argument-headline" data-split>
                {openingHeadlineLines.map((line) => (
                  <span data-split-hard-line key={line}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <div className="opening-outcome-block">
              <p className="opening-outcome-setup" data-reveal data-split>
                {openingSetupLines.map((line) => (
                  <span data-split-hard-line key={line}>
                    {line}
                  </span>
                ))}
              </p>
              <OpeningOutcomeStack
                lead={openingOutcomeLead}
                final={openingOutcomeFinal}
                label={home.opening.outcomes.join(" ")}
                controlled
              />
            </div>
          </div>
        </section>

        <section className="home-section commercial-sprint-section" data-home-section data-motion-section="offer">
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
            <div className="hire-card-grid">
              {servicesPage.offers.map((offer) => (
                <article key={offer.id} className="hire-card" data-reveal>
                  <div className="hire-card-bar" aria-hidden="true" />
                  <div className="hire-card-body">
                    <h3 className="hire-card-title">{offer.name}</h3>
                    <p className="hire-card-summary">{offer.summary}</p>
                    {"showExampleOnHome" in offer && offer.showExampleOnHome && offer.example ? (
                      <p className="hire-card-example">
                        {"homeExample" in offer && offer.homeExample ? offer.homeExample : offer.example.paras[0]}
                      </p>
                    ) : null}
                    <a className="hire-card-link focus-ring" href={`/services#${offer.id}`}>
                      See what&apos;s included
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="commercial-sprint-cta-wrap" data-reveal>
              <ButtonLink href={primaryCta.href} className="commercial-sprint-cta">
                {primaryCta.label}
              </ButtonLink>
              <a
                className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                href={home.commercialSprint.moreLink.href}
              >
                {home.commercialSprint.moreLink.label}
              </a>
              <a
                className="focus-ring text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                href={introDownload.href}
                download
              >
                {introDownload.label}
              </a>
            </div>
          </div>
        </section>

        <section className="home-section working-promise-section" data-home-section data-motion-section="promise">
          <div className="editorial-container working-promise-frame working-promise-grid">
            {home.workingPromise.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.workingPromise.eyebrow}</p>
            ) : null}
            <div className="working-promise-body-grid">
              <div className="working-promise-copy">
                {home.workingPromise.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    data-reveal
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="working-promise-negatives" aria-label={home.workingPromise.title}>
                {home.workingPromise.negativeLines.map((line) => (
                  <p key={line} className="working-promise-negative" data-reveal>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section proof-section" data-home-section data-motion-section="proof">
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

        <section className="home-section fit-section" data-home-section data-motion-section="fit">
          <div className="editorial-container fit-section-frame">
            <p className="eyebrow" data-reveal data-motion="label">{home.fit.eyebrow}</p>
            <h2 className="fit-section-title" data-split>
              {home.fit.title}
            </h2>
            <div className="fit-list-grid" data-reveal>
              <FitList title={home.fit.goodLabel} items={home.fit.good} />
              <FitList title={home.fit.badLabel} items={home.fit.bad} />
            </div>
          </div>
        </section>

        <section className="home-section faq-section" data-home-section data-motion-section="faq">
          <div className="editorial-container faq-section-frame">
            <p className="eyebrow" data-reveal data-motion="label">{home.faq.eyebrow}</p>
            <FaqAccordion items={home.faq.items} />
          </div>
        </section>

        <section className="home-section home-cta-section" data-home-section data-motion-section="cta" data-header-theme="dark">
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

function FitList({ title, items }: { title: string; items: string[] }) {
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
