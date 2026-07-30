"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";
import {
  researchEngineLabel,
  type EvidenceRow,
  type FirmResultState
} from "./types";

const resultLabels: Record<FirmResultState, string> = {
  "named-repeated": "Named repeatedly",
  "website-cited-repeated": "Website cited repeatedly",
  "appeared-not-repeated": "Appeared, but not repeatedly",
  "no-appearance": "No appearance in this test",
  incomplete: "Incomplete coverage"
};

const alphabetical = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base"
});
const subscribeToHydration = () => () => {};
const DEFAULT_VISIBLE_FIRMS = 20;
const resultOrder: Record<FirmResultState, number> = {
  "named-repeated": 0,
  "website-cited-repeated": 1,
  "appeared-not-repeated": 2,
  "no-appearance": 3,
  incomplete: 4
};

function ratio(count: number, denominator: number) {
  return `${count} of ${denominator}`;
}

type VisibilityStandingsProps = {
  engines: string[];
  rows: EvidenceRow[];
  summary: string;
};

/**
 * A progressively enhanced, alphabetical view of the complete firm cohort.
 * The initial server render contains every row; filtering begins after hydration
 * and never animates or assigns an ordinal position.
 */
export function VisibilityStandings({ engines, rows, summary }: VisibilityStandingsProps) {
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("all");
  const [result, setResult] = useState<"all" | FirmResultState>("all");
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  const visibleRows = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase("en-GB");

    return rows
      .filter((row) => {
        const matchesFirm =
          !normalisedQuery || row.firmName.toLocaleLowerCase("en-GB").includes(normalisedQuery);
        const matchesResult = result === "all" || row.resultState === result;
        const selectedEngine = row.perEngine.find((item) => item.engine === engine);
        const matchesEngine =
          engine === "all" || Boolean(selectedEngine && selectedEngine.status === "observed");

        return matchesFirm && matchesResult && matchesEngine;
      })
      .sort(
        (left, right) =>
          resultOrder[left.resultState] - resultOrder[right.resultState] ||
          alphabetical.compare(left.firmName, right.firmName)
      );
  }, [engine, query, result, rows]);

  const hasActiveFilters = query !== "" || engine !== "all" || result !== "all";
  const displayedRows =
    isHydrated && !hasActiveFilters
      ? visibleRows.slice(0, DEFAULT_VISIBLE_FIRMS)
      : visibleRows;

  const clearFilters = () => {
    setQuery("");
    setEngine("all");
    setResult("all");
  };

  const platformResult = (row: EvidenceRow, engineName: string) => {
    const repeated = row.repeatedEvidence.filter((item) => item.engine === engineName);
    if (repeated.some((item) => item.namedCount >= 2)) {
      return { label: "Named repeatedly", state: "named" };
    }
    if (repeated.some((item) => item.citedCount >= 2)) {
      return { label: "Website cited repeatedly", state: "cited" };
    }
    if (row.isolatedEvidence.some((item) => item.engine === engineName)) {
      return { label: "Appeared once", state: "once" };
    }
    return { label: "No appearance", state: "none" };
  };

  return (
    <section
      className="research-section research-standings"
      aria-labelledby="research-standings-title"
      data-research-standings
    >
      <div className="editorial-container">
        <div className="research-section-heading research-standings__heading">
          <p className="eyebrow">Firm results</p>
          <div>
            <h2 id="research-standings-title">Where firms appeared</h2>
            <p id="research-standings-summary">{summary}</p>
            <p className="research-standings-explainer">Each question was asked three times on every platform. “Named repeatedly” means the firm appeared in at least two answer texts. “Website cited repeatedly” means its site was used in at least two source lists, even if the firm was not named to the buyer.</p>
          </div>
        </div>

        <div className="research-standings-controls" aria-label="Filter visibility standings">
          <label className="research-control research-control--search">
            <span>Find a firm</span>
            <span className="research-search-field">
              <Search aria-hidden="true" />
              <input
                type="search"
                value={query}
                placeholder="Search firm name"
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>

          <label className="research-control">
            <span>Engine</span>
            <select value={engine} onChange={(event) => setEngine(event.target.value)}>
              <option value="all">Any engine</option>
              {engines.map((item) => (
                <option key={item} value={item}>
                  Repeated appearance on {researchEngineLabel(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="research-control">
            <span>Result</span>
            <select
              value={result}
              onChange={(event) =>
                setResult(event.target.value as "all" | FirmResultState)
              }
            >
              <option value="all">All states</option>
              {Object.entries(resultLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="research-filter-reset"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            <X aria-hidden="true" />
            Clear filters
          </button>
        </div>

        <div className="research-standings-toolbar">
          <p role="status" aria-live="polite">
            Showing {displayedRows.length} of {rows.length} firms. Search checks all {rows.length}. Repeated results first; alphabetical within each result.
          </p>
        </div>

        <div
          className="research-standings-table-frame"
          role="region"
          aria-label="Scrollable visibility standings"
          tabIndex={0}
        >
          <table className="research-standings-table" aria-describedby="research-standings-summary">
            <caption className="sr-only">
              Repeated appearances are shown first, then firms are alphabetical within each result. Each question was asked three times on every engine. A repeated
              appearance requires at least two appearances in the same three-answer set. This is not
              a rank, recommendation or quality judgement.
            </caption>
            <thead>
              <tr>
                <th scope="col">Firm</th>
                <th scope="col">Result in this test</th>
                {engines.map((item) => (
                  <th key={item} scope="col">
                    {researchEngineLabel(item)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedRows.length ? (
                displayedRows.map((row) => (
                  <tr key={row.firmId}>
                    <th scope="row" data-label="Firm">
                      <ResearchDrawer
                        eyebrow="Firm evidence snapshot"
                        title={row.firmName}
                        trigger={row.firmName}
                        triggerClassName="research-firm-drawer-trigger"
                      >
                        <p className="research-drawer-domain">{row.firmDomain}</p>
                        <p className="research-drawer-lead">
                          {row.resultState === "named-repeated"
                            ? "The firm was named in at least two of three answers for the same question on the same platform."
                            : row.resultState === "website-cited-repeated"
                              ? "The firm’s website was cited in at least two of three answers for the same question on the same platform, but the firm itself was not named repeatedly."
                              : row.resultState === "appeared-not-repeated"
                                ? "The firm name or website appeared in this test, but never in at least two of three runs for the same question on the same platform."
                                : row.resultState === "no-appearance"
                                  ? "Across all 225 answers, the firm’s name did not appear and its website was not cited."
                                  : "Some answers were incomplete, so this firm does not have full coverage."}
                        </p>
                        <dl className="research-drawer-definition-list">
                          <div><dt>Result in this test</dt><dd>{resultLabels[row.resultState]}</dd></div>
                          <div><dt>Test scope</dt><dd>25 questions · 3 platforms · 3 runs · 225 answers</dd></div>
                          <div><dt>Named in answers</dt><dd>{ratio(row.namedObservations.count, row.namedObservations.denominator)}</dd></div>
                          <div><dt>Website cited</dt><dd>{ratio(row.citedDomainObservations.count, row.citedDomainObservations.denominator)}</dd></div>
                          <div><dt>Used as a source without being named</dt><dd>{ratio(row.sourceOnlyObservations.count, row.sourceOnlyObservations.denominator)}</dd></div>
                        </dl>

                        {row.repeatedEvidence.length ? (
                          <>
                            <h3>Where it repeated</h3>
                            <ul className="research-drawer-evidence-list">
                              {row.repeatedEvidence.map((item) => (
                                <li key={`${item.queryId}-${item.engine}`}>
                                  <blockquote>“{item.question}”</blockquote>
                                  <p>{researchEngineLabel(item.engine)} · Named in {item.namedCount} of {item.validCount} answers · Website cited in {item.citedCount} of {item.validCount}</p>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}

                        {row.isolatedEvidence.length ? (
                          <>
                            <h3>Other one-off appearances</h3>
                            <ul className="research-drawer-evidence-list research-drawer-evidence-list--secondary">
                              {row.isolatedEvidence.map((item) => (
                                <li key={`${item.queryId}-${item.engine}`}>
                                  <blockquote>“{item.question}”</blockquote>
                                  <p>{researchEngineLabel(item.engine)} · Named in {item.namedCount} of {item.validCount} answers · Website cited in {item.citedCount} of {item.validCount}</p>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                        <h3>Platform results</h3>
                        <ul className="research-drawer-engine-list">
                          {engines.map((engineName) => {
                            return (
                              <li key={engineName}>
                                <span>{researchEngineLabel(engineName)}</span>
                                <strong>{platformResult(row, engineName).label}</strong>
                              </li>
                            );
                          })}
                        </ul>
                        <p className="research-drawer-caveat">This snapshot reports where the firm appeared in this dated test. It does not assess advice quality, explain why the result occurred or recommend the firm.</p>
                      </ResearchDrawer>
                    </th>
                    <td data-label="Result">
                      <span
                        className={`research-visibility-state research-visibility-state--${row.resultState}`}
                      >
                        {resultLabels[row.resultState]}
                      </span>
                    </td>
                    {engines.map((item) => {
                      const platform = platformResult(row, item);

                      return (
                        <td key={item} data-label={researchEngineLabel(item)}>
                          <span className={`research-engine-state research-engine-state--${platform.state}`}>
                            {platform.label}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr className="research-standings-empty">
                  <td colSpan={2 + engines.length}>
                    <strong>No firms match those filters.</strong>
                    <span>Clear or change a filter to return to the complete cohort.</span>
                    <button type="button" onClick={clearFilters}>
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
