import type { Metadata } from "next";
import { ResearchAuditCta } from "@/components/research";
import {
  SportsEntityExplorer,
  SportsLawMethodDrawer,
  SportsQuestionExplorer,
  type SportsEntity,
  type SportsQuestion
} from "@/components/research/sports-law-report-explorers";
import sportsReportData from "@/data/sports-law-report-data.json";
import { pageMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

type SportSummary = {
  sport_block: string;
  sportLabel: string;
  answers: number;
  top_firm: Array<{ name: string; answers: number; questions: number }>;
  top_lawyer: Array<{ name: string; answers: number; questions: number }>;
  top_chambers: Array<{ name: string; answers: number; questions: number }>;
};

type SportsReportData = {
  captureDate: string;
  denominators: {
    questions: number;
    answers: number;
    platforms: number;
    repetitions: number;
    sports: number;
    panelFirms: number;
    sourceLinks: number;
  };
  headline: {
    panelFirmsNeverNamed: number;
    panelFirmCount: number;
    directorySourceLinks: number;
    questionsWithFirmInAtLeastFiveAnswers: number;
    questionsWithFirmInAtLeastSevenAnswers: number;
    overseasNamedAnswers: number;
    overseasQuestionBreadth: number;
  };
  sports: SportSummary[];
  entities: SportsEntity[];
  questions: SportsQuestion[];
};

const report = sportsReportData as unknown as SportsReportData;
const sportResults = [
  { sport: "Football", firms: [{ name: "Stewarts", answers: 26 }, { name: "Centrefield", answers: 25 }, { name: "Brabners", answers: 23 }] },
  { sport: "Rugby", firms: [{ name: "Brabners", answers: 57 }, { name: "Morgan Sports Law", answers: 36 }, { name: "Rylands Garth", answers: 23 }] },
  { sport: "Cricket", firms: [{ name: "Brabners", answers: 57 }, { name: "Onside Law", answers: 19 }, { name: "Bird & Bird / Morgan Sports Law", answers: 17 }] },
  { sport: "Boxing", firms: [{ name: "Morgan Sports Law", answers: 22 }, { name: "Lawrence Stephens", answers: 17 }, { name: "Blackstone Solicitors / Sentient Law", answers: 16 }] },
  { sport: "Motorsport", firms: [{ name: "Penningtons Manches Cooper", answers: 46 }, { name: "Sarah Franklin Solicitors", answers: 34 }, { name: "Sentient Law", answers: 24 }] },
  { sport: "Tennis", firms: [{ name: "Morgan Sports Law", answers: 42 }, { name: "Onside Law", answers: 35 }, { name: "Global Sports Advocates", answers: 27 }] },
  { sport: "Golf", firms: [{ name: "Onside Law", answers: 20 }, { name: "Quinn Emanuel", answers: 17 }, { name: "Geldards / Global Sports Advocates / Lewis Silkin", answers: 13 }] },
  { sport: "Horseracing", firms: [{ name: "Ashfords", answers: 54 }, { name: "Gardner Leader", answers: 42 }, { name: "RWK Goodman", answers: 37 }] },
  { sport: "General sports disputes", firms: [{ name: "Morgan Sports Law", answers: 35 }, { name: "Global Sports Advocates", answers: 34 }, { name: "Bird & Bird", answers: 32 }] }
];
const openQuestionIds = new Set([
  "SL-BOX-03",
  "SL-BOX-04",
  "SL-BOX-05",
  "SL-BOX-06",
  "SL-BOX-09",
  "SL-BOX-09",
  "SL-FBL-04",
  "SL-FBL-07",
  "SL-GEN-10",
  "SL-GLF-02",
  "SL-GLF-03",
  "SL-GLF-04",
  "SL-GLF-06",
  "SL-GLF-07",
  "SL-TEN-10"
]);
const openQuestions = report.questions.filter((question) => openQuestionIds.has(question.id));
const featuredOpenQuestionIds = [
  "SL-FBL-07",
  "SL-FBL-04",
  "SL-BOX-03",
  "SL-BOX-04",
  "SL-BOX-05",
  "SL-BOX-06",
  "SL-TEN-10",
  "SL-GLF-03",
  "SL-GLF-06"
];
const featuredOpenQuestionLabels: Record<string, string> = {
  "SL-FBL-07": "A football agent owed commission by a player",
  "SL-FBL-04": "A footballer owed wages by their club",
  "SL-BOX-03": "A boxer disputing their manager",
  "SL-BOX-04": "A boxer owed their fight purse",
  "SL-BOX-05": "A British Boxing Board disciplinary hearing",
  "SL-BOX-06": "A boxer appealing a licence suspension",
  "SL-BOX-09": "A boxing promoter in a broadcast-contract dispute",
  "SL-TEN-10": "A tennis player in a sponsorship dispute",
  "SL-GLF-03": "A professional golfer in a tour, agent or appearance-fee dispute",
  "SL-GLF-06": "A golfer refused permission to play in a competing event"
};
const featuredOpenQuestions = featuredOpenQuestionIds
  .map((id) => openQuestions.find((question) => question.id === id))
  .filter((question): question is SportsQuestion => Boolean(question));

export const metadata: Metadata = {
  ...pageMetadata({
    title: "UK Sports Law in AI Search 2026 | Studio Baggio Research",
    description:
      "Across 810 answers, see how ChatGPT, Gemini and Perplexity recommended sports-law firms and individual lawyers across nine areas of sports law.",
    path: "/research/uk-sports-law-2026"
  }),
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "Studio Baggio",
    url: `${siteUrl}/research/uk-sports-law-2026`,
    title: "UK Sports Law in AI Search 2026",
    description:
      "Across 810 answers, see how ChatGPT, Gemini and Perplexity recommended sports-law firms and individual lawyers across nine areas of sports law.",
    images: [
      {
        url: `${siteUrl}/research/uk-sports-law-2026/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "UK Sports Law in AI Search 2026 — Studio Baggio Research"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Sports Law in AI Search 2026",
    description:
      "Across 810 answers, see how ChatGPT, Gemini and Perplexity recommended sports-law firms and individual lawyers across nine areas of sports law.",
    images: [`${siteUrl}/research/uk-sports-law-2026/opengraph-image`]
  }
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const sportsLawSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "@id": `${siteUrl}/research/uk-sports-law-2026#dataset`,
      name: "Studio Baggio UK Sports Law in AI Search 2026",
      description:
        "A dated benchmark of how ChatGPT, Gemini and Perplexity recommended sports-law firms and individual lawyers across 90 buyer questions and 810 answers in nine areas of sports law.",
      url: `${siteUrl}/research/uk-sports-law-2026`,
      creator: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      publisher: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      dateCreated: "2026-08-15",
      dateModified: "2026-08-16",
      temporalCoverage: "2026-08-15",
      spatialCoverage: "United Kingdom",
      keywords: [
        "sports law",
        "sports lawyers",
        "AI search",
        "ChatGPT",
        "Gemini",
        "Perplexity",
        "law firm marketing",
        "AI visibility"
      ],
      measurementTechnique:
        "Ten buyer questions in each of nine sports-law specialisms were put to ChatGPT, Gemini and Perplexity three times with grounded web search enabled, producing nine answers per question and 810 answers in total. Firms, individual lawyers and chambers named in each answer were recorded once per answer, together with the source links supplied by each platform.",
      variableMeasured: [
        "firm named per answer",
        "individual lawyer named per answer",
        "chambers named per answer",
        "source link supplied per answer"
      ],
      isAccessibleForFree: true,
      license: `${siteUrl}/research/uk-sports-law-2026`
    },
    {
      "@type": "Article",
      "@id": `${siteUrl}/research/uk-sports-law-2026#article`,
      headline: "UK Sports Law in AI Search 2026",
      description:
        "Across 810 answers, Studio Baggio tracked how ChatGPT, Gemini and Perplexity recommended firms and individual lawyers across nine areas of sports law.",
      author: { "@type": "Person", name: "Jayme Baggio", url: `${siteUrl}/about` },
      publisher: { "@type": "Organization", name: "Studio Baggio Ltd", url: siteUrl },
      datePublished: "2026-08-16",
      dateModified: "2026-08-16",
      mainEntityOfPage: `${siteUrl}/research/uk-sports-law-2026`,
      about: { "@id": `${siteUrl}/research/uk-sports-law-2026#dataset` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/research/uk-sports-law-2026#breadcrumbs`,
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
          name: "UK Sports Law in AI Search 2026",
          item: `${siteUrl}/research/uk-sports-law-2026`
        }
      ]
    }
  ]
};

