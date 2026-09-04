import type { Metadata } from "next";
import { ResearchContextSection } from "@/components/research/research-context-section";
import {
  LawMethodDrawer,
  LawQuestionExplorer,
  type LawEntity,
  type LawLegal500Ranking,
  type LawQuestion
} from "@/components/research/law-report-explorers";
import { LawRankedTable } from "@/components/research/law-ranked-table";
import lawLegal500Benchmark from "@/data/law-legal500-benchmark.json";
import lawReportData from "@/data/law-report-data.json";
import findings from "@/data/law-locked-findings.json";
import { pageMetadata } from "@/lib/metadata";
import { researchDataLicense } from "@/lib/research-schema";
import { siteUrl } from "@/lib/utils";

const h = findings.headline;
const t1f = findings.tier1FirmsWithZeroArea;
const overall = findings.overallLeaders;
// The 16 Aug claims gate reviewed the visible broad-question extract, which excludes
// three Mishcon mentions beyond that extract from the public recommendation count.
const namedAnswerOverrides = {
  "Mishcon de Reya": {
    "LAW-BEST-02": 4,
    "LAW-BEST-10": 4
  }
};

// The capture recorded this firm as "Lawrence Stephens", while the Legal 500
// comparison row uses "Lawrence Stephens Solicitors". These reviewed counts
// restore the five exact-name recommendations that the original merge omitted.
const lawrenceStephensRecommendationCounts: Record<string, number> = {
  "LAW-SPT-01": 2,
  "LAW-SPT-02": 2,
  "LAW-SPT-03": 1
};

function withLawrenceStephensRecommendations(source: LawQuestion[]): LawQuestion[] {
  return source.map((question) => {
    const count = lawrenceStephensRecommendationCounts[question.id];
    if (!count) return question;

    const named = question.named.some((firm) => firm.name === "Lawrence Stephens")
      ? question.named
      : [...question.named, { name: "Lawrence Stephens", count }]
          .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, "en-GB"));
    const firms = question.firms.some((firm) => firm.name === "Lawrence Stephens")
      ? question.firms
      : [
          ...question.firms,
          {
            name: "Lawrence Stephens",
            namedAnswers: count,
            citedAnswers: 0,
            citationInstances: 0,
            pages: []
          }
        ];

    return { ...question, named, firms };
  });
}

const route = "/research/uk-law-2026";
const title = "UK Law Firms in AI Search 2026 | Studio Baggio Research";
const description =
  "Across 1,485 AI answers, 24 of 85 Tier 1 firms received no recommendation in at least one top-ranked practice area, while firms outside Tier 1 led 31 of 75 legal problems.";
const openGraphImage = `${siteUrl}${route}/opengraph-image`;

export const metadata: Metadata = {
  ...pageMetadata({ title, description, path: route }),
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "Studio Baggio",
    url: `${siteUrl}${route}`,
    title,
    description,
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: "UK Law Firms in AI Search 2026 — Studio Baggio Research"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [openGraphImage]
  }
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const lawReportSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "@id": `${siteUrl}${route}#dataset`,
      name: "Studio Baggio UK Law Firms in AI Search 2026",
      description:
        "A dated benchmark of which UK law firms OpenAI, Gemini and Perplexity recommended across 90 buyer questions, 1,485 answers and 15 practice areas.",
      url: `${siteUrl}${route}`,
      creator: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      publisher: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      dateCreated: "2026-08-15",
      dateModified: "2026-08-21",
      temporalCoverage: "2026-08-15",
      spatialCoverage: "United Kingdom",
      keywords: [
        "UK law firms",
        "legal services",
        "AI search",
        "OpenAI",
        "Gemini",
        "Perplexity",
        "Legal 500",
        "law firm marketing",
        "AI visibility"
      ],
      measurementTechnique:
        "Studio Baggio tested 90 high-intent buyer questions across 15 UK legal practice areas using OpenAI, Gemini and Perplexity. The study reviewed 1,485 grounded answers and compared recommendations on 75 specific legal problems with Legal 500 rankings.",
      variableMeasured: [
        "law firm named per answer",
        "source link supplied per answer",
        "question breadth",
        "provider breadth",
        "Legal 500 ranking comparison"
      ],
      isAccessibleForFree: true,
      license: researchDataLicense()
    },
    {
      "@type": "Article",
      "@id": `${siteUrl}${route}#article`,
      headline: "UK Law Firms in AI Search 2026",
      description,
      image: openGraphImage,
      author: { "@type": "Person", name: "Jayme Baggio", url: `${siteUrl}/about` },
      publisher: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      datePublished: "2026-08-16",
      dateModified: "2026-08-21",
      mainEntityOfPage: `${siteUrl}${route}`,
      about: { "@id": `${siteUrl}${route}#dataset` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${route}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Research",
          item: `${siteUrl}/research`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "UK Law Firms in AI Search 2026",
          item: `${siteUrl}${route}`
        }
      ]
    }
  ]
};

