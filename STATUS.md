# Studio Baggio Website - STATUS
*Last updated: 18 August 2026*

## 18 August — Last30Days 300-user milestone

- Updated every public Studio Baggio reference to Last30Days usage from more than 250 to more than 300 individual and corporate users.
- Regenerated the downloadable six-page services PDF with the same milestone copy and visually checked the exported document.

## 18 August — Financial-advice ranking numbers

- Added ordinal numbers to the left of every financial-advice explorer row, matching the UK law and sports-law ranking tables.
- The displayed numbers follow the current table order and recalculate after search, advice-area and buyer-need filtering.

## 18 August — Sports-law comparison language

- Replaced every public reference to “established firms” in the UK Sports Law report with “top-ranked UK sports-law firms”, including the masthead, key findings, individual-lawyer section and ranking-table labels.

## 17 August — Financial-advice search repair; research signup paused

- Fixed the financial-advice explorer so a direct firm or adviser search covers the complete study dataset. A local-only or national classification no longer hides a matching name; advice-area and buyer-need filters still control the selected ranking view.
- Verified locally that `Fairstone` returns one result again, alongside normal national candidates, panel firms with no national selections, empty searches and filter/reset behaviour.
- Research-edition email capture is paused on `feat/research-edition-signup` and is not on `main`. The branded confirmation-email templates are committed there; page integration, environment/database setup, end-to-end delivery and mobile QA remain unfinished.

## 7 August — Calm Authority citation experiment linked from financial-advice research

- Added a clearly labelled live follow-up experiment directly below the report’s source-influence finding at `/research/uk-financial-advice-2026`.
- The section links directly to all three Calm Authority financial-adviser comparison guides and states that this is an intervention, not a result; the original 450-answer findings remain unchanged.
- Updated the research edition `pageUpdatedAt` to 2026-08-07 so the page schema reflects the substantive update.
- Commit `d40fc64` is on `main` and live. Typecheck and lint passed; the production Next build passed with the established Webpack fallback after Turbopack rejected the clean-worktree dependency symlink. Desktop and 390px visual QA passed. Live HTTP, section copy, all three links and `dateModified` were verified.

## 5 August Research CTA Hover Fix - Live Push

- Fixed the final report CTA hover state so its white label remains visible against the black section instead of turning black and appearing blank.
- Typecheck, lint and the webpack production build pass; the forced hover state was visually verified in the browser.

## 4 August Research Listing Title - Live Push

- Renamed the report on `/research` to `UK Financial Advice Firms in AI Search 2026` so it clearly describes firms appearing in AI answers, rather than suggesting the study is about AI being used within financial advice.
- Kept the report page headline, metadata and URL unchanged.
- Typecheck, lint and the webpack production build pass; desktop browser checks confirmed the listing title fits cleanly and the report masthead is unchanged.

## 24 July (night) Services Motion + Copy Tightening - Merged Live

- `feat/services-motion` merged to main on Jayme's word; verified live post-deploy (playwriter: 6 entrance CSS animations firing, cards `position: sticky`, new copy serving, /downloads PDF = 211,941 bytes = tonight's final render).
- Motion: stacked offer cards — each card pins at 88px, the next slides over it; covered card recedes (scale 0.94 + white `--sv-veil` overlay via ::after — the card itself NEVER loses opacity, translucent pinned cards ghost through each other). Cards' release equalised with transparent margin-bottom fillers (sticky clamp uses the margin box) so the whole stack pins and exits together; scrub ranges from flow offsets (offsetParent chain) so pinned-state refresh can't mis-measure. `scrub: true` only (numeric double-smooths under Lenis).
- Entrance: pure CSS keyframe cascade (SERVICES → H1 → paragraphs → index cards) served in the page HTML — starts at first paint on the compositor. PERMANENT RULE: `lagSmoothing(0)` (required for Lenis) makes GSAP load-time tweens jump on dropped frames ("tick-tick-tick") — entrances belong in CSS; GSAP owns scroll-linked work only.
- Hover index cards: Framer Motion lift + blue underline draw (unchanged).
- Copy tightening (~15%, ChatGPT review approved by Jayme, mirrored in doc + page + FAQ): AI OS audit list 8→6 (two combined pairs), Growth expansion sentence cut, SEO intro halved + list 9→6, How-SB-works negation line cut, "measurable value" (no "commercial"), "how their people work" (no "actually"), "processes and safeguards" (no "connected workflows"/"knowledge structure"), workflows→processes in card summary/examine/bullet/Ways lines. Master copy record: `New Business/Intro One-Pager/MASTER_COPY.md`.
- Residual (unapproved): "Workflow and data design" bullet in Bespoke (singular, flagged to Jayme); homepage strip still has 3 "workflows" uses (site.ts ~427-437) — same plain-English rule whenever the homepage is next touched.
- POST-MERGE FIX (same night, Jayme flagged missing examples): element-triggered reveals never fire inside a pinned sticky card (child tops never cross the viewport threshold) — the card-bottom examples were invisible. Card internals now reveal as one sequence off the CARD trigger ("top 85%"); non-card sections keep per-element reveals. Verified live: Harry example opacity 1 + text present. KNOWN TRADE: cards (~1112px) taller than short viewports leave their bottom strip unreadable once pinned (covered before it can rise) — fix if flagged: per-card `top: min(88px, vh − height)` so tall cards pin bottom-at-fold.

## 24 July (eve) Services Proof Pass - Live Push

- SEO offer wording final ("recommended as the solution when prospective clients ask them"); Harry example now nine clients in eight months + "Four of those client journeys began with a recommendation from ChatGPT."; Bespoke list compressed to six + Last30Days example ("research markets", 200+ users highlight); standalone proof + ongoing-advisory sections removed (Ways to work together covers ongoing); "Featured in" press strip at page bottom — FT Adviser / Money Marketing / Professional Adviser (print-safe recoloured logo, white "Professional" → ink), each linked to its article; updated intro PDF (now with matching content + press strip) re-synced to /downloads/.
- PDF source of truth unchanged: `Studio Baggio/New Business/Intro One-Pager/` ("Studio Baggio Introduction.pdf"). Testimonials permanent in the PDF (Jayme explicit 24 July).
- Verified live: /services content greps + playwriter screenshot of the strip; PDF 200 at 212.9KB.

## 24 July Services Page + Intro PDF Download - Live Push

Scope:

- New /services page (the crawlable HTML version of the Studio Baggio intro document) + the intro PDF as a site download.

Implemented:

- `/services`: four offers as definition blocks with includes lists and examples (AI Operating System Audit, Commercial AI Growth Strategy incl. Business Tracker sub-section, SEO and AI Search Opportunity Audit, Bespoke AI Software and Systems), How Studio Baggio works, Ways to work together, Ongoing advisory support, Last30Days proof point (linked to /last30days), download CTA, services FAQ (7 items).
- Schema: Service + OfferCatalog (all four offers), BreadcrumbList, FAQPage (via FaqSchema).
- `public/downloads/studio-baggio-introduction.pdf` served at /downloads/studio-baggio-introduction.pdf (source of truth: `Studio Baggio/New Business/Intro One-Pager/Studio Baggio Introduction.pdf` — re-copy on every doc update).
- Homepage: "Or download the Studio Baggio introduction" link under the audit-section CTA. Footer: "Studio Baggio introduction (PDF)" link.
- Nav: "Services" added (site.ts navItems). Sitemap: /services (priority 0.85, lastmod 24 July).
- Content layer: `servicesPage`, `introDownload`, `metadata.services` in src/content/site.ts.
- Spacing: eyebrow sub-heads use padding-top (`.home-4b .eyebrow` zeroes margins by design); sub-blocks standardised at 40px.

Verified:

- typecheck, lint, build pass; /services static in route table.
- Live https://www.studiobaggio.ai/services 200; /downloads/studio-baggio-introduction.pdf 200 application/pdf; sitemap includes /services; homepage + footer links present.
- Live visual check via playwriter (spacing rhythm, blue accents, example highlights).

Next (outlined for Jayme, not yet approved): homepage offer section alignment with the four-offer structure; proof tiles / case numbers refresh (Harry set now 9 clients / £5.3m / £93.4k); testimonials section (Charlotte/Harry/Luke approved set, Emma gated); internal links from relevant insights articles to /services; GSC re-index request for /services.

---

## 26 June Last30Days Standalone Product Page - Live Push

Scope:

- Last30Days product/case-study page only, plus crawlability links.
- No main navigation changes.

Implemented:

- Added `/last30days` as a real standalone Studio Baggio product page.
- Reused the existing Last30Days `/work` content so the page stays concise.
- Removed the old permanent redirect from `/last30days` to `/work`.
- Added a permanent redirect from `/work/last30days` to `/last30days`.
- Added page metadata, canonical URL and SoftwareApplication schema for Last30Days.
- Added `/last30days` to the sitemap with a 26 June 2026 `lastmod`.
- Pointed the footer Last30Days link to the local `/last30days` page.
- Updated Last30Days work/home links so internal links point to the product page before the live app.
- Kept the standalone page visible in static HTML while preserving the existing animated `/work` product tab behaviour.
- Updated the Last30Days opening copy to include Polymarket, the £40,000/year intelligence comparison, and the "customers don't know they're producing" line.
- Updated the standalone page metadata/schema description to include Polymarket.
- Converted product section labels to semantic H2 headings.
- Added a concise Last30Days "Useful for" bullet list.
- Expanded Last30Days schema with feature list, image, free offer metadata and breadcrumb schema.
- Updated the Last30Days product image alt text for AI market intelligence context.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local `GET /last30days` returns `200`.
- Local `GET /work/last30days` returns `308` to `/last30days`.
- Generated HTML includes the Last30Days title, canonical, H1, SoftwareApplication schema, footer link and live app link.
- Local sitemap includes `https://www.studiobaggio.ai/last30days`.
- Live `https://www.studiobaggio.ai/last30days` returns `200`.
- Live `https://www.studiobaggio.ai/sitemap.xml` includes `/last30days`.
- Google Search Console URL Inspection requested indexing for
  `https://www.studiobaggio.ai/last30days`.
- Search Console sitemap submission refreshed successfully for
  `https://www.studiobaggio.ai/sitemap.xml`.
- Pushed to `main` in commit `54b05cd Add Last30Days SEO product page`.

Why:

- Gives Studio Baggio a crawlable owner/product page for Last30Days rather than
  relying only on the `/work` tab and the app domain.
- Creates a relevant first-party backlink and entity signal from Studio Baggio
  to `last30days.app`.
- Supports the app-domain SEO pass by giving Google a cleaner Studio Baggio
  source page to connect with the Last30Days WebApplication schema.

Status:

- Pushed to `main`, deployed, live, sitemap submitted and indexing requested.

## 20 June Contact Page Enquiry Form Refresh - Live Push

Scope:

- Contact page layout and enquiry form only.

Implemented:

- Reworked `/contact` into a cleaner Studio Baggio enquiry frame with a smaller `Enquire now.` heading and blue dot.
- Tightened the desktop layout so the contact content fits in-frame at `1440x900`.
- Hid the footer on `/contact` so the page behaves as a single-frame enquiry surface.
- Updated the required fields to `Name`, `Email`, `Company name` and `Website`.
- Replaced the two required textarea prompts with four optional context questions:
  `What is the biggest challenge you’re trying to solve right now?`,
  `What have you already tried?`,
  `Why is now the right time to address this?`,
  and `What would success look like for your business 6 months from now?`
- Renamed the optional disclosure row to `Additional Details`, removed the helper sentence, and removed the extra optional top rule so the website field underline does not double with a second separator.
- Made the optional context section collapsed by default with non-bold prompt labels.
- Tightened the optional open state so paired textarea underlines align even when labels wrap.
- Changed the optional open-state control from `+` to `-`.
- Updated the contact API email text to include the new questions while allowing them to be blank.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Headless Chrome screenshots checked at desktop `1440x900`.
- Headless Chrome open-state measurement confirms paired optional textarea underline deltas are `0px`.
- Mobile emulation checked at `390x844`; `scrollWidth` equals `390`, the content fits in-frame and the intro copy no longer clips.

Status:

- Pushed to `main` and verified live.

## 20 June Blue Accent Docs + Planner MCP Link - Live Push

Scope:

- Documentation alignment for the approved Studio Baggio blue accent.
- Insights article only: `/insights/best-ai-tools-content-production-2026`.

Implemented:

- Updated `CLAUDE.md` and `_strategy/Studio baggio consulting/design.md` so future agents know the site uses black, white and true neutral greys as the base system, with one approved Studio Baggio blue accent: `#2563EB` / `--sb-accent-blue`.
- Added a contextual Planner Claude/MCP deep link to the 2026 AI tools article:
  `https://www.get-planner.com/resources/blog/production-scheduling-tool-that-connects-to-claude`

Verified locally before push:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

Verified live:

- Pushed to `main` in commit `138c91d`.
- Production HTML for `https://www.studiobaggio.ai/insights/best-ai-tools-content-production-2026` contains the Planner Claude/MCP deep link.

## 12 June Luke Testimonial Added - Local

Scope:

- About page testimonial proof band only.
- Local preview change, then pushed to `main`.

Implemented:

- Added Luke as the fourth About-page testimonial using cautious attribution: `Head of Growth, independent financial advisory firm`.
- Lightly polished the supplied Luke quote for grammar and credibility while preserving the meaning.
- Changed Emma Corbett's attribution to `Co-founder, Get-Planner App`.
- Changed the About testimonial band from 3 columns to a cleaner 2x2 desktop grid now that there are four quotes.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.

## 12 June About Testimonials Preview - Local

Scope:

- About page only.
- Added a temporary client-words proof band so Jayme can judge the treatment in context.
- Luke/Hanbury quote not added because approval has not been received yet.

Implemented:

- Added held About-page quotes for Charlotte Evans MBE, Harry Sims APFS and Emma Corbett to `src/content/site.ts`.
- Rendered those quotes after `What we do` on `/about` so they support the core Studio Baggio claim earlier in the page.
- Styled the section as a restrained ruled editorial proof band, not a full testimonials section.
- Harry attribution uses Fairstone rather than Calm Authority founder/co-founder wording.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- In-app browser check on `http://127.0.0.1:3006/about` confirms all three quotes render and there is no horizontal overflow at the current browser width.

## 8 June Content Production Tools Article - Local

