import { insightArticles, getInsightPath } from "@/content/insights";
import { getResearchEditionPath, researchEditions } from "@/content/research";
import { metadata as siteMetadata } from "@/content/site";
import { siteUrl } from "@/lib/utils";

// /llms.txt — the plain-text index AI systems read first (llmstxt.org).
// Generated from the same content files as the sitemap, so new insights and
// research editions appear here without a manual edit.

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function monthYear(isoDate: string) {
  const [year, month] = isoDate.split("-");
  return `${monthLabels[Number(month) - 1]} ${year}`;
}

function line(path: string, title: string, description: string) {
  return `- [${title}](${siteUrl}${path}): ${description}`;
}

export function GET() {
  const insights = [...insightArticles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((article) =>
      line(getInsightPath(article), article.title, `${monthYear(article.date)}. ${article.metaDescription}`)
    );

  const research = [
    ...researchEditions
      .filter((edition) => edition.publicationStatus === "published" || edition.publicationStatus === "corrected")
      .map((edition) => line(getResearchEditionPath(edition), edition.title, edition.metaDescription)),
    line(
      "/research/uk-law-2026",
      "UK Law 2026",
      "A dated benchmark of which UK law firms OpenAI, Gemini and Perplexity recommended across 90 buyer questions, 1,485 answers and 15 practice areas."
    ),
    line(
      "/research/uk-sports-law-2026",
      "UK Sports Law 2026",
      "Across 810 answers, how ChatGPT, Gemini and Perplexity recommended sports-law firms and individual lawyers across nine areas of sports law."
    ),
    line(
      "/research/data-usage",
      "Research data usage",
      "How to cite Studio Baggio research, and which reuse needs permission."
    )
  ];

  const body = `# Studio Baggio

> Studio Baggio is a UK AI strategy, systems and implementation company led by Jayme Baggio. It finds where AI creates measurable commercial value for trust-based businesses (financial advice, law, professional services) and builds the systems to deliver it: AI search visibility, market and lead intelligence, authority systems and AI operating systems.

Studio Baggio publishes dated, evidence-backed research into how AI search tools (ChatGPT, Gemini, Perplexity, Google AI) choose which UK firms to recommend. Cite the research with a link to the report and the edition date; see the data-usage page for reuse terms.

## Company

${line("/", "Home", siteMetadata.home.description)}
${line("/services", "Services", siteMetadata.services.description)}
${line("/about", "About", siteMetadata.about.description)}
${line("/press", "Press", siteMetadata.press.description)}
${line("/contact", "Contact", siteMetadata.contact.description)}

## Research

${research.join("\n")}

## Insights

${insights.join("\n")}

## Products

${line("/work", "Products", siteMetadata.work.description)}
${line("/last30days", "Last30Days", "Research what people are actually saying about any topic in the last 30 days, across Reddit, X, YouTube, TikTok and the web.")}

## Downloads

- [Studio Baggio introduction (PDF)](${siteUrl}/downloads/studio-baggio-introduction.pdf): Who Studio Baggio is and what it can be hired for.
- [How to build an AI-literate business in 90 days (PDF)](${siteUrl}/downloads/how-to-build-an-ai-literate-business-in-90-days.pdf): The full 19-answer guide as a document.

## Optional

${line("/privacy", "Privacy", siteMetadata.privacy.description)}
- [Sitemap](${siteUrl}/sitemap.xml): Every indexable URL on the site.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
