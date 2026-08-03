"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";
import { type EvidenceRow } from "./types";

const alphabetical = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base"
});
const subscribeToHydration = () => () => {};
const DEFAULT_VISIBLE_FIRMS = 20;

function repeatedNamedCells(row: EvidenceRow) {
  return row.repeatedEvidence.filter((item) => item.namedCount >= 2).length;
}

function repeatedCitedCells(row: EvidenceRow) {
  return row.repeatedEvidence.filter((item) => item.citedCount >= 2).length;
}

function evidenceSignature(row: EvidenceRow) {
  return [
    row.namedObservations.count,
    repeatedNamedCells(row),
    row.citedDomainObservations.count,
    repeatedCitedCells(row),
    row.queryBreadth.count
  ].join("|");
}

function compareEvidence(left: EvidenceRow, right: EvidenceRow) {
  return (
    right.namedObservations.count - left.namedObservations.count ||
    repeatedNamedCells(right) - repeatedNamedCells(left) ||
    right.citedDomainObservations.count - left.citedDomainObservations.count ||
    repeatedCitedCells(right) - repeatedCitedCells(left) ||
    right.queryBreadth.count - left.queryBreadth.count ||
    alphabetical.compare(left.firmName, right.firmName)
  );
}

function ratio(count: number, denominator: number) {
  return `${count} of ${denominator}`;
}

function percentage(count: number, denominator: number) {
  if (!denominator) return "0%";
  const value = (count / denominator) * 100;
  return `${value < 1 && value > 0 ? value.toFixed(1) : Number(value.toFixed(1))}%`;
}

function questionsWhereVisible(row: EvidenceRow) {
  return Array.from(
    new Set(
      [...row.repeatedEvidence, ...row.isolatedEvidence].map((item) => item.question)
    )
  );
}

type VisibilityStandingsProps = {
  rows: EvidenceRow[];
  summary: string;
};

/**
 * A progressively enhanced evidence ranking of the complete firm cohort.
 * The initial server render contains every row; filtering begins after hydration
 * and never animates table rows.
 */
