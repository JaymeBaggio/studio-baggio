import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const RESEARCH_V4_PIPELINE_VERSION = "fa4-semantic-scoring-1.1" as const;
export const RESEARCH_V4_CORPUS_VERSION = "fa-queries-0.4" as const;
export const RESEARCH_V4_ELIGIBILITY_VERSION = "fa-eligibility-0.4-frozen" as const;
export const RESEARCH_V4_FORMAL_OBSERVATION_COUNT = 225 as const;
export const RESEARCH_V4_PANEL_SIZE = 150 as const;
export const RESEARCH_V4_QUESTION_COUNT = 25 as const;
export const RESEARCH_V4_NATIONAL_QUESTION_COUNT = 20 as const;
export const RESEARCH_V4_LOCAL_QUESTION_COUNT = 5 as const;

export const RESEARCH_V4_PROVIDERS = ["openai", "gemini", "perplexity"] as const;
export const RESEARCH_V4_NATIONAL_FAMILIES = [
  "core",
  "wealth",
  "pensions",
  "life_events"
] as const;

export const RESEARCH_V4_ARTIFACT_FILENAMES = [
  "cross_scenario_breadth.json",
  "local_view.json",
  "national_family_views.json",
  "observation_entity_metrics.json",
  "open_universe_vs_panel.json",
  "opportunity_adjusted_panel.json",
  "question_shortlists.json",
  "selection_tiers.json",
  "semantic_concept_views.json",
  "semantic_exceptions.json",
  "sensitivity.json"
] as const;

export const RESEARCH_V4_PRIVATE_ARTIFACT_FILENAMES = [
  "observation_entity_metrics.json",
  "semantic_exceptions.json"
] as const;

export const RESEARCH_V4_PUBLIC_ARTIFACT_FILENAMES = RESEARCH_V4_ARTIFACT_FILENAMES.filter(
  (filename) => !RESEARCH_V4_PRIVATE_ARTIFACT_FILENAMES.includes(
    filename as (typeof RESEARCH_V4_PRIVATE_ARTIFACT_FILENAMES)[number]
  )
);

const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);
const providerSchema = z.enum(RESEARCH_V4_PROVIDERS);
const nationalFamilySchema = z.enum(RESEARCH_V4_NATIONAL_FAMILIES);
const familySchema = z.enum([...RESEARCH_V4_NATIONAL_FAMILIES, "local"]);
const scoreScopeSchema = z.enum(["national", "local_only"]);
const repetitionSchema = z.number().int().min(1).max(3);
const binarySchema = z.union([z.literal(0), z.literal(1)]);

const fractionSchema = z
  .object({
    numerator: z.number().int().nonnegative(),
    denominator: z.number().int().positive(),
    value: z.number().finite().min(0).max(1)
  })
  .strict()
  .superRefine((fraction, context) => {
    if (fraction.numerator > fraction.denominator) {
      context.addIssue({
        code: "custom",
        message: "Fraction numerator exceeds denominator"
      });
    }
    const expectedValue = Math.round((fraction.numerator / fraction.denominator) * 1_000_000) / 1_000_000;
    if (Math.abs(fraction.value - expectedValue) > Number.EPSILON) {
      context.addIssue({
        code: "custom",
        message: "Fraction value does not match its exact numerator and denominator"
      });
    }
  });

const entityTypeSchema = z.enum([
  "firm",
  "individual_adviser",
  "directory",
  "regulator",
  "authority",
  "other"
]);
const panelStatusSchema = z.enum(["panel", "outside_panel", "not_applicable"]);
const entitySchema = z
  .object({
    entity_id: z.string().min(1),
    display_name: z.string().min(1),
    entity_type: entityTypeSchema,
    panel_status: panelStatusSchema
  })
  .strict()
  .superRefine((entity, context) => {
    const isAdviceEntity = entity.entity_type === "firm" || entity.entity_type === "individual_adviser";
    if (isAdviceEntity && entity.panel_status === "not_applicable") {
      context.addIssue({ code: "custom", message: "Firm and adviser entities require a panel status" });
    }
    if (!isAdviceEntity && entity.panel_status !== "not_applicable") {
      context.addIssue({ code: "custom", message: "Non-adviser entities cannot enter the panel" });
    }
  });

const candidateEntitySchema = entitySchema.superRefine((entity, context) => {
  if (entity.entity_type !== "firm" && entity.entity_type !== "individual_adviser") {
    context.addIssue({ code: "custom", message: "Only a firm or adviser can be a candidate" });
  }
});

const nationalFamilyScoresSchema = z
  .object({
    core: fractionSchema,
    wealth: fractionSchema,
    pensions: fractionSchema,
    life_events: fractionSchema
  })
  .strict();

const candidateAnswerSchema = candidateEntitySchema
  .safeExtend({
      shortlist_position: z.number().int().positive().nullable(),
      shortlist_mass: fractionSchema,
      fit_qualified_for_adjusted_view: z.boolean(),
      fit_qualified_shortlist_mass: fractionSchema.nullable(),
      constraint_fit: z.array(z.enum(["fit", "does_not_fit", "unknown", "not_applicable"])).min(1),
      uk_status: z.array(z.enum(["verified_uk", "not_uk", "unknown", "not_applicable"])).min(1)
  })
  .superRefine((candidate, context) => {
  if (candidate.fit_qualified_for_adjusted_view !== (candidate.fit_qualified_shortlist_mass !== null)) {
    context.addIssue({
      code: "custom",
      message: "Fit-qualified candidates and adjusted shortlist mass must agree"
    });
  }
  });

const answerMetricRowSchema = z
  .object({
    observation_id: z.string().min(1),
    query_id: z.string().min(1),
    family: familySchema,
    score_scope: scoreScopeSchema,
    provider: providerSchema,
    repetition: repetitionSchema,
    candidate_count: z.number().int().nonnegative(),
    candidates: z.array(candidateAnswerSchema)
  })
  .strict()
  .superRefine((row, context) => {
    if (row.candidate_count !== row.candidates.length) {
      context.addIssue({ code: "custom", message: "Candidate count does not match candidate rows" });
    }
    assertUnique(row.candidates.map((candidate) => candidate.entity_id), context, "Duplicate answer candidate");
    if (row.candidates.length > 0) {
      const shortlistMass = row.candidates.reduce(
        (sum, candidate) => sum + candidate.shortlist_mass.numerator / candidate.shortlist_mass.denominator,
        0
      );
      if (Math.abs(shortlistMass - 1) > 1e-12) {
        context.addIssue({ code: "custom", message: "Non-empty answer shortlist mass must total 1" });
      }
    }
  });

