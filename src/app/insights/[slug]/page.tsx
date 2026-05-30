import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageReveals } from "@/components/page-reveals";
import {
  getInsightBySlug,
  getInsightPath,
  getRelatedInsights,
  insightArticles
} from "@/content/insights";
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: ["/opengraph-image"]
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

function renderSourceMarkdown(markdown: string, displayTitle: string) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let hasRenderedTitle = false;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      blocks.push(<hr key={index} />);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      if (!hasRenderedTitle) {
        blocks.push(<h1 key={index}>{displayTitle}</h1>);
        hasRenderedTitle = true;
      } else {
        blocks.push(<h2 key={index}>{trimmed.slice(2)}</h2>);
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (!hasRenderedTitle) {
        blocks.push(<h1 key={index}>{displayTitle}</h1>);
        hasRenderedTitle = true;
      } else {
        blocks.push(<h2 key={index}>{trimmed.slice(3)}</h2>);
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push(<h3 key={index}>{trimmed.slice(4)}</h3>);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: Array<{ marker: string; text: string }> = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push({ marker: "-", text: lines[index].trim().slice(2) });
        index += 1;
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
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+[\.)])\s+(.*)$/);

    if (orderedMatch) {
      const items: Array<{ marker: string; text: string }> = [];

      while (index < lines.length) {
        const currentMatch = lines[index].trim().match(/^(\d+[\.)])\s+(.*)$/);
        if (!currentMatch) break;
        items.push({ marker: currentMatch[1], text: currentMatch[2] });
        index += 1;
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
      continue;
    }

    blocks.push(<p key={index}>{renderInlineMarkdown(trimmed)}</p>);
    index += 1;
  }

  return blocks;
}

export default async function InsightArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedInsights(article);

  return (
    <>
      <PageReveals />
      <article className="home-4b insight-article-page">
        <header className="insight-article-hero" data-home-section>
          <div className="editorial-container insight-article-hero-frame">
            <Link href="/insights" className="insight-back-link" data-reveal>
              <ArrowLeft aria-hidden="true" />
              Insights
            </Link>
            <div className="insight-article-meta insight-article-source-meta" data-reveal>
              <p>{article.category}</p>
              <p>{article.readTime}</p>
              <p>Updated {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(article.updated))}</p>
            </div>
          </div>
        </header>

        <div className="editorial-container insight-article-layout is-source-exact">
          <div className="insight-article-body">
            {renderSourceMarkdown(article.sourceMarkdown, article.title)}
          </div>
        </div>

        <section className="editorial-container insight-related-section" aria-labelledby="related-insights-title">
          <div className="insight-related-header">
            <p className="eyebrow" id="related-insights-title">
              Related
            </p>
          </div>
          <div className="insight-related-list">
            {relatedArticles.map((related, index) => (
              <Link href={getInsightPath(related)} className="insight-related-row" key={related.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{related.category}</span>
                <strong>{related.title}</strong>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
