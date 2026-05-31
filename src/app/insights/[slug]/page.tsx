import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Code2, Flame, ListChecks, PoundSterling, Search } from "lucide-react";
import { PageReveals } from "@/components/page-reveals";
import {
  getInsightBySlug,
  getInsightPath,
  getRelatedInsights,
  type InsightArticle,
  insightArticles
} from "@/content/insights";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return {};
  }

  const path = getInsightPath(article);
  const url = `${siteUrl}${path}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "article",
      siteName: "Studio Baggio",
      url,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: ["Jayme Baggio"],
      images: [defaultOpenGraphImage]
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [defaultTwitterImage]
    }
  };
}

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

function cleanSourceHeading(heading: string) {
  const cleaned = heading.replace(/^Slide\s+\d+(?::\s*)?/i, "").trim();
  return cleaned.toLowerCase() === "cover" ? "" : cleaned;
}

function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

const articleSectionHeadingsBySlug: Record<string, Set<string>> = {
  "firecrawl-for-business": new Set([
    "In real Terms:",
    "What does this mean for businesses?",
    "Public footprint is now part of how a business gets qualified."
  ]),
  "ai-adoption-value-gap": new Set([
    "Adoption is high. Value is patchy.",
    "There is a real profit gap.",
    "Shadow AI is ahead of your governance.",
    "The real blocker is not models. It is the “data tax”.",
    "High performers think in operating systems, not tools.",
    "End-of-year TLDR"
  ])
};

const hiddenSourceHeadingsBySlug: Record<string, Set<string>> = {
  "building-ai-operating-systems": new Set(["THE REAL QUESTION:"])
};

function shouldShowSourceHeading(articleSlug: string, heading: string) {
  return Boolean(heading) && !hiddenSourceHeadingsBySlug[articleSlug]?.has(heading);
}

type ArticleSignal = {
  body: string;
  label: string;
  tone: "accent" | "neutral";
};

const articleSignalPattern =
  /^(?:\*\*)?\s*(insight|why it matters|opportunity|action|actionable takeaway|takeout|signal)\s*:?\.*(?:\*\*)?\s*(.*)$/i;

function getArticleSignal(paragraph: string): ArticleSignal | null {
  const match = paragraph.match(articleSignalPattern);
  if (!match) {
    return null;
  }

  const [, rawLabel, rawBody] = match;
  const body = rawBody.trim();

  if (!body) {
    return null;
  }

  const normalizedLabel = rawLabel.toUpperCase();
  return {
    body,
    label: normalizedLabel,
    tone: normalizedLabel.includes("ACTION") ? "accent" : "neutral"
  };
}

function startsWithArticleSignal(text: string) {
  return articleSignalPattern.test(text);
}

function isStandaloneQuote(paragraph: string) {
  const trimmed = paragraph.trim();
  return (
    trimmed.length > 2 &&
    ((trimmed.startsWith("“") && (trimmed.endsWith("”") || trimmed.endsWith("“"))) ||
      (trimmed.startsWith("\"") && trimmed.endsWith("\"")))
  );
}

function isLikelyQuoteCitation(paragraph: string) {
  const trimmed = paragraph.trim();
  return trimmed.length > 0 && trimmed.length <= 180 && !getArticleSignal(trimmed) && !isStandaloneQuote(trimmed);
}

function ArticleSignalBlock({ signal }: { signal: ArticleSignal }) {
  return (
    <aside className={`insight-article-signal is-${signal.tone}`}>
      <p className="insight-article-signal-label">{signal.label}</p>
      <p className="insight-article-signal-body">{renderInlineMarkdown(signal.body)}</p>
    </aside>
  );
}

function getExampleSplit(paragraph: string) {
  const marker = "Example:";
  const markerIndex = paragraph.indexOf(marker);

  if (markerIndex <= 0) {
    return null;
  }

  return {
    before: paragraph.slice(0, markerIndex).trim(),
    example: paragraph.slice(markerIndex + marker.length).trim()
  };
}

function ArticleExampleBlock({ text }: { text: string }) {
  return (
    <aside className="insight-article-example">
      <p className="insight-article-example-label">Example:</p>
      <p className="insight-article-example-body">{renderInlineMarkdown(text)}</p>
    </aside>
  );
}

const firecrawlWorkflow: Array<{ title: string; Icon: LucideIcon; items: string[] }> = [
  {
    title: "Firecrawl",
    Icon: Flame,
    items: [
      "Brand websites",
      "TikTok + YouTube presence",
      "Ad libraries",
      "Industry press",
      "Influencer marketing reports",
      "Annual reports",
      "Case studies"
    ]
  },
  {
    title: "Surface",
    Icon: Search,
    items: [
      "Heavy creator spend",
      "Weak owned channels",
      "Strong TikTok, weak YouTube",
      "Competitor pressure",
      "Category white space",
      "New launch activity"
    ]
  },
  {
    title: "Claude / Codex",
    Icon: Code2,
    items: [
      "Runs data through ICP",
      "Qualification criteria",
      "Budget signals",
      "Category fit",
      "Strategic value",
      "Route in"
    ]
  },
  {
    title: "Builds",
    Icon: ListChecks,
    items: [
      "Prioritised prospect list",
      "Fit score",
      "Clear rationale",
      "Pitch angle",
      "Evidence links",
      "Best route in"
    ]
  }
];

function FirecrawlWorkflowDiagram() {
  return (
    <aside className="insight-article-visual insight-firecrawl-flow" aria-label="Firecrawl lead qualification workflow">
      <div className="insight-firecrawl-flow-steps">
        {firecrawlWorkflow.map((step, index) => (
          <div className="insight-firecrawl-flow-group" key={step.title}>
            <div className="insight-firecrawl-flow-card">
              <step.Icon aria-hidden="true" />
              <h3>{step.title}</h3>
              <ul>
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {index < firecrawlWorkflow.length - 1 ? (
              <ArrowRight className="insight-firecrawl-flow-arrow" aria-hidden="true" />
            ) : null}
          </div>
        ))}
        <div className="insight-firecrawl-flow-outcome">
          <span>
            <PoundSterling aria-hidden="true" />
          </span>
          <strong>Pennies per qualified lead</strong>
        </div>
      </div>
    </aside>
  );
}

function renderSourceMarkdown(markdown: string, articleSlug: string) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let hasRenderedTitle = false;
  let paragraphLines: string[] = [];
  let lastBlockWasQuote = false;

  const flushParagraph = () => {
    if (!paragraphLines.length) {
      return;
    }

    const paragraph = paragraphLines.join(" ");
    const signal = getArticleSignal(paragraph);

    if (signal) {
      blocks.push(<ArticleSignalBlock key={`signal-${index}-${blocks.length}`} signal={signal} />);
      lastBlockWasQuote = false;
    } else if (isStandaloneQuote(paragraph)) {
      blocks.push(
        <blockquote className="insight-article-pullquote" key={`quote-${index}-${blocks.length}`}>
          <p>{renderInlineMarkdown(paragraph)}</p>
        </blockquote>
      );
      lastBlockWasQuote = true;
    } else if (lastBlockWasQuote && isLikelyQuoteCitation(paragraph)) {
      blocks.push(
        <p className="insight-article-quote-cite" key={`cite-${index}-${blocks.length}`}>
          {renderInlineMarkdown(paragraph)}
        </p>
      );
      lastBlockWasQuote = false;
    } else {
      const exampleSplit = getExampleSplit(paragraph);
      if (exampleSplit) {
        blocks.push(
          <p key={`p-${index}-${blocks.length}`}>
            {renderInlineMarkdown(exampleSplit.before)}
          </p>
        );
        blocks.push(<ArticleExampleBlock key={`example-${index}-${blocks.length}`} text={exampleSplit.example} />);
      } else {
        blocks.push(
          <p key={`p-${index}-${blocks.length}`}>
            {renderInlineMarkdown(paragraph)}
          </p>
        );
      }
      lastBlockWasQuote = false;
    }

    if (
      articleSlug === "firecrawl-for-business" &&
      paragraph.includes("categry has unoccupied whitespace ready for the redbull of that sector to fill the gap?")
    ) {
      blocks.push(<FirecrawlWorkflowDiagram key="firecrawl-workflow-diagram" />);
    }

    paragraphLines = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      lastBlockWasQuote = false;
      blocks.push(<hr key={index} />);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      if (!hasRenderedTitle) {
        hasRenderedTitle = true;
        lastBlockWasQuote = false;
      } else {
        const heading = cleanSourceHeading(trimmed.slice(2));
        if (shouldShowSourceHeading(articleSlug, heading)) {
          blocks.push(<h2 key={index}>{heading}</h2>);
          lastBlockWasQuote = false;
        }
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      if (!hasRenderedTitle) {
        hasRenderedTitle = true;
        lastBlockWasQuote = false;
      } else {
        const heading = cleanSourceHeading(trimmed.slice(3));
        if (shouldShowSourceHeading(articleSlug, heading)) {
          blocks.push(<h2 key={index}>{heading}</h2>);
          lastBlockWasQuote = false;
        }
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      const heading = cleanSourceHeading(trimmed.slice(4));
      if (shouldShowSourceHeading(articleSlug, heading)) {
        blocks.push(<h3 key={index}>{heading}</h3>);
        lastBlockWasQuote = false;
      }
      index += 1;
      continue;
    }

    if (articleSectionHeadingsBySlug[articleSlug]?.has(trimmed)) {
      flushParagraph();
      blocks.push(
        <h2
          className={`insight-article-section-heading${articleSlug === "firecrawl-for-business" ? " is-accent" : ""}`}
          key={index}
        >
          {trimmed}
        </h2>
      );
      lastBlockWasQuote = false;
      index += 1;
      continue;
    }

    if (startsWithArticleSignal(trimmed)) {
      flushParagraph();
      paragraphLines.push(trimmed);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      flushParagraph();
      const items: Array<{ marker: string; text: string }> = [];

      while (index < lines.length) {
        const currentLine = lines[index].trim();
        if (!currentLine.startsWith("- ") && !currentLine.startsWith("• ")) {
          break;
        }

        const item: { marker: string; text: string } = {
          marker: currentLine.startsWith("• ") ? "•" : "-",
          text: currentLine.slice(2)
        };
        index += 1;

        while (index < lines.length) {
          const nextRawLine = lines[index];
          const nextLine = nextRawLine.trim();
          const isNewListItem = nextLine.startsWith("- ") || nextLine.startsWith("• ");
          const isIndentedContinuation = /^\s+/.test(nextRawLine) && !isNewListItem;
          const isBlockBoundary =
            !nextLine ||
            isNewListItem ||
            /^#{1,3}\s/.test(nextLine) ||
            nextLine === "---" ||
            /^(\d+[\.)])\s+(.*)$/.test(nextLine);

          if (isBlockBoundary) {
            break;
          }

          if (!isIndentedContinuation) {
            break;
          }

          item.text = `${item.text} ${nextLine}`;
          index += 1;
        }

        items.push(item);
      }

      blocks.push(
        <ul className="insight-article-source-list" key={index}>
          {items.map((item) => (
            <li key={`${item.marker}-${item.text}`}>
              <span aria-hidden="true">{item.marker}</span>
              <p>{renderInlineMarkdown(item.text)}</p>
            </li>
          ))}
        </ul>
      );
      lastBlockWasQuote = false;
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+[\.)])\s+(.*)$/);

    if (orderedMatch) {
      flushParagraph();
      const items: Array<{ marker: string; text: string }> = [];

      while (index < lines.length) {
        const currentMatch = lines[index].trim().match(/^(\d+[\.)])\s+(.*)$/);
        if (!currentMatch) break;
        const item = { marker: currentMatch[1], text: currentMatch[2] };
        index += 1;

        while (index < lines.length) {
          const nextRawLine = lines[index];
          const nextLine = nextRawLine.trim();
          const isIndentedContinuation = /^\s+/.test(nextRawLine);
          const isBlockBoundary =
            !nextLine ||
            /^#{1,3}\s/.test(nextLine) ||
            nextLine === "---" ||
            nextLine.startsWith("- ") ||
            nextLine.startsWith("• ") ||
            /^(\d+[\.)])\s+(.*)$/.test(nextLine);

          if (isBlockBoundary) {
            break;
          }

          if (!isIndentedContinuation) {
            break;
          }

          item.text = `${item.text} ${nextLine}`;
          index += 1;
        }

        items.push(item);
      }

      blocks.push(
        <ol className="insight-article-source-list is-numbered" key={index}>
          {items.map((item) => (
            <li key={`${item.marker}-${item.text}`}>
              <span aria-hidden="true">{item.marker}</span>
              <p>{renderInlineMarkdown(item.text)}</p>
            </li>
          ))}
        </ol>
      );
      lastBlockWasQuote = false;
      continue;
    }

    paragraphLines.push(trimmed);
    index += 1;
  }

  flushParagraph();

  return blocks;
}

function ArticleMoreArticles({ articles }: { articles: InsightArticle[] }) {
  return (
    <aside className="insight-article-more" aria-label="More articles">
      <p className="insight-article-more-label">More articles</p>
      <div className="insight-article-more-list">
        {articles.map((related) => (
          <Link className="insight-article-more-row" href={getInsightPath(related)} key={related.slug}>
            <span>{related.category}</span>
            <strong>{related.title}</strong>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default async function InsightArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedInsights(article);
  const moreArticles = [
    ...relatedArticles,
    ...insightArticles.filter(
      (candidate) =>
        candidate.slug !== article.slug && !relatedArticles.some((related) => related.slug === candidate.slug)
    )
  ].slice(0, 3);

  return (
    <>
      <PageReveals />
      <article className="home-4b insight-article-page">
        <header className="insight-article-hero" data-home-section>
          <div className="editorial-container insight-article-hero-frame">
            <div className="insight-article-kicker-row" data-reveal>
              <Link href="/insights" className="insight-article-breadcrumb">
                Insights <span aria-hidden="true">→</span> {article.category}
              </Link>
            </div>
            <h1 className="insight-article-hero-title" data-reveal>
              {article.title}
            </h1>
            <div className="insight-article-meta-bar" data-reveal>
              <span className="insight-article-meta-item">
                <span>Author</span>
                <strong>Jayme Baggio</strong>
              </span>
              <span className="insight-article-meta-item">
                <span>Published</span>
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              </span>
              <span className="insight-article-meta-item">
                <span>Category</span>
                <strong>{article.category}</strong>
              </span>
              <span className="insight-article-meta-item">
                <span>Read</span>
                <strong>{article.readTime}</strong>
              </span>
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${siteUrl}${getInsightPath(article)}`)}`}
              >
                Share
              </a>
            </div>
          </div>
        </header>

        <div className="editorial-container insight-article-layout is-source-exact">
          <div className="insight-article-body">
            {renderSourceMarkdown(article.sourceMarkdown, article.slug)}
          </div>
          <ArticleMoreArticles articles={moreArticles} />
        </div>
      </article>
    </>
  );
}