export function VisibilityStandings({ rows, summary }: VisibilityStandingsProps) {
  const [query, setQuery] = useState("");
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  const rankedRows = useMemo(() => [...rows].sort(compareEvidence), [rows]);
  const rankByFirm = useMemo(() => {
    const ranks = new Map<string, number>();
    let previousSignature = "";
    let currentRank = 0;

    rankedRows.forEach((row, index) => {
      const signature = evidenceSignature(row);
      if (signature !== previousSignature) currentRank = index + 1;
      ranks.set(row.firmId, currentRank);
      previousSignature = signature;
    });

    return ranks;
  }, [rankedRows]);

  const visibleRows = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase("en-GB");

    return rankedRows
      .filter((row) => {
        const matchesFirm =
          !normalisedQuery || row.firmName.toLocaleLowerCase("en-GB").includes(normalisedQuery);
        return matchesFirm;
      });
  }, [query, rankedRows]);

  const hasActiveFilters = query !== "";
  const displayedRows =
    isHydrated && !hasActiveFilters
      ? visibleRows.slice(0, DEFAULT_VISIBLE_FIRMS)
      : visibleRows;

  const clearFilters = () => {
    setQuery("");
  };

  return (
    <section
      id="firm-results"
      className="research-section research-standings"
      aria-labelledby="research-standings-title"
      data-research-standings
    >
      <div className="editorial-container">
        <div className="research-section-heading research-standings__heading">
          <p className="eyebrow">150-firm index</p>
          <div>
            <h2 id="research-standings-title">AI Visibility Rankings</h2>
            <p id="research-standings-summary">{summary}</p>
          </div>
        </div>

        <div className="research-standings-controls" aria-label="Search visibility rankings">
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

          {hasActiveFilters ? (
            <button
              type="button"
              className="research-filter-reset"
              onClick={clearFilters}
            >
              <X aria-hidden="true" />
              Clear search
            </button>
          ) : null}
        </div>

        {hasActiveFilters ? (
          <div className="research-standings-toolbar">
            <p role="status" aria-live="polite">
              Showing {displayedRows.length} matching firms from all {rows.length} firms.
            </p>
          </div>
        ) : null}

        <div
          className="research-standings-table-frame"
          role="region"
          aria-label="Scrollable visibility standings"
          tabIndex={0}
        >
          <table className="research-standings-table" aria-describedby="research-standings-summary">
            <caption className="sr-only">
              Firms are ranked by total name appearances, then repeat-named evidence, website
              citations, repeat-cited evidence and question breadth. This is not a recommendation or quality judgement.
            </caption>
            <thead>
              <tr>
                <th scope="col">Ranked firm</th>
                <th scope="col">Named to the buyer</th>
                <th scope="col">Website cited as a source</th>
                <th scope="col">Buyer questions reached</th>
              </tr>
            </thead>
            <tbody>
              {displayedRows.length ? (
                displayedRows.map((row) => (
                  <tr key={row.firmId}>
                    <th scope="row" data-label="Firm">
                      <span className="research-firm-rank" aria-label={`Rank ${rankByFirm.get(row.firmId)}`}>
                        {rankByFirm.get(row.firmId)}
                      </span>
                      <ResearchDrawer
                        className="research-drawer-panel--firm"
                        eyebrow="Firm evidence snapshot"
                        title={row.firmName}
                        trigger={row.firmName}
                        triggerClassName="research-firm-drawer-trigger"
                      >
                        <p className="research-drawer-domain">{row.firmDomain}</p>
                        <dl className="research-firm-summary">
                          <div>
                            <dt>AI visibility rank</dt>
                            <dd><strong>{rankByFirm.get(row.firmId)}</strong><span>of {rows.length}</span></dd>
                          </div>
                          <div>
                            <dt>Named in answers</dt>
                            <dd><strong>{percentage(row.namedObservations.count, row.namedObservations.denominator)}</strong><span>{ratio(row.namedObservations.count, row.namedObservations.denominator)}</span></dd>
                          </div>
                          <div>
                            <dt>Website cited</dt>
                            <dd><strong>{percentage(row.citedDomainObservations.count, row.citedDomainObservations.denominator)}</strong><span>{ratio(row.citedDomainObservations.count, row.citedDomainObservations.denominator)}</span></dd>
                          </div>
                          <div>
                            <dt>Buyer questions reached</dt>
                            <dd><strong>{row.queryBreadth.count}</strong><span>of {row.queryBreadth.denominator}</span></dd>
                          </div>
                          <div>
                            <dt>Used as a source without being named</dt>
                            <dd><strong>{percentage(row.sourceOnlyObservations.count, row.sourceOnlyObservations.denominator)}</strong><span>{ratio(row.sourceOnlyObservations.count, row.sourceOnlyObservations.denominator)}</span></dd>
                          </div>
                        </dl>

                        {questionsWhereVisible(row).length ? (
                          <div className="research-firm-questions">
                            <h3>Buyer questions where the firm appeared</h3>
                            <ul>
                              {questionsWhereVisible(row).map((question) => (
                                <li key={question}>{question}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="research-firm-no-visibility">
                            The firm was not named and its website was not cited in the 216 answers.
                          </p>
                        )}
                      </ResearchDrawer>
                    </th>
                    <td data-label="Named to the buyer">
                      <span className="research-ranking-metric">
                        <strong>{percentage(row.namedObservations.count, row.namedObservations.denominator)}</strong>
                        <small>{ratio(row.namedObservations.count, row.namedObservations.denominator)} answers</small>
                      </span>
                    </td>
                    <td data-label="Website cited as a source">
                      <span className="research-ranking-metric">
                        <strong>{percentage(row.citedDomainObservations.count, row.citedDomainObservations.denominator)}</strong>
                        <small>{ratio(row.citedDomainObservations.count, row.citedDomainObservations.denominator)} answers</small>
                      </span>
                    </td>
                    <td data-label="Buyer questions reached">
                      <span className="research-ranking-metric">
                        <strong>{row.queryBreadth.count}</strong>
                        <small>of {row.queryBreadth.denominator} questions</small>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="research-standings-empty">
                  <td colSpan={4}>
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
