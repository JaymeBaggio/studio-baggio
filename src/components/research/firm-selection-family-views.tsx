"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";

export type FamilyScoringFraction = {
  numerator: number;
  denominator: number;
  value: number;
};

export type NationalFamilyEntity = {
  entity_id: string;
  display_name: string;
  entity_type:
    | "firm"
    | "individual_adviser"
    | "directory"
    | "regulator"
    | "authority"
    | "other";
  panel_status: "panel" | "outside_panel" | "not_applicable";
  candidate_presence: FamilyScoringFraction;
  normalized_share_of_shortlist: FamilyScoringFraction;
};

export type NationalFamily = {
  family: string;
  question_count: number;
  open_universe_entities: NationalFamilyEntity[];
  constructed_panel_entities: NationalFamilyEntity[];
  outside_panel_entities: NationalFamilyEntity[];
};

export type NationalFamilyViews = {
  pipeline_version: string;
  family_weights: Record<string, number>;
  families: NationalFamily[];
};

type FamilyScope = "open_universe" | "panel" | "outside_panel";
type FamilySort = "shortlist_mass" | "candidate_presence" | "name";

const percentage = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 1
});

const alphabetical = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base"
});

function formatFraction(metric: FamilyScoringFraction) {
  return `${metric.numerator}/${metric.denominator}`;
}

function formatPercentage(metric: FamilyScoringFraction | number) {
  return percentage.format(typeof metric === "number" ? metric : metric.value);
}

function familyLabel(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toLocaleUpperCase("en-GB") + word.slice(1))
    .join(" ");
}

function panelLabel(status: NationalFamilyEntity["panel_status"]) {
  if (status === "panel") return "Constructed panel";
  if (status === "outside_panel") return "Outside panel";
  return "Panel status not applicable";
}