Scope:

- Added and styled `/insights/best-ai-tools-content-production-2026`.
- Touched the Insights renderer, Insights content source, article link styling and global header idle-hide behaviour.
- No homepage, About, Products or unrelated page copy changed.

Implemented:

- Added the content production tools article to the Insights content source and `/insights` index.
- Added metadata, tags, related links, source provenance, visible FAQ content and FAQ schema.
- Updated the tool-directory renderer so this article supports Codex, Claude, Last30Days, Freepik/Seedance/HyperFrames, GPT Image 2, Planner, Lovable, inline links and top-tip lines.
- Added Last30Days and Planner links in the article body.
- Removed only the unwanted paragraph beginning `The make-it tools keep improving...`.
- Updated the Lovable copy per Jayme's direction.
- Updated the header so a revealed header soft-hides again after one second of no header interaction once a reader is scrolled into the page.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- Local route HTML includes `BlogPosting`, `FAQPage`, `https://last30days.app`, and `https://www.get-planner.com`.
- Local route HTML no longer includes the removed `The make-it tools keep improving...` paragraph.

## 4 June GEO Insights Article - Local Preview

Scope:

- Added one new Insights article route only: `/insights/generative-engine-optimisation`.
- Used the locked reader copy from `~/Desktop/Studio Baggio/SEO/GEO Pillar Page - CLEAN READ.md`.
- Used the SEO metadata and source notes from `~/Desktop/Studio Baggio/SEO/GEO Pillar Page - Draft Copy.md`.

Implemented:

- Added `Generative Engine Optimisation for Professional Services` under the `AI Search` category.
- Added article metadata, tags, preview, related links, and source provenance.
- Added FAQ schema support to the article route using the existing schema components.
- Added a closing CTA renderer for the final `Find out where AI search is leaving your firm invisible` section, linking to `/contact`.
- Added restrained article callout styling for the definition and AI-readability blocks, matching the current Insights article system.

Verified:

- Embedded article body matches the clean-read source copy exactly, character for character.
- `/insights/generative-engine-optimisation` returns the article title.
- `/insights` links to the new article.
- Page source includes `BlogPosting`, `BreadcrumbList`, and `FAQPage` JSON-LD.
- FAQ schema contains 6 Q&A entries.
- CTA link to `/contact` is present.
- Fixed a duplicate React key warning on the new article by replacing raw line-number keys with block-scoped renderer keys. No article copy changed.
- URL allocation checked:
  - canonical, Open Graph URL, article schema URL and breadcrumb URL all point to `https://www.studiobaggio.ai/insights/generative-engine-optimisation`.
  - sitemap includes `https://www.studiobaggio.ai/insights/generative-engine-optimisation`.
  - new article related links point to Firecrawl, Reuters/Owned Media and AI Adoption.
  - Reuters/Owned Media related link now points to this new GEO pillar URL instead of the older short GEO note.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build -- --webpack` passes.

## 5 June Global Header Auto-Hide - Local

Scope:

- Header auto-hide behaviour across the public site.
- Non-disruptive transparent top header treatment across the public site.
- No page copy or page layout changed.
- Mobile `/work` product selector behaviour.

Implemented:

- Added a recoverable soft-hide behaviour for the site header while scrolling down.
- Header now returns on scroll-up, focus, or desktop pointer movement into the top page area.
- Header stays faintly visible on desktop while hidden; on mobile it fully clears so it does not overlap content.
- Top-of-page header now uses the lighter transparent treatment on every route.
- Homepage-only dark-section header colour detection remains homepage-only.
- Mobile `/work` product selector now sits in normal page flow as a swipeable rail, not a sticky overlay or boxed grid.
- Mobile `/work` product rail no longer attaches mobile scroll listeners, keeping vertical scrolling smooth.
- Mobile `/work` header stays fully hidden while reading product detail content so it does not overlap product headings or the selector.
- Added a mobile-only "Back to products" link after product detail content.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- In-app browser check on `http://localhost:3006/` verified visible-at-top, soft-hidden-on-down-scroll, restored-on-scroll-up, restored-on-top-hover, and restored-on-top-tap behaviour.
- In-app browser check on `/about` verified the same global soft-hide behaviour outside the homepage.
- In-app browser check on `/work` verified the top-of-page header is transparent instead of the heavier white bar, then soft-hides and restores correctly.
- In-app browser mobile check on `/work` verified the product rail no longer floats over text, the header no longer ghosts over Last30Days content, and there is no horizontal page overflow.

## 3 June Insights Article Readability Pass - Local

Scope:

- Insights article renderer and longform article CSS only.
- No `src/content/insights.ts` source article copy changed.

Implemented:

- Added presentation-only paragraph chunking for long article text so oversized blocks render as readable editorial paragraphs while preserving the original wording.
- Added exact Firecrawl chunking for the long commercial-intelligence passages Jayme flagged, including two restrained blue left-rule emphasis moments.
- Applied the same rhythm to rendered source lists and numbered playbook items, fixing the long ChatGPT operating-system checklist item without changing the copy.
- Standardised article body paragraph width, line-height and internal list spacing so paragraph gaps stay consistent instead of random.
- Added `text-wrap: pretty` and controlled max widths to reduce awkward line breaks and orphan-style wraps where the browser supports it.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `next build --webpack` passes.
- In-app browser audit across all 12 article routes found no horizontal overflow.
- Firecrawl presentation chunks were checked against the renderer's source paragraph boundaries and reconstruct the source text exactly, with whitespace normalised only.
- Longest rendered paragraph after this pass:
  - Firecrawl: 408 characters.
  - AI adoption: 428 characters.
  - ChatGPT playbook: 378 characters, down from roughly 600.

Follow-up:

- Tightened the article hero type scale after Jayme flagged the Firecrawl title as oversized:
  - article hero title now uses `clamp(36px, 3.45vw, 56px)` on desktop instead of the previous display-scale `clamp(44px, 4.7vw, 76px)`.
  - mobile article title now uses `clamp(31px, 8.4vw, 42px)`.
  - hero top padding, hero internal gap, meta gap, article top padding and heading margins were reduced onto a tighter, more consistent spacing rhythm.
- Re-verified the Firecrawl article in the in-app browser: first article paragraph now appears within the first screen, with no horizontal overflow.
- Simplified the article typography after Jayme flagged the page as visually messy:
  - article body, right-rail titles, callout bodies, lists and article visuals now share one copy size.
  - metadata, category labels, side-rail labels and small UI text now share one label size.
  - the H1 is the only separate display tier.
  - article-specific hairlines now use a quieter local rule token.
  - article breadcrumbs now sit clear of the fixed header on desktop and mobile.
- Re-verified the Firecrawl article in the in-app browser at `http://127.0.0.1:3017/insights/firecrawl-for-business`; no horizontal overflow and the visible article copy uses the simplified 16px / 12px mobile scale.
- Re-verified `npm run typecheck`, `npm run lint` and `next build --webpack`.
- Follow-up after Jayme approved the Firecrawl treatment:
  - constrained article H1s to the body-copy column width so titles no longer run across the right rail.
  - applied the same hero spacing, H1 width and breadcrumb clearance globally across all `/insights/[slug]` article pages.
  - audited all 12 live article routes in the Codex browser at `http://127.0.0.1:3006`; no horizontal overflow found, all routes use the same body/label type scales, and article-specific visual blocks stay inside the article column.
  - styled the exact `SKILLS SPECIAL:` source line on `/insights/what-is-an-ai-skill` as the same small uppercase section heading treatment used for `WHAT IS A SKILL?`; no article copy changed.
  - removed the global first/two-paragraph intro override from article bodies so openings now use the same body font, colour and spacing rhythm as the rest of each article.
  - fixed the article signal parser so `Insight, strategy Taste, Brave ideas.` in `/insights/building-ai-operating-systems` no longer renders as a broken `INSIGHT` callout with a comma-led body; source copy was not changed.

## 31 May Mobile Responsiveness + Header Motion

Scope:

- Mobile responsiveness for the public site navigation/product selectors.
- Page-header reveal smoothness for About and Products.
- Avoided the active Insights article route work owned by another agent.

Implemented:

- Replaced the `/work` mobile product selector hidden horizontal scroll with a visible two-column grid so all products are discoverable without sideways scrolling.
- Replaced the `/insights` mobile category filter hidden horizontal scroll with a visible two-column grid.
- Increased tap/focus reliability for the site wordmark, product tabs and Insights filters.
- Standardised About and Products hero reveal elements onto the shared GSAP page reveal path.
- Scoped initial reveal pre-hiding to hero/home sections so below-fold page content does not disappear while the reveal system waits for fonts.

Verified:

- Mobile browser audit covered `/about`, `/work` and `/insights` at phone width.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## 31 May Paper Mockup - AI Operating System Framework

Scope:

- Paper design exploration and approved website implementation for the `Building AI Operating Systems in 2026` article.
- No `src/content/insights.ts` article source copy changed.

Implemented:

- Created a Paper artboard called `AI Operating System Framework - Stance Stack Spine`.
- Grounded the mockup in the current article source structure:
  - `STANCE`: what you believe and protect.
  - `STACK`: how AI lives in the organisation and whose judgement is scaled.
  - `SPINE`: diverse human judgement at the centre of the system.
- Added a second `Operating system test` section using the article's Q1 executive checklist.
- Kept the visual direction aligned with the current Insights article style: white ground, Aileron, black text, neutral hairlines and restrained blue accents.
- Added the approved `STANCE / STACK / SPINE` framework as a dedicated article visual on `/insights/building-ai-operating-systems`.
- Adapted the Paper layout for the live article column so it reads clearly beside the right-side `More articles` rail.
- Fixed the article renderer to parse source numbering such as `1.We have...` as a proper styled checklist without changing the source text.

Verified:

- Paper screenshot reviewed for spacing, typography, contrast, alignment and artboard fit.
- Artboard switched to `fit-content` after the first review showed the checklist clipping at the bottom.
- Focused live-route screenshot reviewed for the operating-system component.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

## 31 May Insights Article Structure Styling - Local

Scope:

- Insights article renderer and styling only.
- No `src/content/insights.ts` article copy changed.

Implemented:

- Extended the source-preserving article renderer so exact labels such as `Insight`, `Why it matters`, `Opportunity`, `Action`, `Actionable takeaway` and `The takeaway` render as structured strategic callouts.
- Added article-aware numbered section heading treatment for AI Creative Summit and State of Play.
- Added source-preserving layouts for:
  - ChatGPT article: ruled checklist/playbook list.
  - 2026 Predictions: numbered prediction rows.
  - Tools of the Year: tool-directory rows with `Use it for:` split into its own styled line.
  - Future of Work: styled three-action list.
  - Reuters / Owned Media: styled source subheadings and `Example: SheerLuxe` block.
- Suppressed raw `---` slide separators so PDF/slide furniture does not render as article rules.
- Hid the Reuters slide-continuation heading (`Reuters 2026 Trends & Predictions Report cont.`) as PDF furniture while preserving the article body copy.
- Fixed the `Actionable takeaway` parser so it no longer misreads the label as `Action`.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Playwright route screenshots checked desktop layouts for Creative Summit, State of Play, ChatGPT, Predictions, Tools, AI Adoption, Reuters, GEO and Future of Work.
- Desktop and 390px mobile overflow checks passed for Firecrawl plus the nine styled article routes.

## 31 May Insights Article Typography Tightening - Local

Scope:

- Insights article styling only. No article source copy changed.

Implemented:

- Reworked article section headings to match the Studio Baggio editorial/product-page rhythm: small uppercase labels, neutral top rules and tighter spacing.
- Removed the blue horizontal heading treatment and neutralised the Firecrawl diagram card dividers.
- Kept blue as a restrained signal colour on vertical quote/action accents, arrows and bullets.
- Tightened article body, signal blocks and pull quotes so longform pages feel less oversized and closer to the reference treatment Jayme provided.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- In-app browser spot checks on `/insights/firecrawl-for-business` and `/insights/ai-creative-summit-2025` show no horizontal overflow and the article section headings render as 12px uppercase labels with neutral rules.

Follow-up:

- Reworked the article shell toward the Swiss editorial reference Jayme supplied:
  - wide article header with breadcrumb, large title and meta bar
  - body plus right-side `More articles` rail on desktop
  - no Rough Cut promo card
  - mobile stacks body and `More articles` cleanly
- Removed the duplicate in-body title by moving article title rendering into the hero. Article body source text remains unchanged.
- Tightened the Firecrawl workflow diagram so it stays inside the article column, removed the top/bottom rules around it and reduced the diagram card/outcome sizing to avoid clashing with the right-side `More articles` rail.
- Removed the divider clutter from the article opening area: no full-width hero divider, no meta-bar rule, no intro underline and no row rules in the `More articles` rail.
- Added an exact-copy rendering treatment for inline `Example:` markers so the label sits on its own styled line and the example body follows underneath, instead of being buried inside a long paragraph.
- Added stacked article metadata for Author, Published date, Category and Read time, plus a quiet closing hairline after the article body.
- Re-verified `npm run typecheck`, `npm run lint` and `npm run build`.

## 30 May Hide Standalone Product Pages - Local

Scope:

- Hide `/business-tracker` and `/calm-authority` standalone product pages for now.
- Keep Business Tracker and Calm Authority visible inside `/work`.
- Avoid Insights implementation files because another agent is currently working there.

Implemented:

- Moved the standalone route files into preserved, non-routed archive folders:
  - `src/app/_archived-standalone-pages/business-tracker/page.tsx`
  - `src/app/_archived-standalone-pages/calm-authority/page.tsx`
- Added an archive README explaining that these pages are kept for later but not publicly routed.
- Removed Business Tracker and Calm Authority from the primary navigation.
- Removed `/business-tracker` and `/calm-authority` from the sitemap.
- Removed internal product links that pointed to the hidden standalone pages.
- Kept the products and their product-page content active on `/work`.

Not touched:

- `src/app/insights/[slug]/page.tsx`
- `src/content/insights.ts`

## 30 May Insights Firecrawl Article Design Pass - Local

Scope:

- `/insights` article system only, focused on `/insights/firecrawl-for-business`.
- No homepage, About, Products, Business Tracker or other main-site page implementation changed.

Implemented:

