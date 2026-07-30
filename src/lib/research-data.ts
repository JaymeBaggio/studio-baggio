import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  getResearchEditionDefinition,
  type ResearchEditionDefinition,
  RESEARCH_ENGINE_IDS,
  type ResearchEngineId
} from "@/content/research";

const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);
const runDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const engineSchema = z.enum(RESEARCH_ENGINE_IDS);
const repetitionSchema = z.number().int().min(1).max(3);
const nullableBooleanSchema = z.boolean().nullable();
const stabilityStateSchema = z.enum([
  "stable_present",
  "stable_absent",
  "variable",
  "not_measured_or_partial"
]);

const lineageSchema = z
  .object({
    engine: engineSchema,
    disposition: z.literal("self"),
    observation_count: z.number().int().positive(),
    source_run_id: z.string().min(1),
    source_phase: z.literal("production"),
    source_archive_sha256: sha256Schema,
    capture_method_version: z.string().min(1),
    capture_config_sha256: sha256Schema,
    capture_git_commit: z.string().min(1),
    provider_setting_sha256: sha256Schema,
    started_at: z.string().datetime(),
    finished_at: z.string().datetime()
  })
  .strict();

const manifestSchema = z
  .object({
    benchmark_name: z.string().min(1),
    edition: z.string().min(1),
    run_id: z.string().min(1),
    phase: z.literal("production"),
    started_at: z.string().datetime(),
    finished_at: z.string().datetime(),
    method_version: z.string().min(1),
    capture_method_version: z.string().min(1),
    processing_method_version: z.string().min(1),
    source_run_id: z.string().min(1),
    source_archive_sha256: sha256Schema,
    corpus_version: z.string().min(1),
    cohort_version: z.string().min(1),
    matcher_version: z.string().min(1),
    config_sha256: sha256Schema,
    registry_sha256: sha256Schema,
    git_commit: z.string().min(1),
    git_dirty: z.literal(false),
    processing_commit: z.string().min(1),
    processing_git_dirty: z.literal(false),
    processing_config_sha256: sha256Schema,
    provider_models: z.record(engineSchema, z.string().min(1)),
    planned_observations: z.number().int().positive(),
    valid_observations: z.number().int().nonnegative(),
    invalid_observations: z.number().int().nonnegative(),
    null_observations: z.number().int().nonnegative(),
    firm_count: z.number().int().positive(),
    archive_sha256: sha256Schema,
    package_status: z.literal("qa_reviewed_candidate"),
    band_thresholds_approved: z.literal(false),
    firm_bands_allowed: z.literal(false),
    firm_bands_recommendation: z.literal("use_sector_report"),
    publication_mode: z.literal("sector_report_only"),
    signal: z
      .object({
        classification: z.literal("sparse"),
        firm_count: z.number().int().positive(),
        firms_with_majority_evidence: z.number().int().nonnegative(),
        firms_with_majority_evidence_rate: z.number().min(0).max(1),
        firms_with_repeated_majority_evidence: z.number().int().nonnegative(),
        majority_observed_cell_range: z.number().int().nonnegative(),
        reason: z.string().min(1),
        stable_present_cells: z.number().int().nonnegative(),
        variable_cells: z.number().int().nonnegative()
      })
      .strict(),
    source_manifest_sha256: sha256Schema,
    qa_template_sha256: sha256Schema,
    qa_decisions_sha256: sha256Schema,
    capture_mode: z.literal("fresh_homogeneous_production"),
    instrument_only: z.literal(false),
    production_reuse_prohibited: z.literal(false),
    capture_counts: z
      .object({
        fresh: z.number().int().positive(),
        total: z.number().int().positive(),
        by_engine: z.record(engineSchema, z.number().int().positive())
      })
      .strict(),
    lineage: z.array(lineageSchema),
    files: z.record(z.string().min(1), sha256Schema)
  })
  .passthrough();

