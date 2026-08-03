"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  Fa3ReportView,
  FamilyView,
  QuestionView,
  ReportEntity
} from "@/lib/fa3-report-data";
import { ResearchDrawer } from "./ResearchDrawer.client";

const familyOrder = ["core", "wealth", "pensions", "life_events", "local"] as const;

const familyLabels: Record<string, string> = {
  core: "Choosing an adviser",
  wealth: "Wealth and investing",
  pensions: "Pensions and retirement",
  life_events: "Life events",
  local: "Matched local discovery"
};

const tierLabels: Record<string, string> = {
  broad_repeat_confirmed_selection: "Selected repeatedly across topics",
  multi_family_selection: "Selected across several topics",
  specialist_repeat_confirmed_selection: "Selected for one specialism",
  one_off_selection: "Selected once",
  local_only_selection: "Local only",
  not_selected: "Not selected"
};

const pct = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 1
});

const collator = new Intl.Collator("en-GB", { numeric: true, sensitivity: "base" });
const ANSWERS_PER_NATIONAL_FAMILY = 45;

function percentage(value = 0) {
  return pct.format(value);
}

function panelLabel(value: ReportEntity["panel_status"]) {
  return value === "panel" ? "150-firm panel" : "Outside panel";
}

function repeatLabel(entity: ReportEntity) {
  if (entity.repeat_confirmed_any_engine) return "Repeat-confirmed";
  return "One-off";
}

function familyRecommendationCount(entity: ReportEntity) {
  return Math.round((entity.candidate_presence_rate ?? 0) * ANSWERS_PER_NATIONAL_FAMILY);
}

