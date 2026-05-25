import type { Metadata } from "next";
import Image from "next/image";
import { PageReveals } from "@/components/page-reveals";
import { calmAuthority, metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.calmAuthority, path: "/calm-authority" });

const featuredLogos = [
  {
    name: "Financial Times",
    src: "/assets/logos/financial-times.png",
    width: 4800,
    height: 1384,
    className: "calm-authority-logo-ft"
  },
  {
    name: "Professional Adviser",
    src: "/assets/logos/professional-adviser.svg",
    width: 2167,
    height: 180,
    className: "calm-authority-logo-pa"
  },
  {
    name: "Money Marketing",
    src: "/assets/logos/money-marketing.png",
    width: 440,
    height: 132,
    className: "calm-authority-logo-mm"
  }
] as const;

export default function CalmAuthorityPage() {
  return (
    <div className="calm-authority-page">
      <PageReveals />
      <section className="calm-authority-hero">
        <div className="editorial-container calm-authority-container">
          <div className="calm-authority-hero-meta">
            <div data-hero-meta>
              <p className="eyebrow">{calmAuthority.eyebrow}</p>
              <p className="calm-authority-built-line">{calmAuthority.builtLine}</p>
            </div>
            <div className="calm-authority-featured" data-hero-meta>
              <span>Featured in:</span>
              <div className="calm-authority-logo-row" aria-label={`Featured in ${calmAuthority.featuredIn.join(", ")}`}>
                {featuredLogos.map((logo) => (
                  <span key={logo.name} className="calm-authority-logo-card">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      className={logo.className}
                      unoptimized
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h1 className="calm-authority-title" data-hero-line>
            {calmAuthority.title}
            <span>{calmAuthority.tagline}</span>
          </h1>

          <a
            href={calmAuthority.liveHref}
            target="_blank"
            rel="noreferrer"
            className="calm-authority-shot-wrap focus-ring"
            aria-label="Open Calm Authority website"
          >
            <div className="calm-authority-shot">
              <Image
                src="/assets/products/calm-authority-og-rectangle.png"
                alt="Calm Authority brand graphic: Your own expertise at scale."
                width={1659}
                height={948}
                className="calm-authority-og-image calm-authority-og-desktop"
                priority
                unoptimized
              />
              <Image
                src="/assets/products/calm-authority-og-square.png"
                alt="Calm Authority brand graphic: Your own expertise at scale."
                width={1254}
                height={1254}
                className="calm-authority-og-image calm-authority-og-mobile"
                unoptimized
              />
              <div className="calm-authority-shot-caption">
                <span>Live site</span>
                <span>calmauthority.ai</span>
              </div>
            </div>
          </a>

          <div className="calm-authority-intro-row" data-hero-promise>
            <p className="calm-authority-hero-intro">{calmAuthority.productIntro}</p>
          </div>
        </div>
      </section>

      <section className="calm-authority-lede-section">
        <div className="editorial-container calm-authority-container">
          <div className="calm-authority-section-row calm-authority-section-row-plain">
            <div aria-hidden="true" />
            <div className="calm-authority-lede" data-reveal>
              {calmAuthority.commercialThesis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">The problem</h2>
          <div className="calm-authority-copy" data-reveal>
            {calmAuthority.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">Why now</h2>
          <div className="calm-authority-copy" data-reveal>
            <p>{calmAuthority.whyNow}</p>
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">How it works</h2>
          <div className="calm-authority-copy" data-reveal>
            {calmAuthority.howItWorks.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">Who it&apos;s for</h2>
          <ul className="calm-authority-list" data-reveal>
            {calmAuthority.whoItsFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">Proof</h2>
          <div className="calm-authority-proof-list" data-reveal>
            {calmAuthority.proofPoints.map((point) => (
              <article key={point.metric} className="calm-authority-proof-row">
                <h3>{point.metric}</h3>
                {point.body ? <p>{point.body}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">Compliance and editorial control</h2>
          <div className="calm-authority-copy" data-reveal>
            <p>{calmAuthority.compliance}</p>
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-section-row">
          <h2 className="eyebrow">Featured in</h2>
          <div className="calm-authority-logo-row calm-authority-logo-row-large" data-reveal>
            {featuredLogos.map((logo) => (
              <span key={logo.name} className="calm-authority-logo-card">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={logo.className}
                  unoptimized
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="calm-authority-section">
        <div className="editorial-container calm-authority-container calm-authority-people-list">
          <article className="calm-authority-section-row calm-authority-person-row" data-reveal>
            <h2 className="eyebrow">Founding adviser</h2>
            <div className="calm-authority-person-copy">
              <h3>{calmAuthority.foundingAdviser.name}</h3>
              <p className="calm-authority-profile-role">{calmAuthority.foundingAdviser.role}</p>
              <p>{calmAuthority.foundingAdviser.body}</p>
            </div>
          </article>

          <article className="calm-authority-section-row calm-authority-person-row" data-reveal>
            <h2 className="eyebrow">Built by</h2>
            <div className="calm-authority-person-copy">
              <h3>{calmAuthority.builtBy.name}</h3>
              <p className="calm-authority-profile-role">{calmAuthority.builtBy.role}</p>
              {calmAuthority.builtBy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
