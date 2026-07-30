import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EngineComparison,
  EvidenceTable,
  MethodVersionStrip,
  QueryCoverageMatrix,
  ResearchAuditCta,
  ResearchDownloads,
  ResearchStatRail
} from "@/components/research";
import { ResearchDatasetSchema } from "@/components/research/ResearchDatasetSchema";
import { ResearchMethodSchema } from "@/components/research/ResearchMethodSchema";
import { researchEngineLabel } from "@/components/research/types";
import {
  getResearchEditionDefinition,
  getResearchEditionPath,
  getResearchMethodPath,
  researchEditions
} from "@/content/research";
import { defaultOpenGraphImage, defaultTwitterImage } from "@/lib/metadata";
import { loadResearchEdition } from "@/lib/research-data";
import { siteUrl } from "@/lib/utils";

type ResearchMethodPageProps = {
  params: Promise<{ edition: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return researchEditions.map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({ params }: ResearchMethodPageProps): Promise<Metadata> {
  const { edition: slug } = await params;
  const edition = getResearchEditionDefinition(slug);
  if (!edition) return {};
  const route = getResearchMethodPath(edition);
  const title = `${edition.title}: Method | Studio Baggio`;
  const description = `Cohort, query corpus, formulas, limitations, disclosure and corrections for ${edition.title}.`;

  return {
    title,
    description,
    robots:
      edition.publicationStatus === "published" || edition.publicationStatus === "corrected"
        ? { index: true, follow: true }
        : { index: false, follow: false, noarchive: true },
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

export default async function ResearchMethodPage({ params }: ResearchMethodPageProps) {
  const { edition: slug } = await params;
  const result = await loadResearchEdition(slug);
  if (!result) notFound();

  if (result.status === "unavailable") {
    return (
      <div className="home-4b research-page research-method-page" data-research-page>
        <header className="research-method-masthead">
          <div className="editorial-container">
            <p className="eyebrow">{result.edition.franchise}</p>
            <h1>{result.edition.title}: method</h1>
            <p>{result.edition.statusLabel}</p>
          </div>
        </header>
        <section className="research-unavailable" aria-labelledby="research-method-unavailable-title">
          <div className="editorial-container">
            <h2 id="research-method-unavailable-title">Method package unavailable</h2>
            <p>{result.message}</p>
            <p>The site will not substitute pilot, diagnostic, composite or raw-response data.</p>
            <Link href="/research">Return to research</Link>
          </div>
        </section>
      </div>
    );
  }

  const { edition, dataset, view } = result;
  const editionPath = getResearchEditionPath(edition);
  const engineNames = [...edition.expected.engines];
  const evidenceSummary = `${view.headlineFinding} ${view.validResponseSummary} The complete processed table is alphabetical by default and does not assign ranks or bands.`;

  return (
    <div className="home-4b research-page research-method-page" data-research-page>
      <ResearchMethodSchema edition={edition} />
      <ResearchDatasetSchema edition={edition} dataset={dataset} view={view} />

      <header className="research-method-masthead">
        <div className="editorial-container">
          <p className="eyebrow">{edition.franchise}</p>
          <h1>{edition.title}: method</h1>
          <p>
            {edition.statusLabel} {view.preparedForReview}. Method {dataset.manifest.method_version}.
          </p>
          <p>{edition.method.overview}</p>
          <Link href={editionPath}>Return to the evidence</Link>
        </div>
      </header>

      <nav className="editorial-container research-method-nav research-method-nav--top" aria-label="Method contents">
        <p className="eyebrow">On this page</p>
        <ol>
          <li><a href="#engine-evidence">Engine evidence</a></li>
          <li><a href="#query-matrix">Query matrix</a></li>
          <li><a href="#evidence-table">Full evidence table</a></li>
          <li><a href="#downloads">Downloads</a></li>
          <li><a href="#scope">Scope and run</a></li>
          <li><a href="#cohort">Cohort</a></li>
          <li><a href="#corpus">Query corpus</a></li>
          <li><a href="#classification">Classification</a></li>
          <li><a href="#formulas">Formulas</a></li>
          <li><a href="#limitations">Limitations</a></li>
          <li><a href="#disclosure">Disclosure</a></li>
          <li><a href="#versions">Version history</a></li>
          <li><a href="#corrections">Corrections</a></li>
        </ol>
      </nav>

      <ResearchStatRail stats={view.stats} />

      <div id="engine-evidence">
        <EngineComparison
          engines={view.engines}
          summary="Counts show valid grounded responses that observed at least one firm in the frozen cohort. Invalid responses remain outside the denominator."
        />
      </div>

      <div id="query-matrix">
        <QueryCoverageMatrix
          queries={view.queries}
          engines={engineNames}
          summary="The 25-question instrument is shown in full. Each engine cell reports grounded validity across three repetitions; instability remains explicit."
        />
      </div>

      <div id="evidence-table">
        <EvidenceTable
          rows={view.rows}
          engines={engineNames}
          summary={evidenceSummary}
          cohortLabel={edition.cohort.label}
          runWindow={view.runWindow}
          methodVersion={dataset.manifest.method_version}
        />
      </div>

      <div className="editorial-container research-downloads-frame" id="downloads">
        <ResearchDownloads
          downloads={view.downloads}
          error={
            view.downloads.length
              ? undefined
              : "The reviewed package did not include a verified public download."
          }
        />
      </div>

      <div className="editorial-container research-method-layout research-method-layout--single">
        <article className="research-method-content">
          <section id="scope" className="research-method-section" aria-labelledby="scope-title">
            <p className="eyebrow">01 / Scope</p>
            <h2 id="scope-title">Scope and run</h2>
            <p>{edition.method.overview}</p>
            <dl className="research-definition-list">
              <div><dt>Research run</dt><dd>{view.runWindow}</dd></div>
              <div><dt>Prepared for review</dt><dd>{view.preparedForReview}</dd></div>
              <div><dt>Method</dt><dd>{dataset.manifest.method_version}</dd></div>
              <div><dt>Matcher</dt><dd>{dataset.manifest.matcher_version}</dd></div>
              <div><dt>Corpus</dt><dd>{dataset.manifest.corpus_version}</dd></div>
              <div><dt>Cohort</dt><dd>{dataset.manifest.cohort_version}</dd></div>
              <div><dt>Responses</dt><dd>{view.validResponseSummary}</dd></div>
              <div><dt>Publication mode</dt><dd>Sector report only; no ranks or bands</dd></div>
            </dl>
            <h3>Engine settings</h3>
            <ul>
              {edition.expected.engines.map((engine) => (
                <li key={engine}>
                  <strong>{researchEngineLabel(engine)}</strong>: model{" "}
                  <code>{dataset.manifest.provider_models[engine]}</code>; grounded API surface{" "}
                  <code>
                    {[
                      ...new Set(
                        dataset.observations
                          .filter((row) => row.engine === engine)
                          .map((row) => row.tool_surface)
                      )
                    ].join(", ")}
                  </code>
                </li>
              ))}
            </ul>
          </section>

          <section id="cohort" className="research-method-section" aria-labelledby="cohort-title">
            <p className="eyebrow">02 / Cohort</p>
            <h2 id="cohort-title">A reproducible published universe</h2>
            <p><strong>{edition.cohort.label}</strong>, snapshot {formatDate(edition.cohort.snapshotDate)}.</p>
            <p>
              Source: <a href={edition.cohort.sourceUrl}>{edition.cohort.source}</a>. The dated source
              snapshot, source order and linked domains are retained in the private cohort registry.
            </p>
            <p>{edition.cohort.inclusionRule}</p>
            <p>{edition.cohort.disclosure}</p>
          </section>

          <section id="corpus" className="research-method-section" aria-labelledby="corpus-title">
            <p className="eyebrow">03 / Corpus</p>
            <h2 id="corpus-title">The 25 buyer questions</h2>
            <p>
              Every engine received the same exact question text. Geographic questions use the fixed
              location shown below.
            </p>
            <ol className="research-query-corpus">
              {view.queries.map((query) => (
                <li key={query.id}>
                  <span>{query.id}</span>
                  <div>
                    <strong>{query.label}</strong>
                    <small>{query.intentGroup.replaceAll("_", " ")} · {query.locale}</small>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="classification" className="research-method-section" aria-labelledby="classification-title">
            <p className="eyebrow">04 / Classification</p>
            <h2 id="classification-title">What counts as observed</h2>
            <p>{edition.method.positiveRule}</p>
            <p>{edition.method.validityRule}</p>
            <p>{edition.method.repetitionRule}</p>
            <dl className="research-definition-list">
              {edition.method.stabilityDefinitions.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="formulas" className="research-method-section" aria-labelledby="formulas-title">
            <p className="eyebrow">05 / Formulas</p>
            <h2 id="formulas-title">Published measures</h2>
            <dl className="research-definition-list">
              {edition.method.formulas.map((item) => (
                <div key={item.measure}>
                  <dt>{item.measure}</dt>
                  <dd>{item.formula}</dd>
                </div>
              ))}
            </dl>
            <ul>
              {edition.method.publishedMeasures.map((measure) => <li key={measure}>{measure}</li>)}
            </ul>
          </section>

          <section id="limitations" className="research-method-section" aria-labelledby="limitations-title">
            <p className="eyebrow">06 / Limitations</p>
            <h2 id="limitations-title">How to read the evidence</h2>
            <ul>
              {edition.method.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
            </ul>
          </section>

          <section id="disclosure" className="research-method-section" aria-labelledby="disclosure-title">
            <p className="eyebrow">07 / Disclosure</p>
            <h2 id="disclosure-title">Commercial independence</h2>
            <p>{edition.method.disclosure}</p>
            <p>
              Full raw answers, provider payloads and operational logs remain private. Public downloads
              contain reviewed processed evidence only.
            </p>
          </section>

          <section id="versions" className="research-method-section" aria-labelledby="versions-title">
            <p className="eyebrow">08 / Versions</p>
            <h2 id="versions-title">Version history</h2>
            <ol>
              {edition.method.changeLog.map((entry) => (
                <li key={`${entry.version}-${entry.date}`}>
                  <strong>{entry.version}</strong> · {formatDate(entry.date)}
                  <p>{entry.summary}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="corrections" className="research-method-section" aria-labelledby="corrections-title">
            <p className="eyebrow">09 / Corrections</p>
            <h2 id="corrections-title">Corrections record</h2>
            {edition.corrections.length ? (
              <ol>
                {edition.corrections.map((correction) => (
                  <li key={`${correction.date}-${correction.summary}`}>
                    <strong>{formatDate(correction.date)}</strong>
                    <p>{correction.summary}</p>
                    <p>
                      Headline finding: {correction.affectsHeadlineFinding ? "changed" : "unchanged"}. Firm
                      results: {correction.affectsFirmResults ? "changed" : "unchanged"}.
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="research-correction-state">No corrections are recorded for this review candidate.</p>
            )}
            <p>
              To request a correction or raise an evidence concern, use the{" "}
              <Link href="/contact?utm_source=research&utm_medium=benchmark&utm_campaign=uk-financial-advice-2026&utm_content=corrections">
                Studio Baggio corrections route
              </Link>{" "}
              and identify the firm, evidence row and requested change.
            </p>
          </section>
        </article>
      </div>

      <MethodVersionStrip
        items={[
          {
            label: "Scope and run",
            href: "#scope",
            detail: `Method ${dataset.manifest.method_version}`
          },
          {
            label: "Processed evidence",
            href: "#evidence-table",
            detail: `${view.rows.length} cohort firms`
          },
          {
            label: "Downloads",
            href: "#downloads",
            detail: `${view.downloads.length} verified public files`
          },
          {
            label: "Corrections",
            href: "#corrections",
            detail: edition.corrections.length
              ? `${edition.corrections.length} recorded`
              : "No corrections recorded"
          }
        ]}
      />

      <ResearchAuditCta
        href={edition.auditCta.href}
        title={edition.auditCta.title}
        body={edition.auditCta.body}
      />
    </div>
  );
}
