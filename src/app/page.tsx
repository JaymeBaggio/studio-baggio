import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageReveals } from "@/components/page-reveals";
import { ProofTiles } from "@/components/proof-tiles";
import { ValueMap } from "@/components/value-map";
import { hero, home, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.home, path: "/" });

export default function HomePage() {
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

      <section id="ai-gap" className="opening-argument-section">
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
            <div className="opening-outcome-stack">
              {home.opening.outcomes.map((line, index) => (
                <p key={line} className={index === home.opening.outcomes.length - 1 ? "is-strong" : ""} data-reveal>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="problem-clarifier-section">
        <div className="editorial-container">
          <div className="problem-clarifier-copy">
            <p className="eyebrow">{home.problem.eyebrow}</p>
            <h2 className="problem-clarifier-title" data-split>
              {home.problem.title}
            </h2>
            <p className="problem-stat" data-reveal>
              {home.problem.stat}
            </p>
            <a className="problem-source focus-ring" href={home.problem.sourceUrl} target="_blank" rel="noreferrer" data-reveal>
              {home.problem.source}
            </a>
            {home.problem.body.map((paragraph) => (
              <p key={paragraph} className="problem-strong" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
          {home.problem.pullQuotes.map((quote) => (
            <blockquote key={quote} className="problem-quote" data-reveal>
              {quote}
            </blockquote>
          ))}
        </div>
      </section>

      <section className="expertise-bridge-section">
        <div className="editorial-container expertise-bridge-grid">
          <h2 className="expertise-bridge-title" data-split>
            {home.expertiseBridge.title}
          </h2>
          <div className="expertise-bridge-body">
            {home.expertiseBridge.body.map((paragraph) => (
              <p key={paragraph} className="body-large text-ink/72" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="expertise-flow" aria-label="Internal expertise to intelligent follow-up">
            {home.expertiseBridge.steps.map((step, index) => (
              <div key={step} className="expertise-flow-item" data-expertise-step data-reveal>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ValueMap />

      <section className="section-pad narrative-chapter commercial-sprint-section">
        <div className="editorial-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">{home.commercialSprint.eyebrow}</p>
            <h2 className="display-lg mt-5" data-split>
              {home.commercialSprint.title}
            </h2>
            <p className="mt-6 text-2xl leading-tight text-ink/62" data-reveal>
              {home.commercialSprint.subline}
            </p>
            <p className="body-large mt-8 text-ink/72" data-reveal>
              {home.commercialSprint.body}
            </p>
            <div className="mt-8">
              <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            </div>
          </div>
          <div className="border-t border-ink/15">
            {home.commercialSprint.deliverables.map((item, index) => (
              <div key={item} className="grid grid-cols-[56px_1fr] gap-5 border-b border-ink/12 py-5" data-reveal>
                <span className="text-xs uppercase tracking-[0.08em] text-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="working-promise-section border-y border-ink/12">
        <div className="editorial-container working-promise-grid">
          <div>
            <p className="eyebrow">{home.workingPromise.eyebrow}</p>
            <h2 className="display-lg mt-5" data-split>
              {home.workingPromise.title}
            </h2>
          </div>
          <div className="working-promise-copy">
            {home.workingPromise.body.map((paragraph, index) => (
              <p key={paragraph} className={index >= home.workingPromise.body.length - 2 ? "is-emphasis" : ""} data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="commitment-grid">
            {home.workingPromise.commitments.map((commitment, index) => (
              <div key={commitment.title} className="commitment-item" data-reveal>
                <span>0{index + 1}</span>
                <h3>{commitment.title}</h3>
                <p>{commitment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper proof-section">
        <div className="editorial-container">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.42fr_1fr]">
            <p className="eyebrow">{home.proof.eyebrow}</p>
            <h2 className="display-lg" data-split>
              {home.proof.title}
            </h2>
          </div>
          <ProofTiles />
        </div>
      </section>

      <section className="section-pad border-t border-ink/12">
        <div className="editorial-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="display-lg" data-split>
            {home.fit.title}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <FitList title="Best for" items={home.fit.good} />
            <FitList title="Less useful for" items={home.fit.bad} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-charcoal text-paper">
        <div className="editorial-container grid gap-10 md:grid-cols-[1fr_0.6fr] md:items-end">
          <div>
            <p className="eyebrow text-paper/55">Next step</p>
            <h2 className="display-lg mt-5" data-split>
              If AI should be giving your business an edge, start with the opportunity.
            </h2>
          </div>
          <div>
            <p className="body-large text-paper/70">
              Bring the business, market or workflow you want to improve. Studio Baggio will help you work out where AI can create real commercial value and what should be built first.
            </p>
            <div className="mt-8">
              <ButtonLink href={primaryCta.href} className="border-paper text-paper hover:bg-paper hover:text-ink">
                {primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FitList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-ink/15">
      <h3 className="py-5 text-sm uppercase tracking-[0.07em] text-ink/52">{title}</h3>
      <div>
        {items.map((item) => (
          <p key={item} className="border-t border-ink/10 py-4 leading-relaxed text-ink/72">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
