import type { ResearchEditionDefinition } from "@/content/research";
import { shareImageUrls } from "@/lib/metadata";
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
    image: shareImageUrls,
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
      "Fifty buyer questions were run three times on OpenAI, Gemini and Perplexity with grounded web search enabled, producing 450 answers. Firms named or cited in the answers were evaluated against a frozen 150-firm UK financial-advice market panel. The national rank table uses the 180 answers to 20 firm-selection questions across four national advice areas; the five matched local selection questions are reported separately. Overall rank preserves the published national shortlist-share score: each answer divides a total share of one equally among its verified candidates, with zero share when no candidate is returned, averaged equally across repetitions, engines, questions and the four national advice areas. Area rank orders candidates by the number of answers in which they appeared across 45 answers to five questions. Buyer-need rank uses nine answers to one selected question. For equal appearance counts, the order is distinct questions reached descending, published overall score descending, then firm name using the table's case-insensitive numeric English collator. Each candidate is counted once per answer. Ranks are calculated before firm search filters the visible list; candidates absent from the published national overall list have no overall rank.",
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Overall rank",
        description: "Fixed position in the published national shortlist-share score across four advice areas and 180 firm-selection answers; excludes matched local results."
      },
      {
        "@type": "PropertyValue",
        name: "Area rank",
        description: "Fixed position among all candidates appearing in the selected advice area, ordered by answer appearances across 45 answers to five questions, before firm search."
      },
      {
        "@type": "PropertyValue",
        name: "Buyer-need rank",
        description: "Fixed position among all candidates appearing for the selected individual buyer need, ordered by answer appearances across nine answers to one question, before firm search."
      },
      {
        "@type": "PropertyValue",
        name: "AI answers",
        description: "Number of selected firm-selection answers containing the candidate: out of 45 for one advice area or nine for one individual buyer need."
      },
      {
        "@type": "PropertyValue",
        name: "Buyer questions",
        description: "Number of distinct selected firm-selection questions for which the candidate appeared: out of five for one advice area."
      },
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
