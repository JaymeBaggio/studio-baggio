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

const SITEMAP = `https://${HOST}/sitemap.xml`;

// Every URL in the live sitemap, so new insights and reports are never left out.
async function loadUrlList() {
  const response = await fetch(SITEMAP);
  if (!response.ok) throw new Error(`Sitemap fetch failed: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

async function main() {
  const urlList = await loadUrlList();
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
