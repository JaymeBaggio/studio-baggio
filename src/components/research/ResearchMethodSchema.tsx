import type { ResearchEditionDefinition } from "@/content/research";
import { siteUrl } from "@/lib/utils";

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ResearchMethodSchema({ edition }: { edition: ResearchEditionDefinition }) {
  const editionUrl = `${siteUrl}/research/${edition.slug}`;
  const methodUrl = `${editionUrl}/method`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Research", item: `${siteUrl}/research` },
      { "@type": "ListItem", position: 3, name: edition.title, item: editionUrl },
      { "@type": "ListItem", position: 4, name: "Method", item: methodUrl }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
    />
  );
}
