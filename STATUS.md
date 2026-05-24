# Studio Baggio Website - STATUS
*Last updated: 24 May 2026*

## Current Build

The old static single-page site has been replaced with a live Next.js phase-1
site for `studiobaggio.ai`.

Core message:

`Turn AI into a commercial advantage.`

## Built In Phase 1

- Home
- AI Commercial Advantage / Services
- Work
- Business Tracker
- Calm Authority
- About
- Contact
- Privacy

## Source Material

The Studio Baggio consulting strategy pack has been copied locally into:

`_strategy/Studio baggio consulting/`

Primary build files:

- `_strategy/Studio baggio consulting/Website_Build_Pack/`
- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_Script_v9_AI_Commercial_Advantage.md`
- `_strategy/Studio baggio consulting/design.md`

## Implementation

- Stack: Next.js, React, TypeScript, Tailwind, GSAP, ScrollTrigger, SplitText, Framer Motion, React Hook Form, Zod.
- Content layer: `src/content/site.ts` and `src/content/work.ts`.
- Work currently includes Calm Authority, Business Tracker, Last30Days and Fire Source. Hanbury / Growth Intelligence is removed from the public Work section for now.
- Business Tracker has a dedicated page using the 06 Business Tracker source copy.
- Calm Authority has a dedicated page using the 08 Calm Authority copy plus live Calm Authority source facts.
- SEO basics added: page-specific metadata, Open Graph image route, canonical URLs, sitemap, robots, favicons and Organization JSON-LD.
- Rough Cut / Newsletter and Playbook assets remain local phase-2 material and are excluded from Vercel deployment.

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
- Local routes return `200`: `/`, `/ai-advantage`, `/work`, `/business-tracker`, `/calm-authority`, `/about`, `/contact`, `/privacy`.
- `sitemap.xml`, `robots.txt`, `opengraph-image`, `icon` and `apple-icon` return `200`.
- Desktop render check: home reload starts at `scrollY: 0`, hero top is `0`, hero height is the full viewport, lede starts after the viewport, and there is no horizontal overflow.
- Mobile render check at 390x844: hero is full frame, no horizontal overflow, and hero text fits.
- Sticky-section cleanup check: homepage and Work no longer contain `position: sticky`, `pin: true`, `data-sticky-section`, `sticky-chapter` or masked SplitText lines.
- Contact form validation and missing-email-env error state verified in browser; the success message is not shown on the configured `503` fallback.
- Console error check clean in the in-app browser.
- Calm Authority desktop/mobile render checks passed after the fact-sheet and motion correction; the first scroll now shows `What it is`, `What it does` and `Who it is for`, the page has dedicated GSAP depth/reveals, and the old `The expertise was already there. The visibility was not.` line is removed.
- Content checks passed for v9 headline, required Work items, Business Tracker mandatory lines/channel logic, Calm Authority facts/proof and AI Advantage prioritisation section.
- `npm audit --omit=dev` currently reports 2 moderate advisories through Next's bundled PostCSS dependency; `npm audit fix --force` suggests an unsafe breaking downgrade, so this was not applied.

## Verified Live

- Implementation commit pushed to `main`: `c568393` (`Build Studio Baggio AI advantage site`).
- Browser-warning cleanup commit pushed to `main`: `e37d2be` (`Clean up Studio Baggio browser warnings`).
- Launch QA repair commit pushed to `main`: `e6f6bfb` (`Fix Studio Baggio launch QA issues`).
- Homepage offer-ladder completion commit pushed to `main`: `ac09486` (`Add homepage offer ladder`).
- Standalone page clarification commit pushed to `main`: `61f2696` (`Clarify standalone Studio Baggio pages`).
- Calm Authority fact-sheet correction commit pushed to `main`: `c5544ec` (`Update Calm Authority fact sheet page`).
- Motion/work QA commit pushed to `main`: `ee0bed6` (`Fix Studio Baggio motion and work QA`).
- Latest production deployment: `https://studio-baggio-dx1f7z9tv-jaymes-projects-95f6f9cd.vercel.app`.
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
