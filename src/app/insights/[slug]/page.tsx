import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Code2, Flame, ListChecks, PoundSterling, Search } from "lucide-react";
import { ArticleSchema } from "@/components/article-schema";
import { InsightShareButton } from "@/components/insight-share-button";
import { FaqSchema } from "@/components/faq-schema";
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

function accentArrowNodes(nodes: ReactNode[]): ReactNode[] {
  const out: ReactNode[] = [];
  nodes.forEach((node, nodeIndex) => {
    if (typeof node !== "string" || !node.includes("\u2192")) {
      out.push(node);
      return;
    }
    node.split("\u2192").forEach((part, partIndex) => {
      if (partIndex > 0) {
        out.push(
          <span aria-hidden="true" className="insight-setup-arrow" key={`arrow-${nodeIndex}-${partIndex}`}>
            {"\u2192"}
          </span>
        );
      }
      if (part) {
        out.push(part);
      }
    });
  });
  return out;
}

function renderInlineMarkdown(text: string, accentArrows = false): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      nodes.push(
        href.startsWith("/") ? (
          <Link href={href} key={`${token}-${match.index}`}>
            {label}
          </Link>
        ) : (
          <a href={href} key={`${token}-${match.index}`} rel="noreferrer" target="_blank">
            {label}
          </a>
        )
      );
    } else {
      const content = token.startsWith("**") ? token.slice(2, -2) : token.slice(1, -1);
      nodes.push(
        token.startsWith("**") ? (
          <strong key={`${token}-${match.index}`}>{content}</strong>
        ) : (
          <em key={`${token}-${match.index}`}>{content}</em>
        )
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return accentArrows ? accentArrowNodes(nodes) : nodes;
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
  ]),
  "ai-future-of-work": new Set(["Do three things this week:"]),
  "what-is-an-ai-skill": new Set(["SKILLS SPECIAL:"]),
  "ai-predictions-2026": new Set([
    "2026 Predictions- What I think we’ll see in the next 12months."
  ])
};

const hiddenSourceHeadingsBySlug: Record<string, Set<string>> = {
  "building-ai-operating-systems": new Set(["THE REAL QUESTION:"]),
  "owned-vs-rented-audience": new Set(["Reuters 2026 Trends & Predictions Report cont."])
};

const sourceHeadingDisplayOverridesBySlug: Record<string, Record<string, string>> = {
  "building-ai-operating-systems": {
    "THE OS IN ONE VIEW:": "AI OPERATING SYSTEM FOR 2026"
  }
};

const hiddenSourceSectionsBySlug: Record<string, Set<string>> = {
  "what-is-an-ai-skill": new Set([
    "Design Direction — Lando Norris-inspired",
    "Design Direction — Bold, campaign-led",
    "Design Direction — Premium editorial",
    "Design Direction — Forbes media kit-inspired",
    "Design Directions — Forbes continued + Glassmorphic",
    "Design Directions — Glassmorphic + Brutalist + Cinematic"
  ])
};

function shouldShowSourceHeading(articleSlug: string, heading: string) {
  return Boolean(heading) && !hiddenSourceHeadingsBySlug[articleSlug]?.has(heading);
}

function getSourceHeadingDisplay(articleSlug: string, heading: string) {
  return sourceHeadingDisplayOverridesBySlug[articleSlug]?.[heading] ?? heading;
}

function shouldHideSourceSection(articleSlug: string, heading: string) {
  return hiddenSourceSectionsBySlug[articleSlug]?.has(heading) ?? false;
}

type ArticleSignal = {
  body: string;
  label: string;
  tone: "accent" | "neutral";
};

const articleSignalPattern =
  /^(?:\*\*)?\s*(actionable takeaway|why it matters|the takeaway|opportunity|insight|action|takeout|signal)\s*:\.*(?:\*\*)?\s*(.*)$/i;

const sourceSubheadingPattern =
  /^\*\*\s*(headline predictions|what it means in practice|what execs should do now|the takeaway)\s*:\s*\*\*\s*$/i;

const toolEntryTitles = [
  "ChatGPT",
  "Codex",
  "Claude",
  "WhisperFlow",
  "Perplexity",
  "Last30Days",
  "NotebookLM",
  "Gemini + Google AI Studio",
  "Figma",
  "Calm Authority.ai",
  "ElevenLabs",
  "Freepik, Seedance and HyperFrames",
  "GPT Image 2",
  "Runway, Sora and Veo",
  "Krea",
  "Krea.ai",
  "Relay.app",
  "Canva",
  "Descript",
  "Opus Clip",
  "Gamma",
  "YouTube",
  "Speechify",
  "Planner",
  "Lovable",
  "Lovable.dev"
];