const semanticRoleSchema = z.enum([
  "candidate",
  "comparison_only",
  "incidental",
  "warning_or_negative",
  "directory_regulator_authority"
]);
const occurrenceDecisionSchema = entitySchema
  .safeExtend({
      decision_id: z.string().min(1),
      inventory_id: z.string().min(1),
      observation_id: z.string().min(1),
      query_id: z.string().min(1),
      provider: providerSchema,
      repetition: repetitionSchema,
      semantic_role: semanticRoleSchema,
      candidate_selected: z.boolean(),
      shortlist_position: z.number().int().positive().nullable(),
      prominence: z.enum(["headline", "primary_list", "secondary_list", "body_only", "not_applicable"]),
      constraint_fit: z.enum(["fit", "does_not_fit", "unknown", "not_applicable"]),
      uk_status: z.enum(["verified_uk", "not_uk", "unknown", "not_applicable"]),
      own_domain_cited: z.boolean(),
      selection_claim_supported: z.boolean(),
      selection_claim_source_urls: z.array(z.string().url()),
      authority_source_cited: z.boolean(),
      scoring_entity_id: z.string().min(1)
  })
  .superRefine((row, context) => {
  if (row.candidate_selected !== (row.semantic_role === "candidate")) {
    context.addIssue({ code: "custom", message: "Candidate selection must follow semantic role" });
  }
  if (row.selection_claim_supported && row.selection_claim_source_urls.length === 0) {
    context.addIssue({ code: "custom", message: "Supported selection claims require a source URL" });
  }
  });

const binaryPresenceRowSchema = z
  .object({
    observation_id: z.string().min(1),
    query_id: z.string().min(1),
    family: familySchema,
    score_scope: scoreScopeSchema,
    provider: providerSchema,
    repetition: repetitionSchema,
    entity_id: z.string().min(1),
    candidate_presence: binarySchema,
    adviser_mention_presence: binarySchema,
    own_domain_citation_presence: binarySchema,
    selection_claim_support_presence: binarySchema
  })
  .strict();

const observationEntityMetricsSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    formal_observation_count: z.literal(RESEARCH_V4_FORMAL_OBSERVATION_COUNT),
    rows: z.array(answerMetricRowSchema).length(RESEARCH_V4_FORMAL_OBSERVATION_COUNT),
    occurrence_decisions: z.array(occurrenceDecisionSchema),
    binary_candidate_presence_entity_count: z.number().int().positive(),
    binary_candidate_presence_rows: z.array(binaryPresenceRowSchema)
  })
  .strict();

const providerRepeatabilitySchema = z
  .object({
    provider: providerSchema,
    candidate_repeatability: z
      .object({ k: z.number().int().min(0).max(3), n: z.literal(3) })
      .strict(),
    repeat_confirmed: z.boolean(),
    one_off: z.boolean(),
    candidate_rate: fractionSchema,
    normalized_shortlist_mass: fractionSchema
  })
  .strict()
  .superRefine((row, context) => {
    if (row.repeat_confirmed !== (row.candidate_repeatability.k >= 2)) {
      context.addIssue({ code: "custom", message: "Repeat-confirmed flag does not match k/3" });
    }
    if (row.one_off !== (row.candidate_repeatability.k === 1)) {
      context.addIssue({ code: "custom", message: "One-off flag does not match k/3" });
    }
  });

const shortlistEntitySchema = candidateEntitySchema
  .safeExtend({
      candidate_presence: fractionSchema,
      normalized_share_of_shortlist: fractionSchema,
      mention_presence: fractionSchema,
      own_domain_citation_presence: fractionSchema,
      selection_claim_support_presence: fractionSchema,
      provider_repeatability: z.array(providerRepeatabilitySchema).length(RESEARCH_V4_PROVIDERS.length),
      repeat_confirmed_engines: z.number().int().min(0).max(3),
      one_off_engines: z.number().int().min(0).max(3)
  })
  .superRefine((row, context) => {
  assertExactSet(
    row.provider_repeatability.map((provider) => provider.provider),
    RESEARCH_V4_PROVIDERS,
    context,
    "Provider repeatability"
  );
  const repeatConfirmed = row.provider_repeatability.filter((provider) => provider.repeat_confirmed).length;
  const oneOff = row.provider_repeatability.filter((provider) => provider.one_off).length;
  if (row.repeat_confirmed_engines !== repeatConfirmed || row.one_off_engines !== oneOff) {
    context.addIssue({ code: "custom", message: "Provider repeatability summary is inconsistent" });
  }
  });

const questionViewBaseSchema = z
  .object({
    query_id: z.string().min(1),
    query_text: z.string().min(1),
    family: familySchema,
    score_scope: scoreScopeSchema,
    answer_denominator: z.literal(9),
    candidate_shortlist: z.array(shortlistEntitySchema),
    constructed_panel_candidate_shortlist: z.array(shortlistEntitySchema),
    outside_panel_candidate_shortlist: z.array(shortlistEntitySchema),
    repeat_confirmed_candidate_entity_ids: z.array(z.string().min(1)),
    one_off_only_candidate_entity_ids: z.array(z.string().min(1))
  })
  .strict()
  .superRefine((question, context) => {
    const allIds = question.candidate_shortlist.map((entity) => entity.entity_id);
    assertUnique(allIds, context, "Duplicate question candidate");
    assertExactSet(
      question.constructed_panel_candidate_shortlist.map((entity) => entity.entity_id),
      question.candidate_shortlist.filter((entity) => entity.panel_status === "panel").map((entity) => entity.entity_id),
      context,
      "Constructed-panel shortlist"
    );
    assertExactSet(
      question.outside_panel_candidate_shortlist.map((entity) => entity.entity_id),
      question.candidate_shortlist.filter((entity) => entity.panel_status === "outside_panel").map((entity) => entity.entity_id),
      context,
      "Outside-panel shortlist"
    );
    assertExactSet(
      question.repeat_confirmed_candidate_entity_ids,
      question.candidate_shortlist
        .filter((entity) => entity.repeat_confirmed_engines > 0)
        .map((entity) => entity.entity_id),
      context,
      "Repeat-confirmed candidates"
    );
    assertExactSet(
      question.one_off_only_candidate_entity_ids,
      question.candidate_shortlist
        .filter((entity) => entity.repeat_confirmed_engines === 0 && entity.one_off_engines > 0)
        .map((entity) => entity.entity_id),
      context,
      "One-off-only candidates"
    );
  });

