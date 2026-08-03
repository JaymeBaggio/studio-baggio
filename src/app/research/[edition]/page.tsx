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
  const title = "93 of the UK's top 150 financial advice firms were invisible in AI search";
  const description =
    "Across 450 answers, AI relied on a narrow source ecosystem while 93 of 150 established UK financial advice firms remained invisible.";

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
            <p className="fa3-kicker">How AI chooses UK financial advisers</p>
            <h1>93 of the UK&rsquo;s top 150 financial advice firms were invisible in AI search<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-masthead__intro">
            <p className="fa3-masthead__standfirst">
              Across 450 answers, AI repeatedly relied on a small group of directories, public
              bodies and commercial pages to explain financial decisions and build adviser
              shortlists.
            </p>
            <p>
              Adviser websites often supplied the evidence without the firm ever being named.
            </p>
            <div className="fa3-masthead__meta" aria-label="Study summary">
              <span><strong>150</strong> firms</span>
              <span><strong>50</strong> buyer questions</span>
              <span><strong>450</strong> answers</span>
              <span><strong>3</strong> AI platforms</span>
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
            <p className="fa3-kicker">Four headline findings</p>
            <h2 id="fa3-executive-title">
              AI assembled recommendations from a narrow source ecosystem.
            </h2>
            <p className="fa3-executive__thesis">
              Advice firms supplied much of the expertise. Directories, publishers and commercial
              rankings often carried the visibility and shaped the shortlist.
            </p>
          </div>
          <div className="fa3-executive__evidence">
            <ul className="fa3-executive__summary-list">
              <li>
                <strong>62%</strong>
                <span><b>93 of 150 firms were invisible.</b> They were neither named nor cited.</span>
              </li>
              <li>
                <strong>97%</strong>
                <span><b>74 of 76 citations gave no visible credit.</b> The firm supplied expertise but was not named.</span>
              </li>
              <li>
                <strong>70%</strong>
                <span><b>Most selections depended on other sources.</b> Only {ownDomainShare}% cited the selected firm&rsquo;s own website.</span>
              </li>
              <li>
                <strong>60%</strong>
                <span><b>The platforms produced no shared recommendation.</b> For 15 of 25 questions, they had no firm in common.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-credit-gap" aria-labelledby="fa3-credit-gap-title">
        <div className="editorial-container fa3-credit-gap__grid">
          <div>
            <p className="fa3-kicker">The credit gap</p>
            <h2 id="fa3-credit-gap-title">Financial advice firms are helping AI answer the question, but almost never receiving the credit.</h2>
          </div>
          <div>
            <p className="fa3-credit-gap__lead">
              In 97% of guidance answers that cited a panel firm&rsquo;s website, AI used the
              firm&rsquo;s expertise without naming the firm to the buyer.
            </p>
            <p>
              Panel-firm websites were cited 76 times across 117 guidance answers. The firm was
              named in only two of those 76 citations. When AI selected a firm directly, only
              {" "}{ownDomainShare}% of selections cited that firm&rsquo;s own website. The remaining
              selections relied on other sources, including directories, rankings and reviews.
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
                There was no dependable AI shortlist
              </h2>
            </div>
            <p>
              The firms changed with the platform, the buyer&rsquo;s question and the repeated run.
              Some answers did not name a firm at all.
            </p>
          </header>

          <div className="fa3-findings__list">
            <article>
              <strong>60%</strong>
              <span>{findings.questions_without_candidate_shared_by_all_three_providers} of 25 questions</span>
              <h3>No firm appeared across all three platforms</h3>
              <p>For 15 questions, OpenAI, Gemini and Perplexity had no recommended firm in common.</p>
            </article>
            <article>
              <strong>26%</strong>
              <span>{findings.national_answer_count - findings.national_answers_with_candidates} of {findings.national_answer_count} answers</span>
              <h3>AI named no firm at all</h3>
              <p>Across the 20 national firm-selection questions, 46 of 180 answers returned guidance, directories or authorities instead of a financial advice firm.</p>
            </article>
            <article>
              <strong>{findings.entities_reaching_all_four_national_families.length}</strong>
              <span>of {findings.national_unique_candidate_entities} candidates</span>
              <h3>Only four appeared across every buyer need</h3>
              <p>Only four of 303 candidates appeared across all four national buyer-need categories. Most visibility was narrow or one-off.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="fa3-section fa3-implication" aria-labelledby="fa3-implication-title">
        <div className="editorial-container">
          <header className="fa3-implication__header">
            <div>
              <p className="fa3-kicker">Who shaped the answer</p>
              <h2 id="fa3-implication-title">Five source brands appeared again and again.</h2>
            </div>
            <div className="fa3-implication__framing">
              <p>
                Directories, public bodies and commercial pages repeatedly supplied the information
                AI used to explain decisions and build firm shortlists.
              </p>
              <p>
                Nephos Group appeared in 47 of 450 answers, making its commercial content the fifth
                most-cited source brand in the study. One frequently cited Nephos page was a
                self-authored ranking that placed the group first and showed no visible selection
                methodology.
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
            This finding concerns source influence, not adviser quality. Commercial pages from one
            financial-services group sat alongside Unbiased, MoneyHelper, VouchedFor and the FCA
            while most of the established 150-firm panel remained invisible.
          </p>
        </div>
      </section>

      <Fa3FamilyViews families={report.nationalFamilies} />
      <Fa3BreadthExplorer
        entities={report.breadth}
        searchEntities={report.searchEntities}
        questions={report.questions}
      />

      <section className="fa3-section fa3-context fa3-context--compact" aria-labelledby="fa3-context-title">
        <div className="editorial-container">
          <header className="fa3-section-heading">
            <div>
              <p className="fa3-kicker">Why this matters now</p>
              <h2 id="fa3-context-title">AI is becoming part of how clients choose</h2>
            </div>
            <p>
              Buyers increasingly use AI to research options, compare firms and decide who to
              contact. The route to the shortlist is becoming commercially important.
            </p>
          </header>
          <div className="fa3-context__stats">
            <article>
              <strong>75%</strong>
              <p>More than 75% of Google searches are expected to include AI summaries by 2028.</p>
              <cite>McKinsey, 2025</cite>
            </article>
            <article>
              <strong>51%</strong>
              <p>of consumers say generative AI has changed how they research.</p>
              <cite>Gartner, 2026</cite>
            </article>
            <article>
              <strong>42%</strong>
              <p>AI searchers are 42% more likely to convert than non-AI traffic.</p>
              <cite>Adobe Analytics, 2026</cite>
            </article>
          </div>
        </div>
      </section>

      <Fa3QuestionExplorer studyQuestions={report.studyQuestions} />

      <section className="fa3-section fa3-conclusion" aria-labelledby="fa3-conclusion-title">
        <div className="editorial-container fa3-conclusion__grid">
          <div>
            <p className="fa3-kicker">What firms should take from this</p>
            <h2 id="fa3-conclusion-title">Credibility alone did not produce visibility.</h2>
          </div>
          <div className="fa3-conclusion__body">
            <p>
              The firms in this study already possess expertise, qualifications and market
              authority. AI can only use evidence it can retrieve, understand and connect to a
              buyer&rsquo;s question.
            </p>
            <ol>
              <li>
                <div>
                  <strong>Answer the questions buyers actually ask.</strong>
                  <span>Structure the firm&rsquo;s expertise so AI can retrieve and use it.</span>
                </div>
              </li>
              <li>
                <div>
                  <strong>Connect that expertise to the firm&rsquo;s name.</strong>
                  <span>Build credible first-party and third-party evidence that carries the firm into the shortlist.</span>
                </div>
              </li>
            </ol>
            <p>
              Without both, a firm may help produce the answer while remaining invisible to the
              buyer.
            </p>
            <div className="fa3-conclusion__experiment">
              <strong>The next test</strong>
              <p>
                Through Calm Authority, we have published transparent, evidence-backed sources
                built around the same buyer questions. We will repeat the frozen study to test
                whether better sources change the firms AI recommends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResearchAuditCta
        href="/contact?intent=ai-search-audit"
        title="Find out why your firm appears, disappears or gets cited without credit."
        body="Studio Baggio audits the buyer questions that matter, identifies the sources shaping the answers and sets out the evidence your firm needs to enter those consideration sets."
        linkLabel="Discuss your firm's visibility"
      />
    </main>
  );
}
