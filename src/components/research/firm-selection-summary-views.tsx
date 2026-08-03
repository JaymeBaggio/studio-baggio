export type FractionMetric = {
  numerator: number;
  denominator: number;
  value: number;
};

export type NationalFamily = "core" | "wealth" | "pensions" | "life_events";

export type ResearchEntity = {
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
};

export type BreadthEntity = ResearchEntity & {
  cross_scenario_selection_breadth: FractionMetric;
  families_reached: number;
  family_scores: Record<NationalFamily, FractionMetric>;
};

export type CrossScenarioBreadthView = {
  pipeline_version: string;
  label: string;
  exact_ordinal_ranking_published: boolean;
  entities: BreadthEntity[];
};

export type SelectionBreadthTier =
  | "selected_across_all_four_national_families"
  | "selected_across_two_or_three_national_families"
  | "selected_in_one_national_family";

export type SelectionTiersView = {
  pipeline_version: string;
  tier_basis: string;
  tiers_replace_precise_ordinal_ranking: boolean;
  entities: Array<
    BreadthEntity & {
      selection_breadth_tier: SelectionBreadthTier;
    }
  >;
};

export type ProviderRepeatability = {
  provider: "openai" | "gemini" | "perplexity";
  candidate_repeatability: { k: number; n: number };
  repeat_confirmed: boolean;
  one_off: boolean;
  candidate_rate: FractionMetric;
  normalized_shortlist_mass: FractionMetric;
};

export type QuestionShortlistEntity = ResearchEntity & {
  candidate_presence: FractionMetric;
  normalized_share_of_shortlist: FractionMetric;
  mention_presence: FractionMetric;
  own_domain_citation_presence: FractionMetric;
  selection_claim_support_presence: FractionMetric;
  provider_repeatability: ProviderRepeatability[];
  repeat_confirmed_engines: number;
  one_off_engines: number;
};

export type LocalQuestionView = {
  query_id: string;
  query_text: string;
  family: "local";
  score_scope: "local_only";
  answer_denominator: number;
  candidate_shortlist: QuestionShortlistEntity[];
  constructed_panel_candidate_shortlist: QuestionShortlistEntity[];
  outside_panel_candidate_shortlist: QuestionShortlistEntity[];
  repeat_confirmed_candidate_entity_ids: string[];
  one_off_only_candidate_entity_ids: string[];
};

export type LocalOpportunityFirm = ResearchEntity & {
  eligible_question_count: number;
  known_ineligible_question_count: number;
  unknown_question_count: number;
  eligible_query_ids: string[];
  unknown_query_ids: string[];
  opportunity_adjusted_local_selection: FractionMetric | null;
};

export type LocalView = {
  pipeline_version: string;
  included_in_national_summary: false;
  query_ids: string[];
  questions: LocalQuestionView[];
  opportunity_adjusted_panel_on_verified_eligible_local_cells: LocalOpportunityFirm[];
  opportunity_adjustment_is_comprehensive: boolean;
  unknown_eligibility_enters_denominators: false;
};

export type SemanticConceptKey =
  | "candidate_presence"
  | "adviser_mention_presence"
  | "own_domain_citation_presence"
  | "selection_claim_support_presence"
  | "authority_or_directory_presence";

export type SemanticConceptEntity = ResearchEntity &
  Record<SemanticConceptKey, FractionMetric>;

export type SemanticConceptViews = {
  pipeline_version: string;
  concepts_are_independent: boolean;
  concept_definitions: Record<SemanticConceptKey, string>;
  questions: Array<{
    query_id: string;
    family: NationalFamily | "local";
    score_scope: "national" | "local_only";
    entities: SemanticConceptEntity[];
  }>;
};

export type OpenUniverseVsPanelView = {
  pipeline_version: string;
  open_market: {
    candidate_entity_count: number;
    panel_candidate_count: number;
    outside_panel_candidate_count: number;
    candidate_entities: ResearchEntity[];
    national_selection_breadth: BreadthEntity[];
  };
  constructed_panel: {
    constructed_panel_size: number;
    selected_panel_entity_count: number;
    national_selection_breadth: BreadthEntity[];
    limitation: string;
  };
  unadjusted_vs_partial_opportunity_adjusted_panel: Array<
    ResearchEntity & {
      unadjusted_cross_scenario_selection_breadth: FractionMetric;
      partial_opportunity_adjusted_selection_breadth: FractionMetric | null;
      opportunity_adjusted_value_is_comprehensive: boolean;
    }
  >;
};

