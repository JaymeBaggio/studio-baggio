# Insights Content Inventory
*Created: 29 May 2026*

Purpose: working curation list for the Studio Baggio Insights section. This decides which Rough Cut pieces become individual website articles, which category each article belongs in, and which source pieces should stay as supporting material for now.

## Critical Copy Guardrail

The article body is not to be rewritten.

- Article pages must render the selected source text verbatim.
- Do not change wording, punctuation, spelling, line meaning, swearing, em dashes, examples or phrasing.
- Design work means redesigning the page shell around the article, not rewriting the article.
- If a Rough Cut source contains issue furniture, article numbers, slide labels or separators, keep them unless Jayme explicitly approves a specific packaging-removal rule.
- Metadata, category labels, previews, related links and diagrams are page furniture. They must not be treated as permission to edit the article body.

## Category Decision

Use a small set of visible categories on `/insights`.

Primary category chips:

- `Commercial Intelligence`
- `AI Adoption`
- `AI Skills`
- `AI Search`
- `Owned Media`
- `AI Products`

Working rule:

- Categories are for user navigation and article filtering.
- Tags can carry secondary nuance, for example `AI search`, `Firecrawl`, `operating models`, `public proof`, `skills`, `workflow`, `GEO`, `media` or `financial advisers`.
- Do not create indexable category pages until a category has enough depth. The first build should use category filters on `/insights`; optional `/insights/category/[slug]` pages can come later.

Why this set:

- It matches the locked index design without making the category strip heavy.
- It reflects the strongest Studio Baggio themes: public-web intelligence, practical AI adoption, AI skills, proof/authority, audience ownership and turning capability into assets.
- It avoids dated tool-news categories that will age quickly.

## Title And Refinement Rule

First pass:

- Use the original article titles Jayme already wrote.
- Keep the titles straightforward while the article library is being added.
- Do not rewrite titles into search-led versions before the full set is visible.
- Do not change any article body copy to make a title or SEO angle work.

Second pass:

- After the full article set is live, review the library as a whole.
- Then refine display titles, meta titles, descriptions, supporting components, diagrams, related links and internal links around business/search intent.
- Search-intent framing should make the value clearer for business owners, founders, consultants and expert buyers.
- Firecrawl can be reframed around using public web data to capture, enrich and qualify leads, plus the new importance of commercial judgement.
- The public-profile section inside the Firecrawl article can be framed around AI search visibility, public proof, machine-readable evidence and what now matters for professional credibility.
- Any title refinement must be approved as a page-furniture change; the article body remains verbatim.

## Launch Set

These are the articles worth putting on the site first. The current local build uses individual `/insights/[slug]` pages for the real article boundaries only. The public-profile section belongs inside the Firecrawl article and must not be published as its own route. `High performers think in operating systems, not tools` belongs inside the AI adoption article. `From skill to product` belongs inside the AI skills article.

## Locked Approved Article List

Jayme approved this list on 30 May 2026. These are the articles to add or keep on the site, using the original title and full source text. Do not rename, rewrite, summarise, split or merge them without explicit approval.

| Order | Article | Source | Status |
| --- | --- | --- | --- |
| 1 | Firecrawl just gave any business access to 96% of the open web | RC9 / RC10 source context | Live |
| 2 | AI adoption is high. Value is patchy. | RC6, including `High performers think in operating systems, not tools` | Live |
| - | High performers think in operating systems, not tools | RC6 | Folded into #2. Not a standalone article. |
| 4 | ChatGPT for Business Owners — If You Only Do 6 Things... | RC7 | Live |
| 5 | Reuters Institute’s Trends & Predictions 2026: What businesses should do next. | RC7 | Live |
| 6 | If your work happens on a screen, assume the shape of it is going to change | RC7.5 / `Something BIg is happening .pdf` | Live |
| 7 | A skill is an app without a user interface | RC8, including `/Last30Days Skill`, `From Skill to Product` and the launch-stack sections | Live |
| - | From skill to product | RC8 | Folded into #7. Not a standalone article. |
| 9 | Brands Lean into GEO For Visibility | RC2 | Live |
| 10 | AI SEO Framework | `Future Ideas/RC AI SEO Framework.pdf` | Live |
| 11 | Building AI Operating Systems in 2026 | `Downloaded source PDFs/Building AI Operating Systems in 2026.pdf` | Live |
| 12 | AI Creative Summit 2025 | `Downloaded source PDFs/AI Creative Summit 2025.pdf` | Live |
| 13 | The State of Play: AI Disruption in Media & Advertising | `Downloaded source PDFs/Future week AIIM.pdf` | Live |
| 14 | 2026 Predictions | RC6 | Live |
| 15 | Tools of the Year 2025 | RC6 | Live |