- Added a native Studio Baggio Firecrawl workflow diagram to the Firecrawl article, rebuilt as code with Aileron, neutral surfaces, hairlines, square cards and restrained blue signal accents.
- Added Firecrawl-only section-heading treatment for exact source lines already present in the article:
  - `In real Terms:`
  - `What does this mean for businesses?`
  - `Public footprint is now part of how a business gets qualified.`
- Tightened longform article typography and spacing so the article pages sit closer to the locked Studio Baggio design system.
- Kept article words sourced from the current `sourceMarkdown`; this pass changed presentation/structure only, not article wording.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes and prerenders `/insights` plus the 12 approved article routes.
- Content hygiene check found no issue/PDF furniture such as `ROUGH CUT`, `NEWSLETTER`, `Jayme Baggio`, `Views are my own`, `Pennies`, `per qualified`, `CONTINUES` or `RCC` in article source bodies.
- Local route checks return `200` for `/insights` and `/insights/firecrawl-for-business`.
- Removed split routes still return `404`:
  - `/insights/ai-operating-systems-not-tools`
  - `/insights/from-skill-to-product`

Follow-up:

- Reduced article-page body H1s to the locked Studio Baggio section-title scale instead of the oversized display scale.
- Corrected `/insights/owned-vs-rented-audience` display title and metadata to `Reuters Institute’s Trends & Predictions 2026: What businesses should do next.`
- Re-verified `npm run typecheck`, `npm run lint` and `npm run build`.
- Fixed the article renderer list-continuation bug that caused `/insights/ai-adoption-value-gap` numbered item `2.` to swallow the following article sections.
- Added exact-source section heading detection for the AI adoption article so the extracted PDF section lines render as headings instead of one large paragraph.
- Re-opened `/insights/ai-adoption-value-gap` in the Codex in-app browser at `http://localhost:3006/insights/ai-adoption-value-gap`.
- Hid the `THE REAL QUESTION:` source heading on `/insights/building-ai-operating-systems` so the article starts with `Most of us...` after the title; article body wording remains unchanged.
- Added the two remaining approved article pages:
  - `/insights/ai-creative-summit-2025`
  - `/insights/ai-disruption-in-media-and-advertising`
- Both new pages are built from the downloaded PDF source text, with repeated PDF furniture/hashtags/footers removed and source signal/takeout structure preserved.
- Removed `/insights/ai-seo-framework` from the live Insights set after Jayme flagged the source as a draft / not the final framework. Do not re-add until Jayme supplies or approves the refined framework.
- Re-verified `npm run typecheck`, `npm run lint` and `npm run build`; build now prerenders `/insights` plus 12 article routes.
- Added the first shared article styling pass using the locked Studio Baggio design system: exact-source `Insight`, `Why it matters`, `Opportunity`, `Action`, `Actionable takeaway`, `Takeout` and `Signal` labels now render as ruled article signals; standalone source quotes now render as italic pull quotes with a thin blue left rule and muted citation text. Article wording remains unchanged.
- Re-verified `npm run typecheck`, `npm run lint` and `npm run build`; no horizontal overflow found in the in-app browser spot checks for AI Creative Summit, AI Adoption, State of Play and GEO.

## 30 May Repo Folder Cleanup - Local

Scope:

- Repository hygiene only. No site code, page layout, copy, styling or animation changed.

Actions:

- Moved untracked copy drafts, handover notes, source downloads, visual references, QA screenshots/videos and the Growth Intelligence reference project out of the website repo into:
  - `/Users/jaymebaggio/Desktop/Studio Baggio/Website Local Archive/2026-05-30/`
- Deleted obvious local junk:
  - `.DS_Store`
  - `src/app/about/.page.tsx.swp`

Current state:

- No untracked files remain in the website repo.
- Tracked modified docs remain and were not reverted:
  - `CLAUDE.md`
  - `HOMEPAGE_COPY_DRAFT.md`
  - `STATUS.md`
  - `_strategy/Studio baggio consulting/Website_Build_Pack/03_DESIGN_AND_MOTION.md`
  - `_strategy/Studio baggio consulting/design.md`
- `.DS_Store` is deleted locally and should be removed from the repo in the next commit.

## 30 May Calm Authority Standalone Page - Local

Scope:

- `/calm-authority` standalone page only, plus shared Calm Authority product copy in `src/content/work.ts`.
- No `/business-tracker` implementation files edited.

Implemented:

- Reused the `/work` Calm Authority product panel for the standalone `/calm-authority` route so both surfaces stay visually and structurally aligned.
- Removed the self-linking `See more →` CTA on the standalone page while keeping the live-site CTA.
- Replaced the product panel `Built By` sentence with the 2025 Jayme Baggio / Harry Sims founder line Jayme wanted to keep.
- Added live links to the Calm Authority `Featured in` publications: Financial Times, Professional Adviser and the temporary Money Marketing link.
- Replaced raw React-rendered script tags with Next `Script` for structured data to clear the dev overlay script warning.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local `/calm-authority` returns `200` and includes the Built in 2025 line plus all three publication links.

Not done:

- Not pushed.

## 29 May Insights Section Direction - Local

Source document:

- `docs/rough-cut-insights-harvest-2026-05-29.md`
- `docs/INSIGHTS_STATUS.md` is now the locked working brief for the Insights/newsletter section.
- `docs/INSIGHTS_CONTENT_INVENTORY.md` is now the working curation list for article selection, category decisions, source files and launch order.

Paper exploration:

- `https://app.paper.design/file/01KSTAD8PWAYMXPFDSH6X0P7DE/1-0`
- Artboards:
  - `Insights Index 01 - Editorial Intelligence`
  - `Insights Index 02 - Ruled Research Library`
  - `Insights Index 03 - Dark Featured Front`
  - `Article 01 - Longform Editorial`
  - `Article 02 - Evidence Led Firecrawl`
  - `Article 03 - Research Dossier`
- Locked screenshot references:
  - `/Users/jaymebaggio/Desktop/Screenshots/CleanShot 2026-05-29 at 18.44.19@2x.png` for the Insights index.
  - `/Users/jaymebaggio/Desktop/Screenshots/CleanShot 2026-05-29 at 18.44.25@2x.png` for the article page.

Decision:

- Rough Cut is the source archive, not the visual template.
- The Insights section should publish full individual article pages, not bundled RC issue pages.
- Each strong Rough Cut article should get its own URL, metadata, related links and SEO surface.
- Current category set: Commercial Intelligence, AI Adoption, AI Skills, AI Search, Owned Media and AI Products.
- Articles should be redesigned into a consistent Studio Baggio article system using the locked site design system.
- Critical guardrail: article body copy must be lifted verbatim from the chosen source. Do not rewrite, smooth, shorten, restructure, change punctuation, remove em dashes, change spelling or replace phrases.
- Use `STUDIO_BAGGIO_DESIGN_SYSTEM.md`, `docs/studio-baggio-design-system.md`, `docs/studio-baggio-typography-system.md` and `src/app/globals.css` as the source of truth.
- Any bold thesis lines, evidence blocks, comparison blocks or native SVG/info graphics must use the Studio Baggio grammar: Aileron, neutral tokens, hairlines, ruled rows, square corners and restrained emphasis.
- The Firecrawl workflow graphic from Downloads is a logic reference only; it should be rebuilt as a native Studio Baggio diagram, not pasted in as a Rough Cut-style image.

Implemented:

- Added `/insights` as the hub/index page using the locked `Insights Index 01 - Editorial Intelligence` direction.
- Added individual article pages at `/insights/[slug]` using the locked `Article 01 - Longform Editorial` direction.
- Added launch article routes. Current rule: only real article boundaries get standalone routes. Do not split strong section headings into separate article pages.
- Added `src/content/insights.ts` as the article/category source file.
- Added `src/components/insights-article-accordion.tsx` for the ruled accordion article list.
- Added the Insights nav item and sitemap entries.
- Article bodies now render from exact `sourceMarkdown` blocks selected from the Rough Cut source files, including source headings/separators. The article renderer parses headings, paragraphs, lists, bold and italic markdown without rewriting the source words.

Exploration notes:

- Jayme prefers `Insights Index 01 - Editorial Intelligence` as the base direction.
- `Insights Index 01` was revised after feedback:
  - removed self-conscious source language like `Full articles from Rough Cut`
  - removed the `What this proves` panel
  - added a compact category/search strip under the featured article
  - locked preferred strip order: `All` and category filters on the left, search field on the right
  - article list should use the existing ruled accordion pattern so rows expand to show a preview on hover/focus/tap
  - kept the page in the existing Studio Baggio design system
- React Bits was checked for an accordion idea but did not surface a matching component; the build uses the existing local `ValueMap` / `ProofTiles` / `FaqAccordion` interaction pattern instead.
- Jayme prefers `Article 01 - Longform Editorial` for the article pages themselves.
- Article pages should use the longform editorial shell by default; diagrams/callouts can be embedded where useful, especially for Firecrawl, but should not turn the page into a diagram-led template.
- `Insights Index 03 - Dark Featured Front` is strongest as a special opening/feature treatment, but may be too heavy if every archive visit starts on a dark page.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes and prerenders `/insights` plus the six article routes.
- Local route checks return `200` for `/insights` and `/insights/firecrawl-open-web-commercial-intelligence`.
- Source-body comparison passes for all implemented `sourceMarkdown` blocks against their selected Rough Cut source spans.
- Playwright screenshots captured:
  - `output/playwright/insights-index-desktop.png`
  - `output/playwright/insights-firecrawl-desktop.png`
  - `output/playwright/insights-index-mobile.png`
  - `output/playwright/insights-firecrawl-mobile.png`

Important caveat:

- The final article body copy is source-exact for the selected spans, including source headings/separators. Metadata, preview copy, category labels and related links are page furniture and can be edited separately, but body text must remain locked unless Jayme explicitly approves a source-span or packaging change.
- Follow-up: removed the right-side hero description from `/insights`; the hub hero now shows only `Insights` with the blue dot.
- Follow-up: category labels tightened to `Commercial Intelligence`, `AI Adoption`, `AI Skills`, `AI Search`, `Owned Media` and `AI Products`.
- Follow-up: index previews now come from the first one to two real paragraphs of each source article, and article-page display titles use the article title rather than source packaging like `Slide 2:` or `Article 2 —`.
- Follow-up validation after the category label change: `npm run typecheck`, `npm run lint` and `npm run build` pass.
- Follow-up: audited the RC2-RC10 Rough Cut archive plus Future Ideas/Playbooks against the six categories in `docs/INSIGHTS_CONTENT_INVENTORY.md`; kept the current category set rather than adding more filters.
- Follow-up: `/insights` now labels the list as `Articles`, defaults to the full list, and the search index includes full article source text rather than only titles/previews.
- Follow-up validation: local `/insights` opened in the Codex in-app browser at `http://127.0.0.1:3006/insights`; default active filter is `All`, all current articles render, and searching `Zapier` returns the Firecrawl article via full article body search.
- Follow-up: added the title/refinement staging rule to the Insights docs. First pass keeps Jayme's original straightforward article titles. After the full article set is live, do a separate SEO/editorial pass for business-searcher framing, richer components, visuals, diagrams, metadata and internal links without rewriting article bodies.
- Follow-up: removed `/insights/public-profile-is-no-longer-your-shop-window` because Jayme confirmed that public-profile/evidence-layer section belongs inside the Firecrawl article, not as its own standalone article. Do not re-add it as a route.
- Follow-up: fixed the article JSON-LD script warning by rendering the schema as a plain inert `application/ld+json` script instead of using `next/script` inside the article component.
- Follow-up: moved seven downloaded PDF source files from `~/Downloads` into `/Users/jaymebaggio/Desktop/Rough Cut/Downloaded source PDFs/` and added them to `docs/INSIGHTS_CONTENT_INVENTORY.md` as candidate/source material. They are not approved article splits; exact title/start/end mapping is required before any new page is added.
- Follow-up: locked Jayme's approved Insights article list in `docs/INSIGHTS_CONTENT_INVENTORY.md`. Approved additions include ChatGPT for Business Owners, RC7.5 screen-work article, Brands Lean into GEO, Building AI Operating Systems in 2026, AI Creative Summit 2025, Futureweek AIMM, 2026 Predictions and Tools of the Year 2025. AI SEO Framework was later removed because Jayme flagged it as a draft.
- Follow-up: added approved article pages locally:
  - `/insights/chatgpt-for-business-owners`
  - `/insights/ai-future-of-work`
  - `/insights/geo-generative-engine-optimisation`
  - `/insights/building-ai-operating-systems`
  - `/insights/ai-predictions-2026`
  - `/insights/best-ai-tools-2025`
- Follow-up validation before correction: `npm run typecheck`, `npm run lint` and `npm run build` passed for the larger article set. The current corrected set is 11 article URLs because two accidental split routes have been removed.
- Follow-up correction: merged the accidental RC6 split back into `/insights/ai-adoption-value-gap`. `High performers think in operating systems, not tools` is a section inside that article, not a standalone route.
- Follow-up correction: merged the accidental RC8 split back into `/insights/what-is-an-ai-skill`. `From skill to product` is a section inside that article, not a standalone route.
- Follow-up correction: `/insights/ai-operating-systems-not-tools` and `/insights/from-skill-to-product` must stay removed unless Jayme explicitly asks to split them later.
- Follow-up correction: fixed the index preview extractor so list-style articles use the first one to two list items as preview blocks instead of treating an entire bullet list as one paragraph.
- Follow-up correction: Insights accordion rows are now click-only. Rows no longer expand on hover/focus and no article is open by default.
- Follow-up correction: removed the `next/script` article schema block from `/insights/[slug]` because it was causing the React script-tag dev overlay on article routes. Do not re-add schema as a rendered React script unless it is verified not to trigger the overlay.
- Follow-up validation after corrections: `npm run typecheck`, `npm run lint` and `npm run build` pass. Local route checks return `200` for `/insights`, `/insights/ai-adoption-value-gap` and `/insights/what-is-an-ai-skill`, and `404` for the removed split routes `/insights/ai-operating-systems-not-tools` and `/insights/from-skill-to-product`.

## 29 May New Homepage Section Prep - Local

Branch:

- `quiet-luxury-homepage-system`

Current source of truth:

