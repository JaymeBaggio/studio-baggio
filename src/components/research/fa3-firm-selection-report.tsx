"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  FamilyView,
  QuestionCandidate,
  QuestionView,
  ReportEntity,
  StudyQuestion
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
const providerOrder = ["openai", "gemini", "perplexity"];

type FirmOccurrence = QuestionCandidate & {
  query_id: string;
  query_text: string;
  family: string;
  provider: string;
  repetition: number;
};

function percentage(value = 0) {
  return pct.format(value);
}

function panelLabel(value: ReportEntity["panel_status"]) {
  return value === "panel" ? "150-firm panel" : "Outside panel";
}

function providerLabel(value: string) {
  if (value === "openai") return "OpenAI";
  if (value === "gemini") return "Google Gemini";
  if (value === "perplexity") return "Perplexity";
  return value;
}

function familyRecommendationCount(entity: ReportEntity) {
  return Math.round((entity.candidate_presence_rate ?? 0) * ANSWERS_PER_NATIONAL_FAMILY);
}

function questionStageLabel(stage: StudyQuestion["stage"]) {
  if (stage === "guidance") return "Understanding the decision";
  if (stage === "discoverability") return "Finding possible advisers";
  return "Choosing a firm";
}

function providerEvidenceLabel(
  provider: StudyQuestion["evidence"]["firms"][number]["providers"][number],
  kind: StudyQuestion["evidence"]["kind"]
) {
  if (kind === "verified_selection") {
    const runs = provider.repetitions.length
      ? ` · run${provider.repetitions.length === 1 ? "" : "s"} ${provider.repetitions.join(", ")}`
      : "";
    return `${providerLabel(provider.provider)} ${provider.answer_count}/3${runs}`;
  }

  const signals = [
    provider.named_answers ? `named ${provider.named_answers}/3` : null,
    provider.cited_answers ? `site cited ${provider.cited_answers}/3` : null
  ].filter(Boolean);
  return `${providerLabel(provider.provider)} · ${signals.join(" · ")}`;
}

function sourceProviderLabel(
  provider: StudyQuestion["evidence"]["sources"][number]["providers"][number]
) {
  const runs = provider.repetitions.length
    ? ` · run${provider.repetitions.length === 1 ? "" : "s"} ${provider.repetitions.join(", ")}`
    : "";
  return `${providerLabel(provider.provider)} ${provider.answer_count}/3${runs}`;
}