const nationalQuestionViewSchema = questionViewBaseSchema.superRefine((question, context) => {
  if (question.family === "local" || question.score_scope !== "national") {
    context.addIssue({ code: "custom", message: "Local question entered the national shortlist" });
  }
});

const localQuestionViewSchema = questionViewBaseSchema.superRefine((question, context) => {
  if (question.family !== "local" || question.score_scope !== "local_only") {
    context.addIssue({ code: "custom", message: "National question entered the local view" });
  }
});

const questionShortlistsSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    national_questions: z.array(nationalQuestionViewSchema).length(RESEARCH_V4_NATIONAL_QUESTION_COUNT),
    local_questions_are_separate: z.literal(true)
  })
  .strict();

const familyEntitySchema = candidateEntitySchema.safeExtend({
      candidate_presence: fractionSchema,
      normalized_share_of_shortlist: fractionSchema
});

const nationalFamilyViewSchema = z
  .object({
    family: nationalFamilySchema,
    question_count: z.literal(5),
    open_universe_entities: z.array(familyEntitySchema),
    constructed_panel_entities: z.array(familyEntitySchema),
    outside_panel_entities: z.array(familyEntitySchema)
  })
  .strict()
  .superRefine((family, context) => {
    assertExactSet(
      family.constructed_panel_entities.map((entity) => entity.entity_id),
      family.open_universe_entities
        .filter((entity) => entity.panel_status === "panel")
        .map((entity) => entity.entity_id),
      context,
      "Family constructed-panel entities"
    );
    assertExactSet(
      family.outside_panel_entities.map((entity) => entity.entity_id),
      family.open_universe_entities
        .filter((entity) => entity.panel_status === "outside_panel")
        .map((entity) => entity.entity_id),
      context,
      "Family outside-panel entities"
    );
  });

const nationalFamilyViewsSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    family_weights: z
      .object({ core: z.literal(0.25), wealth: z.literal(0.25), pensions: z.literal(0.25), life_events: z.literal(0.25) })
      .strict(),
    families: z.array(nationalFamilyViewSchema).length(RESEARCH_V4_NATIONAL_FAMILIES.length)
  })
  .strict();

const localOpportunityRowSchema = candidateEntitySchema
  .safeExtend({
      eligible_question_count: z.number().int().min(0).max(5),
      known_ineligible_question_count: z.number().int().min(0).max(5),
      unknown_question_count: z.number().int().min(0).max(5),
      eligible_query_ids: z.array(z.string().min(1)),
      unknown_query_ids: z.array(z.string().min(1)),
      opportunity_adjusted_local_selection: fractionSchema.nullable()
  })
  .superRefine((row, context) => {
  if (row.panel_status !== "panel" || row.entity_type !== "firm") {
    context.addIssue({ code: "custom", message: "Local opportunity rows must be panel firms" });
  }
  if (row.eligible_question_count + row.known_ineligible_question_count + row.unknown_question_count !== 5) {
    context.addIssue({ code: "custom", message: "Local eligibility counts must cover five questions" });
  }
  if (row.eligible_query_ids.length !== row.eligible_question_count || row.unknown_query_ids.length !== row.unknown_question_count) {
    context.addIssue({ code: "custom", message: "Local eligibility query ids do not match counts" });
  }
  if ((row.opportunity_adjusted_local_selection !== null) !== (row.eligible_question_count > 0)) {
    context.addIssue({ code: "custom", message: "Local opportunity score requires an eligible denominator" });
  }
  });

const localViewSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    included_in_national_summary: z.literal(false),
    query_ids: z.array(z.string().min(1)).length(RESEARCH_V4_LOCAL_QUESTION_COUNT),
    questions: z.array(localQuestionViewSchema).length(RESEARCH_V4_LOCAL_QUESTION_COUNT),
    opportunity_adjusted_panel_on_verified_eligible_local_cells: z
      .array(localOpportunityRowSchema)
      .length(RESEARCH_V4_PANEL_SIZE),
    opportunity_adjustment_is_comprehensive: z.literal(false),
    unknown_eligibility_enters_denominators: z.literal(false)
  })
  .strict();

const breadthEntitySchema = candidateEntitySchema.safeExtend({
      cross_scenario_selection_breadth: fractionSchema,
      families_reached: z.number().int().min(1).max(4),
      family_scores: nationalFamilyScoresSchema
});

const openUniverseVsPanelSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    open_market: z
      .object({
        candidate_entity_count: z.number().int().nonnegative(),
        panel_candidate_count: z.number().int().nonnegative(),
        outside_panel_candidate_count: z.number().int().nonnegative(),
        candidate_entities: z.array(candidateEntitySchema),
        national_selection_breadth: z.array(breadthEntitySchema)
      })
      .strict(),
    constructed_panel: z
      .object({
        constructed_panel_size: z.literal(RESEARCH_V4_PANEL_SIZE),
        selected_panel_entity_count: z.number().int().nonnegative(),
        national_selection_breadth: z.array(breadthEntitySchema),
        limitation: z.literal(
          "The 150-firm panel is constructed and is not the UK's top, largest or representative 150 firms."
        )
      })
      .strict(),
    unadjusted_vs_partial_opportunity_adjusted_panel: z
      .array(
        candidateEntitySchema.safeExtend({
              unadjusted_cross_scenario_selection_breadth: fractionSchema,
              partial_opportunity_adjusted_selection_breadth: fractionSchema.nullable(),
              opportunity_adjusted_value_is_comprehensive: z.boolean()
        })
      )
      .length(RESEARCH_V4_PANEL_SIZE)
  })
  .strict();

