import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EngineComparison,
  EvidenceTable,
  MethodVersionStrip,
  QueryCoverageMatrix,
  ResearchAuditCta,
  ResearchDownloads,
  ResearchMasthead,
  ResearchStatRail
} from "@/components/research";
import { ResearchDatasetSchema } from "@/components/research/ResearchDatasetSchema";
import { ResearchEditionSchema } from "@/components/research/ResearchEditionSchema";
import {
  getResearchEditionDefinition,
  getResearchEditionPath,
  getResearchMethodPath,
  researchEditions
} from "@/content/research";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { loadResearchEdition } from "@/lib/research-data";
import { siteUrl } from "@/lib/utils";

type ResearchEditionPageProps = {
  params: Promise<{ edition: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchEditions.map((edition) => ({ edition: edition.slug }));
}

function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

export async function generateMetadata({ params }: ResearchEditionPageProps): Promise<Metadata> {
  const { edition: slug } = await params;
  const edition = getResearchEditionDefinition(slug);
  if (!edition) return {};
  const route = getResearchEditionPath(edition);

  return {
    title: edition.metaTitle,
    description: edition.metaDescription,
    robots:
      edition.publicationStatus === "published" || edition.publicationStatus === "corrected"
        ? { index: true, follow: true }
        : { index: false, follow: false, noarchive: true },
    alternates: { canonical: route },
    openGraph: {
      type: "article",
      siteName: "Studio Baggio",
      url: `${siteUrl}${route}`,
      title: edition.metaTitle,
      description: edition.metaDescription,
      images: [defaultOpenGraphImage]
    },
    twitter: {
      card: "summary_large_image",
      title: edition.metaTitle,
      description: edition.metaDescription,
      images: [defaultTwitterImage]
    }
  };
}

function UnavailableEdition({
  edition,
  message
}: {
  edition: NonNullable<ReturnType<typeof getResearchEditionDefinition>>;
  message: string;
}) {
  return (
    <div className="home-4b research-page" data-research-page>
      <header className="research-method-masthead">
        <div className="editorial-container">
          <p className="eyebrow">{edition.franchise}</p>
          <h1>{edition.title}</h1>
          <p>{edition.statusLabel}</p>
        </div>
      </header>
      <section className="research-unavailable" aria-labelledby="research-unavailable-title">
        <div className="editorial-container">
          <h2 id="research-unavailable-title">Evidence unavailable</h2>
          <p>{message}</p>
          <p>No pilot, diagnostic, composite or raw-response data has been substituted.</p>
          <Link href="/research">Return to research</Link>
        </div>
      </section>
    </div>
  );
}

export default async function ResearchEditionPage({ params }: ResearchEditionPageProps) {
  const { edition: slug } = await params;
  const result = await loadResearchEdition(slug);
  if (!result) notFound();
  if (result.status === "unavailable") {
    return <UnavailableEdition edition={result.edition} message={result.message} />;
  }

  const { edition, dataset, view } = result;
  const methodPath = getResearchMethodPath(edition);
  const engineNames = [...edition.expected.engines];
  const evidenceSummary = `${view.headlineFinding} ${view.validResponseSummary} The table is alphabetical by default and does not assign ranks or bands.`;

  return (
    <div className="home-4b research-page" data-research-page>
      <ResearchDatasetSchema edition={edition} dataset={dataset} view={view} />
      <ResearchEditionSchema edition={edition} dataset={dataset} />

      <ResearchMasthead
        edition={{
          eyebrow: edition.franchise,
          title: edition.title,
          summary: edition.summary,
          publicationDate:
            edition.publicationStatus === "corrected" && edition.correctedAt
              ? formatResearchDate(edition.correctedAt)
              : edition.publishedAt
                ? formatResearchDate(edition.publishedAt)
                : view.preparedForReview,
          dateLabel:
            edition.publicationStatus === "corrected"
              ? "Corrected"
              : edition.publicationStatus === "published"
                ? "Published"
                : edition.publicationStatus === "superseded"
                  ? "Superseded"
                  : "Prepared for review",
          runWindow: view.runWindow,
          methodVersion: dataset.manifest.method_version,
          status:
            edition.publicationStatus === "published"
              ? "current"
              : edition.publicationStatus === "corrected"
                ? "corrected"
                : edition.publicationStatus === "superseded"
                  ? "superseded"
                  : "prepared",
          statusDetail:
            edition.publicationStatus === "superseded" && edition.supersededBy
              ? `Superseded by ${edition.supersededBy}.`
              : edition.publicationStatus === "review"
                ? "Prepared for local review. Legal, compliance and publication approval remain separate gates."
                : undefined
        }}
      />

      <section className="research-finding" aria-labelledby="research-headline-finding">
        <div className="editorial-container">
          <p className="eyebrow">Headline observation</p>
          <h2 id="research-headline-finding">{view.headlineFinding}</h2>
          <p>{view.validResponseSummary}</p>
          <p>Observation is evidence of appearance, not a recommendation or quality judgement.</p>
        </div>
      </section>

      <ResearchStatRail stats={view.stats} />

      <EngineComparison
        engines={view.engines}
        summary="Counts show valid grounded responses that observed at least one firm in the frozen cohort. Invalid responses remain outside the denominator."
      />

      <QueryCoverageMatrix
        queries={view.queries}
        engines={engineNames}
        summary="The 25-question instrument is shown in full. Each engine cell reports grounded validity across three repetitions; instability remains explicit."
      />

      <EvidenceTable
        rows={view.rows}
        engines={engineNames}
        summary={evidenceSummary}
        cohortLabel={edition.cohort.label}
        runWindow={view.runWindow}
        methodVersion={dataset.manifest.method_version}
      />

      <div className="editorial-container research-downloads-frame" id="downloads">
        <ResearchDownloads
          downloads={view.downloads}
          error={
            view.downloads.length
              ? undefined
              : "The reviewed package did not include a verified public download."
          }
        />
      </div>

      <MethodVersionStrip
        items={[
          {
            label: "Full methodology",
            href: methodPath,
            detail: "Cohort, corpus, formulas and limitations"
          },
          {
            label: "Processed evidence",
            href: "#downloads",
            detail: `${view.downloads.length} verified public files`
          },
          {
            label: "Corrections",
            href: `${methodPath}#corrections`,
            detail: edition.corrections.length ? `${edition.corrections.length} recorded` : "No corrections recorded"
          },
          {
            label: "Disclosure",
            href: `${methodPath}#disclosure`,
            detail: "Commercial and independence statement"
          }
        ]}
      />

      <ResearchAuditCta
        href={edition.auditCta.href}
        title={edition.auditCta.title}
        body={edition.auditCta.body}
      />
    </div>
  );
}