function StudyQuestionDrawerContent({ question }: { question: StudyQuestion }) {
  const { evidence } = question;
  const isSelection = evidence.kind === "verified_selection";
  const visibleFirms = evidence.firms.slice(0, 6);
  const visibleSources = evidence.sources.slice(0, 8);

  return (
    <div className="fa3-drawer-stack">
      <div className="fa3-drawer-summary">
        <div>
          <span>Answers checked</span>
          <strong>{evidence.valid_answer_count}</strong>
        </div>
        <div>
          <span>{isSelection ? "Firms recommended" : "Panel firms found"}</span>
          <strong>{evidence.firms.length}</strong>
        </div>
        <div>
          <span>Source domains cited</span>
          <strong>{evidence.sources.length}</strong>
        </div>
      </div>

      <div className="fa3-question-evidence__columns">
        <section aria-labelledby={`${question.query_id}-firms`}>
          <header>
            <h3 id={`${question.query_id}-firms`}>
              {isSelection ? "Firms recommended" : "Firms named or cited"}
            </h3>
            <span>{visibleFirms.length} shown</span>
          </header>
          {visibleFirms.length ? (
            <ol className="fa3-question-evidence__compact-list">
              {visibleFirms.map((firm) => (
                <li key={firm.name}>
                  <div>
                    <strong>{firm.name}</strong>
                    <small>
                      {firm.providers.map((provider) =>
                        providerEvidenceLabel(provider, evidence.kind)
                      ).join(" · ")}
                    </small>
                  </div>
                  <span>
                    {isSelection
                      ? `${firm.recommended_answers}/9 recommended`
                      : [
                          firm.named_answers ? `${firm.named_answers}/9 named` : null,
                          firm.cited_answers ? `${firm.cited_answers}/9 cited` : null
                        ].filter(Boolean).join(" · ")}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="fa3-empty-result">
              {isSelection ? "No verified firm recommendation." : "No panel firm named or cited."}
            </p>
          )}
          {evidence.firms.length > visibleFirms.length ? (
            <p className="fa3-question-evidence__more">
              +{evidence.firms.length - visibleFirms.length} lower-frequency firms
            </p>
          ) : null}
        </section>

        <section aria-labelledby={`${question.query_id}-sources`}>
          <header>
            <h3 id={`${question.query_id}-sources`}>Most-cited sources</h3>
            <span>{visibleSources.length} shown</span>
          </header>
          {visibleSources.length ? (
            <ol className="fa3-question-evidence__compact-list">
              {visibleSources.map((source) => (
                <li key={source.domain}>
                  <div>
                    <a
                      href={source.urls[0] ?? `https://${source.domain}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.domain}
                    </a>
                    <small>{source.providers.map(sourceProviderLabel).join(" · ")}</small>
                  </div>
                  <span>{source.answer_count}/{evidence.valid_answer_count} answers</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="fa3-empty-result">No recoverable source domain.</p>
          )}
          {evidence.sources.length > visibleSources.length ? (
            <p className="fa3-question-evidence__more">
              +{evidence.sources.length - visibleSources.length} lower-frequency sources
            </p>
          ) : null}
        </section>
      </div>

      <p className="fa3-question-evidence__caveat">
        {isSelection
          ? "Only semantically verified recommendations are counted."
          : "Named and cited are separate signals; a citation is not a recommendation."}
      </p>
    </div>
  );
}

export function Fa3QuestionExplorer({
  studyQuestions
}: {
  studyQuestions: StudyQuestion[];
}) {
  const groups = [
    {
      stage: "guidance" as const,
      number: "01",
      title: "Understanding the decision",
      prompt: "What should I do?",
      description: "Questions about costs, pensions, inheritance, divorce and other financial decisions."
    },
    {
      stage: "discoverability" as const,
      number: "02",
      title: "Finding possible advisers",
      prompt: "Who could help me?",
      description: "Questions asking AI to identify firms by need, specialism or location."
    },
    {
      stage: "selection" as const,
      number: "03",
      title: "Choosing a firm",
      prompt: "Which firm should I choose?",
      description: "Direct tests of which firms AI recommended for a specific buyer need."
    }
  ];

  return (
    <section className="fa3-section fa3-question-section" aria-labelledby="fa3-questions-title">
      <div className="editorial-container">
        <header className="fa3-section-heading fa3-section-heading--compact">
          <div>
            <p className="fa3-kicker">The full question set</p>
            <h2 id="fa3-questions-title">The 50 questions we asked</h2>
          </div>
          <p>
            The study followed the buyer journey from understanding a financial need to finding and
            choosing a firm. Open any group to see the exact wording.
          </p>
        </header>

        <div className="fa3-question-groups">
          {groups.map((group) => {
            const groupQuestions = studyQuestions.filter((question) => question.stage === group.stage);
            return (
              <details key={group.stage} className="fa3-question-group">
                <summary>
                  <span className="fa3-question-group__number">{group.number}</span>
                  <div>
                    <span>{groupQuestions.length} questions · {group.title}</span>
                    <strong>{group.prompt}</strong>
                    <p>{group.description}</p>
                  </div>
                  <small>View questions</small>
                </summary>
                <ol className="fa3-question-index">
                  {groupQuestions.map((studyQuestion, index) => {
                    return (
                      <li key={studyQuestion.query_id}>
                        <ResearchDrawer
                          className="research-drawer-panel--question fa3-question-drawer"
                          eyebrow={`${studyQuestion.query_id} · ${questionStageLabel(studyQuestion.stage)}`}
                          title={studyQuestion.query_text}
                          triggerClassName="fa3-question-index__trigger"
                          trigger={
                            <>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{studyQuestion.query_text}</strong>
                              <small>View evidence →</small>
                            </>
                          }
                        >
                          <StudyQuestionDrawerContent question={studyQuestion} />
                        </ResearchDrawer>
                      </li>
                    );
                  })}
                </ol>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FamilyColumn({ family }: { family: FamilyView }) {
  const leader = [...family.entities]
    .sort((left, right) => {
      return (
        familyRecommendationCount(right) - familyRecommendationCount(left) ||
        (right.score ?? 0) - (left.score ?? 0) ||
        collator.compare(left.canonical_name, right.canonical_name)
      );
    })[0];

  if (!leader) return null;

  return (
    <article className="fa3-family-column">
      <p>{familyLabels[family.family]}</p>
      <strong>{leader.canonical_name}</strong>
      <span>Most often recommended · {familyRecommendationCount(leader)} of {ANSWERS_PER_NATIONAL_FAMILY} AI answers</span>
    </article>
  );
}

export function Fa3FamilyViews({ families }: { families: FamilyView[] }) {
  return (
    <section className="fa3-section fa3-family-section" aria-labelledby="fa3-families-title">
      <div className="editorial-container">
        <header className="fa3-section-heading">
          <div>
            <p className="fa3-kicker">Different needs, different leaders</p>
            <h2 id="fa3-families-title">No firm led every type of question</h2>
          </div>
          <p>
            The firm recommended most often changed with the buyer&rsquo;s financial need.
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
  searchEntities,
  questions
}: {
  entities: ReportEntity[];
  searchEntities: ReportEntity[];
  questions: QuestionView[];
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

  const occurrencesByEntity = useMemo(() => {
    const result = new Map<string, FirmOccurrence[]>();

    for (const question of questions) {
      for (const answer of question.answers) {
        for (const candidate of answer.candidates) {
          const occurrence: FirmOccurrence = {
            ...candidate,
            query_id: question.query_id,
            query_text: question.query_text,
            family: question.family,
            provider: answer.provider,
            repetition: answer.repetition
          };
          const current = result.get(candidate.entity_id) ?? [];
          current.push(occurrence);
          result.set(candidate.entity_id, current);
        }
      }
    }

    return result;
  }, [questions]);

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
                    <ResearchDrawer
                      className="fa3-firm-evidence-drawer"
                      eyebrow={panelLabel(entity.panel_status)}
                      title={entity.canonical_name}
                      triggerClassName="fa3-firm-row-trigger"
                      trigger={
                        <>
                          <span>{entity.canonical_name}</span>
                          <small aria-hidden="true">View evidence →</small>
                        </>
                      }
                    >
                      <FirmEvidenceContent
                        entity={entity}
                        occurrences={occurrencesByEntity.get(entity.entity_id) ?? []}
                      />
                    </ResearchDrawer>
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

function FirmEvidenceContent({
  entity,
  occurrences
}: {
  entity: ReportEntity;
  occurrences: FirmOccurrence[];
}) {
  const groupedQuestions = useMemo(() => {
    const groups = new Map<string, FirmOccurrence[]>();
    for (const occurrence of occurrences) {
      const current = groups.get(occurrence.query_id) ?? [];
      current.push(occurrence);
      groups.set(occurrence.query_id, current);
    }
    return [...groups.values()];
  }, [occurrences]);

  const ownSiteCitations = occurrences.filter((item) => item.own_domain_cited).length;
  const supportedSelections = occurrences.filter((item) => item.selection_claim_supported).length;

  if (!occurrences.length) {
    return (
      <div className="fa3-firm-evidence__empty">
        <p className="fa3-kicker">No verified appearances</p>
        <p>
          {entity.canonical_name} did not appear as a candidate in any of the 25
          firm-selection questions.
        </p>
      </div>
    );
  }

  return (
    <div className="fa3-firm-evidence">
      <div className="fa3-firm-evidence__summary" aria-label="Firm evidence summary">
        <div><strong>{groupedQuestions.length}</strong><span>questions appeared in</span></div>
        <div><strong>{occurrences.length}</strong><span>AI answers selected it</span></div>
        <div><strong>{ownSiteCitations}</strong><span>appearances cited its website</span></div>
        <div><strong>{supportedSelections}</strong><span>recommendations had citation support</span></div>
      </div>

      <div className="fa3-firm-evidence__heading">
        <p className="fa3-kicker">Question-by-question evidence</p>
        <h3>Where this firm appeared</h3>
      </div>

      <div className="fa3-firm-evidence__questions">
        {groupedQuestions.map((questionOccurrences) => {
          const first = questionOccurrences[0];
          const providerGroups = providerOrder
            .map((provider) => ({
              provider,
              occurrences: questionOccurrences.filter((item) => item.provider === provider)
            }))
            .filter((group) => group.occurrences.length);

          return (
            <article key={first.query_id}>
              <header>
                <span>{familyLabels[first.family]} · {first.query_id}</span>
                <h4>{first.query_text}</h4>
              </header>
              <div className="fa3-firm-evidence__providers">
                {providerGroups.map((group) => {
                  const cited = group.occurrences.filter((item) => item.own_domain_cited).length;
                  const supported = group.occurrences.filter((item) => item.selection_claim_supported).length;
                  const positions = [...new Set(group.occurrences.map((item) => item.shortlist_position))]
                    .sort((left, right) => left - right)
                    .join(", ");

                  return (
                    <div key={group.provider}>
                      <strong>{providerLabel(group.provider)}</strong>
                      <dl>
                        <div><dt>Selected</dt><dd>{group.occurrences.length} of 3 runs</dd></div>
                        <div><dt>Shortlist position</dt><dd>{positions}</dd></div>
                        <div><dt>Firm website cited</dt><dd>{cited} of {group.occurrences.length}</dd></div>
                        <div><dt>Recommendation supported</dt><dd>{supported} of {group.occurrences.length}</dd></div>
                      </dl>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <p className="fa3-firm-evidence__note">
        “Firm website cited” means the firm&rsquo;s own domain appeared among the answer&rsquo;s
        sources. “Recommendation supported” means a citation backed the selection claim.
        Exact source URLs are not included in the corrected public dataset.
      </p>
    </div>
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

export function Fa3MethodDrawer({
  corpusVersion,
  selectionQuestionCount
}: {
  corpusVersion: string;
  selectionQuestionCount: number;
}) {
  return (
    <ResearchDrawer
      className="research-drawer-panel--question fa3-method-drawer"
      eyebrow="Method and evidence"
      title="How this study was run"
      triggerClassName="fa3-method-trigger"
      trigger="How this study was run"
    >
      <div className="fa3-method-content">
        <p>
          Two linked studies ran on 30 and 31 July 2026. The first 25 questions tracked which
          established firms were named and which domains were cited. The second 25 directly tested
          firm selection, with every candidate semantically verified. Each question ran three times
          across OpenAI, Gemini and Perplexity, producing 450 valid responses.
        </p>
        <dl>
          <div><dt>Questions</dt><dd>50 questions, including five deliberately repeated wordings</dd></div>
          <div><dt>Responses</dt><dd>450 valid responses</dd></div>
          <div><dt>Providers</dt><dd>OpenAI, Gemini and Perplexity</dd></div>
          <div><dt>Repetitions</dt><dd>Three fresh runs per question and provider</dd></div>
          <div><dt>Established market panel</dt><dd>150 UK financial advice firms</dd></div>
          <div><dt>Selection corpus</dt><dd>{corpusVersion} · {selectionQuestionCount} direct firm-selection questions</dd></div>
          <div><dt>Semantic review</dt><dd>Every selection candidate manually checked; zero unresolved classifications</dd></div>
          <div><dt>Primary weighting</dt><dd>Equal engine weight; repetitions averaged within question and engine</dd></div>
        </dl>
        <h3>Method and data</h3>
        <ul>
          <li><Link href="/research/uk-financial-advice-2026/method">Read the full method</Link></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/corpus.json" download>Frozen 25-question corpus</a></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/method.json" download>Method package</a></li>
          <li><a href="/research-data/uk-financial-advice-2026/corrected/report-data.json" download>Derived report data</a></li>
        </ul>
      </div>
    </ResearchDrawer>
  );
}

export function sortEntitiesAlphabetically(entities: ReportEntity[]) {
  return [...entities].sort((left, right) => collator.compare(left.canonical_name, right.canonical_name));
}
