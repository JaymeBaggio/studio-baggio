# Studio Baggio Website - STATUS
*Last updated: 26 May 2026*

## Current Build

The old static single-page site has been replaced with a live Next.js phase-1
site for `studiobaggio.ai`.

Core message:

`Turn AI into a commercial advantage.`

## 26 May Homepage Option A Editorial Calm

Branch:

- `quiet-luxury-homepage-system`

Reference:

- Saved the implementation plan at `docs/homepage-option-a-editorial-calm-implementation-plan.md`.
- Saved the locked typography guide at `docs/studio-baggio-typography-system.md`.
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
- Removed the sticky desktop pin from Section 2 and re-timed the opening motion so the thesis reads first, the grey qualifier follows, the Studio Baggio setup appears on the next scroll beat, and the outcome stack resolves last.
- Audited the homepage typography system using the `ui-design-system` and `ui-audit` workflow, then converted the live one-off Section 2, Gap stat/source and value-summary styles into named CSS tokens.
- Updated `docs/studio-baggio-typography-system.md` so the written scale now matches the live CSS roles, including Section 2 proposition exceptions and Gap evidence roles.

Verified:

- `npm run typecheck`, `npm run lint` and `npm run build` pass locally.
- Codex browser desktop check after the latest Section 2 / Gap correction: Section 2 centres the core proposition, the final outcome line resolves in blue, the Gap evidence row spans the full editorial frame, and horizontal overflow is `0`.
- Mobile hero promise width check confirms the three promise lines fit from `320px` to `430px` wide viewports using the locked Aileron Bold font and the updated fluid mobile type role.
- Motion refinement check in the Codex browser confirmed the opening outcome stack progresses across scroll positions, with the muted lines revealing first and `Harder to compete with.` resolving last.
- Latest in-app browser check confirmed the Gap section renders as `16%`, `77%`, `12%` across three columns on desktop, with the longer captions/sources visible, white background, and horizontal overflow at `0`.
- Latest in-app browser check confirmed Section 2 is no longer pinned: the headline is the first visible read, the qualifier remains hidden until the next scroll position, the setup stays hidden until later, and the blue final outcome resolves last.
- Typography audit confirmed Aileron loads for the homepage, only `400` and `700` weights are used in the measured homepage roles, named tokens now drive the Gap and Section 2 exceptions, and horizontal overflow remains `0`.
- Hero typography check at desktop confirmed the `Hero Promise` role renders at `18.432px` on a `1440px` viewport, keeps three locked lines and has no horizontal overflow.
- Vercel production build passed and was aliased to `https://www.studiobaggio.ai`.
- Live production browser check at `https://www.studiobaggio.ai/` confirms the latest Gap copy is present, old `78%` / `31%` / Studio Graphene / TechRadar copy is absent, and CTA text appears once.
- Codex browser desktop check at `1440x900`: all nine `.home-4b` sections below the hero measure as full `900px` frames, horizontal overflow is `0`, and console error count is `0`.
- Codex browser mobile check at `390x844`: horizontal overflow is `0`; the Gap section now fits within the mobile viewport after the type/spacing correction.
- Header brand click verified from lower page scroll: `scrollY` returned from `8268.5` to `0`.

Production:

- Live URL: `https://www.studiobaggio.ai`
- Deployment URL: `https://studio-baggio-cqf1ioaeo-jaymes-projects-95f6f9cd.vercel.app`
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
- Hard colour rule: black, white and true neutral greys only. No pink, no purple, no purple-tinted grey, no lavender/blue-grey cast and no coloured accents in the Studio Baggio homepage/site direction unless Jayme explicitly reverses this in writing.
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

## Notes For Next Session

- Do not use the old live site as copy source.
- Do not use pink, purple, violet, lavender, purple-grey, blue-grey or any warm/coloured grey. The approved visual system is black, white and actual neutral greys only.
- Do not lead with Growth Intelligence as the front-door offer.
- Do not use `Map Your AI Advantage`.
- Avoid running `next build` and `tsc --noEmit` at the same time because Next 16 updates `.next/types` during build.
- Jayme wants completed and verified website changes pushed to `main` by default going forward, unless she explicitly asks not to push.