function FamilyEntityEvidence({
  entity,
  family
}: {
  entity: NationalFamilyEntity;
  family: NationalFamily;
}) {
  return (
    <div className="space-y-7">
      <p className="border-l-2 border-blue-600 pl-4 text-sm leading-6 text-neutral-700">
        Family-level aggregation across {family.question_count} national questions. Candidate presence
        and normalized shortlist mass remain separate measures.
      </p>

      <dl className="grid gap-px overflow-hidden border border-neutral-300 bg-neutral-300 sm:grid-cols-2">
        <div className="bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Candidate presence
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black">
            {formatPercentage(entity.candidate_presence)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">{formatFraction(entity.candidate_presence)}</dd>
        </div>
        <div className="bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Normalized shortlist mass
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black">
            {formatPercentage(entity.normalized_share_of_shortlist)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">{formatFraction(entity.normalized_share_of_shortlist)}</dd>
        </div>
      </dl>

      <div className="border-t border-neutral-300 pt-5 text-sm leading-6 text-neutral-600">
        <p><strong className="text-black">Panel context:</strong> {panelLabel(entity.panel_status)}.</p>
        <p className="mt-2">
          <strong className="text-black">Eligibility context:</strong> this is not an
          opportunity-adjusted eligibility result. Eligibility is evaluated separately on verified
          eligible cells.
        </p>
      </div>
    </div>
  );
}

export function FirmSelectionFamilyViews({
  nationalFamilyViews
}: {
  nationalFamilyViews: NationalFamilyViews;
}) {
  const titleId = useId();
  const [selectedFamilyName, setSelectedFamilyName] = useState(
    nationalFamilyViews.families[0]?.family ?? ""
  );
  const [scope, setScope] = useState<FamilyScope>("open_universe");
  const [sort, setSort] = useState<FamilySort>("shortlist_mass");
  const [search, setSearch] = useState("");

  const selectedFamily =
    nationalFamilyViews.families.find((family) => family.family === selectedFamilyName) ??
    nationalFamilyViews.families[0];

  const scopedEntities = useMemo(() => {
    if (!selectedFamily) return [];
    if (scope === "panel") return selectedFamily.constructed_panel_entities;
    if (scope === "outside_panel") return selectedFamily.outside_panel_entities;
    return selectedFamily.open_universe_entities;
  }, [scope, selectedFamily]);

  const visibleEntities = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("en-GB");
    const rows = scopedEntities.filter((entity) =>
      [entity.display_name, entity.entity_id]
        .some((value) => value.toLocaleLowerCase("en-GB").includes(normalizedSearch))
    );

    return rows.sort((left, right) => {
      if (sort === "name") return alphabetical.compare(left.display_name, right.display_name);
      if (sort === "candidate_presence") {
        return (
          right.candidate_presence.value - left.candidate_presence.value ||
          alphabetical.compare(left.display_name, right.display_name)
        );
      }
      return (
        right.normalized_share_of_shortlist.value - left.normalized_share_of_shortlist.value ||
        right.candidate_presence.value - left.candidate_presence.value ||
        alphabetical.compare(left.display_name, right.display_name)
      );
    });
  }, [scopedEntities, search, sort]);

  return (
    <section className="border-y border-neutral-300 bg-neutral-50 py-12 text-black" aria-labelledby={titleId}>
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-5 border-b border-neutral-300 pb-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            National family view
          </p>
          <div>
            <h2 id={titleId} className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Selection across question families
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
              Compare open-universe, constructed-panel and outside-panel results without treating
              panel membership or eligibility as a performance measure.
            </p>
          </div>
        </div>

        {selectedFamily ? (
          <>
            <div className="grid gap-4 border-b border-neutral-300 py-6 md:grid-cols-2 xl:grid-cols-4" aria-label="National family controls">
              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Question family
                <select
                  className="min-h-11 rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={selectedFamily.family}
                  onChange={(event) => setSelectedFamilyName(event.target.value)}
                >
                  {nationalFamilyViews.families.map((family) => (
                    <option key={family.family} value={family.family}>
                      {familyLabel(family.family)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Candidate cohort
                <select
                  className="min-h-11 rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={scope}
                  onChange={(event) => setScope(event.target.value as FamilyScope)}
                >
                  <option value="open_universe">Open universe</option>
                  <option value="panel">Constructed panel</option>
                  <option value="outside_panel">Outside panel</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Sort entities
                <select
                  className="min-h-11 rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as FamilySort)}
                >
                  <option value="shortlist_mass">Normalized shortlist mass</option>
                  <option value="candidate_presence">Candidate presence</option>
                  <option value="name">Name</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Find an entity
                <span className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
                  <input
                    className="min-h-11 w-full rounded-none border border-neutral-400 bg-white py-2 pl-10 pr-3 text-sm font-normal text-black placeholder:text-neutral-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name or entity ID"
                  />
                </span>
              </label>
            </div>

            <div className="grid gap-5 py-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  Equal family weight {formatPercentage(nationalFamilyViews.family_weights[selectedFamily.family] ?? 0)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                  {familyLabel(selectedFamily.family)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {selectedFamily.question_count} national questions · open-universe candidate view
                </p>
              </div>
              <aside className="border-l-2 border-neutral-300 pl-4 text-sm leading-6 text-neutral-600" aria-label="Eligibility context">
                <strong className="block text-black">Eligibility remains separate</strong>
                No eligibility adjustment is inferred from these family-view fields.
              </aside>
            </div>

            <p className="mb-3 text-sm text-neutral-600" role="status" aria-live="polite">
              Showing {visibleEntities.length} of {scopedEntities.length} entities in this cohort.
            </p>

            <div className="overflow-x-auto border border-neutral-300 bg-white" role="region" aria-label={`${familyLabel(selectedFamily.family)} selection results`} tabIndex={0}>
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">
                  Entity selection across {familyLabel(selectedFamily.family)} questions, with
                  candidate presence and normalized shortlist mass shown separately.
                </caption>
                <thead className="bg-neutral-100 text-xs uppercase tracking-[0.1em] text-neutral-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">Semantically verified candidate</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Panel context</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Candidate presence</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Normalized shortlist mass</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEntities.length ? visibleEntities.map((entity) => (
                    <tr key={entity.entity_id} className="border-t border-neutral-300 align-top">
                      <th className="px-4 py-4" scope="row">
                        <ResearchDrawer
                          eyebrow={`${familyLabel(selectedFamily.family)} · Family evidence`}
                          title={entity.display_name}
                          triggerClassName="text-left font-semibold text-black underline decoration-neutral-400 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                          trigger={entity.display_name}
                        >
                          <FamilyEntityEvidence entity={entity} family={selectedFamily} />
                        </ResearchDrawer>
                        <span className="mt-2 block text-xs font-normal text-neutral-500">
                          {entity.entity_type.replaceAll("_", " ")} · {entity.entity_id}
                        </span>
                      </th>
                      <td className="px-4 py-4 text-sm text-neutral-700">{panelLabel(entity.panel_status)}</td>
                      <td className="px-4 py-4 tabular-nums">
                        <strong className="block text-lg">{formatPercentage(entity.candidate_presence)}</strong>
                        <span className="text-xs text-neutral-500">{formatFraction(entity.candidate_presence)}</span>
                      </td>
                      <td className="px-4 py-4 tabular-nums">
                        <strong className="block text-lg">{formatPercentage(entity.normalized_share_of_shortlist)}</strong>
                        <span className="text-xs text-neutral-500">{formatFraction(entity.normalized_share_of_shortlist)}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="px-4 py-8 text-center text-sm text-neutral-600" colSpan={4}>
                        No entities match the current search and cohort.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-5 text-neutral-500">
              Family weights are read directly from the scoring export. Pipeline {nationalFamilyViews.pipeline_version}.
            </p>
          </>
        ) : (
          <p className="py-10 text-sm text-neutral-600">No national family views are available.</p>
        )}
      </div>
    </section>
  );
}
