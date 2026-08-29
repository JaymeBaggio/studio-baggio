import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageReveals } from "@/components/page-reveals";
import { ButtonLink } from "@/components/ui/button";
import { about, metadata as siteMetadata, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

const ideasFestSpeakerUrl = "https://ideasfest.uk/speaking/jayme-45db6d";
const ideasFestSessionTitle = "Building an AI-literate business in 90 days";

const aboutLinks: Record<string, string> = {
  "Calm Authority": "https://www.calmauthority.ai/",
  Last30Days: "https://last30days.app",
  "Last30Days.app": "https://last30days.app",
  "AI Operating Systems": "/services",
  "Growth Infrastructure & Visibility": "/services",
  "Commercial Growth Strategy": "/services",
  "SEO & AI Search": "/services",
  "Bespoke Software & Systems": "/services",
  "Ideas Fest 2026": ideasFestSpeakerUrl
};
const aboutRichTextPattern =
  /(Calm Authority|Last30Days\.app|Last30Days|Growth Infrastructure & Visibility|AI Operating Systems|Commercial Growth Strategy|SEO & AI Search|Bespoke Software & Systems|Ideas Fest 2026|Building an AI-literate business in 90 days)/g;

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.studiobaggio.ai/about#about-page",
  url: "https://www.studiobaggio.ai/about",
  name: siteMetadata.about.title,
  description: siteMetadata.about.description,
  dateModified: "2026-08-29",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://www.studiobaggio.ai/#organization",
    name: "Studio Baggio Ltd",
    url: "https://www.studiobaggio.ai",
    founder: {
      "@type": "Person",
      "@id": "https://www.studiobaggio.ai/about#jayme-baggio",
      name: "Jayme Baggio",
      jobTitle: "Founder and applied AI strategy specialist",
      url: "https://www.studiobaggio.ai/about",
      worksFor: {
        "@id": "https://www.studiobaggio.ai/#organization"
      },
      knowsAbout: [
        "Applied AI strategy",
        "AI operating systems",
        "Commercial AI implementation"
      ],
      performerIn: {
        "@type": "Event",
        "@id": `${ideasFestSpeakerUrl}#building-an-ai-literate-business-in-90-days`,
        name: ideasFestSessionTitle,
        startDate: "2026-09-09T11:00:00+01:00",
        endDate: "2026-09-09T11:45:00+01:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: ideasFestSpeakerUrl,
        description:
          "Jayme speaks on applied AI strategy, operating systems and commercial implementation. She is a confirmed panellist at Ideas Fest 2026 for Building an AI-literate business in 90 days, taking place on 9 September at Champneys Tring.",
        performer: {
          "@type": "Person",
          "@id": "https://www.studiobaggio.ai/about#jayme-baggio",
          name: "Jayme Baggio"
        },
        location: {
          "@type": "Place",
          name: "Champneys Tring"
        },
        organizer: {
          "@type": "Organization",
          name: "Ideas Fest",
          url: "https://ideasfest.uk/"
        }
      }
    }
  }
};

type AboutSection = (typeof about.sections)[number];

function renderLinkedText(text: string) {
  return text.split(aboutRichTextPattern).map((part, index) => {
    if (part === ideasFestSessionTitle) {
      return <em key={`${part}-${index}`}>{part}</em>;
    }

    const href = aboutLinks[part];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
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
                              <p key={paragraph}>{renderLinkedText(paragraph)}</p>
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
