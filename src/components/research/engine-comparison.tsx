import type { CSSProperties } from "react";
import { researchEngineLabel, type EngineComparisonItem } from "./types";

export function EngineComparison({
  engines,
  title = "Engine comparison",
  summary
}: {
  engines: EngineComparisonItem[];
  title?: string;
  summary?: string;
}) {
  return (
    <section className="research-section research-engine-section" aria-labelledby="engine-comparison-title" data-research-engine-comparison>
      <div className="editorial-container">
        <div className="research-section-heading">
          <p className="eyebrow">Grounded observations</p>
          <div>
            <h2 id="engine-comparison-title">{title}</h2>
            <p>{summary ?? "Observed firm evidence varies by engine. Exact counts and valid denominators remain visible throughout."}</p>
          </div>
        </div>

        <ol className="research-engine-list">
          {engines.map((engine) => {
            const percent = engine.validCount > 0 ? Math.min(100, (engine.observedCount / engine.validCount) * 100) : 0;
            const style = { width: `${percent}%` } as CSSProperties;

            return (
              <li key={engine.name}>
                <div className="research-engine-list__heading">
                  <h3>{researchEngineLabel(engine.name)}</h3>
                  <p>
                    <strong>{engine.observedCount}</strong> observed / {engine.validCount} valid
                    {engine.validCount !== engine.totalCount ? ` / ${engine.totalCount} attempted` : ""}
                  </p>
                </div>
                <div className="research-engine-track" aria-hidden="true">
                  <span style={style} data-research-engine-bar />
                </div>
                {engine.interpretation ? <p className="research-engine-list__note">{engine.interpretation}</p> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
