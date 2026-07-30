export const RESEARCH_ENGINE_IDS = ["openai", "gemini", "perplexity"] as const;

export type ResearchEngineId = (typeof RESEARCH_ENGINE_IDS)[number];

export type ResearchCorrection = {
  date: string;
  summary: string;
  affectsHeadlineFinding: boolean;
  affectsFirmResults: boolean;
};

export type ResearchEditionDefinition = {
  slug: string;
  franchise: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  preparedForReview: string;
  publicationStatus: "review" | "published" | "corrected" | "superseded";
  statusLabel: "Prepared for review" | "Published" | "Corrected edition" | "Superseded edition";
  publishedAt?: string;
  correctedAt?: string;
  supersededBy?: string;
  geography: string;
  sector: string;
  cadence: string;
  packageDirectory: string;
  publicDownloadBasePath: string;
  expected: {
    packageStatus: "qa_reviewed_candidate";
    captureMode: "fresh_homogeneous_production";
    methodVersion: string;
    matcherVersion: string;
    corpusVersion: string;
    cohortVersion: string;
    firmCount: number;
    queryCount: number;
    repetitions: number;
    engines: readonly ResearchEngineId[];
  };
  cohort: {
    label: string;
    source: string;
    sourceUrl: string;
    snapshotDate: string;
    inclusionRule: string;
    disclosure: string;
  };
  method: {
    overview: string;
    positiveRule: string;
    validityRule: string;
    repetitionRule: string;
    formulas: Array<{ measure: string; formula: string }>;
    stabilityDefinitions: Array<{ term: string; definition: string }>;
    publishedMeasures: string[];
    limitations: string[];
    disclosure: string;
    changeLog: Array<{ version: string; date: string; summary: string }>;
  };
  corrections: ResearchCorrection[];
  auditCta: {
    title: string;
    body: string;
    href: string;
  };
};

export const researchFranchise = {
  name: "The Studio Baggio AI Discovery Benchmark",
  title: "Research",
  description:
    "Reproducible evidence on how expert-led firms appear in grounded AI search answers.",
  methodologyPrinciple:
    "The benchmark reports where firms were observed. It does not rank firms, recommend advisers or diagnose why a result occurred."
} as const;