export type EligibilityCoverage = {
  registry_version: string;
  source_status: string;
  cell_count: number;
  eligible_true: number;
  ineligible_false: number;
  unknown: number;
  known_eligibility_coverage: FractionMetric;
  comprehensive_opportunity_adjustment_allowed: boolean;
  unknown_is_never_false: true;
  by_question: Array<{
    query_id: string;
    family: NationalFamily | "local";
    score_scope: "national" | "local_only";
    eligible_true: number;
    ineligible_false: number;
    unknown: number;
    known_eligibility_coverage: FractionMetric;
  }>;
  by_family: Array<{
    family: NationalFamily | "local";
    cell_count: number;
    eligible_true: number;
    ineligible_false: number;
    unknown: number;
    known_eligibility_coverage: FractionMetric;
  }>;
};

export type OpportunityFamilyScore = {
  eligible_question_count: number;
  known_ineligible_question_count: number;
  unknown_question_count: number;
  eligible_query_ids: string[];
  unknown_query_ids: string[];
  score: FractionMetric | null;
};

export type OpportunityAdjustedPanelView = {
  pipeline_version: string;
  ineligible_questions_do_not_enter_denominators: true;
  unknown_eligibility_enters_denominators: false;
  unknown_eligibility_is_not_ineligibility: true;
  comprehensive_panel_opportunity_view: boolean;
  label: string;
  limitation: string | null;
  eligibility_coverage: EligibilityCoverage;
  firms: Array<
    ResearchEntity & {
      eligible_national_family_count: number;
      opportunity_adjusted_selection_breadth: FractionMetric | null;
      is_comprehensive_for_this_firm: boolean;
      family_scores: Record<NationalFamily, OpportunityFamilyScore>;
    }
  >;
};

export type SensitivityView = {
  pipeline_version: string;
  leave_one_engine_out: Array<{
    excluded_engine: "openai" | "gemini" | "perplexity";
    included_engines: Array<"openai" | "gemini" | "perplexity">;
    entities: Array<{ entity_id: string; score: FractionMetric }>;
  }>;
  leave_one_family_out: Array<{
    excluded_family: NationalFamily;
    included_families: NationalFamily[];
    entities: Array<{ entity_id: string; score: FractionMetric }>;
  }>;
  repeat_confirmed_vs_one_off: Array<
    ResearchEntity & {
      repeat_confirmed_selection_breadth: FractionMetric;
      one_off_selection_breadth: FractionMetric;
    }
  >;
  ordering_unstable: boolean;
  exact_ordinal_ranking_withheld: boolean;
  stability_matrix: Array<{
    entity_id: string;
    rank_observation_count: number;
    best_rank: number | null;
    worst_rank: number | null;
    rank_span: number | null;
  }>;
  scenario_orders: Array<{
    scenario: string;
    tie_aware_order_groups: string[][];
  }>;
};

export type FirmSelectionSummaryViewsProps = {
  selectionTiers: SelectionTiersView;
  crossScenarioBreadth: CrossScenarioBreadthView;
  localView: LocalView;
  semanticConceptViews: SemanticConceptViews;
  openUniverseVsPanel: OpenUniverseVsPanelView;
  opportunityAdjustedPanel: OpportunityAdjustedPanelView;
  sensitivity: SensitivityView;
  id?: string;
};

const nationalFamilies: Array<{ key: NationalFamily; label: string }> = [
  { key: "core", label: "Core adviser choice" },
  { key: "wealth", label: "Wealth" },
  { key: "pensions", label: "Pensions" },
  { key: "life_events", label: "Life events" }
];

