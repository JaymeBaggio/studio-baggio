import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResearchActionLink } from "@/components/research/ResearchActionLink.client";
import { ResearchAuditCta } from "@/components/research";
import {
  getResearchEditionPath,
  researchEditions,
  researchFranchise
} from "@/content/research";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Research | Studio Baggio",
  description: researchFranchise.description,
  path: "/research"
});

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
    <div className="home-4b research-page research-index" data-research-page>
      <header className="research-index-masthead">
        <div className="editorial-container">
          <p className="eyebrow">Studio Baggio research</p>
          <h1>{researchFranchise.name}</h1>
          <p>{researchFranchise.description}</p>
          <p>{researchFranchise.methodologyPrinciple}</p>
        </div>
      </header>

      <section className="research-section" aria-labelledby="research-editions-title">
        <div className="editorial-container">
          <div className="research-section-heading">
            <p className="eyebrow">Dated editions</p>
            <div>
              <h2 id="research-editions-title">Research editions</h2>
              <p>
                Each edition uses a frozen cohort, query corpus and method. Evidence is dated and does
                not update continuously.
              </p>
            </div>
          </div>

          <ol className="research-edition-list">
            {researchEditions.map((edition) => (
              <li key={edition.slug} className="research-edition-card">
                <div>
                  <p className="eyebrow">{edition.statusLabel}</p>
                  <h3>
                    <Link href={getResearchEditionPath(edition)}>{edition.title}</Link>
                  </h3>
                  <p>{edition.summary}</p>
                </div>
                <dl>
                  <div>
                    <dt>Prepared for review</dt>
                    <dd>{formatDate(edition.preparedForReview)}</dd>
                  </div>
                  <div>
                    <dt>Cohort</dt>
                    <dd>{edition.cohort.label}</dd>
                  </div>
                  <div>
                    <dt>Publication mode</dt>
                    <dd>Sector report; no ranks or bands</dd>
                  </div>
                </dl>
                <ResearchActionLink href={getResearchEditionPath(edition)}>
                  View the review edition
                  <ArrowRight aria-hidden="true" />
                </ResearchActionLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ResearchAuditCta
        href="/contact?utm_source=research&utm_medium=benchmark&utm_campaign=research-index&utm_content=audit-cta"
      />
    </div>
  );
}