const ukFinancialAdvice2026: ResearchEditionDefinition = {
  slug: "uk-financial-advice-2026",
  franchise: researchFranchise.name,
  title: "UK Financial Advice 2026",
  metaTitle: "Studio Baggio AI Discovery Benchmark | UK Financial Advice 2026",
  metaDescription:
    "Evidence from a reproducible benchmark of grounded AI search visibility across UK financial advice firms.",
  summary:
    "A sector-level study of where UK financial advice firms are observed across repeated, grounded answers from three AI search engines.",
  preparedForReview: "2026-07-30",
  publicationStatus: "review",
  statusLabel: "Prepared for review",
  geography: "United Kingdom",
  sector: "Financial advice",
  cadence: "Dated edition; the evidence does not update continuously.",
  packageDirectory: "data/research/uk-financial-advice-2026",
  publicDownloadBasePath: "/research-data/uk-financial-advice-2026",
  expected: {
    packageStatus: "qa_reviewed_candidate",
    captureMode: "fresh_homogeneous_production",
    methodVersion: "fa-pilot-method-0.4",
    matcherVersion: "fa-matcher-0.2",
    corpusVersion: "fa-queries-0.1",
    cohortVersion: "cisi-afpf-2026-07-30",
    firmCount: 52,
    queryCount: 25,
    repetitions: 3,
    engines: RESEARCH_ENGINE_IDS
  },
  cohort: {
    label: "52 CISI Current Accredited Financial Planning Firms",
    source: "CISI Current Accredited Financial Planning Firms register",
    sourceUrl:
      "https://cisi.org/cisiweb2/cisi-website/who-we-are/accredited-financial-planning-firms",
    snapshotDate: "2026-07-30",
    inclusionRule:
      "Every active firm in the dated CISI register snapshot was included after legal-entity, regulatory and domain verification. Firms discovered elsewhere were not added to the measured cohort.",
    disclosure:
      "CISI did not sponsor, review or endorse this benchmark. Register-derived details remain subject to the publication review described in the methodology."
  },
  method: {
    overview:
      "The same preregistered set of 25 buyer questions was run three times on each of three grounded AI search engines. Every response was evaluated against one frozen cohort registry.",
    positiveRule:
      "A firm is observed when its verified name or alias appears in the answer, its verified domain is cited, or both. Source-only citations remain distinguishable from named observations.",
    validityRule:
      "A response is valid only when the provider returns recoverable grounding evidence. Ungrounded, incomplete or otherwise invalid responses are nulls and are never counted as absence.",
    repetitionRule:
      "Each query and engine combination has three independent repetitions. Majority counts require at least two positive repetitions in a complete three-repetition cell.",
    formulas: [
      {
        measure: "Named observation rate",
        formula: "Named observations ÷ valid grounded response denominator"
      },
      {
        measure: "Cited-domain observation rate",
        formula: "Cited-domain observations ÷ valid grounded response denominator"
      },
      {
        measure: "Query breadth",
        formula: "Distinct queries with a majority-positive cell ÷ queries with complete cells"
      },
      {
        measure: "Engine breadth",
        formula: "Engines with a majority-positive cell ÷ engines with complete cells"
      }
    ],
    stabilityDefinitions: [
      {
        term: "Stable present",
        definition: "The firm was observed in all three valid repetitions of a query and engine cell."
      },
      {
        term: "Variable",
        definition: "The firm was observed in one or two of three valid repetitions."
      },
      {
        term: "Not observed",
        definition: "The firm was observed in none of three valid repetitions."
      },
      {
        term: "Not measured",
        definition: "Fewer than three repetitions were valid, so no stability conclusion is shown."
      }
    ],
    publishedMeasures: [
      "Named observations with valid-response denominators",
      "Cited-domain observations with valid-response denominators",
      "Query breadth across complete query and engine cells",
      "Engine breadth across engines with complete cells",
      "Stable-present, variable and not-observed cell counts",
      "Engine-level response validity and observed-response counts"
    ],
    limitations: [
      "The edition is a dated snapshot, not a live market feed.",
      "AI search answers can vary between repetitions, users, locations and later model versions.",
      "These are grounded API measurements and are not presented as identical to consumer ChatGPT, Google AI Mode or Perplexity interfaces.",
      "The cohort is a reproducible published universe; it is not a list of every UK advice firm.",
      "Observation is not a recommendation, quality judgement or measure of suitability for financial advice.",
      "The public evidence shows where firms appeared. Causal diagnosis and remediation are outside the benchmark."
    ],
    disclosure:
      "Studio Baggio provides paid SEO and AI Search Opportunity Audits. Buying an audit cannot change a firm's inclusion, evidence or treatment in this benchmark.",
    changeLog: [
      {
        version: "fa-pilot-method-0.4",
        date: "2026-07-30",
        summary:
          "Production candidate method frozen after the instrument pilot, including the grounded-response and entity-conflict safeguards."
      }
    ]
  },
  corrections: [],
  auditCta: {
    title: "Understand what sits behind your result.",
    body:
      "Understand why your firm appears—or does not—and what to do next: SEO and AI Search Opportunity Audit.",
    href: "/contact?utm_source=research&utm_medium=benchmark&utm_campaign=uk-financial-advice-2026&utm_content=audit-cta"
  }
};

export const researchEditions = [ukFinancialAdvice2026] as const satisfies readonly ResearchEditionDefinition[];

export function getResearchEditionDefinition(slug: string) {
  return researchEditions.find((edition) => edition.slug === slug);
}

export function getResearchEditionPath(edition: ResearchEditionDefinition) {
  return `/research/${edition.slug}`;
}

export function getResearchMethodPath(edition: ResearchEditionDefinition) {
  return `${getResearchEditionPath(edition)}/method`;
}
