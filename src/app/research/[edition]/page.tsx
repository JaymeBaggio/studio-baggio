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
              This investigation follows the buyer journey from asking what to do- to asking which
              firm to choose. It records what three grounded AI systems returned, three times per
              test, across two consecutive capture days.
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
              firms were neither named nor had their website cited in the discoverability analysis.
              This is a visibility finding about the exact dated study, rather than a judgement on
              adviser quality or market position.
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
              76 citations, the answer used the firm&apos;s evidence without naming the firm.
            </p>
            <p>
              Direct firm-selection questions exposed the other side of the gap. Only {ownDomainShare}% of the {formatNumber.format(validCandidateOccurrences)}
              {" "}valid adviser-candidate occurrences cited the candidate&apos;s own domain. Firms were
              frequently selected using directories, rankings, reviews and other third-party evidence.
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
              These are answer-level citation counts across the complete 450-answer raw archive.
              They show repeated retrieval, not that a source caused any recommendation.
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

          <aside className="fa3-nephos-note" aria-labelledby="fa3-nephos-title">
            <div>
              <p className="fa3-kicker">Entity and source case study</p>
              <h3 id="fa3-nephos-title">When a commercial ranking becomes evidence</h3>
            </div>
            <div>
              <p>
                A self-authored Nephos page titled “10 Best Financial Advisers in the UK” appeared
                as a source 21 times. In the direct firm-selection answers, the systems also presented the non-adviser
                Nephos Group umbrella as an adviser candidate in 12 reviewed occurrences.
              </p>
              <p>
                Those 12 occurrences are preserved as an AI identity error and excluded from valid
                adviser rankings. Three explicit “Nephos Wealth Management” occurrences were
                separately resolved to Nephos Wealth Limited, an appointed representative. Page
                retrieval and candidate selection remain separate observations.
              </p>
            </div>
          </aside>
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
              The useful commercial unit is the consideration set for a real buyer question, not a
              universal visibility score.
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
      <Fa3BreadthExplorer entities={report.breadth} />
      <Fa3LocalView questions={report.questions} />

      <section className="fa3-section fa3-concepts" aria-labelledby="fa3-concepts-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">What the answers contained</p>
              <h2 id="fa3-concepts-title">Recommendation, evidence and mention are different</h2>
            </div>
            <p>
              Every adviser-related entity was assigned one semantic role. Only verified adviser
              candidates enter the selection views above.
            </p>
          </header>
          <dl className="fa3-concept-list">
            <div><dt>Valid adviser candidates</dt><dd>{formatNumber.format(report.conceptCounts.valid_adviser_candidate ?? 0)}</dd><p>Firm or adviser presented as an option for the buyer.</p></div>
            <div><dt>Directory, regulator or authority</dt><dd>{formatNumber.format(report.conceptCounts.directory_regulator_authority ?? 0)}</dd><p>A route to information or verification, rather than a candidate.</p></div>
            <div><dt>Comparison-only mention</dt><dd>{formatNumber.format(report.conceptCounts.comparison_only ?? 0)}</dd><p>Named for contrast, context or a directory example.</p></div>
            <div><dt>Invalid candidate identity</dt><dd>{formatNumber.format(report.conceptCounts.invalid_candidate_identity ?? 0)}</dd><p>Presented as a candidate by AI but excluded because the named identity was not a valid adviser entity.</p></div>
          </dl>
        </div>
      </section>

      <section className="fa3-section fa3-experiment" aria-labelledby="fa3-experiment-title">
        <div className="editorial-container fa3-experiment__grid">
          <div>
            <p className="fa3-kicker">The live intervention</p>
            <h2 id="fa3-experiment-title">Can transparent evidence enter the same answers?</h2>
          </div>
          <div>
            <p>
              Calm Authority has published independently evidenced comparison pages with explicit
              inclusion criteria, regulatory routes, named authorship and source links. The same
              frozen questions will be rerun at fixed checkpoints to measure citations, mentions
              and shortlist entry.
            </p>
            <p>
              This turns the report into a controlled before-and-after test. Any change will be
              reported as an observed association, with repetition required before it becomes proof.
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
              We asked 50 questions across guidance, discoverability and direct firm selection.
              Five selection questions were deliberately repeated, giving us 45 distinct wordings.
              Every finding keeps the correct denominator. The results describe grounded API
              captures on 30 and 31 July 2026, not every consumer interface or future answer.
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
