"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { StabilityMarker, stabilityLabels } from "./stability-marker";
import {
  researchEngineLabel,
  type EvidenceEngineStatus,
  type EvidenceRow,
  type EvidenceVisibilityState,
  type StabilityState
} from "./types";

type EvidenceSort = "alphabetical" | "observed" | "query-breadth" | "engine-breadth";

const visibilityLabels: Record<EvidenceVisibilityState, string> = {
  observed: "Repeated appearance",
  "not-observed": "No repeated appearance",
  partial: "Incomplete coverage"
};

const engineStatusLabels: Record<EvidenceEngineStatus, string> = {
  observed: "Repeated appearance",
  "not-observed": "No repeated appearance",
  invalid: "Incomplete coverage",
  "not-measured": "Not tested"
};

const alphabetical = new Intl.Collator("en-GB", { numeric: true, sensitivity: "base" });
const subscribeToHydration = () => () => {};

function ratio(count: number, denominator: number) {
  return `${count}/${denominator}`;
}

export function EvidenceTable({
  rows,
  engines,
  summary,
  cohortLabel,
  runWindow,
  methodVersion
}: {
  rows: EvidenceRow[];
  engines: string[];
  summary: string;
  cohortLabel: string;
  runWindow: string;
  methodVersion: string;
}) {
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("all");
  const [visibility, setVisibility] = useState<"all" | EvidenceVisibilityState>("all");
  const [stability, setStability] = useState<"all" | StabilityState>("all");
  const [sort, setSort] = useState<EvidenceSort>("alphabetical");
  const [showAllColumns, setShowAllColumns] = useState(false);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );

  const visibleRows = useMemo(() => {
    const normalisedQuery = query.trim().toLocaleLowerCase("en-GB");
    const filtered = rows.filter((row) => {
      const matchesFirm = !normalisedQuery || row.firmName.toLocaleLowerCase("en-GB").includes(normalisedQuery);
      const matchesVisibility = visibility === "all" || row.visibilityState === visibility;
      const matchesStability = stability === "all" || row.stability === stability;
      const selectedEngine = row.perEngine.find((result) => result.engine === engine);
      const matchesEngine = engine === "all" || Boolean(selectedEngine && selectedEngine.status === "observed");

      return matchesFirm && matchesVisibility && matchesStability && matchesEngine;
    });

    return filtered.sort((left, right) => {
      if (sort === "observed") {
        return right.namedObservations.count - left.namedObservations.count || alphabetical.compare(left.firmName, right.firmName);
      }
      if (sort === "query-breadth") {
        return right.queryBreadth.count - left.queryBreadth.count || alphabetical.compare(left.firmName, right.firmName);
      }
      if (sort === "engine-breadth") {
        return right.engineBreadth.count - left.engineBreadth.count || alphabetical.compare(left.firmName, right.firmName);
      }
      return alphabetical.compare(left.firmName, right.firmName);
    });
  }, [engine, query, rows, sort, stability, visibility]);

  const hasActiveFilters = query !== "" || engine !== "all" || visibility !== "all" || stability !== "all";

  const clearFilters = () => {
    setQuery("");
    setEngine("all");
    setVisibility("all");
    setStability("all");
  };

  return (
    <section className="research-section research-evidence" aria-labelledby="research-evidence-title">
      <div className="editorial-container">
        <div className="research-section-heading research-evidence__heading">
          <p className="eyebrow">Processed evidence</p>
          <div>
            <h2 id="research-evidence-title">Firm evidence</h2>
            <p id="research-evidence-summary">{summary}</p>
          </div>
        </div>

        <div className="research-evidence-context" aria-label="Evidence context">
          <p>
            <span>Cohort</span>
            <strong>{cohortLabel}</strong>
          </p>
          <p>
            <span>Research run</span>
            <strong>{runWindow}</strong>
          </p>
          <p>
            <span>Method</span>
            <strong>{methodVersion}</strong>
          </p>
        </div>

        <div className="research-stability-legend" aria-label="Stability legend">
          {(["stable-present", "variable", "not-observed", "not-measured"] as const).map((state) => (
            <StabilityMarker key={state} state={state} />
          ))}
        </div>

        <div className="research-evidence-controls" aria-label="Filter and sort evidence">
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
                  Observed on {researchEngineLabel(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="research-control">
            <span>Visibility</span>
            <select
              value={visibility}
              onChange={(event) => setVisibility(event.target.value as "all" | EvidenceVisibilityState)}
            >
              <option value="all">All states</option>
              {Object.entries(visibilityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="research-control">
            <span>Stability</span>
            <select
              value={stability}
              onChange={(event) => setStability(event.target.value as "all" | StabilityState)}
            >
              <option value="all">All states</option>
              {Object.entries(stabilityLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="research-control">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as EvidenceSort)}>
              <option value="alphabetical">Firm A–Z</option>
              <option value="observed">Named observations</option>
              <option value="query-breadth">Query breadth</option>
              <option value="engine-breadth">Engine breadth</option>
            </select>
          </label>

          <button type="button" className="research-filter-reset" onClick={clearFilters} disabled={!hasActiveFilters}>
            <X aria-hidden="true" />
            Clear filters
          </button>
        </div>

        <div className="research-evidence-toolbar">
          <p role="status" aria-live="polite">
            Showing {visibleRows.length} of {rows.length} firms. {sort === "alphabetical" ? "Default order: firm A–Z." : ""}
          </p>
          {isHydrated ? (
            <button
              type="button"
              className="research-full-table-toggle"
              aria-pressed={showAllColumns}
              onClick={() => setShowAllColumns((current) => !current)}
            >
              {showAllColumns ? "Show mobile summary" : "Show full table"}
            </button>
          ) : null}
        </div>

        <div
          className={`research-evidence-table-frame ${isHydrated ? "is-enhanced" : ""} ${showAllColumns ? "is-expanded" : ""}`}
          role="region"
          aria-label="Scrollable full evidence table"
          tabIndex={0}
        >
          <table className="research-evidence-table" aria-describedby="research-evidence-summary">
            <caption>
              Processed firm evidence. Counts use valid response denominators; invalid or ungrounded observations are shown separately.
            </caption>
            <thead>
              <tr>
                <th scope="col">Firm</th>
                <th scope="col">Visibility</th>
                <th scope="col">Named observations</th>
                <th scope="col">Cited-domain observations</th>
                <th scope="col">Source-only observations</th>
                <th scope="col">Query breadth</th>
                <th scope="col">Engine breadth</th>
                {engines.map((item) => (
                  <th key={item} scope="col">
                    {researchEngineLabel(item)}
                  </th>
                ))}
                <th scope="col">Stability</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length ? (
                visibleRows.map((row) => (
                  <tr key={row.firmId}>
                    <th scope="row" data-label="Firm">
                      {row.firmHref ? <Link href={row.firmHref}>{row.firmName}</Link> : row.firmName}
                    </th>
                    <td data-label="Visibility">
                      <span className={`research-visibility-state research-visibility-state--${row.visibilityState}`}>
                        {visibilityLabels[row.visibilityState]}
                      </span>
                    </td>
                    <td data-label="Named observations">
                      {ratio(row.namedObservations.count, row.namedObservations.denominator)}
                    </td>
                    <td data-label="Cited-domain observations">
                      {ratio(row.citedDomainObservations.count, row.citedDomainObservations.denominator)}
                    </td>
                    <td data-label="Source-only observations">
                      {ratio(row.sourceOnlyObservations.count, row.sourceOnlyObservations.denominator)}
                    </td>
                    <td data-label="Query breadth">{ratio(row.queryBreadth.count, row.queryBreadth.denominator)}</td>
                    <td data-label="Engine breadth">{ratio(row.engineBreadth.count, row.engineBreadth.denominator)}</td>
                    {engines.map((item) => {
                      const result = row.perEngine.find((entry) => entry.engine === item);
                      const status = result?.status ?? "not-measured";

                      return (
                        <td key={item} data-label={researchEngineLabel(item)}>
                          <span className={`research-engine-state research-engine-state--${status}`}>
                            {engineStatusLabels[status]}
                          </span>
                          {result ? (
                            <small>
                              {result.observedCount}/{result.validCount} valid
                              {result.validCount !== result.totalCount ? ` of ${result.totalCount} attempted` : ""}
                            </small>
                          ) : null}
                        </td>
                      );
                    })}
                    <td data-label="Stability">
                      <StabilityMarker state={row.stability} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="research-evidence-empty">
                  <td colSpan={8 + engines.length}>
                    <strong>No firms match those filters.</strong>
                    <span>Clear or change a filter to return to the complete evidence set.</span>
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