const toolDirectoryArticleSlugs = new Set(["best-ai-tools-2025", "best-ai-tools-content-production-2026"]);

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

  const normalizedLabel = rawLabel.toLowerCase() === "the takeaway" ? "THE TAKEAWAY" : rawLabel.toUpperCase();
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

type EditorialTextChunk = {
  highlight?: string;
  text: string;
  tone?: "emphasis" | "heading" | "paragraph";
};

const paragraphChunkOverridesBySlug: Record<string, Array<{ startsWith: string; chunks: EditorialTextChunk[] }>> = {
  "firecrawl-for-business": [
    {
      startsWith: "You can now scrape every competitor’s website",
      chunks: [
        {
          text: "You can now scrape every competitor’s website, pull out their pricing models, & analyse how they position themselves in the market."
        },
        {
          text: "You can find out-who’s spending in which sectors- as well as how much. Performance metrics, who’s offer is strongest against any criteria, which prospects are worth pursuing based on your own specific ICP- You can even search every two-bedroom flat in London and build a live property database around any given criteria."
        },
        {
          text: "Firecrawl enables you to find all publically available information on any practitioner in any niche, assess their public profile, then rate them against a quality framework your business has defined."
        },
        {
          text: "What used to sit across the likes of Salesforce, Tubular, a prospect database or a research agency can now be accessed in seconds, for pennies a queery and its made parts of the old intelligence market suddenly look distinctly exposed."
        },
        {
          highlight: "Bespoke curation of data and a collapse in cost and speed of commercial intelligence.",
          text: "When just last week we saw Salesforce’s own Marc Benicoff announce their own API ‘connector’- it’s clear the direction we’re headed in- Bespoke curation of data and a collapse in cost and speed of commercial intelligence.",
          tone: "emphasis"
        },
        {
          text: "What stikes me is the ease with which this is accessible. Copy one API key into Claude or codex and you now have a purpose built dashboard plugged into every piece of information publicly available- live."
        }
      ]
    },
    {
      startsWith: "There is now near zero barrier to entry",
      chunks: [
        {
          text: "There is now near zero barrier to entry for anybody to launch a vertical saas for any niche; Aim Firecrawl at job boards & career pages- you have built a niche Indeed. Add scrapecreators or supadata & you have “Tubular for fitness creators” or “Rephonic for B2B podcasters” in under an hour- without any company wide data engineering project."
        },
        {
          text: "Firecrawl makes it easier to build a niche data company. But it also makes the niche data company easier to replace."
        },
        {
          text: "If a product is just public web data, AI classification & a dashboard, then the buyer won’t need to buy it for long. It begs the question “Why would we pay for a genralised view of the market when we can build a private view of the market around our own priorities?”"
        }
      ]
    },
    {
      startsWith: "Now you are not just looking at brands with budget",
      chunks: [
        {
          text: "Now you are not just looking at brands with budget. You are looking at brands with budget, category literacy and a visible gap your business is positioned to fill."
        }
      ]
    },
    {
      startsWith: "If your company is looking at a stale dashboard",
      chunks: [
        {
          text: "If your company is looking at a stale dashboard built around someone elses view of the market, you are now at a distinct disadvantage versus those with hands and eyes on the whole of the internet."
        },
        {
          highlight: "More data only helps if the business has a sharp enough filter- vague thinking just became a lot more expensive.",
          text: "When access to data is this easily accessible the onus shifts towards understanding what to do with it. More data only helps if the business has a sharp enough filter- vague thinking just became a lot more expensive.",
          tone: "emphasis"
        },
        {
          text: "The more data you can access, the more important a clear ICP, positioning and sharp qualification criteria become."
        },
        {
          text: "If your business can use public data to qualify the market, the market can use public data to qualify your business."
        }
      ]
    },
    {
      startsWith: "Salesforce & HubSpot are not replaced overnight",
      chunks: [
        {
          text: "Salesforce & HubSpot are not replaced overnight, but the manually maintained CRM, does now start to look like a pre-AI artefact. An old-school CRM told you who made an enquiry, clicked on an AD, signed up to your newsletter."
        },
        {
          text: "The new era lead tracker pulls public information about any person or company, then qualifies them against a rubric your business defines. Do they fit the ICP? Do they have budget? What did their CEO post on LinkedIn this week? Are they a standard commercial opportunity or a reputation play?"
        },
        {
          text: "The output becomes a rationale & a recommended angle for approach. It starts to look a lot less like a leads trakcer and a lot more like a prospecting machine."
        },
        {
          text: "Example: A production company working with brands to help scale their owned & operated platforms. They can now find out which brands are spending heavily on creator marketing; Of those- which have underdeveloped owned channels? Which brands are growing on Tiktok but haven’t yet managed to extend to longer form on YouTube? Which categry has unoccupied whitespace ready for the redbull of that sector to fill the gap?"
        }
      ]
    },
    {
      startsWith: "As public data becomes easier to analyse",
      chunks: [
        {
          text: "As public data becomes easier to analyse, unclear positioning and weak public proof become harder to hide."
        },
        {
          text: "Your website, SEO, case studies, press, reviews & public content need to give buyers, partners & AI systems enough evidence to understand what you do and why you are credible."
        },
        {
          text: "A strong digital footprint becomes a stronger qualification metric. A thin website, poor search presence, limited proof and weak third-party evidence make the business harder to understand and easier to discount."
        },
        {
          text: "A business may have strong clients, strong results and a solid offline reputation. But if those signals are trapped in private conversations, they are harder for new buyers to verify and harder for AI systems to qualify- which becomes a real commercial risk."
        },
        {
          text: "That applies to businesses and individuals- There is another side to this shift. If public data can be used to qualify the market, it can also be used to qualify you."
        }
      ]
    }
  ]
};

