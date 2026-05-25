import type { Metadata } from "next";
import Image from "next/image";
import { CalmAuthorityMotion } from "@/components/calm-authority-motion";
import { ButtonLink } from "@/components/ui/button";
import { calmAuthority, metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

export default function CalmAuthorityPage() {
  return (
    <>
      <CalmAuthorityMotion />
      <section className="calm-authority-hero" data-calm-hero>
        <div className="editorial-container calm-authority-hero-grid">
          <div className="calm-authority-hero-copy">
            <p className="eyebrow" data-calm-motion data-calm-hero-copy>
              {calmAuthority.eyebrow}
            </p>
            <h1 className="display-xl mt-6" data-calm-motion data-calm-hero-copy>
              {calmAuthority.title} <span>— {calmAuthority.tagline}</span>
            </h1>
            <p className="calm-authority-built-line" data-calm-motion data-calm-hero-copy>
              {calmAuthority.builtLine}
            </p>
            <div className="calm-authority-featured" data-calm-motion data-calm-hero-copy>
              <span>Featured in:</span>
              <div className="calm-authority-logo-row" aria-label={`Featured in ${calmAuthority.featuredIn.join(", ")}`}>
                {calmAuthority.featuredIn.map((publication) => (
                  <span key={publication} className="calm-authority-wordmark">
                    {publication}
                  </span>
                ))}
              </div>
            </div>
            <p className="calm-authority-hero-intro" data-calm-motion data-calm-hero-copy>
              {calmAuthority.productIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-calm-motion data-calm-hero-copy>
              {calmAuthority.links.map((link) => (
                <ButtonLink key={link.href} href={link.href} external>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <a
            href={calmAuthority.liveHref}
            target="_blank"
            rel="noreferrer"
            className="calm-authority-shot-wrap focus-ring block"
            aria-label="Open Calm Authority website"
            data-calm-shot-wrap
          >
            <div className="calm-authority-shot" data-calm-motion data-calm-shot>
              <Image
                src="/assets/products/calm-authority.png"
                alt="Calm Authority product screenshot"
                width={1400}
                height={875}
                className="h-auto w-full"
                priority
              />
              <div className="calm-authority-shot-caption">
                <span>Live site</span>
                <span>calmauthority.ai</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="calm-authority-lede-section border-b border-ink/12">
        <div className="editorial-container">
          <div className="calm-authority-lede">
            {calmAuthority.commercialThesis.map((paragraph) => (
              <p key={paragraph} data-calm-motion data-calm-row>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-copy-grid">
          <p className="eyebrow">The problem</p>
          <div className="calm-authority-copy">
            {calmAuthority.problem.map((paragraph) => (
              <p key={paragraph} data-calm-motion data-calm-row>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section border-y border-ink/12 bg-soft">
        <div className="editorial-container calm-authority-copy-grid">
          <p className="eyebrow">Why now</p>
          <div className="calm-authority-copy">
            <p data-calm-motion data-calm-row>{calmAuthority.whyNow}</p>
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-copy-grid">
          <p className="eyebrow">How it works</p>
          <div className="calm-authority-copy">
            {calmAuthority.howItWorks.map((paragraph) => (
              <p key={paragraph} data-calm-motion data-calm-row>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section border-y border-ink/12">
        <div className="editorial-container calm-authority-copy-grid">
          <p className="eyebrow">Who it&apos;s for</p>
          <ul className="calm-authority-list">
            {calmAuthority.whoItsFor.map((item) => (
              <li key={item} data-calm-motion data-calm-row>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="calm-authority-proof-section section-pad">
        <div className="editorial-container">
          <div className="calm-authority-section-header">
            <p className="eyebrow">Proof</p>
            <h2 className="display-md" data-calm-motion data-calm-row>
              Growth signals from real adviser use.
            </h2>
          </div>
          <div className="calm-authority-proof-grid">
            {calmAuthority.proofPoints.map((point) => (
              <article key={point.metric} className="calm-authority-proof-card" data-calm-motion data-calm-proof>
                <h3>{point.metric}</h3>
                {point.body ? <p>{point.body}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section bg-charcoal text-paper" data-calm-dark-section>
        <div className="editorial-container calm-authority-copy-grid">
          <p className="eyebrow text-paper/58">Compliance and editorial control</p>
          <div className="calm-authority-copy text-paper/76">
            <p data-calm-motion data-calm-dark>{calmAuthority.compliance}</p>
          </div>
        </div>
      </section>

      <section className="calm-authority-section border-b border-ink/12">
        <div className="editorial-container calm-authority-featured-block">
          <p className="eyebrow">Featured in</p>
          <div className="calm-authority-logo-row calm-authority-logo-row-large">
            {calmAuthority.featuredIn.map((publication) => (
              <span key={publication} className="calm-authority-wordmark">
                {publication}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-profile-grid">
          <article className="calm-authority-profile-card" data-calm-motion data-calm-card>
            <p className="eyebrow">Founding adviser</p>
            <h2>{calmAuthority.foundingAdviser.name}</h2>
            <p className="calm-authority-profile-role">{calmAuthority.foundingAdviser.role}</p>
            <p>{calmAuthority.foundingAdviser.body}</p>
          </article>

          <article className="calm-authority-profile-card" data-calm-motion data-calm-card>
            <p className="eyebrow">Built by</p>
            <h2>{calmAuthority.builtBy.name}</h2>
            <p className="calm-authority-profile-role">{calmAuthority.builtBy.role}</p>
            {calmAuthority.builtBy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