const observationSchema = z
  .object({
    phase: z.literal("production"),
    run_date: runDateSchema,
    method_version: z.string().min(1),
    capture_method_version: z.string().min(1),
    processing_method_version: z.string().min(1),
    source_run_id: z.string().min(1),
    source_archive_sha256: sha256Schema,
    corpus_version: z.string().min(1),
    cohort_version: z.string().min(1),
    matcher_version: z.string().min(1),
    query_id: z.string().min(1),
    query_text: z.string().min(1),
    intent_group: z.string().min(1),
    locale: z.string().min(1),
    engine: engineSchema,
    provider: engineSchema,
    repetition: repetitionSchema,
    model: z.string().min(1),
    tool_surface: z.string().min(1),
    valid_grounded_response: z.boolean(),
    grounding_invoked: z.boolean(),
    recoverable_source: z.boolean(),
    sources_count: z.number().int().nonnegative(),
    error_category: z.string().min(1).nullable(),
    attempt_count: z.number().int().positive(),
    selected_attempt: z.number().int().positive(),
    cost_usd: z.number().nonnegative(),
    cost_gbp_upper_bound: z.number().nonnegative(),
    cost_currency: z.literal("USD"),
    cost_estimate_basis: z.string().min(1),
    search_queries_count: z.number().int().nonnegative().nullable()
  })
  .strict();

const firmEvidenceSchema = z
  .object({
    phase: z.literal("production"),
    run_date: runDateSchema,
    query_id: z.string().min(1),
    intent_group: z.string().min(1),
    locale: z.string().min(1),
    engine: engineSchema,
    repetition: repetitionSchema,
    model: z.string().min(1),
    valid_grounded_response: z.boolean(),
    firm_id: z.string().min(1),
    display_name: z.string().min(1),
    canonical_domain: z.string().min(1),
    named_in_answer: nullableBooleanSchema,
    matched_name_or_alias: z.string().min(1).nullable(),
    cited_domain: nullableBooleanSchema,
    matched_domain: z.string().min(1).nullable(),
    citation_url: z.string().url().nullable(),
    source_only: nullableBooleanSchema,
    observed: nullableBooleanSchema,
    match_status: z.string().min(1).nullable(),
    ambiguous_terms: z.array(z.string().min(1))
  })
  .strict();

const cellSchema = z
  .object({
    firm_id: z.string().min(1),
    display_name: z.string().min(1),
    canonical_domain: z.string().min(1),
    query_id: z.string().min(1),
    engine: engineSchema,
    valid_repetitions: z.number().int().min(0).max(3),
    named_in_answer_positive_repetitions: z.number().int().min(0).max(3),
    named_in_answer_state: stabilityStateSchema,
    majority_named_in_answer: nullableBooleanSchema,
    cited_domain_positive_repetitions: z.number().int().min(0).max(3),
    cited_domain_state: stabilityStateSchema,
    majority_cited_domain: nullableBooleanSchema,
    source_only_positive_repetitions: z.number().int().min(0).max(3),
    source_only_state: stabilityStateSchema,
    majority_source_only: nullableBooleanSchema,
    observed_positive_repetitions: z.number().int().min(0).max(3),
    observed_state: stabilityStateSchema,
    majority_observed: nullableBooleanSchema
  })
  .strict();

const perEngineSummarySchema = z
  .object({
    engine: engineSchema,
    complete_query_denominator: z.number().int().nonnegative(),
    majority_observed_cells: z.number().int().nonnegative(),
    majority_named_cells: z.number().int().nonnegative(),
    majority_cited_cells: z.number().int().nonnegative()
  })
  .strict();

const firmSummarySchema = z
  .object({
    firm_id: z.string().min(1),
    display_name: z.string().min(1),
    canonical_domain: z.string().min(1),
    valid_observation_denominator: z.number().int().nonnegative(),
    named_observations: z.number().int().nonnegative(),
    cited_domain_observations: z.number().int().nonnegative(),
    source_only_observations: z.number().int().nonnegative(),
    observed_observations: z.number().int().nonnegative(),
    complete_cell_denominator: z.number().int().nonnegative(),
    majority_observed_cells: z.number().int().nonnegative(),
    majority_named_cells: z.number().int().nonnegative(),
    majority_cited_cells: z.number().int().nonnegative(),
    query_breadth: z.number().int().nonnegative(),
    query_breadth_denominator: z.number().int().nonnegative(),
    engine_breadth: z.number().int().nonnegative(),
    engine_breadth_denominator: z.number().int().nonnegative(),
    stable_present_cells: z.number().int().nonnegative(),
    variable_cells: z.number().int().nonnegative(),
    stable_absent_cells: z.number().int().nonnegative(),
    per_engine: z.array(perEngineSummarySchema)
  })
  .strict();

