import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Fa3BreadthExplorer,
  Fa3FamilyViews,
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

const combinedSources = [
  { name: "Unbiased", type: "Directory", answers: 168 },
  { name: "MoneyHelper", type: "Public guidance", answers: 127 },
  { name: "VouchedFor", type: "Directory", answers: 118 },
  { name: "FCA", type: "Regulator", answers: 66 },
  { name: "Nephos Group", type: "Commercial content", answers: 47 }
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
              <span className="fa3-masthead__highlight">
                Nearly two-thirds of the top 150 UK financial advice firms were invisible in our
                study.
              </span>{" "}
              AI repeatedly relied on directories, publishers and commercial rankings to explain
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
            <Fa3MethodDrawer
              corpusVersion={report.corpus_version}
              selectionQuestionCount={report.denominators.questions}
            />
          </div>
        </div>
      </header>

      <section className="fa3-section fa3-executive" aria-labelledby="fa3-executive-title">
        <div className="editorial-container fa3-executive__grid">
          <div className="fa3-executive__statement">
            <p className="fa3-kicker">Executive summary</p>
            <h2 id="fa3-executive-title">
              Nearly two thirds of the established advisory market was invisible in AI search.
            </h2>
            <p className="fa3-executive__thesis">
              AI visibility is a source-to-selection problem: firms must first inform the answer,
              then be clear and credible enough to become a named, cited source.
            </p>
          </div>
          <div className="fa3-executive__evidence">
            <ul className="fa3-executive__summary-list">
              <li>
                <strong>93 of 150</strong>
                <span>established firms were neither named nor had their website cited.</span>
              </li>
              <li>
                <strong>74 of 76</strong>
                <span>guidance citations used a panel firm&rsquo;s expertise without naming it.</span>
              </li>
              <li>
                <strong>15 of 25</strong>
                <span>
                  selection questions had no single firm recommended by all three AI providers,
                  despite frequent use of adviser websites as sources across the wider study.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-context" aria-labelledby="fa3-context-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">Why this matters now</p>
              <h2 id="fa3-context-title">
                AI search is becoming more important in client decision-making
              </h2>
            </div>
            <p>
              Buyers increasingly use AI search to research their options, compare firms and decide
              who to contact.
            </p>
          </header>
          <div className="fa3-context__stats">
            <article>
              <strong>51%</strong>
              <p>of consumers say generative AI has changed how they research.</p>
              <cite>Gartner, 2026</cite>
            </article>
            <article>
              <strong>75%</strong>
              <p>More than 75% of Google searches are expected to include AI summaries by 2028.</p>
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
            </article>
            <article>
              <p>12 discoverability questions</p>
              <h3>Who could help me?</h3>
              <p>
                These questions measured which established firms AI named or cited when buyers
                searched for advice.
              </p>
            </article>
            <article>
              <p>25 direct firm-selection questions</p>
              <h3>Which firm should I choose?</h3>
              <p>
                Explicit selection tests measured verified candidates, repeatability, sources and
                how the shortlist changed by buyer need, provider and run.
              </p>
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

      <section className="fa3-section fa3-findings" aria-labelledby="fa3-findings-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">What happened when AI was asked to choose</p>
              <h2 id="fa3-findings-title">
                The recommended firms changed from one answer to the next
              </h2>
            </div>
            <p>
              There was no dependable shortlist. Different platforms, questions and repeated runs
              produced different firms, and sometimes no firm at all.
            </p>
          </header>

          <div className="fa3-findings__list">
            <article>
              <strong>60%</strong>
              <span>{findings.questions_without_candidate_shared_by_all_three_providers} of 25 questions</span>
              <h3>The three platforms did not agree</h3>
              <p>For 15 questions, no firm was recommended by OpenAI, Gemini and Perplexity alike.</p>
            </article>
            <article>
              <strong>26%</strong>
              <span>{findings.national_answer_count - findings.national_answers_with_candidates} of {findings.national_answer_count} answers</span>
              <h3>AI named no firm at all</h3>
              <p>Even when asked to choose a firm, 46 answers returned guidance, directories or regulators instead.</p>
            </article>
            <article>
              <strong>{findings.entities_reaching_all_four_national_families.length}</strong>
              <span>of {findings.national_unique_candidate_entities} firms named</span>
              <h3>Only four had broad visibility</h3>
              <p>Most firms appeared for one specialist need or in a single answer, rather than across the buyer journey.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-implication" aria-labelledby="fa3-implication-title">
        <div className="editorial-container">
          <header className="fa3-implication__header">
            <div>
              <p className="fa3-kicker">Who shaped the answer</p>
              <h2 id="fa3-implication-title">AI kept returning to the same five sources.</h2>
            </div>
            <div className="fa3-implication__framing">
              <p>
                A study of 150 UK financial advice firms found that AI recommendations were heavily
                influenced by a small number of third-party pages, including self-authored commercial
                rankings with no visible methodology.
              </p>
              <p>
                One of the most frequently cited commercial sources was a self-authored ranking
                published by a financial-services firm that placed itself first. The page contained
                no visible selection methodology.
              </p>
            </div>
          </header>

          <ol className="fa3-implication__sources" aria-label="Five most frequently cited source brands">
            {combinedSources.map((source, index) => (
              <li key={source.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{source.name}</strong>
                <small>{source.type}</small>
                <p><b>{source.answers}</b> of 450 answers</p>
              </li>
            ))}
          </ol>

          <p className="fa3-implication__note">
            Firms need evidence AI can retrieve and credible third-party surfaces that can carry
            their name into the answer.
          </p>
        </div>
      </section>

      <Fa3QuestionExplorer studyQuestions={report.studyQuestions} />
      <Fa3FamilyViews families={report.nationalFamilies} />
      <Fa3BreadthExplorer
        entities={report.breadth}
        searchEntities={report.searchEntities}
        questions={report.questions}
      />

      <ResearchAuditCta href="/contact?intent=ai-search-audit" />
    </main>
  );
}
