"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";
import { LawSelect } from "./law-select";

type EntityScore = {
  id: string;
  name: string;
  answerCount: number;
  panelStatus: string;
  overseas: boolean;
};

export type SportsEntity = {
  id: string;
  name: string;
  entityType: "firm" | "lawyer" | "chambers";
  panelStatus: "panel" | "outside_panel" | "not_applicable";
  panelName: string | null;
  overseas: boolean;
  affiliation: string | null;
  answerCount: number;
  questionCount: number;
  sportCount: number;
  ownDomainCitationAnswerCount: number | null;
  citedWithoutNamedAnswerCount: number | null;
  ledQuestionCount: number | null;
  appearances: Array<{
    questionId: string;
    question: string;
    sport: string;
    sportLabel: string;
    buyerType: string;
    legalNeed: string;
    answerCount: number;
    providers: string[];
  }>;
};

type SampleSource = {
  position: number;
  url: string;
  domain: string;
};

type QuestionSample = {
  observationId: string;
  provider: "openai" | "gemini" | "perplexity";
  model: string;
  repetition: number;
  answerText: string;
  sources: SampleSource[];
};

export type SportsQuestion = {
  id: string;
  question: string;
  sport: string;
  sportLabel: string;
  buyerType: string;
  legalNeed: string;
  answerCount: number;
  leader: string;
  leaderAnswerCount: number;
  runnerUp: string;
  runnerUpAnswerCount: number;
  ownershipBucket: string;
  firms: EntityScore[];
  lawyers: EntityScore[];
  chambers: EntityScore[];
  samples: QuestionSample[];
  sources: Array<{
    domain: string;
    url: string;
    answerCount: number;
    providers: string[];
    bestPosition: number;
    isGeminiRedirect: boolean;
  }>;
};

const providerLabels = {
  openai: "ChatGPT",
  gemini: "Gemini",
  perplexity: "Perplexity"
};

const clean = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, " ").trim();
const humanise = (value: string) => value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const compareEntityVisibility = (left: SportsEntity, right: SportsEntity) =>
  right.answerCount - left.answerCount ||
  right.questionCount - left.questionCount ||
  left.name.localeCompare(right.name, "en-GB");

function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="law-explorer__search" htmlFor={id}>
      <span>{label}</span>
      <span className="law-explorer__search-field">
        <Search aria-hidden="true" />
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </span>
    </label>
  );
}

export function SportsLawMethodDrawer() {
  return (
    <ResearchDrawer
      className="research-drawer-panel--question fa3-method-drawer"
      eyebrow="About the study"
      title="How this study was run"
      triggerClassName="fa3-method-trigger"
      trigger="View method →"
    >
      {(closeDrawer) => (
        <div className="fa3-method-content">
          <dl className="fa3-method-content__summary">
            <div>
              <dt>What we asked</dt>
              <dd>
                90 high-intent questions using one consistent buyer frame: &ldquo;Who is the best
                [sport] lawyer for [specific dispute]?&rdquo; The study covers ten questions in each
                of nine categories: general UK sports disputes, football, rugby, cricket, boxing,
                motorsport, tennis, golf and horseracing.
              </dd>
            </div>
            <div>
              <dt>How we tested it</dt>
              <dd>
                All 90 questions were put to ChatGPT, Gemini and Perplexity three times, with web
                search enabled. The capture ran on 15 August 2026 and produced 810 valid answers:
                nine per question.
              </dd>
            </div>
            <div>
              <dt>What we recorded</dt>
              <dd>
                We recorded all firms, individual lawyers and chambers named in each answer, the
                questions in which they appeared, and all source links supplied by the platforms.
                Each name was counted once per answer, even if it appeared several times.
              </dd>
            </div>
            <div>
              <dt>The 89-firm comparison list</dt>
              <dd>
                There is no single UK sports-law top 100. We combined 59 Legal 500 Sport practices,
                five additional Chambers horseracing and equestrian practices, and 25 further UK
                practices from LawInSport. After overlaps were removed, 89 unique firms remained.
                The list was fixed before any answers were captured.
              </dd>
            </div>
            <div>
              <dt>Limits</dt>
              <dd>
                This is a dated visibility benchmark, not a quality ranking or legal endorsement.
                AI answers change over time. Counts show verified name appearances in answers to an
                explicit best-lawyer question; they do not prove that every mention was the lead
                recommendation or that the underlying legal advice was correct.
              </dd>
            </div>
          </dl>
          <div className="fa3-method-content__scope">
            <strong>What the study measures</strong>
            <span>
              Which firms and lawyers AI named for high-intent sports-law questions, and which
              web links appeared with those answers.
            </span>
          </div>
          <a
            className="fa3-method-content__questions-link"
            href="#sports-question-explorer"
            onClick={closeDrawer}
          >
            View all 90 questions →
          </a>
        </div>
      )}
    </ResearchDrawer>
  );
}

