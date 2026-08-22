"use client";

import { Fragment, useMemo, useState } from "react";
import type { LawEntity, LawLegal500Ranking } from "./law-report-explorers";
import { LawSelect } from "./law-select";
import { ResearchDrawer } from "./ResearchDrawer.client";

type SortKey = "rank" | "name" | "tier" | "recommended" | "cited" | "problems" | "areas" | "topArea";
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
  namedAnswerOverrides = {}
}: {
  entities: LawEntity[];
  legal500Rankings: LawLegal500Ranking[];
  areas: string[];
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
        return { entity, appearances: scoped, recommended, cited, problems, areas: areaCounts.size, topArea, topQuestion, tier, website: entity.domains[0] ?? "", belongsToArea };
      });
  }, [searchableEntities, area, namedAnswerOverrides, tierIndex]);

  const rows = useMemo(() => {
    const term = compact(query);
    const inSelectedTier = (row: (typeof allRows)[number]) => {
      if (tierFilter === "unranked") return row.tier === null;
      if (tierFilter === "4+") return row.tier !== null && row.tier >= 4;
      if (tierFilter !== "all") return row.tier === Number(tierFilter);
      return true;
    };
    const value = (row: (typeof allRows)[number]) => {
      switch (sort) {
        case "name": return row.entity.name;
        case "tier": return row.tier ?? 99;
        case "recommended": return row.recommended;
        case "cited": return row.cited;
        case "problems": return row.problems;
        case "areas": return row.areas;
        case "topArea": return row.topArea;
        default: return row.recommended;
      }
    };
    const sortRows = (items: typeof allRows) => [...items].sort((left, right) => {
      const a = value(left); const b = value(right);
      let cmp = typeof a === "string" && typeof b === "string" ? a.localeCompare(b, "en-GB") : Number(a) - Number(b);
      if (cmp === 0) cmp = right.recommended - left.recommended || left.entity.name.localeCompare(right.entity.name, "en-GB");
      return dir === "asc" ? cmp : -cmp;
    });

    const ranked = sortRows(allRows.filter((row) => row.belongsToArea && (row.recommended || row.cited)));
    const rankByName = new Map(ranked.map((row, index) => [row.entity.name, index + 1]));
    const visible = term
      ? allRows.filter((row) => compact([row.entity.name, ...row.entity.aliases, ...row.entity.domains].join(" ")).includes(term))
      : ranked;

    return sortRows(visible.filter(inSelectedTier)).map((row) => ({ ...row, rank: rankByName.get(row.entity.name) ?? null }));
  }, [allRows, query, tierFilter, sort, dir]);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir(dir === "desc" ? "asc" : "desc");
    else { setSort(key); setDir(key === "name" || key === "tier" || key === "topArea" ? "asc" : "desc"); }
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
            onChange={(next) => { setArea(next); setLimit(50); }}
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
              { value: "recommended", label: "Most recommended" }, { value: "cited", label: "Most cited" },
              { value: "problems", label: "Most questions" }, { value: "areas", label: "Most practice areas" },
              { value: "tier", label: "Legal 500 tier" }, { value: "name", label: "Firm A to Z" }
            ]}
          />
        </div>
        <p className="law-ranked__count">
          {rows.length}{" "}{rows.length === 1 ? "firm" : "firms"}{area === "all" ? "" : ` in ${area}`}. Counts are answers out of the {area === "all" ? "810" : "54"} captured for {area === "all" ? "all 90 questions" : "this practice area"}. Recommended = the answer named the firm; cited = the answer linked to the firm&rsquo;s website. Click a column to sort; click a firm for its full record.
        </p>
        <div className="law-report__legal500-table-wrap">
          <table className="law-report__legal500-table law-ranked__table law-ranked__table--wide">
            <colgroup>
              {(area === "all" ? ["22%", "9%", "10%", "8%", "9%", "9%", "12%", "21%"] : ["28%", "10%", "11%", "9%", "10%", "32%"]).map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <thead>
              <tr>
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
                  <th scope="row">
                    <ResearchDrawer
                      className="research-drawer-panel--question law-firm-drawer"
                      eyebrow={`${row.tier ? `Legal 500 tier ${row.tier}` : "Unranked in the mapped Legal 500 London tables"}${row.website ? ` · ${row.website}` : ""}`}
                      title={row.entity.name}
                      triggerClassName="law-ranked__firm-trigger"
                      trigger={<><span className="law-ranked__num">{row.rank ?? "—"}</span>{row.entity.name}</>}
                    >
                      <LawFirmPanel row={row} area={area} />
                    </ResearchDrawer>
                    {row.website ? <small>{row.website}</small> : null}
                  </th>
                  <td>{row.tier ? `Tier ${row.tier}` : "Unranked"}</td>
                  <td><strong>{row.recommended}</strong><span>of {area === "all" ? 810 : 54}</span></td>
                  <td><strong>{row.cited}</strong><span>of {area === "all" ? 810 : 54}</span></td>
                  <td><strong>{row.problems}</strong><span>of {area === "all" ? 90 : 6}</span></td>
                  {area === "all" ? <td><strong>{row.areas}</strong><span>of 15</span></td> : null}
                  {area === "all" ? <td className="law-ranked__text">{row.topArea || "—"}</td> : null}
                  <td className="law-ranked__text">
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
