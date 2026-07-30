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
      <div className="editorial-container research-masthead__shell">
        <p className="eyebrow" data-research-masthead-item>
          {edition.eyebrow ?? "Studio Baggio AI Discovery Benchmark"}
        </p>

        <div className="research-masthead__frame">
          <div className="research-masthead__statement">
            {edition.finding ? (
              <p className="research-masthead__edition-title" data-research-masthead-item>
                {edition.title}
              </p>
            ) : null}
            <h1 data-research-masthead-item>
              {(edition.finding ?? edition.title).replace(/\.$/, "")}
              <span className="research-masthead__blue-dot" aria-hidden="true">.</span>
            </h1>
          </div>

          <div className="research-masthead__copy">
            {edition.description ? (
              <p className="research-masthead__description" data-research-masthead-item>
                {edition.description}
              </p>
            ) : null}
            <p className="research-masthead__summary" data-research-masthead-item>
              {edition.summary}
            </p>
            {edition.sampleQuestions?.length ? (
              <div className="research-masthead__questions" data-research-masthead-item>
                <p className="eyebrow">Examples from the test</p>
                <ul>
                  {edition.sampleQuestions.map((question) => (
                    <li key={question}>&ldquo;{question}&rdquo;</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <dl className="research-masthead__metadata" data-research-masthead-item>
              <div>
                <dt>{edition.dateLabel ?? "Prepared for review"}</dt>
                <dd>{edition.publicationDate}</dd>
              </div>
            </dl>
            {edition.statusDetail ? (
              <aside className={`research-version-notice research-version-notice--${status}`} data-research-masthead-item>
                <strong>{statusLabels[status]}.</strong> {edition.statusDetail}
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