Priority review queue:

- Complete for the approved 13-article launch set.
- Next review queue should be for second-pass article enhancements: diagrams, internal links, metadata and any title refinements Jayme approves.

| Priority | Article | Category | Slug | Source | Build note |
| --- | --- | --- | --- | --- | --- |
| P0 | Firecrawl just gave any business access to 96% of the open web | Commercial Intelligence | `/insights/firecrawl-for-business` | RC9, RC10, follow-up PDF | Strongest first article. Preserve the full argument and add a Studio Baggio-native workflow diagram. |
| P0 | AI adoption is high. Value is patchy. | AI Adoption | `/insights/ai-adoption-value-gap` | RC6, voice reference | Core business article. Includes `High performers think in operating systems, not tools` as part of the same article. Do not split. |
| P0 | A skill is an app without a user interface | AI Skills | `/insights/what-is-an-ai-skill` | RC8 Skills Special | Core explainer for the Skills work. Includes `From skill to product` and the launch-stack sections as part of the same article. Do not split. |
| P1 | Reuters Institute’s Trends & Predictions 2026: What businesses should do next. | Owned Media | `/insights/owned-vs-rented-audience` | RC7, voice reference | Implemented as the launch owned media article. |
| P1 | ChatGPT for Business Owners — If You Only Do 6 Things... | AI Adoption | `/insights/chatgpt-for-business-owners` | RC7 | Implemented locally. Publish exact selected source text; no rewriting. |
| P1 | If your work happens on a screen, assume the shape of it is going to change | AI Adoption | `/insights/ai-future-of-work` | RC7.5, `Something BIg is happening .pdf` | Implemented locally. Uses the original full article/source, not split by slide/page. |
| P1 | Brands Lean into GEO For Visibility | AI Search | `/insights/geo-generative-engine-optimisation` | RC2 | Implemented locally. Publish exact selected source text; no rewriting. |
| P1 | AI SEO Framework | AI Search | `/insights/ai-seo-framework` | `Future Ideas/RC AI SEO Framework.pdf` | Implemented locally from the PDF source text. |
| P1 | Building AI Operating Systems in 2026 | AI Adoption | `/insights/building-ai-operating-systems` | `Downloaded source PDFs/Building AI Operating Systems in 2026.pdf` | Implemented locally from the PDF source text. |
| P1 | AI Creative Summit 2025 | Owned Media | `/insights/ai-creative-summit-2025` | `Downloaded source PDFs/AI Creative Summit 2025.pdf` | Live. PDF furniture removed; source signal/takeout structure preserved. |
| P1 | The State of Play: AI Disruption in Media & Advertising | Owned Media | `/insights/ai-disruption-in-media-and-advertising` | `Downloaded source PDFs/Future week AIIM.pdf` | Live. PDF furniture removed; source insight/takeout structure preserved. |
| P1 | 2026 Predictions | AI Adoption | `/insights/ai-predictions-2026` | RC6 | Implemented locally for third-party mentions and search surface. |
| P1 | Tools of the Year 2025 | AI Skills | `/insights/best-ai-tools-2025` | RC6 | Implemented locally for third-party/tool mentions and search surface. |

Recommended first build order:

1. Firecrawl just gave any business access to 96% of the open web.
2. AI adoption is high. Value is patchy.
3. ChatGPT for Business Owners — If You Only Do 6 Things...
4. The channels you rent can change overnight.
5. If your work happens on a screen, assume the shape of it is going to change.
6. A skill is an app without a user interface.
7. Brands Lean into GEO For Visibility.
8. AI SEO Framework.
9. Building AI Operating Systems in 2026.
10. 2026 Predictions.
11. Tools of the Year 2025.
12. AI Creative Summit 2025.
13. The State of Play: AI Disruption in Media & Advertising.

