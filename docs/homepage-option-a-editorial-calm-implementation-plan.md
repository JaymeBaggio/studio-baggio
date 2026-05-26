# Homepage Option A Editorial Calm Implementation Plan

## Summary

Update the live Studio Baggio homepage to use Paper `Option A Editorial Calm` as the homepage design source of truth, while keeping the existing hero/header untouched and swapping in the latest approved simplified Section 3 Gap treatment.

The homepage copy must match `/Users/jaymebaggio/Desktop/Studio Baggio/Website/HOMEPAGE_COPY_DRAFT.md`. No invented labels, no copy drift, no duplicated stat treatment.

## Build Target

- Use Paper `Studio Baggio Homepage - Option A Editorial Calm` as the design source of truth.
- Keep the current hero/header direction unchanged.
- Replace Option A's Gap section with the approved simplified Gap treatment:
  - no table
  - no duplicated stat
  - no invented labels
  - exact copy from `HOMEPAGE_COPY_DRAFT.md`
- Preserve the Swiss UI direction: clarity, consistency, hierarchy and understatedness.

## Skills To Use

1. `design-to-code`
   - Translate the approved Paper Option A direction into production code using the current Next/Tailwind/CSS conventions.
   - Use Paper as reference, not as blind generated output.

2. `visual-hierarchy`
   - Enforce one clear first read per section.
   - Prevent competing focal points, decorative stat placement and unclear eye paths.

3. `ui-design-system`
   - Lock type roles, spacing, neutral greys, section frames, rules, source text and button states.
   - Keep Aileron only and use black, white and true neutral greys only.

4. `gsap-react`
   - Implement GSAP safely inside the Next/React app with scoped animation and cleanup.

5. `gsap-scrolltrigger`
   - Use for semantic section reveal timing, masked line reveals and rule draws.
   - Do not use gimmicky scrub, pinning or count-up animation.

6. `framer-motion-animator`
   - Use only for micro-interactions such as button hover/tap and proof link hover.
   - Do not use Framer Motion for scroll animation.

7. `emil-design-eng`
   - Final polish audit for easing, timing, active states, reduced motion, no scale-from-zero, no jitter strokes and no pointless animation.

8. `browser:browser`
   - Verify the live local page in the Codex in-app browser at desktop and mobile sizes.

## Copy Rules

Source of truth:

`/Users/jaymebaggio/Desktop/Studio Baggio/Website/HOMEPAGE_COPY_DRAFT.md`

Rules:

- Copy must match the source file.
- Do not invent visible labels or section copy.
- Keep `effectivly` unless the source file changes.
- Do not repeat the same statistic in both the body and a separate stat block.
- Content should live in `src/content/site.ts` and `src/content/work.ts` unless there is a clear implementation reason not to.

## Section 3 Gap Treatment

Required structure:

- `THE GAP`
- `Adoption has run ahead of commercial return.`
- Body copy from the file.
- The `77% report no revenue change` point can be visually emphasized once inside the reading flow.
- Source line.
- Close line exactly as supplied.

Forbidden:

- tables
- ledgers
- duplicated stat sentence
- invented labels such as `Studio Baggio response`
- animated numbers or count-ups

## Motion Direction

Principle:

Use motion to enforce semantic hierarchy.

Timing hierarchy:

- labels appear fastest
- section headings reveal with authority
- key evidence lines reveal slightly slower
- sources appear quietly and quickly
- close/takeaway lines arrive last and most deliberately

Allowed:

- masked line reveals
- quiet fade/translate for body copy
- rule draws where they clarify structure
- subtle button/proof hover states

Forbidden:

- stat count-ups
- scale pops
- bounce
- jitter strokes
- animation that exists only to perform

## Implementation Scope

Likely files:

- `src/content/site.ts`
- `src/content/work.ts`
- `src/app/page.tsx`
- homepage CSS / `src/app/globals.css`
- `src/components/page-reveals.tsx`
- `src/components/proof-tiles.tsx`
- `src/components/value-map.tsx`

Do not touch:

- hero/header design
- unrelated pages
- contact form
- backend/API
- copy outside homepage unless required by shared content

## Verification

Before deploy:

- Snapshot rendered homepage text.
- Compare against `HOMEPAGE_COPY_DRAFT.md`.
- Run:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`
- Browser verify:
  - desktop `1440x900`
  - mobile `390x844`
  - reduced motion
  - no horizontal overflow
  - no console errors
- Confirm:
  - Paper Option A Editorial Calm direction is used
  - latest Gap section is swapped in
  - hero/header unchanged
  - copy has not drifted
  - animation supports reading order
