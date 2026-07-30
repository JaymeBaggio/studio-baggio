export type StabilityState =
  | "stable-present"
  | "variable"
  | "not-observed"
  | "not-measured";

export type CoverageStatus = "grounded" | "invalid" | "not-measured";

export type EvidenceEngineStatus = "observed" | "not-observed" | "invalid" | "not-measured";

export type EvidenceVisibilityState = "observed" | "not-observed" | "partial";

export type FirmResultState =
  | "named-repeated"
  | "website-cited-repeated"
  | "appeared-not-repeated"
  | "no-appearance"
  | "incomplete";

export type FirmEvidenceDetail = {
  queryId: string;
  question: string;
  engine: string;
  namedCount: number;
  citedCount: number;
  sourceOnlyCount: number;
  validCount: number;
};

export type ResearchEditionMasthead = {
  title: string;
  finding?: string;
  description?: string;
  sampleQuestions?: string[];
  eyebrow?: string;
  summary: string;
  publicationDate: string;
  dateLabel?: string;
  runWindow: string;
  methodVersion: string;
  status?: "prepared" | "current" | "corrected" | "superseded";
  statusDetail?: string;
};

export type ResearchStat = {
  label: string;
  value: string;
  detail?: string;
};

export type QueryCoverageCell = {
  engine: string;
  status: CoverageStatus;
  stability: StabilityState;
  validCount: number;
  totalCount: number;
};

export type QueryCoverageRow = {
  id: string;
  label: string;
  intentGroup: string;
  cells: QueryCoverageCell[];
};

export type EngineComparisonItem = {
  name: string;
  observedCount: number;
  validCount: number;
  totalCount: number;
  interpretation?: string;
};

export type EvidenceEngineResult = {
  engine: string;
  status: EvidenceEngineStatus;
  observedCount: number;
  validCount: number;
  totalCount: number;
};

export type EvidenceCount = {
  count: number;
  denominator: number;
};

export type EvidenceRow = {
  firmId: string;
  firmName: string;
  firmDomain: string;
  firmHref?: string;
  visibilityState: EvidenceVisibilityState;
  resultState: FirmResultState;
  stability: StabilityState;
  namedObservations: EvidenceCount;
  citedDomainObservations: EvidenceCount;
  sourceOnlyObservations: EvidenceCount;
  queryBreadth: EvidenceCount;
  engineBreadth: EvidenceCount;
  repeatedEvidence: FirmEvidenceDetail[];
  isolatedEvidence: FirmEvidenceDetail[];
  perEngine: EvidenceEngineResult[];
};

export type ResearchDownload = {
  label: string;
  href: string;
  format: "CSV" | "JSON" | string;
  version: string;
  lastUpdated: string;
  description?: string;
};

export type MethodStripItem = {
  label: string;
  href: string;
  detail: string;
};

const researchEngineLabels: Record<string, string> = {
  openai: "OpenAI",
  gemini: "Gemini",
  perplexity: "Perplexity"
};

export function researchEngineLabel(engine: string) {
  return researchEngineLabels[engine] ?? engine;
}
