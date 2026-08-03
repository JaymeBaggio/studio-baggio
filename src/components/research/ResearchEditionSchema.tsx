import type { ResearchEditionDefinition } from "@/content/research";
import { defaultOpenGraphImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

type ResearchEditionSchemaProps = {
  edition: ResearchEditionDefinition;
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ResearchEditionSchema({ edition }: ResearchEditionSchemaProps) {
  const editionUrl = `${siteUrl}/research/${edition.slug}`;
  const reportSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    "@id": `${editionUrl}#report`,
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
    datePublished: edition.pageUpdatedAt,
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
        dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
      />
    </>
  );
}
