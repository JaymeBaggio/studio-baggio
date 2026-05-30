import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InsightsArticleAccordion } from "@/components/insights-article-accordion";
import { PageReveals } from "@/components/page-reveals";
import {
  featuredInsight,
  getInsightPreviewText,
  getInsightPath,
  insightArticles,
  insightCategories
} from "@/content/insights";
import { metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.insights, path: "/insights" });

const articlePreviews = insightArticles.map((article) => ({
  slug: article.slug,
  title: article.title,
  category: article.category,
  categorySlug: article.categorySlug,
  summary: getInsightPreviewText(article, 1),
  preview: getInsightPreviewText(article, 2),
  readTime: article.readTime,
  tags: article.tags,
  searchText: [article.title, article.category, article.source, ...article.tags, article.sourceMarkdown].join(" ")
}));

export default function InsightsPage() {
  return (
    <>
      <PageReveals />
      <div className="home-4b insights-page">
        <section className="insights-hero" data-home-section>
          <div className="editorial-container insights-hero-frame">
            <div className="insights-hero-copy">
              <p className="eyebrow" data-reveal>
                Insights
              </p>
              <h1 className="insights-hero-title" data-reveal>
                Insights<span aria-hidden="true" />
              </h1>
            </div>
          </div>
        </section>

        <section className="insights-featured" data-home-section>
          <div className="editorial-container insights-featured-frame">
            <div className="insights-featured-label" data-reveal>
              <p className="eyebrow">Featured</p>
              <p>
                {featuredInsight.category} / {featuredInsight.readTime}
              </p>
            </div>
            <div className="insights-featured-copy" data-reveal>
              <h2>{featuredInsight.title}</h2>
              <p>{getInsightPreviewText(featuredInsight, 1)}</p>
            </div>
            <Link
              href={getInsightPath(featuredInsight)}
              className="insights-featured-link"
              aria-label={`Read ${featuredInsight.title}`}
              data-reveal
            >
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="editorial-container">
          <InsightsArticleAccordion articles={articlePreviews} categories={insightCategories} />
        </div>
      </div>
    </>
  );
}