const observationsSchema = z.array(observationSchema);
const firmEvidenceRowsSchema = z.array(firmEvidenceSchema);
const cellsSchema = z.array(cellSchema);
const firmSummariesSchema = z.array(firmSummarySchema);

export type ResearchManifest = z.infer<typeof manifestSchema>;
export type ResearchObservation = z.infer<typeof observationSchema>;
export type ResearchFirmEvidence = z.infer<typeof firmEvidenceSchema>;
export type ResearchCell = z.infer<typeof cellSchema>;
export type ResearchFirmSummary = z.infer<typeof firmSummarySchema>;

export type PublicResearchDataset = {
  manifest: ResearchManifest;
  observations: ResearchObservation[];
  firmEvidence: ResearchFirmEvidence[];
  cells: ResearchCell[];
  firmSummaries: ResearchFirmSummary[];
};

export type PublicStabilityState =
  | "stable-present"
  | "variable"
  | "not-observed"
  | "not-measured";

export type ResearchEditionViewModel = {
  headlineFinding: string;
  validResponseSummary: string;
  runWindow: string;
  preparedForReview: string;
  stats: Array<{ label: string; value: string; detail?: string }>;
  queries: Array<{
    id: string;
    label: string;
    intentGroup: string;
    locale: string;
    cells: Array<{
      engine: ResearchEngineId;
      status: "grounded" | "invalid" | "not-measured";
      stability: PublicStabilityState;
      validCount: number;
      totalCount: number;
    }>;
  }>;
  engines: Array<{
    name: ResearchEngineId;
    observedCount: number;
    validCount: number;
    totalCount: number;
    interpretation: string;
  }>;
  rows: Array<{
    firmId: string;
    firmName: string;
    firmDomain: string;
    namedObservations: { count: number; denominator: number };
    citedDomainObservations: { count: number; denominator: number };
    sourceOnlyObservations: { count: number; denominator: number };
    queryBreadth: { count: number; denominator: number };
    engineBreadth: { count: number; denominator: number };
    visibilityState: "observed" | "not-observed" | "partial";
    resultState:
      | "named-repeated"
      | "website-cited-repeated"
      | "appeared-not-repeated"
      | "no-appearance"
      | "incomplete";
    stability: PublicStabilityState;
    repeatedEvidence: Array<{
      queryId: string;
      question: string;
      engine: ResearchEngineId;
      namedCount: number;
      citedCount: number;
      sourceOnlyCount: number;
      validCount: number;
    }>;
    isolatedEvidence: Array<{
      queryId: string;
      question: string;
      engine: ResearchEngineId;
      namedCount: number;
      citedCount: number;
      sourceOnlyCount: number;
      validCount: number;
    }>;
    perEngine: Array<{
      engine: ResearchEngineId;
      status: "observed" | "not-observed" | "invalid" | "not-measured";
      observedCount: number;
      validCount: number;
      totalCount: number;
    }>;
  }>;
  downloads: Array<{
    label: string;
    href: string;
    format: string;
    version: string;
    lastUpdated: string;
    description: string;
  }>;
};

export type ResearchEditionLoadResult =
  | {
      status: "available";
      edition: ResearchEditionDefinition;
      dataset: PublicResearchDataset;
      view: ResearchEditionViewModel;
    }
  | {
      status: "unavailable";
      edition: ResearchEditionDefinition;
      reason: "missing" | "invalid";
      message: string;
    };

const REQUIRED_JSON_FILES = [
  "observations.json",
  "firm_evidence.json",
  "cells.json",
  "firm_summary.json"
] as const;

const PUBLIC_DOWNLOAD_FILES = [
  ...REQUIRED_JSON_FILES,
  "observations.csv",
  "firm_evidence.csv",
  "cells.csv",
  "firm_summary.csv"
] as const;

const ALLOWED_PACKAGE_FILES = new Set<string>(PUBLIC_DOWNLOAD_FILES);

const UK_FINANCIAL_ADVICE_PACKAGE = {
  directory: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026"
  ),
  manifest: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026",
    "manifest.json"
  ),
  observations: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026",
    "observations.json"
  ),
  firmEvidence: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026",
    "firm_evidence.json"
  ),
  cells: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026",
    "cells.json"
  ),
  firmSummary: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "data",
    "research",
    "uk-financial-advice-2026",
    "firm_summary.json"
  ),
  publicDownloadDirectory: path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "public",
    "research-data",
    "uk-financial-advice-2026"
  )
} as const;