function getParagraphChunks(articleSlug: string, paragraph: string): EditorialTextChunk[] {
  const override = paragraphChunkOverridesBySlug[articleSlug]?.find((entry) =>
    paragraph.startsWith(entry.startsWith)
  );

  if (override) {
    return override.chunks;
  }

  if (paragraph.length < 460 || paragraph.includes("Use it for:")) {
    return [{ text: paragraph }];
  }

  const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length < 3) {
    return [{ text: paragraph }];
  }

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (current && next.length > 330) {
      chunks.push(current);
      current = sentence;
    } else {
      current = next;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks.map((text) => ({ text }));
}

function renderHighlightedText(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) {
    return renderInlineMarkdown(text);
  }

  const [before, afterStart] = text.split(highlight);
  return [
    ...renderInlineMarkdown(before),
    <span className="insight-article-emphasis-highlight" key={highlight}>
      {highlight}
    </span>,
    ...renderInlineMarkdown(afterStart)
  ];
}

function ArticleEmphasisBlock({ chunk }: { chunk: EditorialTextChunk }) {
  return (
    <aside className="insight-article-emphasis">
      <p>{renderHighlightedText(chunk.text, chunk.highlight)}</p>
    </aside>
  );
}

function getSourceSubheading(paragraph: string) {
  const match = paragraph.match(sourceSubheadingPattern);
  return match ? `${match[1]}:` : null;
}

function getExampleSplit(paragraph: string) {
  const boldExampleMatch = paragraph.match(/^\*\*(Example:[^*]+)\*\*\s*(.*)$/i);

  if (boldExampleMatch && boldExampleMatch[2].trim()) {
    return {
      before: "",
      label: boldExampleMatch[1].trim(),
      example: boldExampleMatch[2].trim()
    };
  }

  const marker = "Example:";
  const markerIndex = paragraph.indexOf(marker);

  if (markerIndex < 0) {
    return null;
  }

  return {
    before: paragraph.slice(0, markerIndex).trim(),
    label: marker,
    example: paragraph.slice(markerIndex + marker.length).trim()
  };
}

function ArticleExampleBlock({ label, text }: { label: string; text: string }) {
  return (
    <aside className="insight-article-example">
      <p className="insight-article-example-label">{label}</p>
      <p className="insight-article-example-body">{renderInlineMarkdown(text)}</p>
    </aside>
  );
}

function ArticleQuotedBlock({ lines, accentArrows = false }: { lines: string[]; accentArrows?: boolean }) {
  const nonEmptyLines = lines.map((line) => line.trim()).filter(Boolean);
  const listLines = nonEmptyLines.filter((line) => line.startsWith("- "));

  if (listLines.length && listLines.length === nonEmptyLines.length) {
    return (
      <aside className="insight-article-definition-callout is-list">
        <ul>
          {listLines.map((line) => (
            <li key={line}>{renderInlineMarkdown(line.slice(2))}</li>
          ))}
        </ul>
      </aside>
    );
  }

  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length) {
      paragraphs.push(currentParagraph.join(" "));
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    currentParagraph.push(trimmed);
  }

  flushParagraph();

  const isDefinitionCallout =
    paragraphs.length > 1 || paragraphs.some((paragraph) => paragraph.includes("SEO:") || paragraph.includes("GEO"));

  if (isDefinitionCallout) {
    return (
      <aside className="insight-article-definition-callout">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{renderInlineMarkdown(paragraph, accentArrows)}</p>
        ))}
      </aside>
    );
  }

  return (
    <blockquote className="insight-article-pullquote">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>
      ))}
    </blockquote>
  );
}