const tierDefinitions: Array<{
  key: SelectionBreadthTier;
  label: string;
  description: string;
}> = [
  {
    key: "selected_across_all_four_national_families",
    label: "Selected across all four national families",
    description: "Observed as a verified candidate in every national question family."
  },
  {
    key: "selected_across_two_or_three_national_families",
    label: "Selected across two or three national families",
    description: "Observed across more than one national question family."
  },
  {
    key: "selected_in_one_national_family",
    label: "Selected in one national family",
    description: "Observed in a single national question family."
  }
];

const conceptDefinitions: Array<{
  key: SemanticConceptKey;
  label: string;
}> = [
  { key: "candidate_presence", label: "Candidate selection" },
  { key: "adviser_mention_presence", label: "Adviser mention" },
  { key: "own_domain_citation_presence", label: "Own-domain citation" },
  {
    key: "selection_claim_support_presence",
    label: "Selection-claim source support"
  },
  {
    key: "authority_or_directory_presence",
    label: "Authority or directory presence"
  }
];

const engineLabels = {
  openai: "OpenAI",
  gemini: "Gemini",
  perplexity: "Perplexity"
} satisfies Record<SensitivityView["leave_one_engine_out"][number]["excluded_engine"], string>;

const familyLabels = Object.fromEntries(
  nationalFamilies.map((family) => [family.key, family.label])
) as Record<NationalFamily, string>;

const alphabetical = new Intl.Collator("en-GB", {
  numeric: true,
  sensitivity: "base"
});

function percentage(metric: FractionMetric) {
  const value = metric.value * 100;
  return `${new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: value > 0 && value < 1 ? 1 : 0
  }).format(value)}%`;
}

function panelLabel(status: ResearchEntity["panel_status"]) {
  if (status === "panel") return "Constructed panel";
  if (status === "outside_panel") return "Outside panel";
  return "Not applicable";
}

function observationState(
  entityId: string,
  question: LocalQuestionView
) {
  if (question.repeat_confirmed_candidate_entity_ids.includes(entityId)) {
    return "Repeat-confirmed";
  }
  if (question.one_off_only_candidate_entity_ids.includes(entityId)) {
    return "One-off observation";
  }
  return "Observed candidate";
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <header className="grid gap-4 border-t border-black/15 pt-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.8fr)] md:gap-10 md:pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {eyebrow}
      </p>
      <div className="max-w-3xl">
        <h3 id={id} className="text-2xl font-semibold tracking-[-0.03em] text-black md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base md:leading-7">
          {description}
        </p>
      </div>
    </header>
  );
}

