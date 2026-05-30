"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { InsightArticle, InsightCategory } from "@/content/insights";
import { getInsightPath } from "@/content/insights";

type InsightPreview = Pick<
  InsightArticle,
  "slug" | "title" | "category" | "categorySlug" | "summary" | "preview" | "readTime" | "tags"
> & {
  searchText: string;
};

type InsightsArticleAccordionProps = {
  articles: InsightPreview[];
  categories: InsightCategory[];
};

const accordionEase = [0.23, 1, 0.32, 1] as const;

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const content = token.startsWith("**") ? token.slice(2, -2) : token.slice(1, -1);
    nodes.push(
      token.startsWith("**") ? (
        <strong key={`${token}-${match.index}`}>{content}</strong>
      ) : (
        <em key={`${token}-${match.index}`}>{content}</em>
      )
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderPreviewParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>);
}

export function InsightsArticleAccordion({ articles, categories }: InsightsArticleAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const filteredArticles = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = activeCategory === "all" || article.categorySlug === activeCategory;
      const searchable = article.searchText.toLowerCase();

      return matchesCategory && (!normalisedQuery || searchable.includes(normalisedQuery));
    });
  }, [activeCategory, articles, query]);

  const refreshScrollMeasurements = () => {
    window.requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <section className="insights-list-section" aria-labelledby="latest-insights-title">
      <div className="insights-filter-strip" data-reveal>
        <div className="insights-category-filter" aria-label="Filter insights by category">
          <button
            type="button"
            className={activeCategory === "all" ? "is-active" : undefined}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={activeCategory === category.slug ? "is-active" : undefined}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <label className="insights-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            placeholder="Search articles"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="insights-list-heading" data-reveal>
        <h2 id="latest-insights-title">Articles</h2>
        <p>Newest first.</p>
      </div>

      <div className="insights-accordion-list">
        {filteredArticles.length ? (
          filteredArticles.map((article, index) => {
            const isOpen = activeSlug === article.slug;
            const panelId = `insight-preview-${article.slug}`;

            return (
              <article
                key={article.slug}
                className={`insights-accordion-row ${isOpen ? "is-open" : ""}`}
                data-reveal
              >
                <div className="insights-accordion-row-head">
                  <span className="insights-row-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="insights-row-category">{article.category}</span>
                  <button
                    type="button"
                    className="insights-row-button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActiveSlug(isOpen ? "" : article.slug)}
                  >
                    <span className="insights-row-title">{article.title}</span>
                    <span className="insights-row-summary">{renderInlineMarkdown(article.summary)}</span>
                  </button>
                  <div className="insights-row-actions">
                    <button
                      type="button"
                      className="insights-icon-button"
                      aria-label={isOpen ? `Collapse ${article.title}` : `Preview ${article.title}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setActiveSlug(isOpen ? "" : article.slug)}
                    >
                      <ChevronDown aria-hidden="true" />
                    </button>
                    <Link
                      href={getInsightPath(article)}
                      className="insights-icon-button"
                      aria-label={`Read ${article.title}`}
                    >
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      className="insights-preview-panel"
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: shouldReduceMotion ? 0 : 0.34, ease: accordionEase },
                        opacity: { duration: shouldReduceMotion ? 0 : 0.18, ease: accordionEase }
                      }}
                      onAnimationComplete={refreshScrollMeasurements}
                    >
                      <div className="insights-preview-inner">
                        <div className="insights-preview-copy">
                          <p className="insights-preview-label">Preview</p>
                          {renderPreviewParagraphs(article.preview)}
                        </div>
                        <div className="insights-preview-meta">
                          <span>{article.readTime}</span>
                          <Link href={getInsightPath(article)}>Read article</Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </article>
            );
          })
        ) : (
          <div className="insights-empty-state" data-reveal>
            <p>No articles match that search yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