function SportsEntityDrawerContent({
  entity,
  practiceArea,
  onQuestionSelect
}: {
  entity: SportsEntity;
  practiceArea: string | null;
  onQuestionSelect: (questionId: string) => void;
}) {
  return (
    <div className="sports-entity-evidence-drawer__content">
      <dl className="sports-entity-evidence-drawer__summary">
        <div>
          <dt>AI answers</dt>
          <dd>{entity.answerCount}</dd>
          <span>named this {entity.entityType}</span>
        </div>
        <div>
          <dt>Questions</dt>
          <dd>{entity.questionCount}</dd>
          <span>where the name appeared</span>
        </div>
        <div>
          <dt>Practice areas</dt>
          <dd>{entity.sportCount}</dd>
          <span>covered by those appearances</span>
        </div>
      </dl>
      <header className="sports-entity-evidence-drawer__heading">
        <h3>{practiceArea ? `${practiceArea} questions where this name appeared` : "Questions where this name appeared"}</h3>
      </header>
      {entity.appearances.length ? (
        <ol className="sports-entity-evidence-drawer__questions">
          {entity.appearances.map((appearance) => (
            <li key={`${entity.id}-${appearance.questionId}`}>
              <span className="sports-entity-evidence-drawer__question-context">
                {appearance.sportLabel} · {humanise(appearance.legalNeed)}
              </span>
              <a
                href={`#question-${appearance.questionId}`}
                onClick={(event) => {
                  event.preventDefault();
                  onQuestionSelect(appearance.questionId);
                }}
              >
                {appearance.question}
              </a>
              <strong>{appearance.answerCount}/9 answers</strong>
            </li>
          ))}
        </ol>
      ) : (
        <p className="sports-entity-evidence__empty">
          {practiceArea
            ? `This tracked name did not appear in any captured answers for ${practiceArea}.`
            : "This tracked name did not appear in any of the 810 captured answers."}
        </p>
      )}
    </div>
  );
}

function scopeEntityToPracticeArea(entity: SportsEntity, practiceArea: string): SportsEntity {
  if (practiceArea === "all") return entity;

  const appearances = entity.appearances
    .filter((appearance) => appearance.sportLabel === practiceArea)
    .sort((left, right) =>
      right.answerCount - left.answerCount || left.question.localeCompare(right.question)
    );

  return {
    ...entity,
    appearances,
    answerCount: appearances.reduce((total, appearance) => total + appearance.answerCount, 0),
    questionCount: new Set(appearances.map((appearance) => appearance.questionId)).size,
    sportCount: appearances.length ? 1 : 0
  };
}