export default function UkSportsLawReportPage() {
  const h = report.headline;
  return (
    <main className="home-4b research-page fa3-report law-report sports-law-report" data-research-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(sportsLawSchema) }} />
      <header className="fa3-masthead law-report__masthead sports-law-report__masthead">
        <div className="editorial-container fa3-masthead__grid">
          <div className="fa3-masthead__title">
            <p className="fa3-kicker">UK Sports Law in AI Search · Benchmark, first edition</p>
            <h1>UK Sports Law in AI Search 2026<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-masthead__intro">
            <div className="fa3-masthead__copy">
              <p className="fa3-masthead__standfirst">
                Across 810 answers, we tracked how ChatGPT, Gemini and Perplexity recommended firms
                and individual lawyers across nine areas of sports law.
              </p>
              <p>
                The study shows which names appear most often, which established firms are absent,
                and where the market looks different from the traditional sports-law hierarchy.
              </p>
              <p className="sports-law-report__masthead-stats">
                90 questions · 810 answers · 9 sports · 89 established firms reviewed
              </p>
            </div>
            <SportsLawMethodDrawer />
          </div>
        </div>
      </header>

      <section className="fa3-section fa3-executive sports-law-report__lead-finding" aria-labelledby="sports-findings-title">
        <div className="editorial-container fa3-executive__grid">
          <div className="fa3-executive__statement">
            <p className="fa3-kicker">Headline finding</p>
            <h2 id="sports-findings-title">AI is producing a different sports-law hierarchy.</h2>
          </div>
          <div className="fa3-executive__evidence">
            <p className="sports-law-report__absence-fact">
              Some established firms were completely absent, while firms outside the original
              comparison group, barristers&rsquo; chambers and individual lawyers appeared repeatedly.
            </p>
            <ul className="sports-law-report__hierarchy-proof">
              <li><strong>Global Sports Advocates</strong><span>appeared more often than 85 of the 89 established firms.</span></li>
              <li><strong>Blackstone Chambers</strong><span>was the most frequently named legal organisation overall.</span></li>
              <li><strong>22 of 89</strong><span>established firms were never named.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fa3-section sports-law-report__individuals" aria-labelledby="sports-individuals-title">
        <div className="editorial-container">
          <div className="sports-law-report__individuals-top">
            <header className="sports-law-report__individual-heading">
              <p className="fa3-kicker">Individual lawyers</p>
              <h2 id="sports-individuals-title">Individual lawyers ranked above almost every established firm.</h2>
              <p className="sports-law-report__individual-summary">
                Nick De Marco KC and Mike Morgan were each named more often than 85 of the 89
                established firms in the benchmark. For sports lawyers and specialist firms,
                strong individual partner profiles can materially increase the chances of being
                recommended to prospective clients.
              </p>
            </header>
            <ol className="sports-law-report__lawyer-leaderboard">
              <li><span>01</span><div><strong>Nick De Marco KC</strong><small>Barrister · Blackstone Chambers</small></div><p><b>119 answers</b><small>55 of 90 questions</small></p></li>
              <li><span>02</span><div><strong>Mike Morgan</strong><small>Founding Partner · Morgan Sports Law</small></div><p><b>108 answers</b><small>46 of 90 questions</small></p></li>
              <li><span>03</span><div><strong>Adam Lewis KC</strong><small>Barrister · Blackstone Chambers</small></div><p><b>50 answers</b><small>31 of 90 questions</small></p></li>
            </ol>
          </div>
          <p className="sports-law-report__specialist-intro">Individual lawyers also stood out in particular sports:</p>
          <ul className="sports-law-report__specialist-lawyers">
            <li><div><strong>Rory Mac Neice</strong><small>Partner · Ashfords</small></div><span>Horseracing</span><p>42 answers</p></li>
            <li><div><strong>Sarah Franklin</strong><small>Solicitor · Sarah Franklin Solicitors</small></div><span>Motorsport</span><p>34 answers</p></li>
            <li><div><strong>George A. Gallegos</strong><small>Founder · Gallegos Boxing &amp; Sports Law</small></div><span>Boxing</span><p>30 answers</p></li>
            <li><div><strong>Howard Jacobs</strong><small>Attorney · Law Offices of Howard L. Jacobs</small></div><span>Tennis</span><p>29 answers</p></li>
            <li><div><strong>Ben Cisneros</strong><small>Associate · Morgan Sports Law</small></div><span>Rugby</span><p>28 answers</p></li>
          </ul>
        </div>
      </section>

      <section className="fa3-section fa3-credit-gap sports-law-report__why" aria-labelledby="sports-why-title">
        <div className="editorial-container">
          <header className="fa3-section-heading sports-law-report__why-header">
            <div>
              <p className="fa3-kicker">Why this matters now</p>
              <h2 id="sports-why-title">AI is already influencing which lawyers enter the client shortlist.</h2>
            </div>
            <div className="sports-law-report__why-context">
              <p>
                <strong>58% of consumers</strong> have replaced traditional search
                engines with generative AI tools for product and service recommendations.
              </p>
              <p className="sports-law-report__source-note">
                Source: <a href="https://www.capgemini.com/gb-en/news/press-releases/71-of-consumers-want-generative-ai-integrated-into-their-shopping-experiences/" target="_blank" rel="noreferrer">Capgemini Research Institute, 2025</a>.
              </p>
            </div>
          </header>
          <p className="sports-law-report__why-conclusion">
            When a player, agent or club asks AI who can help with a legal problem, the firms named
            in the answer can enter the shortlist before the client reaches a law firm&rsquo;s website.
          </p>
        </div>
      </section>

      <section className="fa3-section sports-law-report__leaders" aria-labelledby="sports-leaders-title">
        <div className="editorial-container">
          <header className="sports-law-report__leaders-heading">
            <div>
              <p className="fa3-kicker">Results by sport</p>
              <h2 id="sports-leaders-title">Leading firms by sports specialism</h2>
            </div>
            <p>We tested 10 buyer questions in each sports specialism and ranked the firms named most often across the 90 resulting answers.</p>
          </header>
          <div className="sports-law-report__sport-results" aria-label="Most-recommended firms in each sport">
            {sportResults.map((result) => (
              <article key={result.sport}>
                <h3>{result.sport}</h3>
                <ol>
                  {result.firms.map((firm, firmIndex) => (
                    <li key={`${result.sport}-${firm.name}`}>
                      <span>{firm.name}</span>
                      <strong>{firm.answers}{firmIndex === 0 ? " answers" : ""}</strong>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
          <p className="sports-law-report__winner-note">
            The gap between first and second place varied widely. Rugby, cricket, horseracing and
            motorsport had stronger leaders than football, boxing and golf.
          </p>
        </div>
      </section>

      <section className="fa3-section sports-law-report__overseas" aria-labelledby="sports-overseas-title">
        <div className="editorial-container sports-law-report__overseas-grid">
          <div>
            <p className="fa3-kicker">Overseas lawyers</p>
            <h2 id="sports-overseas-title">UK clients are being shown overseas sports lawyers.</h2>
          </div>
          <div className="sports-law-report__overseas-copy">
            <p>
              Overseas firms or lawyers appeared in at least {h.overseasNamedAnswers} of the {report.denominators.answers} answers,
              across {h.overseasQuestionBreadth} of the 90 questions.
            </p>
            <p>They appeared most often in:</p>
            <ul className="sports-law-report__overseas-breakdown">
              <li><strong>Tennis</strong><span>38 of 90 answers</span></li>
              <li><strong>General sports disputes</strong><span>36</span></li>
              <li><strong>Boxing</strong><span>34</span></li>
              <li><strong>Golf</strong><span>33</span></li>
            </ul>
            <p>
              Some of these recommendations make sense for international or CAS matters. But
              overseas lawyers also appeared for UK-based agent, contract, club and selection
              disputes.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-section sports-law-report__open" aria-labelledby="sports-open-title">
        <div className="editorial-container">
          <header className="fa3-section-heading sports-law-report__section-intro">
            <div>
              <p className="fa3-kicker">Questions with no clear leader</p>
              <h2 id="sports-open-title">{openQuestions.length} valuable sports-law questions had no clear leader.</h2>
            </div>
            <p>For these questions, no firm appeared in more than three of the nine answers.</p>
          </header>
          <p className="sports-law-report__examples-label">Examples included:</p>
          <ol className="sports-law-report__open-list">
            {featuredOpenQuestions.map((question) => (
              <li key={question.id}>
                <div>
                  <span>{question.sportLabel}</span>
                  <a href={`#question-${question.id}`}>{featuredOpenQuestionLabels[question.id]}</a>
                </div>
              </li>
            ))}
          </ol>
          <details className="sports-law-report__open-more">
            <summary>View all {openQuestions.length} questions &rarr;</summary>
            <ol>
              {openQuestions.map((question) => (
                <li key={question.id}>
                  <a href={`#question-${question.id}`}>{question.question}</a>
                  <strong>{question.leaderAnswerCount}/9</strong>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </section>

      <SportsEntityExplorer entities={report.entities} />

      <SportsQuestionExplorer questions={report.questions} />

      <ResearchAuditCta
        href="/contact?intent=ai-search-audit&utm_content=sports-law-report"
        eyebrow="SEO & AI SEARCH AUDIT"
        title="Where does your firm appear?"
        body="The audit identifies the searches and buyer questions that matter most commercially, shows where your firm is absent or being outranked, and sets out strongest opportunities to improve your position."
        secondBody="It covers Google, ChatGPT, Gemini and Perplexity, with a prioritised implementation plan covering the pages, content, authority and technical changes needed."
        linkLabel="SEO & AI SEARCH AUDIT"
      />
    </main>
  );
}
