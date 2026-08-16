"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";
import { LawSelect } from "./law-select";

export type LawQuestion = {
  id: string;
  areaIndex: number;
  area: string;
  type: "problem" | "choice";
  question: string;
  answerCount: number;
  sample: { provider: string; repetition: number; answer: string };
  topSources: Array<{ host: string; title: string; count: number; citationInstances: number; url: string }>;
  named: Array<{ name: string; count: number }>;
  firms: Array<{
    name: string;
    namedAnswers: number;
    citedAnswers: number;
    citationInstances: number;
    pages: Array<{ title: string; url: string; host: string; count: number }>;
  }>;
};

export type LawEntity = {
  name: string;
  aliases: string[];
  domains: string[];
  kind: "firm";
  namedAnswers: number;
  citedAnswers: number;
  citationInstances: number;
  questionCount: number;
  appearances: Array<{
    questionId: string;
    question: string;
    area: string;
    type: "problem" | "choice";
    namedAnswers: number;
    citedAnswers: number;
    citationInstances: number;
    providers: string[];
    pages: Array<{ title: string; url: string; host: string; count: number }>;
  }>;
};

export type LawLegal500Ranking = {
  canonicalName: string;
  legal500Name: string;
  area: string;
  tier: number;
  categories: string[];
};

const clean = (value: string) => value.toLocaleLowerCase("en-GB").replace(/[^a-z0-9]+/g, " ").trim();
const compact = (value: string) => clean(value).replace(/\s+/g, "");

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

export function LawMethodDrawer() {
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
                75 real legal problems across 15 practice areas, each asked two ways: on its own, and
                followed by &ldquo;Which UK law firms should I consider instructing?&rdquo;. Plus 15
                broad &ldquo;best [practice] lawyers in London&rdquo; questions.
              </dd>
            </div>
            <div>
              <dt>How we tested it</dt>
              <dd>
                Every question was put to ChatGPT, Gemini and Perplexity three times, with web search
                on. The 75 problems and 15 broad questions ran on 5 August 2026 (810 answers); the 75
                problems with the firm request ran on 15 August 2026 (675 answers). 1,485 answers in
                total, all valid.
              </dd>
            </div>
            <div>
              <dt>What we recorded</dt>
              <dd>
                Which firms each answer suggested when asked which firm to instruct, and which
                websites each answer cited. Suggested means AI presented the firm as an option; cited
                means an answer linked to the firm&rsquo;s website.
              </dd>
            </div>
            <div>
              <dt>How we compared AI with Legal 500</dt>
              <dd>
                We matched the 15 study areas to the corresponding Legal 500 London practice
                rankings, frozen before the 15 August capture. Tier 1 and all other ranked firms are
                included; firms to watch are excluded. Areas spanning several categories use the
                combined firm list and each firm&rsquo;s best tier. Unranked means not ranked in
                the mapped London category for that work.
              </dd>
            </div>
            <div>
              <dt>Limits</dt>
              <dd>
                Each capture is a single run on one day; the two captures are ten days apart. AI
                answers change over time. The study measures visibility, not the quality of any
                firm, and does not judge whether an answer is legally correct.
              </dd>
            </div>
          </dl>
          <div className="fa3-method-content__scope">
            <strong>What the study measures</strong>
            <span>
              It records what the three AI platforms returned. It does not rate any lawyer or firm,
              and it does not judge whether an answer is legally correct.
            </span>
          </div>
          <Link
            className="fa3-method-content__questions-link"
            href="#law-question-explorer-title"
            onClick={closeDrawer}
          >
            View all 90 questions →
          </Link>
        </div>
      )}
    </ResearchDrawer>
  );
}

