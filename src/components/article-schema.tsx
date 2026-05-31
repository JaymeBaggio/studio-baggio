import type { InsightArticle } from "@/content/insights";
import { defaultOpenGraphImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

// Absolute URLs reused across the article schema. metadataBase resolves relative
// OG paths in the page <head>, but JSON-LD must carry fully-qualified URLs.
const absoluteImageUrl = `${siteUrl}${defaultOpenGraphImage.url}`;

// Square Organization logo for publisher markup (separate from the 16:9 OG share image above).
const absoluteLogoUrl = `${siteUrl}/assets/studio-baggio-logo-square.png`;

type ArticleSchemaProps = {
  article: InsightArticle;
};

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const articleUrl = `${siteUrl}/insights/${article.slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.updated,
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
        url: absoluteLogoUrl
      }
    },
    image: absoluteImageUrl,
    mainEntityOfPage: articleUrl,
    articleSection: article.category,
    keywords: article.tags.join(", ")
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
        name: "Insights",
        item: `${siteUrl}/insights`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
