import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq-accordion";
import { FrontDoorOfferInline } from "@/components/front-door-offer";
import { FaqSchema } from "@/components/faq-schema";
import { OpeningOutcomeStack } from "@/components/opening-outcome-stack";
import { PageReveals } from "@/components/page-reveals";
import { ProductShowcase } from "@/components/product-showcase";
import { LatestInsights } from "@/components/latest-insights";
import { getInsightPath, insightArticles } from "@/content/insights";
import { hero, home, introDownload, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { LastWordMark } from "@/components/last-word-mark";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.home, path: "/" });

const insightMonths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const latestInsights = [...insightArticles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6)
  .map((article) => {
    const [year, month] = article.date.split("-");
    return {
      href: getInsightPath(article),
      title: article.title,
      category: article.category,
      dateLabel: `${insightMonths[Number(month) - 1]} ${year}`,
      readTime: article.readTime
    };
  });

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
  const lockedSecondLine = "meaningful ROI.";

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
      value: "79%",
      label: "of ultra-wealthy investors ($10m+) say firms that use AI are more attractive to them as clients.",
      source: "Source: BNY Wealth, The Intelligent Investor, 2026",
      href: "https://www.bny.com/assets/wealth/pdf-library/reports/the-intelligent-investor-insights-on-ai-forward-investing.pdf"
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
        <section className="home-section commercial-sprint-section" data-home-section data-motion-section="offer">
          <div className="editorial-container commercial-sprint-frame">
            {home.commercialSprint.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.commercialSprint.eyebrow}</p>
            ) : null}
            <h2 className="commercial-sprint-title" data-split>
              {home.commercialSprint.title}
            </h2>
            <ul className="hire-help-list" data-reveal>
              {home.helpList.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
              {home.commercialSprint.cards.map((card) => (
                <article key={card.title} className="hire-card" data-reveal>
                  <div className="hire-card-bar" aria-hidden="true" />
                  <div className="hire-card-body">
                    <h3 className="hire-card-title">{card.title}</h3>
                    <p className="hire-card-summary">{card.summary}</p>
                    <p className="hire-card-example">{card.proof}</p>
                    <a className="hire-card-link focus-ring" href={card.href}>
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

        <section
          id="ai-gap"
          className="home-section problem-clarifier-section"
          data-home-section
          data-motion-section="gap"
        >
          <div className="editorial-container problem-clarifier-frame">
            <div className="problem-clarifier-copy">
              <div className="gap-head">
                <div className="problem-clarifier-opening">
                  {home.problem.eyebrow ? (
                    <p className="eyebrow" data-reveal data-motion="label">{home.problem.eyebrow}</p>
                  ) : null}
                  <h2 className="problem-clarifier-title problem-clarifier-title-manual" aria-label={home.problem.title}>
                    {renderProblemTitle(home.problem.title)}
                  </h2>
                </div>
                <div className="gap-insights" data-motion="insights">
                  <LatestInsights items={latestInsights} allHref="/insights" />
                </div>
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
            </div>
          </div>
        </section>

        <section className="home-section working-promise-section" data-home-section data-motion-section="promise">
          <div className="editorial-container working-promise-frame">
            <h2 className="working-promise-title" data-split>
              {home.problem.close}
            </h2>
            <ol className="promise-steps" aria-label={home.workingPromise.title}>
              {home.workingPromise.negativeLines.map((line, index) => (
                <li key={line} className="promise-step" data-reveal>
                  <span className="promise-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="promise-step-title">{line}</h3>
                  {home.workingPromise.body[index] ? (
                    <p className="promise-step-body">{home.workingPromise.body[index]}</p>
                  ) : null}
                </li>
              ))}
            </ol>
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
            {home.proof.subline ? (
              <p className="proof-section-subline" data-reveal>{home.proof.subline}</p>
            ) : null}
            <ProductShowcase />
          </div>
        </section>

        <section className="home-section fit-section" data-home-section data-motion-section="fit">
          <div className="editorial-container fit-section-frame">
            {home.fit.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.fit.eyebrow}</p>
            ) : null}
            <h2 className="fit-section-title" data-split>
              {home.fit.title}
            </h2>
            <div className="fit-list-grid" data-reveal>
              <FitList title={home.fit.goodLabel} items={home.fit.good} />
              <FitList title={home.fit.badLabel} items={home.fit.bad} variant="not" />
            </div>
          </div>
        </section>

        <section className="home-section faq-section" data-home-section data-motion-section="faq">
          <div className="editorial-container faq-section-frame">
            {home.faq.eyebrow ? (
              <p className="eyebrow" data-reveal data-motion="label">{home.faq.eyebrow}</p>
            ) : null}
            {home.faq.title ? <h2 className="faq-section-title">{home.faq.title}</h2> : null}
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

function FitList({ title, items, variant = "best" }: { title: string; items: string[]; variant?: "best" | "not" }) {
  return (
    <div className={`fit-list-column is-${variant}`}>
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
