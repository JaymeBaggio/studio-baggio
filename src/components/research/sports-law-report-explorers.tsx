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
      trigger="How this study was run"
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
                Every exact question was put to ChatGPT, Gemini and Perplexity three times with
                grounded web search on. The capture ran on 15 August 2026 and produced 810 valid
                answers: nine answers per question.
              </dd>
            </div>
            <div>
              <dt>What we recorded</dt>
              <dd>
                The firms, individual lawyers and chambers named in each answer, the questions where
                each appeared and every source link supplied by the platforms. A name is counted once
                per answer, even if it appears several times.
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

export function SportsEntityExplorer({ entities }: { entities: SportsEntity[] }) {
  const [query, setQuery] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [sport, setSport] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [limit, setLimit] = useState(20);
  const sports = useMemo(
    () => Array.from(new Set(entities.flatMap((entity) => entity.appearances.map((item) => item.sportLabel)))).sort(),
    [entities]
  );
  const visible = useMemo(() => {
    const term = clean(query);
    return entities
      .filter((entity) => {
        const matchesQuery = !term || clean(`${entity.name} ${entity.affiliation ?? ""} ${entity.panelName ?? ""}`).includes(term);
        const matchesType = entityType === "all" || entity.entityType === entityType;
        const matchesSport = sport === "all" || entity.appearances.some((item) => item.sportLabel === sport);
        const matchesVisibility = visibility === "all" || (visibility === "surfaced" ? entity.answerCount > 0 : entity.answerCount === 0);
        return matchesQuery && matchesType && matchesSport && matchesVisibility;
      })
      .sort((left, right) => right.answerCount - left.answerCount || right.questionCount - left.questionCount || left.name.localeCompare(right.name));
  }, [entities, entityType, query, sport, visibility]);
  const selected = visible.find((entity) => entity.id === selectedId);

  const resetSelection = () => {
    setSelectedId("");
    setLimit(20);
  };

  return (
    <section className="fa3-section law-explorer sports-entity-explorer" id="sports-entity-explorer" aria-labelledby="sports-entity-title">
      <div className="editorial-container">
        <header className="sports-entity-explorer__simple-heading">
          <h2 id="sports-entity-title">Search your firm</h2>
        </header>
        <div className="law-explorer__controls sports-entity-explorer__controls">
          <LawSelect
            label="Entity type"
            value={entityType}
            onChange={(value) => { setEntityType(value); resetSelection(); }}
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
            onChange={(value) => { setSport(value); resetSelection(); }}
            options={[{ value: "all", label: "All nine practice areas" }, ...sports.map((item) => ({ value: item, label: item }))]}
          />
          <LawSelect
            label="Visibility"
            value={visibility}
            onChange={(value) => { setVisibility(value); resetSelection(); }}
            options={[
              { value: "all", label: "All tracked names" },
              { value: "surfaced", label: "Named in at least one answer" },
              { value: "absent", label: "Tracked but not named" }
            ]}
          />
          <SearchField
            id="sports-entity-search"
            label="Firm or lawyer"
            placeholder="Try Sheridans or Brabners"
            value={query}
            onChange={(value) => { setQuery(value); resetSelection(); }}
          />
        </div>
        <p className="law-explorer__result-count" aria-live="polite">
          {visible.length} matching {visible.length === 1 ? "name" : "names"}
        </p>
        <ol className="sports-entity-results" aria-label="Matching firms and lawyers">
          {visible.slice(0, limit).map((entity, index) => {
            const isSelected = entity.id === selectedId;
            return (
              <li className={isSelected ? "is-selected" : undefined} key={entity.id}>
                <button
                  className="sports-entity-result__trigger"
                  type="button"
                  aria-expanded={isSelected}
                  aria-controls={`sports-entity-detail-${entity.id}`}
                  onClick={() => setSelectedId(isSelected ? "" : entity.id)}
                >
                  <span className="sports-entity-result__rank" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="sports-entity-result__identity">
                    <strong>{entity.name}</strong>
                    <small>
                      {entity.affiliation ?? (
                        entity.entityType === "firm" && entity.panelStatus === "panel"
                          ? "Established firm list"
                          : humanise(entity.entityType)
                      )}
                    </small>
                  </span>
                  <span className="sports-entity-result__metrics">
                    <span><strong>{entity.answerCount}</strong><small>answers</small></span>
                    <span><strong>{entity.questionCount}</strong><small>questions</small></span>
                    <span><strong>{entity.sportCount}</strong><small>areas</small></span>
                  </span>
                  <span className="sports-entity-result__action" aria-hidden="true">
                    {isSelected ? "Close" : "View results"}
                  </span>
                </button>
                {isSelected && selected ? (
                  <div
                    className="law-ranked__detail law-ranked__detail--inline sports-entity-detail"
                    id={`sports-entity-detail-${entity.id}`}
                    aria-live="polite"
                  >
                    <header>
                      <p>
                        <strong>{selected.name}</strong>
                        Named in {selected.answerCount} answers across {selected.questionCount} questions and {selected.sportCount} practice areas.
                      </p>
                    </header>
                    {selected.appearances.length ? (
                      <ol>
                        {selected.appearances.map((appearance) => (
                          <li key={`${selected.id}-${appearance.questionId}`}>
                            <span className="law-ranked__detail-q">
                              <a href={`#question-${appearance.questionId}`}>{appearance.question}</a>
                              <small>{appearance.sportLabel} · {humanise(appearance.legalNeed)}</small>
                            </span>
                            <span className="law-ranked__detail-n"><em>Named {appearance.answerCount}/9</em></span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="sports-entity-evidence__empty">
                        This tracked name did not appear in any of the 810 captured answers.
                      </p>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
        {!visible.length ? <p className="law-explorer__empty">No tracked name matches those filters.</p> : null}
        {visible.length > limit ? (
          <p className="law-ranked__more"><button type="button" onClick={() => setLimit(limit + 20)}>Show more names ({visible.length - limit} more)</button></p>
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
            <span>One deterministic public sample from each platform</span>
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
      window.requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
    };
    const revealLinkedQuestion = () => revealQuestion(window.location.hash.slice(1));
    const revealClickedQuestion = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#question-"]') : null;
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
        <header className="sports-question-explorer__simple-heading">
          <h2 id="sports-question-title">Search by question</h2>
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
            <details key={`${group.sportLabel}-${expand ? `${query}-${sport}-${buyerType}-${marketState}` : "closed"}`} className="fa3-question-group law-question-group" open={expand ? true : undefined}>
              <summary>
                <span className="fa3-question-group__number">{String(groupIndex + 1).padStart(2, "0")}</span>
                <div><span>{group.questions.length} questions</span><strong>{group.sportLabel}</strong></div>
                <small>View questions</small>
              </summary>
              <ol className="fa3-question-index law-question-index" aria-label={`${group.sportLabel} questions`}>
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
