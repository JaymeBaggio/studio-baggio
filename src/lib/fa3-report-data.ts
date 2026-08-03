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
  local_score?: number;
};

export type QuestionCandidate = {
  entity_id: string;
  canonical_name: string;
  panel_status: PanelStatus;
  shortlist_position: number;
  frozen_eligibility: string;
  selection_claim_supported: boolean;
  own_domain_cited: boolean;
};

export type QuestionAnswer = {
  observation_id: string;
  provider: string;
  repetition: number;
  candidate_count: number;
  candidates: QuestionCandidate[];
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
  answers: QuestionAnswer[];
};

export type StudyQuestion = {
  query_id: string;
  query_text: string;
  stage: "guidance" | "discoverability" | "selection";
  evidence: StudyQuestionEvidence;
};

export type QuestionEvidenceProvider = {
  provider: string;
  answer_count: number;
  repetitions: number[];
  named_answers?: number;
  cited_answers?: number;
  supported_answers?: number;
};

export type StudyQuestionFirm = {
  name: string;
  recommended_answers: number;
  named_answers: number;
  cited_answers: number;
  supported_answers: number;
  providers: QuestionEvidenceProvider[];
};

export type StudyQuestionSource = {
  domain: string;
  answer_count: number;
  providers: QuestionEvidenceProvider[];
  urls: string[];
};

