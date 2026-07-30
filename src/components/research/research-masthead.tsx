import type { ResearchEditionMasthead } from "./types";

const statusLabels = {
  prepared: "Prepared for review",
  current: "Current edition",
  corrected: "Corrected edition",
  superseded: "Superseded edition"
} as const;

export function ResearchMasthead({ edition }: { edition: ResearchEditionMasthead }) {
  const status = edition.status ?? "prepared";

  return (
    <header className="research-masthead" data-research-masthead>
      <div className="editorial-container research-masthead__grid">
        <div className="research-masthead__edition">
          <p className="eyebrow" data-research-masthead-item>
            {edition.eyebrow ?? "Studio Baggio AI Search Benchmark"}
          </p>
          <p className={`research-edition-status research-edition-status--${status}`} data-research-masthead-item>
            {statusLabels[status]}
          </p>
        </div>

        <div className="research-masthead__statement">
          <h1 data-research-masthead-item>{edition.title}</h1>
          <p className="research-masthead__summary" data-research-masthead-item>
            {edition.summary}
          </p>
        </div>

        <dl className="research-masthead__metadata" data-research-masthead-item>
          <div>
            <dt>{edition.dateLabel ?? "Prepared for review"}</dt>
            <dd>{edition.publicationDate}</dd>
          </div>
          <div>
            <dt>Research run</dt>
            <dd>{edition.runWindow}</dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>{edition.methodVersion}</dd>
          </div>
        </dl>

        {edition.statusDetail ? (
          <aside className={`research-version-notice research-version-notice--${status}`} data-research-masthead-item>
            <strong>{statusLabels[status]}.</strong> {edition.statusDetail}
          </aside>
        ) : null}
      </div>
    </header>
  );
}