const conceptEntitySchema = entitySchema.safeExtend({
      candidate_presence: fractionSchema,
      adviser_mention_presence: fractionSchema,
      own_domain_citation_presence: fractionSchema,
      selection_claim_support_presence: fractionSchema,
      authority_or_directory_presence: fractionSchema
});

const semanticConceptViewsSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    concepts_are_independent: z.literal(true),
    concept_definitions: z
      .object({
        candidate_presence: z.literal("Semantically verified candidate selection only."),
        adviser_mention_presence: z.literal(
          "Any non-authority firm or individual-adviser mention, whether selected or not."
        ),
        own_domain_citation_presence: z.literal(
          "The entity's own domain was recoverably cited; this does not prove selection."
        ),
        selection_claim_support_presence: z.literal(
          "A recoverable source supported the sentence or list item selecting the candidate."
        ),
        authority_or_directory_presence: z.literal(
          "A directory, regulator or authority entity appeared, or an authority source was cited."
        )
      })
      .strict(),
    questions: z
      .array(
        z
          .object({
            query_id: z.string().min(1),
            family: familySchema,
            score_scope: scoreScopeSchema,
            entities: z.array(conceptEntitySchema)
          })
          .strict()
      )
      .length(RESEARCH_V4_QUESTION_COUNT)
  })
  .strict();

const crossScenarioBreadthSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    label: z.literal("cross-scenario selection breadth"),
    exact_ordinal_ranking_published: z.literal(false),
    entities: z.array(breadthEntitySchema)
  })
  .strict();

const eligibilityQuestionCoverageSchema = z
  .object({
    query_id: z.string().min(1),
    family: familySchema,
    score_scope: scoreScopeSchema,
    eligible_true: z.number().int().nonnegative(),
    ineligible_false: z.number().int().nonnegative(),
    unknown: z.number().int().nonnegative(),
    known_eligibility_coverage: fractionSchema
  })
  .strict()
  .superRefine((row, context) => {
    if (row.eligible_true + row.ineligible_false + row.unknown !== RESEARCH_V4_PANEL_SIZE) {
      context.addIssue({ code: "custom", message: "Question eligibility must cover all 150 firms" });
    }
  });

const eligibilityFamilyCoverageSchema = z
  .object({
    family: familySchema,
    cell_count: z.literal(750),
    eligible_true: z.number().int().nonnegative(),
    ineligible_false: z.number().int().nonnegative(),
    unknown: z.number().int().nonnegative(),
    known_eligibility_coverage: fractionSchema
  })
  .strict()
  .superRefine((row, context) => {
    if (row.eligible_true + row.ineligible_false + row.unknown !== 750) {
      context.addIssue({ code: "custom", message: "Family eligibility must cover 750 cells" });
    }
  });

const eligibilityCoverageSchema = z
  .object({
    registry_version: z.literal(RESEARCH_V4_ELIGIBILITY_VERSION),
    source_status: z.literal("frozen"),
    cell_count: z.literal(3750),
    eligible_true: z.literal(415),
    ineligible_false: z.literal(0),
    unknown: z.literal(3335),
    known_eligibility_coverage: fractionSchema,
    comprehensive_opportunity_adjustment_allowed: z.literal(false),
    unknown_is_never_false: z.literal(true),
    by_question: z.array(eligibilityQuestionCoverageSchema).length(RESEARCH_V4_QUESTION_COUNT),
    by_family: z.array(eligibilityFamilyCoverageSchema).length(5)
  })
  .strict();

const opportunityFamilyScoreSchema = z
  .object({
    eligible_question_count: z.number().int().min(0).max(5),
    known_ineligible_question_count: z.number().int().min(0).max(5),
    unknown_question_count: z.number().int().min(0).max(5),
    eligible_query_ids: z.array(z.string().min(1)),
    unknown_query_ids: z.array(z.string().min(1)),
    score: fractionSchema.nullable()
  })
  .strict()
  .superRefine((row, context) => {
    if (row.eligible_question_count + row.known_ineligible_question_count + row.unknown_question_count !== 5) {
      context.addIssue({ code: "custom", message: "National family eligibility must cover five questions" });
    }
    if (row.eligible_query_ids.length !== row.eligible_question_count || row.unknown_query_ids.length !== row.unknown_question_count) {
      context.addIssue({ code: "custom", message: "National eligibility query ids do not match counts" });
    }
    if ((row.score !== null) !== (row.eligible_question_count > 0)) {
      context.addIssue({ code: "custom", message: "Opportunity score requires an eligible denominator" });
    }
  });

const opportunityFirmSchema = candidateEntitySchema
  .safeExtend({
      eligible_national_family_count: z.number().int().min(0).max(4),
      opportunity_adjusted_selection_breadth: fractionSchema.nullable(),
      is_comprehensive_for_this_firm: z.boolean(),
      family_scores: z
        .object({
          core: opportunityFamilyScoreSchema,
          wealth: opportunityFamilyScoreSchema,
          pensions: opportunityFamilyScoreSchema,
          life_events: opportunityFamilyScoreSchema
        })
        .strict()
  })
  .superRefine((row, context) => {
  if (row.entity_type !== "firm" || row.panel_status !== "panel") {
    context.addIssue({ code: "custom", message: "Opportunity-adjusted rows must be panel firms" });
  }
  const eligibleFamilies = Object.values(row.family_scores).filter((family) => family.score !== null).length;
  if (row.eligible_national_family_count !== eligibleFamilies) {
    context.addIssue({ code: "custom", message: "Eligible family count does not match family scores" });
  }
  if ((row.opportunity_adjusted_selection_breadth !== null) !== (eligibleFamilies > 0)) {
    context.addIssue({ code: "custom", message: "Opportunity breadth requires an eligible family" });
  }
  if (row.is_comprehensive_for_this_firm !== Object.values(row.family_scores).every((family) => family.unknown_question_count === 0)) {
    context.addIssue({ code: "custom", message: "Per-firm comprehensive flag conflicts with unknown eligibility" });
  }
  });

const opportunityAdjustedPanelSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    ineligible_questions_do_not_enter_denominators: z.literal(true),
    unknown_eligibility_enters_denominators: z.literal(false),
    unknown_eligibility_is_not_ineligibility: z.literal(true),
    comprehensive_panel_opportunity_view: z.literal(false),
    label: z.literal("partial opportunity-adjusted panel selection on verified-eligible cells only"),
    limitation: z.literal(
      "Unknown eligibility cells are excluded from every denominator. This is not a comprehensive opportunity-adjusted comparison of all 150 firms."
    ),
    eligibility_coverage: eligibilityCoverageSchema,
    firms: z.array(opportunityFirmSchema).length(RESEARCH_V4_PANEL_SIZE)
  })
  .strict();

const sensitivityScoreEntitySchema = z
  .object({ entity_id: z.string().min(1), score: fractionSchema })
  .strict();

const sensitivitySchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    leave_one_engine_out: z
      .array(
        z
          .object({
            excluded_engine: providerSchema,
            included_engines: z.array(providerSchema).length(2),
            entities: z.array(sensitivityScoreEntitySchema)
          })
          .strict()
      )
      .length(3),
    leave_one_family_out: z
      .array(
        z
          .object({
            excluded_family: nationalFamilySchema,
            included_families: z.array(nationalFamilySchema).length(3),
            entities: z.array(sensitivityScoreEntitySchema)
          })
          .strict()
      )
      .length(4),
    repeat_confirmed_vs_one_off: z.array(
      candidateEntitySchema.safeExtend({
            repeat_confirmed_selection_breadth: fractionSchema,
            one_off_selection_breadth: fractionSchema
      })
    ),
    ordering_unstable: z.boolean(),
    exact_ordinal_ranking_withheld: z.boolean(),
    stability_matrix: z.array(
      z
        .object({
          entity_id: z.string().min(1),
          rank_observation_count: z.number().int().min(0).max(7),
          best_rank: z.number().int().positive().nullable(),
          worst_rank: z.number().int().positive().nullable(),
          rank_span: z.number().int().nonnegative().nullable()
        })
        .strict()
    ),
    scenario_orders: z
      .array(
        z
          .object({
            scenario: z.string().regex(/^leave_(engine|family)_out:/),
            tie_aware_order_groups: z.array(z.array(z.string().min(1)).min(1))
          })
          .strict()
      )
      .length(7)
  })
  .strict()
  .superRefine((sensitivity, context) => {
    if (sensitivity.exact_ordinal_ranking_withheld !== sensitivity.ordering_unstable) {
      context.addIssue({ code: "custom", message: "Ordinal-ranking policy conflicts with sensitivity result" });
    }
    assertExactSet(
      sensitivity.leave_one_engine_out.map((row) => row.excluded_engine),
      RESEARCH_V4_PROVIDERS,
      context,
      "Leave-one-engine sensitivity"
    );
    assertExactSet(
      sensitivity.leave_one_family_out.map((row) => row.excluded_family),
      RESEARCH_V4_NATIONAL_FAMILIES,
      context,
      "Leave-one-family sensitivity"
    );
  });

const selectionTierSchema = z.enum([
  "selected_across_all_four_national_families",
  "selected_across_two_or_three_national_families",
  "selected_in_one_national_family"
]);
const tierEntitySchema = breadthEntitySchema
  .safeExtend({ selection_breadth_tier: selectionTierSchema })
  .superRefine((row, context) => {
  const expectedTier = row.families_reached === 4
    ? "selected_across_all_four_national_families"
    : row.families_reached >= 2
      ? "selected_across_two_or_three_national_families"
      : "selected_in_one_national_family";
  if (row.selection_breadth_tier !== expectedTier) {
    context.addIssue({ code: "custom", message: "Selection tier conflicts with national families reached" });
  }
  });

const selectionTiersSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    tier_basis: z.literal("number of national families with observed semantically verified candidate selection"),
    tiers_replace_precise_ordinal_ranking: z.literal(true),
    entities: z.array(tierEntitySchema)
  })
  .strict();

const semanticExceptionsSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    candidate_exception_count: z.number().int().nonnegative(),
    candidate_exceptions: z.array(
      z
        .object({
          decision_id: z.string().min(1),
          observation_id: z.string().min(1),
          query_id: z.string().min(1),
          entity_id: z.string().min(1),
          scoring_entity_id: z.string().min(1),
          uk_status: z.enum(["verified_uk", "not_uk", "unknown", "not_applicable"]),
          constraint_fit: z.enum(["fit", "does_not_fit", "unknown", "not_applicable"]),
          reason: z.literal("candidate_requires_jurisdiction_or_constraint_disclosure")
        })
        .strict()
    ),
    concepts_are_separate: z.tuple([
      z.literal("candidate selection"),
      z.literal("adviser mention"),
      z.literal("own-domain citation"),
      z.literal("selection-claim source support"),
      z.literal("authority or directory presence")
    ])
  })
  .strict()
  .superRefine((exceptions, context) => {
    if (exceptions.candidate_exception_count !== exceptions.candidate_exceptions.length) {
      context.addIssue({ code: "custom", message: "Semantic exception count does not match rows" });
    }
  });

const inputHashesSchema = z
  .object({
    corpus: sha256Schema,
    eligibility_registry: sha256Schema,
    formal_observations: sha256Schema,
    freeze_manifest: sha256Schema,
    open_universe_inventory: sha256Schema,
    reviewed_semantic_decisions: sha256Schema,
    semantic_schema: sha256Schema
  })
  .strict();

const outputHashesSchema = z
  .object(Object.fromEntries(RESEARCH_V4_ARTIFACT_FILENAMES.map((filename) => [filename, sha256Schema])) as {
    [Filename in (typeof RESEARCH_V4_ARTIFACT_FILENAMES)[number]]: typeof sha256Schema;
  })
  .strict();

