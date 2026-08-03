import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Fa3BreadthExplorer,
  Fa3FamilyViews,
  Fa3LocalView,
  Fa3MethodDrawer,
  Fa3QuestionExplorer
} from "@/components/research/fa3-firm-selection-report";
import { ResearchAuditCta } from "@/components/research";
import {
  getResearchEditionDefinition,
  getResearchEditionPath,
  researchEditions
} from "@/content/research";
import { loadFa3ReportView } from "@/lib/fa3-report-data";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/utils";

type ResearchEditionPageProps = {
  params: Promise<{ edition: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchEditions.map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({ params }: ResearchEditionPageProps): Promise<Metadata> {
  const { edition: slug } = await params;
  const edition = getResearchEditionDefinition(slug);
  if (!edition) return {};
  const route = getResearchEditionPath(edition);
  const title = "How AI chooses UK financial advisers | Studio Baggio";
  const description =
    "50 tests and 450 AI responses reveal which UK financial advisers become visible, which sources shape the answer and where firms disappear.";

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: route },
    openGraph: {
      type: "article",
      siteName: "Studio Baggio",
      url: `${siteUrl}${route}`,
      title,
      description,
      images: [defaultOpenGraphImage]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultTwitterImage]
    }
  };
}

const formatNumber = new Intl.NumberFormat("en-GB");

const combinedSources = [
  { name: "Unbiased", answers: 168, share: "37.3%" },
  { name: "MoneyHelper", answers: 127, share: "28.2%" },
  { name: "VouchedFor", answers: 118, share: "26.2%" },
  { name: "FCA", answers: 66, share: "14.7%" },
  { name: "Nephos Group", answers: 47, share: "10.4%" }
] as const;

