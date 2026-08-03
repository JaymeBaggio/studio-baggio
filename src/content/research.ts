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
  pageUpdatedAt?: string;
  supersededBy?: string;
  geography: string;
  sector: string;
  cadence: string;
  packageDirectory: string;
  publicDownloadBasePath: string;
  primaryAnalysis: {
    includedQuestionCount: number;
    includedAnswerCount: number;
    excludedQueryIds: readonly string[];
    exclusionReason: string;
  };
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
  name: "The Studio Baggio AI Discovery Study",
  title: "Research",
  description:
    "Reproducible evidence on how expert-led firms appear in grounded AI search answers.",
  methodologyPrinciple:
    "The study reports semantically verified candidate shortlists by question and scenario. It does not score adviser quality, suitability or total UK market visibility."
} as const;

const ukFinancialAdvice2026: ResearchEditionDefinition = {
  slug: "uk-financial-advice-2026",
  franchise: researchFranchise.name,
  title: "UK Financial Advice 2026",
  metaTitle: "93 of the UK's top 150 financial advice firms were invisible in AI search",
  metaDescription:
    "Across 450 answers, AI relied on a narrow source ecosystem while 93 of 150 established UK financial advice firms remained invisible.",
  summary:
    "A 50-question investigation found that AI used a narrow source ecosystem while much of the established UK advice market remained invisible.",
  preparedForReview: "2026-07-31",
  pageUpdatedAt: "2026-08-03",
  publicationStatus: "published",
  statusLabel: "Published",
  geography: "United Kingdom",
  sector: "Financial advice",
  cadence: "Dated edition; the evidence does not update continuously.",
  packageDirectory: "data/research/uk-financial-advice-2026",
  publicDownloadBasePath: "/research-data/uk-financial-advice-2026",
  primaryAnalysis: {
    includedQuestionCount: 25,
    includedAnswerCount: 225,
    excludedQueryIds: [],
    exclusionReason:
      "The five matched local questions are reported separately and never enter the 20-question national summary."
  },
  expected: {
    packageStatus: "qa_reviewed_candidate",
    captureMode: "fresh_homogeneous_production",
    methodVersion: "fa-firm-selection-method-0.3",
    matcherVersion: "fa-semantic-review-0.3",
    corpusVersion: "fa-queries-0.3",
    cohortVersion: "uk-financial-advice-market-panel-2026-07-30",
    firmCount: 150,
    queryCount: 25,
    repetitions: 3,
    engines: RESEARCH_ENGINE_IDS
  },
  cohort: {
    label: "150-firm UK financial-advice market panel",
    source: "FTAdviser 2025 lists, FCA identity evidence and current market sources",
    sourceUrl: "https://2025-fta-top100.ftadviser.com/",
    snapshotDate: "2026-07-30",
    inclusionRule:
      "The frozen panel contains 91 eligible consumer-facing brands from FTAdviser's 2025 Top 100, nine direct-consumer boutique replacements, 25 additional national brands and 25 regional or specialist firms. Every active brand passed the same domain, legal-entity and FCA-relationship checks.",
    disclosure:
      "FTAdviser, the FCA and the other sources used to construct and verify the panel did not sponsor, review or endorse this study. The panel is designed to cover recognisable national firms alongside regional and specialist practices; it is not a list of the UK's 150 largest advisers or a census of FCA-authorised firms."
  },
  method: {
    overview:
      "The same frozen set of 25 buyer questions was run three times on each of three grounded AI search engines, producing 225 valid answers. One national-firm question was excluded from the primary UK analysis because the wording omitted the country and four answers drifted outside the UK, leaving 24 questions and 216 answers for the published findings. Every answer remains preserved in the full capture and was evaluated against the same frozen 150-firm registry.",
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
        formula: "Distinct queries with a repeat-confirmed appearance ÷ queries with complete cells"
      },
      {
        measure: "Engine breadth",
        formula: "Engines with a repeat-confirmed appearance ÷ engines with complete cells"
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
      "The cohort is a deliberately constructed market panel. It is neither a ranking of the UK's 150 largest advisers nor a list of every UK advice firm.",
      "The matcher measures the frozen 150-firm panel. Firms outside the panel can appear in an answer but do not enter the panel ranking.",
      "Observation is not a recommendation, quality judgement or measure of suitability for financial advice.",
      "Source-backed means that provider grounding evidence was recoverable; it does not by itself prove factual accuracy, jurisdictional relevance, suitability or buyer usefulness.",
      "The public evidence shows where firms appeared. Causal diagnosis and remediation are outside the study."
    ],
    disclosure:
      "Studio Baggio provides paid SEO and AI Search Opportunity Audits. Buying an audit cannot change a firm's inclusion, evidence or treatment in this study.",
    changeLog: [
      {
        version: "fa-market-panel-method-1.0",
        date: "2026-07-30",
        summary:
          "Corrected 150-firm market-panel edition using the frozen fa-queries-0.2 corpus, matcher 0.5, three independently resumable engine captures and full manual QA of positive and ambiguous matches."
      }
    ]
  },
  corrections: [
    {
      date: "2026-07-30",
      summary:
        "Excluded FA-SN-04 from the primary UK findings and firm rankings because the question text omitted 'UK' and four of its nine answers returned US or global firms. The full 225-answer capture remains preserved; the primary analysis contains 24 questions and 216 answers.",
      affectsHeadlineFinding: true,
      affectsFirmResults: true
    }
  ],
  auditCta: {
    title: "Get a clear view of your firm's AI search visibility and opportunities.",
    body:
      "The SEO and AI Search Opportunity Audit investigates the likely causes, identifies what to test and sets out what to do next.",
    href: "/contact?utm_source=research&utm_medium=study&utm_campaign=uk-financial-advice-2026&utm_content=audit-cta"
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
