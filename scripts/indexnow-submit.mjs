// IndexNow submission script for studiobaggio.ai.
// Dependency-free. Posts the live URL list to the IndexNow API so participating
// search engines (Bing, Yandex and others) recrawl them promptly.
//
// Run with: npm run indexnow
//
// The key below must match the verification file at public/<key>.txt.

const KEY = "860f59e67128725e7268042497bfcbe0";
const HOST = "www.studiobaggio.ai";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const urlList = [
  "https://www.studiobaggio.ai/",
  "https://www.studiobaggio.ai/work",
  "https://www.studiobaggio.ai/insights",
  "https://www.studiobaggio.ai/about",
  "https://www.studiobaggio.ai/contact",
  "https://www.studiobaggio.ai/privacy",
  "https://www.studiobaggio.ai/insights/firecrawl-for-business",
  "https://www.studiobaggio.ai/insights/ai-adoption-value-gap",
  "https://www.studiobaggio.ai/insights/what-is-an-ai-skill",
  "https://www.studiobaggio.ai/insights/owned-vs-rented-audience",
  "https://www.studiobaggio.ai/insights/chatgpt-for-business-owners",
  "https://www.studiobaggio.ai/insights/ai-future-of-work",
  "https://www.studiobaggio.ai/insights/geo-generative-engine-optimisation",
  "https://www.studiobaggio.ai/insights/building-ai-operating-systems",
  "https://www.studiobaggio.ai/insights/ai-creative-summit-2025",
  "https://www.studiobaggio.ai/insights/ai-disruption-in-media-and-advertising",
  "https://www.studiobaggio.ai/insights/ai-predictions-2026",
  "https://www.studiobaggio.ai/insights/best-ai-tools-2025",
  "https://www.studiobaggio.ai/research",
  "https://www.studiobaggio.ai/research/uk-financial-advice-2026",
  "https://www.studiobaggio.ai/research/uk-law-2026"
];

async function main() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    console.log(`IndexNow responded with HTTP ${response.status} ${response.statusText}`);
    if (text) {
      console.log(`Response body: ${text}`);
    }
    console.log(`Submitted ${urlList.length} URLs.`);

    if (!response.ok) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error("IndexNow submission failed:", error);
    process.exitCode = 1;
  }
}

main();