function ArticleClosingCta({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <aside className="insight-article-closing-cta">
      <h2>{heading}</h2>
      {paragraphs.map((paragraph) => {
        if (paragraph.startsWith("→ ")) {
          const label = paragraph.replace(/^→\s*/, "").replace(/\*\*/g, "");
          return (
            <Link href="/contact" key={paragraph}>
              <span aria-hidden="true">→</span>
              <strong>{label}</strong>
            </Link>
          );
        }

        return <p key={paragraph}>{renderInlineMarkdown(paragraph)}</p>;
      })}
    </aside>
  );
}

function ArticleListItemBody({ articleSlug, text }: { articleSlug: string; text: string }) {
  return (
    <div className="insight-article-source-list-copy">
      {getParagraphChunks(articleSlug, text).map((chunk, chunkIndex) => (
        <p key={`${chunk.text}-${chunkIndex}`}>{renderHighlightedText(chunk.text, chunk.highlight)}</p>
      ))}
    </div>
  );
}

function getToolEntry(paragraph: string) {
  const trimmed = paragraph.trim();
  const normalized = trimmed.replace(/^\*\*([^*]+)\*\*/, "$1").trim();
  const title = toolEntryTitles.find(
    (toolTitle) =>
      normalized === toolTitle ||
      normalized.startsWith(`${toolTitle}:`) ||
      normalized.startsWith(`${toolTitle} `) ||
      normalized.startsWith(`${toolTitle} — `) ||
      normalized.startsWith(`${toolTitle} - `)
  );

  if (!title) {
    return null;
  }

  const renderedTitle = normalized.startsWith(`${title}:`) ? `${title}:` : title;
  const remainder = normalized
    .slice(renderedTitle.length)
    .replace(/^\s*(?:—|-)\s*/, "")
    .trim();
  const useMarker = "Use it for:";
  const topTipMarker = "Top tip:";
  const useIndex = remainder.indexOf(useMarker);
  const topTipIndex = remainder.indexOf(topTipMarker);
  const descriptionEndIndex = [useIndex, topTipIndex].filter((markerIndex) => markerIndex >= 0).sort((a, b) => a - b)[0];
  const useEndIndex = topTipIndex >= 0 && topTipIndex > useIndex ? topTipIndex : undefined;

  return {
    description: descriptionEndIndex >= 0 ? remainder.slice(0, descriptionEndIndex).trim() : remainder,
    tip: topTipIndex >= 0 ? remainder.slice(topTipIndex + topTipMarker.length).trim() : "",
    title: renderedTitle,
    use: useIndex >= 0 ? remainder.slice(useIndex + useMarker.length, useEndIndex).trim() : ""
  };
}

function ArticleToolEntry({
  description,
  index,
  tip,
  title,
  use
}: {
  description: string;
  index: number;
  tip: string;
  title: string;
  use: string;
}) {
  return (
    <section className="insight-article-tool-entry">
      <span className="insight-article-tool-index">{String(index).padStart(2, "0")}</span>
      <div className="insight-article-tool-copy">
        <h3>{title}</h3>
        {description ? <p>{renderInlineMarkdown(description)}</p> : null}
        {use ? (
          <p className="insight-article-tool-use">
            <span>Use it for:</span>
            <span>{renderInlineMarkdown(use)}</span>
          </p>
        ) : null}
        {tip ? (
          <p className="insight-article-tool-use">
            <span>Top tip:</span>
            <span>{renderInlineMarkdown(tip)}</span>
          </p>
        ) : null}
      </div>
    </section>
  );
}

function shouldRenderPredictionBlock(articleSlug: string, paragraph: string) {
  return articleSlug === "ai-predictions-2026" && !paragraph.startsWith("2026 Predictions-");
}

function ArticlePredictionBlock({ index, text }: { index: number; text: string }) {
  const colonIndex = text.indexOf(":");
  const hasLead = colonIndex > 0 && colonIndex < 82;
  const lead = hasLead ? text.slice(0, colonIndex + 1) : "";
  const body = hasLead ? text.slice(colonIndex + 1).trim() : text;

  return (
    <section className="insight-article-prediction">
      <span className="insight-article-prediction-index">{String(index).padStart(2, "0")}</span>
      <p>
        {lead ? <strong>{renderInlineMarkdown(lead)}</strong> : null}
        {lead ? " " : null}
        {renderInlineMarkdown(body)}
      </p>
    </section>
  );
}

function isArticleSourceNote(articleSlug: string, paragraph: string) {
  return articleSlug === "ai-adoption-value-gap" && paragraph.startsWith("McKinsey – ");
}