type ResearchPackagePaths = typeof UK_FINANCIAL_ADVICE_PACKAGE;

class ResearchDataError extends Error {}

function sha256(data: Buffer) {
  return createHash("sha256").update(data).digest("hex");
}

function parseJson(buffer: Buffer, filename: string): unknown {
  try {
    return JSON.parse(buffer.toString("utf8"));
  } catch {
    throw new ResearchDataError(`${filename} is not valid JSON`);
  }
}

function assertEqual(actual: unknown, expected: unknown, message: string): asserts actual {
  if (actual !== expected) {
    throw new ResearchDataError(message);
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(date));
}

function formatRunWindow(start: string, finish: string) {
  const startDate = formatDate(start);
  const finishDate = formatDate(finish);
  return startDate === finishDate ? startDate : `${startDate}–${finishDate}`;
}

function mapStability(summary: ResearchFirmSummary): PublicStabilityState {
  if (summary.complete_cell_denominator === 0) return "not-measured";
  if (summary.variable_cells > 0) return "variable";
  if (summary.stable_present_cells > 0) return "stable-present";
  return "not-observed";
}

function validateManifest(
  manifest: ResearchManifest,
  edition: ResearchEditionDefinition
) {
  const { expected } = edition;
  assertEqual(manifest.benchmark_name, edition.franchise, "Unexpected benchmark name");
  assertEqual(manifest.edition, edition.title, "Unexpected benchmark edition");
  assertEqual(manifest.phase, "production", "Only a production package can be rendered");
  assertEqual(
    manifest.package_status,
    expected.packageStatus,
    "The production package has not completed deterministic QA review"
  );
  assertEqual(
    manifest.capture_mode,
    expected.captureMode,
    "Composite, refreshed or diagnostic captures cannot be rendered as publication data"
  );
  assertEqual(manifest.instrument_only, false, "Instrument-only data cannot be rendered");
  assertEqual(
    manifest.production_reuse_prohibited,
    false,
    "A package marked as prohibited for production reuse cannot be rendered"
  );
  assertEqual(manifest.source_run_id, manifest.run_id, "Production lineage must be self-contained");
  assertEqual(manifest.method_version, expected.methodVersion, "Unexpected method version");
  assertEqual(
    manifest.capture_method_version,
    expected.methodVersion,
    "Capture method differs from the frozen method"
  );
  assertEqual(
    manifest.processing_method_version,
    expected.methodVersion,
    "Processing method differs from the frozen method"
  );
  assertEqual(manifest.matcher_version, expected.matcherVersion, "Unexpected matcher version");
  assertEqual(manifest.corpus_version, expected.corpusVersion, "Unexpected corpus version");
  assertEqual(manifest.cohort_version, expected.cohortVersion, "Unexpected cohort version");
  assertEqual(manifest.firm_count, expected.firmCount, "Unexpected cohort size");
  assertEqual(
    manifest.signal.firm_count,
    manifest.firm_count,
    "Signal summary identifies another cohort"
  );

  const planned = expected.queryCount * expected.engines.length * expected.repetitions;
  const perEngine = expected.queryCount * expected.repetitions;
  assertEqual(manifest.planned_observations, planned, "Unexpected production observation count");
  assertEqual(manifest.capture_counts.fresh, planned, "Every production observation must be fresh");
  assertEqual(manifest.capture_counts.total, planned, "Production capture is incomplete");

  const providerKeys = Object.keys(manifest.provider_models).sort();
  assertEqual(
    providerKeys.join("|"),
    [...expected.engines].sort().join("|"),
    "Production package has an unexpected engine set"
  );
  for (const engine of expected.engines) {
    assertEqual(
      manifest.capture_counts.by_engine[engine],
      perEngine,
      `Production capture is incomplete for ${engine}`
    );
  }

  assertEqual(manifest.lineage.length, expected.engines.length, "Production lineage is incomplete");
  for (const engine of expected.engines) {
    const lineage = manifest.lineage.find((item) => item.engine === engine);
    if (!lineage) throw new ResearchDataError(`Production lineage is missing ${engine}`);
    assertEqual(lineage.source_run_id, manifest.run_id, "Production lineage identifies another run");
    assertEqual(
      lineage.source_archive_sha256,
      manifest.source_archive_sha256,
      "Production lineage identifies another archive"
    );
    assertEqual(lineage.observation_count, perEngine, `Unexpected ${engine} lineage count`);
  }

  const packageFiles = Object.keys(manifest.files);
  if (packageFiles.some((filename) => !ALLOWED_PACKAGE_FILES.has(filename))) {
    throw new ResearchDataError("The package advertises a raw or unsupported public file");
  }
  for (const filename of REQUIRED_JSON_FILES) {
    if (!manifest.files[filename]) {
      throw new ResearchDataError(`The package is missing ${filename}`);
    }
  }
}

