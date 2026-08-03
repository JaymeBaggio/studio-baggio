"use client";

import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { ResearchDrawer } from "./ResearchDrawer.client";
import { researchEngineLabel } from "./types";

export type ScoringFraction = {
  numerator: number;
  denominator: number;
  value: number;
};

export type CandidateRepeatability = {
  provider: string;
  candidate_repeatability: {
    k: number;
    n: number;
  };
  repeat_confirmed: boolean;
  one_off: boolean;
  candidate_rate: ScoringFraction;
  normalized_shortlist_mass: ScoringFraction;
};

export type QuestionShortlistCandidate = {
  entity_id: string;
  display_name: string;
  entity_type:
    | "firm"
    | "individual_adviser"
    | "directory"
    | "regulator"
    | "authority"
    | "other";
  panel_status: "panel" | "outside_panel" | "not_applicable";
  candidate_presence: ScoringFraction;
  normalized_share_of_shortlist: ScoringFraction;
  mention_presence: ScoringFraction;
  own_domain_citation_presence: ScoringFraction;
  selection_claim_support_presence: ScoringFraction;
  provider_repeatability: CandidateRepeatability[];
  repeat_confirmed_engines: number;
  one_off_engines: number;
};

export type NationalQuestionShortlist = {
  query_id: string;
  query_text: string;
  family: string;
  score_scope: string;
  answer_denominator: number;
  candidate_shortlist: QuestionShortlistCandidate[];
  constructed_panel_candidate_shortlist: QuestionShortlistCandidate[];
  outside_panel_candidate_shortlist: QuestionShortlistCandidate[];
  repeat_confirmed_candidate_entity_ids: string[];
  one_off_only_candidate_entity_ids: string[];
};

export type QuestionShortlists = {
  pipeline_version: string;
  national_questions: NationalQuestionShortlist[];
  local_questions_are_separate: boolean;
};

type CandidateScope = "all" | "panel" | "outside_panel";
type CandidateSort = "shortlist_mass" | "candidate_presence" | "name";

const percentage = new Intl.NumberFormat("en-GB", {
  style: "percent",
  maximumFractionDigits: 1
});

const alphabetical = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base"
});

function formatFraction(metric: ScoringFraction) {
  return `${metric.numerator}/${metric.denominator}`;
}

function formatPercentage(metric: ScoringFraction) {
  return percentage.format(metric.value);
}

function panelLabel(status: QuestionShortlistCandidate["panel_status"]) {
  if (status === "panel") return "Constructed panel";
  if (status === "outside_panel") return "Outside panel";
  return "Panel status not applicable";
}

function repeatabilityLabel(row: CandidateRepeatability) {
  if (row.repeat_confirmed) return "Repeat-confirmed";
  if (row.one_off) return "One-off";
  return "Not selected";
}

