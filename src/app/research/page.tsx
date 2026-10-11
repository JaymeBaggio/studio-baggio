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
import { aiSearchFeaturedPress, researchWhyItMatters } from "@/content/site";
import { ClientStatList } from "@/components/client-stat-list";
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

          <section className="mt-14 border-t border-ink/10 pt-10" aria-labelledby="research-why-title">
            <p className="eyebrow" id="research-why-title">
              {researchWhyItMatters.eyebrow}
            </p>
            <div className="mt-6 grid gap-10 lg:grid-cols-3">
              {researchWhyItMatters.groups.map((group) => (
                <div key={group.title}>
                  <h2 className="text-xl leading-snug md:text-2xl">{group.title}</h2>
                  <ClientStatList ids={group.stats} columns={1} />
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl">{researchWhyItMatters.commission.title}</h2>
                <p className="mt-1 text-base leading-relaxed text-ink/70">
                  {researchWhyItMatters.commission.body}
                </p>
              </div>
              <ButtonLink href={researchWhyItMatters.commission.cta.href}>
                {researchWhyItMatters.commission.cta.label}
              </ButtonLink>
            </div>
          </section>

          <div className="research-index-editions" aria-labelledby="research-editions-title">
            <p className="eyebrow" id="research-editions-title">Latest editions</p>
            <ol className="research-edition-list">
              <li className="research-edition-card">
                <div>
                  <h3>
                    <Link href="/research/uk-sports-law-2026">UK Sports Law in AI Search 2026</Link>
                  </h3>
                  <p>
                    Across 810 answers, the study tracked how ChatGPT, Gemini and Perplexity
                    recommended firms and individual lawyers across nine areas of sports law.
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Research date</dt>
                    <dd>{formatDate("2026-08-16")}</dd>
                  </div>
                </dl>
                <ResearchActionLink href="/research/uk-sports-law-2026">
                  View results
                  <ArrowRight aria-hidden="true" />
                </ResearchActionLink>
              </li>
              <li className="research-edition-card">
                <div>
                  <h3>
                    <Link href="/research/uk-law-2026">UK Law Firms in AI Search 2026</Link>
                  </h3>
                  <p>
                    The first edition of the Studio Baggio UK Law AI Search Benchmark: 90 high intent
                    buyer questions and 1,485 AI answers mapping how ChatGPT, Gemini and Perplexity
                    recommend firms across 15 areas of UK law, searchable by firm and practice area.
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Research date</dt>
                    <dd>{formatDate("2026-08-15")}</dd>
                  </div>
                </dl>
                <ResearchActionLink href="/research/uk-law-2026">
                  View results
                  <ArrowRight aria-hidden="true" />
                </ResearchActionLink>
              </li>
            {researchEditions.map((edition) => (
              <li key={edition.slug} className="research-edition-card">
                <div>
                  <h3>
                    <Link href={getResearchEditionPath(edition)}>
                      {edition.listingTitle ?? edition.title}
                    </Link>
                  </h3>
                  <p>{edition.summary}</p>
                </div>
                <dl>
                  <div>
                    <dt>Research date</dt>
                    <dd>{formatDate(edition.preparedForReview)}</dd>
                  </div>
                </dl>
                <ResearchActionLink href={getResearchEditionPath(edition)}>
                  View results
                  <ArrowRight aria-hidden="true" />
                </ResearchActionLink>
              </li>
            ))}
            </ol>
          </div>
        </div>
      </header>
    </div>
  );
}