- Active project is `/Users/jaymebaggio/Desktop/Studio Baggio/Website`.
- Local preview is already running at `http://127.0.0.1:3006/` and returns `200`.
- Homepage implementation lives in `src/app/page.tsx`.
- Main editable copy lives in `src/content/site.ts`.
- Homepage visual system and section styles live in `src/app/globals.css`.
- Homepage motion controller lives in `src/components/page-reveals.tsx`.

Current homepage order:

- Reference hero.
- Opening argument.
- The Gap.
- What We Build / Value Map.
- AI Opportunity Audit.
- Working Promise.
- Live Work.
- Who This Is For.
- FAQ.
- Final CTA.

Prep notes for the next section:

- Add new homepage copy to the `home` object in `src/content/site.ts` where practical.
- Add the section in `src/app/page.tsx` with the existing `home-section`, `editorial-container`, `data-home-section` and `data-motion-section` pattern.
- Reuse existing type roles and ruled-list grammar unless the new section genuinely needs a custom component.
- If adding a new `data-motion-section` type, extend `src/components/page-reveals.tsx`; otherwise the generic reveal branch is enough for label/title/body/rows.
- Preserve the locked quiet monochrome system: Aileron only, neutral greys, sparse blue only for deliberate emphasis/active states, no gradients/blobs/cards.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.

Not done:

- No new website section implemented yet.
- No build run because this was orientation/prep only.

## 29 May Products Page Image + Motion Polish - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- `/work` products page only.
- No `/business-tracker` implementation files edited.

Implemented:

- Added subtle Framer Motion entrance treatment to the products hero copy, display title and product tab row.
- Added a short fade/settle transition when switching product panels.
- Improved Calm Authority image quality by serving the original PNG directly for that product image instead of the default Next image optimizer output.
- Kept all layout, copy and typography structure unchanged.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local `/work` check at `1440x900` has no console errors and no horizontal overflow.
- Calm Authority product panel now loads `public/assets/products/calm-authority-stat-feature-og.png` directly at `1493x1005`.
- Product tab switching still works; Fire Source panel updates correctly.

Not done:

- Not pushed.

Follow-up polish:

- Removed the blue product-tab underline and blue panel rule; active tab state is now carried by ink/weight and subtle tap/settle motion.
- Swapped the Calm Authority panel image to the cleaner `calm-authority-featured-in.png` asset from Downloads.
- Gave the Calm Authority media column more desktop width so the image reads larger.
- Updated the Business Tracker `/work` product-panel copy to the latest commercial intelligence / CRM differentiation / built-for copy.
- Rebalanced the Business Tracker `/work` panel so `What it does` and `How it's different from a CRM` sit in the left copy column, with the product image, blue quote and `Built for` on the right.
- Removed the temporary retainer/pricing line from the Business Tracker `/work` panel.
- Re-verified `npm run typecheck`, `npm run lint`, `npm run build`.
- Local `/work` check confirms no console errors, no horizontal overflow, active tab weight `700`, inactive tab weight `400`, and no blue tab/panel border.
- Local `/work` Business Tracker tab check confirms the new copy, `See more →` CTA and no horizontal overflow.

## 29 May Products Page Harvest - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- `/work` products page only.
- No `/business-tracker` implementation files edited.
- Unrelated dirty copy/strategy drafts left untouched.

Implemented:

- Replaced the old simple Work rows with a Moonchild-inspired products page:
  - full-frame Live Work hero
  - `Products in market.` display headline
  - four product tabs
  - long-form editorial product panel
- Mapped the imported layout into Studio Baggio typography rules:
  - Aileron only
  - regular-weight display type
  - existing label/body/small text tokens
  - no raw Moonchild inline style system
- Added product-page content to `src/content/work.ts` so the page remains content-layer driven.
- Added downloaded product images under `public/assets/products/` using clean asset names.
- Swapped Calm Authority to the stat/proof image from Downloads rather than the simpler brand-only image.
- Fixed the product hero dot line break and mobile hero gutter issue found during QA.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Desktop `/work` screenshot at `1440x900` has no horizontal overflow and matches the Moonchild hero structure.
- Mobile `/work` screenshot at `390x844` has restored page gutters and no horizontal overflow.
- Tab switching works; Fire Source panel changes title/image correctly.

Not done:

- Not pushed.
- Awaiting Jayme review of the local preview.

## 28 May Homepage Section 2 Scan Reveal - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Homepage opening argument / section 2 motion only.
- No copy, layout, Business Tracker page, deployment, domain or product-page changes.

Implemented:

- Replaced the opening section's fast vertical line-rise with a slower GSAP horizontal masked text reveal.
- Added a subtle blur-to-sharp scan treatment so each line resolves more deliberately instead of snapping in.
- Split the setup line into measured visual lines for the same reveal system.
- Kept the blue `Harder to compete with.` payoff as the final motion beat with a slightly larger resolve.
- Extended the pinned opening section scroll range and increased the spacing between each support line so the reading beats do not collapse into each other.
- Slowed the same pinned opening scroll reveal again on 29 May: desktop scroll range is now `450svh`, mobile `430svh`, with wider GSAP timing gaps and a slower scrub so each line has more time to land.

Verified locally:

- Codex in-app browser at `http://localhost:3006/` shows the section 2 text clipping/blur resolving as the user scrolls.
- Codex in-app browser timing check confirms the support lines now resolve in separate scroll beats before the blue payoff line appears.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

Not done:

- Production verification after Vercel deployment pending.

## 28 May Business Tracker Version For Main

Branch:

- `quiet-luxury-homepage-system`

Scope:

- `/business-tracker` only.

Implemented:

- Removed the Business Tracker hero from the shared `studio-page-frame` wrapper so the dashboard image cannot be treated as a right-hand hero column.
- Moved the dashboard image inside the hero copy flow, after the locked hero copy, as `.bt-hero-shot`.
- Removed the unused OG poster image from the working tree; the hero uses `public/business-tracker/hero/dashboard-hires.png`.
- Kept the only approved Section 2 copy change:
  - `Commercial intelligence your competitors cannot see.`
  - `Eyes and ears on who is showing intent, how they qualify and what to do next.`
- Kept pricing/commercial detail out of the main page flow and in FAQ only.

Verified locally:

- Local server responds at `http://localhost:3006/business-tracker`.
- Restarted the local dev server on port `3006` after the hero repair to clear stale Turbopack/browser state.
- Served HTML contains `editorial-container bt-hero-frame` and does not contain `studio-page-hero-grid bt-hero-frame`.
- Served HTML places `.bt-hero-shot` inside `.bt-hero-copy`.
- Served CSS caps `.bt-hero-shot` at `max-width: min(780px, 100%)`.
- Business Tracker image assets return `200` locally.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

Not done:

- No production deploy.
- Further design refinement still needed; this version is being pushed because it is better than current `main` and will be picked up by another agent.

## 27 May Homepage Copy And Header Polish - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Homepage copy/layout polish and mobile header menu style only.
- Preserved concurrent Business Tracker work; no Business Tracker page files were edited by this pass.

Implemented:

- Hero meta now uses the approved four-line lockup:
  - `PRACTICAL SYSTEMS BUILT AROUND`
  - `HOW YOUR BUSINESS WINS IN MARKET.`
  - `NOT AI THEORY.`
  - `NOT GENERIC AUTOMATION`
- Tightened the first two hero meta lines so they read as one sentence, while keeping breathing room before the blue proof lines.
- Updated Gap title to `Adoption has run ahead of meaningful ROI.` and narrowed the title measure so `meaningful ROI` sits together on the second line.
- Updated the Gap close paragraph with a deliberate line break before `Studio Baggio`, widened the paragraph measure and enabled `white-space: pre-line` so the second sentence reads as one line where the frame allows.
- Updated Audit title and Working Promise first paragraph copy to reduce `commercial` repetition.
- Restyled the mobile pop-out menu links to small uppercase tracked nav text, matching the desktop nav language.
- Added the mobile menu rule to `STUDIO_BAGGIO_DESIGN_SYSTEM.md`.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.

Not done:

- Not pushed.

## 27 May Business Tracker Hierarchy Refinement - Local Verified

Branch:

- `quiet-luxury-homepage-system`

Scope:

- `/business-tracker` only.

Implemented:

- Promoted the What It Does argument to a proper section title: "Commercial intelligence your competitors cannot see."
- Promoted the "Every signal traced to a named person..." line into the section proof statement instead of ordinary body copy.
- Renamed the vague Operating Layers eyebrow to “The Intelligence Engine” and added a clear section title explaining the ranked follow-up pipeline.
- Reworked Outcome from a dark banner into a calm ruled section with separate outcome pillars: Visibility, Qualified Leads and Commercial Advantage.
- Moved "Extends to hiring & beyond" before "Who it's for" and gave both sections complete frames.
- Tightened the FAQ transition spacing while keeping the homepage FAQ disclosure pattern.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Codex in-app browser local check confirms zero horizontal overflow, correct section order and Aileron weights `400`/`700` only.

Not done:

- Push and production verification pending.

## 27 May Business Tracker Rebuild - Local Verified

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Rebuilt `/business-tracker` only.
- No homepage, Work, Calm Authority, About, Contact or Privacy route changes.

Implemented:

- Updated Business Tracker content in `src/content/site.ts` to the locked page structure.
- Added the supplied Business Tracker assets under `public/business-tracker/`.
- Added a four-card Input Map component using the supplied product mock images.
- Reworked the page rhythm to match the locked Studio Baggio homepage system: calm labels, row-scale titles, homepage-style ruled lists and neutral-only Studio chrome.
- Moved the commercial/pricing detail out of the main page flow and into FAQ disclosure content, per Jayme's direction.
- Reused the existing GSAP PageReveals system, including a staggered Input Map card reveal.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Codex in-app browser checks pass at desktop `1440x900`, tablet `820x900` and mobile `390x844`: no horizontal overflow, no console errors, Input Map responsive layout correct, all four mocks visible, FAQ disclosure pattern intact.
- Business Tracker asset paths return `200` locally.
- Scoped page typography uses Aileron only, weights `400` and `700`.

Not done:

- Push and production verification pending.

## 27 May Homepage Motion System Lock - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Locked the approved homepage motion system in documentation.
- Documentation only: no homepage code, layout, copy, animation implementation, deployment or domain changes.
- Business Tracker implementation files were not edited.

Implemented:

- Replaced the stale `MOTION_AGENT_HANDOVER_2026-05-27.md` rebuild brief with a current locked homepage motion handover.
- Captured the approved motion ownership split:
  - GSAP + ScrollTrigger for scroll storytelling and section reveals.
  - Lenis for page-level smooth scroll.
  - Framer Motion for accordions, menu and tap micro-interactions.
  - CSS keyframes for the simple first-load hero/header entrance.
- Documented the working homepage architecture: native CSS sticky stages for Opening and Gap, GSAP child transforms only, section-specific reveal branches, reduced-motion fallback and Live Work image readiness.
- Added a motion reference and key rules into `STUDIO_BAGGIO_DESIGN_SYSTEM.md`.

Verified locally:

- Documentation checked against `src/components/page-reveals.tsx`, `src/components/smooth-scroll.tsx`, `src/app/page.tsx`, relevant component motion files and current homepage CSS.
- No build was run because this was a documentation-only change.

Not done:

- Not pushed.

## 27 May Live Work Image Decode Fix - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Small interaction polish for the homepage `Live Work` accordion.
- No copy, layout, product data, routing, animation-system, deployment or domain changes.

Implemented:

- Updated `src/components/proof-tiles.tsx` so all four homepage product images preload and decode on component mount.
- Added image readiness tracking so the media frame stays hidden until the image has actually loaded/decoded.
- Added a short opacity/translate fade-in to the existing media frame styling.
- Updated `STUDIO_BAGGIO_DESIGN_SYSTEM.md` so this image-ready media behaviour is now part of the locked Live Work component rules.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local dev server responds at `http://localhost:3006/`.

Not done:

- Not pushed.
- Codex Browser tools were not exposed in this session, so no visible in-app-browser click pass was available from the tool layer.

## 27 May Studio Baggio Design System Lock - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Documented the current approved homepage as the Studio Baggio design-system source of truth.
- Documentation only: no design, layout, animation, component, copy, deployment or domain changes.

Implemented:

- Added `STUDIO_BAGGIO_DESIGN_SYSTEM.md` at the project root.
- Captured the current homepage direction: quiet editorial Swiss-informed system, monochrome surfaces, ruled rows, sparse blue emphasis and regular-weight Aileron typography.
- Locked the current colour tokens, typography roles, type scale, layout widths, section rhythm, component patterns, motion ownership, responsive rules, accessibility rules and implementation guardrails.
- Included the exact local font constraints: Aileron `400`, `700` and `400 italic` only, with no synthetic mid-weights.
- Documented the current component rules for header, CTAs, ruled accordions, What We Build, Live Work, AI Opportunity Audit, Working Promise, Who This Is For, FAQ and footer.

Verified locally:

- Documentation reviewed against the current homepage implementation files.
- No code build was run because this was a markdown-only documentation change.

Not done:

- Not pushed.
- `CLAUDE.md` was not edited because it already has unrelated local changes in the worktree.

## 27 May Typography Weight Softening - Local Review

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Typography weight/system pass only after Jayme felt the homepage was reading too bold/heavy.
- No layout, animation, copy, routing, product content, deployment config or domain changes.

Implemented:

- Kept the existing local Aileron setup. The project only has Aileron `400`, `700` and italic files, so no new font family or fake mid-weight was introduced.
- Added homepage/system weight tokens for labels, titles, rows, strong emphasis and CTA labels.
- Moved eyebrows, small uppercase questions, product names, `What We Build` row headings, the large audit/fit titles and the strikethrough promise lines to Aileron regular.
- Kept Aileron bold for CTA labels and deliberate inline emphasis, so hierarchy remains clear without the page feeling heavy.
- Removed the synthetic `300` hero promise weight and moved it to real Aileron regular.

Verified locally:

- Local preview remains `http://localhost:3006/`.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Playwriter computed-style check confirms key homepage roles now render at `font-weight: 400`, while CTA labels remain `700`.
- No horizontal overflow detected in the browser check.
- Pushed to GitHub `main` and `quiet-luxury-homepage-system` at commit `1ab628e` (`Refine homepage products and typography`).

Not done:

- Vercel production deployment should be checked separately if Jayme wants live-domain confirmation.

