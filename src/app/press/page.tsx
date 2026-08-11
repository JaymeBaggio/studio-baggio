import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageReveals } from "@/components/page-reveals";
import { metadata as siteMetadata, pressPage } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.press, path: "/press" });

const pageUrl = `${siteUrl}/press`;
const coverage = [...pressPage.features, ...pressPage.earlier];

const pressSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Press | Studio Baggio",
  description: siteMetadata.press.description,
  url: pageUrl,
  publisher: {
    "@type": "Organization",
    name: "Studio Baggio Ltd",
    url: siteUrl
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: coverage.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: item.title,
        description: item.description,
        datePublished: item.datePublished,
        author: {
          "@type": "Person",
          name: item.author
        },
        publisher: {
          "@type": "Organization",
          name: item.publication
        },
        about: [
          {
            "@type": "Organization",
            name: "Studio Baggio Ltd",
            url: siteUrl
          },
          {
            "@type": "Person",
            name: "Jayme Baggio",
            url: `${siteUrl}/about`
          }
        ],
        url: item.href,
        mainEntityOfPage: item.href,
        ...("pulloutIsQuotation" in item && item.pulloutIsQuotation
          ? {
              hasPart: {
                "@type": "Quotation",
                text: item.pullout,
                creator: {
                  "@type": "Person",
                  name: "Jayme Baggio",
                  url: `${siteUrl}/about`
                }
              }
            }
          : {}),
        ...(item.researchHref
          ? {
              isBasedOn: {
                "@type": "Report",
                name: "UK Financial Advice Firms in AI Search 2026",
                url: `${siteUrl}${item.researchHref}`
              },
              citation: `${siteUrl}${item.researchHref}`
            }
          : {})
      }
    }))
  }
};

export default function PressPage() {
  return (
    <>
      <script
        id="studio-baggio-press-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressSchema) }}
      />
      <PageReveals />
      <div className="home-4b studio-page press-page">
        <section className="press-hero" data-header-theme="light">
          <div className="editorial-container">
            <h1 className="press-hero-title" data-reveal>
              {pressPage.title}<span aria-hidden="true">.</span>
            </h1>
          </div>
        </section>

        <section className="press-features-section">
          <div className="editorial-container">
            <p className="eyebrow press-section-label" data-reveal data-motion="label">
              Featured coverage
            </p>
            <div className="press-feature-list">
              {pressPage.features.map((item, index) => (
                <article className="press-feature-row" data-reveal key={item.href}>
                  <div className="press-feature-meta">
                    <Image
                      src={item.logo.src}
                      alt={item.publication}
                      width={item.logo.width}
                      height={item.logo.height}
                      sizes="(max-width: 767px) 240px, 300px"
                      className={`press-feature-logo${item.publication === "Money Marketing" ? " is-money-marketing" : ""}`}
                      priority={index === 0}
                    />
                    <p>
                      {item.series} · {item.date}
                      <br />
                      {item.author}
                    </p>
                  </div>

                  <div className="press-feature-copy">
                    <h2>{item.title}</h2>
                    <p className="press-feature-description">{item.description}</p>
                    {item.pulloutIsQuotation ? (
                      <blockquote className="press-feature-pullout">“{item.pullout}”</blockquote>
                    ) : (
                      <p className="press-feature-pullout">{item.pullout}</p>
                    )}
                    <div className="press-feature-actions">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring press-primary-link"
                        aria-label={`${item.title} - read in ${item.publication}`}
                      >
                        Read in {item.publication}
                        <ArrowUpRight aria-hidden="true" />
                      </a>
                      {item.researchHref ? (
                        <Link
                          href={item.researchHref}
                          className="focus-ring press-secondary-link"
                        >
                          Read the research
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="press-coverage-section">
          <div className="editorial-container">
            <div className="press-section-header">
              <h2 data-reveal>{pressPage.earlierTitle}</h2>
            </div>
            <div className="press-coverage-grid" data-reveal>
              {pressPage.earlier.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring press-coverage-card"
                  aria-label={`${item.title} - read in ${item.publication}`}
                >
                  <article>
                    <div className="press-coverage-meta">
                      <p>{item.publication}</p>
                      <p>{item.date}</p>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="press-coverage-description">{item.description}</p>
                    <span>
                      Read coverage
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="press-media-section" data-header-theme="dark">
          <div className="editorial-container press-media-grid">
            <p className="eyebrow" data-reveal data-motion="label">
              {pressPage.media.eyebrow}
            </p>
            <div data-reveal>
              <h2>{pressPage.media.title}</h2>
              <p>{pressPage.media.body}</p>
              <a href={`mailto:${pressPage.media.email}`} className="focus-ring press-media-link">
                {pressPage.media.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