function LawQuestionDrawerContent({ question }: { question: LawQuestion }) {
  const suggestedFirms = question.firms.filter((firm) => firm.namedAnswers > 0).sort((left, right) => right.namedAnswers - left.namedAnswers || left.name.localeCompare(right.name, "en-GB")).slice(0, 12);
  const citedFirms = question.firms.filter((firm) => firm.citedAnswers > 0).sort((left, right) => right.citedAnswers - left.citedAnswers || left.name.localeCompare(right.name, "en-GB")).slice(0, 12);
  const sources = question.topSources.slice(0, 12);
  return (
    <div className="law-question-drawer__content">
      <p className="law-question-drawer__intro">
        Across the nine captured answers: the firms AI suggested, the law-firm websites it cited and
        every other website it relied on.
      </p>
      <div className="law-qcards">
        <section className="law-qcard">
          <header>
            <h3>Firms suggested most often</h3>
            <span>{question.type === "problem" ? "Asked which firm to instruct" : "Best lawyers question"}</span>
          </header>
          {suggestedFirms.length ? (
            <ol>
              {suggestedFirms.map((firm) => (
                <li key={firm.name}>
                  <span className="law-qcard__name">{firm.name}</span>
                  <span className="law-qcard__count">{firm.namedAnswers}<small>/{question.answerCount}</small></span>
                </li>
              ))}
            </ol>
          ) : <p className="law-explorer__empty">No law firm was suggested.</p>}
        </section>

        <section className="law-qcard">
          <header>
            <h3>Law-firm websites cited</h3>
            <span>Answers that linked to a firm&rsquo;s own page</span>
          </header>
          {citedFirms.length ? (
            <ol>
              {citedFirms.map((firm) => (
                <li key={firm.name}>
                  <span className="law-qcard__name">
                    {firm.name}
                    {firm.pages[0] ? (
                      <a href={firm.pages[0].url} target="_blank" rel="noreferrer">{firm.pages[0].title}</a>
                    ) : null}
                  </span>
                  <span className="law-qcard__count">{firm.citedAnswers}<small>/{question.answerCount}</small></span>
                </li>
              ))}
            </ol>
          ) : <p className="law-explorer__empty">No law-firm website was cited.</p>}
        </section>

        <section className="law-qcard">
          <header>
            <h3>All websites cited most often</h3>
            <span>Every source, not only law firms</span>
          </header>
          {sources.length ? (
            <ol>
              {sources.map((source) => (
                <li key={`${question.id}-${source.url}`}>
                  <span className="law-qcard__name">
                    <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                    <small>{source.host}</small>
                  </span>
                  <span className="law-qcard__count">{source.count}<small>/{question.answerCount}</small></span>
                </li>
              ))}
            </ol>
          ) : <p className="law-explorer__empty">No source link appeared for this question.</p>}
        </section>
      </div>
      <p className="fa3-question-evidence__caveat">
        Suggested means AI presented the firm as an option when asked which firm to instruct. Cited
        means an answer linked to that website. Counts are out of the {question.answerCount} captured
        answers.
      </p>
    </div>
  );
}

