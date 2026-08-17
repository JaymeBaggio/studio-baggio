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
import { LawSelect } from "./law-select";
import { ResearchDrawer } from "./ResearchDrawer.client";

const familyOrder = ["core", "wealth", "pensions", "life_events", "local"] as const;

const familyLabels: Record<string, string> = {
  core: "General financial advice",
  wealth: "Wealth and investing",
  pensions: "Pensions and retirement",
  life_events: "Life events and specialist planning",
  local: "Matched local discovery"
};

const adviceAreaOrder = familyOrder.slice(0, 4);

const questionLabels: Record<string, string> = {
  "FA3-CORE-01": "Any UK financial adviser",
  "FA3-CORE-02": "Financial advice firms to consider",
  "FA3-CORE-03": "Independent financial adviser firms",
  "FA3-CORE-04": "Chartered Financial Planners",
  "FA3-CORE-05": "One-off fixed-fee advice",
  "FA3-WEALTH-01": "Investing a £100,000 lump sum",
  "FA3-WEALTH-02": "Investing £500,000",
  "FA3-WEALTH-03": "Investing more than £1 million",
  "FA3-WEALTH-04": "Wealth management and financial planning",
  "FA3-WEALTH-05": "Sustainable or ethical investing",
  "FA3-PENSION-01": "Retirement planning",
  "FA3-PENSION-02": "Retirement income and pension drawdown",
  "FA3-PENSION-03": "Combining old workplace pensions",
  "FA3-PENSION-04": "Annuity or pension drawdown",
  "FA3-PENSION-05": "Defined-benefit pension transfer",
  "FA3-LIFE-01": "Planning for a £250,000 inheritance",
  "FA3-LIFE-02": "Inheritance tax and estate planning",
  "FA3-LIFE-03": "Later-life and care-fees planning",
  "FA3-LIFE-04": "Divorce and pension sharing",
  "FA3-LIFE-05": "Planning before and after a business sale"
};

const pct = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 1
});

const collator = new Intl.Collator("en-GB", { numeric: true, sensitivity: "base" });
const ANSWERS_PER_NATIONAL_FAMILY = 45;
const ANSWERS_PER_QUESTION = 9;

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

function familyRecommendationCount(entity: ReportEntity) {
  return Math.round((entity.candidate_presence_rate ?? 0) * ANSWERS_PER_NATIONAL_FAMILY);
}

function questionStageLabel(stage: StudyQuestion["stage"]) {
  if (stage === "guidance") return "Understanding the decision";
  if (stage === "discoverability") return "Finding possible advisers";
  return "Choosing a firm";
}

