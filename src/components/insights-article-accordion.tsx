"use client";

import Link from "next/link";
import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import type { InsightArticle, InsightCategory } from "@/content/insights";
import { getInsightPath } from "@/content/insights";

type InsightPreview = Pick<
  InsightArticle,
  "slug" | "title" | "category" | "categorySlug" | "summary" | "readTime" | "date" | "tags"
> & {
  dateLabel: string;
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

export function InsightsArticleAccordion({ articles, categories }: InsightsArticleAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeCategoryLabel =
    activeCategory === "all"
      ? "All articles"
      : categories.find((category) => category.slug === activeCategory)?.label ?? "All articles";

  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!categoryMenuRef.current?.contains(event.target as Node)) setIsCategoryMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isCategoryMenuOpen]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    articles.forEach((article) => {
      counts.set(article.categorySlug, (counts.get(article.categorySlug) ?? 0) + 1);
    });
    return counts;
  }, [articles]);

  const visibleCategories = useMemo(
    () => categories.filter((category) => (categoryCounts.get(category.slug) ?? 0) > 0),
    [categories, categoryCounts]
  );

  const chooseCategory = (slug: string) => {
    setActiveCategory(slug);
    setIsCategoryMenuOpen(false);
  };

  const handleCategoryMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setIsCategoryMenuOpen(false);
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const options = Array.from(
      categoryMenuRef.current?.querySelectorAll<HTMLButtonElement>("[role='option']") ?? []
    );
    if (!options.length) return;
    const currentIndex = options.findIndex((option) => option === document.activeElement);
    const nextIndex =
      event.key === "ArrowDown"
        ? (currentIndex + 1) % options.length
        : (currentIndex - 1 + options.length) % options.length;
    options[nextIndex]?.focus();
  };

  const filteredArticles = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = activeCategory === "all" || article.categorySlug === activeCategory;
      const searchable = article.searchText.toLowerCase();

      return matchesCategory && (!normalisedQuery || searchable.includes(normalisedQuery));
    });
  }, [activeCategory, articles, query]);

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
          {visibleCategories.map((category) => (
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
        <div
          className={`insights-category-select ${isCategoryMenuOpen ? "is-open" : ""}`}
          ref={categoryMenuRef}
          onKeyDown={handleCategoryMenuKeyDown}
        >
          <button
            type="button"
            className="insights-category-trigger"
            aria-haspopup="listbox"
            aria-expanded={isCategoryMenuOpen}
            aria-controls="insights-category-menu"
            onClick={() => setIsCategoryMenuOpen((open) => !open)}
          >
            <span>{activeCategoryLabel}</span>
            <ChevronDown aria-hidden="true" />
          </button>
          <AnimatePresence>
            {isCategoryMenuOpen ? (
              <motion.div
                id="insights-category-menu"
                role="listbox"
                aria-label="Filter insights by category"
                className="insights-category-menu"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.985 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.16, ease: accordionEase }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={activeCategory === "all"}
                  className={activeCategory === "all" ? "is-active" : undefined}
                  onClick={() => chooseCategory("all")}
                >
                  <span>All articles</span>
                  <span className="insights-category-count">{articles.length}</span>
                </button>
                {visibleCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    role="option"
                    aria-selected={activeCategory === category.slug}
                    className={activeCategory === category.slug ? "is-active" : undefined}
                    onClick={() => chooseCategory(category.slug)}
                  >
                    <span>{category.label}</span>
                    <span className="insights-category-count">{categoryCounts.get(category.slug) ?? 0}</span>
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
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

      <h2 id="latest-insights-title" className="sr-only">
        Articles
      </h2>

      <div className="insights-list">
        {filteredArticles.length ? (
          filteredArticles.map((article) => (
            <Link key={article.slug} href={getInsightPath(article)} className="insights-row" data-reveal>
              <span className="insights-row-meta">
                <span className="insights-row-date">{article.dateLabel}</span>
                <span className="insights-row-category">{article.category}</span>
              </span>
              <span className="insights-row-main">
                <span className="insights-row-title">{article.title}</span>
                <span className="insights-row-summary">{renderInlineMarkdown(article.summary)}</span>
              </span>
              <span className="insights-row-read">{article.readTime}</span>
            </Link>
          ))
        ) : (
          <div className="insights-empty-state" data-reveal>
            <p>No articles match that search yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