Current local status after adding the approved PDF articles:

- 13 article pages are live locally.
- No approved article pages remain to add in the current launch set.
- Recommended next move: do a second design/component enhancement pass across the full article library.

## Full Rough Cut Audit

This is the working allocation pass across the Rough Cut archive. It does not mean every piece should be published. It means every viable source piece has a home if Jayme decides to turn it into an individual article page.

Status key:

- `Live` = already implemented locally as an individual `/insights/[slug]` page.
- `Folded` = included inside the correct parent article and not a standalone route.
- `Next` = strong candidate for the next batch.
- `Later` = useful but lower priority, needs source selection, or may work better as a guide/playbook.
- `Support` = keep as supporting material only for now because it is dated, duplicate, too news-led, or too narrow for the Studio Baggio front door.

| Source | Article / piece | Category | Status | Notes |
| --- | --- | --- | --- | --- |
| RC2 | YouTube's Huge New Feature Updates for Creators | Owned Media | Support | Useful media/creator context, but too platform-news-led for launch. |
| RC2 | Meta Unveiled New Ray-Ban Display | AI Adoption | Support | Interface-shift example; better cited inside a broader adoption/future-of-work article. |
| RC2 | Spotify's AI Slop Fight and New Rules | Owned Media | Support | Good creative-industry signal, but not a core Studio Baggio commercial page. |
| RC2 | Brands Lean into GEO For Visibility | AI Search | Live | Implemented locally as its own AI Search article. |
| RC2 | Check Out: NotebookLM's New Features | AI Skills | Support | Tool update; can support a future skills/resources guide. |
| RC2 | Tool to Try This Month: Lovable | AI Products | Later | Could become a practical vibe-coding/product-building article if treated as evergreen. |
| RC3 | OpenAI Dev Day: ChatGPT Becomes a Platform | AI Search | Later | Strong discovery point, but now dated as news. Use for AI search/platform-discovery context. |
| RC3 | Sora 2: OpenAI's Video Generator Went Viral Overnight | Owned Media | Support | Creative AI/media context; not a launch priority for Studio Baggio. |
| RC3 | Tilly Norwood: Hollywood's Controversial AI Sensation | Owned Media | Support | Good media essay, but less tied to current commercial offers. |
| RC4 | ChatGPT Atlas Launches | AI Search | Later | Useful AI browser/search material, probably supporting a larger AI search article. |
| RC4 | Blueprint for AI Filmmaking | Owned Media | Later | Strong practical playbook, but more media/creative-consulting than main Studio Baggio front door. |
| RC5 | Gemini 3 Has Finally Landed | AI Skills | Support | Tool news; useful as evidence for multimodal workflow change. |
| RC5 | Pomelli Turns Your Brand Website into a Content Engine | AI Products | Later | Good future marketing/productisation article if rewritten only by selecting a clean source span. |
| RC5 | "The Tutorial" - Grimes x KNGMKR | Owned Media | Support | Good proof/process point for AI creativity; not a priority website article. |
| RC5 | NanoBanana Pro | AI Skills | Support | Tool update; better inside a future visual production resources page. |
| RC6 | AI at Work in 2025 - Lots of Adoption, Not Much Effectiveness | AI Adoption | Live | Core Studio Baggio business article. |
| RC6 | High Performers Think in Operating Systems, Not Tools | AI Adoption | Folded | Included inside `AI adoption is high. Value is patchy.` Do not publish as a standalone route. |
| RC6 | 2026 Predictions | AI Adoption | Live | Implemented locally for third-party mentions, search surface and useful archive value. |
| RC6 | Tools of the Year 2025 | AI Skills | Live | Implemented locally for third-party/tool mentions and search surface. |
| RC7 | ChatGPT for Business Owners - If You Only Do 6 Things | AI Adoption | Live | Implemented locally as an evergreen guide. |
| RC7 | Reuters Institute's Trends & Predictions 2026 | Owned Media | Live | Forms the current Reuters / owned-media article with Slide 3. |
| RC7 | Reuters 2026 Trends & Predictions Report cont. | Owned Media | Live | Best used as the second half of the Reuters / owned-media article. |
| RC7 | OpenAI Is Bringing Ads To ChatGPT | Owned Media | Later | Useful paid-discovery/trust article, but too news-led for launch. |
| RC7.5 | If your work happens on a screen, assume the shape of it is going to change | AI Adoption | Live | Implemented locally as a full article, not split by slide/page. |
| RC8 | What is a Skill? | AI Skills | Live | Core skills article. Current route includes Slide 2 through the end of the issue. |
| RC8 | /Last30Days Skill | AI Skills | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | From Skill to Product | AI Products | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | No 1 - Research | Commercial Intelligence | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | No 2 - Positioning Angles Skill | AI Skills | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | No 3 - Direct Response Copy Skill | AI Skills | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | From Angles to Copy | AI Skills | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | The Front End Design Skill | AI Skills | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | Design Direction slides | AI Products | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC8 | Launch Materials | AI Products | Folded | Included inside `A skill is an app without a user interface`. Do not publish as a standalone route. |
| RC9 | Firecrawl just gave any business access to 96% of the open web | Commercial Intelligence | Live | Strongest commercial intelligence article. |
| RC10 | Firecrawl article version | Commercial Intelligence | Support | Duplicate source for the live Firecrawl article. Do not publish as a second page. |
| RC10 | Your public profile is no longer your shop window | AI Search | Folded into Firecrawl | This is part of the Firecrawl article source, not a standalone route. |
| Future Ideas | RC AI SEO Framework | AI Search | Live | Implemented locally from the PDF source. |
| Future Ideas | How I used NotebookLM to build a boardroom | AI Skills | Later | Needs source extraction from DOCX before deciding whether it is article-ready. |
| Playbooks | AI Creative Summit material | Owned Media | Next | Approved add/review. Use the downloaded PDF as the richer source material. |
| Downloaded PDF | Something BIg is happening | AI Adoption | Next | RC7.5 PDF source for the screen/work-change article. Use the PDF as source material when mapping exact boundaries. |
| Downloaded PDF | 10x AI Tips To Unlock What All the Hype is About | AI Skills | Next | Practical ChatGPT/AI fundamentals carousel. Candidate standalone resource if the full PDF works as an article. |
| Downloaded PDF | Building AI Operating Systems in 2026 | AI Adoption | Live | Implemented locally from the PDF source. Strong operating-systems/adoption source. |
| Downloaded PDF | The State of Play: AI Disruption in Media & Advertising | Owned Media | Live | Implemented locally from the Futureweek AIMM 2025 PDF source. |
| Downloaded PDF | Blueprint For AI Filmmaking | Owned Media | Later | Practical AI filmmaking playbook source. Keep as a media/creative candidate. |
| Downloaded PDF | AI Filmmaking Update | Owned Media | Later | Updated version of the AI filmmaking workflow. Compare against the blueprint before publishing either. |
| Downloaded PDF | AI Creative Summit 2025 | Owned Media | Live | Implemented locally from the downloaded PDF source. |

