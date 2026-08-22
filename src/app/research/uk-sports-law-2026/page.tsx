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
import { researchDataLicense } from "@/lib/research-schema";
import { siteUrl } from "@/lib/utils";
import styles from "@/components/research/sports-law-report.module.css";

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
      license: researchDataLicense()
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
    <main className={`${styles.referenceReport} home-4b research-page fa3-report law-report sports-law-report`} data-research-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(sportsLawSchema) }} />
      <header className="fa3-masthead law-report__masthead sports-law-report__masthead">
        <div className="editorial-container fa3-masthead__grid">
          <div className="fa3-masthead__title">
            <p className="fa3-kicker">UK Sports Law in AI Search</p>
            <h1>UK Sports Law in AI Search 2026<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-masthead__intro">
            <div className="fa3-masthead__copy">
              <p className="fa3-masthead__standfirst">
                We reviewed 810 AI answers to 90 high-intent buyer questions across nine areas of
                sports law, tracking which
                firms and individual lawyers ChatGPT, Gemini and Perplexity recommended.
              </p>
              <p>
                The study shows which names appear most often, which top-ranked UK sports-law firms are absent,
                and where AI produces a different picture of the sports-law market.
              </p>
            </div>
            <SportsLawMethodDrawer />
          </div>
        </div>
      </header>

      <section className="fa3-section fa3-executive sports-law-report__lead-finding" aria-labelledby="sports-findings-title">
        <div className="editorial-container fa3-executive__grid">
          <div className="fa3-executive__statement">
            <p className="fa3-kicker">3 key findings</p>
            <h2 id="sports-findings-title">AI recommendations did not reflect the top-ranked UK sports-law firms.</h2>
            <p className="fa3-executive__thesis sports-law-report__absence-fact">
              Some top-ranked UK sports-law firms were completely absent, while specialist firms,
              barristers&rsquo; chambers and individual lawyers appeared above much of the
              traditional market.
            </p>
          </div>
          <div className="fa3-executive__evidence">
            <ul className="fa3-executive__summary-list">
              <li>
                <span>
                  <b>Almost 1 in 4 top-ranked UK sports-law firms were never named.</b> 22 of the
                  89 firms in our comparison group did not appear once across 810 AI answers to
                  90 high-intent buyer questions.
                </span>
              </li>
              <li>
                <span>
                  <b>Global Sports Advocates was named more often than 85 of the 89 top-ranked UK sports-law firms.</b>{" "}
                  The firm was not part of the original comparison group.
                </span>
              </li>
              <li>
                <span>
                  <b>Blackstone Chambers was the No. 1 most frequently named legal organisation in the study.</b>{" "}
                  It appeared in 202 answers across 70 of the 90 questions.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fa3-section sports-law-report__individuals" aria-labelledby="sports-individuals-title">
        <div className="editorial-container">
          <header className="sports-law-individuals__header">
            <div>
              <p className="fa3-kicker">Individual lawyers</p>
              <h2 id="sports-individuals-title">Individual lawyers ranked above almost every top-ranked UK sports-law firm.</h2>
            </div>
            <p className="sports-law-report__individual-summary">
              Nick De Marco KC and Mike Morgan were each named more often than 85 of the 89
              top-ranked UK sports-law firms in the benchmark. Strong individual profiles can materially
              increase the chance of entering a prospective client&rsquo;s shortlist.
            </p>
          </header>
          <div className="sports-law-individuals__tables">
            <section aria-labelledby="sports-law-overall-individuals">
              <h3 id="sports-law-overall-individuals">Most visible individuals overall</h3>
              <div className="sports-law-individuals__table-wrap">
                <table>
                  <tbody>
                    <tr><td>01</td><th scope="row">Nick De Marco KC</th><td>Barrister · Blackstone Chambers</td></tr>
                    <tr><td>02</td><th scope="row">Mike Morgan</th><td>Founding Partner · Morgan Sports Law</td></tr>
                    <tr><td>03</td><th scope="row">Paul Greene</th><td>Attorney · Global Sports Advocates</td></tr>
                    <tr><td>04</td><th scope="row">Howard Jacobs</th><td>Attorney · Law Offices of Howard L. Jacobs</td></tr>
                    <tr><td>05</td><th scope="row">Adam Lewis KC</th><td>Barrister · Blackstone Chambers</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section aria-labelledby="sports-law-specialist-individuals">
              <h3 id="sports-law-specialist-individuals">Additional standout leaders by sport</h3>
              <div className="sports-law-individuals__table-wrap">
                <table>
                  <tbody>
                    <tr><td>Horseracing</td><th scope="row">Rory Mac Neice</th><td>Partner · Ashfords</td></tr>
                    <tr><td>Motorsport</td><th scope="row">Sarah Franklin</th><td>Solicitor · Sarah Franklin Solicitors</td></tr>
                    <tr><td>Boxing</td><th scope="row">George A. Gallegos</th><td>Founder · Gallegos Boxing &amp; Sports Law</td></tr>
                    <tr><td>Rugby</td><th scope="row">Ben Cisneros</th><td>Associate · Morgan Sports Law</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="fa3-section sports-client-impact" aria-labelledby="sports-why-title">
        <div className="editorial-container sports-client-impact__grid">
          <header className="sports-client-impact__intro">
            <p className="fa3-kicker">Client impact</p>
            <h2 id="sports-why-title">AI is becoming part of how clients choose.</h2>
            <p>Buyers increasingly use AI to research options, compare firms and decide who to contact. The route to the shortlist is becoming commercially important.</p>
          </header>
          <div className="sports-client-impact__stats">
            <article>
              <strong>75%</strong>
              <p>of Google searches are expected to include AI summaries by 2028.</p>
              <cite>McKinsey, 2025</cite>
            </article>
            <article>
              <strong>58%</strong>
              <p>have replaced traditional search engines with generative AI tools for product and service recommendations.</p>
              <cite>Capgemini, 2025</cite>
            </article>
            <article>
              <strong>42%</strong>
              <p>AI-referred traffic converts better than non-AI traffic.</p>
              <cite>Adobe Analytics, 2026</cite>
            </article>
          </div>
        </div>
      </section>

      <section className="fa3-section sports-law-report__leaders-section" aria-labelledby="sports-leaders-title">
        <div className="editorial-container sports-law-report__leaders-layout">
          <header className="sports-winners__heading">
            <div>
              <p className="fa3-kicker">Sport leaders</p>
              <h2 id="sports-leaders-title">Most-recommended firms by sport</h2>
            </div>
            <p>Each winner was the firm named most often across 90 AI answers to 10 high-intent buyer questions in that sport.</p>
          </header>
          <ul className="sports-winner-matrix" aria-label="Most-recommended firm in each sport">
            {sportResults.map((result) => {
              const winner = result.firms[0];

              return (
                <li key={result.sport}>
                  <span>{result.sport}</span>
                  <strong>{winner.name}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="fa3-section sports-law-report__overseas-section" aria-labelledby="sports-overseas-title">
        <div className="editorial-container">
          <header className="sports-law-report__overseas-heading">
            <div>
              <p className="fa3-kicker">Overseas lawyers</p>
              <h2 id="sports-overseas-title">UK clients are being shown overseas sports lawyers.</h2>
            </div>
            <div className="sports-law-report__overseas-copy">
              <p>
                Overseas firms or lawyers appeared in at least {h.overseasNamedAnswers} of the {report.denominators.answers} answers,
                across {h.overseasQuestionBreadth} of the 90 questions.
              </p>
              <p>
                Some of these recommendations make sense for international or CAS matters. But
                overseas lawyers also appeared for UK-based agent, contract, club and selection
                disputes.
              </p>
            </div>
          </header>
          <ol className="sports-law-report__overseas-cards" aria-label="Sports where overseas lawyers appeared most often">
            <li><span>01</span><strong>Tennis</strong><p>Appeared in <b>38</b> of 90 answers.</p></li>
            <li><span>02</span><strong>General sports disputes</strong><p>Appeared in <b>36</b> of 90 answers.</p></li>
            <li><span>03</span><strong>Boxing</strong><p>Appeared in <b>34</b> of 90 answers.</p></li>
            <li><span>04</span><strong>Golf</strong><p>Appeared in <b>33</b> of 90 answers.</p></li>
          </ol>
        </div>
      </section>

      <section className="fa3-section sports-law-report__open" aria-labelledby="sports-open-title">
        <div className="editorial-container sports-law-report__open-grid">
          <header className="sports-law-report__open-intro">
            <div>
              <p className="fa3-kicker">Questions with no clear leader</p>
              <h2 id="sports-open-title">{openQuestions.length} valuable sports-law questions had no clear leader.</h2>
            </div>
            <p>For these questions, no firm appeared in more than three of the nine answers.</p>
          </header>
          <div className="sports-law-report__open-examples">
            <ol className="sports-law-report__open-list">
              {openQuestions.map((question, questionIndex) => (
                <li key={question.id}>
                  <span className="sports-law-report__open-number" aria-hidden="true">
                    {String(questionIndex + 1).padStart(2, "0")}
                  </span>
                  <a href={`#question-${question.id}`}>{question.question}</a>
                </li>
              ))}
            </ol>
            <a className="sports-law-report__open-link" href="#sports-question-explorer">View full question set &rarr;</a>
          </div>
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
