# Studio Baggio Website - STATUS
*Last updated: 25 May 2026*

## Current Build

The old static single-page site has been replaced with a live Next.js phase-1
site for `studiobaggio.ai`.

Core message:

`Turn AI into a commercial advantage.`

## 25 May Calm Authority Branch Copy Rebuild

Branch: `calm-authority-page-copy`.

Worktree: `/Users/jaymebaggio/Desktop/Studio Baggio/Website-calm-authority`.

Scope:

- Rebuilt `/calm-authority` only, from clean `origin/main`, to avoid clashing with the uncommitted homepage work in the main website folder.
- Replaced the old Calm Authority fact-sheet/pricing/recent-study page structure with Jayme's supplied flagship-product copy.
- New page sequence: hero, featured-in wordmarks, commercial thesis, problem, why now, how it works, who it is for, proof, compliance, featured-in, founding adviser and built-by sections.
- Updated Calm Authority page metadata to `Calm Authority | Your own expertise at scale`.

Verified on branch:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Local branch preview route returned `200` at `http://127.0.0.1:3002/calm-authority`.

Not live yet. Merge or deploy this branch after review.

## 25 May Calm Authority Product Page Redesign

Branch: `calm-authority-og-image`.

Worktree: `/Users/jaymebaggio/Desktop/Studio Baggio/Website-calm-authority`.

Scope:

- Rebuilt `/calm-authority` as a full flagship product page rather than a linear copy page.
- Used the supplied Calm Authority copy as the visible product-page source of truth; removed added explanatory microcopy after Jayme clarified not to change copy.
- Added the rectangular Calm Authority OG asset from Downloads at `public/assets/products/calm-authority-og-rectangle.png`.
- Made the OG image click through to `https://www.calmauthority.ai/`, with original PNG dimensions and `unoptimized` rendering to avoid blurry text.
- Replaced the old Calm Authority motion layer with a page-specific client component using GSAP ScrollTrigger for the desktop mechanism section and Framer Motion for tactile card, proof and CTA interactions.
- New page structure: editorial hero, featured-in strip, product intro/thesis, problem/stat band, why-now signal labels, scroll-aware how-it-works mechanism, who-it-is-for panels, proof panel, compliance controls, featured-in repeat, founding adviser / built-by panels and final Calm Authority CTA.

Verified locally before push:

- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Render checks at desktop `1440x1000` and mobile `390x844` show no horizontal overflow.
- Calm Authority OG image renders from the original `1659x948` PNG and the image link points to `https://www.calmauthority.ai/`.
- Follow-up copy tweak: removed the dash before the hero tagline and changed it to `Your own expertise at scale`.

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

## 25 May Homepage Revised Direction

Jayme approved and implemented a revised homepage direction. It is saved in:

`_strategy/Studio baggio consulting/Website_Build_Pack/09_HOMEPAGE_REVISED_DIRECTION_2026-05-25.md`

Key decisions:

- Keep the existing hero/header reference direction locked.
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
- Do not lead with Growth Intelligence as the front-door offer.
- Do not use `Map Your AI Advantage`.
- Avoid running `next build` and `tsc --noEmit` at the same time because Next 16 updates `.next/types` during build.