Category conclusion from the audit:

- Keep the six visible filters: `Commercial Intelligence`, `AI Adoption`, `AI Skills`, `AI Search`, `Owned Media`, `AI Products`.
- Do not add more categories yet. Extra labels would make the strip heavier and most thin topics can sit inside these six.
- The approved 13-article launch set is now implemented locally. Next priority is second-pass enhancement across the live library.

## Downloaded PDF Source Materials

Moved into `/Users/jaymebaggio/Desktop/Rough Cut/Downloaded source PDFs/` on 30 May 2026:

| File | Working title | Likely category | Recommendation |
| --- | --- | --- | --- |
| `Something BIg is happening .pdf` | Something big is happening / RC7.5 screen-work essay | AI Adoption | Use as the exact source material for the RC7.5 article. |
| `Chat GPT 10x tips.pdf` | 10x AI Tips To Unlock What All the Hype is About | AI Skills | Add to the next-candidate list as a practical evergreen resource. |
| `Building AI Operating Systems in 2026.pdf` | Building AI Operating Systems in 2026 | AI Adoption | Approved add and first-priority PDF review. |
| `Future week AIIM.pdf` | The State of Play: AI Disruption in Media & Advertising | Owned Media | Live. Exact article/takeout boundaries mapped and implemented locally. |
| `AI Filmmaking blueprint .pdf` | Blueprint For AI Filmmaking | Owned Media | Keep as a later practical playbook candidate. |
| `Ai Filmmaking update.pdf` | AI Filmmaking Update | Owned Media | Compare against the blueprint; publish only one canonical version unless Jayme approves both. |
| `AI Creative Summit 2025.pdf` | AI Creative Summit 2025 | Owned Media | Live. Exact signal boundaries mapped and implemented locally. |

