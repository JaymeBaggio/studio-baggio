# Insights Section Status
*Created: 29 May 2026*

Purpose: locked working brief for the Studio Baggio `Insights` / newsletter-derived content section.

Implementation status:

- First build implemented locally on 29 May 2026.
- Hub route: `/insights`.
- Article route pattern: `/insights/[slug]`.
- Current local set: 13 individual article pages. The public-profile section is part of the Firecrawl article and must not be split into its own route. `High performers think in operating systems, not tools` is part of the AI adoption article, not a separate route. `From skill to product` is part of the AI skills article, not a separate route.
- Article body text is stored as exact `sourceMarkdown` in `src/content/insights.ts`, including source headings and separators from the selected source span.
- Latest local verification: `npm run typecheck`, `npm run lint`, `npm run build`, route `200` checks and source-body comparison all pass.

Source context:

- Rough Cut is the source archive.
- Studio Baggio Insights is the canonical website content library.
- Articles should not inherit Rough Cut / Substack / PDF layouts.
- Articles should stay full, but be redesigned as individual Studio Baggio article pages.
- `docs/INSIGHTS_CONTENT_INVENTORY.md` is the working article/category curation list.

## Critical Copy Guardrail

Article wording must be lifted verbatim from the chosen source.

- Do not rewrite article body copy.
- Do not smooth, shorten, restructure, Americanise, remove swearing, remove em dashes, change punctuation, change spelling or replace phrases.
- Page design, article shell, metadata, category labels, previews, related links and diagrams can be built around the article.
- The article body itself must come from the selected source text exactly.
- Do not remove source headings, slide labels, issue labels or separators from article pages unless Jayme explicitly approves that specific packaging rule.
- Current approved packaging rule: remove or hide non-article PDF/issue furniture when it is clearly not part of the article, including page numbers, newsletter footer lines, raw diagram fragments, repeated issue labels and slide labels such as `Slide 2:`. This is presentation cleanup only, not copy editing.

## Locked Extraction Workflow

Use this workflow for every new Insights article.

1. Confirm the real article boundary before adding a route.
   - Do not split subsections into separate pages just because they have strong headings.
   - `High performers think in operating systems, not tools` stays inside `AI adoption is high. Value is patchy.`
   - `From skill to product` stays inside `A skill is an app without a user interface`.
   - Public-profile/evidence-layer copy stays inside the Firecrawl article.

2. Extract the source text from the best source file.
   - Prefer clean `.md` source where it exists.
   - Use the final/downloaded PDF only when that is the best or only source.
   - Record the exact `sourcePath`, `sourceStart` and `sourceEnd` in `src/content/insights.ts`.

3. Preserve article wording.
   - Keep the article body wording, spelling, punctuation and examples exactly as sourced.
   - Allowed cleanup is limited to removing obvious PDF/issue furniture and raw visual fragments that should become native page furniture instead.
   - If a source line is ambiguous, keep it and ask Jayme later rather than silently rewriting it.

4. Render with the shared article parser.
   - Article body lives in `sourceMarkdown`.
   - The renderer handles markdown headings, paragraphs, bold/italic, bullets and numbered lists.
   - List continuation should only absorb genuinely indented wrapped lines. This prevents a numbered item from swallowing the following article sections.
   - Article-specific section-heading maps are allowed when PDF extraction leaves obvious standalone section lines without markdown heading syntax.

5. Verify before moving on.
   - Run a source hygiene check for issue/PDF furniture such as `ROUGH CUT`, `NEWSLETTER`, `Jayme Baggio`, `Views are my own`, repeated page labels and raw diagram text.
   - Check removed split routes still return `404` when relevant.
   - Run `npm run typecheck`, `npm run lint` and `npm run build` after implementation changes.

## Title And Enhancement Staging

Current build rule:

- Use Jayme's original article titles for now.
- Keep the titles straightforward while the full article library is being migrated.
- Do not invent SEO-led display titles during the first publishing pass.
- Do not change article body copy to make a title, slug, preview or search phrase fit.