export function LawQuestionExplorer({ questions }: { questions: LawQuestion[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"problem" | "choice" | "all">("all");
  const [area, setArea] = useState("all");
  const areas = useMemo(
    () => Array.from(new Set(questions.map((question) => question.area))).sort(),
    [questions]
  );
  const visible = useMemo(() => {
    const term = clean(query);
    return questions.filter((question) => {
      const matchesType = type === "all" || question.type === type;
      const matchesArea = area === "all" || question.area === area;
      const matchesQuery = !term || clean(`${question.question} ${question.area}`).includes(term);
      return matchesType && matchesArea && matchesQuery;
    });
  }, [area, query, questions, type]);
  const visibleGroups = useMemo(
    () => areas
      .map((practiceArea, index) => ({
        area: practiceArea,
        number: String(index + 1).padStart(2, "0"),
        questions: visible.filter((question) => question.area === practiceArea),
      }))
      .filter((group) => group.questions.length),
    [areas, visible]
  );
  const revealFilteredQuestions = Boolean(clean(query)) || area !== "all";
  return (
    <section className="fa3-section law-explorer law-question-explorer" aria-labelledby="law-question-explorer-title">
      <div className="editorial-container">
        <header className="fa3-section-heading">
          <div>
            <p className="fa3-kicker">Explore by practice area</p>
            <h2 id="law-question-explorer-title">All 15 practice areas, every question.</h2>
          </div>
          <p>
            Every legal problem was asked with &ldquo;Which UK law firms should I consider
            instructing?&rdquo; on the end, so each row shows the question exactly as a client would
            put it. Choose a practice area or search a concern, then open a question to see the firms
            AI suggested, the law-firm websites it cited and the other sources it used.
          </p>
        </header>

        <div className="law-explorer__controls law-question-explorer__controls">
          <LawSelect
            label="Question type"
            value={type}
            onChange={(next) => setType(next as typeof type)}
            options={[
              { value: "all", label: "All questions (90)" },
              { value: "problem", label: "A legal problem, then which firm to instruct (75)" },
              { value: "choice", label: "Best lawyers in London for a practice (15)" }
            ]}
          />
          <LawSelect
            label="Practice area"
            value={area}
            onChange={(next) => setArea(next)}
            options={[{ value: "all", label: "All 15 practice areas" }, ...areas.map((item) => ({ value: item, label: item }))]}
          />
          <SearchField
            id="law-question-search"
            label="Search questions"
            placeholder="Try settlement agreement"
            value={query}
            onChange={setQuery}
          />
        </div>

        <p className="law-explorer__result-count" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "question" : "questions"} across{" "}
          {visibleGroups.length} {visibleGroups.length === 1 ? "practice area" : "practice areas"}
        </p>

        <div className="fa3-question-groups law-question-groups">
          {visibleGroups.map((group) => (
            <details
              key={`${group.area}-${revealFilteredQuestions ? `${area}-${query}` : "collapsed"}`}
              className="fa3-question-group law-question-group"
              open={revealFilteredQuestions ? true : undefined}
            >
              <summary>
                <span className="fa3-question-group__number">{group.number}</span>
                <div>
                  <span>{group.questions.length} {group.questions.length === 1 ? "question" : "questions"}</span>
                  <strong>{group.area}</strong>
                </div>
                <small>View questions</small>
              </summary>
              <ol className="fa3-question-index law-question-index" aria-label={`${group.area} questions`}>
                {group.questions.map((question) => (
                  <li key={question.id}>
                    <ResearchDrawer
                      className="research-drawer-panel--question fa3-question-drawer law-question-drawer"
                      eyebrow={`${question.id} · ${question.area} · ${question.type === "choice" ? "Which firm to choose" : "A legal problem, then which firm to instruct"}`}
                      title={question.type === "choice" ? question.question : `${question.question} Which UK law firms should I consider instructing?`}
                      triggerClassName="fa3-question-index__trigger law-question-index__trigger"
                      trigger={
                        <>
                          <span>{question.id}</span>
                          <strong>
                            {question.question}
                            {question.type === "problem" ? (
                              <em className="law-question-index__ask">then: which UK law firms should I consider instructing?</em>
                            ) : null}
                          </strong>
                          <small>View answer and sources →</small>
                        </>
                      }
                    >
                      <LawQuestionDrawerContent question={question} />
                    </ResearchDrawer>
                  </li>
                ))}
              </ol>
            </details>
          ))}
          {!visible.length ? <p className="law-explorer__empty">No question matches those filters.</p> : null}
        </div>
        <p className="law-explorer__note">
          Counts show how many of the nine answers suggested the firm, linked to its website or
          cited the specific page shown. The same page is counted once per answer.
        </p>
      </div>
    </section>
  );
}

export function LawFirmExplorer({
  entities,
  legal500Rankings
}: {
  entities: LawEntity[];
  legal500Rankings: LawLegal500Ranking[];
}) {
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const results = useMemo(() => {
    const term = compact(query);
    const matches = term
      ? entities.filter((entity) => compact([entity.name, ...entity.aliases, ...entity.domains].join(" ")).includes(term))
      : [];
    return matches
      .sort((left, right) =>
        right.questionCount - left.questionCount ||
        right.namedAnswers + right.citedAnswers - (left.namedAnswers + left.citedAnswers) ||
        left.name.localeCompare(right.name)
      )
      .slice(0, 30);
  }, [entities, query]);
  const selected = results.find((entity) => entity.name === selectedName) ?? results[0];
  const selectedRankings = selected
    ? legal500Rankings
        .filter((ranking) => ranking.canonicalName === selected.name)
        .sort((left, right) => left.area.localeCompare(right.area))
    : [];

  return (
    <section className="fa3-section law-explorer law-firm-explorer" aria-labelledby="law-firm-explorer-title">
      <div className="editorial-container law-firm-explorer__grid">
        <div className="law-firm-explorer__intro">
          <p className="fa3-kicker">Search the results</p>
          <h2 id="law-firm-explorer-title">Is your firm suggested or cited?</h2>
          <p>
            Search the firms that appeared and the 337 firms in the mapped Legal 500 rankings. See
            every question where AI suggested the firm or cited one of its pages.
          </p>
          <SearchField
            id="law-firm-search"
            label="Firm or website"
            placeholder="Try a firm name or domain"
            value={query}
            onChange={setQuery}
          />
          <p className="law-explorer__result-count" aria-live="polite">
            {query ? `${results.length} matching ${results.length === 1 ? "result" : "results"}` : "Start typing to search the study and the mapped Legal 500 rankings"}
          </p>
          <div className="law-firm-explorer__results" aria-label="Matching firms and websites">
            {results.map((entity) => (
              <button
                key={`${entity.kind}-${entity.name}`}
                type="button"
                className={entity.name === selected?.name ? "is-selected" : undefined}
                aria-pressed={entity.name === selected?.name}
                onClick={() => setSelectedName(entity.name)}
              >
                <span>
                  <strong>{entity.name}</strong>
                  {entity.domains.length ? <small>{entity.domains.join(" · ")}</small> : null}
                </span>
                <span>{entity.questionCount} questions</span>
              </button>
            ))}
            {query && !results.length ? (
              <p className="law-explorer__empty">No matching firm or website was found in the study or mapped rankings.</p>
            ) : null}
          </div>
        </div>

        {selected ? (
          <article className="law-firm-evidence" aria-live="polite">
            <header>
              <p className="fa3-kicker">This firm in AI search</p>
              <h3>{selected.name}</h3>
              {selected.domains.length ? <span>{selected.domains.join(" · ")}</span> : null}
            </header>
            <dl>
              <div><dt>Suggested</dt><dd>{selected.namedAnswers}</dd></div>
              <div><dt>Cited</dt><dd>{selected.citedAnswers}</dd></div>
              <div><dt>Questions</dt><dd>{selected.questionCount}</dd></div>
            </dl>
            {selectedRankings.length ? (
              <section className="law-firm-evidence__legal500">
                <h4>Legal 500 rankings in the matched practice areas</h4>
                <ul>
                  {selectedRankings.map((ranking) => (
                    <li key={`${selected.name}-${ranking.area}`}>
                      <span>{ranking.area}</span>
                      <strong>Tier {ranking.tier}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <ol>
              {selected.appearances.map((appearance) => (
                <li key={`${selected.name}-${appearance.questionId}`}>
                  <div>
                    <span>{appearance.area} · {appearance.type === "choice" ? "Which firm to choose" : "A legal problem"}</span>
                    <strong>{appearance.question}</strong>
                  </div>
                  <div>
                    {appearance.namedAnswers ? <span>Suggested {appearance.namedAnswers}/9</span> : null}
                    {appearance.citedAnswers ? <span>Cited {appearance.citedAnswers}/9</span> : null}
                  </div>
                  {appearance.pages.length ? (
                    <ul>
                      {appearance.pages.map((page) => (
                        <li key={page.url}>
                          <a href={page.url} target="_blank" rel="noreferrer">{page.title}</a>
                          <span>{page.host} · Cited in {page.count}/9 answers</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
            {!selected.appearances.length ? (
              <p className="law-firm-evidence__empty">
                No suggested or cited appearances were found for this firm in the 90-question
                study.
              </p>
            ) : null}
          </article>
        ) : (
          <article className="law-firm-evidence law-firm-evidence--empty">
            <p className="fa3-kicker">Your firm in AI search</p>
            <h3>Search to see where a firm appeared.</h3>
            <p>
              The result will show every question where AI suggested the firm or cited one of its
              pages, with links to the pages used.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