export default async function ResearchEditionPage({ params }: ResearchEditionPageProps) {
  const { edition } = await params;
  if (edition !== "uk-financial-advice-2026") notFound();

  const report = await loadFa3ReportView();
  const findings = report.headline_findings;
  const validCandidateOccurrences = findings.candidate_occurrence_count;
  const ownDomainShare = Math.round(
    (findings.candidate_occurrences_with_own_domain_citation / validCandidateOccurrences) * 1000
  ) / 10;

  return (
    <main className="home-4b research-page fa3-report" data-research-page>
      <header className="fa3-masthead">
        <div className="editorial-container fa3-masthead__grid">
          <div className="fa3-masthead__title">
            <p className="fa3-kicker">UK financial advice · AI search study</p>
            <h1>How AI chooses UK financial advisers<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-masthead__intro">
            <p className="fa3-masthead__standfirst">
              Nearly two-thirds of 150 UK financial advice firms were invisible in our study. AI
              repeatedly relied on directories, publishers and commercial rankings to explain
              financial decisions and assemble firm shortlists.
            </p>
            <p>
              We asked the questions a real buyer would ask — from &ldquo;what should I do?&rdquo;
              to &ldquo;which firm should I choose?&rdquo; — and recorded what AI returned.
            </p>
            <div className="fa3-masthead__meta" aria-label="Study summary">
              <span><strong>50</strong> questions</span>
              <span><strong>450</strong> responses</span>
              <span><strong>3</strong> AI providers</span>
              <span><strong>3</strong> runs per question</span>
            </div>
          </div>
        </div>
      </header>

      <section className="fa3-section fa3-executive" aria-labelledby="fa3-executive-title">
        <div className="editorial-container fa3-executive__grid">
          <div className="fa3-executive__statement">
            <p className="fa3-kicker">Headline finding</p>
            <h2 id="fa3-executive-title">
              Nearly two-thirds of the established-market panel disappeared from view.
            </h2>
          </div>
          <div className="fa3-executive__evidence">
            <p className="fa3-executive__ratio"><strong>93</strong> of 150</p>
            <p>
              firms were neither named nor had their website cited across the study.
            </p>
            <p className="fa3-executive__thesis">
              AI visibility is a source-to-selection problem: a firm must be useful enough to inform
              the answer, then clear and credible enough to become a named candidate.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-journey" aria-labelledby="fa3-journey-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">The 50 questions</p>
              <h2 id="fa3-journey-title">The questions buyers ask before choosing an adviser</h2>
            </div>
            <p>
              We tested the questions people ask as they move from understanding a financial need
              to finding and choosing an adviser.
            </p>
          </header>

          <div className="fa3-journey__questions">
            <article>
              <p>13 guidance questions</p>
              <h3>What should I do?</h3>
              <p>
                These questions examined how AI explained financial decisions and which sources it
                used to support the answer.
              </p>
              <dl>
                <div><dt>Guidance answers naming a panel firm</dt><dd>5 of 117</dd></div>
              </dl>
            </article>
            <article>
              <p>12 discoverability questions</p>
              <h3>Who could help me?</h3>
              <p>
                These questions measured which established firms AI named or cited when buyers
                searched for advice.
              </p>
              <dl>
                <div><dt>Firms invisible</dt><dd>93 of 150</dd></div>
              </dl>
            </article>
            <article>
              <p>25 direct firm-selection questions</p>
              <h3>Which firm should I choose?</h3>
              <p>
                Explicit selection tests measured verified candidates, repeatability, sources and
                how the shortlist changed by buyer need, provider and run.
              </p>
              <dl>
                <div><dt>National answers with candidates</dt><dd>{findings.national_answers_with_candidates} of {findings.national_answer_count}</dd></div>
                <div><dt>Distinct national candidates</dt><dd>{findings.national_unique_candidate_entities}</dd></div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-credit-gap" aria-labelledby="fa3-credit-gap-title">
        <div className="editorial-container fa3-credit-gap__grid">
          <div>
            <p className="fa3-kicker">The credit gap</p>
            <h2 id="fa3-credit-gap-title">A firm can inform the answer and remain invisible to the buyer</h2>
          </div>
          <div>
            <p className="fa3-credit-gap__lead">
              In the 117 guidance answers, panel-firm websites were cited 76 times. In 74 of those
              76, the answer used the firm&apos;s expertise without ever naming the firm.
            </p>
            <p>
              When AI did select firms directly, only {ownDomainShare}% of selections cited the
              firm&apos;s own website. The rest relied on directories, rankings and reviews. Firms
              feed the evidence but the buyer never sees them.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-source-ecology" aria-labelledby="fa3-source-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">Source landscape</p>
              <h2 id="fa3-source-title">A small group of third parties repeatedly framed the market</h2>
            </div>
            <p>
              These are answer-level citation counts across all 450 responses.
            </p>
          </header>

          <div className="fa3-source-table" role="region" aria-label="Most frequently cited source brands" tabIndex={0}>
            <table>
              <thead>
                <tr><th scope="col">Source brand</th><th scope="col">Answers citing it</th><th scope="col">Share of 450 answers</th></tr>
              </thead>
              <tbody>
                {combinedSources.map((source) => (
                  <tr key={source.name}><th scope="row">{source.name}</th><td>{source.answers}</td><td>{source.share}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      <section className="fa3-section fa3-findings" aria-labelledby="fa3-findings-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">Firm-selection findings</p>
              <h2 id="fa3-findings-title">AI does not reproduce one stable “best advisers” market</h2>
            </div>
            <p>
              There is no single AI &ldquo;best advisers&rdquo; list. The shortlist changes with
              every question.
            </p>
          </header>

          <div className="fa3-findings__list">
            <article>
              <strong>{findings.questions_without_candidate_shared_by_all_three_providers} of 25</strong>
              <h3>No common candidate across all providers</h3>
              <p>The shortlist changed materially with the provider, question and run.</p>
            </article>
            <article>
              <strong>{findings.national_outside_panel_candidate_entities} of {findings.national_unique_candidate_entities}</strong>
              <h3>National candidates came from outside the panel</h3>
              <p>The established 150-brand benchmark captured only part of the market AI presented.</p>
            </article>
            <article>
              <strong>{findings.national_answer_count - findings.national_answers_with_candidates} of {findings.national_answer_count}</strong>
              <h3>Explicit requests still produced no firm</h3>
              <p>These answers returned guidance, directories or authorities instead of a verified candidate.</p>
            </article>
            <article>
              <strong>{findings.entities_reaching_all_four_national_families.length}</strong>
              <h3>Firms reached all four national needs</h3>
              <p>Most visibility was specialist, narrow or one-off rather than broad and repeatable.</p>
            </article>
          </div>
        </div>
      </section>

      <Fa3QuestionExplorer questions={report.questions} />
      <Fa3FamilyViews families={report.nationalFamilies} />
      <Fa3BreadthExplorer entities={report.breadth} searchEntities={report.searchEntities} />
      <Fa3LocalView questions={report.questions} />

      <section className="fa3-section fa3-context" aria-labelledby="fa3-context-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">Why this matters now</p>
              <h2 id="fa3-context-title">AI is becoming the decision layer</h2>
            </div>
            <p>
              AI answers are not a niche channel. They are fast becoming the primary route buyers
              use to make decisions.
            </p>
          </header>
          <div className="fa3-context__stats">
            <article>
              <strong>70%</strong>
              <p>Top 3 Google search results take 70% of clicks.</p>
              <cite>First Page Sage, 2026</cite>
            </article>
            <article>
              <strong>75%</strong>
              <p>AI search is expected to reach 75% adoption by 2028.</p>
              <cite>McKinsey, 2025</cite>
            </article>
            <article>
              <strong>42%</strong>
              <p>AI searchers are 42% more likely to convert than non-AI traffic.</p>
              <cite>Adobe Analytics, 2026</cite>
            </article>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-implication" aria-labelledby="fa3-implication-title">
        <div className="editorial-container fa3-implication__grid">
          <div>
            <p className="fa3-kicker">What firms should take from this</p>
            <h2 id="fa3-implication-title">Most firms are invisible where buyers are already looking</h2>
          </div>
          <div>
            <p>
              A small number of directories and publishers control the information AI uses to build
              its answers. Firms that do not appear in those sources — or do not produce clear,
              citable evidence of their own — are absent from the consideration set entirely.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-method" aria-labelledby="fa3-method-title">
        <div className="editorial-container fa3-method__grid">
          <div>
            <p className="fa3-kicker">Method, evidence and limitations</p>
            <h2 id="fa3-method-title">How the study was run</h2>
          </div>
          <div>
            <p>
              50 questions across guidance, discoverability and direct firm selection, run through
              OpenAI, Gemini and Perplexity on 30 and 31 July 2026. Five questions were deliberately
              repeated, giving 45 distinct wordings.
            </p>
            <Fa3MethodDrawer report={report} />
            <Link className="fa3-method__link" href="/research/uk-financial-advice-2026/method">Read the full method</Link>
          </div>
        </div>
      </section>

      <ResearchAuditCta href="/contact?intent=ai-search-audit" />
    </main>
  );
}
