import type { ResearchEditionDefinition } from "@/content/research";
import type { PublicResearchDataset, ResearchEditionViewModel } from "@/lib/research-data";
import { siteUrl } from "@/lib/utils";

type ResearchDatasetSchemaProps = {
  edition: ResearchEditionDefinition;
  dataset: PublicResearchDataset;
  view: ResearchEditionViewModel;
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ResearchDatasetSchema({ edition, dataset, view }: ResearchDatasetSchemaProps) {
  const editionUrl = `${siteUrl}/research/${edition.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${edition.franchise} — ${edition.title}`,
    description: edition.summary,
    url: editionUrl,
    creator: {
      "@type": "Organization",
      name: "Studio Baggio Ltd",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Studio Baggio Ltd",
      url: siteUrl
    },
    dateCreated: edition.preparedForReview,
    dateModified: dataset.manifest.finished_at,
    temporalCoverage: `${dataset.manifest.started_at}/${dataset.manifest.finished_at}`,
    spatialCoverage: edition.geography,
    measurementTechnique:
      "Three independent repetitions of 25 preregistered buyer questions across three grounded AI search engines, evaluated against one frozen cohort registry.",
    variableMeasured: [
      "valid_grounded_response",
      "named_in_answer",
      "cited_domain",
      "source_only",
      "query_breadth",
      "engine_breadth",
      "stability"
    ],
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: edition.franchise,
      url: `${siteUrl}/research`
    },
    distribution: view.downloads.map((download) => ({
      "@type": "DataDownload",
      name: download.label,
      encodingFormat: download.format === "CSV" ? "text/csv" : "application/json",
      contentUrl: `${siteUrl}${download.href}`
    })),
    version: dataset.manifest.method_version,
    isAccessibleForFree: true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(schema) }}
    />
  );
}
