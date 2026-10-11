import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchActionLink } from "@/components/research/ResearchActionLink.client";
import styles from "@/components/research/research-index.module.css";
import {
  getResearchEditionPath,
  researchEditions,
  researchFranchise
} from "@/content/research";
import { pageMetadata } from "@/lib/metadata";
import { aiSearchFeaturedPress, clientStats, researchCommission, researchWhyNow } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { LastWordMark } from "@/components/last-word-mark";

const hasPublishedEdition = researchEditions.some(
  (edition) => edition.publicationStatus === "published" || edition.publicationStatus === "corrected"
);

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Research | Studio Baggio",
    description: researchFranchise.description,
    path: "/research"
  }),
  robots: hasPublishedEdition
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true }
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

export default function ResearchIndexPage() {
  const editions = [
    {
      href: "/research/uk-sports-law-2026",
      title: "UK Sports Law in AI Search 2026",
      summary:
        "Across 810 answers, the study tracked how ChatGPT, Gemini and Perplexity recommended firms and individual lawyers across nine areas of sports law.",
      date: "2026-08-16"
    },
    {
      href: "/research/uk-law-2026",
      title: "UK Law Firms in AI Search 2026",
      summary:
        "The first edition of the Studio Baggio UK Law AI Search Benchmark: 90 high intent buyer questions and 1,485 AI answers mapping how ChatGPT, Gemini and Perplexity recommend firms across 15 areas of UK law, searchable by firm and practice area.",
      date: "2026-08-15"
    },
    ...researchEditions.map((edition) => ({
      href: getResearchEditionPath(edition),
      title: edition.listingTitle ?? edition.title,
      summary: edition.summary,
      date: edition.preparedForReview
    }))
  ];

  return (
    <div className={`${styles.researchIndex} home-4b research-page research-index`} data-research-page>
      <header className="research-index-masthead">
        <div className="editorial-container research-index-masthead__shell">
          <p className="eyebrow">Studio Baggio research</p>
          <div className="research-index-masthead__frame">
            <h1>
              <LastWordMark text={researchFranchise.name} />
            </h1>
          </div>

          <div className={styles.featuredPress} aria-label="Research featured in">
            <p>{aiSearchFeaturedPress.label}</p>
            <div className={styles.featuredLogos}>
              {aiSearchFeaturedPress.logos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={16}
                />
              ))}
            </div>
          </div>

          <div className={styles.editions} aria-labelledby="research-editions-title">
            <p className="eyebrow" id="research-editions-title">Latest editions</p>
            <ul className={styles.editionGrid}>
              {editions.map((edition) => (
                <li key={edition.href} className={styles.editionCard}>
                  <div className={styles.editionBar} aria-hidden="true" />
                  <div className={styles.editionBody}>
                    <h2 className={styles.editionTitle}>
                      <Link href={edition.href}>{edition.title}</Link>
                    </h2>
                    <p className={styles.editionSummary}>{edition.summary}</p>
                    <p className={styles.editionDate}>Research date {formatDate(edition.date)}</p>
                    <ResearchActionLink href={edition.href} className={styles.editionLink}>
                      View results
                      <ArrowRight aria-hidden="true" />
                    </ResearchActionLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <section className={styles.whyNow} aria-labelledby="research-why-now">
            <div className={styles.whyHead}>
              <h2 id="research-why-now" className={styles.whyLabel}>
                {researchWhyNow.label}
              </h2>
              <p className={styles.whyStatement}>{researchWhyNow.statement}</p>
            </div>
            <ul className={styles.whyGrid}>
              {researchWhyNow.stats.map((id) => {
                const stat = clientStats[id];
                return (
                  <li key={id}>
                    <p className={styles.whyText}>
                      <strong>{stat.figure}</strong> {stat.text}
                    </p>
                    <p className={styles.whySource}>{stat.source}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className={styles.commission}>
            <p>
              <strong>{researchCommission.title}.</strong> {researchCommission.body}
            </p>
            <ButtonLink href={researchCommission.cta.href}>{researchCommission.cta.label}</ButtonLink>
          </div>
        </div>
      </header>
    </div>
  );
}
