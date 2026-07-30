import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ResearchAuditCta,
  ResearchDrawer,
  ResearchMasthead,
  VisibilityStandings
} from "@/components/research";
import { ResearchEditionSchema } from "@/components/research/ResearchEditionSchema";
import {
  getResearchEditionDefinition,
  getResearchEditionPath,
  getResearchMethodPath,
  researchEditions
} from "@/content/research";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { loadResearchEdition } from "@/lib/research-data";
import { siteUrl } from "@/lib/utils";

type ResearchEditionPageProps = {
  params: Promise<{ edition: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchEditions.map((edition) => ({ edition: edition.slug }));
}

function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

export async function generateMetadata({ params }: ResearchEditionPageProps): Promise<Metadata> {
  const { edition: slug } = await params;
  const edition = getResearchEditionDefinition(slug);
  if (!edition) return {};
  const route = getResearchEditionPath(edition);

  return {
    title: edition.metaTitle,
    description: edition.metaDescription,
    robots:
      edition.publicationStatus === "published" || edition.publicationStatus === "corrected"
        ? { index: true, follow: true }
        : { index: false, follow: false, noarchive: true },
    alternates: { canonical: route },
    openGraph: {
      type: "article",
      siteName: "Studio Baggio",
      url: `${siteUrl}${route}`,
      title: edition.metaTitle,
      description: edition.metaDescription,
      images: [defaultOpenGraphImage]
    },
    twitter: {
      card: "summary_large_image",
      title: edition.metaTitle,
      description: edition.metaDescription,
      images: [defaultTwitterImage]
    }
  };
}

function UnavailableEdition({
  edition,
  message
}: {
  edition: NonNullable<ReturnType<typeof getResearchEditionDefinition>>;
  message: string;
}) {
  return (
    <div className="home-4b research-page" data-research-page>
      <header className="research-method-masthead">
        <div className="editorial-container">
          <p className="eyebrow">{edition.franchise}</p>
          <h1>{edition.title}</h1>
          <p>{edition.statusLabel}</p>
        </div>
      </header>
      <section className="research-unavailable" aria-labelledby="research-unavailable-title">
        <div className="editorial-container">
          <h2 id="research-unavailable-title">Evidence unavailable</h2>
          <p>{message}</p>
          <p>No pilot, diagnostic, composite or raw-response data has been substituted.</p>
          <Link href="/research">Return to research</Link>
        </div>
      </section>
    </div>
  );
}

export default async function ResearchEditionPage({ params }: ResearchEditionPageProps) {
  const { edition: slug } = await params;
  const result = await loadResearchEdition(slug);
  if (!result) notFound();
  if (result.status === "unavailable") {
    return <UnavailableEdition edition={result.edition} message={result.message} />;
  }

  const { edition, dataset, view } = result;
  const methodPath = getResearchMethodPath(edition);
  const engineNames = [...edition.expected.engines];

  return (
    <div className="home-4b research-page" data-research-page>
      <ResearchEditionSchema edition={edition} dataset={dataset} />

      <ResearchMasthead
        edition={{
          eyebrow: edition.franchise,
          title: "UK financial advice firms in AI search · 2026",
          finding: view.headlineFinding,
          description: "We examined AI visibility across the UK financial advice sector by tracking 52 accredited firms through 25 buyer questions and 225 answers from OpenAI, Gemini and Perplexity.",
          summary: "Here is what the results reveal about who gets named, whose content gets cited and where the biggest visibility gaps remain.",
          sampleQuestions: [
            "Can I retire at 60 with a £500,000 pension?",
            "How can I reduce inheritance tax legally in the UK?",
            "Which UK financial advice firms specialise in retirement planning?"
          ],
          publicationDate:
            edition.publicationStatus === "corrected" && edition.correctedAt
              ? formatResearchDate(edition.correctedAt)
              : edition.publishedAt
                ? formatResearchDate(edition.publishedAt)
                : view.preparedForReview,
          dateLabel:
            edition.publicationStatus === "corrected"
              ? "Corrected"
              : edition.publicationStatus === "published"
                ? "Published"
                : edition.publicationStatus === "superseded"
                  ? "Superseded"
                  : "Prepared for review",
          runWindow: view.runWindow,
          methodVersion: dataset.manifest.method_version,
          status:
            edition.publicationStatus === "published"
              ? "current"
              : edition.publicationStatus === "corrected"
                ? "corrected"
                : edition.publicationStatus === "superseded"
                  ? "superseded"
                  : "prepared",
          statusDetail:
            edition.publicationStatus === "superseded" && edition.supersededBy
              ? `Superseded by ${edition.supersededBy}.`
              : edition.publicationStatus === "review"
                ? "Legal, compliance and publication approval remain separate gates."
                : undefined
        }}
      />

      <section
        className="research-executive-summary"
        aria-labelledby="research-executive-summary-title"
      >
        <div className="editorial-container research-executive-summary__inner">
          <header className="research-executive-summary__header">
            <p className="eyebrow">Executive summary</p>
            <h2 id="research-executive-summary-title">What this benchmark found</h2>
            <p className="research-executive-summary__lead">
              Most firms are absent when prospective clients use AI to find financial advice.
              Even when a firm&apos;s content helps produce an answer, the firm may not be introduced
              to the buyer.
            </p>
          </header>

          <ul className="research-executive-summary__findings">
            <li>
              <h3>Most firms are invisible in AI search.</h3>
              <p>
                Forty-one of the 52 firms were neither named nor cited in any of the 225 answers.
                Only AAB Wealth and Penguin Wealth were named consistently for any buyer question.
              </p>
            </li>
            <li>
              <h3>Visibility appears closest to a buying decision.</h3>
              <p>
                Firms surfaced when buyers asked who to choose, particularly for a location or
                specialism. General advice, retirement scenarios and tax questions did not name a
                firm.
              </p>
            </li>
            <li>
              <h3>Retirement planning is the clearest visibility gap.</h3>
              <p>
                None of the 52 firms appeared in the answer or its sources across the 45 retirement
                and pension scenario answers, despite retirement planning being a core service
                across the cohort.
              </p>
            </li>
            <li>
              <h3>Useful content does not guarantee brand discovery.</h3>
              <p>
                Pyrford Financial Planning and Chesterton House had content used as evidence, but
                the firms were not consistently named to the buyer. Citation authority and brand
                discovery are different outcomes.
              </p>
            </li>
            <li>
              <h3>No firm has dependable visibility across AI platforms.</h3>
              <p>
                No firm achieved consistent visibility on OpenAI, and only one firm-and-question
                result held across more than one platform. A single AI search gives firms a
                misleading picture of their visibility.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <VisibilityStandings
        rows={view.rows}
        engines={engineNames}
        summary={`${dataset.manifest.signal.firm_count} accredited UK financial planning firms. Search the full cohort or open a firm name for its evidence.`}
      />

      <section className="research-key-findings" aria-labelledby="research-key-findings-title" data-research-findings>
        <div className="editorial-container">
          <div className="research-section-heading">
            <p className="eyebrow">What the results show</p>
            <div>
              <h2 id="research-key-findings-title">What the 225 answers reveal</h2>
              <p>The results show a sparse, uneven discovery market. They do not assess advice quality or recommend a firm.</p>
            </div>
          </div>
          <ol className="research-findings-list">
            <li data-research-finding-item>
              <span>01</span>
              <div>
                <h3>Firms appeared when buyers asked who to choose</h3>
                <p>Only 21 of 225 answers named a cohort firm. Every one came from a local recommendation or adviser-selection question. General advice, retirement and tax questions named none.</p>
              </div>
            </li>
            <li data-research-finding-item>
              <span>02</span>
              <div>
                <h3>Retirement questions produced no cohort visibility</h3>
                <p>Across all 45 answers to the five retirement and pension questions, none of the 52 firms appeared in the answer or its sources.</p>
              </div>
            </li>
            <li data-research-finding-item>
              <span>03</span>
              <div>
                <h3>Visibility did not transfer cleanly between platforms</h3>
                <p>OpenAI produced no repeated firm result; Gemini and Perplexity produced three each. Only one firm-and-question result repeated on more than one platform.</p>
              </div>
            </li>
            <li data-research-finding-item>
              <span>04</span>
              <div>
                <h3>Being used as a source is different from being named</h3>
                <p>Two of the four firms with a repeated result were repeatedly cited as sources without being repeatedly named in the answer shown to the buyer.</p>
              </div>
            </li>
            <li data-research-finding-item>
              <span>05</span>
              <div>
                <h3>Local discovery was sharply uneven</h3>
                <p>The same recommendation question produced no cohort firm for Manchester, but repeated results for Penguin Wealth in Cardiff and AAB Wealth in Belfast.</p>
              </div>
            </li>
            <li data-research-finding-item>
              <span>06</span>
              <div>
                <h3>Repeating the test changed the result</h3>
                <p>Twenty firm, question and platform combinations produced at least one appearance. Fifteen changed across the three runs, which is why a single answer is not a reliable visibility test.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="research-method-disclosure" aria-labelledby="research-method-disclosure-title">
        <div className="editorial-container">
          <p className="eyebrow">Method at a glance</p>
          <h2 id="research-method-disclosure-title">How we measured this</h2>
          <ResearchDrawer
            eyebrow="Method at a glance"
            title="How we measured this"
            trigger="Open methodology"
            triggerClassName="research-method-drawer-trigger"
          >
            <p>We tested 25 fixed buyer questions across OpenAI, Gemini and Perplexity, repeated every question three times with web search and sources enabled, and evaluated the results against 52 firms from the dated CISI Current Accredited Financial Planning Firms source. <Link href={methodPath}>Read the full method, evidence table and processed downloads</Link>.</p>
            <dl className="research-drawer-definition-list">
              <div><dt>Questions</dt><dd>25 buyer questions</dd></div>
              <div><dt>Platforms</dt><dd>OpenAI, Gemini and Perplexity</dd></div>
              <div><dt>Repeats</dt><dd>Three answers per question and platform</dd></div>
              <div><dt>Firms checked</dt><dd>52</dd></div>
            </dl>
          </ResearchDrawer>
        </div>
      </section>

      <ResearchAuditCta
        href={edition.auditCta.href}
        title={edition.auditCta.title}
        body={edition.auditCta.body}
      />
    </div>
  );
}