function QuestionDrawerContent({ question }: { question: QuestionView }) {
  const repeatConfirmedCandidates = question.shortlist.filter(
    (candidate) => candidate.repeat_confirmed_any_engine
  ).length;

  return (
    <div className="fa3-drawer-stack">
      <div className="fa3-drawer-summary">
        <div>
          <span>Answers with a shortlist</span>
          <strong>{question.answers_with_candidates} of 9</strong>
        </div>
        <div>
          <span>Distinct shortlisted firms</span>
          <strong>{question.unique_candidate_count}</strong>
        </div>
        <div>
          <span>Repeat-confirmed firms</span>
          <strong>{repeatConfirmedCandidates}</strong>
        </div>
      </div>

      <div>
        <div className="fa3-drawer-section-heading">
          <h3>Verified candidate shortlist</h3>
          <p>Each answer contributes equal total shortlist weight, however long its list.</p>
        </div>
        {question.shortlist.length ? (
          <div className="fa3-drawer-table-wrap" role="region" aria-label={`${question.query_text} candidate shortlist`} tabIndex={0}>
            <table className="fa3-drawer-table">
              <thead>
                <tr>
                  <th scope="col">Candidate</th>
                  <th scope="col">Selected in</th>
                  <th scope="col">Shortlist share</th>
                  <th scope="col">Signal</th>
                </tr>
              </thead>
              <tbody>
                {question.shortlist.map((candidate) => (
                  <tr key={candidate.entity_id}>
                    <th scope="row">
                      {candidate.canonical_name}
                      <span>{panelLabel(candidate.panel_status)}</span>
                    </th>
                    <td data-label="Selected in">{candidate.candidate_answers} of 9</td>
                    <td data-label="Shortlist share">{percentage(candidate.normalized_share_of_shortlist)}</td>
                    <td data-label="Signal">{repeatLabel(candidate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="fa3-empty-result">No adviser was semantically verified as a candidate in any of the nine answers.</p>
        )}
      </div>

    </div>
  );
}

export function Fa3QuestionExplorer({ questions }: { questions: QuestionView[] }) {
  const [family, setFamily] = useState("all");
  const orderedQuestions = useMemo(
    () => [...questions].sort((left, right) => {
      const leftFamily = familyOrder.indexOf(left.family as (typeof familyOrder)[number]);
      const rightFamily = familyOrder.indexOf(right.family as (typeof familyOrder)[number]);
      return leftFamily - rightFamily || collator.compare(left.query_id, right.query_id);
    }),
    [questions]
  );
  const visible = family === "all"
    ? orderedQuestions
    : orderedQuestions.filter((question) => question.family === family);

  return (
    <section className="fa3-section fa3-question-section" aria-labelledby="fa3-questions-title">
      <div className="editorial-container">
        <header className="fa3-section-heading fa3-section-heading--compact">
          <div>
            <p className="fa3-kicker">Question shortlists</p>
            <h2 id="fa3-questions-title">What AI selected for each buyer question</h2>
          </div>
          <p>
            This explorer covers the 25 direct firm-selection questions. Open any question for its
            verified shortlist; guidance, directories and incidental mentions do not count as candidates.
          </p>
        </header>

        <div className="fa3-family-filter" aria-label="Filter questions by family">
          <button type="button" className={family === "all" ? "is-active" : ""} onClick={() => setFamily("all")}>All 25 firm-selection questions</button>
          {familyOrder.map((item) => (
            <button key={item} type="button" className={family === item ? "is-active" : ""} onClick={() => setFamily(item)}>
              {familyLabels[item]}
            </button>
          ))}
        </div>

        <div className="fa3-question-grid">
          {visible.map((question) => (
            <ResearchDrawer
              key={question.query_id}
              className="research-drawer-panel--question fa3-question-drawer"
              eyebrow={`${question.query_id} · ${familyLabels[question.family]}`}
              title={question.query_text}
              triggerClassName="fa3-question-card"
              trigger={
                <>
                  <span>{question.query_text}</span>
                  <small>
                    {question.answers_with_candidates}/9 answers · {question.unique_candidate_count} candidates
                  </small>
                </>
              }
            >
              <QuestionDrawerContent question={question} />
            </ResearchDrawer>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyColumn({ family }: { family: FamilyView }) {
  const entities = [...family.entities]
    .sort((left, right) => {
      return (
        familyRecommendationCount(right) - familyRecommendationCount(left) ||
        (right.score ?? 0) - (left.score ?? 0) ||
        collator.compare(left.canonical_name, right.canonical_name)
      );
    })
    .slice(0, 6);

  return (
    <article className="fa3-family-column">
      <header>
        <h3>{familyLabels[family.family]}</h3>
        <p>{family.query_ids.length} questions</p>
      </header>
      <ol>
        {entities.map((entity) => (
          <li key={entity.entity_id}>
            <span>
              {entity.canonical_name}
              <small>{panelLabel(entity.panel_status)}</small>
            </span>
            <strong>{familyRecommendationCount(entity)} of {ANSWERS_PER_NATIONAL_FAMILY} answers</strong>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function Fa3FamilyViews({ families }: { families: FamilyView[] }) {
  return (
    <section className="fa3-section fa3-family-section" aria-labelledby="fa3-families-title">
      <div className="editorial-container">
        <header className="fa3-section-heading">
          <div>
            <p className="fa3-kicker">Different needs, different shortlists</p>
            <h2 id="fa3-families-title">The shortlist changes with the question</h2>
          </div>
          <p>
            Ranked by how many of the 45 answers in each five-question group recommended each firm.
          </p>
        </header>
        <div className="fa3-family-columns">
          {families.map((family) => <FamilyColumn key={family.family} family={family} />)}
        </div>
      </div>
    </section>
  );
}

export function Fa3BreadthExplorer({
  entities,
  searchEntities
}: {
  entities: ReportEntity[];
  searchEntities: ReportEntity[];
}) {
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("all");
  const [tier, setTier] = useState("all");

  const visible = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("en-GB");
    const isFiltering = Boolean(query || scope !== "all" || tier !== "all");
    const source = isFiltering ? searchEntities : entities;
    const filtered = source.filter((entity) => {
      const matchesSearch = !query || entity.canonical_name.toLocaleLowerCase("en-GB").includes(query);
      const matchesScope = scope === "all" || entity.panel_status === scope;
      const matchesTier = tier === "all" || entity.display_tier === tier;
      return matchesSearch && matchesScope && matchesTier;
    });
    if (isFiltering) return filtered;
    return filtered.slice(0, 20);
  }, [entities, scope, search, searchEntities, tier]);

  return (
    <section className="fa3-section fa3-breadth-section" aria-labelledby="fa3-breadth-title">
      <div className="editorial-container">
        <header className="fa3-section-heading fa3-section-heading--compact">
          <div>
            <p className="fa3-kicker">Selection breadth</p>
            <h2 id="fa3-breadth-title">Which firms entered more consideration sets</h2>
          </div>
          <p>
            The first 20 national candidates are shown by default. Search covers every national or
            local candidate and every firm in the 150-firm panel, including firms not selected.
          </p>
        </header>

        <div className="fa3-breadth-controls">
          <label>
            <span>Find a firm or adviser</span>
            <span className="fa3-search-field">
              <Search aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search every firm" />
            </span>
          </label>
          <label>
            <span>Cohort</span>
            <select value={scope} onChange={(event) => setScope(event.target.value)}>
              <option value="all">Open universe</option>
              <option value="panel">150-firm panel</option>
              <option value="outside_panel">Outside panel</option>
            </select>
          </label>
          <label>
            <span>Selection tier</span>
            <select value={tier} onChange={(event) => setTier(event.target.value)}>
              <option value="all">All tiers</option>
              {Object.entries(tierLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>

        <p className="fa3-result-count" aria-live="polite">
          {!search && scope === "all" && tier === "all"
            ? `Showing ${visible.length} of ${entities.length} national candidates.`
            : `Showing ${visible.length} ${visible.length === 1 ? "firm" : "firms"}.`}
        </p>

        <div className="fa3-breadth-table-wrap" role="region" aria-label="Cross-scenario selection breadth" tabIndex={0}>
          <table className="fa3-breadth-table">
            <thead>
              <tr>
                <th scope="col">Candidate</th>
                <th scope="col">Selection tier</th>
                <th scope="col">Families reached</th>
                <th scope="col">Core</th>
                <th scope="col">Wealth</th>
                <th scope="col">Pensions</th>
                <th scope="col">Life events</th>
                <th scope="col">Local</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((entity) => (
                <tr key={entity.entity_id}>
                  <th scope="row">
                    {entity.canonical_name}
                    <span>{panelLabel(entity.panel_status)}</span>
                  </th>
                  <td>{tierLabels[entity.display_tier ?? ""] ?? entity.display_tier}</td>
                  <td>{entity.national_families_reached} of 4</td>
                  {familyOrder.slice(0, 4).map((family) => (
                    <td key={family}>{percentage(entity.family_scores?.[family])}</td>
                  ))}
                  <td>{entity.local_score ? percentage(entity.local_score) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Fa3LocalView({ questions }: { questions: QuestionView[] }) {
  const localQuestions = questions.filter((question) => question.family === "local");
  return (
    <section className="fa3-section fa3-local-section" aria-labelledby="fa3-local-title">
      <div className="editorial-container">
        <header className="fa3-section-heading">
          <div>
            <p className="fa3-kicker">Separate local module</p>
            <h2 id="fa3-local-title">Five matched city questions</h2>
          </div>
          <p>
            The wording changes only the location. These results are separate from the national view.
          </p>
        </header>
        <div className="fa3-local-grid">
          {localQuestions.map((question) => (
            <article key={question.query_id}>
              <header>
                <h3>{question.query_text.match(/based in ([^,?]+)/)?.[1] ?? question.query_id}</h3>
                <p>{question.answers_with_candidates}/9 answers selected candidates</p>
              </header>
              <ol>
                {question.shortlist.slice(0, 5).map((entity) => (
                  <li key={entity.entity_id}>
                    <span>{entity.canonical_name}</span>
                    <small>{entity.candidate_answers}/9</small>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Fa3MethodDrawer({ report }: { report: Fa3ReportView }) {
  return (
    <ResearchDrawer
      className="research-drawer-panel--question fa3-method-drawer"
      eyebrow="Method and evidence"
      title="How this edition was measured"
      triggerClassName="fa3-method-trigger"
      trigger="Open method note"
    >
      <div className="fa3-method-content">
        <p>
          Twenty-five demand-informed, pre-defined UK firm-selection questions were run three times
          in fresh stateless sessions across OpenAI, Gemini and Perplexity. The five matched local
          questions are separate from the 20 national questions.
        </p>
        <dl>
          <div><dt>Corpus</dt><dd>{report.corpus_version}</dd></div>
          <div><dt>Questions</dt><dd>{report.denominators.questions}</dd></div>
          <div><dt>Capture completeness</dt><dd>{report.denominators.answers} of 225 valid observations</dd></div>
          <div><dt>Semantic review</dt><dd>Every named entity manually checked; zero unresolved classifications</dd></div>
          <div><dt>Primary weighting</dt><dd>Equal engine weight; repetitions averaged within question and engine</dd></div>
          <div><dt>Shortlist measure</dt><dd>Each answer contributes total normalized mass 1</dd></div>
          <div><dt>Eligibility</dt><dd>Verified eligible cells only; unknown never treated as ineligible</dd></div>
          <div><dt>Output hash</dt><dd><code>{report.outputs_sha256}</code></dd></div>
        </dl>
        <h3>Downloads</h3>
        <ul>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/corpus.json" download>Frozen 25-question corpus</a></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/method.json" download>Method package</a></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/report-data.json" download>Derived report data</a></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/findings.md" download>Corrected findings</a></li>
        </ul>
      </div>
    </ResearchDrawer>
  );
}

export function sortEntitiesAlphabetically(entities: ReportEntity[]) {
  return [...entities].sort((left, right) => collator.compare(left.canonical_name, right.canonical_name));
}