## Article Source Notes

### Firecrawl just gave any business access to 96% of the open web

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC9/RC9-ARTICLE-1-DRAFT-v2.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/RC10/RC10-FULL-DRAFT.md`
- `/Users/jaymebaggio/Downloads/Copy of RC Follow Up.pdf`
- `/Users/jaymebaggio/Downloads/example image graphic firecrawl .png` as diagram logic reference only.

Use the full article. Keep the strongest lines:

- `The lead list is no longer the asset. The qualification logic is.`
- `Public data has become cheap. Commercial judgement has not.`

Internal links:

- Business Tracker.
- AI Opportunity Audit / consulting entry point.
- Related: operating systems article and any future AI search / evidence-layer article Jayme explicitly approves.

### AI adoption is high. Value is patchy.

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC6/Rough Cut RC6.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md`

Use as a core business insight. Preserve the point that adoption is not the same as value, and that "time saved" is too weak as the main success metric.

Internal links:

- AI Opportunity Audit.
- Related: operating systems article, skills article.

### A skill is an app without a user interface

Best source:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC8/RC8-content/Rough Cut RC8.md`

Use RC8 from `## Slide 2: What is a Skill?` through `Jayme Baggio - Views are my own` as the source. Publish the selected text verbatim. Do not split the `/Last30Days`, `From Skill to Product`, research, positioning, copy, design or launch-materials sections into separate article pages. Any prompt-to-skill-to-asset diagram must sit outside the article body as approved page furniture.

Internal links:

- AI Opportunity Audit / skills consulting.

### Public profile section inside the Firecrawl article

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC10/RC10-FULL-DRAFT.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/RC9/RC9-OUTLINE.md`
- `/Users/jaymebaggio/Downloads/Copy of RC Follow Up.pdf`

Use inside the Firecrawl article. This should explain public profile as an evidence layer, not just personal brand or visibility. Do not create a separate `/insights/public-profile-is-no-longer-your-shop-window` route.

Internal links:

- Calm Authority.
- Related: channels you rent article, Firecrawl article.

### From skill to product

This is not a standalone article. It is a section inside `A skill is an app without a user interface`.

Do not create `/insights/from-skill-to-product` unless Jayme explicitly reverses this decision.

### High performers think in operating systems, not tools

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC6/Rough Cut RC6.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md`

This is not a standalone article. It is a section inside `AI adoption is high. Value is patchy.`

Do not create `/insights/ai-operating-systems-not-tools` unless Jayme explicitly reverses this decision.

Internal links:

- AI adoption article.
- AI Opportunity Audit.