const researchV4ManifestSchema = z
  .object({
    pipeline_version: z.literal(RESEARCH_V4_PIPELINE_VERSION),
    status: z.literal("deterministic_reviewed_evidence"),
    corpus_version: z.literal(RESEARCH_V4_CORPUS_VERSION),
    formal_observation_count: z.literal(RESEARCH_V4_FORMAL_OBSERVATION_COUNT),
    input_sha256: inputHashesSchema,
    output_file_sha256: outputHashesSchema,
    output_file_count: z.literal(RESEARCH_V4_ARTIFACT_FILENAMES.length),
    national_families: z.tuple([
      z.literal("core"),
      z.literal("wealth"),
      z.literal("pensions"),
      z.literal("life_events")
    ]),
    local_family_in_national_summary: z.literal(false),
    weighting: z
      .object({
        answer_shortlist_mass: z.literal("each non-empty answer contributes total mass 1"),
        repetitions: z.literal("averaged within question and engine"),
        engines: z.literal("equal"),
        questions_within_family: z.literal("equal"),
        national_families: z.literal("equal")
      })
      .strict(),
    manifest_identity_sha256: sha256Schema
  })
  .strict();

const artifactSchemas = {
  "cross_scenario_breadth.json": crossScenarioBreadthSchema,
  "local_view.json": localViewSchema,
  "national_family_views.json": nationalFamilyViewsSchema,
  "observation_entity_metrics.json": observationEntityMetricsSchema,
  "open_universe_vs_panel.json": openUniverseVsPanelSchema,
  "opportunity_adjusted_panel.json": opportunityAdjustedPanelSchema,
  "question_shortlists.json": questionShortlistsSchema,
  "selection_tiers.json": selectionTiersSchema,
  "semantic_concept_views.json": semanticConceptViewsSchema,
  "semantic_exceptions.json": semanticExceptionsSchema,
  "sensitivity.json": sensitivitySchema
} satisfies Record<(typeof RESEARCH_V4_ARTIFACT_FILENAMES)[number], z.ZodType>;

export type ResearchV4Manifest = z.infer<typeof researchV4ManifestSchema>;
export type ResearchV4ExpectedIdentity = {
  manifestIdentitySha256: string;
  inputSha256: ResearchV4Manifest["input_sha256"];
};

export type ResearchV4Artifacts = {
  crossScenarioBreadth: z.infer<typeof crossScenarioBreadthSchema>;
  localView: z.infer<typeof localViewSchema>;
  nationalFamilyViews: z.infer<typeof nationalFamilyViewsSchema>;
  openUniverseVsPanel: z.infer<typeof openUniverseVsPanelSchema>;
  opportunityAdjustedPanel: z.infer<typeof opportunityAdjustedPanelSchema>;
  questionShortlists: z.infer<typeof questionShortlistsSchema>;
  selectionTiers: z.infer<typeof selectionTiersSchema>;
  semanticConceptViews: z.infer<typeof semanticConceptViewsSchema>;
  sensitivity: z.infer<typeof sensitivitySchema>;
};

export type ResearchV4RestrictedArtifacts = {
  observationEntityMetrics: z.infer<typeof observationEntityMetricsSchema>;
  semanticExceptions: z.infer<typeof semanticExceptionsSchema>;
};

type ResearchV4ValidatedArtifacts = ResearchV4Artifacts & ResearchV4RestrictedArtifacts;

export type ResearchV4Package = {
  manifest: ResearchV4Manifest;
  artifacts: ResearchV4Artifacts;
  views: {
    national: {
      questions: ResearchV4Artifacts["questionShortlists"];
      families: ResearchV4Artifacts["nationalFamilyViews"];
      crossScenarioBreadth: ResearchV4Artifacts["crossScenarioBreadth"];
      selectionTiers: ResearchV4Artifacts["selectionTiers"];
      sensitivity: ResearchV4Artifacts["sensitivity"];
    };
    local: ResearchV4Artifacts["localView"];
    marketBoundary: ResearchV4Artifacts["openUniverseVsPanel"];
    semanticConcepts: ResearchV4Artifacts["semanticConceptViews"];
    eligibility: ResearchV4Artifacts["opportunityAdjustedPanel"];
  };
};

export type ResearchV4RestrictedEvidencePackage = {
  manifestIdentitySha256: string;
  artifacts: ResearchV4RestrictedArtifacts;
};

export class ResearchV4DataError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "ResearchV4DataError";
  }
}

function assertUnique(values: readonly string[], context: z.RefinementCtx, label: string) {
  if (new Set(values).size !== values.length) {
    context.addIssue({ code: "custom", message: `${label} contains duplicates` });
  }
}

function assertExactSet(
  actual: readonly string[],
  expected: readonly string[],
  context: z.RefinementCtx,
  label: string
) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  if (
    actualSet.size !== actual.length ||
    expectedSet.size !== expected.length ||
    actualSet.size !== expectedSet.size ||
    [...expectedSet].some((value) => !actualSet.has(value))
  ) {
    context.addIssue({ code: "custom", message: `${label} does not match the frozen set` });
  }
}

function sha256(value: Uint8Array | string) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([key, child]) => [key, canonicalize(child)])
    );
  }
  return value;
}

function canonicalSha256(value: unknown) {
  return sha256(`${JSON.stringify(canonicalize(value))}\n`);
}

function parseJson(buffer: Buffer, filename: string): unknown {
  try {
    return JSON.parse(buffer.toString("utf8"));
  } catch (error) {
    throw new ResearchV4DataError(`${filename} is not valid JSON`, { cause: error });
  }
}

function assertManifestIdentity(manifest: ResearchV4Manifest) {
  const { manifest_identity_sha256: expectedIdentity, ...identityPayload } = manifest;
  const actualIdentity = canonicalSha256(identityPayload);
  if (actualIdentity !== expectedIdentity) {
    throw new ResearchV4DataError("manifest.json identity hash does not match its canonical payload");
  }
}

function assertExpectedIdentity(manifest: ResearchV4Manifest, expected: ResearchV4ExpectedIdentity) {
  const expectedManifestIdentity = sha256Schema.parse(expected.manifestIdentitySha256);
  const expectedInputs = inputHashesSchema.parse(expected.inputSha256);
  if (manifest.manifest_identity_sha256 !== expectedManifestIdentity) {
    throw new ResearchV4DataError("The semantic package is not the approved manifest identity");
  }
  for (const key of Object.keys(expectedInputs) as Array<keyof typeof expectedInputs>) {
    if (manifest.input_sha256[key] !== expectedInputs[key]) {
      throw new ResearchV4DataError(`The semantic package has an unexpected ${key} input hash`);
    }
  }
}

