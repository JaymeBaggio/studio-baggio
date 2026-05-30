import type { Metadata } from "next";
import { PageReveals } from "@/components/page-reveals";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

type AboutSection = (typeof about.sections)[number];

function getLead(section: AboutSection) {
  return "lead" in section ? section.lead : null;
}

function getKicker(section: AboutSection) {
  return "kicker" in section && typeof section.kicker === "string" ? section.kicker : null;
}

function getRoutes(section: AboutSection) {
  return "routes" in section ? section.routes : null;
}

function getCtaLabel(section: AboutSection) {
  return "ctaLabel" in section ? section.ctaLabel : null;
}

export default function AboutPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page about-page">
        <section className="about-hero">
          <div className="editorial-container about-hero-frame">
            <div className="about-hero-intro">
              <p className="eyebrow" data-reveal data-motion="label">
                {about.eyebrow}
              </p>
              <p className="about-hero-statement" data-reveal>
                Practical systems built around
                <br />
                how your business wins in market.
              </p>
            </div>

            <div className="about-hero-wordmark">
              <h1 data-reveal>
                Studio
                <br />
                Baggio<span>.</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="about-content">
          <div className="editorial-container about-content-frame">
            {about.sections.map((section) => {
              const lead = getLead(section);
              const kicker = getKicker(section);
              const routes = getRoutes(section);
              const ctaLabel = getCtaLabel(section);

              return (
                <article key={section.label} className="about-section" data-reveal>
                  <div className="about-section-label">
                    <span>{section.number} —</span>
                    <h2>{section.label}</h2>
                  </div>

                  <div className="about-copy">
                    {lead ? <p className="about-lead">{lead}</p> : null}

                    {section.body.length > 0 ? (
                      <div className="about-body">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}

                    {kicker ? <p className="about-subsection-label">{kicker}</p> : null}

                    {routes ? (
                      <div className="about-routes">
                        {routes.map((route) => (
                          <div key={route.title} className="about-route">
                            <h3>{route.title}</h3>
                            <p>{route.body}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {ctaLabel ? (
                      <div className="about-action">
                        <ButtonLink href={primaryCta.href}>{ctaLabel}</ButtonLink>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-closing">
          <div className="editorial-container about-closing-frame">
            <blockquote data-reveal>{about.closingQuote}</blockquote>
          </div>
        </section>
      </div>
    </>
  );
}
