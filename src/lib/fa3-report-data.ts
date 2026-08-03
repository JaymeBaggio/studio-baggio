import { readFile } from "node:fs/promises";
import path from "node:path";

export type PanelStatus = "panel" | "outside_panel" | "not_applicable";

export type ReportEntity = {
  entity_id: string;
  canonical_name: string;
  entity_type: string;
  panel_status: PanelStatus;
  score?: number;
  candidate_answers?: number;
  candidate_presence_rate?: number;
  normalized_share_of_shortlist?: number;
  selection_claim_supported_answers?: number;
  repeat_confirmed_any_engine?: boolean;
  repeatability?: Record<
    string,
    { positive_runs: number; repeat_confirmed: boolean }
  >;
  family_scores?: Record<string, number>;
  national_families_reached?: number;
  repeat_confirmed_question_engine_cells?: number;
  one_off_question_engine_cells?: number;
  display_tier?: string;
};

export type QuestionView = {
  query_id: string;
  query_text: string;
  family: string;
  valid_answer_count: number;
  answers_with_candidates: number;
  median_candidate_count: number;
  unique_candidate_count: number;
  shortlist: ReportEntity[];
};

export type FamilyView = {
  family: string;
  query_ids: string[];
  entities: ReportEntity[];
};

export type HeadlineFindings = {
  national_answers_with_candidates: number;
  national_answer_count: number;
  local_answers_with_candidates: number;
  local_answer_count: number;
  provider_answers_with_candidates: Record<string, number>;
  family_answers_with_candidates: Record<string, number>;
  answers_per_national_family: number;
  national_unique_candidate_entities: number;
  national_panel_candidate_entities: number;
  national_outside_panel_candidate_entities: number;
  local_unique_candidate_entities: number;
  questions_without_candidate_shared_by_all_three_providers: number;
  candidate_occurrence_count: number;
  candidate_occurrences_with_own_domain_citation: number;
  candidate_occurrences_with_selection_claim_support: number;
  invalid_candidate_identity_occurrence_count: number;
  entities_reaching_all_four_national_families: string[];
  selection_tier_counts: Record<string, number>;
};

export type Fa3ReportView = {
  version: string;
  corpus_version: string;
  denominators: {
    questions: number;
    providers: number;
    repetitions: number;
    answers: number;
    national_questions: number;
    local_questions: number;
  };
  input_hashes: Record<string, string>;
  outputs_sha256: string;
  headline_findings: HeadlineFindings;
  questions: QuestionView[];
  nationalFamilies: FamilyView[];
  local: FamilyView;
  breadth: ReportEntity[];
  opportunityAdjusted: Array<
    ReportEntity & {
      verified_eligible_question_count: number;
      opportunity_adjusted_selection: number | null;
    }
  >;
  conceptCounts: Record<string, number>;
  limitations: string[];
};

type RawReport = {
  version: string;
  corpus_version: string;
  denominators: Fa3ReportView["denominators"];
  input_hashes: Record<string, string>;
  outputs_sha256: string;
  headline_findings: HeadlineFindings;
  question_views: QuestionView[];
  national_family_views: FamilyView[];
  local_view: FamilyView;
  cross_scenario_selection_breadth: { entities: ReportEntity[] };
  constructed_panel_opportunity_adjusted: Fa3ReportView["opportunityAdjusted"];
  concept_counts: Record<string, number>;
  limitations: string[];
};

const reportPath = path.join(
  process.cwd(),
  "data",
  "research",
  "uk-financial-advice-2026",
  "fa03_report_data.json"
);

export async function loadFa3ReportView(): Promise<Fa3ReportView> {
  const raw = JSON.parse(await readFile(reportPath, "utf8")) as RawReport;
  if (
    raw.corpus_version !== "fa-queries-0.3" ||
    raw.denominators.answers !== 225 ||
    raw.question_views.length !== 25
  ) {
    throw new Error("The corrected firm-selection evidence package failed validation.");
  }

  return {
    version: raw.version,
    corpus_version: raw.corpus_version,
    denominators: raw.denominators,
    input_hashes: raw.input_hashes,
    outputs_sha256: raw.outputs_sha256,
    headline_findings: raw.headline_findings,
    questions: raw.question_views.map((question) => ({
      query_id: question.query_id,
      query_text: question.query_text,
      family: question.family,
      valid_answer_count: question.valid_answer_count,
      answers_with_candidates: question.answers_with_candidates,
      median_candidate_count: question.median_candidate_count,
      unique_candidate_count: question.unique_candidate_count,
      shortlist: question.shortlist
    })),
    nationalFamilies: raw.national_family_views,
    local: raw.local_view,
    breadth: raw.cross_scenario_selection_breadth.entities,
    opportunityAdjusted: raw.constructed_panel_opportunity_adjusted,
    conceptCounts: raw.concept_counts,
    limitations: raw.limitations
  };
}