function assertQuestionBoundaries(artifacts: ResearchV4ValidatedArtifacts) {
  const nationalQuestions = artifacts.questionShortlists.national_questions;
  const localQuestions = artifacts.localView.questions;
  const nationalIds = nationalQuestions.map((question) => question.query_id);
  const localIds = localQuestions.map((question) => question.query_id);
  assertNoDuplicatesOrOverlap(nationalIds, localIds, "National and local question ids");
  assertSameStringSet(localIds, artifacts.localView.query_ids, "Local view query ids");

  for (const family of RESEARCH_V4_NATIONAL_FAMILIES) {
    if (nationalQuestions.filter((question) => question.family === family).length !== 5) {
      throw new ResearchV4DataError(`National family ${family} does not contain five questions`);
    }
  }
  assertSameStringSet(
    artifacts.nationalFamilyViews.families.map((family) => family.family),
    RESEARCH_V4_NATIONAL_FAMILIES,
    "National family views"
  );

  const conceptQuestions = artifacts.semanticConceptViews.questions;
  assertSameStringSet(
    conceptQuestions.map((question) => question.query_id),
    [...nationalIds, ...localIds],
    "Semantic concept questions"
  );
  for (const question of conceptQuestions) {
    const shouldBeLocal = localIds.includes(question.query_id);
    if (
      shouldBeLocal !== (question.family === "local") ||
      shouldBeLocal !== (question.score_scope === "local_only")
    ) {
      throw new ResearchV4DataError(`Semantic concept scope drifted for ${question.query_id}`);
    }
  }

  const observationKeys = artifacts.observationEntityMetrics.rows.map(
    (row) => `${row.query_id}|${row.provider}|${row.repetition}`
  );
  if (new Set(observationKeys).size !== RESEARCH_V4_FORMAL_OBSERVATION_COUNT) {
    throw new ResearchV4DataError("Formal observation rows are not a unique 25 x 3 x 3 grid");
  }
  assertSameStringSet(
    artifacts.observationEntityMetrics.rows.map((row) => row.query_id),
    [...nationalIds, ...localIds],
    "Formal observation question ids",
    true
  );
}

function assertMarketBoundaries(artifacts: ResearchV4ValidatedArtifacts) {
  const market = artifacts.openUniverseVsPanel;
  const candidateIds = market.open_market.candidate_entities.map((entity) => entity.entity_id);
  if (market.open_market.candidate_entity_count !== candidateIds.length) {
    throw new ResearchV4DataError("Open-market candidate count does not match its entity list");
  }
  const panelCount = market.open_market.candidate_entities.filter((entity) => entity.panel_status === "panel").length;
  const outsideCount = market.open_market.candidate_entities.filter(
    (entity) => entity.panel_status === "outside_panel"
  ).length;
  if (
    market.open_market.panel_candidate_count !== panelCount ||
    market.open_market.outside_panel_candidate_count !== outsideCount ||
    panelCount + outsideCount !== candidateIds.length
  ) {
    throw new ResearchV4DataError("Open-market panel and outside-panel counts are inconsistent");
  }
  if (
    market.constructed_panel.national_selection_breadth.some((entity) => entity.panel_status !== "panel") ||
    market.unadjusted_vs_partial_opportunity_adjusted_panel.some(
      (entity) => entity.panel_status !== "panel" || entity.entity_type !== "firm"
    )
  ) {
    throw new ResearchV4DataError("Outside-panel entities leaked into a constructed-panel view");
  }

  const breadthIds = artifacts.crossScenarioBreadth.entities.map((entity) => entity.entity_id);
  assertSameStringSet(
    market.open_market.national_selection_breadth.map((entity) => entity.entity_id),
    breadthIds,
    "Open-market selection breadth"
  );
  assertSameStringSet(
    artifacts.selectionTiers.entities.map((entity) => entity.entity_id),
    breadthIds,
    "Selection tiers"
  );
  assertSameStringSet(
    artifacts.opportunityAdjustedPanel.firms.map((entity) => entity.entity_id),
    artifacts.localView.opportunity_adjusted_panel_on_verified_eligible_local_cells.map(
      (entity) => entity.entity_id
    ),
    "National and local panel firms"
  );
}

function assertEligibilitySeparation(artifacts: ResearchV4ValidatedArtifacts) {
  const coverage = artifacts.opportunityAdjustedPanel.eligibility_coverage;
  if (coverage.eligible_true + coverage.ineligible_false + coverage.unknown !== coverage.cell_count) {
    throw new ResearchV4DataError("Eligibility coverage totals do not match the frozen registry");
  }
  if (
    artifacts.opportunityAdjustedPanel.unknown_eligibility_enters_denominators ||
    !artifacts.opportunityAdjustedPanel.unknown_eligibility_is_not_ineligibility ||
    artifacts.localView.unknown_eligibility_enters_denominators
  ) {
    throw new ResearchV4DataError("Unknown eligibility was collapsed into a scoring denominator");
  }
  assertSameStringSet(
    coverage.by_family.map((family) => family.family),
    [...RESEARCH_V4_NATIONAL_FAMILIES, "local"],
    "Eligibility family coverage"
  );
}

function assertRestrictedEvidence(artifacts: ResearchV4ValidatedArtifacts) {
  const metrics = artifacts.observationEntityMetrics;
  if (
    metrics.binary_candidate_presence_rows.length !==
    metrics.formal_observation_count * metrics.binary_candidate_presence_entity_count
  ) {
    throw new ResearchV4DataError("Binary entity-presence rows do not form the complete formal grid");
  }
  const binaryKeys = metrics.binary_candidate_presence_rows.map(
    (row) => `${row.observation_id}|${row.entity_id}`
  );
  if (new Set(binaryKeys).size !== binaryKeys.length) {
    throw new ResearchV4DataError("Binary entity-presence rows contain duplicate observation/entity cells");
  }
  if (!artifacts.semanticConceptViews.concepts_are_independent) {
    throw new ResearchV4DataError("Semantic concepts are not independent");
  }
}

function assertNoDuplicatesOrOverlap(left: readonly string[], right: readonly string[], label: string) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  if (
    leftSet.size !== left.length ||
    rightSet.size !== right.length ||
    [...leftSet].some((value) => rightSet.has(value))
  ) {
    throw new ResearchV4DataError(`${label} contain duplicates or overlap`);
  }
}