## 27 May Working Promise Layout Adjustment - Local Review

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Small homepage layout adjustment only for the `Working Promise` section after Jayme flagged the copy/strikethrough spacing as odd.

Implemented:

- Changed the section from three disconnected grid items into a clearer lockup:
  - `WORKING PROMISE` eyebrow above.
  - Body copy in the left column.
  - Strikethrough negative lines in the right column.
- Kept typography, copy, animation data attributes and section styling within the existing homepage system.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Browser measurement at local preview shows copy and strikethrough columns top-aligned, no horizontal overflow.
- Hero meta line also keeps `WIN IN MARKET` together as one unbroken phrase.

Not done:

- Push pending after Jayme's final small hero-line request.

## 27 May Live Work Product Image Polish - Local Review

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Added the new OG images Jayme supplied for Calm Authority and Fire Source.
- Polished the homepage `Live Work` / products accordion media treatment.

Implemented:

- Added homepage OG image assets:
  - `public/assets/products/calm-authority-og.png`
  - `public/assets/products/fire-source-og.png`
- Wired Calm Authority and Fire Source to those assets in `src/content/work.ts`.
- Reduced product media size in the open accordion panels from a `420px` desktop cap to `360px`.
- Added a quieter framed image treatment with an inner image well, hairline border and subtle surface so the images feel integrated rather than pasted onto the row.
- Updated the Next Image `sizes` value to match the new desktop media cap.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Browser check confirms all four Live Work rows now resolve homepage images at `360px` wide and there is no horizontal overflow.
- Pushed to GitHub `main` and `quiet-luxury-homepage-system` in commit `Polish live work product media`.

Not done:

- Vercel production deployment should be checked separately if Jayme wants live-domain confirmation.

## 27 May Moonchild Section Harvest - Local Review

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Harvested only the preferred Moonchild/reference treatments for:
  - Homepage hero meta/subheader treatment.
  - `What We Build`.
  - `AI Opportunity Audit`.
  - `This is not...` promise section.
  - `Who This Is For`.
  - FAQ.
  - Final CTA/footer handoff.
- Did not merge the downloaded app wholesale.
- Did not touch unrelated pages, routes, contact form, metadata or deployment config.

Implemented:

- Updated hero meta copy styling so `NOT AI THEORY.` and `NOT GENERIC AUTOMATION.` use the Moonchild blue accent.
- Reduced hero promise/subheader weight and tightened the hero wordmark scale so the promise lines fit inside the first frame at the reviewed desktop viewport.
- Rebuilt `What We Build` as a white, compact single-open accordion with light-grey open panel, chevrons, includes list and goal block.
- Kept the accordion on Framer Motion only, with GSAP `ScrollTrigger.refresh()` after open/close so scroll measurements do not judder.
- Rebuilt `AI Opportunity Audit` as the Moonchild-style ruled deliverable list with bold lead phrase and supporting descriptor on each row, plus the black CTA.
- Rebuilt the promise section as a two-column layout: grey strikethrough negative lines on the left and practical delivery copy on the right.
- Rebuilt the FAQ as a quiet Moonchild-style single-open accordion: first item open by default, uppercase small questions, ruled rows, grey plus icons and blue close icon on the active row.
- Rebuilt `Who This Is For` as the Moonchild-style two-column ruled list with `Best for` and `Not for` columns, small uppercase labels, dash markers and six rows per side.
- Reduced the final black CTA from a full-screen inherited homepage section to a compact footer band. Desktop review metrics: black CTA band about `177px`, white info footer about `167px`.
- Removed the forced `100svh` minimum from the harvested editorial sections so they sit as natural-height bands rather than full-screen panels.
- Added named CSS tokens for the new service-heading, audit-title, deliverable and promise-negative type roles so the harvest stays inside the homepage typography system.
- Fixed mobile edge spacing by restoring the shared `.editorial-container` width on harvested homepage section frames and moving the mobile side-padding rhythm to `24px`.
- Removed mobile hero promise overflow by allowing the promise lines to wrap/balance within the frame.
- Widened the mobile stat-number column so the Gap section percentages no longer overflow their grid cell.
- Tuned `Who This Is For` after Moonchild-reference review so it keeps the two-column ruled-list layout while fitting the desktop frame instead of using the oversized raw reference scale.
- Restored breathing room in `Who This Is For` after the first density pass made it feel too compressed.
- Moved the Gap scroll-story trigger earlier so the section starts animating as it enters the viewport instead of arriving as a hidden sticky frame.

Verified locally:

- Local preview remains `http://localhost:3006/`.
- Compared against the live Moonchild reference in Playwriter:
  - `https://studio.moonchild.ai/project/9a40eb56-f778-4d8b-80de-e6c18814756e/Baggio-Swiss-UI?frameId=337a34a9-d7ad-4fac-8515-a06914c1e240`
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Current density check at desktop review size:
  - What We Build open row: about `438px`; closed rows: about `94px`; five rows visible in frame.
  - AI Opportunity Audit section height reduced from about `1204px` to about `1004px` in the same Playwriter viewport.
  - Promise section: about `490px`, matching the compact Moonchild-style band.
- FAQ interaction check: clicking row 2 closes row 1 and opens only row 2; closed rows are about `81px` high in the Playwriter viewport.
- Design-system consistency check:
  - `Who This Is For` label/list labels use the shared `12px` uppercase label role.
  - `Who This Is For` list rows use `15px` desktop / `13px` mobile small-body rows.
  - Harvested list and accordion rules use the shared `--sb-rule` hairline (`#d8d8d8`).
  - Desktop CTA/footer handoff now uses comparable heights instead of a huge black block.
  - Mobile checks at reviewed phone widths show `24px` left/right frame spacing across header, hero, What We Build, proof rows, CTA and footer.
  - Mobile checks at reviewed phone widths and a narrower `320px` viewport have no horizontal overflow.
  - `Who This Is For` desktop frame check after spacing correction: section height about `819px` in the 1440-style review viewport, final row lands at about `783px`, no horizontal overflow.
  - Gap story check: label/title are visible before the sticky frame settles, evidence is visible by the sticky hold, and the close line lands during the held frame.

Not done:

- No deploy yet.

## 27 May Homepage Motion Expert Pass - Local Only

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Motion-only pass after `MOTION_AGENT_HANDOVER_2026-05-27.md`.
- No copy, content, route, metadata, form, product, push or deploy changes.
- Confirmed latest local package versions are current: GSAP `3.15.0`, `@gsap/react` `2.1.2`, Lenis `1.3.23`, `framer-motion` `12.40.0`.

Implemented:

- Kept Framer/Motion limited to existing header/menu/value-accordion micro-interactions.
- Kept GSAP ScrollTrigger as the owner of scroll storytelling, per handover and refreshed `framer-motion-animator` skill guidance.
- Re-timed the two sticky story sections so their ScrollTrigger timelines map to the native sticky stage instead of firing from far below the viewport.
- Extended the native sticky scroll distance for Section 2 and Gap so the reveals have breathing room and a held final state.
- Updated Section 2 choreography: headline/qualifier first, setup and outcome stack second, blue final outcome last.
- Updated Gap choreography: eyebrow/title first, evidence frame second, once-only count-up, takeaway last.
- Added section-specific reveal ordering for Value, AI Opportunity Audit, Working Promise, Live Work, Fit, FAQ and CTA instead of one generic batch reveal.
- Started later-section reveals earlier so rows are readable when the section becomes the active viewport.
- Kept reduced-motion fallback static: no Lenis/sticky behaviour, all reveal content visible, Gap numbers final.

Verified locally:

- Local preview already running at `http://localhost:3006/`.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Automated Chrome headless visual pass at `1440x900`, `390x844`, and desktop reduced-motion found:
  - horizontal overflow: `false`
  - visible hidden reveal elements at final scroll: `[]`
  - desktop and mobile sticky final states fit the viewport
  - reduced motion collapses sticky sections to normal static sections
- Screenshots saved under `.animation-review/motion-rebuild-2026-05-27/`.

Not done:

- No push.
- No deploy.
- Needs Jayme review in the local page flow.

## Tomorrow (27 May 2026) — Open Actions

### 1. Update live site FAQs
Source of truth: `FAQ_COPY_DRAFT.md` (locked).

**Replace the five existing FAQs on the live homepage with the updated wording:**
- Q1 — Is this AI training? *(updated — leads with delivery model, no "generic AI education programmes" defensive line)*
- Q2 — Is this automation? *(updated — drops Zapier/n8n name-drop, repositions automation as sub-component)*
- Q3 — Is this marketing? *(updated — positions Studio Baggio as the layer marketing fits into, not "wider than a marketing agency")*
- Q4 — Is this only for wealth firms? *(updated — names target sectors: law, insurance, financial services)*
- Q5 — Do you build as well as advise? *(updated — adds "assets & working system")*

**Add three new FAQs:**
- Q6 — How long does the AI Opportunity Audit take? (`14 days...`)
- Q7 — Do you work with our existing marketing team or agency? (`Yes. Studio Baggio works alongside...`)
- Q8 — What's the first step? (`Clicking 'Enquire now' below...`)

### 2. Update additional pages
- **Business Tracker page** — apply `BUSINESS_TRACKER_COPY_DRAFT.md` (locked, includes the slide-verbatim Operating Layers, Input Map with channel blocks below the bridge line, `Commercial Intelligence` eyebrow, `Enquire now` CTA).
- Audit other pages (`/about`, `/calm-authority`, `/work`, `/contact`) against any copy drift since last update.

### 3. Fix text spacing issues
Jayme spotted spacing issues during live review — TBC location once she walks me through them. Likely candidates: hero promise line breaks, Gap section caption widths, FAQ row spacing, mobile margins.

### 4. Indexing and SEO
Full site indexing + SEO pass. Includes:
- Google Search Console verification + sitemap submission
- `sitemap.xml` and `robots.txt` correct for all live pages (/, /about, /work, /business-tracker, /calm-authority, /contact, /privacy)
- Per-page meta titles + descriptions + OG/Twitter cards (currently homepage-only or generic)
- Canonical tags
- Schema.org markup: Organization (Studio Baggio Ltd), Person (Jayme Baggio), Product (Calm Authority, Business Tracker, Last30Days, Fire Source)
- Target keywords by page (e.g. "applied AI consultancy UK", "AI systems for financial advisers", "AI commercial advantage")
- Internal linking audit (every product page linked from /work and homepage)
- Image alt text pass
- Lighthouse SEO score check post-deploy

---

## Current Build

The old static single-page site has been replaced with a live Next.js phase-1
site for `studiobaggio.ai`.

Core message:

`Turn AI into a commercial advantage.`

## 26 May Homepage Motion Rebuild - Local Approval Pending

Branch:

- `quiet-luxury-homepage-system`

Production reference checked before edits:

- `https://www.studiobaggio.ai` is aliased to `studio-baggio-fcrpz0kz4-jaymes-projects-95f6f9cd.vercel.app`.
- Vercel inspect/build logs confirm that deployment was built from `main` at commit `ddcc96a` (`Compact Products page hero`) on 26 May 2026.

Current local state:

- Motion rebuilt from the static reset with a narrower architecture: Lenis for page glide, GSAP ScrollTrigger for scroll storytelling, and Framer Motion only for small header/button/accordion interactions.
- Lenis is synced to GSAP's ticker and `ScrollTrigger.update`, avoiding the separate RAF loop that can cause scroll judder.
- `PageReveals` is the single homepage GSAP controller, with `useGSAP`, `gsap.matchMedia()`, cleanup, and reduced-motion fallback.
- Section 2 and Gap now use native sticky stages instead of GSAP `pin: true`. The rest of the homepage uses in-flow reveals, not sticky holds.
- Section 2 has its own scroll-controlled timeline: headline, qualifier, Studio Baggio setup, outcome stack, then the blue final line.
- Gap has its own scroll-controlled evidence reveal and a once-only calm stat count-up for `66%`, `20%`, and `12%`.
- What We Build remains a click-only accordion with Framer Motion limited to row open/close micro-interaction.
- Hero and copy remain unchanged.

Verified locally:

- Local preview: `http://localhost:3006/`.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Desktop `1440x900`: zero console errors, zero horizontal overflow, zero GSAP pin spacers, Section 2 blue line fully lands in the sticky frame before release, and Gap numbers settle to `66%`, `20%`, `12%`.
- Mobile `390x844`: zero console errors, zero horizontal overflow, zero GSAP pin spacers, Section 2 final blue line fits in the sticky frame, and Gap final state fits with the takeaway visible.
- Reduced motion: zero pin spacers, no sticky stages, no Lenis class, all reveal content visible statically, and Gap numbers show final values immediately.
- Scroll recordings saved at `.animation-review/20260527-final-scroll-review-desktop.mp4` and `.animation-review/20260527-final-scroll-review-mobile.mp4`.
- Verification screenshots/contact sheets saved under `.animation-review/20260527-final-check/` and `.animation-review/20260527-final-scroll-review-contact.png`.
- Full Gemini video analysis remains blocked because `GEMINI_API_KEY` is not set in this environment.
- Follow-up polish after Jayme review: restored a soft header entrance, softened the shared reveal ease/durations, added visible row-level reveals for What We Build and Live Work, and kept the no-extra-pins rule intact.
- Superseded follow-up verification: the earlier two-GSAP-pin-spacer version was replaced because Jayme still felt the pin boundary slam.
- GSAP-docs-based correction: Section 2 and Gap no longer use `pin`, `pinSpacing`, or `anticipatePin`; native sticky is handling the hold while GSAP only controls child transforms/opacity.
- Hero wordmark entrance restored with masked transform/opacity animation; reduced motion disables it cleanly.

Not done:

- No push.
- No deploy.
- Waiting for Jayme to review the local browser flow.

## 26 May Other Pages Design System Rollout

Branch:

- `quiet-luxury-homepage-system`

Pre-review correction:

- Removed the `/ai-advantage` page from active navigation, sitemap and route files.
- Updated the Business Tracker page copy to match `BUSINESS_TRACKER_COPY_DRAFT.md`.
- The homepage remains unchanged.

Scope:

- Rolled the approved homepage `.home-4b` design system across:
  - `/work`
  - `/business-tracker`
  - `/calm-authority`
  - `/about`
  - `/contact`
  - `/privacy`
- Did not change the homepage hero/header direction or homepage implementation.
- Business Tracker visible copy is now sourced from the approved draft copy file.

