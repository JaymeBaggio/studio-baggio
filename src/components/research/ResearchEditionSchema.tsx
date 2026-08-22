import type { ResearchEditionDefinition } from "@/content/research";
import { defaultOpenGraphImage } from "@/lib/metadata";
import { researchDataLicense } from "@/lib/research-schema";
import { siteUrl } from "@/lib/utils";

type ResearchEditionSchemaProps = {
  edition: ResearchEditionDefinition;
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ResearchEditionSchema({ edition }: ResearchEditionSchemaProps) {
  const editionUrl = `${siteUrl}/research/${edition.slug}`;
  const datasetId = `${editionUrl}#dataset`;
  const reportId = `${editionUrl}#report`;
  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    "@id": reportId,
    name: edition.metaTitle,
    headline: edition.metaTitle,
    alternativeHeadline: "How AI chooses UK financial advisers",
    description: edition.metaDescription,
    abstract: edition.summary,
    url: editionUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": editionUrl
    },
    image: `${siteUrl}${defaultOpenGraphImage.url}`,
    datePublished: edition.publishedAt ?? edition.preparedForReview,
    dateModified: edition.pageUpdatedAt,
    temporalCoverage: "2026-07-30/2026-07-31",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "Studio Baggio Ltd",
      url: siteUrl
    },
    publisher: {
      "@type": "Organization",
      name: "Studio Baggio Ltd",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/studio-baggio-logo-square.png`
      }
    },
    about: [
      { "@id": datasetId },
      { "@type": "Thing", name: "AI search visibility" },
      { "@type": "Thing", name: "UK financial advice" },
      { "@type": "Thing", name: "AI-generated financial adviser recommendations" }
    ],
    keywords: [
      "AI search",
      "UK financial advice",
      "financial adviser visibility",
      "AI recommendations"
    ]
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": datasetId,
    name: "Studio Baggio UK Financial Advice Firms in AI Search 2026",
    description: edition.metaDescription,
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
    dateModified: edition.pageUpdatedAt,
    temporalCoverage: "2026-07-30/2026-07-31",
    spatialCoverage: edition.geography,
    keywords: [
      "AI search",
      "UK financial advice",
      "financial adviser visibility",
      "AI recommendations"
    ],
    measurementTechnique:
      "Fifty buyer questions were run three times on OpenAI, Gemini and Perplexity with grounded web search enabled, producing 450 answers. Firms named or cited in the answers were evaluated against a frozen 150-firm UK financial-advice market panel.",
    variableMeasured: [
      "financial adviser or firm named per answer",
      "firm website cited per answer",
      "buyer-question breadth",
      "AI-platform breadth"
    ],
    distribution: [
      {
        "@type": "DataDownload",
        name: "Observation-level data (CSV)",
        encodingFormat: "text/csv",
        contentUrl: `${siteUrl}${edition.publicDownloadBasePath}/observations.csv`
      },
      {
        "@type": "DataDownload",
        name: "Firm summary (CSV)",
        encodingFormat: "text/csv",
        contentUrl: `${siteUrl}${edition.publicDownloadBasePath}/firm_summary.csv`
      }
    ],
    isAccessibleForFree: true,
    license: researchDataLicense(),
    subjectOf: { "@id": reportId }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Research",
        item: `${siteUrl}/research`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: edition.title,
        item: editionUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(reportSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
      />
    </>
  );
}