function assertSameStringSet(
  actual: readonly string[],
  expected: readonly string[],
  label: string,
  allowActualDuplicates = false
) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  if (
    (!allowActualDuplicates && actualSet.size !== actual.length) ||
    expectedSet.size !== expected.length ||
    actualSet.size !== expectedSet.size ||
    [...expectedSet].some((value) => !actualSet.has(value))
  ) {
    throw new ResearchV4DataError(`${label} do not match the frozen set`);
  }
}

async function loadValidatedResearchV4Package(
  packageDirectory: string,
  expectedIdentity: ResearchV4ExpectedIdentity
): Promise<{ manifest: ResearchV4Manifest; artifacts: ResearchV4ValidatedArtifacts }> {
  const directory = path.resolve(packageDirectory);
  const filenames = (await readdir(directory)).sort();
  assertSameStringSet(
    filenames,
    ["manifest.json", ...RESEARCH_V4_ARTIFACT_FILENAMES],
    "Semantic package filenames"
  );

  const manifestBuffer = await readFile(path.join(directory, "manifest.json"));
  let manifest: ResearchV4Manifest;
  try {
    manifest = researchV4ManifestSchema.parse(parseJson(manifestBuffer, "manifest.json"));
  } catch (error) {
    if (error instanceof ResearchV4DataError) throw error;
    throw new ResearchV4DataError("manifest.json does not match the v0.4 scoring contract", {
      cause: error
    });
  }
  assertManifestIdentity(manifest);
  assertExpectedIdentity(manifest, expectedIdentity);

  const parsed = new Map<string, unknown>();
  for (const filename of RESEARCH_V4_ARTIFACT_FILENAMES) {
    const buffer = await readFile(path.join(directory, filename));
    if (sha256(buffer) !== manifest.output_file_sha256[filename]) {
      throw new ResearchV4DataError(`${filename} does not match the reviewed manifest`);
    }
    try {
      parsed.set(filename, artifactSchemas[filename].parse(parseJson(buffer, filename)));
    } catch (error) {
      if (error instanceof ResearchV4DataError) throw error;
      throw new ResearchV4DataError(`${filename} does not match the v0.4 scoring contract`, {
        cause: error
      });
    }
  }

  const artifacts: ResearchV4ValidatedArtifacts = {
    crossScenarioBreadth: parsed.get("cross_scenario_breadth.json") as ResearchV4Artifacts["crossScenarioBreadth"],
    localView: parsed.get("local_view.json") as ResearchV4Artifacts["localView"],
    nationalFamilyViews: parsed.get("national_family_views.json") as ResearchV4Artifacts["nationalFamilyViews"],
    observationEntityMetrics: parsed.get("observation_entity_metrics.json") as ResearchV4RestrictedArtifacts["observationEntityMetrics"],
    openUniverseVsPanel: parsed.get("open_universe_vs_panel.json") as ResearchV4Artifacts["openUniverseVsPanel"],
    opportunityAdjustedPanel: parsed.get("opportunity_adjusted_panel.json") as ResearchV4Artifacts["opportunityAdjustedPanel"],
    questionShortlists: parsed.get("question_shortlists.json") as ResearchV4Artifacts["questionShortlists"],
    selectionTiers: parsed.get("selection_tiers.json") as ResearchV4Artifacts["selectionTiers"],
    semanticConceptViews: parsed.get("semantic_concept_views.json") as ResearchV4Artifacts["semanticConceptViews"],
    semanticExceptions: parsed.get("semantic_exceptions.json") as ResearchV4RestrictedArtifacts["semanticExceptions"],
    sensitivity: parsed.get("sensitivity.json") as ResearchV4Artifacts["sensitivity"]
  };

  assertQuestionBoundaries(artifacts);
  assertMarketBoundaries(artifacts);
  assertEligibilitySeparation(artifacts);
  assertRestrictedEvidence(artifacts);

  return { manifest, artifacts };
}

/**
 * Loads the publication-safe v0.4 package. The two restricted evidence
 * artifacts are verified internally but are deliberately omitted from both
 * `artifacts` and `views`.
 */
export async function loadResearchV4Package(
  packageDirectory: string,
  expectedIdentity: ResearchV4ExpectedIdentity
): Promise<ResearchV4Package> {
  const { manifest, artifacts: validated } = await loadValidatedResearchV4Package(
    packageDirectory,
    expectedIdentity
  );
  const artifacts: ResearchV4Artifacts = {
    crossScenarioBreadth: validated.crossScenarioBreadth,
    localView: validated.localView,
    nationalFamilyViews: validated.nationalFamilyViews,
    openUniverseVsPanel: validated.openUniverseVsPanel,
    opportunityAdjustedPanel: validated.opportunityAdjustedPanel,
    questionShortlists: validated.questionShortlists,
    selectionTiers: validated.selectionTiers,
    semanticConceptViews: validated.semanticConceptViews,
    sensitivity: validated.sensitivity
  };

  return {
    manifest,
    artifacts,
    views: {
      national: {
        questions: artifacts.questionShortlists,
        families: artifacts.nationalFamilyViews,
        crossScenarioBreadth: artifacts.crossScenarioBreadth,
        selectionTiers: artifacts.selectionTiers,
        sensitivity: artifacts.sensitivity
      },
      local: artifacts.localView,
      marketBoundary: artifacts.openUniverseVsPanel,
      semanticConcepts: artifacts.semanticConceptViews,
      eligibility: artifacts.opportunityAdjustedPanel
    }
  };
}

/**
 * Server-only restricted evidence access. Callers must opt into this API by
 * name; the default package loader never returns these artifacts.
 */
export async function loadResearchV4RestrictedEvidenceServerOnly(
  packageDirectory: string,
  expectedIdentity: ResearchV4ExpectedIdentity
): Promise<ResearchV4RestrictedEvidencePackage> {
  const { manifest, artifacts } = await loadValidatedResearchV4Package(
    packageDirectory,
    expectedIdentity
  );
  return {
    manifestIdentitySha256: manifest.manifest_identity_sha256,
    artifacts: {
      observationEntityMetrics: artifacts.observationEntityMetrics,
      semanticExceptions: artifacts.semanticExceptions
    }
  };
}
