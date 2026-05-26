# Studio Baggio Other Pages Rollout Handover
*For the next agent. 26 May 2026.*

## Objective

Roll the approved Studio Baggio homepage design system across the remaining site pages without redesigning the homepage and without drifting the copy.

The homepage is the source of truth. The job is to make the other pages feel like they belong to the same precise, editorial, quiet-luxury system.

## Current State

Live site:

```txt
https://www.studiobaggio.ai
```

Current branch:

```txt
quiet-luxury-homepage-system
```

The homepage has been through a detailed design pass and is now the approved direction. The remaining pages are not yet at the same level.

Pages to bring into the system:

- `AI Advantage` - `src/app/ai-advantage/page.tsx`
- `Work` - `src/app/work/page.tsx`
- `Business Tracker` - `src/app/business-tracker/page.tsx`
- `Calm Authority` - `src/app/calm-authority/page.tsx`
- `About` - `src/app/about/page.tsx`
- `Contact` - `src/app/contact/page.tsx`
- `Privacy` - `src/app/privacy/page.tsx`
- Optional later pass: `Fire Source` and `Last30Days`

Do not start from an old strategy document, discarded Paper exploration, or another agent's partial interpretation. Start from the locked docs below.

## Read First

Read these files before editing anything:

```txt
STATUS.md
docs/studio-baggio-design-system.md
docs/studio-baggio-typography-system.md
src/app/globals.css
src/app/page.tsx
src/content/site.ts
src/content/work.ts
```

The live homepage system is implemented in:

```txt
src/app/globals.css
/* Studio Baggio homepage - Option A Editorial Calm system */
.home-4b { ... }
```

The design-system handoff is:

```txt
docs/studio-baggio-design-system.md
```

The typography handoff is:

```txt
docs/studio-baggio-typography-system.md
```

## Non-Negotiables

1. Do not change homepage hero/header direction.
2. Do not rewrite copy unless Jayme explicitly asks.
3. Do not introduce new colours outside the locked tokens.
4. Do not introduce new font sizes, weights, tracking values or text colours unless they are added to the typography system.
5. Do not use card-in-card layouts.
6. Do not use decorative blobs, gradients, bento grids, drop shadows or rounded SaaS cards.
7. Blue is not decoration. It is a signal. Current approved use is the hero dot and the Section 2 final outcome line.
8. Every section needs one clear first read.
9. Every section needs to feel like a complete frame.
10. No horizontal overflow.

## Design Direction

Studio Baggio should feel:

- precise
- editorial
- quiet luxury
- Swiss-influenced
- restrained but not empty
- commercially sharp
- consistent in hierarchy and rhythm

The design should not feel:

- like a SaaS template
- over-carded
- messy
- split into awkward left/right reading paths
- decorative for its own sake
- sparse to the point of looking unfinished
- inconsistent from page to page

The main design problem to solve on every page is hierarchy. Make the key message land first, then support it with calm evidence, rows, proof or detail.

## Required Design System

Use the homepage `.home-4b` tokens as the base.

Core colours:

```css
--sb-ink: #111111;
--sb-paper: #ffffff;
--sb-soft: #f4f4f4;
--sb-dark: #101010;
--sb-rule: #d8d8d8;
--sb-dark-rule: #303030;
--sb-muted: #8a8a8a;
--sb-dark-muted: #b8b8b8;
--sb-body: #4f4f4f;
--sb-dark-body: #d4d4d4;
--sb-source: #b0b0b0;
--sb-accent-blue: #2f5cff;
```

Core layout:

```css
--sb-page-x: clamp(24px, 5.6vw, 80px);
--sb-frame: 1280px;
--sb-reading: 940px;
--sb-wide: 1120px;
--sb-section-y: clamp(84px, 11vh, 118px);
```

Mobile:

```css
--sb-page-x: 18px;
--sb-section-y: 52px;
```

Font:

```txt
Aileron only.
Allowed weights: 400 and 700.
```

Use the named roles in `docs/studio-baggio-typography-system.md`:

- Label / Eyebrow
- Section Title
- Lead / Proof Statement
- Body
- Row Title
- Small / Dense Body
- Stat Display
- Stat Caption
- Stat Source
- Gap Close
- Value Summary
- Hero Promise

Do not invent one-off type styles.

## Page Structure Patterns

Use the existing homepage section system rather than making new visual systems for every page.

### Standard Light Editorial Section

Use for most explanatory sections.

Pattern:

1. Eyebrow
2. Section title
3. Body, proof row, index row, deliverables or FAQ
4. Optional hairline

### Dark Editorial Section

Use sparingly for one strong structural shift.

Good use cases:

- Service index
- Product module index
- Final CTA
- Evidence-heavy section that needs contrast

Do not use dark sections just to add drama.

### Ruled Index / Accordion

Use for lists that need scanability.

Good use cases:

- Service modules
- Product capabilities
- FAQs
- Work/case-study indexes

Collapsed rows should show:

- number or small label
- title
- one useful summary line
- minimal open/close indicator

Expanded rows should add genuine detail, not repeat the summary.

### Proof Rows

Use for work, case studies, products and evidence.

Preferred structure:

- title left
- proof/explanation right
- hairline rows
- no image cards unless the image is real proof and useful

### Fit / Not Fit Blocks

Use only for clear binary contrasts.

Preferred structure:

- two panels maximum
- light positive card
- dark negative card
- compact copy

## Motion Rules

Use motion to enforce semantic hierarchy.

Use GSAP and ScrollTrigger for:

- scroll-led section reveals
- masked title-line reveals
- rule draws
- semantic sequencing
- evidence reveal order

Use Framer Motion only for:

- hover states
- tap/focus states
- accordion open/close
- row micro-interactions
- button states

Do not use Framer Motion for scroll storytelling.

Reduced-motion users must still see all content clearly.

Do not use:

- scale-from-zero stats
- jitter strokes
- elements that animate before the reader reaches them
- tiny motion that is effectively invisible
- everything revealing at once

## Recommended Skills For The Next Agent

If working in the Codex/Claude skill system, use:

1. `ui-design-system`
   - For keeping tokens, type roles, spacing, section patterns and handoff discipline consistent.
2. `ui-ux-pro-max`
   - For page-level hierarchy, what the reader sees first, what can be removed, and whether the page feels premium or messy.
3. `ui-audit`
   - For final checks against type scale, colour tokens, spacing, overflow and hierarchy.
4. `gsap-scrolltrigger`
   - Only where scroll-led motion is needed to clarify a page narrative.
5. `framer-motion-animator`
   - Only for component-level interaction states such as accordions, hover and tap.

Do not use skills as decoration. The output still needs judgment.

## Suggested Rollout Order

Do not try to fix every page in one huge undifferentiated pass. Work page by page, but keep shared CSS/components reusable.

Recommended order:

1. `AI Advantage`
   - This is closest to the homepage commercial argument.
   - Use it to prove the system beyond the homepage.
2. `Work`
   - Convert to a calm proof/case-study index.
   - It should feel like evidence, not a portfolio grid.
3. `Business Tracker`
   - Product case-study page.
   - Use light intro, dark module index, proof/outcome rows.
4. `Calm Authority`
   - Product case-study page.
   - Use actual proof assets only. No invented proof.
5. `About`
   - Plain editorial page.
   - Keep it clean, direct and founder/studio-led.
6. `Contact`
   - Simple editorial contact page.
   - Avoid form theatre or over-designed panels.
7. `Privacy`
   - Quiet legal/editorial page.
   - Mostly typography and spacing discipline.

## Page-By-Page Direction

### AI Advantage

Goal:

Make the service proposition feel as clear and commercially sharp as the homepage.

Recommended pattern:

- Light editorial intro.
- One dark ruled index for capability/service areas.
- Light section for process or outcomes.
- Final CTA.

Watch for:

- Vague service copy becoming too visually important.
- Too many cards.
- Sections that look like empty white space rather than deliberate frames.

### Work

Goal:

Make work feel like proof.

Recommended pattern:

- Light intro.
- Ruled proof rows.
- Each work item should have title, short proof line, and clear link/action if applicable.

Watch for:

- Portfolio-grid energy.
- Decorative thumbnails with no proof.
- Overwriting product/case-study copy.

### Business Tracker

Goal:

Make it feel like a concrete commercial tool, not an abstract product page.

Recommended pattern:

- Editorial intro.
- Dark module/system index.
- Proof/outcome rows.
- Simple CTA.

Watch for:

- Overcomplicating with SaaS-dashboard styling.
- Generic product marketing sections.

### Calm Authority

Goal:

Make the page feel credible and commercially mature, while using only real proof.

Recommended pattern:

- Plain editorial intro.
- Real proof assets/logos only where they add trust.
- Ruled sections for what it does, who it is for, and why it matters.

Watch for:

- Warm/pink styling returning.
- Decorative credibility claims.
- Any invented CTA or proof line.

### About

Goal:

Make Studio Baggio and Jayme feel credible, clear and sharp without over-design.

Recommended pattern:

- Plain editorial sections.
- Strong first read.
- Calm founder/studio story.
- Selective proof rows.

Watch for:

- Abstract capability grids.
- Overly personal or over-written presentation.
- Page looking disconnected from the homepage.

### Contact

Goal:

Make the next step clear and low-friction.

Recommended pattern:

- Short editorial intro.
- Simple contact route.
- Maybe one fit qualifier.
- Dark final CTA only if it adds clarity.

Watch for:

- Decorative forms.
- Too many contact options.
- Weak hierarchy around what the visitor should do.

### Privacy

Goal:

Make legal copy clean, readable and aligned.

Recommended pattern:

- Light editorial/legal document.
- Strong spacing, hairlines and type hierarchy.
- No animation beyond basic reveal, if any.

Watch for:

- Over-designing a legal page.

## Current Copy Warning

Jayme has parked exact homepage copy reconciliation for now.

Do not use this rollout as permission to rewrite copy.

If copy accuracy is requested, compare against:

```txt
HOMEPAGE_COPY_DRAFT.md
src/content/site.ts
src/content/work.ts
```

Resolve differences explicitly with Jayme.

## Implementation Guidance

Recommended technical approach:

1. Start a new branch from `main` after confirming it includes the latest design-system docs.
2. Extract reusable page-system classes or components only when they reduce duplication.
3. Prefer extending the existing homepage token system rather than creating unrelated page CSS.
4. Keep page-specific exceptions small and documented.
5. Keep changes scoped page by page.
6. Update `STATUS.md` as pages are completed.

Likely files to touch:

```txt
src/app/globals.css
src/app/ai-advantage/page.tsx
src/app/work/page.tsx
src/app/business-tracker/page.tsx
src/app/calm-authority/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/privacy/page.tsx
src/components/page-reveals.tsx
src/content/site.ts
src/content/work.ts
STATUS.md
```

Do not touch `src/content/site.ts` or `src/content/work.ts` unless the task is explicitly copy/content cleanup. Layout work should usually happen in page components and CSS.

## QA Checklist

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Browser checks:

- Desktop: `1440x900`
- Mobile: `390x844`
- Check every changed page in full-page context.
- Confirm no horizontal overflow.
- Confirm no console errors.
- Confirm text fits on mobile.
- Confirm important lines are not missed because of motion timing.
- Confirm reduced-motion users can read everything.

Design checks:

- One clear first read per section.
- No random empty frames.
- No awkward left/right reading paths.
- No new unapproved colours.
- No new unapproved type sizes.
- Hairlines are consistent.
- Dark sections are used for structure, not decoration.
- Motion clarifies reading order.

## Definition Of Done

A page is done when:

1. It uses the Studio Baggio design system.
2. It uses the locked typography scale.
3. Copy has not drifted.
4. It feels visually related to the homepage.
5. It has a clear first read in every section.
6. It works on desktop and mobile.
7. It has no horizontal overflow.
8. `typecheck`, `lint` and `build` pass.
9. `STATUS.md` is updated.
10. The branch is pushed and ready for Jayme to review.