function validateDatasetGrid(
  dataset: PublicResearchDataset,
  edition: ResearchEditionDefinition
) {
  const { manifest, observations, firmEvidence, cells, firmSummaries } = dataset;
  const { expected } = edition;
  const planned = expected.queryCount * expected.engines.length * expected.repetitions;
  assertEqual(observations.length, planned, "Processed observation grid is incomplete");

  const observationKeys = new Set<string>();
  const queryMetadata = new Map<string, string>();
  for (const row of observations) {
    assertEqual(row.method_version, manifest.method_version, "Observation method version drifted");
    assertEqual(row.matcher_version, manifest.matcher_version, "Observation matcher version drifted");
    assertEqual(row.corpus_version, manifest.corpus_version, "Observation corpus version drifted");
    assertEqual(row.cohort_version, manifest.cohort_version, "Observation cohort version drifted");
    assertEqual(row.source_run_id, manifest.run_id, "Observation came from another run");
    assertEqual(
      row.source_archive_sha256,
      manifest.source_archive_sha256,
      "Observation came from another archive"
    );
    assertEqual(row.provider, row.engine, "Observation provider and engine differ");
    const key = `${row.query_id}|${row.engine}|${row.repetition}`;
    if (observationKeys.has(key)) throw new ResearchDataError(`Duplicate observation: ${key}`);
    observationKeys.add(key);
    const metadata = `${row.query_text}|${row.intent_group}|${row.locale}`;
    const previous = queryMetadata.get(row.query_id);
    if (previous && previous !== metadata) {
      throw new ResearchDataError(`Query metadata drifted for ${row.query_id}`);
    }
    queryMetadata.set(row.query_id, metadata);
  }
  assertEqual(queryMetadata.size, expected.queryCount, "Unexpected query count");

  for (const queryId of queryMetadata.keys()) {
    for (const engine of expected.engines) {
      for (let repetition = 1; repetition <= expected.repetitions; repetition += 1) {
        if (!observationKeys.has(`${queryId}|${engine}|${repetition}`)) {
          throw new ResearchDataError(`Missing observation: ${queryId}|${engine}|${repetition}`);
        }
      }
    }
  }

  const validCount = observations.filter((row) => row.valid_grounded_response).length;
  assertEqual(manifest.valid_observations, validCount, "Manifest valid-response count drifted");
  assertEqual(
    manifest.invalid_observations,
    observations.length - validCount,
    "Manifest invalid-response count drifted"
  );
  assertEqual(
    manifest.null_observations,
    observations.length - validCount,
    "Manifest null-response count drifted"
  );

  const firmIds = new Set(firmSummaries.map((row) => row.firm_id));
  assertEqual(firmIds.size, expected.firmCount, "Firm summary does not match the cohort size");
  assertEqual(firmSummaries.length, expected.firmCount, "Firm summary contains duplicate firms");

  const expectedEvidenceRows = expected.firmCount * planned;
  assertEqual(firmEvidence.length, expectedEvidenceRows, "Reviewed firm evidence is incomplete");
  const evidenceKeys = new Set<string>();
  for (const row of firmEvidence) {
    if (!firmIds.has(row.firm_id)) throw new ResearchDataError("Evidence identifies an unknown firm");
    const observationKey = `${row.query_id}|${row.engine}|${row.repetition}`;
    if (!observationKeys.has(observationKey)) {
      throw new ResearchDataError("Firm evidence identifies an unknown observation");
    }
    const key = `${row.firm_id}|${observationKey}`;
    if (evidenceKeys.has(key)) throw new ResearchDataError(`Duplicate firm evidence: ${key}`);
    evidenceKeys.add(key);
    if (row.match_status === "ambiguous") {
      throw new ResearchDataError("Unresolved ambiguous evidence cannot be rendered");
    }
  }

  const expectedCells = expected.firmCount * expected.queryCount * expected.engines.length;
  assertEqual(cells.length, expectedCells, "Reviewed stability cells are incomplete");
  const cellKeys = new Set<string>();
  for (const row of cells) {
    if (!firmIds.has(row.firm_id)) throw new ResearchDataError("Cell identifies an unknown firm");
    if (!queryMetadata.has(row.query_id)) throw new ResearchDataError("Cell identifies an unknown query");
    const key = `${row.firm_id}|${row.query_id}|${row.engine}`;
    if (cellKeys.has(key)) throw new ResearchDataError(`Duplicate stability cell: ${key}`);
    cellKeys.add(key);
  }
}