function ArticleHeading({ heading }: { heading: string }) {
  const numberedMatch = heading.match(/^((?:INSIGHT\s+)?#\d+)(:.*)$/i);

  if (numberedMatch) {
    return (
      <h2 className="insight-article-numbered-heading">
        <span>{numberedMatch[1]}:</span>
        <strong>{numberedMatch[2].replace(/^:\s*/, "").trim()}</strong>
      </h2>
    );
  }

  return <h2>{heading}</h2>;
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

const setupStyleSlugs = new Set(["ai-set-up-guide", "how-to-master-seo-ai-search-2026"]);

function ArticleSetupFigure({
  caption,
  src,
  alt,
  maxWidth
}: {
  caption: string;
  src: string;
  alt: string;
  maxWidth?: number;
}) {
  return (
    <figure className="insight-article-setup-figure">
      <figcaption>{caption}</figcaption>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={maxWidth ? { maxWidth } : undefined} />
    </figure>
  );
}

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

const operatingSystemFramework = [
  {
    definition: "What you believe and protect.",
    items: ["What is encouraged.", "What is off limits.", "What is always protected."],
    title: "STANCE"
  },
  {
    definition: "How AI lives in your organisation & whose judgement you choose to scale.",
    items: [
      "Execution is becoming infrastructure.",
      "Find your value gap.",
      "Turn your ‘Human in the loop’ into an asset clients can see & Trust."
    ],
    title: "STACK"
  },
  {
    definition: "The diverse human judgement at the centre of that system.",
    items: [
      "Name your future AI spine.",
      "Build operating systems around your A+ players.",
      "Make that cohort deliberately diverse."
    ],
    title: "SPINE"
  }
];

const operatingSystemSourceIntroParagraphs = [
  "STANCE",
  "What you believe and protect.",
  "STACK",
  "How AI lives in your organisation & whose judgement you choose to scale.",
  "SPINE",
  "The diverse human judgement at the centre of that system."
];

const articleClosingCtaHeadingsBySlug: Record<string, Set<string>> = {
  "generative-engine-optimisation": new Set(["Find out where AI search is leaving your firm invisible"])
};

function isArticleClosingCtaHeading(articleSlug: string, heading: string) {
  return articleClosingCtaHeadingsBySlug[articleSlug]?.has(heading) ?? false;
}

const positioningAngles = [
  {
    angle: "Secret Weapon",
    bestUsedFor: "Founder, exec & investor",
    role: "Asymmetric advantage — you know what the market wants before competitors do"
  },
  {
    angle: "The Expiry",
    bestUsedFor: "Why DIY research fails",
    role: "Reframes speed as necessity"
  },
  {
    angle: "Honest Research",
    bestUsedFor: "PR & thought leadership",
    role: "Contrasts claimed opinions with real behaviour"
  },
  {
    angle: "Decision Intelligence",
    bestUsedFor: "Homepage & B2B",
    role: "Reduces guesswork in business decisions"
  },
  {
    angle: "Democratisation",
    bestUsedFor: "Startup & challenger",
    role: "Makes enterprise-grade research accessible"
  },
  {
    angle: "Research Team in Your Pocket",
    bestUsedFor: "Sales & comparison pages",
    role: "Time & cost saved vs. traditional research"
  }
];

function OperatingSystemFrameworkDiagram() {
  return (
    <aside className="insight-article-visual insight-operating-system" aria-label="Stance, stack and spine operating system framework">
      <div className="insight-operating-system-intro">
        <p>AI Operating System for 2026</p>
        <h3>
          Stance sets the rules. Stack carries the work. Spine keeps judgement in the system.
        </h3>
      </div>
      <div className="insight-operating-system-rows">
        {operatingSystemFramework.map((section, index) => (
          <section className="insight-operating-system-row" key={section.title}>
            <div className="insight-operating-system-index">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="insight-operating-system-title">
              <h3>{section.title}</h3>
              <p>{section.definition}</p>
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}

function PositioningAnglesTable() {
  return (
    <aside className="insight-article-visual insight-positioning-angles" aria-label="Positioning angles snapshot for Last30Days">
      <div className="insight-positioning-angles-title">
        <p>Snapshot of the output for /Last30Days</p>
      </div>
      <div className="insight-positioning-angles-table">
        <div className="insight-positioning-angles-row is-head" aria-hidden="true">
          <span>Angle</span>
          <span>What it&apos;s doing</span>
          <span>Best used for</span>
        </div>
        {positioningAngles.map((row) => (
          <div className="insight-positioning-angles-row" key={row.angle}>
            <div>
              <span className="insight-positioning-angles-mobile-label">Angle</span>
              <strong>{row.angle}</strong>
            </div>
            <div>
              <span className="insight-positioning-angles-mobile-label">What it&apos;s doing</span>
              <p>{row.role}</p>
            </div>
            <div>
              <span className="insight-positioning-angles-mobile-label">Best used for</span>
              <p>{row.bestUsedFor}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Last30DaysContextCard() {
  return (
    <figure className="insight-article-visual insight-last30days-reference">
      <div className="insight-last30days-card-media">
        <Image
          src="/assets/products/last30days-og.png"
          alt="Last30Days product graphic"
          width={1731}
          height={909}
          sizes="(max-width: 1023px) 100vw, 820px"
        />
      </div>
      <figcaption className="insight-last30days-caption">
        <span>Last30Days</span>
        <div className="insight-last30days-card-actions">
          <Link href="/last30days">View product page</Link>
          <a href="https://last30days.app" target="_blank" rel="noreferrer">
            Open live site
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

function renderSourceMarkdown(markdown: string, articleSlug: string) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let hasRenderedTitle = false;
  let paragraphLines: string[] = [];
  let lastBlockWasQuote = false;
  let predictionIndex = 0;
  let toolIndex = 0;
  let operatingSystemIntroIndex = -1;
  let isSkippingHiddenSection = false;

  const pushParagraphChunk = (chunk: EditorialTextChunk) => {
    if (chunk.tone === "heading") {
      blocks.push(
        <h2
          className={`insight-article-section-heading${articleSlug === "firecrawl-for-business" ? " is-accent" : ""}`}
          key={`heading-${index}-${blocks.length}`}
        >
          {chunk.text}
        </h2>
      );
      return;
    }

    if (chunk.tone === "emphasis") {
      blocks.push(<ArticleEmphasisBlock chunk={chunk} key={`emphasis-${index}-${blocks.length}`} />);
      return;
    }

    const exampleSplit = getExampleSplit(chunk.text);
    if (exampleSplit) {
      if (exampleSplit.before) {
        blocks.push(
          <p key={`p-${index}-${blocks.length}`}>
            {renderInlineMarkdown(exampleSplit.before)}
          </p>
        );
      }
      blocks.push(
        <ArticleExampleBlock
          key={`example-${index}-${blocks.length}`}
          label={exampleSplit.label}
          text={exampleSplit.example}
        />
      );
    } else if (isArticleSourceNote(articleSlug, chunk.text)) {
      blocks.push(
        <p className="insight-article-source-note" key={`source-${index}-${blocks.length}`}>
          {renderInlineMarkdown(chunk.text)}
        </p>
      );
    } else {
      blocks.push(
        <p key={`p-${index}-${blocks.length}`}>
          {renderInlineMarkdown(chunk.text, setupStyleSlugs.has(articleSlug))}
        </p>
      );
    }
  };

  const flushParagraph = () => {
    if (!paragraphLines.length) {
      return;
    }

    const paragraph = paragraphLines.join(" ");

    if (
      articleSlug === "building-ai-operating-systems" &&
      operatingSystemIntroIndex >= 0 &&
      paragraph === operatingSystemSourceIntroParagraphs[operatingSystemIntroIndex]
    ) {
      operatingSystemIntroIndex += 1;
      if (operatingSystemIntroIndex >= operatingSystemSourceIntroParagraphs.length) {
        operatingSystemIntroIndex = -1;
      }
      paragraphLines = [];
      lastBlockWasQuote = false;
      return;
    }

    if (articleSlug === "ai-set-up-guide" && paragraph.startsWith("Top Tip:")) {
      blocks.push(
        <p className="insight-setup-tip" key={`tip-${index}-${blocks.length}`}>
          <b>Top tip</b>
          {renderInlineMarkdown(paragraph.slice(8).trim(), true)}
        </p>
      );
      blocks.push(
        <ArticleSetupFigure
          alt="Key files: CLAUDE.md, USER.md, NOW.md, STATUS.md and memory.md"
          caption="Key files"
          key="setup-figure-key-files"
          maxWidth={520}
          src="/insights/ai-set-up-guide/key-files.png"
        />
      );
      lastBlockWasQuote = false;
      paragraphLines = [];
      return;
    }

    const signal = getArticleSignal(paragraph);
    const sourceSubheading = getSourceSubheading(paragraph);
    const toolEntry = toolDirectoryArticleSlugs.has(articleSlug) ? getToolEntry(paragraph) : null;

    if (signal) {
      blocks.push(<ArticleSignalBlock key={`signal-${index}-${blocks.length}`} signal={signal} />);
      lastBlockWasQuote = false;
    } else if (sourceSubheading) {
      blocks.push(
        <h2 className="insight-article-source-subheading" key={`subheading-${index}-${blocks.length}`}>
          {sourceSubheading}
        </h2>
      );
      lastBlockWasQuote = false;
    } else if (toolEntry) {
      toolIndex += 1;
      blocks.push(
        <ArticleToolEntry
          description={toolEntry.description}
          index={toolIndex}
          key={`tool-${index}-${blocks.length}`}
          tip={toolEntry.tip}
          title={toolEntry.title}
          use={toolEntry.use}
        />
      );
      lastBlockWasQuote = false;
    } else if (shouldRenderPredictionBlock(articleSlug, paragraph)) {
      predictionIndex += 1;
      blocks.push(
        <ArticlePredictionBlock
          index={predictionIndex}
          key={`prediction-${index}-${blocks.length}`}
          text={paragraph}
        />
      );
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
      getParagraphChunks(articleSlug, paragraph).forEach(pushParagraphChunk);
      lastBlockWasQuote = false;
    }

    if (
      articleSlug === "firecrawl-for-business" &&
      paragraph.includes("categry has unoccupied whitespace ready for the redbull of that sector to fill the gap?")
    ) {
      blocks.push(<FirecrawlWorkflowDiagram key="firecrawl-workflow-diagram" />);
    }

    if (
      articleSlug === "building-ai-operating-systems" &&
      paragraph === "For success in 2026- your AI operating system needs three things:"
    ) {
      blocks.push(<OperatingSystemFrameworkDiagram key="operating-system-framework-diagram" />);
      operatingSystemIntroIndex = 0;
    }

    if (
      articleSlug === "what-is-an-ai-skill" &&
      paragraph.startsWith("*The official /last30days skill now includes")
    ) {
      blocks.push(<Last30DaysContextCard key="last30days-context-card" />);
    }

    if (
      articleSlug === "what-is-an-ai-skill" &&
      paragraph.startsWith("Behind these angles are frameworks")
    ) {
      blocks.splice(blocks.length - 1, 0, <PositioningAnglesTable key="positioning-angles-table" />);
    }

    if (articleSlug === "how-to-master-seo-ai-search-2026") {
      if (paragraph.startsWith("If your name comes up-")) {
        blocks.push(
          <ArticleSetupFigure
            alt="SEO ranks you in a list of links the user still has to choose from; AI SEO names you inside the answer itself, so the model chooses you before the user clicks anywhere"
            caption="The difference in one glance"
            key="ai-search-figure-difference"
            src="/insights/how-to-master-seo-ai-search-2026/difference-in-one-glance.png"
          />
        );
      }
      if (paragraph.startsWith("Then it answers.")) {
        blocks.push(
          <ArticleSetupFigure
            alt="How AI search answers: the question goes in, the AI runs searches, reads what already ranks in search, and names the firms the public web agrees on"
            caption="How AI search answers"
            key="ai-search-figure-mechanism"
            src="/insights/how-to-master-seo-ai-search-2026/how-ai-search-answers.png"
          />
        );
      }
    }

    if (articleSlug === "ai-set-up-guide") {
      if (paragraph === "Don't spend an afternoon designing this. It grows as you use it.") {
        blocks.push(
          <ArticleSetupFigure
            alt="The set up at a glance: Claude or Codex working from one main folder holding the instruction files and project folders, with connected tools alongside"
            caption="The set up, at a glance"
            key="setup-figure-hero"
            src="/insights/ai-set-up-guide/setup-at-a-glance.png"
          />
        );
      }
      if (paragraph.startsWith("Your enterprise set up will give the full organization")) {
        blocks.push(
          <ArticleSetupFigure
            alt="Your skills pushed to a shared repository, made into a plugin, and installed by the whole team on the same version"
            caption="One repository, one plugin, one version for everyone"
            key="setup-figure-team"
            maxWidth={700}
            src="/insights/ai-set-up-guide/team.png"
          />
        );
      }
    }

    paragraphLines = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    const isHeading = /^#{1,3}\s/.test(trimmed);

    if (isSkippingHiddenSection && !isHeading) {
      index += 1;
      continue;
    }

    if (isHeading) {
      isSkippingHiddenSection = false;
    }

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      lastBlockWasQuote = false;
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
        if (shouldHideSourceSection(articleSlug, heading)) {
          isSkippingHiddenSection = true;
          lastBlockWasQuote = false;
          index += 1;
          continue;
        }
        if (shouldShowSourceHeading(articleSlug, heading)) {
          blocks.push(
            <ArticleHeading heading={getSourceHeadingDisplay(articleSlug, heading)} key={`h1-${index}`} />
          );
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
        if (isArticleClosingCtaHeading(articleSlug, heading)) {
          const ctaParagraphs: string[] = [];
          let currentCtaParagraph: string[] = [];

          const flushCtaParagraph = () => {
            if (currentCtaParagraph.length) {
              ctaParagraphs.push(currentCtaParagraph.join(" "));
              currentCtaParagraph = [];
            }
          };

          index += 1;

          while (index < lines.length) {
            const nextTrimmed = lines[index].trim();
            if (/^#{1,3}\s/.test(nextTrimmed)) {
              break;
            }
            if (!nextTrimmed || nextTrimmed === "---") {
              flushCtaParagraph();
              index += 1;
              continue;
            }
            currentCtaParagraph.push(nextTrimmed);
            index += 1;
          }

          flushCtaParagraph();
          blocks.push(<ArticleClosingCta heading={heading} key={`cta-${index}`} paragraphs={ctaParagraphs} />);
          lastBlockWasQuote = false;
          continue;
        }
        if (shouldHideSourceSection(articleSlug, heading)) {
          isSkippingHiddenSection = true;
          lastBlockWasQuote = false;
          index += 1;
          continue;
        }
        if (shouldShowSourceHeading(articleSlug, heading)) {
          blocks.push(
            <ArticleHeading heading={getSourceHeadingDisplay(articleSlug, heading)} key={`h2-${index}`} />
          );
          lastBlockWasQuote = false;
          if (articleSlug === "how-to-master-seo-ai-search-2026" && heading === "How to get named") {
            blocks.push(
              <ArticleSetupFigure
                alt="How to get named: answer questions plainly, name your sources, make it machine-readable, get mentioned elsewhere, keep details consistent, check monthly"
                caption="How to get named, at a glance"
                key="ai-search-figure-named"
                src="/insights/how-to-master-seo-ai-search-2026/how-to-get-named.png"
              />
            );
          }
        }
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      const heading = cleanSourceHeading(trimmed.slice(4));
      if (shouldHideSourceSection(articleSlug, heading)) {
        isSkippingHiddenSection = true;
        lastBlockWasQuote = false;
        index += 1;
        continue;
      }
      if (shouldShowSourceHeading(articleSlug, heading)) {
        blocks.push(<h3 key={`h3-${index}`}>{getSourceHeadingDisplay(articleSlug, heading)}</h3>);
        lastBlockWasQuote = false;
      }
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      const quoteLines: string[] = [];

      while (index < lines.length) {
        const currentLine = lines[index].trim();
        if (!currentLine.startsWith(">")) {
          break;
        }
        quoteLines.push(currentLine.replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(<ArticleQuotedBlock accentArrows={setupStyleSlugs.has(articleSlug)} key={`quote-block-${index}-${blocks.length}`} lines={quoteLines} />);
      lastBlockWasQuote = false;
      continue;
    }

    if (articleSectionHeadingsBySlug[articleSlug]?.has(trimmed)) {
      flushParagraph();
      blocks.push(
        <h2
          className={`insight-article-section-heading${articleSlug === "firecrawl-for-business" ? " is-accent" : ""}`}
          key={`section-heading-${index}`}
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
        <ul className="insight-article-source-list" key={`ul-${index}`}>
          {items.map((item) => (
            <li key={`${item.marker}-${item.text}`}>
              <span aria-hidden="true">{item.marker}</span>
              <ArticleListItemBody articleSlug={articleSlug} text={item.text} />
            </li>
          ))}
        </ul>
      );
      lastBlockWasQuote = false;
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+[\.)])\s*(.*)$/);

    if (orderedMatch) {
      flushParagraph();
      const items: Array<{ marker: string; text: string }> = [];

      while (index < lines.length) {
        const currentMatch = lines[index].trim().match(/^(\d+[\.)])\s*(.*)$/);
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
        <ol
          className={[
            "insight-article-source-list",
            "is-numbered",
            articleSlug === "chatgpt-for-business-owners" ? "is-playbook-list" : "",
            articleSlug === "ai-future-of-work" ? "is-action-list" : "",
            articleSlug === "building-ai-operating-systems" ? "is-os-checklist" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          key={`ol-${index}`}
        >
          {items.map((item) => (
            <li key={`${item.marker}-${item.text}`}>
              <span aria-hidden="true">{item.marker}</span>
              <ArticleListItemBody articleSlug={articleSlug} text={item.text} />
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
      <ArticleSchema article={article} />
      {article.faq?.length ? <FaqSchema items={article.faq} /> : null}
      <PageReveals />
      <article className={`home-4b insight-article-page${setupStyleSlugs.has(article.slug) ? " is-setup-guide" : ""}`}>
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
              <InsightShareButton title={article.title} url={`${siteUrl}${getInsightPath(article)}`} />
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