export default function UkLawReportPage() {
  const questions = withLawrenceStephensRecommendations(lawReportData.questions as LawQuestion[]);
  const legal500Rankings = lawLegal500Benchmark.practices.flatMap((practice) =>
    practice.rankedFirms.map((firm) => ({
      canonicalName:
        firm.legal500Name === "Lawrence Stephens Solicitors"
          ? "Lawrence Stephens"
          : firm.canonicalName ?? firm.legal500Name,
      legal500Name: firm.legal500Name,
      area: practice.area,
      tier: firm.bestTier,
      categories: firm.categories.map((category) => category.category)
    }))
  ) as LawLegal500Ranking[];
  const lawrenceStephensEntity: LawEntity = {
    name: "Lawrence Stephens",
    aliases: ["Lawrence Stephens Solicitors"],
    domains: ["lawrencestephens.com"],
    kind: "firm",
    namedAnswers: 5,
    citedAnswers: 0,
    citationInstances: 0,
    questionCount: 3,
    appearances: questions
      .filter((question) => lawrenceStephensRecommendationCounts[question.id])
      .map((question) => ({
        questionId: question.id,
        question: question.question,
        area: question.area,
        type: question.type,
        namedAnswers: lawrenceStephensRecommendationCounts[question.id],
        citedAnswers: 0,
        citationInstances: 0,
        providers: ["Gemini"],
        pages: []
      }))
  };
  const entities = [
    ...(lawReportData.entities as LawEntity[]).filter((entity) => entity.name !== "Lawrence Stephens"),
    lawrenceStephensEntity
  ];
  const firmsTracked = entities.filter((entity) => entity.namedAnswers || entity.citedAnswers).length;
  const areas = lawLegal500Benchmark.practices.map((practice) => practice.area).sort();

  return (
    <main className="home-4b research-page fa3-report law-report" data-research-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(lawReportSchema) }} />
      <header className="fa3-masthead law-report__masthead">
        <div className="editorial-container fa3-masthead__grid">
          <div className="fa3-masthead__title">
            <p className="fa3-kicker">How AI chooses UK law firms · Benchmark, first edition</p>
            <h1>UK Law Firms in AI Search 2026<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-masthead__intro">
            <div className="fa3-masthead__copy">
              <p className="fa3-masthead__standfirst">
                We asked 90 high intent buyer questions and reviewed 1,485 AI answers to build a map
                of how ChatGPT, Gemini and Perplexity recommend firms across 15 areas of UK law.
              </p>
              <p>
                Find out which firms AI recommends, which sources shape those answers and how that
                compares with established legal rankings. The benchmark will be rerun to track how
                AI visibility changes over time.
              </p>
            </div>
            <div className="fa3-masthead__meta" aria-label="Study summary">
              <span><strong>90</strong> buyer questions</span>
              <span><strong>1,485</strong> AI answers</span>
              <span><strong>15</strong> practice areas</span>
              <span><strong>{firmsTracked}</strong> firms tracked</span>
            </div>
            <LawMethodDrawer />
          </div>
        </div>
      </header>

      <section className="fa3-section fa3-executive" aria-labelledby="law-findings-title">
        <div className="editorial-container">
          <p className="fa3-kicker">What we found</p>
          <h2 id="law-findings-title" className="law-report__visually-hidden">Three findings</h2>
          <div className="law-report__found law-report__found--plain">
            <div>
              <h3>{t1f.count} top-ranked firms were invisible in their own practice area.</h3>
              <p>
                {t1f.count} of the {t1f.total} firms with a Legal 500 tier-1 ranking got no AI recommendation
                at all in a practice area they are ranked top for. Clifford Chance, Slaughter and May,
                Norton Rose Fulbright and Mayer Brown, all tier 1 for commercial property, were not
                named on a single property question.
              </p>
            </div>
            <div>
              <h3>{h.notTier1} of 75 high intent buyer questions were won by a firm outside tier 1.</h3>
              <p>
                Landau Law over BDBF on a discriminatory bonus cut; Higgs over Farrer &amp; Co on a
                contested will; Clarke Willmott and Wedlake Bell over Shoosmiths on an unpaid debt.
              </p>
            </div>
            <div>
              <h3>Mishcon de Reya was the most-recommended firm overall.</h3>
              <p>
                Named in 240 of 810 answers and appearing on {overall.rows[0].problems}{" "}of the 75
                legal problems, ahead of Herbert Smith Freehills Kramer, CMS, Freshfields and
                A&amp;O Shearman.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResearchContextSection
        titleId="law-context-title"
        heading="AI is becoming part of how prospective clients choose law firms"
      />

      <div className="editorial-container law-report__bench-head">
        <p className="fa3-kicker">Search the benchmark</p>
        <h2>Search your firm.</h2>
        <p>
          Every UK law firm the study recorded, with its Legal 500 tier.
        </p>
      </div>
      <LawRankedTable
        entities={entities}
        legal500Rankings={legal500Rankings}
        areas={areas}
        namedAnswerOverrides={namedAnswerOverrides}
      />

      <LawQuestionExplorer questions={questions} />
    </main>
  );
}