Second pass rule:

- Once the selected article set is live, do a deliberate editorial/SEO refinement pass.
- That pass can improve display titles, meta titles, descriptions, supporting components, diagrams, internal links and visual modules.
- Any refined title should match what a business owner, founder, consultant or expert searcher would actually look for.
- Example direction for Firecrawl: public web data, lead capture, lead qualification, market intelligence and what changes when businesses can read the open web.
- Example direction for the public-profile section inside Firecrawl: AI search visibility, machine-readable evidence, public proof and what now matters for professional credibility.
- This second pass changes page furniture and search framing only. It does not rewrite the article body.

Paper reference:

- `https://app.paper.design/file/01KSTAD8PWAYMXPFDSH6X0P7DE/1-0`
- Chosen base: `Insights Index 01 - Editorial Intelligence`
- Chosen article base: `Article 01 - Longform Editorial`

Locked visual reference screenshots:

- `/Users/jaymebaggio/Desktop/Screenshots/CleanShot 2026-05-29 at 18.44.19@2x.png`
  - Insights index / hub direction.
- `/Users/jaymebaggio/Desktop/Screenshots/CleanShot 2026-05-29 at 18.44.25@2x.png`
  - Article page / longform editorial direction.

## Locked SEO Structure

The other SEO agent's recommendation fits this direction and should be followed.

Architecture:

```txt
/insights
  Main index / hub page.
  Lists every article.
  Provides search, category filtering and featured article.

/insights/[article-slug]
  Individual canonical article pages.
  One topic, one URL, one target search intent.

/insights/category/[category-slug]
  Optional phase 2 category hub pages if each category has enough articles.
  Use only if useful for SEO and user navigation.
```

Core rules:

- Every article gets its own canonical URL.
- The `/insights` page is an index/hub, not the place where full articles live.
- The article accordion on `/insights` is a preview/navigation device only.
- Do not rely on accordion sections to rank. Google indexes pages, not UI sections.
- Do not publish full Rough Cut issues as indexable pages if the same article text is published individually.
- Keep old Rough Cut issues on Substack or non-indexed archive if needed.
- Keep service/money pages separate from Insights.
- Pillar and service pages should link down to supporting articles.
- Articles should link back up to relevant pillar/service/product pages.
- Use clean keyword-bearing slugs, for example:
  - `/insights/firecrawl-open-web-commercial-intelligence`
  - `/insights/ai-adoption-is-high-value-is-patchy`
  - `/insights/skill-is-an-app-without-a-user-interface`

## Topic Clusters

Initial clusters:

- Commercial Intelligence
- AI Adoption
- AI Skills
- AI Search
- Owned Media
- AI Products

Likely article-to-cluster mapping:

- Firecrawl just gave any business access to 96% of the open web -> Commercial Intelligence.
- Public profile / evidence-layer section stays inside the Firecrawl article -> AI Search support, not a standalone route.
- AI adoption is high. Value is patchy. -> AI Adoption.
- High performers think in operating systems, not tools -> folded into the AI adoption article.
- A skill is an app without a user interface -> AI Skills.
- From skill to product -> folded into the AI skills article.
- The channels you rent can change overnight -> Owned Media.

Launch category chips:

- `All`
- `Commercial Intelligence`
- `AI Adoption`
- `AI Skills`
- `AI Search`
- `Owned Media`
- `AI Products`

Recommended first article set is tracked in `docs/INSIGHTS_CONTENT_INVENTORY.md`.

Audit decision:

- The full RC2-RC10 archive has now been allocated against the six categories in `docs/INSIGHTS_CONTENT_INVENTORY.md`.
- Keep the current visible categories: Commercial Intelligence, AI Adoption, AI Skills, AI Search, Owned Media and AI Products.
- The `/insights` page should default to the full article list, with category filters and search narrowing that list.
- Search should cover the full article source text, not only the visible preview.

## Locked Index Page Direction

Use the selected Paper direction:

- Hero: `Useful thinking for practical AI advantage.`
- Featured article row.
- Compact category/search strip directly under Featured.
- Category filters on the left.
- Search field on the right.
- Latest articles below as ruled accordion rows.
- Expanded article row shows a preview, reading time and read link.

Do not use:

- Large category blocks that take over the page.
- Generic blog cards.
- Self-conscious source copy like `Full articles from Rough Cut`.
- `What this proves` panels.
- Rough Cut issue framing.

## Accordion Implementation Brief

Existing component patterns to reuse:

- `src/components/value-map.tsx`
- `src/components/proof-tiles.tsx`
- `src/components/faq-accordion.tsx`

Implementation guidance:

- Build a dedicated `InsightsArticleAccordion` component.
- Use the same local pattern:
  - React state for active row.
  - `aria-expanded`.
  - `aria-controls`.
  - `AnimatePresence`.
  - `motion.div` height/opacity reveal.
  - `useReducedMotion`.
  - `ScrollTrigger.refresh()` after expansion.
- Desktop interaction:
  - Row can expand on hover/focus.
  - Click/tap should still work for accessibility and touch.
- Mobile interaction:
  - Tap-to-expand only.
- Expanded preview should be a short excerpt, not the whole article.
- Each row must include a clear link to the canonical article page.
- Use Lucide icons where possible:
  - `ChevronDown` for expand/collapse.
  - `ArrowUpRight` for opening the article.
  - `Search` for search input.

Visual rules:

- Follow Studio Baggio design system.
- Aileron only.
- Weights only `400` and `700`.
- White/light neutral surfaces.
- 1px hairline rules.
- Square corners.
- No card-in-card.
- No bento grid.
- No decorative gradients, blobs or shadows.
- Blue is a signal only, not decoration.

## Search And Filter Behaviour

Minimum build:

- Search filters article title, summary, category and tags client-side.
- Category buttons filter the article list.
- `All` resets category filter.
- Search and category filters can work together.
- Empty state should stay quiet and simple.

Future SEO enhancement:

- Add category pages under `/insights/category/[slug]` if clusters grow enough.
- Category pages should be indexable only if they contain enough unique intro copy and article depth.

## Article Page Brief

Locked article-page direction:

- Use `Article 01 - Longform Editorial` as the default template for article pages.
- The article pages should feel like calm, serious longform editorial pages, not product pages and not blog cards.
- Use extra diagrams, comparison blocks or evidence modules only as page furniture around the verbatim article when they genuinely help the argument and Jayme approves them.
- For Firecrawl, this means the page should still use the longform editorial article shell. A native Studio Baggio workflow diagram can be added separately, but it must not replace or rewrite any article text.

Each article page should be white, editorial and in keeping with the rest of the site.

Required page structure:

- Category / metadata.
- H1.
- Dek / thesis line.
- Author or Studio Baggio attribution.
- Updated date.
- Reading time.
- Full article body lifted verbatim from the chosen source, including source headings and separators unless Jayme explicitly approves removing issue packaging.
- Source headings using the locked typography hierarchy.
- Bold thesis/callout lines only where already present in source copy, unless added as clearly separate page furniture.
- Minimal blue accent for one or two active/important moments.
- Native SVG or CSS diagrams where the argument benefits from structure.
- Related articles.
- Contextual links back to service/pillar/product pages.

## Locked Article Design Style

Use the Firecrawl article as the current article-page reference.

Core rules:

- White page, longform editorial, no Rough Cut/PDF visual style.
- Use the Studio Baggio `.home-4b` token system.
- Aileron only.
- Type scale:
  - Article H1 uses the locked section-title scale: `var(--sb-title-size)` / `var(--sb-title-line)`.
  - H2s use the quieter article section scale.
  - Body copy uses `--sb-body` colour, readable longform line height and a controlled reading width.
- Layout:
  - Main article reading lane is approximately `720px`.
  - Wider diagrams can break out to `--sb-wide` but must still sit inside the page rhythm.
  - No card-in-card, bento grids, heavy shadows, rounded SaaS cards, blobs or gradients.