function CandidateEvidence({ candidate }: { candidate: QuestionShortlistCandidate }) {
  return (
    <div className="space-y-8">
      <p className="border-l-2 border-blue-600 pl-4 text-sm leading-6 text-neutral-700">
        This entity passed semantic review as a candidate for this question. The measures below
        describe different evidence concepts and should not be combined.
      </p>

      <dl className="grid gap-px overflow-hidden border border-neutral-300 bg-neutral-300 sm:grid-cols-2">
        <div className="bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Candidate presence
          </dt>
          <dd className="mt-2 text-2xl font-semibold text-black">
            {formatPercentage(candidate.candidate_presence)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">
            {formatFraction(candidate.candidate_presence)} equal-engine question score
          </dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Normalized shortlist mass
          </dt>
          <dd className="mt-2 text-2xl font-semibold text-black">
            {formatPercentage(candidate.normalized_share_of_shortlist)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">
            {formatFraction(candidate.normalized_share_of_shortlist)} after dividing each answer
            across its verified candidates
          </dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Adviser mention presence
          </dt>
          <dd className="mt-2 text-lg font-semibold text-black">
            {formatPercentage(candidate.mention_presence)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">May include mentions that were not selections.</dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Selection-claim support
          </dt>
          <dd className="mt-2 text-lg font-semibold text-black">
            {formatPercentage(candidate.selection_claim_support_presence)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">Recoverable support for the selecting sentence or list item.</dd>
        </div>
        <div className="bg-white p-4 sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
            Own-domain citation presence
          </dt>
          <dd className="mt-2 text-lg font-semibold text-black">
            {formatPercentage(candidate.own_domain_citation_presence)}
          </dd>
          <dd className="mt-1 text-xs text-neutral-500">A citation does not itself prove candidate selection.</dd>
        </div>
      </dl>

      <div>
        <h3 className="text-sm font-semibold text-black">Provider repeatability</h3>
        <div
          className="mt-3 overflow-x-auto border border-neutral-300"
          role="region"
          aria-label={`Provider repeatability for ${candidate.display_name}`}
          tabIndex={0}
        >
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead className="bg-neutral-100 text-xs uppercase tracking-[0.1em] text-neutral-600">
              <tr>
                <th className="px-4 py-3 font-semibold" scope="col">Provider</th>
                <th className="px-4 py-3 font-semibold" scope="col">Candidate repetitions</th>
                <th className="px-4 py-3 font-semibold" scope="col">Status</th>
                <th className="px-4 py-3 font-semibold" scope="col">Provider shortlist mass</th>
              </tr>
            </thead>
            <tbody>
              {candidate.provider_repeatability.map((row) => (
                <tr key={row.provider} className="border-t border-neutral-300">
                  <th className="px-4 py-3 font-semibold text-black" scope="row">
                    {researchEngineLabel(row.provider)}
                  </th>
                  <td className="px-4 py-3 tabular-nums text-neutral-700">
                    {row.candidate_repeatability.k}/{row.candidate_repeatability.n}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{repeatabilityLabel(row)}</td>
                  <td className="px-4 py-3 tabular-nums text-neutral-700">
                    {formatPercentage(row.normalized_shortlist_mass)}
                    <span className="ml-2 text-xs text-neutral-500">
                      ({formatFraction(row.normalized_shortlist_mass)})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-neutral-300 pt-5 text-sm leading-6 text-neutral-600">
        <p><strong className="text-black">Panel context:</strong> {panelLabel(candidate.panel_status)}.</p>
        <p className="mt-2">
          <strong className="text-black">Eligibility context:</strong> eligibility is not applied in
          this open-universe question view. Opportunity-adjusted eligibility is a separate analysis.
        </p>
      </div>
    </div>
  );
}

export function FirmSelectionQuestionExplorer({
  questionShortlists
}: {
  questionShortlists: QuestionShortlists;
}) {
  const titleId = useId();
  const [selectedQueryId, setSelectedQueryId] = useState(
    questionShortlists.national_questions[0]?.query_id ?? ""
  );
  const [scope, setScope] = useState<CandidateScope>("all");
  const [sort, setSort] = useState<CandidateSort>("shortlist_mass");
  const [search, setSearch] = useState("");

  const selectedQuestion =
    questionShortlists.national_questions.find(
      (question) => question.query_id === selectedQueryId
    ) ?? questionShortlists.national_questions[0];

  const scopedCandidates = useMemo(() => {
    if (!selectedQuestion) return [];
    if (scope === "panel") return selectedQuestion.constructed_panel_candidate_shortlist;
    if (scope === "outside_panel") return selectedQuestion.outside_panel_candidate_shortlist;
    return selectedQuestion.candidate_shortlist;
  }, [scope, selectedQuestion]);

  const visibleCandidates = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("en-GB");
    const rows = scopedCandidates.filter((candidate) =>
      [candidate.display_name, candidate.entity_id]
        .some((value) => value.toLocaleLowerCase("en-GB").includes(normalizedSearch))
    );

    return rows.sort((left, right) => {
      if (sort === "name") return alphabetical.compare(left.display_name, right.display_name);
      if (sort === "candidate_presence") {
        return (
          right.candidate_presence.value - left.candidate_presence.value ||
          alphabetical.compare(left.display_name, right.display_name)
        );
      }
      return (
        right.normalized_share_of_shortlist.value - left.normalized_share_of_shortlist.value ||
        right.candidate_presence.value - left.candidate_presence.value ||
        alphabetical.compare(left.display_name, right.display_name)
      );
    });
  }, [scopedCandidates, search, sort]);

  return (
    <section className="border-y border-neutral-300 bg-white py-12 text-black" aria-labelledby={titleId}>
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-5 border-b border-neutral-300 pb-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            National question view
          </p>
          <div>
            <h2 id={titleId} className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Firm selection by question
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
              Explore semantically verified candidates without collapsing selection, shortlist mass,
              repeatability, panel status or eligibility into one measure.
            </p>
          </div>
        </div>

        {selectedQuestion ? (
          <>
            <div className="grid gap-4 border-b border-neutral-300 py-6 md:grid-cols-2 xl:grid-cols-4" aria-label="Question shortlist controls">
              <label className="grid gap-2 text-sm font-semibold text-neutral-700 md:col-span-2">
                Buyer question
                <select
                  className="min-h-11 w-full rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={selectedQuestion.query_id}
                  onChange={(event) => setSelectedQueryId(event.target.value)}
                >
                  {questionShortlists.national_questions.map((question) => (
                    <option key={question.query_id} value={question.query_id}>
                      {question.query_id} — {question.query_text}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Candidate cohort
                <select
                  className="min-h-11 rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={scope}
                  onChange={(event) => setScope(event.target.value as CandidateScope)}
                >
                  <option value="all">Open universe</option>
                  <option value="panel">Constructed panel</option>
                  <option value="outside_panel">Outside panel</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700">
                Sort candidates
                <select
                  className="min-h-11 rounded-none border border-neutral-400 bg-white px-3 py-2 text-sm font-normal text-black focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as CandidateSort)}
                >
                  <option value="shortlist_mass">Normalized shortlist mass</option>
                  <option value="candidate_presence">Candidate presence</option>
                  <option value="name">Name</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-neutral-700 md:col-span-2 xl:col-span-4">
                Find a candidate
                <span className="relative block">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
                  <input
                    className="min-h-11 w-full rounded-none border border-neutral-400 bg-white py-2 pl-10 pr-3 text-sm font-normal text-black placeholder:text-neutral-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name or entity ID"
                  />
                </span>
              </label>
            </div>

            <div className="grid gap-5 py-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  {selectedQuestion.query_id} · {selectedQuestion.family}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-7 tracking-[-0.02em]">
                  {selectedQuestion.query_text}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {selectedQuestion.score_scope} scope · {selectedQuestion.answer_denominator} answers
                </p>
              </div>
              <aside className="border-l-2 border-neutral-300 pl-4 text-sm leading-6 text-neutral-600" aria-label="Eligibility context">
                <strong className="block text-black">Eligibility remains separate</strong>
                This open-universe shortlist does not treat eligibility as a score or denominator.
              </aside>
            </div>

            <p className="mb-3 text-sm text-neutral-600" role="status" aria-live="polite">
              Showing {visibleCandidates.length} of {scopedCandidates.length} candidates in this cohort.
            </p>

            <div className="overflow-x-auto border border-neutral-300" role="region" aria-label={`Candidate shortlist for ${selectedQuestion.query_id}`} tabIndex={0}>
              <table className="w-full min-w-[52rem] border-collapse text-left">
                <caption className="sr-only">
                  Semantically verified candidates for {selectedQuestion.query_text}, with candidate
                  presence, normalized shortlist mass and provider repeatability shown separately.
                </caption>
                <thead className="bg-neutral-100 text-xs uppercase tracking-[0.1em] text-neutral-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">Verified candidate</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Candidate presence</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Normalized shortlist mass</th>
                    <th className="px-4 py-3 font-semibold" scope="col">Repeatability</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCandidates.length ? visibleCandidates.map((candidate) => (
                    <tr key={candidate.entity_id} className="border-t border-neutral-300 align-top">
                      <th className="px-4 py-4" scope="row">
                        <ResearchDrawer
                          eyebrow={`${selectedQuestion.query_id} · Semantically verified candidate`}
                          title={candidate.display_name}
                          triggerClassName="text-left font-semibold text-black underline decoration-neutral-400 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                          trigger={candidate.display_name}
                        >
                          <CandidateEvidence candidate={candidate} />
                        </ResearchDrawer>
                        <span className="mt-2 block text-xs font-normal text-neutral-500">
                          {panelLabel(candidate.panel_status)} · {candidate.entity_type.replaceAll("_", " ")}
                        </span>
                      </th>
                      <td className="px-4 py-4 tabular-nums">
                        <strong className="block text-lg">{formatPercentage(candidate.candidate_presence)}</strong>
                        <span className="text-xs text-neutral-500">{formatFraction(candidate.candidate_presence)}</span>
                      </td>
                      <td className="px-4 py-4 tabular-nums">
                        <strong className="block text-lg">{formatPercentage(candidate.normalized_share_of_shortlist)}</strong>
                        <span className="text-xs text-neutral-500">{formatFraction(candidate.normalized_share_of_shortlist)}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-700">
                        <strong className="block font-semibold text-black">
                          {candidate.repeat_confirmed_engines} repeat-confirmed
                        </strong>
                        <span>{candidate.one_off_engines} one-off engines</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="px-4 py-8 text-center text-sm text-neutral-600" colSpan={4}>
                        No candidates match the current search and cohort.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {questionShortlists.local_questions_are_separate ? (
              <p className="mt-4 text-xs leading-5 text-neutral-500">
                Local questions are held in a separate view and do not enter this national shortlist.
                Pipeline {questionShortlists.pipeline_version}.
              </p>
            ) : null}
          </>
        ) : (
          <p className="py-10 text-sm text-neutral-600">No national question shortlists are available.</p>
        )}
      </div>
    </section>
  );
}
