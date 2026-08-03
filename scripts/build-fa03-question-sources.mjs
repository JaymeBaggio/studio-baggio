import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const websiteRoot = process.cwd();
const editionDirectory = path.join(
  websiteRoot,
  "data",
  "research",
  "uk-financial-advice-2026"
);
const rawAnswersDirectory =
  process.env.FA03_RAW_ANSWERS_DIR ??
  "/Users/jaymebaggio/Desktop/Studio Baggio/AI Visibility Index/LOCKED_DATASETS/fa-queries-0.3-225-answers-2026-07-31/raw_answers";

const report = await readJson(path.join(editionDirectory, "fa03_report_data.json"));
const questionEvidence = [];
let observationCount = 0;

for (const question of report.question_views) {
  const sources = new Map();

  for (const answer of question.answers) {
    observationCount += 1;
    const rawAnswer = await readJson(
      path.join(rawAnswersDirectory, `${answer.observation_id}.json`)
    );
    if (
      rawAnswer.observation_id !== answer.observation_id ||
      rawAnswer.validity?.valid_grounded_response !== true
    ) {
      throw new Error(`Invalid raw answer for ${answer.observation_id}`);
    }

    const domainsInAnswer = new Map();
    for (const source of rawAnswer.result?.sources ?? []) {
      const domain = normaliseDomain(source.domain);
      if (!domain) continue;
      const existing = domainsInAnswer.get(domain) ?? new Set();
      if (isDirectSourceUrl(source.url, domain)) existing.add(source.url);
      domainsInAnswer.set(domain, existing);
    }

    for (const [domain, urls] of domainsInAnswer) {
      const entry = sources.get(domain) ?? {
        domain,
        answer_count: 0,
        providers: new Map(),
        urls: new Set()
      };
      entry.answer_count += 1;
      const provider = entry.providers.get(answer.provider) ?? {
        provider: answer.provider,
        answer_count: 0,
        repetitions: []
      };
      provider.answer_count += 1;
      provider.repetitions.push(answer.repetition);
      entry.providers.set(answer.provider, provider);
      for (const url of urls) entry.urls.add(url);
      sources.set(domain, entry);
    }
  }

  questionEvidence.push({
    query_id: question.query_id,
    sources: [...sources.values()]
      .map((source) => ({
        domain: source.domain,
        answer_count: source.answer_count,
        providers: [...source.providers.values()].sort(providerSort),
        urls: [...source.urls].sort((left, right) => left.localeCompare(right, "en-GB"))
      }))
      .sort(
        (left, right) =>
          right.answer_count - left.answer_count ||
          left.domain.localeCompare(right.domain, "en-GB")
      )
  });
}

if (observationCount !== 225 || questionEvidence.length !== 25) {
  throw new Error(
    `Expected 25 questions and 225 observations, received ${questionEvidence.length} and ${observationCount}`
  );
}

await writeFile(
  path.join(editionDirectory, "fa03_question_sources.json"),
  `${JSON.stringify(
    {
      version: 1,
      corpus_version: report.corpus_version,
      outputs_sha256: report.outputs_sha256,
      questions: questionEvidence
    },
    null,
    2
  )}\n`,
  "utf8"
);

function normaliseDomain(domain) {
  return String(domain ?? "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/\.$/, "");
}

function isDirectSourceUrl(value, domain) {
  if (!value) return false;
  try {
    const hostname = normaliseDomain(new URL(value).hostname);
    return hostname === domain || hostname.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

function providerSort(left, right) {
  const order = ["openai", "gemini", "perplexity"];
  return order.indexOf(left.provider) - order.indexOf(right.provider);
}

async function readJson(filename) {
  return JSON.parse(await readFile(filename, "utf8"));
}