export type StudyQuestionEvidence = {
  kind: "panel_observation" | "verified_selection";
  valid_answer_count: number;
  firms: StudyQuestionFirm[];
  sources: StudyQuestionSource[];
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
  studyQuestions: StudyQuestion[];
  nationalFamilies: FamilyView[];
  local: FamilyView;
  breadth: ReportEntity[];
  searchEntities: ReportEntity[];
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

const panelRegistryPath = path.join(
  process.cwd(),
  "data",
  "research",
  "uk-financial-advice-2026",
  "firm_summary.json"
);

const legacyQuestionEvidencePath = path.join(
  process.cwd(),
  "data",
  "research",
  "uk-financial-advice-2026",
  "question_evidence.json"
);

const correctedQuestionSourcesPath = path.join(
  process.cwd(),
  "data",
  "research",
  "uk-financial-advice-2026",
  "fa03_question_sources.json"
);

type PanelRegistryRow = {
  firm_id: string;
  display_name: string;
};

type LegacyQuestionEvidence = {
  questions: Array<{
    id: string;
    text: string;
    engines: Array<{
      engine: string;
      validAnswers: number;
      namedPanelFirms: Array<{ name: string; answers: number }>;
      citedPanelFirms: Array<{ name: string; answers: number }>;
      sources: Array<{ domain: string; answers: number }>;
    }>;
  }>;
};

type CorrectedQuestionSources = {
  version: number;
  corpus_version: string;
  outputs_sha256: string;
  questions: Array<{
    query_id: string;
    sources: StudyQuestionSource[];
  }>;
};

const discoverabilityQuestionIds = new Set([
  "FA-SN-04",
  "FA-SN-05",
  "FA-RP-05",
  "FA-LC-04",
  "FA-LC-05",
  "FA-LE-02",
  "FA-LE-04",
  "FA-GD-01",
  "FA-GD-02",
  "FA-GD-03",
  "FA-GD-04",
  "FA-GD-05"
]);

const evidenceProviderOrder = ["openai", "gemini", "perplexity"];

function buildLegacyQuestionEvidence(
  question: LegacyQuestionEvidence["questions"][number]
): StudyQuestionEvidence {
  const firms = new Map<string, StudyQuestionFirm>();
  const sources = new Map<string, StudyQuestionSource>();

  for (const engine of question.engines) {
    for (const firm of engine.namedPanelFirms) {
      const entry = firms.get(firm.name) ?? emptyFirmEvidence(firm.name);
      entry.named_answers += firm.answers;
      const provider = getFirmProvider(entry, engine.engine);
      provider.answer_count += firm.answers;
      provider.named_answers = (provider.named_answers ?? 0) + firm.answers;
      firms.set(firm.name, entry);
    }

    for (const firm of engine.citedPanelFirms) {
      const entry = firms.get(firm.name) ?? emptyFirmEvidence(firm.name);
      entry.cited_answers += firm.answers;
      const provider = getFirmProvider(entry, engine.engine);
      provider.cited_answers = (provider.cited_answers ?? 0) + firm.answers;
      firms.set(firm.name, entry);
    }

    for (const source of engine.sources) {
      const entry = sources.get(source.domain) ?? {
        domain: source.domain,
        answer_count: 0,
        providers: [],
        urls: []
      };
      entry.answer_count += source.answers;
      entry.providers.push({
        provider: engine.engine,
        answer_count: source.answers,
        repetitions: []
      });
      sources.set(source.domain, entry);
    }
  }

  return {
    kind: "panel_observation",
    valid_answer_count: question.engines.reduce(
      (total, engine) => total + engine.validAnswers,
      0
    ),
    firms: [...firms.values()].sort(
      (left, right) =>
        right.named_answers - left.named_answers ||
        right.cited_answers - left.cited_answers ||
        left.name.localeCompare(right.name, "en-GB")
    ),
    sources: [...sources.values()].sort(
      (left, right) =>
        right.answer_count - left.answer_count ||
        left.domain.localeCompare(right.domain, "en-GB")
    )
  };
}

function buildSelectionQuestionEvidence(
  question: QuestionView,
  sources: StudyQuestionSource[]
): StudyQuestionEvidence {
  const firms = question.shortlist.map((candidate) => {
    const providers: QuestionEvidenceProvider[] = [];
    for (const providerName of evidenceProviderOrder) {
      const candidateAnswers = question.answers.filter(
        (answer) =>
          answer.provider === providerName &&
          answer.candidates.some((entry) => entry.entity_id === candidate.entity_id)
      );
      if (!candidateAnswers.length) continue;
      providers.push({
        provider: providerName,
        answer_count: candidateAnswers.length,
        repetitions: candidateAnswers.map((answer) => answer.repetition),
        cited_answers: candidateAnswers.filter((answer) =>
          answer.candidates.some(
            (entry) => entry.entity_id === candidate.entity_id && entry.own_domain_cited
          )
        ).length,
        supported_answers: candidateAnswers.filter((answer) =>
          answer.candidates.some(
            (entry) =>
              entry.entity_id === candidate.entity_id && entry.selection_claim_supported
          )
        ).length
      });
    }

    return {
      name: candidate.canonical_name,
      recommended_answers: candidate.candidate_answers ?? 0,
      named_answers: 0,
      cited_answers: providers.reduce(
        (total, provider) => total + (provider.cited_answers ?? 0),
        0
      ),
      supported_answers: providers.reduce(
        (total, provider) => total + (provider.supported_answers ?? 0),
        0
      ),
      providers
    };
  });

  return {
    kind: "verified_selection",
    valid_answer_count: question.valid_answer_count,
    firms,
    sources
  };
}

function emptyFirmEvidence(name: string): StudyQuestionFirm {
  return {
    name,
    recommended_answers: 0,
    named_answers: 0,
    cited_answers: 0,
    supported_answers: 0,
    providers: []
  };
}

function getFirmProvider(firm: StudyQuestionFirm, providerName: string) {
  const existing = firm.providers.find((provider) => provider.provider === providerName);
  if (existing) return existing;
  const provider: QuestionEvidenceProvider = {
    provider: providerName,
    answer_count: 0,
    repetitions: [],
    named_answers: 0,
    cited_answers: 0
  };
  firm.providers.push(provider);
  firm.providers.sort(
    (left, right) =>
      evidenceProviderOrder.indexOf(left.provider) -
      evidenceProviderOrder.indexOf(right.provider)
  );
  return provider;
}

export async function loadFa3ReportView(): Promise<Fa3ReportView> {
  const [
    reportText,
    panelRegistryText,
    legacyQuestionEvidenceText,
    correctedQuestionSourcesText
  ] = await Promise.all([
    readFile(reportPath, "utf8"),
    readFile(panelRegistryPath, "utf8"),
    readFile(legacyQuestionEvidencePath, "utf8"),
    readFile(correctedQuestionSourcesPath, "utf8")
  ]);
  const raw = JSON.parse(reportText) as RawReport;
  const panelRegistry = JSON.parse(panelRegistryText) as PanelRegistryRow[];
  const legacyQuestionEvidence = JSON.parse(legacyQuestionEvidenceText) as LegacyQuestionEvidence;
  const correctedQuestionSources = JSON.parse(
    correctedQuestionSourcesText
  ) as CorrectedQuestionSources;
  if (
    raw.corpus_version !== "fa-queries-0.3" ||
    raw.denominators.answers !== 225 ||
    raw.question_views.length !== 25 ||
    legacyQuestionEvidence.questions.length !== 25 ||
    correctedQuestionSources.version !== 1 ||
    correctedQuestionSources.corpus_version !== raw.corpus_version ||
    correctedQuestionSources.outputs_sha256 !== raw.outputs_sha256 ||
    correctedQuestionSources.questions.length !== 25 ||
    panelRegistry.length !== 150
  ) {
    throw new Error("The corrected firm-selection evidence package failed validation.");
  }

  const localById = new Map(
    raw.local_view.entities.map((entity) => [entity.entity_id, entity] as const)
  );
  const breadth = raw.cross_scenario_selection_breadth.entities.map((entity) => ({
    ...entity,
    local_score: localById.get(entity.entity_id)?.score ?? 0
  }));
  const searchEntityMap = new Map(breadth.map((entity) => [entity.entity_id, entity] as const));

  for (const entity of raw.local_view.entities) {
    const existing = searchEntityMap.get(entity.entity_id);
    if (existing) continue;
    searchEntityMap.set(entity.entity_id, {
      ...entity,
      score: 0,
      family_scores: {},
      national_families_reached: 0,
      display_tier: "local_only_selection",
      local_score: entity.score ?? 0
    });
  }

  for (const firm of panelRegistry) {
    const entityId = `panel:${firm.firm_id}`;
    if (searchEntityMap.has(entityId)) continue;
    searchEntityMap.set(entityId, {
      entity_id: entityId,
      canonical_name: firm.display_name,
      entity_type: "firm",
      panel_status: "panel",
      score: 0,
      family_scores: {},
      national_families_reached: 0,
      display_tier: "not_selected",
      local_score: 0
    });
  }

  const searchEntities = [...searchEntityMap.values()].sort((left, right) => {
    const leftSelected = left.display_tier === "not_selected" ? 0 : 1;
    const rightSelected = right.display_tier === "not_selected" ? 0 : 1;
    return (
      rightSelected - leftSelected ||
      (right.score ?? 0) - (left.score ?? 0) ||
      (right.local_score ?? 0) - (left.local_score ?? 0) ||
      left.canonical_name.localeCompare(right.canonical_name, "en-GB")
    );
  });

  const correctedSourcesByQuestion = new Map(
    correctedQuestionSources.questions.map((question) => [question.query_id, question.sources] as const)
  );

  const studyQuestions: StudyQuestion[] = [
    ...legacyQuestionEvidence.questions.map((question) => ({
      query_id: question.id,
      query_text: question.text,
      stage: discoverabilityQuestionIds.has(question.id)
        ? "discoverability" as const
        : "guidance" as const,
      evidence: buildLegacyQuestionEvidence(question)
    })),
    ...raw.question_views.map((question) => ({
      query_id: question.query_id,
      query_text: question.query_text,
      stage: "selection" as const,
      evidence: buildSelectionQuestionEvidence(
        question,
        correctedSourcesByQuestion.get(question.query_id) ?? []
      )
    }))
  ];

  if (
    studyQuestions.filter((question) => question.stage === "guidance").length !== 13 ||
    studyQuestions.filter((question) => question.stage === "discoverability").length !== 12 ||
    studyQuestions.filter((question) => question.stage === "selection").length !== 25
  ) {
    throw new Error("The 50-question study index failed validation.");
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
      shortlist: question.shortlist,
      answers: question.answers ?? []
    })),
    studyQuestions,
    nationalFamilies: raw.national_family_views,
    local: raw.local_view,
    breadth,
    searchEntities,
    opportunityAdjusted: raw.constructed_panel_opportunity_adjusted,
    conceptCounts: raw.concept_counts,
    limitations: raw.limitations
  };
}