export function SportsEntityExplorer({ entities }: { entities: SportsEntity[] }) {
  const [query, setQuery] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [sport, setSport] = useState("all");
  const [limit, setLimit] = useState(20);
  const sports = useMemo(
    () => Array.from(new Set(entities.flatMap((entity) => entity.appearances.map((item) => item.sportLabel)))).sort(),
    [entities]
  );
  const isPracticeAreaView = sport !== "all";
  const overallRankByEntity = useMemo(
    () => new Map(
      [...entities]
        .sort(compareEntityVisibility)
        .map((entity, index) => [entity.id, index + 1])
    ),
    [entities]
  );
  const practiceAreaRankByEntity = useMemo(() => {
    if (!isPracticeAreaView) return new Map<string, number>();

    return new Map(
      entities
        .map((entity) => scopeEntityToPracticeArea(entity, sport))
        .filter((entity) => entity.answerCount > 0)
        .sort(compareEntityVisibility)
        .map((entity, index) => [entity.id, index + 1])
    );
  }, [entities, isPracticeAreaView, sport]);
  const visible = useMemo(() => {
    const term = clean(query);
    return entities
      .map((entity) => scopeEntityToPracticeArea(entity, sport))
      .filter((entity) => {
        const matchesQuery = !term || clean(`${entity.name} ${entity.affiliation ?? ""} ${entity.panelName ?? ""}`).includes(term);
        const matchesType = entityType === "all" || entity.entityType === entityType;
        const matchesSport = sport === "all" || entity.answerCount > 0;
        return matchesQuery && matchesType && matchesSport;
      })
      .sort(compareEntityVisibility);
  }, [entities, entityType, query, sport]);
  const resetResults = () => setLimit(20);
  const revealQuestion = (questionId: string) => {
    const targetId = `question-${questionId}`;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        const group = target?.closest("details");
        if (group instanceof HTMLDetailsElement) group.open = true;
        window.history.replaceState(null, "", `#${targetId}`);
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
        target?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
      });
    });
  };

  return (
    <section className="fa3-section law-explorer law-ranked sports-entity-explorer" id="sports-entity-explorer" aria-labelledby="sports-entity-title">
      <div className="editorial-container">
        <header className="fa3-section-heading sports-rankings__heading">
          <div>
            <p className="fa3-kicker">Full results · August 2026</p>
            <h2 id="sports-entity-title">UK Sports Law AI Visibility Rankings</h2>
          </div>
          <p>
            {isPracticeAreaView
              ? `The firms, lawyers and chambers named most often across 90 answers to 10 high-intent ${sport.toLocaleLowerCase("en-GB")} questions.`
              : "The firms, lawyers and chambers named most often across 810 answers to 90 high-intent sports-law questions."}
          </p>
        </header>
        <div className="law-ranked__controls sports-entity-explorer__controls">
          <LawSelect
            label="Entity type"
            value={entityType}
            onChange={(value) => { setEntityType(value); resetResults(); }}
            options={[
              { value: "all", label: "Firms, lawyers and chambers" },
              { value: "firm", label: "Law firms" },
              { value: "lawyer", label: "Individual lawyers" },
              { value: "chambers", label: "Chambers" }
            ]}
          />
          <LawSelect
            label="Practice area"
            value={sport}
            onChange={(value) => { setSport(value); resetResults(); }}
            options={[{ value: "all", label: "All nine practice areas" }, ...sports.map((item) => ({ value: item, label: item }))]}
          />
          <SearchField
            id="sports-entity-search"
            label="Firm or lawyer"
            placeholder="Try Sheridans or Brabners"
            value={query}
            onChange={(value) => { setQuery(value); resetResults(); }}
          />
        </div>
        <p className="law-ranked__count" aria-live="polite">
          {visible.length} matching {visible.length === 1 ? "name" : "names"}
        </p>
        <div className="law-report__legal500-table-wrap" role="region" aria-label="UK Sports Law AI visibility rankings" tabIndex={0}>
          <table className="law-report__legal500-table law-ranked__table law-ranked__table--wide">
            <colgroup>
              {(isPracticeAreaView
                ? ["8%", "10%", "30%", "24%", "14%", "14%"]
                : ["10%", "24%", "13%", "10%", "10%", "9%", "24%"]
              ).map((width, index) => (
                <col key={index} style={{ width }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {isPracticeAreaView ? (
                  <th className="law-ranked__rank-heading" scope="col" aria-sort="ascending">
                    <span>Area</span>
                    <span>rank</span>
                  </th>
                ) : null}
                <th
                  className="law-ranked__rank-heading"
                  scope="col"
                  aria-sort={isPracticeAreaView ? undefined : "ascending"}
                >
                  <span>Overall</span>
                  <span>rank</span>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Entity type</th>
                <th className="law-ranked__metric-heading" scope="col"><span>AI answers</span><small>of {isPracticeAreaView ? 90 : 810}</small></th>
                <th className="law-ranked__metric-heading" scope="col"><span>Questions</span><small>of {isPracticeAreaView ? 10 : 90}</small></th>
                {!isPracticeAreaView ? (
                  <>
                    <th className="law-ranked__metric-heading" scope="col"><span>Practice areas</span><small>of 9</small></th>
                    <th scope="col">Strongest question</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {visible.slice(0, limit).map((entity) => {
                const strongestQuestion = entity.appearances[0];
                return (
                  <tr key={entity.id}>
                    {isPracticeAreaView ? (
                      <td className="law-ranked__rank-value">
                        {practiceAreaRankByEntity.get(entity.id) ?? "—"}
                      </td>
                    ) : null}
                    <td
                      className={`law-ranked__rank-value ${isPracticeAreaView ? "law-ranked__rank-value--overall" : ""}`}
                    >
                      {overallRankByEntity.get(entity.id) ?? "—"}
                    </td>
                    <th scope="row">
                      <ResearchDrawer
                        className="sports-entity-evidence-drawer"
                        eyebrow={entity.affiliation ?? entity.panelName ?? humanise(entity.entityType)}
                        title={entity.name}
                        trigger={entity.name}
                      >
                        {(closeDrawer) => (
                          <SportsEntityDrawerContent
                            entity={entity}
                            practiceArea={isPracticeAreaView ? sport : null}
                            onQuestionSelect={(questionId) => {
                              closeDrawer();
                              revealQuestion(questionId);
                            }}
                          />
                        )}
                      </ResearchDrawer>
                    </th>
                    <td className="law-ranked__text">
                      {humanise(entity.entityType)}
                      <small>
                        {entity.affiliation ?? (
                          entity.entityType === "firm" && entity.panelStatus === "panel"
                            ? "Top-ranked UK sports-law firms"
                            : entity.overseas ? "Overseas" : "Outside comparison list"
                        )}
                      </small>
                    </td>
                    <td><strong>{entity.answerCount}</strong></td>
                    <td><strong>{entity.questionCount}</strong></td>
                    {!isPracticeAreaView ? (
                      <>
                        <td><strong>{entity.sportCount}</strong></td>
                        <td className="law-ranked__text">
                          {strongestQuestion ? (
                            <>
                              {strongestQuestion.question}
                              <small>{strongestQuestion.sportLabel} · Named {strongestQuestion.answerCount}/9</small>
                            </>
                          ) : (
                            <span>No verified appearance</span>
                          )}
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!visible.length ? <p className="law-explorer__empty">No tracked name matches those filters.</p> : null}
        {visible.length > limit ? (
          <p className="law-ranked__more">
            <button
              type="button"
              aria-label={`Show more names. ${visible.length - limit} remaining.`}
              onClick={() => setLimit(limit + 20)}
            >
              Show more names <span aria-hidden="true">→</span>
            </button>
          </p>
        ) : null}
        <p className="law-explorer__note">
          Counts are exact name appearances in captured answer text. They measure visibility, not
          legal quality or endorsement. Affiliation review remains part of the publication gate.
        </p>
      </div>
    </section>
  );
}

function QuestionDrawerContent({ question }: { question: SportsQuestion }) {
  const [provider, setProvider] = useState<QuestionSample["provider"]>("openai");
  const sample = question.samples.find((item) => item.provider === provider) ?? question.samples[0];
  const recommendations = [...question.firms, ...question.lawyers, ...question.chambers]
    .sort((left, right) => right.answerCount - left.answerCount || left.name.localeCompare(right.name));
  return (
    <div className="sports-question-drawer__content">
      <div className="sports-question-drawer__summary">
        <span>{question.sportLabel}</span>
        <span>{humanise(question.buyerType)}</span>
        <span>{humanise(question.legalNeed)}</span>
      </div>
      <section className="sports-question-drawer__names">
        <header>
          <h3>Names appearing most often</h3>
          <span>Counted across nine answers</span>
        </header>
        {recommendations.length ? (
          <ol>
            {recommendations.slice(0, 16).map((entity) => (
              <li key={`${question.id}-${entity.id}`}>
                <span>{entity.name}</span>
                <strong>{entity.answerCount}/9</strong>
              </li>
            ))}
          </ol>
        ) : <p>No tracked firm, lawyer or chambers appeared.</p>}
      </section>
      <section className="sports-question-drawer__samples">
        <header>
          <div>
            <h3>Sample answer</h3>
            <span>One captured answer from each platform</span>
          </div>
          <div role="tablist" aria-label="Choose sample platform">
            {question.samples.map((item) => (
              <button
                key={item.provider}
                type="button"
                role="tab"
                aria-selected={provider === item.provider}
                className={provider === item.provider ? "is-selected" : undefined}
                onClick={() => setProvider(item.provider)}
              >
                {providerLabels[item.provider]}
              </button>
            ))}
          </div>
        </header>
        <p className="sports-question-drawer__answer">{sample.answerText}</p>
        <div className="sports-question-drawer__sample-sources">
          <h4>Links supplied with this sample</h4>
          {sample.sources.length ? (
            <ol>
              {sample.sources.map((source) => (
                <li key={`${sample.observationId}-${source.position}-${source.url}`}>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.domain}</a>
                  <span>Source {source.position}</span>
                </li>
              ))}
            </ol>
          ) : <p>No source link was supplied with this answer.</p>}
        </div>
      </section>
      <section className="sports-question-drawer__all-sources">
        <h3>All links supplied for this question</h3>
        <p>{question.sources.length} distinct captured URLs across the nine answers.</p>
        <ol>
          {question.sources.map((source, index) => (
            <li key={`${question.id}-${source.url}-${index}`}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.domain}</a>
              <span>
                {source.answerCount}/9 answers · best position {source.bestPosition}
                {source.isGeminiRedirect ? " · captured Gemini redirect" : ""}
              </span>
            </li>
          ))}
        </ol>
      </section>
      <p className="fa3-question-evidence__caveat">
        Sample answers are published as captured. The report does not endorse their recommendations
        or assess whether the legal guidance is correct.
      </p>
    </div>
  );
}

export function SportsQuestionExplorer({ questions }: { questions: SportsQuestion[] }) {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("all");
  const [buyerType, setBuyerType] = useState("all");
  const [marketState, setMarketState] = useState("all");
  const sports = useMemo(() => Array.from(new Set(questions.map((item) => item.sportLabel))).sort(), [questions]);
  const buyerTypes = useMemo(() => Array.from(new Set(questions.map((item) => item.buyerType))).sort(), [questions]);
  const visible = useMemo(() => {
    const term = clean(query);
    return questions.filter((question) => {
      const matchesQuery = !term || clean(`${question.question} ${question.legalNeed} ${question.buyerType}`).includes(term);
      const matchesSport = sport === "all" || question.sportLabel === sport;
      const matchesBuyer = buyerType === "all" || question.buyerType === buyerType;
      const matchesState = marketState === "all" || (marketState === "open" ? question.leaderAnswerCount <= 3 : question.leaderAnswerCount >= 5);
      return matchesQuery && matchesSport && matchesBuyer && matchesState;
    });
  }, [buyerType, marketState, query, questions, sport]);
  const groups = sports
    .map((sportLabel) => ({ sportLabel, questions: visible.filter((question) => question.sportLabel === sportLabel) }))
    .filter((group) => group.questions.length);
  const expand = Boolean(clean(query)) || sport !== "all" || buyerType !== "all" || marketState !== "all";

  useEffect(() => {
    const revealQuestion = (id: string) => {
      if (!id.startsWith("question-")) return;
      const target = document.getElementById(id);
      const group = target?.closest("details");
      if (group instanceof HTMLDetailsElement) group.open = true;
      window.requestAnimationFrame(() => target?.scrollIntoView({ block: "center" }));
    };
    const revealLinkedQuestion = () => revealQuestion(window.location.hash.slice(1));
    const revealClickedQuestion = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href^="#question-"]')
        : null;
      if (target) revealQuestion(target.hash.slice(1));
    };
    revealLinkedQuestion();
    window.addEventListener("hashchange", revealLinkedQuestion);
    document.addEventListener("click", revealClickedQuestion, true);
    return () => {
      window.removeEventListener("hashchange", revealLinkedQuestion);
      document.removeEventListener("click", revealClickedQuestion, true);
    };
  }, []);

  return (
    <section className="fa3-section law-explorer sports-question-explorer" id="sports-question-explorer" aria-labelledby="sports-question-title">
      <div className="editorial-container">
        <header className="fa3-section-heading sports-question-explorer__heading">
          <div>
            <p className="fa3-kicker">Full question set</p>
            <h2 id="sports-question-title">Search by question</h2>
          </div>
          <p>Filter the 90 buyer questions by sport, buyer type or result strength, then open any question to inspect the names, captured answers and source links.</p>
        </header>
        <div className="law-explorer__controls sports-question-explorer__controls">
          <LawSelect
            label="Practice area"
            value={sport}
            onChange={setSport}
            options={[{ value: "all", label: "All nine practice areas" }, ...sports.map((item) => ({ value: item, label: item }))]}
          />
          <LawSelect
            label="Buyer type"
            value={buyerType}
            onChange={setBuyerType}
            options={[{ value: "all", label: "All buyer types" }, ...buyerTypes.map((item) => ({ value: item, label: humanise(item) }))]}
          />
          <LawSelect
            label="Result strength"
            value={marketState}
            onChange={setMarketState}
            options={[
              { value: "all", label: "All questions" },
              { value: "open", label: "No firm above 3 of 9" },
              { value: "owned", label: "A firm in at least 5 of 9" }
            ]}
          />
          <SearchField
            id="sports-question-search"
            label="Question or dispute"
            placeholder="Try unpaid wages or sponsorship"
            value={query}
            onChange={setQuery}
          />
        </div>
        <p className="law-explorer__result-count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "question" : "questions"}
        </p>
        <div className="fa3-question-groups sports-question-groups">
          {groups.map((group, groupIndex) => (
            <details
              key={`${group.sportLabel}-${expand ? `${query}-${sport}-${buyerType}-${marketState}` : "closed"}`}
              className="fa3-question-group law-question-group sports-question-group"
              open={expand ? true : undefined}
            >
              <summary>
                <span className="fa3-question-group__number">{String(groupIndex + 1).padStart(2, "0")}</span>
                <div><span>{group.questions.length} questions</span><strong>{group.sportLabel}</strong></div>
                <small>View questions</small>
              </summary>
              <ol className="fa3-question-index law-question-index sports-question-index" aria-label={`${group.sportLabel} questions`}>
                {group.questions.map((question) => (
                  <li key={question.id} id={`question-${question.id}`}>
                    <ResearchDrawer
                      className="research-drawer-panel--question fa3-question-drawer sports-question-drawer"
                      eyebrow={`${question.id} · ${question.sportLabel} · ${humanise(question.legalNeed)}`}
                      title={question.question}
                      triggerClassName="fa3-question-index__trigger law-question-index__trigger sports-question-index__trigger"
                      trigger={
                        <>
                          <span>{question.id}</span>
                          <strong>{question.question}</strong>
                          <small>
                            {question.leader ? `${question.leader} ${question.leaderAnswerCount}/9` : "No tracked leader"} →
                          </small>
                        </>
                      }
                    >
                      <QuestionDrawerContent question={question} />
                    </ResearchDrawer>
                  </li>
                ))}
              </ol>
            </details>
          ))}
          {!visible.length ? <p className="law-explorer__empty">No question matches those filters.</p> : null}
        </div>
      </div>
    </section>
  );
}