Implemented:

- Added a shared `studio-page` extension to `src/app/globals.css` using the locked `.home-4b` tokens, typography roles, spacing, section frames, dark sections, ruled rows, proof rows, contact form framing and CTA treatment.
- Rebuilt Work as a proof-led ruled case-study index instead of an interactive portfolio card layout.
- Rebuilt Business Tracker as a product system page with an editorial intro, dark operating-layer index, input map, outcome, fit, commercial terms and CTA.
- Rebuilt Calm Authority as a Studio Baggio product page using only existing Calm Authority copy and the real Calm Authority proof image asset.
- Rebuilt About, Contact and Privacy into the same editorial page rhythm; Contact now separates the intro frame from the form frame so the first read stays complete on desktop and mobile.
- Kept motion on the existing GSAP `PageReveals` path for semantic section/title/row reveal; no new scroll-storytelling layer added.

Verified:

- `npm run typecheck`, `npm run lint` and `npm run build` pass.
- Latest Codex Browser pre-review QA confirms:
  - `/business-tracker` at `1440x900` and `390x844` has no horizontal overflow, no console errors and all draft copy present in the DOM.
  - `/ai-advantage` returns `404`.
  - `/sitemap.xml` no longer includes `/ai-advantage`.
- Codex Browser QA at `1440x900` and `390x844` across all live rollout routes confirms:
  - horizontal overflow offenders: `0`
  - visible Next error overlay: `false`
  - visible font family: Aileron only
  - visible font weights: `400` and `700` only
- Browser screenshots saved in `output/playwright/`.
- The Codex in-app browser blocked loopback URLs with `ERR_BLOCKED_BY_CLIENT`, so QA used the same local dev server via the Mac LAN address `http://172.27.160.240:3005`.

## 26 May Homepage Option A Editorial Calm

Branch:

- `quiet-luxury-homepage-system`

Reference:

- Saved the implementation plan at `docs/homepage-option-a-editorial-calm-implementation-plan.md`.
- Saved the locked typography guide at `docs/studio-baggio-typography-system.md`.
- Locked the canonical site UI design system handoff at `docs/studio-baggio-design-system.md`.
- Saved the other-pages rollout handover for the next agent at `docs/studio-baggio-pages-rollout-handover.md`.
- Source copy is `HOMEPAGE_COPY_DRAFT.md`.

Implemented:

- Updated the homepage to the approved Paper `Option A Editorial Calm` direction while keeping the existing header/hero structure intact.
- Swapped in the latest approved Gap section copy: UK Government AI Adoption Research, `16%`, `77%`, `12%`, and the `effectivly` close line exactly as supplied.
- Rebuilt the post-hero homepage flow as: Opening argument, Gap, What We Build, AI Opportunity Audit, Working Promise, Live Work, Fit, FAQ and CTA.
- Removed the duplicate `.home-4b` CSS patch stack and replaced it with one locked homepage system at the end of `src/app/globals.css`.
- Locked the homepage type system to defined roles for label, title, lead/stat, body, row and small text; section titles now share the same size, weight, case rules and neutral colour tokens.
- Documented the typography roles, sizes, line-heights, weights, colours, casing, letter-spacing and usage rules so future pages can follow the same system.
- Added consistent section hairlines, reading lanes, dark-section treatment and CTA treatment.
- Updated GSAP reveal motion so labels, masked title lines, evidence, sources, rules and close lines reveal in a semantic order; Framer Motion remains limited to row/button micro-interactions.
- Fixed the Studio Baggio header link on the homepage so it scrolls back to the top instead of doing nothing.
- Refined the homepage motion after live review: section reveals now scrub across the reader's scroll position instead of firing early, the opening outcome stack has its own scroll-linked sequence, and `Harder to compete with.` now receives a separate emphasis beat.
- Locked the hero promise under `STUDIO BAGGIO.AI` into three intentional desktop lines to match Jayme's reference: promise title, market line, and `BUILD TRUST, CAPTURE DEMAND & FOLLOW UP SMARTER`.
- Added a named `Hero Promise` typography role so the larger hero subtext is part of the type system rather than a one-off override; first two lines use muted grey and the final line uses ink.
- Added the restrained accent-blue token `--sb-accent-blue` and used it only on the `BAGGIO.AI` dot.
- Reworked the Gap section back into one calm full-width evidence frame matching Jayme's reference: title first, one three-column `16% / 77% / 12%` stat row, fuller explanatory copy under each stat, individual source lines and closing commercial takeaway.
- Reworked Section 2 as the deliberate centred exception in the homepage system: the opening thesis fades on scroll, the Studio Baggio outcome stack expands into view, and `Harder to compete with.` is the only full blue line on the page.
- Reworked `What We Build` into a restrained expandable index: rows start collapsed with the service headline and one clear summary line visible, then full detail expands on hover, focus or click.
- Tightened the mobile hero promise under `STUDIO BAGGIO.AI` so the three intended lines no longer create orphaned words on phone widths.
- Corrected the latest Gap evidence layout to match Jayme's supplied visual reference: white frame, slimmer 3-column stat row, narrower caption measures and per-stat sources.
- Reintroduced Section 2 as a controlled GSAP reading sequence: the thesis reads first, the grey qualifier follows, the Studio Baggio setup appears on the next scroll beat, the outcome stack resolves last, and the blue `Harder to compete with.` line gets a held final beat.
- Extended the Section 2 pin duration and moved the outcome reveal earlier so `Harder to compete with.` resolves in the pinned frame before the Gap section enters.
- Rolled back the broken all-sections sticky experiment to the last working model from commit `09bd6f8`: Section 2 is the only pinned scroll-story section, and the remaining homepage sections use the normal semantic reveal path.
- Audited the homepage typography system using the `ui-design-system` and `ui-audit` workflow, then converted the live one-off Section 2, Gap stat/source and value-summary styles into named CSS tokens.
- Updated `docs/studio-baggio-typography-system.md` so the written scale now matches the live CSS roles, including Section 2 proposition exceptions and Gap evidence roles.
- Locked `docs/studio-baggio-design-system.md` as the current Studio Baggio site-wide UI system for future page rollouts, covering design position, non-negotiables, colour/layout tokens, section patterns, homepage exceptions, motion rules, QA checks and recommended page mappings.
- Added `docs/studio-baggio-pages-rollout-handover.md` so another agent can tackle the remaining pages from the approved homepage system without reworking the homepage or drifting into older design directions.
- Updated only the visible homepage Gap stat cards to the Deloitte 2026 / UK Government 2026 figures: `66%`, `20%` and `12%`; the Gap title and closing takeaway were left unchanged.
- Refined the locked homepage typography system again so standard section titles, Section 2, FAQ rows, proof rows and value-map row headings use a smaller, quieter scale; bold `700` is now reserved for labels, row numbers, CTAs, the Section 2 outcome stack and true emphasis while the hero/header remains unchanged.
- Added split-line descender breathing room so masked text reveals no longer clip letters like `g`.

Verified:

- `npm run typecheck`, `npm run lint` and `npm run build` pass locally.
- Codex browser desktop check after the latest Section 2 / Gap correction: Section 2 centres the core proposition, the final outcome line resolves in blue, the Gap evidence row spans the full editorial frame, and horizontal overflow is `0`.
- Mobile hero promise width check confirms the three promise lines fit from `320px` to `430px` wide viewports using the locked Aileron Bold font and the updated fluid mobile type role.
- Motion refinement check in the Codex browser confirmed the opening outcome stack progresses across scroll positions, with the muted lines revealing first and `Harder to compete with.` resolving last.
- Latest in-app browser check confirmed the Gap section renders as `16%`, `77%`, `12%` across three columns on desktop, with the longer captions/sources visible, white background, and horizontal overflow at `0`.
- Latest in-app browser check confirmed Section 2 is no longer pinned: the headline is the first visible read, the qualifier remains hidden until the next scroll position, the setup stays hidden until later, and the blue final outcome resolves last.
- Typography audit confirmed Aileron loads for the homepage, only `400` and `700` weights are used in the measured homepage roles, named tokens now drive the Gap and Section 2 exceptions, and horizontal overflow remains `0`.
- UI design system handoff checked against the current verified homepage token set and typography guide; no production code or visual layout changes were made in this documentation step.
- Other-pages rollout handover checked against the locked design system, typography guide, current page routes and project status; no production code or visual layout changes were made in this documentation step.
- Hero typography check at desktop confirmed the `Hero Promise` role renders at `18.432px` on a `1440px` viewport, keeps three locked lines and has no horizontal overflow.
- Latest code check after the Section 2 timing/type-scale correction: `npm run typecheck` and `npm run lint` pass.
- Vercel production build passed and was aliased to `https://www.studiobaggio.ai`.
- Live production browser check at `https://www.studiobaggio.ai/` confirms the latest Gap copy is present, old `78%` / `31%` / Studio Graphene / TechRadar copy is absent, and CTA text appears once.
- Codex browser desktop check at `1440x900`: all nine `.home-4b` sections below the hero measure as full `900px` frames, horizontal overflow is `0`, and console error count is `0`.
- Codex browser mobile check at `390x844`: horizontal overflow is `0`; the Gap section now fits within the mobile viewport after the type/spacing correction.
- Header brand click verified from lower page scroll: `scrollY` returned from `8268.5` to `0`.

Production:

- Live URL: `https://www.studiobaggio.ai`
- Deployment URL: `https://studio-baggio-85lrh0j7r-jaymes-projects-95f6f9cd.vercel.app`
- Local screenshots captured at `/tmp/studio-baggio-homepage-desktop-1440x900.png`, `/tmp/studio-baggio-homepage-mobile-390x844.png` and `/tmp/studio-baggio-live-desktop-1440x900.png`.

## 25 May Quiet Luxury Homepage System Branch

Branch:

- `quiet-luxury-homepage-system`

Reference:

- Saved the implementation plan at `docs/quiet-luxury-homepage-system-plan.md`.

Implemented:

- Kept the existing homepage header/hero direction intact.
- Kept homepage copy frozen; `src/content/site.ts` and `src/content/work.ts` were not edited.
- Removed the old accumulated `.home-4b` homepage patch stack from `src/app/globals.css`.
- Added one dedicated homepage system stylesheet at `src/app/homepage-system.css` for tokens, section frames, reading lanes, typography roles, rules, dark sections, CTA states and mobile treatment.
- Reworked section two, the first post-hero section, as a single editorial thesis frame: left-lane headline, qualifier, ruled Studio Baggio setup and a ruled outcome ledger underneath. No right/left split.
- Kept GSAP for section reveals, masked title lines, rule draws and value/proof row reveals; kept Framer Motion only for row/button micro-interactions.
- Added mobile internal rails for the long value/proof sections so every homepage content section remains one viewport frame without changing copy.

Verified:

- Copy snapshot before/after is identical: `b37963f67215f95174eb02264b7e2ed2ff68921d43c408ff8c3787d461ca4312`.
- Codex in-app browser desktop audit at `1440x900`: all nine homepage sections below the hero are exactly one `900px` frame, content sits below the fixed header, and horizontal overflow is `0`.
- Codex in-app browser mobile audit at `390x844`: all nine homepage sections below the hero are one `844px` frame and horizontal overflow is `0`.
- `npm run typecheck`, `npm run lint` and `npm run build` pass.

## 25 May Calm Authority Linear Page Repair

Branch/worktree:

- Branch: `revert-calm-authority-redesign`
- Worktree: `/Users/jaymebaggio/Desktop/Studio Baggio/Website-calm-authority`

Scope:

- Reverted the rejected over-designed Calm Authority product-page treatment.
- Rebuilt `/calm-authority` as a clean linear case-study page using only Jayme's supplied Calm Authority sections and copy.
- Removed the pink/warm tint, dark compliance block, bento/proof panels, extra CTA copy and invented heading text.
- Kept Jayme's correction to the hero tagline: `Your own expertise at scale`.
- Used the real Financial Times, Professional Adviser and Money Marketing logo assets from the Calm Authority website folder.
- Kept the Calm Authority OG image click-through to `https://www.calmauthority.ai/`; desktop uses the rectangular OG image and mobile uses the square OG image so it does not read as clipped.
- Added restrained text reveal animation through the existing GSAP `PageReveals` system rather than adding a new interaction layer.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local `/calm-authority` returns `200` at `http://127.0.0.1:3003/calm-authority`.
- Desktop and mobile screenshot checks show no horizontal overflow.
- Automated DOM check confirms no extra `Growth signals from real adviser use.` or `Visit Calm Authority` copy, six logo instances render, and the OG image link points to `https://www.calmauthority.ai/`.

Follow-up correction after live review:

- Reworked `/calm-authority` to match the `/about` page's plain editorial structure, font hierarchy, white/black palette, section numbering, rule animation and scroll progress treatment.
- Preserved Jayme's supplied Calm Authority copy and sections; no extra visible CTA or invented section copy added.
- Kept the Calm Authority OG image linked to `https://www.calmauthority.ai/` and retained the real Financial Times, Professional Adviser and Money Marketing logos.
- Replaced the separate white-background Featured In logo row/section with one 16:9 Calm Authority image asset containing the actual Financial Times, Professional Adviser and Money Marketing logo files.

## Built In Phase 1

- Home
- AI Commercial Advantage / Services
- Work
- Business Tracker
- Calm Authority
- Fire Source placeholder case-study page
- Last30Days placeholder case-study page
- About
- Contact
- Privacy

## Source Material

The Studio Baggio consulting strategy pack has been copied locally into:

`_strategy/Studio baggio consulting/`

Primary build files:

- `_strategy/Studio baggio consulting/Website_Build_Pack/`
- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_Script_v9_AI_Commercial_Advantage.md`
- `_strategy/Studio baggio consulting/Website_Build_Pack/09_HOMEPAGE_REVISED_DIRECTION_2026-05-25.md`
- `_strategy/Studio baggio consulting/Website_Build_Pack/10_ABOUT_PAGE_WORKING_BASE_2026-05-25.md`
- `_strategy/Studio baggio consulting/design.md`

## Implementation

- Stack: Next.js, React, TypeScript, Tailwind, GSAP, ScrollTrigger, SplitText, Framer Motion, React Hook Form, Zod.
- Content layer: `src/content/site.ts` and `src/content/work.ts`.
- Work currently includes Calm Authority, Business Tracker, Last30Days and Fire Source. Hanbury / Growth Intelligence is removed from the public Work section for now.
- Business Tracker has a dedicated page using the 06 Business Tracker source copy.
- Calm Authority has a dedicated page using the 08 Calm Authority copy plus live Calm Authority source facts.
- SEO basics added: page-specific metadata, Open Graph image route, canonical URLs, sitemap, robots, favicons and Organization JSON-LD.
- Rough Cut / Newsletter and Playbook assets remain local phase-2 material and are excluded from Vercel deployment.

## 25 May About Page Branch

Branch/worktree:

- Branch: `about-page`
- Worktree: `/Users/jaymebaggio/Desktop/Studio Baggio/Website-about`

Implemented:

- Saved Jayme's supplied About-page copy as the working source in `Website_Build_Pack/10_ABOUT_PAGE_WORKING_BASE_2026-05-25.md`.
- Removed the rejected line: `The page is separate because the work is not only a service line. It is a founder/operator practice.`
- Repositioned `/about` as a Studio Baggio page first, with Jayme as named founder and strategic lead.
- Added explicit expert-collaboration framing: led by Jayme, shaped with industry specialists, operators and client teams.
- Added stronger Studio Baggio proof framing around Calm Authority, Business Tracker, Fire Source, Last30Days and selective advisory work.
- Updated About metadata from `About Jayme Baggio` to `About Studio Baggio`.

Verified:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local `/about` verified at `http://127.0.0.1:3002/about`.
- Browser check confirms no horizontal overflow at desktop width, no console errors, and the rejected line is absent.

Follow-up correction after live review:

- Replaced the over-designed About layout with a plain professional About page.
- Removed the abstract capability grid and the first-screen facts grid.
- Removed page-level reveal animation from `/about` so text renders clearly immediately.
- Page now follows a simple order: intro, founder/studio story, why the studio exists, expert-collaboration model, what Studio Baggio builds, quote and CTA.
- Forced `/about` content background to pure white with black/neutral grey text only, so it no longer inherits the site-wide tinted paper/grid treatment.
- Reworked `/about` again using the supplied user copy as the source: proper editorial hierarchy, uppercase section labels, smaller headings, readable line lengths, black/white/grey palette only and a restrained GSAP reveal for hero/sections.
- Follow-up desktop fix: removed the split desktop grid, made the page follow the same single-column editorial rhythm as mobile, changed the main title to uppercase, tightened first-section spacing and added GSAP ScrollTrigger scroll progress/section-rule animation.
- Follow-up quote fix: removed the standalone quote band and moved the Harry Sims quote into the first Founder section as a smaller right-side aside on desktop.
- Follow-up CTA fix: removed the vague `Advisory is selective. The work starts with the commercial problem.` heading from the About page final CTA.

## 25 May Homepage Revised Direction

Jayme approved and implemented a revised homepage direction. It is saved in:

`_strategy/Studio baggio consulting/Website_Build_Pack/09_HOMEPAGE_REVISED_DIRECTION_2026-05-25.md`

Key decisions:

- Keep the existing hero/header reference direction locked.
- Hard colour rule: black, white and true neutral greys as the base system, with one approved Studio Baggio blue accent: `#2563EB` / `--sb-accent-blue`. No pink, no purple, no purple-tinted grey, no lavender/blue-grey cast and no other coloured accents in the Studio Baggio homepage/site direction unless Jayme explicitly approves them.
- Rebuild the homepage sequence as: hero/header, opening commercial argument, problem/clarifier, expertise-to-proof bridge, value areas, Commercial AI Sprint, working promise, proof, fit/not fit and CTA.
- Replace `Findability` with `Discoverability`.
- Use Studio Graphene's 2026 AI ROI figures carefully: 78% of UK businesses using AI tools, 31% reporting positive ROI, and 41% clearly defining success.
- Make proof blocks click through to individual pages. Fire Source and Last30Days can be placeholder case-study pages until deeper pages are built.
- Use GSAP for the expertise bridge and desktop value-area progression only where scroll clarifies the message. Use Framer Motion for tabs, accordions, proof tile states and mobile interactions.
- Visual rhythm: white hero, white opening argument, grey problem/stat section, white expertise bridge, charcoal value interaction, white sprint, white/grey proof, light grey fit, charcoal CTA.

Implemented:

- Homepage now follows the approved sequence from hero/header through CTA.
- Hero/header direction is retained, with the mobile wordmark adjusted so it no longer clips.
- Value-area section uses desktop rail/panel behaviour with light GSAP ScrollTrigger progression and a Framer Motion mobile accordion.
- Proof section uses editorial proof tiles for Calm Authority, Business Tracker, Last30Days and Fire Source.
- Placeholder local pages added for `/fire-source` and `/last30days` so proof tiles can click through before the deeper case-study pages are written.

Follow-up repair after design review:

- Tightened the homepage copy to match Jayme's approved structure more closely, including the revised opening argument, AI gap copy, value-area copy, Commercial AI Sprint deliverables, working-promise copy and proof labels.
- Changed `Built From Live Work` to `Live Work`.
- Removed the AI-gap pull quote and the four repeated working-promise commitment blocks.
- Rebuilt the AI gap section as an editorial split: thesis, evidence/source panel and Studio Baggio response.
- Rebuilt the expertise-to-proof bridge as a tactile scroll-aware mechanism with a live Framer Motion panel, step triggers and GSAP ScrollTrigger progress.
- Normalised key homepage sections to fit the visible desktop frame beneath the fixed header: opening, AI gap, expertise bridge, value map and proof.
- Fixed mobile overflow caused by the hidden desktop proof panel still contributing layout width.
- Verified desktop frame fit at 1888x920: opening, AI gap, expertise bridge, value map and proof all fit from fixed-header bottom to viewport bottom with no horizontal overflow.
- Verified mobile has no horizontal overflow at 390px width.
- `npm run build`, `npm run typecheck` and `npm run lint` pass.

Paper design exploration after homepage review:

- Created `Direction 4B - Typography System Fixed` in Paper after rejecting the right-shifted Hanbury-style layout direction.
- Direction 4B keeps the existing header/hero and approved homepage copy, but applies Hanbury-inspired typography discipline only: consistent Aileron type roles, centred/left reading lanes, restrained section spacing, and black/white/true neutral greys only.
- Type-role intent: nav/labels use small uppercase tracking, body uses one readable size, statement/body-lead copy uses one stronger size, section titles use one consistent display scale, and only the hero wordmark uses oversized display type.
- Ran a Paper typography audit on Direction 4B using the UI audit hierarchy/style checklist. Fixed type drift by collapsing the board into defined roles: label 12/16, body 16/24, lead 22/30, row title 20/26, section title 42/48, outcome 32/37, stat 28/32 and hero wordmark 112/104. Kept Aileron only, two weights only, and caps only for nav/labels/CTAs/outcome stack.
- Reworked the Sprint and Promise sections in Direction 4B to remove the right-shifted label/content split; both now use the same left reading lane as the rest of the typography-refined homepage direction.
- Final Paper tweaks before build consideration: AI Gap moved onto the same left-aligned 1248px grid as the following sections, `Where AI Creates Value` changed back to a vertical stacked dark section, Fit/Not Fit changed to the preferred two-card treatment with a black `Not for` card, and the final CTA now uses the preferred bordered `Discuss your AI opportunity` button with `STUDIO BAGGIO` beneath it.

Direction 4B implementation pass:

- Implemented the final approved Paper artboard `Direction 4B - Typography System Fixed` (`2FU-0`) onto the live homepage while keeping the existing hero/header direction.
- Kept homepage wording sourced from `src/content/site.ts` and work proof copy sourced from `src/content/work.ts`; added missing structural labels for the value section, fit cards and CTA to the content layer without rewriting wording.
- Rebuilt the AI Gap as a light true-grey left-lane section with compact `78%` and `31%` stat boxes and no pull quote.
- Rebuilt the expertise bridge as a white section with the large left headline, grey copy block, four bottom progression blocks and a black final block.
- Rebuilt `Where AI Creates Value` as a charcoal vertical stacked-row section; removed the previous rail/panel interaction from the rendered component.
- Rebuilt Commercial AI Sprint, Working Promise, Live Work, Fit/Not Fit and CTA to match the Direction 4B left reading lanes, row treatment, two-card fit treatment and dark final CTA.
- Animation now uses GSAP for section/title reveals, value/proof rows, expertise progression and CTA border reveal, with Framer Motion limited to hover/tap micro-interactions.
- Verified locally in the Codex in-app browser at desktop `1440x900` and mobile `390x844`: no horizontal overflow, `Discoverability` present, `Findability` absent, value section renders 5 vertical rows, no rendered value rail/panel, 4 proof rows, 2 fit cards and no console errors.
- Verified commands pass: `npm run typecheck`, `npm run lint` and `npm run build`.
- Follow-up copy tweak: removed the quotation marks around `experimenting with AI` in the opening homepage headline.

Vercel deployment repair:

- Investigated the flood of failed Vercel emails after the homepage push.
- Root cause was not the Studio Baggio site deployment; `studio-baggio` was deploying successfully.
- The failing project was `rough-cut-newsletter`, which was incorrectly connected to the `JaymeBaggio/studio-baggio` GitHub repo and configured with a non-existent root directory, `assets/newsletter`.
- Every push to `main` was therefore triggering a doomed `rough-cut-newsletter` production deployment.
- Disconnected `rough-cut-newsletter` from the Studio Baggio GitHub repo, cleared the invalid root directory setting, and redeployed the newsletter manually from `/Users/jaymebaggio/Desktop/Rough Cut/RC8/newsletter`.
- Verified `https://rough-cut-newsletter.vercel.app` returns `200` and the latest `rough-cut-newsletter` production deployment is `Ready`.

Direction 4B polish pass:

- Locked stricter homepage type roles with Direction 4B tokens for labels, titles, lead copy, body, stats, row titles and outcome text.
- Reworked homepage text reveal motion into masked line reveals, with labels/body/rows following the same editorial motion grammar.
- Added section-aware header contrast so the fixed header switches correctly over dark sections rather than relying only on scroll distance.
- Tightened mobile rhythm and fixed invalid CSS container width calculations that caused mobile text lanes to hit the viewport edge.
- Refined the dark value rows with border-draw progression, active-row sharpening and readable inactive rows, without reintroducing the rejected rail/panel layout.
- Updated proof heading copy to `PRODUCTS IN MARKET` / `LIVE WORK`, removing `This is not AI theory. The systems are already live.`
- Verified in the Codex in-app browser at the local preview: no horizontal overflow, mobile reading lane has 16px margins, dark header flips correctly, value section has 5 vertical rows and no panels, and proof heading copy is exact.
- Verified commands pass: `npm run typecheck`, `npm run lint` and `npm run build`.

Follow-up typography/motion correction after Jayme's live review:

- Collapsed the homepage typography system into four visible roles: label, body, lead and title/impact. Short titles render uppercase and resolve to one shared title size; long explanatory statements now use readable lead/body treatment instead of oversized all-caps blocks.
- Reworked the opening argument to match the left-lane mockup direction: headline, qualifier and setup are left-aligned, while the outcome stack is the centred landing moment with `HARDER TO COMPETE WITH.` treated as the final impact line.
- Shortened GSAP reveal timings and moved ScrollTrigger starts earlier so section text is visible as it enters the viewport instead of appearing after the user has scrolled past it.
- Removed the rendered `Expertise to proof` section from the homepage flow.
- Moved the existing `Studio Baggio helps expert-led businesses identify where AI can create measurable commercial value...` sentence out of AI Gap into its own section immediately below AI Gap, with the system areas presented as a clean numbered list while leaving the approved copy in `src/content/site.ts` unchanged.
- Rebuilt the opening argument as a proper full-frame editorial section: sentence-case top argument, left-aligned grid, ruled lower promise area and vertical outcome stack so it no longer reads as a centred floating slab.
- Follow-up desktop section-frame correction: locked the opening argument, AI Gap, commercial systems, value, sprint, promise, proof, fit and CTA sections to `100svh` minimum on desktop so the new commercial systems section no longer collapses into a partial-height band before the dark value section.
- Removed the remaining blue-cast fallback colour from the Calm Authority shot background; the CSS audit now shows neutral black/white/grey values only in the touched files.
- Verified in the Codex in-app browser at `http://127.0.0.1:3000/`: `Expertise to proof` is no longer rendered, the new commercial systems section appears directly below AI Gap, type roles are unified, and horizontal overflow is `0`.
- Verified commands pass: `npm run typecheck`, `npm run lint` and `npm run build`.

Final hierarchy/frame correction:

- Replaced the stacked emergency homepage overrides with one final Direction 4B homepage system for section frames, typography roles, reading lanes, list rows and neutral colour tokens.
- Locked the opening argument to the approved full-frame, left-lane treatment with uppercase title/setup text, grey uppercase qualifier, left-aligned outcome stack and no split/right-shifted layout.
- Kept `Expertise to proof` removed and rebuilt the following practical systems section as a proper full-frame section with a microheader, body copy and the same numbered horizontal-row list grammar as Commercial AI Sprint.
- Added visible microheaders to the practical systems and fit/not-fit sections so every homepage content section now has a consistent section label.
- Reworked homepage GSAP reveals into section-level sequences: label first, masked title lines second, body/list/cards last. Added `immediateRender: false` so content remains visible by default and is not hidden before its reveal trigger.
- Verified in the Codex in-app browser at desktop `1440x900`: all rendered homepage sections are full-frame (`min-height: 900px`), value/proof sections expand only where content requires it, no horizontal overflow, 6 practical-system rows, 5 value rows, 4 proof rows, 2 fit cards, no rendered `Expertise to proof`, and Aileron is the only computed font family.
- Verified in the Codex in-app browser at mobile `390x844`: no horizontal overflow and each homepage content section has at least `100svh` minimum height.

Follow-up alignment repair:

