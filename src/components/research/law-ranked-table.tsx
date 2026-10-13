"use client";

import { Fragment, useMemo, useState } from "react";
import type { LawEntity, LawLegal500Ranking } from "./law-report-explorers";
import { LawSelect } from "./law-select";
import { ResearchDrawer } from "./ResearchDrawer.client";

type SortKey = "overallRank" | "areaRank" | "name" | "tier" | "recommended" | "cited" | "problems" | "areas" | "topArea";
type TierFilter = "all" | "1" | "2" | "3" | "4+" | "unranked";

const compact = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, "");


type FirmRow = {
  entity: LawEntity;
  appearances: LawEntity["appearances"];
  recommended: number;
  cited: number;
  problems: number;
  areas: number;
  tier: number | null;
  website: string;
};

function LawFirmPanel({ row, area }: { row: FirmRow; area: string }) {
  const appearances = (area === "all" ? row.appearances : row.appearances.filter((item) => item.area === area))
    .filter((item) => item.namedAnswers || item.citedAnswers)
    .sort((left, right) => right.namedAnswers + right.citedAnswers - (left.namedAnswers + left.citedAnswers));
  return (
    <div className="law-firm-panel">
      <dl className="law-firm-panel__stats">
        <div>
          <dt>{row.recommended}</dt>
          <dd>AI answers recommended the firm</dd>
        </div>
        <div>
          <dt>{row.problems}</dt>
          <dd>buyer questions where it appeared</dd>
        </div>
        <div>
          <dt>{row.cited}</dt>
          <dd>answers cited its own website</dd>
        </div>
      </dl>
      <header className="law-firm-panel__head">
        <h3>Questions where this firm appeared</h3>
        <span>{appearances.length} {appearances.length === 1 ? "question" : "questions"}{row.tier ? ` · Legal 500 tier ${row.tier}` : " · unranked in the mapped Legal 500 London tables"}</span>
      </header>
      <div className="law-firm-panel__grid">
        {appearances.length ? appearances.map((item) => (
          <article key={item.questionId}>
            <p className="fa3-kicker">{item.area}</p>
            <h4>{item.question}</h4>
            <p>
              {item.namedAnswers ? `Recommended in ${item.namedAnswers} of ${9} answers` : "Not recommended"}
              {" · "}
              {item.citedAnswers ? `own website cited ${item.citedAnswers} ${item.citedAnswers === 1 ? "time" : "times"}` : "own website not cited"}
            </p>
          </article>
        )) : <p>This firm was included in the Legal 500 comparison list but was not recommended or cited in the captured answers.</p>}
      </div>
    </div>
  );
}