function buildViewModel(
  edition: ResearchEditionDefinition,
  dataset: PublicResearchDataset
): ResearchEditionViewModel {
  const { manifest, observations, firmEvidence, cells, firmSummaries } = dataset;
  const { expected } = edition;
  const planned = observations.length;
  const validCount = observations.filter((row) => row.valid_grounded_response).length;
  const observedFirms = firmSummaries.filter((row) => row.majority_observed_cells > 0).length;
  const runWindow = formatRunWindow(manifest.started_at, manifest.finished_at);

  const queryById = new Map(
    observations.map((row) => [
      row.query_id,
      { label: row.query_text, intentGroup: row.intent_group, locale: row.locale }
    ])
  );

  const queries = [...queryById.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([queryId, query]) => ({
      id: queryId,
      label: query.label,
      intentGroup: query.intentGroup,
      locale: query.locale,
      cells: expected.engines.map((engine) => {
        const engineObservations = observations.filter(
          (row) => row.query_id === queryId && row.engine === engine
        );
        const valid = engineObservations.filter((row) => row.valid_grounded_response).length;
        const firmCells = cells.filter(
          (row) => row.query_id === queryId && row.engine === engine
        );
        const hasVariable = firmCells.some((row) => row.observed_state === "variable");
        const hasStablePresent = firmCells.some((row) => row.observed_state === "stable_present");
        const stability: PublicStabilityState =
          valid < expected.repetitions
            ? "not-measured"
            : hasVariable
              ? "variable"
              : hasStablePresent
                ? "stable-present"
                : "not-observed";
        return {
          engine,
          status:
            valid === 0
              ? ("not-measured" as const)
              : valid === expected.repetitions
                ? ("grounded" as const)
                : ("invalid" as const),
          stability,
          validCount: valid,
          totalCount: expected.repetitions
        };
      })
    }));

  const engines = expected.engines.map((engine) => {
    const engineObservations = observations.filter((row) => row.engine === engine);
    const valid = engineObservations.filter((row) => row.valid_grounded_response).length;
    const observedObservationKeys = new Set(
      firmEvidence
        .filter((row) => row.engine === engine && row.observed === true)
        .map((row) => `${row.query_id}|${row.repetition}`)
    );
    const observed = observedObservationKeys.size;
    return {
      name: engine,
      observedCount: observed,
      validCount: valid,
      totalCount: engineObservations.length,
      interpretation: `${observed} of ${valid} valid grounded responses observed at least one cohort firm.`
    };
  });

  const rows = firmSummaries
    .map((summary) => {
      const partial =
        summary.complete_cell_denominator < expected.queryCount * expected.engines.length;
      const firmCells = cells.filter((cell) => cell.firm_id === summary.firm_id);
      const mapEvidenceDetail = (cell: ResearchCell) => ({
        queryId: cell.query_id,
        question: queryById.get(cell.query_id)?.label ?? cell.query_id,
        engine: cell.engine,
        namedCount: cell.named_in_answer_positive_repetitions,
        citedCount: cell.cited_domain_positive_repetitions,
        sourceOnlyCount: cell.source_only_positive_repetitions,
        validCount: cell.valid_repetitions
      });
      const repeatedEvidence = firmCells
        .filter((cell) => cell.majority_observed === true)
        .map(mapEvidenceDetail);
      const isolatedEvidence = firmCells
        .filter(
          (cell) =>
            cell.majority_observed === false && cell.observed_positive_repetitions > 0
        )
        .map(mapEvidenceDetail);
      const perEngine = expected.engines.map((engine) => {
        const engineSummary = summary.per_engine.find((item) => item.engine === engine);
        if (!engineSummary) {
          return {
            engine,
            status: "not-measured" as const,
            observedCount: 0,
            validCount: 0,
            totalCount: expected.queryCount
          };
        }
        return {
          engine,
          status:
            engineSummary.complete_query_denominator < expected.queryCount
              ? ("invalid" as const)
              : engineSummary.majority_observed_cells > 0
                ? ("observed" as const)
                : ("not-observed" as const),
          observedCount: engineSummary.majority_observed_cells,
          validCount: engineSummary.complete_query_denominator,
          totalCount: expected.queryCount
        };
      });
      return {
        firmId: summary.firm_id,
        firmName: summary.display_name,
        firmDomain: summary.canonical_domain,
        namedObservations: {
          count: summary.named_observations,
          denominator: summary.valid_observation_denominator
        },
        citedDomainObservations: {
          count: summary.cited_domain_observations,
          denominator: summary.valid_observation_denominator
        },
        sourceOnlyObservations: {
          count: summary.source_only_observations,
          denominator: summary.valid_observation_denominator
        },
        queryBreadth: {
          count: summary.query_breadth,
          denominator: summary.query_breadth_denominator
        },
        engineBreadth: {
          count: summary.engine_breadth,
          denominator: summary.engine_breadth_denominator
        },
        visibilityState: partial
          ? ("partial" as const)
          : summary.majority_observed_cells > 0
            ? ("observed" as const)
            : ("not-observed" as const),
        resultState: partial
          ? ("incomplete" as const)
          : summary.majority_named_cells > 0
            ? ("named-repeated" as const)
            : summary.majority_cited_cells > 0
              ? ("website-cited-repeated" as const)
              : summary.observed_observations > 0
                ? ("appeared-not-repeated" as const)
                : ("no-appearance" as const),
        stability: mapStability(summary),
        repeatedEvidence,
        isolatedEvidence,
        perEngine
      };
    })
    .sort((a, b) => a.firmName.localeCompare(b.firmName, "en-GB"));

  const downloads = [
    {
      label: "Package manifest",
      filename: "manifest.json",
      format: "JSON",
      description: "Run, method, QA, provenance and SHA-256 records for the reviewed package."
    },
    {
      label: "Processed observations",
      filename: "observations.csv",
      format: "CSV",
      description: "Query, engine, run date, validity and grounding metadata; no raw answer text."
    },
    {
      label: "Processed observations",
      filename: "observations.json",
      format: "JSON",
      description: "Query, engine, run date, validity and grounding metadata; no raw answer text."
    },
    {
      label: "Reviewed firm evidence",
      filename: "firm_evidence.csv",
      format: "CSV",
      description: "Reviewed named, cited-domain and source-only classifications."
    },
    {
      label: "Reviewed firm evidence",
      filename: "firm_evidence.json",
      format: "JSON",
      description: "Reviewed named, cited-domain and source-only classifications."
    },
    {
      label: "Query-engine cells",
      filename: "cells.csv",
      format: "CSV",
      description: "Three-repetition states and majority classifications with valid denominators."
    },
    {
      label: "Query-engine cells",
      filename: "cells.json",
      format: "JSON",
      description: "Three-repetition states and majority classifications with valid denominators."
    },
    {
      label: "Firm summary",
      filename: "firm_summary.csv",
      format: "CSV",
      description: "Sector-report evidence counts and valid denominators; no ranks or bands."
    },
    {
      label: "Firm summary",
      filename: "firm_summary.json",
      format: "JSON",
      description: "Sector-report evidence counts and valid denominators; no ranks or bands."
    }
  ]
    .filter(
      (download) =>
        download.filename === "manifest.json" || manifest.files[download.filename]
    )
    .map((download) => ({
      label: download.label,
      href: `${edition.publicDownloadBasePath}/${download.filename}`,
      format: download.format,
      version: manifest.method_version,
      lastUpdated: formatDate(manifest.finished_at),
      description: download.description
    }));

  return {
    headlineFinding: `Only ${observedFirms} of ${manifest.firm_count} firms showed any consistent AI search visibility.`,
    validResponseSummary: `${validCount} of ${planned} grounded responses were valid.`,
    runWindow,
    preparedForReview: formatDate(edition.preparedForReview),
    stats: [
      { label: "Cohort", value: String(manifest.firm_count), detail: edition.cohort.label },
      { label: "Valid responses", value: `${validCount}/${planned}`, detail: "Invalid responses remain null" },
      { label: "Engine coverage", value: String(expected.engines.length), detail: "Three independent repetitions" },
      { label: "Firms observed", value: `${observedFirms}/${manifest.firm_count}`, detail: "Appeared in at least two of three repeated answers" }
    ],
    queries,
    engines,
    rows,
    downloads
  };
}