- Fixed the homepage grid drift where section 2 and later frames were being pulled to different left edges by conflicting `margin-inline` overrides.
- Locked all homepage `editorial-container` section frames back to the same page grid, while keeping inner copy blocks left-aligned inside that shared frame.
- Fixed the remaining section-2 outcome stack issue where `Easier to find`, `Faster to act`, `Better informed` and `Harder to compete with` were still being centred by an older `justify-items: center` rule.
- Verified in the Codex in-app browser at desktop `1440x900`: opening argument, AI Gap, Practical Systems, Value and Commercial AI Sprint all share the same `80px` left edge, with horizontal overflow `0`.
- Verified in the Codex in-app browser at mobile `390x844`: opening argument, AI Gap, Practical Systems and Commercial AI Sprint all share the same `16px` left edge, every content section keeps a `100svh` minimum frame, and horizontal overflow is `0`.
- Verified commands pass: `npm run lint`, `npm run typecheck` and `npm run build`.
- Verified commands pass: `npm run typecheck`, `npm run lint` and `npm run build`.

## 24 May Repair Pass

After Jayme's review, the build was re-audited against the original goal with subagent tracks for copy/content, design/motion, engineering and QA/deploy.

Fixed in this pass:

- Removed the remaining lime/purple accent system and warm cream tones. The site now uses black, white and neutral greys only.
- Rebuilt the homepage first viewport as a full-frame Paper-reference hero: small top-left metadata, large right-aligned `STUDIO BAGGIO.AI`, bottom-right promise copy, and hidden conventional nav until scroll on the home first frame.
- Added scroll restoration controls so reload/navigation returns to the top when there is no hash.
- Removed the homepage sticky/pinned chapter system after motion QA because it made scrolling feel heavy in the wrong places. The current homepage uses early ScrollTrigger text reveals, hero parallax and normal page flow for smoother reading.
- Expanded Business Tracker copy from `06_BUSINESS_TRACKER_COPY.md`, including market-specific signal examples, LinkedIn hook/timing logic, Intel Bank competitor-information line and scale/reporting language.
- Expanded Calm Authority copy from `08_CALM_AUTHORITY_COPY.md`, including Harry/Jayme facts, generic-AI trust-market risk, stronger Studio Baggio product proof and additional public proof references.
- Added an AI Advantage section explaining how opportunities are prioritised.
- Added the full offer ladder to the homepage so `Commercial AI Sprint`, `AI Advantage Build` and `AI Advantage Partner` all appear against the v9 source.
- Made standalone page structure more explicit after follow-up review: the primary nav remains visible on the Paper-style home frame, About has a fuller independent page treatment, and Business Tracker has clearer dedicated operating-system page framing.
- Reworked the Calm Authority page again from the live May 2026 fact sheet: removed the unwanted case-study/problem headline, added first-screen click-throughs to `calmauthority.ai` and the press fact sheet, refreshed the product screenshot, and rebuilt the page around what it is, what it does, who it is for, facts, pricing, proof, recent study and compliance.
- Moved footer, contact and privacy copy into the editable content layer.
- Fixed the contact form so a Resend API error cannot be reported as success and a missing-env `503` does not show the success state.
- Added page-specific Open Graph/Twitter metadata, favicon/app icon routes and `www.studiobaggio.ai` as the canonical default.
- Pinned package versions from the current lockfile instead of leaving production dependencies on `latest`.
- Added a dedicated Calm Authority motion layer with entrance animation, product-shot depth/parallax, card/row/proof reveals and visible-by-default content so the page never blanks while waiting for a scroll trigger.
- Replaced the Last30Days work image with the current Desktop asset from `/Users/jaymebaggio/Desktop/Last 30 Days/public/last30days-og-new.png`.
- Removed Hanbury / Growth Intelligence from the public Work section for now.
- Emergency follow-up after scroll QA: commit `1aa1940` removed scrubbed homepage ScrollTrigger reveals, kept homepage content visible by default, tightened section spacing and pushed/deployed the corrected normal scroll flow.

## Contact Form

The contact form posts to `src/app/api/contact/route.ts`.

Required for live email sending:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL` optional, defaults to `jayme@studiobaggio.ai`

Current live behaviour without email env vars: validation works, then the API
returns `503` with a clear message telling the user to email Jayme directly.

## Verified Locally

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local routes return `200`: `/`, `/ai-advantage`, `/work`, `/business-tracker`, `/calm-authority`, `/fire-source`, `/last30days`, `/about`, `/contact`, `/privacy`.
- `sitemap.xml`, `robots.txt`, `opengraph-image`, `icon` and `apple-icon` return `200`.
- Desktop render check: home reload starts at `scrollY: 0`, hero top is `0`, hero height is the full viewport, lede starts after the viewport, and there is no horizontal overflow.
- Mobile render check at 390x844: hero is full frame, no horizontal overflow, and hero text fits.
- 25 May homepage browser QA: approved homepage sections are present, `Findability` is removed, `Discoverability` is present, proof tiles link to `/calm-authority`, `/business-tracker`, `/last30days` and `/fire-source`, and the mobile value accordion opens the selected area.
- Sticky-section cleanup check: homepage and Work no longer contain `position: sticky`, `pin: true`, `data-sticky-section`, `sticky-chapter` or masked SplitText lines.
- Contact form validation and missing-email-env error state verified in browser; the success message is not shown on the configured `503` fallback.
- Console error check clean in the in-app browser.
- Calm Authority desktop/mobile render checks passed after the fact-sheet and motion correction; the first scroll now shows `What it is`, `What it does` and `Who it is for`, the page has dedicated GSAP depth/reveals, and the old `The expertise was already there. The visibility was not.` line is removed.
- Content checks passed for v9 headline, required Work items, Business Tracker mandatory lines/channel logic, Calm Authority facts/proof and AI Advantage prioritisation section.
- `npm audit --omit=dev` currently reports 2 moderate advisories through Next's bundled PostCSS dependency; `npm audit fix --force` suggests an unsafe breaking downgrade, so this was not applied.

## Verified Live

- 26 May 2026 motion correction deployed to production:
  - Latest production deployment: `https://studio-baggio-g8ihj0t4x-jaymes-projects-95f6f9cd.vercel.app`.
  - Aliased to `https://www.studiobaggio.ai`.
  - Header promise copy now renders as three intentional lines:
    `AI ENABLED GROWTH SYSTEMS FOR TRUST BASED BUSINESSES` /
    `WE ENABLE EXPERT-LED FIRMS COMPETING IN HIGH VALUE MARKETS TO` /
    `BUILD TRUST, CAPTURE DEMAND & FOLLOW UP SMARTER`.
  - Homepage section reveals now use a slower GSAP ScrollTrigger scrub instead of early one-shot reveals.
  - Opening outcome stack lines are sequenced so `Harder to compete with.` is held back and receives a distinct emphasis beat.
  - `ValueMap` and `ProofTiles` row reveals now scrub through the reading area instead of firing early.
  - Live verification at `1440x900` confirmed `splitCount: 15`, no horizontal overflow, latest Gap copy present, old `78% / 31%` stats absent, no console/page errors, and the opening outcome emphasis animates after the supporting lines.
- Implementation commit pushed to `main`: `c568393` (`Build Studio Baggio AI advantage site`).
- Browser-warning cleanup commit pushed to `main`: `e37d2be` (`Clean up Studio Baggio browser warnings`).
- Homepage messaging rebuild commit pushed to `main`: `76573d8` (`Rebuild homepage messaging flow`).
- Launch QA repair commit pushed to `main`: `e6f6bfb` (`Fix Studio Baggio launch QA issues`).
- Homepage offer-ladder completion commit pushed to `main`: `ac09486` (`Add homepage offer ladder`).
- Standalone page clarification commit pushed to `main`: `61f2696` (`Clarify standalone Studio Baggio pages`).
- Calm Authority fact-sheet correction commit pushed to `main`: `c5544ec` (`Update Calm Authority fact sheet page`).
- Motion/work QA commit pushed to `main`: `ee0bed6` (`Fix Studio Baggio motion and work QA`).
- Homepage scroll-flow correction commit pushed to `main`: `1aa1940` (`Fix homepage scroll flow`).
- Latest production deployment verified at stable alias: `https://www.studiobaggio.ai`.
- Vercel aliased the deployment to `https://www.studiobaggio.ai`.
- Hero reference visual update: homepage header rebuilt to match the Paper reference more closely, with top-left metadata, full-frame right-aligned `STUDIO BAGGIO.AI`, bottom-right promise copy and the conventional nav hidden on the first home viewport until scroll.
- Scroll/reading polish: large display type reduced for easier in-frame reading, masked SplitText clipping removed, sticky/pinned chapter behaviour removed, and section-level reveal triggers moved early enough that text is visible before users can scroll past it.
- Launch status committed after deployment verification.
- Vercel project: `studio-baggio`.
- Vercel framework preset: `nextjs`.
- Domains verified:
  - `https://studiobaggio.ai` redirects to `https://www.studiobaggio.ai/`.
  - `https://www.studiobaggio.ai/` returns `200`.
- Live routes verified as `200`: `/`, `/ai-advantage`, `/work`, `/business-tracker`, `/calm-authority`, `/about`, `/contact`, `/privacy`.
- `sitemap.xml` and `robots.txt` return `200`.
- Live source includes the v9 headline `Turn AI into a commercial advantage.`
- Live Business Tracker page includes the required operating-system line, market-specific signal examples, Intel Bank detail and channel logic.
- Live Calm Authority page includes clear links to `calmauthority.ai` and the press fact sheet, the `What it is`, `What it does` and `Who it is for` overview, fact-sheet pricing/proof/recent/compliance content, and no longer includes the removed `The expertise was already there. The visibility was not.` line.
- Live Work page includes Calm Authority, Business Tracker, Last30Days and Fire Source, and no longer includes Hanbury / Growth Intelligence.
- Live homepage source check confirms no purple/violet/indigo/lavender colour references.
- Live AI Advantage page includes the opportunity prioritisation section.
- Live canonical and Open Graph URL resolve to `https://www.studiobaggio.ai`.

## Deployment Notes

The first Vercel deployment after the GitHub push returned `404` because the
project was still configured as a generic/static project. With a `public/`
folder present, Vercel served static assets instead of the Next output.

Fixed on 24 May 2026:

- Updated Vercel project framework to `nextjs`.
- Redeployed to production.
- Re-verified custom domains and phase-1 routes.
- Cleaned up homepage-only GSAP selectors so non-home pages do not warn when hero elements are absent.
- Cleaned up the missing-email-env contact-form path so it shows the configured error state without an unhandled promise rejection.

Still required before expecting email delivery from the form:

- Add `RESEND_API_KEY` in Vercel.
- Add `CONTACT_FROM_EMAIL` in Vercel.
- Optional: add `CONTACT_TO_EMAIL`; otherwise it defaults to `jayme@studiobaggio.ai`.

## Deferred To Phase 2

- Rough Cut / Newsletter archive.
- Playbooks pages.
- Sector pages.
- Deeper standalone case studies for Last30Days and Fire Source.
- Hanbury / Growth Intelligence public work item, when source material and approval are ready.

## 27 May Business Tracker Page Rebuild - Local

Branch:

- `quiet-luxury-homepage-system`

Scope:

- Rebuilt `/business-tracker` only from `BUSINESS_TRACKER_COPY_DRAFT.md`.
- Added the locked Business Tracker dashboard hero image and the four-card Input Map component from `INPUT_MAP_COMPONENT_BRIEF.md`.
- Kept homepage and all other routes out of scope.

Implemented:

- Moved the locked 10-section Business Tracker copy into `src/content/site.ts`.
- Rebuilt the route order as Hero, What it does, Operating Layers, Input Map, Outcome, Who it's for, Extends to hiring & beyond, Commercial, FAQ and CTA.
- Added `src/components/business-tracker/input-map.tsx` using the four committed Calm Authority assets from `public/business-tracker/input-map/`.
- Added the dashboard hero media from `public/business-tracker/hero/dashboard-hires.png`.
- Reused `FaqAccordion` for the 7 locked FAQ items.
- Reused `PageReveals` and added one focused Input Map reveal sequence. No new motion library, pinning or scroll-storytelling layer.
- Corrected the blank-section issue by removing hidden emphasis-only reveal hooks from standalone BT lead paragraphs and replacing the full-viewport treatment on ordinary BT sections with compact editorial section rhythm.

Verified locally:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Codex in-app browser checks passed at `1440x900`, `820x900` and `390x844`: 10 sections, 7 FAQs, no horizontal overflow, no console errors, only Aileron `400` and `700`, four Input Map cards, 4-column desktop, 2x2 tablet, stacked mobile, all Input Map images visible, consistent mock aspect ratio, failure lines bold black.
- All 7 `/business-tracker/` image asset paths return `200` locally.
- Screenshots saved in `.animation-review/business-tracker-2026-05-27/`.

## Notes For Next Session

- 27 May 2026 local-only homepage motion repair:
  - Replaced GSAP `pin: true` on Section 2 and Gap with native CSS sticky stages, because GSAP pin activation was the source of the hard “slam” Jayme was feeling.
  - GSAP ScrollTrigger now controls only child opacity/transform timelines for those two sections; no `.pin-spacer` elements are created locally.
  - Lower homepage sections were changed from subtle scrub fades to clear one-shot editorial reveals so the page no longer goes flat after Gap.
  - Hero wordmark entrance changed from a masked/blinds line reveal to a single soft wordmark dissolve/lift. The mark is faintly visible immediately, line-level animations are disabled, and the mask overflow is visible.
  - Reduced motion disables the sticky stages and shows all homepage content statically with final Gap numbers.
  - Verified locally at `http://localhost:3006/`: no horizontal overflow, no console errors, desktop `1440x900`, mobile `390x844`, reduced motion, final Gap numbers `66% / 20% / 12%`.
  - Local screenshots and metrics saved in `.animation-review/20260527-sticky-stage-pass/` and `.animation-review/20260527-hero-wordmark-soft-reveal/`.
  - Validation passed: `npm run lint`, `npm run typecheck`, `npm run build`. Do not run `next build` and `tsc --noEmit` in parallel because Next 16 rewrites `.next/types`.
  - Not pushed and not deployed.
- Do not use the old live site as copy source.
- Do not use pink, purple, violet, lavender, purple-grey, blue-grey or any warm/coloured grey. The approved visual system is black, white and actual neutral greys only.
- Do not lead with Growth Intelligence as the front-door offer.
- Do not use `Map Your AI Advantage`.
- Avoid running `next build` and `tsc --noEmit` at the same time because Next 16 updates `.next/types` during build.
- Jayme wants completed and verified website changes pushed to `main` by default going forward, unless she explicitly asks not to push.