export function LawRankedTable({
  entities,
  legal500Rankings,
  areas,
  trackedFirmCount,
  studyAnswerCount,
  namedAnswerOverrides = {}
}: {
  entities: LawEntity[];
  legal500Rankings: LawLegal500Ranking[];
  areas: string[];
  trackedFirmCount: number;
  studyAnswerCount: number;
  namedAnswerOverrides?: Record<string, Record<string, number>>;
}) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [dir, setDir] = useState<"desc" | "asc">("desc");
  const [limit, setLimit] = useState(50);

  const tierIndex = useMemo(() => {
    const map = new Map<string, Map<string, number>>();
    for (const ranking of legal500Rankings) {
      const byArea = map.get(ranking.canonicalName) ?? new Map<string, number>();
      byArea.set(ranking.area, Math.min(byArea.get(ranking.area) ?? 9, ranking.tier));
      map.set(ranking.canonicalName, byArea);
    }
    return map;
  }, [legal500Rankings]);

  const searchableEntities = useMemo(() => {
    const existingNames = new Set(entities.map((entity) => entity.name));
    const comparisonNames = [...new Set(legal500Rankings.map((ranking) => ranking.canonicalName))];
    const comparisonOnlyEntities: LawEntity[] = comparisonNames
      .filter((name) => !existingNames.has(name))
      .map((name) => ({
        name,
        aliases: legal500Rankings
          .filter((ranking) => ranking.canonicalName === name)
          .map((ranking) => ranking.legal500Name)
          .filter((alias) => alias !== name),
        domains: [],
        kind: "firm",
        namedAnswers: 0,
        citedAnswers: 0,
        citationInstances: 0,
        questionCount: 0,
        appearances: []
      }));

    return [...entities, ...comparisonOnlyEntities];
  }, [entities, legal500Rankings]);

  const allRows = useMemo(() => {
    return searchableEntities
      .map((entity) => {
        const answerOverrides = namedAnswerOverrides[entity.name];
        const appearances = answerOverrides
          ? entity.appearances.map((item) => {
              const namedAnswers = answerOverrides[item.questionId];
              return namedAnswers === undefined ? item : { ...item, namedAnswers };
            })
          : entity.appearances;
        const scoped = area === "all" ? appearances : appearances.filter((item) => item.area === area);
        const active = scoped.filter((item) => item.namedAnswers || item.citedAnswers);
        const recommended = active.reduce((sum, item) => sum + item.namedAnswers, 0);
        const cited = active.reduce((sum, item) => sum + item.citedAnswers, 0);
        const problems = active.length;
        const areaCounts = new Map<string, number>();
        for (const item of active) areaCounts.set(item.area, (areaCounts.get(item.area) ?? 0) + item.namedAnswers + item.citedAnswers);
        const topArea = [...areaCounts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? "";
        const topQuestion = [...active].sort((left, right) => right.namedAnswers - left.namedAnswers || right.citedAnswers - left.citedAnswers)[0];
        const tiers = tierIndex.get(entity.name);
        const tier = area === "all" ? (tiers ? Math.min(...tiers.values()) : null) : (tiers?.get(area) ?? null);
        const belongsToArea = area === "all" || active.length > 0 || tier !== null;
        const overallRecommended = appearances.reduce((sum, item) => sum + item.namedAnswers, 0);
        const overallCited = appearances.reduce((sum, item) => sum + item.citedAnswers, 0);
        return { entity, overallRecommended, overallCited, appearances: scoped, recommended, cited, problems, areas: areaCounts.size, topArea, topQuestion, tier, website: entity.domains[0] ?? "", belongsToArea };
      });
  }, [searchableEntities, area, namedAnswerOverrides, tierIndex]);

  // Positions come from the full benchmark, before search, tier filters or display sorting.
  const rankMaps = useMemo(() => {
    const overall = [...allRows]
      .filter((row) => row.overallRecommended || row.overallCited)
      .sort((left, right) => right.overallRecommended - left.overallRecommended || left.entity.name.localeCompare(right.entity.name, "en-GB"));
    const scoped = [...allRows]
      .filter((row) => row.belongsToArea && (row.recommended || row.cited))
      .sort((left, right) => right.recommended - left.recommended || left.entity.name.localeCompare(right.entity.name, "en-GB"));
    return {
      overall: new Map(overall.map((row, index) => [row.entity.name, index + 1])),
      area: new Map(scoped.map((row, index) => [row.entity.name, index + 1]))
    };
  }, [allRows]);

  const rows = useMemo(() => {
    const term = compact(query);
    const inSelectedTier = (row: (typeof allRows)[number]) => {
      if (tierFilter === "unranked") return row.tier === null;
      if (tierFilter === "4+") return row.tier !== null && row.tier >= 4;
      if (tierFilter !== "all") return row.tier === Number(tierFilter);
      return true;
    };
    const visible = allRows.filter((row) => (
      term
        ? compact([row.entity.name, ...row.entity.aliases, ...row.entity.domains].join(" ")).includes(term)
        : row.belongsToArea && (row.recommended || row.cited)
    )).filter(inSelectedTier).map((row) => ({
      ...row,
      overallRank: rankMaps.overall.get(row.entity.name) ?? null,
      areaRank: rankMaps.area.get(row.entity.name) ?? null
    }));
    const value = (row: (typeof visible)[number]) => {
      switch (sort) {
        case "overallRank": return row.overallRank;
        case "areaRank": return row.areaRank;
        case "name": return row.entity.name;
        case "tier": return row.tier;
        case "recommended": return row.recommended;
        case "cited": return row.cited;
        case "problems": return row.problems;
        case "areas": return row.areas;
        case "topArea": return row.topArea;
      }
    };
    return visible.sort((left, right) => {
      const a = value(left); const b = value(right);
      // Missing ranks/tiers stay last in both directions.
      if (a === null || b === null) return a === b ? left.entity.name.localeCompare(right.entity.name, "en-GB") : a === null ? 1 : -1;
      const cmp = typeof a === "string" && typeof b === "string" ? a.localeCompare(b, "en-GB") : Number(a) - Number(b);
      return (dir === "asc" ? cmp : -cmp) || right.recommended - left.recommended || left.entity.name.localeCompare(right.entity.name, "en-GB");
    });
  }, [allRows, rankMaps, query, tierFilter, sort, dir]);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir(dir === "desc" ? "asc" : "desc");
    else { setSort(key); setDir(key === "overallRank" || key === "areaRank" || key === "name" || key === "tier" || key === "topArea" ? "asc" : "desc"); }
  };
  const arrow = (key: SortKey) => (sort === key ? (dir === "desc" ? " ↓" : " ↑") : "");


  return (
    <section className="fa3-section law-ranked" aria-labelledby="law-ranked-title">
      <div className="editorial-container">
        <h2 id="law-ranked-title" className="law-report__visually-hidden">Ranked table</h2>
        <div className="law-ranked__controls law-ranked__controls--four">
          <label>
            <span>Search firm</span>
            <input type="search" value={query} placeholder="Firm or website" onChange={(event) => { setQuery(event.target.value); setLimit(50); }} />
          </label>
          <LawSelect
            label="Practice area"
            value={area}
            onChange={(next) => { setArea(next); setLimit(50); if (next === "all" && sort === "areaRank") setSort("overallRank"); }}
            options={[{ value: "all", label: "All 15 practice areas" }, ...areas.map((item) => ({ value: item, label: item }))]}
          />
          <LawSelect
            label="Legal 500 tier"
            value={tierFilter}
            onChange={(next) => { setTierFilter(next as TierFilter); setLimit(50); }}
            options={[
              { value: "all", label: "All tiers" }, { value: "1", label: "Tier 1" }, { value: "2", label: "Tier 2" },
              { value: "3", label: "Tier 3" }, { value: "4+", label: "Tier 4 and below" }, { value: "unranked", label: "Unranked" }
            ]}
          />
          <LawSelect
            label="Sort by"
            value={sort}
            onChange={(next) => toggleSort(next as SortKey)}
            options={[
              { value: "overallRank", label: "Overall rank" },
              ...(area === "all" ? [] : [{ value: "areaRank", label: "Area rank" }]),
              { value: "recommended", label: "Most recommended" }, { value: "cited", label: "Most cited" },
              { value: "problems", label: "Most questions" }, { value: "areas", label: "Most practice areas" },
              { value: "tier", label: "Legal 500 tier" }, { value: "name", label: "Firm A to Z" }
            ]}
          />
        </div>
        <p className="law-ranked__count">
          {trackedFirmCount} firms were named or cited across the <strong>{studyAnswerCount.toLocaleString("en-GB")} AI answers analysed</strong>. Recommended = the answer named the firm; cited = the answer linked to the firm&rsquo;s website. Ranks use recommendation counts; equal counts are ordered by firm name. Search and sorting preserve each firm’s overall and area ranks. Click a column to sort; click a firm for its full record.{" "}
          <ResearchDrawer
            className="research-drawer-panel--question fa3-method-drawer"
            eyebrow="Answer counts"
            title="How the study total relates to the table"
            triggerClassName="law-ranked__count-help"
            trigger={`Why counts are out of ${area === "all" ? "810" : "54"}`}
          >
            <div className="fa3-method-content">
              <dl className="fa3-method-content__summary">
                <div>
                  <dt>{studyAnswerCount.toLocaleString("en-GB")} answers in the full study</dt>
                  <dd>
                    135 answers to broad &ldquo;best lawyers&rdquo; questions, 675 answers to specific
                    legal problems, and 675 answers to those same problems with an explicit request
                    to name firms the client could instruct.
                  </dd>
                </div>
                <div>
                  <dt>Recommended: out of 810 answers</dt>
                  <dd>
                    The 135 broad answers plus the 675 answers explicitly asking which firms to
                    instruct. A firm counts once in each answer that named it.
                  </dd>
                </div>
                <div>
                  <dt>Cited: out of 810 answers</dt>
                  <dd>
                    The 135 broad answers plus the 675 original answers to legal problems. A firm
                    counts once in each answer that linked to its website.
                  </dd>
                </div>
              </dl>
              <p>
                The 135 broad answers are shared by both measures, so the two sets total 1,485
                distinct answers. When you select one practice area, each measure uses 54 answers:
                nine broad answers and 45 relevant problem answers.
              </p>
            </div>
          </ResearchDrawer>
        </p>
        {compact(query) || area !== "all" || tierFilter !== "all" ? (
          <p className="law-ranked__count" aria-live="polite">
            Showing {rows.length} matching {rows.length === 1 ? "firm" : "firms"}{area === "all" ? "" : ` in ${area}`}.
          </p>
        ) : null}
        <div className="law-report__legal500-table-wrap" role="region" aria-label="Law firm ranks and recommendations" tabIndex={0}>
          <table className="law-report__legal500-table law-ranked__table law-ranked__table--wide law-ranked__table--ranks">
            <colgroup>
              {(area === "all" ? ["7%", "20%", "8%", "10%", "8%", "8%", "6%", "12%", "21%"] : ["7%", "7%", "23%", "9%", "11%", "9%", "9%", "25%"]).map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="law-ranked__rank-heading" aria-sort={sort === "overallRank" ? (dir === "asc" ? "ascending" : "descending") : undefined}><button type="button" onClick={() => toggleSort("overallRank")}><span>Overall</span><span>rank{arrow("overallRank")}</span></button></th>
                {area !== "all" ? <th scope="col" className="law-ranked__rank-heading" aria-sort={sort === "areaRank" ? (dir === "asc" ? "ascending" : "descending") : undefined}><button type="button" onClick={() => toggleSort("areaRank")}><span>Area</span><span>rank{arrow("areaRank")}</span></button></th> : null}
                <th scope="col"><button type="button" onClick={() => toggleSort("name")}>Firm{arrow("name")}</button></th>
                <th scope="col"><button type="button" onClick={() => toggleSort("tier")}>Tier{arrow("tier")}</button></th>
                <th scope="col" title="Answers naming the firm when AI was asked which firm to instruct"><button type="button" onClick={() => toggleSort("recommended")}>Recommended{arrow("recommended")}</button></th>
                <th scope="col" title="Answers to the problem that linked to the firm&rsquo;s own website"><button type="button" onClick={() => toggleSort("cited")}>Cited{arrow("cited")}</button></th>
                <th scope="col" title="How many of the 90 buyer questions the firm was recommended or cited for"><button type="button" onClick={() => toggleSort("problems")}>Questions{arrow("problems")}</button></th>
                {area === "all" ? <th scope="col" title="How many of the 15 practice areas the firm appeared in"><button type="button" onClick={() => toggleSort("areas")}>Areas{arrow("areas")}</button></th> : null}
                {area === "all" ? <th scope="col" title="The practice area where the firm appeared most"><button type="button" onClick={() => toggleSort("topArea")}>Strongest{arrow("topArea")}</button></th> : null}
                <th scope="col" title="The single question the firm was recommended for most">Top question</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, limit).map((row) => (<Fragment key={row.entity.name}>
                <tr>
                  <td data-label="Overall rank" className={`law-ranked__rank-value${area === "all" ? "" : " law-ranked__rank-value--overall"}`}>{row.overallRank ?? "—"}</td>
                  {area !== "all" ? <td data-label="Area rank" className="law-ranked__rank-value">{row.areaRank ?? "—"}</td> : null}
                  <th scope="row">
                    <ResearchDrawer
                      className="research-drawer-panel--question law-firm-drawer"
                      eyebrow={`${row.tier ? `Legal 500 tier ${row.tier}` : "Unranked in the mapped Legal 500 London tables"}${row.website ? ` · ${row.website}` : ""}`}
                      title={row.entity.name}
                      triggerClassName="law-ranked__firm-trigger"
                      trigger={row.entity.name}
                    >
                      <LawFirmPanel row={row} area={area} />
                    </ResearchDrawer>
                    {row.website ? <small>{row.website}</small> : null}
                  </th>
                  <td data-label="Legal 500 tier">{row.tier ? `Tier ${row.tier}` : "Unranked"}</td>
                  <td data-label="Recommended"><strong>{row.recommended}</strong><span>of {area === "all" ? 810 : 54}</span></td>
                  <td data-label="Cited"><strong>{row.cited}</strong><span>of {area === "all" ? 810 : 54}</span></td>
                  <td data-label="Questions"><strong>{row.problems}</strong><span>of {area === "all" ? 90 : 6}</span></td>
                  {area === "all" ? <td data-label="Areas"><strong>{row.areas}</strong><span>of 15</span></td> : null}
                  {area === "all" ? <td data-label="Strongest" className="law-ranked__text">{row.topArea || "—"}</td> : null}
                  <td data-label="Top question" className="law-ranked__text law-ranked__top-question">
                    {row.topQuestion ? <>{row.topQuestion.question}<small>{row.topQuestion.namedAnswers ? `Recommended ${row.topQuestion.namedAnswers}/9` : `Cited ${row.topQuestion.citedAnswers}/9`}</small></> : "No recorded appearances"}
                  </td>
                </tr>
              </Fragment>))}
            </tbody>
          </table>
        </div>
        {rows.length > limit ? (
          <p className="law-ranked__more"><button type="button" onClick={() => setLimit(limit + 50)}>Show more firms ({rows.length - limit} more)</button></p>
        ) : null}
      </div>
    </section>
  );
}
