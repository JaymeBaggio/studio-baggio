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
- Work includes Calm Authority, Hanbury / Growth Intelligence, Business Tracker, Last30Days and Fire Source.
- Business Tracker has a dedicated page using the 06 Business Tracker source copy.
- Calm Authority has a dedicated page using the 08 Calm Authority copy plus live Calm Authority source facts.
- SEO basics added: metadata, Open Graph image route, canonical URLs, sitemap, robots and Organization JSON-LD.
- Existing Rough Cut / Newsletter and Playbook assets were preserved under `public/assets/` for phase 2.

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
- `sitemap.xml` and `robots.txt` return `200`.
- Desktop and mobile browser checks show no horizontal overflow.
- Contact form validation and missing-email-env error state verified in browser.
- Console error check clean in the in-app browser.

## Verified Live

- Implementation commit pushed to `main`: `c568393` (`Build Studio Baggio AI advantage site`).
- Launch status committed after deployment verification.
- Vercel project: `studio-baggio`.
- Vercel framework preset: `nextjs`.
- Domains verified:
  - `https://studiobaggio.ai` redirects to `https://www.studiobaggio.ai/`.
  - `https://www.studiobaggio.ai/` returns `200`.
- Live routes verified as `200`: `/`, `/ai-advantage`, `/work`, `/business-tracker`, `/calm-authority`, `/about`, `/contact`, `/privacy`.
- `sitemap.xml` and `robots.txt` return `200`.
- Live source includes the v9 headline `Turn AI into a commercial advantage.`
- Live Business Tracker page includes the required operating-system line and channel logic.
- Live Calm Authority page includes the dedicated case-study copy and proof facts.

## Deployment Notes

The first Vercel deployment after the GitHub push returned `404` because the
project was still configured as a generic/static project. With a `public/`
folder present, Vercel served static assets instead of the Next output.

Fixed on 24 May 2026:

- Updated Vercel project framework to `nextjs`.
- Redeployed to production.
- Re-verified custom domains and phase-1 routes.

Still required before expecting email delivery from the form:

- Add `RESEND_API_KEY` in Vercel.
- Add `CONTACT_FROM_EMAIL` in Vercel.
- Optional: add `CONTACT_TO_EMAIL`; otherwise it defaults to `jayme@studiobaggio.ai`.

## Deferred To Phase 2

- Rough Cut / Newsletter archive.
- Playbooks pages.
- Sector pages.
- Deeper standalone case studies for Hanbury, Last30Days and Fire Source.

## Notes For Next Session

- Do not use the old live site as copy source.
- Do not lead with Growth Intelligence as the front-door offer.
- Do not use `Map Your AI Advantage`.
- Avoid running `next build` and `tsc --noEmit` at the same time because Next 16 updates `.next/types` during build.
