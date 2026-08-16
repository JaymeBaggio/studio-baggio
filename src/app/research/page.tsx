import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchActionLink } from "@/components/research/ResearchActionLink.client";
import {
  getResearchEditionPath,
  researchEditions,
  researchFranchise
} from "@/content/research";
import { pageMetadata } from "@/lib/metadata";

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
  const latestPublishedEdition = researchEditions.find(
    (edition) => edition.publicationStatus === "published" || edition.publicationStatus === "corrected"
  );

  return (
    <div className="home-4b research-page research-index" data-research-page>
      <header className="research-index-masthead">
        <div className="editorial-container research-index-masthead__shell">
          <p className="eyebrow">Studio Baggio research</p>
          <div className="research-index-masthead__frame">
            <h1>
              {researchFranchise.name}
              <span className="research-index-masthead__blue-dot" aria-hidden="true">.</span>
            </h1>
            <div className="research-index-masthead__copy">
              <p className="research-index-masthead__lead">{researchFranchise.description}</p>
              <p className="research-index-masthead__body">{researchFranchise.methodologyPrinciple}</p>
              <Link
                className="research-index-audit-link"
                href={latestPublishedEdition ? getResearchEditionPath(latestPublishedEdition) : "/research"}
              >
                Find out where your firm appears →
              </Link>
            </div>
          </div>

          <div className="research-index-editions" aria-labelledby="research-editions-title">
            <p className="eyebrow" id="research-editions-title">Latest editions</p>
            <ol className="research-edition-list">
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
                  <div>
                    <dt>Cohort</dt>
                    <dd>521 firms tracked, benchmarked against Legal 500 London</dd>
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
                  <div>
                    <dt>Cohort</dt>
                    <dd>{edition.cohort.label}</dd>
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
