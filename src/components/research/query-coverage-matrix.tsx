import { researchEngineLabel, type CoverageStatus, type QueryCoverageRow } from "./types";
import { StabilityMarker } from "./stability-marker";

const coverageLabels: Record<CoverageStatus, string> = {
  grounded: "Grounded response",
  invalid: "Invalid or ungrounded response",
  "not-measured": "Not measured"
};

const coverageMarks: Record<CoverageStatus, string> = {
  grounded: "G",
  invalid: "I",
  "not-measured": "—"
};

export function QueryCoverageMatrix({
  queries,
  engines,
  title = "Query coverage",
  summary
}: {
  queries: QueryCoverageRow[];
  engines: string[];
  title?: string;
  summary?: string;
}) {
  return (
    <section className="research-section research-matrix-section" aria-labelledby="query-coverage-title" data-research-matrix>
      <div className="editorial-container">
        <div className="research-section-heading">
          <p className="eyebrow">Instrument coverage</p>
          <div>
            <h2 id="query-coverage-title">{title}</h2>
            <p>
              {summary ??
                "Each cell shows whether the engine returned grounded evidence for that buyer question. Invalid responses remain null and are never counted as absence."}
            </p>
          </div>
        </div>

        <div className="research-matrix-legend" aria-label="Coverage legend">
          {Object.entries(coverageLabels).map(([status, label]) => (
            <span key={status}>
              <span className={`research-matrix-mark research-matrix-mark--${status}`} aria-hidden="true">
                {coverageMarks[status as CoverageStatus]}
              </span>
              {label}
            </span>
          ))}
        </div>

        <div className="research-matrix-frame">
          <span className="research-matrix-scan" aria-hidden="true" data-research-matrix-scan />
          <div className="research-matrix-scroll" tabIndex={0} role="region" aria-label="Scrollable query coverage matrix">
            <table className="research-matrix-table">
              <caption>
                {queries.length} buyer questions across {engines.length} grounded AI search engines.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Buyer question</th>
                  {engines.map((engine) => (
                    <th key={engine} scope="col">
                      {researchEngineLabel(engine)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queries.map((query) => (
                  <tr key={query.id}>
                    <th scope="row">
                      <span>{query.id}</span>
                      <strong>{query.label}</strong>
                      <small>{query.intentGroup}</small>
                    </th>
                    {engines.map((engine) => {
                      const cell = query.cells.find((item) => item.engine === engine);
                      const status = cell?.status ?? "not-measured";
                      const validCount = cell?.validCount ?? 0;
                      const totalCount = cell?.totalCount ?? 0;
                      const stability = cell?.stability ?? "not-measured";

                      return (
                        <td
                          key={engine}
                          className={`research-matrix-cell research-matrix-cell--${status}`}
                          data-label={researchEngineLabel(engine)}
                          data-research-matrix-cell
                        >
                          <span className="research-matrix-mark" aria-hidden="true">
                            {coverageMarks[status]}
                          </span>
                          <span className="sr-only">
                            {researchEngineLabel(engine)}: {coverageLabels[status]}; {validCount} of {totalCount} valid repetitions.
                          </span>
                          <small aria-hidden="true">
                            {validCount}/{totalCount}
                          </small>
                          <StabilityMarker state={stability} compact />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
