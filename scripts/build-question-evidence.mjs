import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const websiteRoot = process.cwd();
const editionDirectory = path.join(
  websiteRoot,
  "data",
  "research",
  "uk-financial-advice-2026"
);
const trackerRoot =
  process.env.AI_VISIBILITY_TRACKER_ROOT ??
  "/Users/jaymebaggio/Desktop/Studio Baggio/AI Visibility Tracker-benchmark";
const runId = "20260730-uk-financial-advice-market-panel-v2";
const privateRunDirectory = path.join(
  trackerRoot,
  "runs",
  "sector",
  "private",
  "production",
  runId
);

const [manifest, observations, firmEvidence, config] = await Promise.all([
  readJson(path.join(editionDirectory, "manifest.json")),
  readJson(path.join(editionDirectory, "observations.json")),
  readJson(path.join(editionDirectory, "firm_evidence.json")),
  readJson(path.join(privateRunDirectory, "snapshots", "config.json"))
]);

if (manifest.run_id !== runId) {
  throw new Error(`Expected ${runId}, received ${manifest.run_id}`);
}

const selectedAttemptByObservation = new Map(
  observations.map((row) => [
    observationKey(row.query_id, row.engine, row.repetition),
    row.selected_attempt
  ])
);
const evidenceByObservation = new Map();

for (const row of firmEvidence) {
  const key = observationKey(row.query_id, row.engine, row.repetition);
  const bucket = evidenceByObservation.get(key) ?? [];
  bucket.push(row);
  evidenceByObservation.set(key, bucket);
}

const questions = [];
for (const query of config.queries) {
  const engines = [];
  for (const engine of ["openai", "gemini", "perplexity"]) {
    const namedFirms = new Map();
    const citedPanelFirms = new Map();
    const sourceDomains = new Map();
    let validAnswers = 0;

    for (let repetition = 1; repetition <= 3; repetition += 1) {
      const key = observationKey(query.query_id, engine, repetition);
      const observation = observations.find(
        (row) =>
          row.query_id === query.query_id &&
          row.engine === engine &&
          row.repetition === repetition
      );
      if (!observation?.valid_grounded_response) continue;
      validAnswers += 1;

      const rows = evidenceByObservation.get(key) ?? [];
      for (const row of rows) {
        if (row.named_in_answer) increment(namedFirms, row.display_name);
        if (row.cited_domain) increment(citedPanelFirms, row.display_name);
      }

      const selectedAttempt = selectedAttemptByObservation.get(key);
      if (!selectedAttempt) throw new Error(`No selected attempt for ${key}`);
      const attemptDirectory = path.join(
        privateRunDirectory,
        "attempts",
        query.query_id,
        engine,
        `repetition-${String(repetition).padStart(2, "0")}`
      );
      const attemptFiles = await readdir(attemptDirectory);
      const attemptFilename = attemptFiles.find((filename) =>
        filename.startsWith(`attempt-${String(selectedAttempt).padStart(2, "0")}.`)
      );
      if (!attemptFilename) throw new Error(`Selected attempt file missing for ${key}`);
      const attempt = await readJson(path.join(attemptDirectory, attemptFilename));
      const domainsInAnswer = new Set(
        (attempt.result?.sources ?? [])
          .map((source) => normaliseDomain(source.domain))
          .filter(Boolean)
      );
      for (const domain of domainsInAnswer) increment(sourceDomains, domain);
    }

    engines.push({
      engine,
      validAnswers,
      namedPanelFirms: sortCounts(namedFirms, "name"),
      citedPanelFirms: sortCounts(citedPanelFirms, "name"),
      sources: sortCounts(sourceDomains, "domain")
    });
  }

  questions.push({
    id: query.query_id,
    text: query.text,
    intentGroup: query.intent_group,
    locale: query.locale,
    includedInPrimary: query.query_id !== "FA-SN-04",
    engines
  });
}

const output = {
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceRunId: manifest.run_id,
  sourceArchiveSha256: manifest.source_archive_sha256,
  questions
};

await writeFile(
  path.join(editionDirectory, "question_evidence.json"),
  `${JSON.stringify(output, null, 2)}\n`,
  "utf8"
);

function observationKey(queryId, engine, repetition) {
  return `${queryId}|${engine}|${repetition}`;
}

function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function normaliseDomain(domain) {
  return String(domain ?? "")
    .trim()
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/\.$/, "");
}

function sortCounts(map, labelKey) {
  return [...map.entries()]
    .map(([label, answers]) => ({ [labelKey]: label, answers }))
    .sort((a, b) => b.answers - a.answers || a[labelKey].localeCompare(b[labelKey], "en-GB"));
}

async function readJson(filename) {
  return JSON.parse(await readFile(filename, "utf8"));
}
