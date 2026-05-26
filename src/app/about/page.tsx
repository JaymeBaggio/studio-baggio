import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page">
        <section className="studio-page-hero">
          <div className="editorial-container studio-page-frame">
            <div>
              <p className="eyebrow" data-reveal data-motion="label">{about.eyebrow}</p>
              <h1 className="studio-page-title" data-split>
                {about.title}
              </h1>
              <p className="studio-page-body" data-reveal>
                {about.intro}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="editorial-container">
            {about.sections.map((section, index) => (
              <article key={section.label} className="studio-page-editorial-row" data-reveal>
                <div>
                  <span className="studio-page-row-number">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="studio-page-row-kicker">{section.label}</h2>
                </div>
                <div className={index === 0 ? "studio-about-founder-grid" : ""}>
                  <div className="studio-page-copy">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {index === 0 ? (
                    <figure className="studio-quote">
                      <blockquote>
                        &ldquo;{about.quote.text}&rdquo;
                      </blockquote>
                      <figcaption>
                        {about.quote.attribution}
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-cta-section studio-page-cta" data-header-theme="dark">
          <div className="editorial-container home-cta-frame">
            <p className="eyebrow home-cta-eyebrow" data-reveal data-motion="label">
              START A CONVERSATION
            </p>
            <div data-cta-button>
              <ButtonLink href={primaryCta.href}>
                {primaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