function StudyQuestionDrawerContent({ question }: { question: StudyQuestion }) {
  const { evidence } = question;
  const isSelection = evidence.kind === "verified_selection";
  const visibleFirms = evidence.firms.slice(0, 5);
  const visibleSources = evidence.sources.slice(0, 5);
  const answerWord = evidence.valid_answer_count === 1 ? "answer" : "answers";

  return (
    <div className="fa3-drawer-stack">
      <p className="fa3-question-evidence__plain-intro">
        We asked this question {evidence.valid_answer_count} times: three times on OpenAI, three on
        Gemini and three on Perplexity.
      </p>

      <div className="fa3-drawer-summary">
        <div>
          <strong>{evidence.firms.length}</strong>
          <span>
            {isSelection ? "firms were recommended" : "established firms were named or cited"}
          </span>
        </div>
        <div>
          <strong>{evidence.sources.length}</strong>
          <span>websites were cited</span>
        </div>
      </div>

      <div className="fa3-question-evidence__columns">
        <section aria-labelledby={`${question.query_id}-firms`}>
          <header>
            <h3 id={`${question.query_id}-firms`}>
              {isSelection ? "Firms AI recommended most often" : "Firms that appeared most often"}
            </h3>
          </header>
          {visibleFirms.length ? (
            <ol className="fa3-question-evidence__compact-list">
              {visibleFirms.map((firm) => (
                <li key={firm.name}>
                  <strong>{firm.name}</strong>
                  <p>
                    {isSelection ? (
                      <>Recommended in {firm.recommended_answers} of {evidence.valid_answer_count} {answerWord}.</>
                    ) : (
                      <>
                        {firm.named_answers
                          ? `Named in ${firm.named_answers} of ${evidence.valid_answer_count} ${answerWord}.`
                          : null}
                        {firm.named_answers && firm.cited_answers ? " " : null}
                        {firm.cited_answers
                          ? `Its website was cited in ${firm.cited_answers} of ${evidence.valid_answer_count} ${answerWord}.`
                          : null}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="fa3-empty-result">
              {isSelection
                ? `No firm was recommended in the ${evidence.valid_answer_count} ${answerWord}.`
                : `No established firm was named or cited in the ${evidence.valid_answer_count} ${answerWord}.`}
            </p>
          )}
          {evidence.firms.length > visibleFirms.length ? (
            <p className="fa3-question-evidence__more">
              {evidence.firms.length - visibleFirms.length} other firms appeared less often.
            </p>
          ) : null}
        </section>

        <section aria-labelledby={`${question.query_id}-sources`}>
          <header>
            <h3 id={`${question.query_id}-sources`}>Websites AI cited most often</h3>
          </header>
          {visibleSources.length ? (
            <ol className="fa3-question-evidence__compact-list">
              {visibleSources.map((source) => (
                <li key={source.domain}>
                  <a
                    href={source.urls[0] ?? `https://${source.domain}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.domain}
                  </a>
                  <p>Cited in {source.answer_count} of {evidence.valid_answer_count} {answerWord}.</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="fa3-empty-result">No website citation was available.</p>
          )}
          {evidence.sources.length > visibleSources.length ? (
            <p className="fa3-question-evidence__more">
              {evidence.sources.length - visibleSources.length} other websites were cited less often.
            </p>
          ) : null}
        </section>
      </div>

      <p className="fa3-question-evidence__caveat">
        {isSelection
          ? "Recommended means the AI presented the firm as an option for the buyer."
          : "Named means the AI mentioned the firm. Cited means it linked to the firm’s website. Neither necessarily means the firm was recommended."}
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
                              <small>View results →</small>
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
            <h2 id="fa3-families-title">AI recommended different firms for different buyer needs</h2>
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
  const [family, setFamily] = useState("all");
  const [questionId, setQuestionId] = useState("all");

  const nationalQuestions = useMemo(
    () => questions.filter((question) => question.family !== "local"),
    [questions]
  );

  const buyerNeedQuestions = useMemo(
    () => family === "all"
      ? nationalQuestions
      : nationalQuestions.filter((question) => question.family === family),
    [family, nationalQuestions]
  );

  const selectedQuestions = useMemo(
    () => questionId === "all"
      ? (family === "all" ? [] : buyerNeedQuestions)
      : nationalQuestions.filter((question) => question.query_id === questionId),
    [buyerNeedQuestions, family, nationalQuestions, questionId]
  );

  const selectedQuestion = selectedQuestions.length === 1 && questionId !== "all"
    ? selectedQuestions[0]
    : null;

  const selectionStats = useMemo(() => {
    const stats = new Map<string, { answerCount: number; questionIds: Set<string> }>();

    for (const question of selectedQuestions) {
      for (const answer of question.answers) {
        const seenInAnswer = new Set<string>();
        for (const candidate of answer.candidates) {
          if (seenInAnswer.has(candidate.entity_id)) continue;
          seenInAnswer.add(candidate.entity_id);
          const current = stats.get(candidate.entity_id) ?? {
            answerCount: 0,
            questionIds: new Set<string>()
          };
          current.answerCount += 1;
          current.questionIds.add(question.query_id);
          stats.set(candidate.entity_id, current);
        }
      }
    }

    return stats;
  }, [selectedQuestions]);

  const selectedAnswerCount = selectedQuestions.reduce(
    (total, question) => total + question.valid_answer_count,
    0
  );

  const visible = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("en-GB");
    const isFiltering = Boolean(query || family !== "all");
    const source = isFiltering ? searchEntities : entities;
    const filtered = source.filter((entity) => {
      const matchesSearch = !query || entity.canonical_name.toLocaleLowerCase("en-GB").includes(query);
      const matchesFamily = family === "all" || selectionStats.has(entity.entity_id);
      return matchesSearch && matchesFamily;
    });
    if (family !== "all") {
      return filtered.sort((left, right) => {
        const leftStats = selectionStats.get(left.entity_id);
        const rightStats = selectionStats.get(right.entity_id);
        return (
          (rightStats?.answerCount ?? 0) - (leftStats?.answerCount ?? 0) ||
          (rightStats?.questionIds.size ?? 0) - (leftStats?.questionIds.size ?? 0) ||
          (right.score ?? 0) - (left.score ?? 0) ||
          collator.compare(left.canonical_name, right.canonical_name)
        );
      });
    }
    if (isFiltering) return filtered;
    return filtered.slice(0, 20);
  }, [entities, family, search, searchEntities, selectionStats]);

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
            <h2 id="fa3-breadth-title">Only four firms appeared across all four buyer needs</h2>
          </div>
          <p>Search for a firm, filter by advice area or a specific buyer need.</p>
        </header>

        <div className="fa3-breadth-controls">
          <div className="fa3-search-control">
            <span className="fa3-search-field">
              <Search aria-hidden="true" />
              <input
                aria-label="Search for a firm or adviser"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="search"
              />
            </span>
          </div>
          <LawSelect
            label="Advice area"
            menuMaxHeight={300}
            value={family}
            options={[
              { value: "all", label: "All advice areas" },
              ...adviceAreaOrder.map((value) => ({ value, label: familyLabels[value] }))
            ]}
            onChange={(value) => {
              setFamily(value);
              setQuestionId("all");
            }}
          />
          <LawSelect
            label="Specific buyer need"
            menuMaxHeight={300}
            value={questionId}
            options={[
              {
                value: "all",
                label: family === "all"
                  ? "All buyer needs"
                  : `All ${familyLabels[family].toLocaleLowerCase("en-GB")} buyer needs`
              },
              ...buyerNeedQuestions.map((question) => ({
                value: question.query_id,
                label: questionLabels[question.query_id] ?? question.query_text
              }))
            ]}
            onChange={(value) => {
              setQuestionId(value);
              if (value !== "all") {
                const question = nationalQuestions.find((item) => item.query_id === value);
                if (question) setFamily(question.family);
              }
            }}
          />
        </div>

        <p className="fa3-result-count" aria-live="polite">
          {!search && family === "all"
            ? `Showing ${visible.length} of ${entities.length} firms and advisers found in national answers.`
            : family !== "all"
              ? `Showing ${visible.length} ${visible.length === 1 ? "firm or adviser" : "firms and advisers"}, ranked by appearances across ${selectedAnswerCount} AI answers${selectedQuestion ? ` to “${questionLabels[selectedQuestion.query_id] ?? selectedQuestion.query_text}”` : ` to ${selectedQuestions.length} ${familyLabels[family].toLocaleLowerCase("en-GB")} questions`}.`
              : `Showing ${visible.length} ${visible.length === 1 ? "firm or adviser" : "firms and advisers"}.`}
        </p>

        <div className="fa3-breadth-table-wrap" role="region" aria-label="Firm visibility across advice areas" tabIndex={0}>
          <table className="fa3-breadth-table">
            <thead>
              <tr>
                <th scope="col">Candidate</th>
                {family === "all" ? (
                  <>
                    <th scope="col">Advice areas reached</th>
                    <th scope="col">General</th>
                    <th scope="col">Wealth</th>
                    <th scope="col">Pensions</th>
                    <th scope="col">Life events</th>
                  </>
                ) : (
                  <>
                    <th className="fa3-metric-heading" scope="col" aria-sort="descending">
                      <span>AI answers</span>
                      <small>of {selectedAnswerCount}</small>
                    </th>
                    {selectedQuestions.length > 1 ? (
                      <th className="fa3-metric-heading" scope="col">
                        <span>Buyer questions</span>
                        <small>of {selectedQuestions.length}</small>
                      </th>
                    ) : null}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {visible.map((entity) => {
                const stats = selectionStats.get(entity.entity_id);
                const entityOccurrences = occurrencesByEntity.get(entity.entity_id) ?? [];
                const scopedOccurrences = family === "all"
                  ? entityOccurrences
                  : entityOccurrences.filter((occurrence) => (
                    occurrence.family === family &&
                    (questionId === "all" || occurrence.query_id === questionId)
                  ));
                return (
                  <tr key={entity.entity_id}>
                    <th scope="row">
                      <ResearchDrawer
                        className="fa3-firm-evidence-drawer"
                        title={entity.canonical_name}
                        triggerClassName="fa3-firm-row-trigger"
                        trigger={
                          <>
                            <span>{entity.canonical_name}</span>
                            <small aria-hidden="true">View results →</small>
                          </>
                        }
                      >
                        <FirmEvidenceContent
                          entity={entity}
                          occurrences={scopedOccurrences}
                        />
                      </ResearchDrawer>
                    </th>
                    {family === "all" ? (
                      <>
                        <td>{entity.national_families_reached} of 4</td>
                        {familyOrder.slice(0, 4).map((area) => (
                          <td key={area}>{percentage(entity.family_scores?.[area])}</td>
                        ))}
                      </>
                    ) : (
                      <>
                        <td className="fa3-metric-value">{stats?.answerCount ?? 0}</td>
                        {selectedQuestions.length > 1 ? (
                          <td className="fa3-metric-value">{stats?.questionIds.size ?? 0}</td>
                        ) : null}
                      </>
                    )}
                  </tr>
                );
              })}
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
        <div><strong>{occurrences.length}</strong><span>AI answers recommended the firm</span></div>
        <div><strong>{groupedQuestions.length}</strong><span>buyer questions where it appeared</span></div>
        <div><strong>{ownSiteCitations}</strong><span>answers cited its own website</span></div>
      </div>

      <div className="fa3-firm-evidence__heading">
        <h3>Questions where this firm appeared</h3>
        <span>{groupedQuestions.length} {groupedQuestions.length === 1 ? "question" : "questions"}</span>
      </div>

      <div className="fa3-firm-evidence__questions">
        {groupedQuestions.map((questionOccurrences) => {
          const first = questionOccurrences[0];
          const cited = questionOccurrences.filter((item) => item.own_domain_cited).length;
          const topThree = questionOccurrences.filter((item) => item.shortlist_position <= 3).length;

          return (
            <article key={first.query_id}>
              <header>
                <span>{familyLabels[first.family]}</span>
                <h4>{first.query_text}</h4>
              </header>
              <p>
                <span>Recommended in {questionOccurrences.length} of {ANSWERS_PER_QUESTION} answers</span>
                <span>
                  {topThree === 0
                    ? "Not in the top three"
                    : topThree === 1
                      ? "Top three once"
                      : topThree === 2
                        ? "Top three twice"
                      : `Top three ${topThree} times`}
                </span>
                <span>
                  {cited === 0
                    ? "Own website not cited"
                    : cited === 1
                      ? "Own website cited once"
                      : cited === 2
                        ? "Own website cited twice"
                      : `Own website cited ${cited} times`}
                </span>
              </p>
            </article>
          );
        })}
      </div>

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

export function Fa3MethodDrawer() {
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
                50 questions covering three stages: understanding a financial need, finding possible
                advisers and choosing a specific firm.
              </dd>
            </div>
            <div>
              <dt>How we tested it</dt>
              <dd>
                Each question was put to OpenAI, Gemini and Perplexity three times, producing 450
                answers.
              </dd>
            </div>
            <div>
              <dt>What we checked</dt>
              <dd>
                We recorded which firms were named, cited or recommended. Every recommendation was
                checked by hand, then compared with a list of 150 established UK financial advice
                firms.
              </dd>
            </div>
          </dl>
          <div className="fa3-method-content__scope">
            <strong>What the study measures</strong>
            <span>
              AI visibility. It does not assess the quality or suitability of any financial adviser.
            </span>
          </div>
          <Link
            className="fa3-method-content__questions-link"
            href="#fa3-questions-title"
            onClick={closeDrawer}
          >
            View the questions →
          </Link>
        </div>
      )}
    </ResearchDrawer>
  );
}

export function sortEntitiesAlphabetically(entities: ReportEntity[]) {
  return [...entities].sort((left, right) => collator.compare(left.canonical_name, right.canonical_name));
}
