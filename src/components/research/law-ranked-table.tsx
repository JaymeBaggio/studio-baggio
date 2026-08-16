"use client";

import { Fragment, useMemo, useState } from "react";
import type { LawEntity, LawLegal500Ranking } from "./law-report-explorers";
import { LawSelect } from "./law-select";

type SortKey = "rank" | "name" | "tier" | "recommended" | "cited" | "problems" | "areas" | "topArea";
type TierFilter = "all" | "1" | "2" | "3" | "4+" | "unranked";

const compact = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, "");

export function LawRankedTable({
  entities,
  legal500Rankings,
  areas
}: {
  entities: LawEntity[];
  legal500Rankings: LawLegal500Ranking[];
  areas: string[];
}) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [dir, setDir] = useState<"desc" | "asc">("desc");
  const [selectedName, setSelectedName] = useState("");
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

  const baseRows = useMemo(() => {
    return entities
      .map((entity) => {
        const scoped = area === "all" ? entity.appearances : entity.appearances.filter((item) => item.area === area);
        const active = scoped.filter((item) => item.namedAnswers || item.citedAnswers);
        const recommended = active.reduce((sum, item) => sum + item.namedAnswers, 0);
        const cited = active.reduce((sum, item) => sum + item.citedAnswers, 0);
        const problems = active.filter((item) => item.type === "problem").length;
        const areaCounts = new Map<string, number>();
        for (const item of active) areaCounts.set(item.area, (areaCounts.get(item.area) ?? 0) + item.namedAnswers + item.citedAnswers);
        const topArea = [...areaCounts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ?? "";
        const topQuestion = [...active].sort((left, right) => right.namedAnswers - left.namedAnswers || right.citedAnswers - left.citedAnswers)[0];
        const tiers = tierIndex.get(entity.name);
        const tier = area === "all" ? (tiers ? Math.min(...tiers.values()) : null) : (tiers?.get(area) ?? null);
        return { entity, recommended, cited, problems, areas: areaCounts.size, topArea, topQuestion, tier, website: entity.domains[0] ?? "" };
      })
      .filter((row) => row.recommended || row.cited);
  }, [entities, area, tierIndex]);

  const rows = useMemo(() => {
    const term = compact(query);
    const filtered = baseRows.filter((row) => {
      if (term && !compact([row.entity.name, ...row.entity.aliases, ...row.entity.domains].join(" ")).includes(term)) return false;
      if (tierFilter === "unranked") return row.tier === null;
      if (tierFilter === "4+") return row.tier !== null && row.tier >= 4;
      if (tierFilter !== "all") return row.tier === Number(tierFilter);
      return true;
    });
    const value = (row: (typeof baseRows)[number]) => {
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
    filtered.sort((left, right) => {
      const a = value(left); const b = value(right);
      let cmp = typeof a === "string" && typeof b === "string" ? a.localeCompare(b, "en-GB") : Number(a) - Number(b);
      if (cmp === 0) cmp = right.recommended - left.recommended || left.entity.name.localeCompare(right.entity.name, "en-GB");
      return dir === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [baseRows, query, tierFilter, sort, dir]);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir(dir === "desc" ? "asc" : "desc");
    else { setSort(key); setDir(key === "name" || key === "tier" || key === "topArea" ? "asc" : "desc"); }
  };
  const arrow = (key: SortKey) => (sort === key ? (dir === "desc" ? " ↓" : " ↑") : "");

  const selected = rows.find((row) => row.entity.name === selectedName);
  const selectedAppearances = selected
    ? (area === "all" ? selected.entity.appearances : selected.entity.appearances.filter((item) => item.area === area))
        .filter((item) => item.namedAnswers || item.citedAnswers)
        .sort((left, right) => right.namedAnswers + right.citedAnswers - (left.namedAnswers + left.citedAnswers))
    : [];

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
              { value: "problems", label: "Most problems appeared on" }, { value: "areas", label: "Most practice areas" },
              { value: "tier", label: "Legal 500 tier" }, { value: "name", label: "Firm A to Z" }
            ]}
          />
        </div>
        <p className="law-ranked__count">
          {rows.length}{" "}firms{area === "all" ? "" : ` in ${area}`}. Recommended = answers naming the firm when asked which firm to instruct. Cited = answers to the problem that linked to the firm&rsquo;s website. Click a column to sort; click a firm for every question it appeared on.
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
                <th scope="col"><button type="button" onClick={() => toggleSort("tier")}>Legal 500 tier{arrow("tier")}</button></th>
                <th scope="col"><button type="button" onClick={() => toggleSort("recommended")}>Recommended{arrow("recommended")}</button></th>
                <th scope="col"><button type="button" onClick={() => toggleSort("cited")}>Cited{arrow("cited")}</button></th>
                <th scope="col"><button type="button" onClick={() => toggleSort("problems")}>Problems appeared on{arrow("problems")}</button></th>
                {area === "all" ? <th scope="col"><button type="button" onClick={() => toggleSort("areas")}>Practice areas{arrow("areas")}</button></th> : null}
                {area === "all" ? <th scope="col"><button type="button" onClick={() => toggleSort("topArea")}>Strongest area{arrow("topArea")}</button></th> : null}
                <th scope="col">Most recommended for</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, limit).map((row, index) => (<Fragment key={row.entity.name}>
                <tr className={row.entity.name === selectedName ? "is-selected" : undefined}>
                  <th scope="row">
                    <button type="button" onClick={() => setSelectedName(row.entity.name === selectedName ? "" : row.entity.name)}>
                      <span className="law-ranked__num">{index + 1}</span>{row.entity.name}
                    </button>
                    {row.website ? <small>{row.website}</small> : null}
                  </th>
                  <td>{row.tier ? `Tier ${row.tier}` : "Unranked"}</td>
                  <td><strong>{row.recommended}</strong></td>
                  <td><strong>{row.cited}</strong></td>
                  <td><strong>{row.problems}</strong><span>of {area === "all" ? 75 : 5}</span></td>
                  {area === "all" ? <td><strong>{row.areas}</strong><span>of 15</span></td> : null}
                  {area === "all" ? <td className="law-ranked__text">{row.topArea}</td> : null}
                  <td className="law-ranked__text">
                    {row.topQuestion ? <>{row.topQuestion.question}<small>{row.topQuestion.namedAnswers ? `Recommended ${row.topQuestion.namedAnswers}/9` : `Cited ${row.topQuestion.citedAnswers}/9`}</small></> : ""}
                  </td>
                </tr>
                {row.entity.name === selectedName && selected ? (
                  <tr className="law-ranked__detail-row">
                    <td colSpan={area === "all" ? 8 : 6}>
                      <div className="law-ranked__detail law-ranked__detail--inline">
                        <header>
                          <p>
                            <strong>{selected.entity.name}</strong>Recommended {selected.recommended} · Cited {selected.cited} · {selected.problems} of {area === "all" ? 75 : 5} problems · {selected.areas} of 15 practice areas
                            {selected.tier ? ` · Legal 500 tier ${selected.tier}` : " · not ranked in the mapped Legal 500 London tables"}
                          </p>
                          <button type="button" className="law-ranked__close" onClick={() => setSelectedName("")}>Close</button>
                        </header>
                        <ol>
                          {selectedAppearances.map((item) => (
                            <li key={item.questionId}>
                              <span className="law-ranked__detail-q">
                                {item.question}
                                <small>{item.area} · {item.type === "choice" ? "best lawyers question" : "then: which UK law firms should I consider instructing?"}</small>
                              </span>
                              <span className="law-ranked__detail-n">
                                {item.namedAnswers ? <em>Recommended {item.namedAnswers}/9</em> : null}
                                {item.citedAnswers ? <em>Cited {item.citedAnswers}/9</em> : null}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </td>
                  </tr>
                ) : null}
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
