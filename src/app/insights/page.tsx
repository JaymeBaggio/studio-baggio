import type { Metadata } from "next";
import { InsightsArticleAccordion } from "@/components/insights-article-accordion";
import { PageReveals } from "@/components/page-reveals";
import { getInsightPreviewText, insightArticles, insightCategories } from "@/content/insights";
import { metadata as siteMetadata } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...siteMetadata.insights, path: "/insights" });

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function formatMonthYear(isoDate: string) {
  const [year, month] = isoDate.split("-");
  return `${monthLabels[Number(month) - 1]} ${year}`;
}

const articlePreviews = [...insightArticles]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((article) => ({
  slug: article.slug,
  title: article.title,
  category: article.category,
  categorySlug: article.categorySlug,
  summary: getInsightPreviewText(article, 1),
  preview: getInsightPreviewText(article, 2),
  readTime: article.readTime,
  date: article.date,
  dateLabel: formatMonthYear(article.date),
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

        <div className="editorial-container">
          <InsightsArticleAccordion articles={articlePreviews} categories={insightCategories} />
        </div>
      </div>
    </>
  );
}