export function FirmSelectionSummaryViews({
  selectionTiers,
  crossScenarioBreadth,
  localView,
  semanticConceptViews,
  openUniverseVsPanel,
  opportunityAdjustedPanel,
  sensitivity,
  id = "firm-selection-summary"
}: FirmSelectionSummaryViewsProps) {
  const breadthByEntity = new Map(
    crossScenarioBreadth.entities.map((entity) => [entity.entity_id, entity])
  );
  const tierGroups = tierDefinitions.map((tier) => ({
    ...tier,
    entities: selectionTiers.entities
      .filter((entity) => entity.selection_breadth_tier === tier.key)
      .map((entity) => breadthByEntity.get(entity.entity_id) ?? entity)
      .sort((left, right) => alphabetical.compare(left.display_name, right.display_name))
  }));
  const partialOpportunityView = !opportunityAdjustedPanel.comprehensive_panel_opportunity_view;
  const adjustedFirmCount = opportunityAdjustedPanel.firms.filter(
    (firm) => firm.opportunity_adjusted_selection_breadth !== null
  ).length;
  const comprehensiveFirmCount = opportunityAdjustedPanel.firms.filter(
    (firm) => firm.is_comprehensive_for_this_firm
  ).length;
  const conceptQuestionCounts = Object.fromEntries(
    conceptDefinitions.map(({ key }) => [
      key,
      semanticConceptViews.questions.filter((question) =>
        question.entities.some((entity) => entity[key].value > 0)
      ).length
    ])
  ) as Record<SemanticConceptKey, number>;
  const repeatConfirmedEntityCount = sensitivity.repeat_confirmed_vs_one_off.filter(
    (entity) => entity.repeat_confirmed_selection_breadth.value > 0
  ).length;
  const oneOffEntityCount = sensitivity.repeat_confirmed_vs_one_off.filter(
    (entity) => entity.one_off_selection_breadth.value > 0
  ).length;

  return (
    <section
      id={id}
      className="research-section bg-white text-black"
      aria-labelledby={`${id}-title`}
      data-firm-selection-summary
    >
      <div className="editorial-container space-y-16 py-16 md:space-y-24 md:py-24">
        <header className="grid gap-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.8fr)] md:gap-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--sb-accent-blue)]">
            Semantic firm selection
          </p>
          <div className="max-w-4xl">
            <h2 id={`${id}-title`} className="text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
              Selection breadth without a league table
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
              Verified candidate selections are grouped by the national question families in which
              they appeared. The categories describe breadth of observed selection; they are not a
              quality judgement or an ordinal ranking.
            </p>
          </div>
        </header>

        <section aria-labelledby={`${id}-tiers-title`}>
          <SectionHeading
            eyebrow="National view"
            id={`${id}-tiers-title`}
            title="Breadth categories"
            description={`${crossScenarioBreadth.label}. ${selectionTiers.tier_basis}`}
          />

          <div
            className="mt-8 overflow-x-auto border-y border-black/15"
            role="region"
            aria-label="Scrollable national selection breadth category matrix"
            tabIndex={0}
          >
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Non-ordinal matrix showing the national question families in which each entity was
                observed as a verified candidate. A filled mark means observed selection; a dash
                means no verified candidate selection in that family.
              </caption>
              <thead>
                <tr className="border-b border-black/15 text-xs uppercase tracking-[0.12em] text-neutral-500">
                  <th scope="col" className="py-4 pr-6 font-semibold">Entity</th>
                  <th scope="col" className="px-4 py-4 font-semibold">Cohort</th>
                  {nationalFamilies.map((family) => (
                    <th key={family.key} scope="col" className="px-4 py-4 text-center font-semibold">
                      {family.label}
                    </th>
                  ))}
                </tr>
              </thead>
              {tierGroups.map((tier) => (
                <tbody key={tier.key}>
                  <tr className="border-b border-black/10 bg-neutral-50">
                    <th colSpan={6} scope="rowgroup" className="px-4 py-4">
                      <span className="block font-semibold text-black">{tier.label}</span>
                      <span className="mt-1 block font-normal text-neutral-600">{tier.description}</span>
                    </th>
                  </tr>
                  {tier.entities.length ? (
                    tier.entities.map((entity) => (
                      <tr key={entity.entity_id} className="border-b border-black/10 last:border-b-0">
                        <th scope="row" className="py-4 pr-6 font-semibold text-black">
                          {entity.display_name}
                        </th>
                        <td className="px-4 py-4 text-neutral-600">{panelLabel(entity.panel_status)}</td>
                        {nationalFamilies.map((family) => {
                          const observed = entity.family_scores[family.key].value > 0;
                          return (
                            <td key={family.key} className="px-4 py-4 text-center">
                              <span
                                aria-hidden="true"
                                className={
                                  observed
                                    ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--sb-accent-blue)] text-xs font-bold text-white"
                                    : "text-neutral-400"
                                }
                              >
                                {observed ? "●" : "—"}
                              </span>
                              <span className="sr-only">
                                {observed
                                  ? `Observed as a verified candidate in ${family.label}`
                                  : `No verified candidate selection in ${family.label}`}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-black/10">
                      <td colSpan={6} className="px-4 py-4 text-neutral-500">
                        No entities in this category.
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Exact ordinal ranking published: {crossScenarioBreadth.exact_ordinal_ranking_published ? "yes" : "no"}.
            {selectionTiers.tiers_replace_precise_ordinal_ranking
              ? " Breadth categories replace precise ranking in this view."
              : " This view still uses breadth categories rather than rank positions."}
          </p>
        </section>

        <section aria-labelledby={`${id}-local-title`} className="bg-neutral-50 px-5 py-8 md:px-8 md:py-10">
          <SectionHeading
            eyebrow="Local-only module"
            id={`${id}-local-title`}
            title="Local adviser discovery stays separate"
            description="Local questions are reported on their own and do not enter the national family summary."
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2">
            {localView.questions.map((question) => {
              const candidates = [...question.candidate_shortlist].sort((left, right) =>
                alphabetical.compare(left.display_name, right.display_name)
              );
              return (
                <article key={question.query_id} className="bg-white p-5 md:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    {question.query_id} · Local only
                  </p>
                  <h4 className="mt-3 text-lg font-semibold leading-6 tracking-[-0.02em]">
                    {question.query_text}
                  </h4>
                  {candidates.length ? (
                    <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
                      {candidates.map((entity) => (
                        <li key={entity.entity_id} className="flex items-start justify-between gap-4 py-3">
                          <span>
                            <strong className="block text-sm font-semibold">{entity.display_name}</strong>
                            <small className="mt-1 block text-xs text-neutral-500">
                              {panelLabel(entity.panel_status)}
                            </small>
                          </span>
                          <span className="text-right text-xs font-medium text-neutral-600">
                            {observationState(entity.entity_id, question)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 border-y border-black/10 py-4 text-sm text-neutral-600">
                      No verified candidate selection was observed for this local question.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-600">
            Included in national summary: {localView.included_in_national_summary ? "yes" : "no"}.
            Unknown local eligibility cells enter denominators: {localView.unknown_eligibility_enters_denominators ? "yes" : "no"}.
          </p>
        </section>

        <section aria-labelledby={`${id}-concepts-title`}>
          <SectionHeading
            eyebrow="Meaning before metrics"
            id={`${id}-concepts-title`}
            title="Distinct semantic concepts"
            description="Being named, being selected and being cited are different observations. They are reported independently rather than collapsed into one visibility score."
          />
          <dl className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-5">
            {conceptDefinitions.map((concept) => (
              <div key={concept.key} className="bg-white p-5">
                <dt className="text-sm font-semibold leading-5">{concept.label}</dt>
                <dd className="mt-3 text-sm leading-6 text-neutral-600">
                  {semanticConceptViews.concept_definitions[concept.key]}
                </dd>
                <dd className="mt-5 border-t border-black/10 pt-3 text-xs text-neutral-500">
                  Observed in {conceptQuestionCounts[concept.key]} of {semanticConceptViews.questions.length} question views
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-neutral-500">
            Concepts treated as independent: {semanticConceptViews.concepts_are_independent ? "yes" : "no"}.
          </p>
        </section>

        <section aria-labelledby={`${id}-market-title`}>
          <SectionHeading
            eyebrow="Open universe"
            id={`${id}-market-title`}
            title="The market view is wider than the constructed panel"
            description={`Every semantically verified candidate is retained, including candidates outside the ${openUniverseVsPanel.constructed_panel.constructed_panel_size}-firm comparison panel.`}
          />
          <dl className="mt-8 grid border-y border-black/15 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-black/10 py-5 sm:border-r sm:px-5 lg:border-b-0 lg:pl-0">
              <dt className="text-xs uppercase tracking-[0.12em] text-neutral-500">Open-market candidates</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                {openUniverseVsPanel.open_market.candidate_entity_count}
              </dd>
            </div>
            <div className="border-b border-black/10 py-5 sm:px-5 lg:border-b-0 lg:border-r">
              <dt className="text-xs uppercase tracking-[0.12em] text-neutral-500">From constructed panel</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                {openUniverseVsPanel.open_market.panel_candidate_count}
              </dd>
            </div>
            <div className="border-b border-black/10 py-5 sm:border-b-0 sm:border-r sm:px-5">
              <dt className="text-xs uppercase tracking-[0.12em] text-neutral-500">Outside panel</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                {openUniverseVsPanel.open_market.outside_panel_candidate_count}
              </dd>
            </div>
            <div className="py-5 sm:px-5 lg:pr-0">
              <dt className="text-xs uppercase tracking-[0.12em] text-neutral-500">Panel entities selected</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                {openUniverseVsPanel.constructed_panel.selected_panel_entity_count}
                <span className="ml-2 text-sm font-normal tracking-normal text-neutral-500">
                  of {openUniverseVsPanel.constructed_panel.constructed_panel_size}
                </span>
              </dd>
            </div>
          </dl>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-neutral-600">
            {openUniverseVsPanel.constructed_panel.limitation}
          </p>
        </section>

        <section aria-labelledby={`${id}-opportunity-title`}>
          <SectionHeading
            eyebrow="Eligibility boundary"
            id={`${id}-opportunity-title`}
            title={opportunityAdjustedPanel.label}
            description="Opportunity adjustment includes verified-eligible cells only. Known-ineligible and unknown cells do not enter its denominators."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <aside
              className={`border-l-4 p-5 md:p-6 ${
                partialOpportunityView
                  ? "border-[color:var(--sb-accent-blue)] bg-neutral-50"
                  : "border-black bg-white"
              }`}
              aria-label={partialOpportunityView ? "Partial opportunity-adjustment caveat" : "Opportunity-adjustment coverage"}
            >
              <h4 className="text-lg font-semibold tracking-[-0.02em]">
                {partialOpportunityView ? "Partial view" : "Comprehensive view"}
              </h4>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                {opportunityAdjustedPanel.limitation ??
                  "All eligibility cells are resolved for the comprehensive opportunity-adjusted view."}
              </p>
              <p className="mt-4 text-xs leading-5 text-neutral-500">
                Unknown eligibility is never treated as ineligibility.
              </p>
            </aside>
            <dl className="grid grid-cols-2 gap-px overflow-hidden border border-black/10 bg-black/10">
              <div className="bg-white p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Known coverage</dt>
                <dd className="mt-2 text-2xl font-semibold">{percentage(opportunityAdjustedPanel.eligibility_coverage.known_eligibility_coverage)}</dd>
              </div>
              <div className="bg-white p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Unknown cells</dt>
                <dd className="mt-2 text-2xl font-semibold">{opportunityAdjustedPanel.eligibility_coverage.unknown}</dd>
              </div>
              <div className="bg-white p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Firms with an adjusted value</dt>
                <dd className="mt-2 text-2xl font-semibold">{adjustedFirmCount}</dd>
              </div>
              <div className="bg-white p-5">
                <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Firms with complete eligibility</dt>
                <dd className="mt-2 text-2xl font-semibold">{comprehensiveFirmCount}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby={`${id}-sensitivity-title`}>
          <SectionHeading
            eyebrow="Stability disclosure"
            id={`${id}-sensitivity-title`}
            title={sensitivity.ordering_unstable ? "Ordering changes under sensitivity checks" : "Ordering remained stable under sensitivity checks"}
            description="The analysis is recalculated after leaving out each engine and each national question family, with repeat-confirmed and one-off selection reported separately."
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2">
            <div className="bg-white p-5 md:p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">Leave-one-engine-out</h4>
              <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm">
                {sensitivity.leave_one_engine_out.map((scenario) => (
                  <li key={scenario.excluded_engine} className="flex justify-between gap-4 py-3">
                    <span className="text-neutral-600">Excluded</span>
                    <strong>{engineLabels[scenario.excluded_engine]}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-5 md:p-6">
              <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">Leave-one-family-out</h4>
              <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 text-sm">
                {sensitivity.leave_one_family_out.map((scenario) => (
                  <li key={scenario.excluded_family} className="flex justify-between gap-4 py-3">
                    <span className="text-neutral-600">Excluded</span>
                    <strong>{familyLabels[scenario.excluded_family]}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="border-t border-black/15 pt-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Exact ordinal ranking withheld</dt>
              <dd className="mt-2 text-lg font-semibold">{sensitivity.exact_ordinal_ranking_withheld ? "Yes" : "No"}</dd>
            </div>
            <div className="border-t border-black/15 pt-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Entities with repeat-confirmed breadth</dt>
              <dd className="mt-2 text-lg font-semibold">{repeatConfirmedEntityCount}</dd>
            </div>
            <div className="border-t border-black/15 pt-4">
              <dt className="text-xs uppercase tracking-[0.1em] text-neutral-500">Entities with one-off breadth</dt>
              <dd className="mt-2 text-lg font-semibold">{oneOffEntityCount}</dd>
            </div>
          </dl>
        </section>
      </div>
    </section>
  );
}
