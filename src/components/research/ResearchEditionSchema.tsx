import type { ResearchEditionDefinition } from "@/content/research";
import type { PublicResearchDataset } from "@/lib/research-data";
import { siteUrl } from "@/lib/utils";

type ResearchEditionSchemaProps = {
  edition: ResearchEditionDefinition;
  dataset: PublicResearchDataset;
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ResearchEditionSchema({ edition, dataset }: ResearchEditionSchemaProps) {
  const editionUrl = `${siteUrl}/research/${edition.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${edition.franchise} — ${edition.title}`,
    description: edition.summary,
    dateCreated: edition.preparedForReview,
    dateModified: dataset.manifest.finished_at,
    author: {
      "@type": "Person",
      name: "Jayme Baggio",
      url: `${siteUrl}/about`
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
    mainEntityOfPage: editionUrl,
    isAccessibleForFree: true,
    about: [
      { "@type": "Thing", name: "AI search visibility" },
      { "@type": "Thing", name: "UK financial advice" }
    ]
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
        dangerouslySetInnerHTML={{ __html: safeJson(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
      />
    </>
  );
}