async function readVerifiedPackage(
  packagePaths: ResearchPackagePaths,
  edition: ResearchEditionDefinition
): Promise<PublicResearchDataset> {
  const manifestBuffer = await readFile(
    /* turbopackIgnore: true */ packagePaths.manifest
  );
  const manifest = manifestSchema.parse(parseJson(manifestBuffer, "manifest.json"));
  validateManifest(manifest, edition);

  const buffers = await Promise.all(
    ([
      ["observations.json", packagePaths.observations],
      ["firm_evidence.json", packagePaths.firmEvidence],
      ["cells.json", packagePaths.cells],
      ["firm_summary.json", packagePaths.firmSummary]
    ] as const).map(async ([filename, filenamePath]) => {
      const buffer = await readFile(/* turbopackIgnore: true */ filenamePath);
      if (sha256(buffer) !== manifest.files[filename]) {
        throw new ResearchDataError(`${filename} does not match the reviewed package manifest`);
      }
      return [filename, buffer] as const;
    })
  );
  const files = Object.fromEntries(buffers);
  const dataset: PublicResearchDataset = {
    manifest,
    observations: observationsSchema.parse(parseJson(files["observations.json"], "observations.json")),
    firmEvidence: firmEvidenceRowsSchema.parse(
      parseJson(files["firm_evidence.json"], "firm_evidence.json")
    ),
    cells: cellsSchema.parse(parseJson(files["cells.json"], "cells.json")),
    firmSummaries: firmSummariesSchema.parse(
      parseJson(files["firm_summary.json"], "firm_summary.json")
    )
  };
  validateDatasetGrid(dataset, edition);

  for (const filename of PUBLIC_DOWNLOAD_FILES) {
    const expectedHash = manifest.files[filename];
    if (!expectedHash) {
      throw new ResearchDataError(`Reviewed package does not declare ${filename}`);
    }
    const filenamePath = path.join(packagePaths.publicDownloadDirectory, filename);
    const downloadBuffer = await readFile(/* turbopackIgnore: true */ filenamePath);
    if (sha256(downloadBuffer) !== expectedHash) {
      throw new ResearchDataError(`${filename} public download does not match the reviewed package`);
    }
  }
  const publicManifest = await readFile(
    /* turbopackIgnore: true */ path.join(packagePaths.publicDownloadDirectory, "manifest.json")
  );
  if (!publicManifest.equals(manifestBuffer)) {
    throw new ResearchDataError("manifest.json public download does not match the reviewed package");
  }
  return dataset;
}

