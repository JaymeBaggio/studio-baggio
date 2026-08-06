import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageReveals } from "@/components/page-reveals";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

const aboutProductLinks: Record<string, string> = {
  "Calm Authority": "https://www.calmauthority.ai/",
  Last30Days: "https://last30days.app",
  "Last30Days.app": "https://last30days.app",
  "AI Operating System Audit and Implementation": "/services",
  "Commercial Growth Strategy": "/services",
  "SEO and AI Search Opportunity Audit": "/services",
  "Bespoke Software & Systems Build": "/services"
};
const aboutProductLinkPattern =
  /(Calm Authority|Last30Days\.app|Last30Days|AI Operating System Audit and Implementation|AI Operating System Audit|Commercial Growth Strategy|SEO and AI Search Opportunity Audit|Bespoke Software & Systems Build)/g;

type AboutSection = (typeof about.sections)[number];

function renderLinkedText(text: string) {
  return text.split(aboutProductLinkPattern).map((part, index) => {
    const href = aboutProductLinks[part];

    if (!href) {
      return part;
    }

    if (href.startsWith("/")) {
      return (
        <a key={`${part}-${index}`} href={href}>
          {part}
        </a>
      );
    }

    return (
      <a key={`${part}-${index}`} href={href} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    );
  });
}

function getLead(section: AboutSection) {
  return "lead" in section ? section.lead : null;
}

function getKicker(section: AboutSection) {
  return "kicker" in section && typeof section.kicker === "string" ? section.kicker : null;
}

function getRoutes(section: AboutSection) {
  return "routes" in section ? section.routes : null;
}

function getPress(section: AboutSection) {
  return "press" in section ? section.press : null;
}

function getCtaLabel(section: AboutSection) {
  return "ctaLabel" in section ? section.ctaLabel : null;
}

export default function AboutPage() {
  const testimonialBand = (
    <aside className="about-testimonials" aria-label="Client testimonials" data-reveal>
      <p className="about-testimonials-label">Client words</p>
      <div className="about-testimonials-grid">
        {about.testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="about-testimonial">
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <span className="about-testimonial-name">{testimonial.name}</span>
              <span className="about-testimonial-role">{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      <PageReveals />
      <div className="home-4b studio-page about-page">
        <section className="about-hero" data-home-section>
          <div className="editorial-container about-hero-frame">
            <div className="about-hero-copy">
              <p className="eyebrow" data-reveal data-motion="label">
                {about.eyebrow}
              </p>
              <h1 className="about-hero-title" data-reveal>
                {about.title}
                <span aria-hidden="true" />
              </h1>
              <p className="about-hero-statement" data-reveal>
                {about.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="about-content">
          <div className="editorial-container about-content-frame">
            {about.sections.map((section) => {
              const lead = getLead(section);
              const kicker = getKicker(section);
              const routes = getRoutes(section);
              const press = getPress(section);
              const ctaLabel = getCtaLabel(section);

              return (
                <Fragment key={section.label}>
                  {section.number === "03" ? (
                    <aside className="about-signoff" aria-label="Studio Baggio sign-off" data-reveal>
                      <blockquote>{about.closingQuote}</blockquote>
                    </aside>
                  ) : null}

                  <article className="about-section" data-reveal>
                    <div className="about-section-label">
                      <span>{section.number} —</span>
                      <h2>{section.label}</h2>
                    </div>

                    <div className="about-copy">
                      {lead ? <p className="about-lead">{lead}</p> : null}

                      {section.body.length > 0 ? (
                        <div className="about-body">
                          {section.body.map((paragraph, index) => (
                            <p key={`${section.label}-${index}`}>{renderLinkedText(paragraph)}</p>
                          ))}
                        </div>
                      ) : null}

                      {kicker ? <p className="about-subsection-label">{kicker}</p> : null}

                      {routes ? (
                        <div className="about-routes">
                          {routes.map((route) => (
                            <div key={route.title} className="about-route">
                              <h3>{route.title}</h3>
                              <p>{renderLinkedText(route.body)}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {press ? (
                        <div className="about-press">
                          <p className="about-subsection-label">{press.title}</p>
                          <div className="about-press-body">
                            {press.body.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {ctaLabel ? (
                        <div className="about-action">
                          <ButtonLink href={primaryCta.href}>{ctaLabel}</ButtonLink>
                        </div>
                      ) : null}
                    </div>
                  </article>

                  {section.number === "01" ? testimonialBand : null}
                </Fragment>
              );
            })}

            <aside className="about-featured-press" aria-label="Featured press" data-reveal>
              <Link
                href="/press"
                className="about-featured-press-link"
              >
                <span className="about-featured-press-copy">
                  Featured in <strong>Money Marketing</strong>
                </span>
                <span className="about-featured-press-logo">
                  <Image
                    src="/assets/logos/money-marketing.png"
                    alt="Money Marketing"
                    width={440}
                    height={132}
                    sizes="(max-width: 767px) 180px, 220px"
                  />
                </span>
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
