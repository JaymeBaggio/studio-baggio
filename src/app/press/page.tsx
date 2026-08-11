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
const coverage = [pressPage.lead, ...pressPage.earlier];

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
        url: item.href,
        mainEntityOfPage: item.href,
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
      <div className="home-4b studio-page products-page press-page">
        <section className="products-hero" data-header-theme="light">
          <div className="editorial-container products-hero-shell">
            <div className="products-hero-main">
              <div aria-hidden="true" />
              <h1 className="products-hero-title" data-reveal>
                {pressPage.title}
                <span className="products-blue-dot" aria-hidden="true">.</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-6 md:pb-24 md:pt-10">
          <div className="editorial-container">
            <a
              href={pressPage.lead.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group block border-b border-ink/15 pb-8 transition-colors duration-200 hover:border-ink md:pb-12"
              aria-label={`${pressPage.lead.title} - read in ${pressPage.lead.publication}`}
              data-reveal
            >
              <article className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
                <div className="flex flex-col items-start justify-between gap-10">
                  <Image
                    src={pressPage.lead.logo.src}
                    alt={pressPage.lead.publication}
                    width={pressPage.lead.logo.width}
                    height={pressPage.lead.logo.height}
                    sizes="(max-width: 767px) 240px, 300px"
                    className="h-auto w-[240px] md:w-[300px]"
                    priority
                  />
                  <p className="text-xs uppercase leading-relaxed tracking-[0.12em] text-ink/50">
                    {pressPage.lead.series} · {pressPage.lead.date}
                    <br />
                    {pressPage.lead.author}
                  </p>
                </div>

                <div>
                  <h2 className="max-w-4xl text-3xl leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl">
                    {pressPage.lead.title}
                  </h2>
                  <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg">
                    {pressPage.lead.description}
                  </p>
                  <blockquote className="mt-10 border-l-2 border-[color:var(--sb-accent-blue)] pl-5 text-xl leading-snug md:text-2xl">
                    “{pressPage.lead.quote}”
                  </blockquote>
                  <span className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-[0.08em] text-[color:var(--sb-accent-blue)]">
                    Read in {pressPage.lead.publication}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </a>
            <div className="mt-5 flex justify-end" data-reveal>
              <Link
                href={pressPage.lead.researchHref}
                className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm uppercase tracking-[0.08em] text-[color:var(--sb-accent-blue)]"
              >
                Read the Studio Baggio research behind this coverage
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-16 md:py-24">
          <div className="editorial-container">
            <p className="eyebrow" data-reveal data-motion="label">
              {pressPage.earlierEyebrow}
            </p>
            <h2 className="mt-5 text-3xl tracking-[-0.03em] md:text-5xl" data-reveal>
              {pressPage.earlierTitle}
            </h2>
            <div className="mt-12 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-3" data-reveal>
              {pressPage.earlier.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group flex min-h-[330px] flex-col bg-paper p-7 transition-colors duration-200 hover:bg-ink/[0.025] md:p-9"
                  aria-label={`${item.title} - read in ${item.publication}`}
                >
                  <article className="flex h-full flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-4 text-xs uppercase tracking-[0.1em] text-ink/50">
                      <p>{item.publication}</p>
                      <p>{item.date}</p>
                    </div>
                    <h3 className="mt-10 max-w-xl text-2xl leading-tight tracking-[-0.025em] md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink/60 md:text-base">
                      {item.description}
                    </p>
                    <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-10 text-sm uppercase tracking-[0.08em] text-[color:var(--sb-accent-blue)]">
                      Read coverage
                      <ArrowUpRight className="mb-0.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 py-16 md:py-24">
          <div className="editorial-container grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
            <p className="eyebrow" data-reveal data-motion="label">
              {pressPage.media.eyebrow}
            </p>
            <div data-reveal>
              <h2 className="max-w-3xl text-3xl tracking-[-0.03em] md:text-5xl">
                {pressPage.media.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65 md:text-lg">
                {pressPage.media.body}
              </p>
              <a
                href={`mailto:${pressPage.media.email}`}
                className="focus-ring mt-8 inline-flex min-h-11 items-center border border-ink px-5 text-sm uppercase tracking-[0.08em] transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {pressPage.media.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