function packagePaths(edition: ResearchEditionDefinition): ResearchPackagePaths {
  if (edition.slug !== "uk-financial-advice-2026") {
    throw new ResearchDataError(`No package directory is configured for ${edition.slug}`);
  }
  return UK_FINANCIAL_ADVICE_PACKAGE;
}

export async function loadResearchEdition(slug: string): Promise<ResearchEditionLoadResult | null> {
  const edition = getResearchEditionDefinition(slug);
  if (!edition) return null;

  let paths: ResearchPackagePaths;
  try {
    paths = packagePaths(edition);
    const packageStat = await stat(/* turbopackIgnore: true */ paths.directory);
    if (!packageStat.isDirectory()) throw new ResearchDataError("Research package is not a directory");
  } catch {
    return {
      status: "unavailable",
      edition,
      reason: "missing",
      message: "The reviewed production evidence package has not been attached to this build."
    };
  }

  try {
    const dataset = await readVerifiedPackage(paths, edition);
    return {
      status: "available",
      edition,
      dataset,
      view: buildViewModel(edition, dataset)
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Research package rejected:", error);
    }
    return {
      status: "unavailable",
      edition,
      reason: "invalid",
      message:
        "The attached evidence package did not pass the production, review and integrity checks required for publication."
    };
  }
}
