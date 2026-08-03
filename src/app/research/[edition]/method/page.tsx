import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResearchEditionDefinition, getResearchEditionPath, researchEditions } from "@/content/research";
import { loadFa3ReportView } from "@/lib/fa3-report-data";

type ResearchMethodPageProps = {
  params: Promise<{ edition: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchEditions.map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({ params }: ResearchMethodPageProps): Promise<Metadata> {
  const { edition } = await params;
  if (edition !== "uk-financial-advice-2026") return {};
  return {
    title: "How the 50-test UK financial-advice AI study was measured | Studio Baggio",
    description: "The question design, frozen prompts, 450-answer capture, semantic review and limitations for the UK financial-advice AI study.",
    robots: { index: true, follow: true }
  };
}

export default async function ResearchMethodPage({ params }: ResearchMethodPageProps) {
  const { edition: slug } = await params;
  const edition = getResearchEditionDefinition(slug);
  if (!edition || slug !== "uk-financial-advice-2026") notFound();
  const report = await loadFa3ReportView();

  return (
    <main className="home-4b research-page fa3-report fa3-method-page" data-research-page>
      <header className="fa3-method-page__masthead">
        <div className="editorial-container fa3-method-page__masthead-grid">
          <div>
            <p className="fa3-kicker">Study method</p>
            <h1>How 50 tests and 450 AI answers were measured<span aria-hidden="true">.</span></h1>
          </div>
          <div className="fa3-method-page__intro">
            <p>
              The study follows the questions people ask as they move from understanding a
              financial need to finding and choosing an adviser.
            </p>
            <p>
              We tested 13 guidance questions, 12 discoverability questions and 25 direct
              firm-selection questions. Every finding keeps the denominator that produced it; the
              answers are never pooled into one firm score.
            </p>
            <Link href={getResearchEditionPath(edition)}>Return to the findings</Link>
          </div>
        </div>
      </header>

      <section className="fa3-method-page__section" aria-labelledby="method-instrument-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">01 / Investigation design</p>
            <h2 id="method-instrument-title">Three kinds of buyer question</h2>
          </div>
          <div className="fa3-method-page__copy">
            <p>
              The 13 guidance questions examined how AI explained financial decisions and which
              sources supported the answer. The 12 discoverability questions measured which
              established firms became visible. The 25 demand-informed, pre-defined UK
              firm-selection questions measured which advisers entered the consideration set.
            </p>
            <p>
              Five selection questions were deliberately repeated word for word, so the
              investigation contains 50 question tests and 45 distinct wordings. The direct-selection
              questions include 20 national questions across four buyer-need families plus five
              matched city questions. Search demand informed this set but is treated as a proxy rather than a
              representative survey of every UK buyer prompt.
            </p>
            <a href="/research-data/uk-financial-advice-2026/corrected/corpus.json" download>Download the exact frozen corpus</a>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section" aria-labelledby="method-capture-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">02 / Capture</p>
            <h2 id="method-capture-title">450 responses across two days</h2>
          </div>
          <div className="fa3-method-page__copy">
            <dl className="fa3-method-page__facts">
              <div><dt>Questions tested</dt><dd>50</dd></div>
              <div><dt>Providers</dt><dd>OpenAI, Gemini and Perplexity</dd></div>
              <div><dt>Repetitions</dt><dd>{report.denominators.repetitions} per question and provider</dd></div>
              <div><dt>Capture completeness</dt><dd>450 of 450 responses</dd></div>
              <div><dt>Guidance and discoverability</dt><dd>25 questions · 225 answers · 30 July 2026</dd></div>
              <div><dt>Direct firm selection</dt><dd>25 questions · 225 answers · 31 July 2026</dd></div>
            </dl>
            <p>
              Runs used fresh stateless sessions with no conversational carry-over. A valid answer
              was never rerun because it returned no firm or an inconvenient result. The direct-selection
              source records retain their original discarded-pilot label; the report treats the
              sealed export as a dated analysis capture without silently relabelling those records.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section" aria-labelledby="method-review-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">03 / Semantic review</p>
            <h2 id="method-review-title">A name string did not count as a recommendation</h2>
          </div>
          <div className="fa3-method-page__copy">
            <p>
              Every adviser-related entity in all 225 answers was reviewed by semantic role. Only a
              firm or adviser presented as an option for the buyer counts as a candidate. Comparison
              mentions, incidental references, warnings, directories, regulators and cited
              authorities remain separate.
            </p>
            <p>
              The review also records shortlist position, rationale, panel status, own-domain
              citation and recoverable sentence-level source support. A final entity pass separated
              Nephos Group from Nephos Wealth Limited and excluded 12 invalid umbrella-identity
              candidate occurrences from valid adviser rankings.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section" aria-labelledby="method-score-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">04 / Scoring</p>
            <h2 id="method-score-title">Question shortlists before summary tiers</h2>
          </div>
          <div className="fa3-method-page__copy">
            <ul>
              <li>Each answer contributes total normalized shortlist mass of 1, so longer provider lists do not dominate.</li>
              <li>Repetitions are averaged within each question and provider; the three providers receive equal weight.</li>
              <li>The four national families receive equal weight in the cross-scenario breadth view.</li>
              <li>Repeat-confirmed means a candidate appeared in at least two of three runs for the same question and provider.</li>
              <li>The five matched local questions are reported separately and never enter the national summary.</li>
              <li>The public output uses selection tiers rather than claiming a precise universal 1-to-150 ranking.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section" aria-labelledby="method-eligibility-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">05 / Eligibility</p>
            <h2 id="method-eligibility-title">Absence is limited to relevant opportunities</h2>
          </div>
          <div className="fa3-method-page__copy">
            <p>
              The open-universe view includes every candidate found, including firms outside the
              constructed panel. The opportunity-adjusted panel view includes only verified eligible
              firm-question cells. Unknown eligibility is never converted into ineligibility or used
              to penalise a firm.
            </p>
            <p>
              The registry is intentionally partial. It does not support a claim that every panel
              firm was fully assessed against every client minimum, permission, specialism or local
              presence rule.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section" aria-labelledby="method-limits-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">06 / Limits</p>
            <h2 id="method-limits-title">What this edition does not claim</h2>
          </div>
          <div className="fa3-method-page__copy">
            <ul>
              {report.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
            <p>
              An absence is evidence only for the exact capture date, 25 prompts, three tested API
              surfaces and applicable eligibility rule. It is not evidence of adviser quality,
              suitability, consumer-interface behaviour or total market visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section fa3-method-page__downloads" aria-labelledby="method-downloads-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">Evidence package</p>
            <h2 id="method-downloads-title">Frozen inputs and derived outputs</h2>
          </div>
          <div className="fa3-method-page__copy">
            <ul>
              <li><a href="/research-data/uk-financial-advice-2026/corrected/corpus.json" download>Frozen 25-question corpus</a></li>
              <li><a href="/research-data/uk-financial-advice-2026/corrected/method.json" download>Method and provider settings</a></li>
              <li><a href="/research-data/uk-financial-advice-2026/corrected/report-data.json" download>Corrected derived report data</a></li>
              <li><a href="/research-data/uk-financial-advice-2026/corrected/findings.md" download>Corrected findings and limitations</a></li>
            </ul>
            <p className="fa3-method-page__hash"><span>Derived output hash</span><code>{report.outputs_sha256}</code></p>
          </div>
        </div>
      </section>

      <section className="fa3-method-page__section fa3-method-page__legacy" aria-labelledby="method-legacy-title">
        <div className="editorial-container fa3-method-page__grid">
          <div>
            <p className="fa3-kicker">How the findings connect</p>
            <h2 id="method-legacy-title">Guidance and discovery remain separate analytical modules</h2>
          </div>
          <div className="fa3-method-page__copy">
            <p>
              The immutable fa-queries-0.2 capture contains 225 answers across 13 guidance questions
              and 12 discovery questions. Its 117 guidance answers form the evidence-authority module;
              99 valid UK discovery answers support the visibility finding; and FA-SN-04 remains a
              disclosed jurisdiction-drift example.
            </p>
            <p>
              The guidance and discoverability questions supply the 93-of-150 visibility result and
              the evidence-without-credit finding. Those answers do not enter the direct-selection
              candidate scoring, breadth tiers or question shortlists.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