- Blue:
  - Blue is a signal only.
  - Use for active lines, diagram rules/arrows/bullets or one deliberate emphasis moment.
  - Do not wash a page in blue or use it decoratively.
- Article-specific components:
  - Build native CSS/React diagrams or SVG-like components when they clarify the article.
  - Do not paste PDF graphics into the page.
  - Components are page furniture and must not replace or rewrite article text.
  - If a PDF graphic contains useful logic, rebuild that logic in the Studio Baggio grammar.

Article SEO requirements:

- Unique title and meta description.
- Canonical URL.
- Article schema where practical.
- Open Graph metadata.
- Clean H2/H3 hierarchy.
- Direct answer block near the top where appropriate.
- Short extractable passages for AI search.
- Contextual internal links to pillar/service pages.

Firecrawl article design notes:

- Use the attached Firecrawl content as source, not as visual layout.
- Preserve the full argument.
- Rebuilt and locked: the Firecrawl workflow is now a native Studio Baggio diagram:
  - Firecrawl reads public web sources.
  - Analysis surfaces commercial signals.
  - Claude/Codex applies ICP and qualification logic.
  - Builds produce fit score, rationale, evidence links and route-in angles.
- Keep article page on white.
- Use bold sparingly for lines like:
  - `The lead list is no longer the asset. The qualification logic is.`
  - `Public data has become cheap. Commercial judgement has not.`

## Implementation Notes

Recommended files:

- `src/content/insights.ts` for article metadata, categories, slugs, summaries, tags and related links.
- `src/components/insights-article-accordion.tsx` for index-page accordions.
- `src/app/insights/page.tsx` for hub page.
- `src/app/insights/[slug]/page.tsx` for article pages.
- Add article-specific styles in `src/app/globals.css` using the existing `.home-4b` token system.

Do not add MDX immediately unless TypeScript structured content becomes painful. This repo does not currently have MDX configured.

## Current Decision

Locked direction as of 29 May 2026:

- `/insights` is built as a hub/index.
- Individual full articles are published at `/insights/[slug]`.
- Use compact category/search strip.
- Use accordion previews in the article list.
- Use the `Insights Index 01` Paper design/screenshot as the visual source for the hub.
- Use the `Article 01 - Longform Editorial` Paper design/screenshot as the visual source for article pages.
- Keep article pages white, minimal, editorial and Studio Baggio-native.

Implemented launch routes:

- `/insights/firecrawl-for-business`
- `/insights/ai-adoption-value-gap`
- `/insights/chatgpt-for-business-owners`
- `/insights/owned-vs-rented-audience`
- `/insights/ai-future-of-work`
- `/insights/what-is-an-ai-skill`
- `/insights/geo-generative-engine-optimisation`
- `/insights/building-ai-operating-systems`
- `/insights/ai-creative-summit-2025`
- `/insights/ai-disruption-in-media-and-advertising`
- `/insights/ai-predictions-2026`
- `/insights/best-ai-tools-2025`

Remaining approved articles not yet implemented:

- None. The approved 12-article launch set is now implemented locally.

Removed from launch:

- `/insights/ai-seo-framework` was removed on 30 May 2026. Jayme flagged the source as a draft / not the final framework. Do not re-add until Jayme supplies or approves the refined framework.

Do not re-add `/insights/public-profile-is-no-longer-your-shop-window`; Jayme confirmed that section belongs inside the Firecrawl article.

## Next Step Recommendation

Current recommendation:

- Move to a second enhancement pass now that the full approved 12-article set is live locally.
- Keep the locked longform editorial style.
- Add only obvious, high-value native components where the article clearly benefits from structure.
- Decide supporting diagrams, internal links, title/meta refinements and richer article-specific components across the whole library as one pass.

Reason:

- The SEO and usefulness benefit comes first from complete canonical article pages.
- Once the complete set is visible, component decisions will be easier because we can see repeated patterns: frameworks, checklists, operating models, timelines, tool stacks and media/ad-industry maps.