### The channels you rent can change overnight

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC7/Rough Cut RC7.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md`

Use as the Owned Media article. Make it useful beyond media businesses: discovery is changing, search referral traffic is vulnerable, and direct audience habits are commercial infrastructure.

Internal links:

- Firecrawl article / public-profile section.
- Calm Authority.

### If your work happens on a screen, assume the shape of it is going to change

Best sources:

- `/Users/jaymebaggio/Desktop/Rough Cut/RC7.5/Rough Cut RC7.5.md`
- `/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md`

Use as a phase 2 editorial essay. Keep the voice direct and human. Do not over-framework it.

Internal links:

- AI adoption article.
- Skills article.

## Phase 2 Candidates

These may become articles later, but should not distract from the first launch set.

| Candidate | Likely category | Recommendation |
| --- | --- | --- |
| ChatGPT for Business Owners | AI Adoption | Good practical resource. Better as a future guide/playbook than one of the first authority articles. |
| Brands lean into GEO for visibility | AI Search | Strong candidate for its own AI search article if the source text is complete enough. Do not fold it into another page without approval. |
| OpenAI is bringing ads to ChatGPT | Owned Media | Useful if reframed around trust and paid discovery inside AI answers. Too news-led for the approved list. |
| ChatGPT becomes a platform | AI Search | Strong strategic point, but dated as a standalone news article. Keep as source material for AI visibility writing. |
| ChatGPT Atlas launches | AI Search | Same as above. Useful source material for AI browsers/search, not a launch page. |
| Pomelli turns your brand website into a content engine | AI Products | Could become a useful AI marketing execution article if updated. Not launch priority. |
| Blueprint for AI Filmmaking | Owned Media | Keep for future media/creative consulting proof. Less aligned with the current Studio Baggio front door. |

Approved additions already tracked above:

- `ChatGPT for Business Owners — If You Only Do 6 Things...`
- `Brands Lean into GEO For Visibility`
- `AI SEO Framework`
- `Building AI Operating Systems in 2026`
- `AI Creative Summit 2025`
- `The State of Play: AI Disruption in Media & Advertising`
- `2026 Predictions`
- `Tools of the Year 2025`

## Supporting Only For Now

Do not turn these into launch articles unless they are heavily reframed:

- YouTube feature updates.
- Meta Ray-Ban display news.
- Spotify AI slop rules.
- NotebookLM feature update.
- Lovable tool-to-try piece.
- Sora 2 viral launch.
- Tilly Norwood controversy.
- Gemini 3 launch.
- NanoBanana Pro.

Reason:

- They are more dated, tool/news-led, or less directly tied to Studio Baggio's commercial offers.
- They can be cited as examples inside broader articles, but the site should lead with evergreen authority pieces.

## SEO Structure

Each selected article needs:

- One canonical URL.
- One primary search intent.
- Unique title and meta description.
- Clean H2/H3 hierarchy.
- Direct answer or thesis block near the top where appropriate.
- Article schema where practical.
- Contextual links up to relevant service, product or pillar pages.
- Related article links across the same category.

Do not publish the full Rough Cut issue pages as indexable pages if the same article text is published individually. Keep the newsletter issue as source/archive, not the canonical SEO asset.

## Index Page Display

Use the locked `/insights` design:

- Featured article: Firecrawl.
- Category strip: `All` plus the six primary category chips.
- Search field on the right.
- Ruled accordion rows below.
- Expanded rows show preview only, not full article text.
- The article row category should match the filter category.

Default article order on launch:

1. Firecrawl just gave any business access to 96% of the open web.
2. AI adoption is high. Value is patchy.
3. A skill is an app without a user interface.
4. The channels you rent can change overnight.

## Open Decisions

- Launch set decision: the current local build uses standalone article routes only for real article boundaries. The public-profile material stays inside the Firecrawl article and is not a separate article.
- `High performers think in operating systems, not tools` stays inside `AI adoption is high. Value is patchy.`
- `From skill to product` stays inside `A skill is an app without a user interface.`
- Whether `If your work happens on a screen...` is launch or phase 2. Recommendation: phase 2 unless Jayme wants a more personal editorial anchor on day one.

## Implementation Status

Implemented locally on 29 May 2026:

- `src/content/insights.ts` holds category metadata, article metadata and exact selected article body text, including source headings/separators.
- `src/app/insights/page.tsx` renders the hub page.
- `src/app/insights/[slug]/page.tsx` renders individual article pages.
- `src/components/insights-article-accordion.tsx` renders the preview accordion on the hub.
- `src/app/sitemap.ts` includes the hub and article URLs.

Verification:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Source-body comparison should be rerun after every content change. The public-profile section is now checked as part of the Firecrawl article source span, not as a separate article body.
