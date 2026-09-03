# Studio Baggio Website

## What This Is

Jayme Baggio's Studio Baggio website at `studiobaggio.ai`.

The old static, micrographic single-page site has been replaced by the phase-1
AI commercial advantage site.

## Current Source Of Truth

Use the copied strategy pack in this repo:

`_strategy/Studio baggio consulting/Website_Build_Pack/00_READ_ME_FIRST.md`

Priority:

1. Latest user instruction.
2. Website Build Pack.
3. v9 copy.
4. `design.md`.
5. Older static-site notes only where they do not conflict.

## Core Message

Lead with:

`Turn AI into a commercial advantage.`

Studio Baggio builds practical AI systems for expert-led businesses across AI
search, market intelligence, lead intelligence, authority systems and workflow
acceleration.

## Stack

- Next.js / React
- TypeScript
- Tailwind
- GSAP + ScrollTrigger + SplitText for cinematic scroll and text reveals
- Framer Motion for component micro-interactions
- React Hook Form + Zod for the contact form
- Resend-compatible API route for contact email
- Vercel deployment

## Phase 1 Pages

- Home
- AI Commercial Advantage / Services
- Work
- Business Tracker
- Calm Authority
- About
- Contact
- Privacy

Phase 2, not built yet:

- Rough Cut / Newsletter archive
- Playbooks pages
- Sector pages
- Deeper Hanbury / Last30Days / Fire Source standalone case studies

## Content Layer

Editable copy and metadata live in:

- `src/content/site.ts`
- `src/content/work.ts`

Do not bury main site copy inside route components unless there is a good reason.

## Contact Form

The form posts to `src/app/api/contact/route.ts`.

Required Vercel env vars for live email sending:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL` optional, defaults to `jayme@studiobaggio.ai`

If `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` is missing, the endpoint returns a
clear `503` and tells the user to email Jayme directly.

## Build Commands

```bash
npm run typecheck
npm run lint
npm run build
```

Avoid running `next build` and `tsc --noEmit` at the same time because Next 16
updates `.next/types` during build.

## Visual Rules

- Premium monochrome editorial direction.
- Hard colour rule: black, white and true neutral greys as the base system, with one approved Studio Baggio blue accent: `#2563EB` / `--sb-accent-blue`. No pink, purple, violet, lavender, purple-grey, blue-grey or any grey with a colour cast. Do not introduce any other colour accents unless Jayme explicitly approves them.
- Aileron loaded locally from `public/fonts/aileron`.
- Large typographic compositions, sparse whitespace, strong section rhythm.
- No purple gradients, blobs, generic SaaS bento layout, fake proof or stock imagery.
- GSAP owns scroll storytelling. Framer Motion owns component-level interactions.
- Respect reduced motion and keep mobile readable.

## Research Report Rules

- Design every headline finding for a cold reader. Each finding must work as a self-contained statement without requiring the surrounding report for context.
- Keep the figure inside the finding it supports. Do not detach percentages or counts into a narrow or floating number column.
- Use the established law-study pattern for headline findings: full-width ruled rows, consistent alignment and no decorative stat labels.
- Lead each row with a plain-English conclusion, then add the minimum evidence needed to interpret it. Include the relevant population, denominator or research surface where it materially changes the meaning.
- State the practical implication: make the “so what” explicit. If a figure does not support a meaningful conclusion, remove it rather than presenting it as an isolated fact.
- Reuse the established report masthead grid and hierarchy unless Jayme explicitly approves a different pattern.
- Verify the complete rendered report on desktop and mobile, including intended line breaks, readable stacking and horizontal overflow, before calling it complete.
