import type { Metadata } from "next";
import Image from "next/image";
import { about, metadata as siteMetadata, pressPage, primaryCta } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.about, path: "/about" });

const ideasFestSpeakerUrl = "https://ideasfest.uk/speaking/jayme-45db6d";
const ideasFestSessionTitle = "Building an AI-literate business in 90 days";

const aboutFeaturedPress = [
  {
    key: "ft-adviser",
    name: "FT Adviser",
    href: pressPage.features.find((feature) => feature.publication === "FT Adviser")!.href,
    src: "/assets/logos/ft-adviser.png",
    width: 2222,
    height: 580
  },
  {
    key: "money-marketing",
    name: "Money Marketing",
    href: pressPage.features.find((feature) => feature.publication === "Money Marketing")!.href,
    src: "/assets/logos/money-marketing.png",
    width: 440,
    height: 132
  },
  {
    key: "professional-adviser",
    name: "Professional Adviser",
    href: pressPage.features.find((feature) => feature.publication === "Professional Adviser")!.href,
    src: "/assets/logos/professional-adviser-print.png",
    width: 2167,
    height: 180
  }
] as const;

const aboutLinks: Record<string, string> = {
  "Calm Authority": "https://www.calmauthority.ai/",
  Last30Days: "https://last30days.app",
  "AI Operating Systems": "/services#ai-operating-system-audit",
  "Growth Infrastructure & Visibility": "/services#growth-infrastructure-and-visibility-audit",
  "SEO & AI Search": "/services#seo-and-ai-search-opportunity-audit",
  "Bespoke Software & Systems": "/services#bespoke-ai-software-and-systems",
  "Ideas Fest 2026": ideasFestSpeakerUrl
};
const aboutRichTextPattern =
  /(Calm Authority|Last30Days|Growth Infrastructure & Visibility|AI Operating Systems|SEO & AI Search|Bespoke Software & Systems|Ideas Fest 2026|Building an AI-literate business in 90 days)/g;

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
      jobTitle: "Founder & CEO",
      url: "https://www.studiobaggio.ai/about",
      worksFor: {
        "@id": "https://www.studiobaggio.ai/#organization"
      },
      knowsAbout: [
        "Applied AI strategy",
        "AI operating systems",
        "Commercial AI implementation",
        "AI search and SEO strategy"
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
          "Jayme speaks and is available for comment on Commercial AI strategy, SEO & AI search, AI in the workplace, building AI operating systems within businesses, AI in media & content, and the broader AI economy. She is a confirmed panellist at Ideas Fest 2026 for Building an AI-literate business in 90 days, taking place on 9 September at Champneys Tring.",
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

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {/* Entrance runs as pure CSS on the compositor thread: it starts at
          first paint (before hydration) and main-thread work cannot make it
          stutter — same pattern as the services page. */}
      <style
        id="about-entrance"
        dangerouslySetInnerHTML={{
          __html: [
            "@keyframes abIn{from{opacity:0;transform:translate3d(0,16px,0);filter:blur(3px)}to{opacity:1;transform:translate3d(0,0,0);filter:blur(0)}}",
            "[data-ab-enter]{animation:abIn 0.8s cubic-bezier(0.23,1,0.32,1) both}",
            '[data-ab-enter="e1"]{animation-delay:0s}',
            '[data-ab-enter="e2"]{animation-delay:0.08s}',
            '[data-ab-enter="e3"]{animation-delay:0.18s}',
            '[data-ab-enter="e4"]{animation-delay:0.26s}',
            '[data-ab-enter="e5"]{animation-delay:0.34s}',
            '[data-ab-enter="e6"]{animation-delay:0.42s}',
            '[data-ab-enter="e7"]{animation-delay:0.3s}',
            '[data-ab-enter="e8"]{animation-delay:0.38s}',
            '[data-ab-enter="e9"]{animation-delay:0.46s}',
            '[data-ab-enter="e10"]{animation-delay:0.54s}',
            '[data-ab-enter="e11"]{animation-delay:0.62s}',
            '[data-ab-enter="e12"]{animation-delay:0.72s}',
            "@media (prefers-reduced-motion: reduce){[data-ab-enter]{animation:abIn 0.3s ease both;animation-delay:0s!important}}"
          ].join("")
        }}
      />
      <div className="home-4b ab-page">
        <section className="ab-frame">
          <div className="editorial-container ab-container">
            <div className="ab-grid">
              <div className="ab-head">
                <p className="eyebrow ab-about-label" data-ab-enter="e1">
                  {about.eyebrow}
                </p>
                <h1 data-ab-enter="e2">
                  {about.title}
                  <span className="ab-dot" aria-hidden="true" />
                </h1>
              </div>
              <div className="ab-col-left">
                <p className="ab-bio-lead" data-ab-enter="e3">
                  {about.bio.lead}
                </p>
                <div className="ab-bio-rest" data-ab-enter="e4">
                  {about.bio.body.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </div>
                <div className="ab-press-panel" data-ab-enter="e5">
                  <span className="ab-borderline" aria-hidden="true" />
                  <p className="eyebrow ab-panel-label">{about.press.title}</p>
                  {about.press.body.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </div>
                <div className="ab-press-line" data-ab-enter="e6">
                  <span className="ab-press-line-name">{about.signoffName}</span>
                  <br />
                  {about.signoffRole}
                </div>
                <div className="ab-press-row" data-ab-enter="e12" aria-label="Featured press">
                  <span className="eyebrow">{about.featuredInLabel}</span>
                  {aboutFeaturedPress.map((feature) => (
                    <a
                      key={feature.key}
                      href={feature.href}
                      className="ab-press-logo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View Studio Baggio at ${feature.name}`}
                    >
                      <Image
                        src={feature.src}
                        alt={feature.name}
                        width={feature.width}
                        height={feature.height}
                        sizes="180px"
                      />
                    </a>
                  ))}
                  <a
                    href={ideasFestSpeakerUrl}
                    className="ab-idf-chip"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Studio Baggio at Ideas Fest"
                  >
                    <Image
                      src="/assets/logos/ideas-fest-logo-white.png"
                      alt="Ideas Fest"
                      width={720}
                      height={408}
                      sizes="80px"
                    />
                  </a>
                </div>
              </div>

              <div className="ab-col-right">
                <p className="eyebrow ab-wwd-label" data-ab-enter="e7">
                  {about.whatWeDo.label}
                </p>
                <p className="ab-wwd-lede" data-ab-enter="e8">
                  {about.whatWeDo.lede}
                </p>
                <p className="ab-wwd-body" data-ab-enter="e8">
                  {about.whatWeDo.body}
                </p>
                <div className="ab-svc-rows" data-ab-enter="e9">
                  {about.whatWeDo.services.map((service) => (
                    <a key={service} className="ab-svc-row" href={aboutLinks[service]}>
                      <span className="ab-svc-title">{service}</span>
                    </a>
                  ))}
                </div>
                <div className="ab-wwd-body" data-ab-enter="e10">
                  {about.whatWeDo.bodyAfter.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="ab-engage-line" data-ab-enter="e11">
                  {renderLinkedText(about.whatWeDo.engageLine)}
                </p>
                <a className="ab-cta" href={primaryCta.href} data-ab-enter="e11">
                  {about.whatWeDo.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
