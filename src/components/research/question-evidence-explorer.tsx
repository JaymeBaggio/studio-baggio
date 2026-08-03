"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { ResearchQuestionEvidence } from "@/lib/research-data";
import { ResearchDrawer } from "./ResearchDrawer.client";
import { researchEngineLabel } from "./types";

type Question = ResearchQuestionEvidence["questions"][number];

const intentLabels: Record<string, string> = {
  adviser_selection_national_discovery: "Choosing an adviser",
  retirement_pensions: "Retirement and pensions",
  inheritance_later_life_care: "Inheritance and later life",
  divorce_business_sale_liquidity: "Life events and liquidity",
  geographic_discovery: "Local adviser discovery"
};

function summarise(
  items: Array<{ name?: string; domain?: string; answers: number }>,
  labelKey: "name" | "domain",
  empty: string,
  limit = 5
) {
  const labels = items
    .map((item) => item[labelKey])
    .filter((label): label is string => Boolean(label));
  if (!labels.length) return empty;
  const visible = labels.slice(0, limit).join(", ");
  return labels.length > limit ? `${visible} + ${labels.length - limit} more` : visible;
}

function QuestionDrawerContent({ question }: { question: Question }) {
  return (
    <>
      {!question.includedInPrimary ? (
        <p className="research-drawer-lead">
          Excluded from the primary findings because the wording omitted the UK and produced
          international results.
        </p>
      ) : null}

      <div className="research-question-evidence__engines research-question-evidence__engines--summary">
        {question.engines.map((engine) => (
          <section key={engine.engine} className="research-question-evidence__engine">
            <header>
              <h3>{researchEngineLabel(engine.engine)}</h3>
            </header>

            <dl className="research-question-evidence__summary-list">
              <div>
                <dt>Firms named</dt>
                <dd>{summarise(engine.namedPanelFirms, "name", "None from the 150-firm panel", 4)}</dd>
              </div>
              <div>
                <dt>Panel websites cited</dt>
                <dd>{summarise(engine.citedPanelFirms, "name", "None", 4)}</dd>
              </div>
              <div>
                <dt>Principal sources</dt>
                <dd>{summarise(engine.sources, "domain", "No recoverable source", 5)}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}

export function QuestionEvidenceExplorer({ questions }: { questions: Question[] }) {
  const [search, setSearch] = useState("");
  const indexedQuestions = useMemo(
    () => questions.map((question, index) => ({ question, number: index + 1 })),
    [questions]
  );
  const filteredQuestions = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("en-GB");
    if (!query) return indexedQuestions;
    return indexedQuestions.filter(({ question }) =>
      [
        question.id,
        question.text,
        question.locale,
        intentLabels[question.intentGroup] ?? question.intentGroup
      ].some((value) => value.toLocaleLowerCase("en-GB").includes(query))
    );
  }, [indexedQuestions, search]);

  return (
    <div className="research-question-evidence__explorer">
      <label className="research-question-evidence__search">
        <span>Find a question</span>
        <span className="research-question-evidence__search-field">
          <Search aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search the 25 buyer questions"
          />
        </span>
      </label>

      <p className="research-question-evidence__status" role="status" aria-live="polite">
        Showing {filteredQuestions.length} of {questions.length} questions
      </p>

      {filteredQuestions.length ? (
        <ol className="research-question-evidence__list">
          {filteredQuestions.map(({ question, number }) => {
            const namedFirms = new Set(
              question.engines.flatMap((engine) =>
                engine.namedPanelFirms.map((firm) => firm.name)
              )
            ).size;
            const sourceDomains = new Set(
              question.engines.flatMap((engine) => engine.sources.map((source) => source.domain))
            ).size;

            return (
              <li
                key={question.id}
                className={
                  question.includedInPrimary
                    ? undefined
                    : "research-question-evidence__item--excluded"
                }
              >
                <span className="research-question-evidence__number">
                  {String(number).padStart(2, "0")}
                </span>
                <ResearchDrawer
                  className="research-drawer-panel--question"
                  eyebrow={`${question.id} · ${intentLabels[question.intentGroup] ?? question.intentGroup}`}
                  title={question.text}
                  triggerClassName="research-question-evidence__trigger"
                  trigger={
                    <>
                      <span>
                        {!question.includedInPrimary ? (
                          <span className="research-question-evidence__excluded-label">
                            Excluded test question · Not used in findings or rankings
                          </span>
                        ) : null}
                        <strong>{question.text}</strong>
                        <small>
                          {intentLabels[question.intentGroup] ?? question.intentGroup} · {namedFirms}{" "}
                          {namedFirms === 1 ? "panel firm" : "panel firms"} named · {sourceDomains}{" "}
                          source domains
                        </small>
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </>
                  }
                >
                  <QuestionDrawerContent question={question} />
                </ResearchDrawer>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="research-question-evidence__no-results">
          <strong>No questions match that search.</strong>
          <button type="button" onClick={() => setSearch("")}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
