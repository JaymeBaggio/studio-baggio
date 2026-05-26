# Studio Baggio UI Design System
*Locked guide. 26 May 2026.*

## Status

This is the canonical UI design system for `studiobaggio.ai`.

It is locked from the current approved homepage direction, not from older strategy files, discarded Paper explorations, or another agent's partial notes.

Primary implementation source:

```txt
src/app/globals.css
/* Studio Baggio homepage - Option A Editorial Calm system */
.home-4b { ... }
```

Companion typography source:

```txt
docs/studio-baggio-typography-system.md
```

Use this design system to roll the homepage visual language across:

- `AI Advantage`
- `Work`
- `Business Tracker`
- `Calm Authority`
- `About`
- `Contact`
- `Privacy`

Do not redesign from scratch. Extend this system.

---

## Design Position

Studio Baggio should feel:

- precise
- editorial
- quiet luxury
- commercially intelligent
- Swiss-influenced in clarity, grid, restraint and hierarchy
- minimal without feeling empty
- animated only where motion improves reading order

It should not feel:

- SaaS-template
- bento-heavy
- decorative
- over-carded
- beige, purple, blue-grey or warm editorial
- randomly oversized
- vague, empty, or split into awkward left/right reading paths

The design should make the message easier to read, not harder.

---

## Non-Negotiables

1. Do not change copy unless Jayme explicitly asks.
2. Do not change the homepage hero/header direction.
3. Do not introduce new colours outside the locked tokens.
4. Do not introduce new font sizes, weights, letter-spacing values or text colours unless the role is added to the typography system.
5. Do not use card-in-card layouts.
6. Do not use decorative blobs, gradients, bento grids, shadows or rounded SaaS cards.
7. Do not use blue as decoration. Blue is a signal.
8. Every section must have one clear first read.
9. Every section must have a complete frame at desktop and mobile.
10. No horizontal overflow.

---

## Core Tokens

Use the homepage `.home-4b` token set as the source of truth.

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--sb-ink` | `#111111` | Primary text |
| `--sb-paper` | `#ffffff` | Light section background |
| `--sb-soft` | `#f4f4f4` | Soft neutral support only |
| `--sb-dark` | `#101010` | Dark editorial sections |
| `--sb-rule` | `#d8d8d8` | Light-section hairlines |
| `--sb-dark-rule` | `#303030` | Dark-section hairlines |
| `--sb-muted` | `#8a8a8a` | Labels, muted support text |
| `--sb-dark-muted` | `#b8b8b8` | Labels on dark backgrounds |
| `--sb-body` | `#4f4f4f` | Long-form body copy |
| `--sb-dark-body` | `#d4d4d4` | Long-form dark-section copy |
| `--sb-source` | `#b0b0b0` | Small source/citation text |
| `--sb-outcome-muted` | `#9a9a9a` | Section 2 muted outcome stack |
| `--sb-accent-blue` | `#2f5cff` | Blue dot and Section 2 final outcome only |

Rules:

- Black, white and true neutral greys are the base.
- Blue is only for the `BAGGIO.AI` dot and the homepage Section 2 final outcome line unless Jayme explicitly expands it.
- No beige, sand, brown, lavender, purple, blue-grey or warm grey cast.
- No opacity-stacked text when a token exists.

### Layout

| Token | Value | Use |
| --- | --- | --- |
| `--sb-page-x` | `clamp(24px, 5.6vw, 80px)` | Page side inset |
| `--sb-frame` | `1280px` | Main editorial frame |
| `--sb-reading` | `940px` | Long title/body reading lane |
| `--sb-wide` | `1120px` | Rows, indexes, proof and FAQ |
| `--sb-section-y` | `clamp(84px, 11vh, 118px)` | Standard desktop section padding |

Mobile overrides:

```css
--sb-page-x: 18px;
--sb-section-y: 52px;
```

Rules:

- Use a single page frame, then compose inside it.
- Section content should feel deliberately framed, not scattered.
- Prefer one strong column or one ruled grid. Avoid arbitrary left/right splits.
- Use full-width section bands, not floating page-section cards.

---

## Typography

Use `Aileron` only.

Allowed weights:

- `400`
- `700`

No intermediate weights. No fake semi-bold.

The full type system is locked in:

```txt
docs/studio-baggio-typography-system.md
```

Core roles:

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
- Section 2 proposition exceptions

Rules:

- Labels are uppercase and letter-spaced.
- Section titles are sentence case and regular weight.
- Body is regular weight.
- Bold is reserved for labels, compact row titles, CTA text and true emphasis.
- Letter spacing is `0` except labels and the Section 2 qualifier.
- Use layout, spacing and motion before inventing a new type size.

---

## Section System

### Standard Light Section

Use for most pages and explanatory sections.

Pattern:

1. Eyebrow.
2. Section title.
3. Body, row list, proof row, deliverables or FAQ.
4. Optional rule.

CSS reference:

```css
.home-4b > section
.home-4b .editorial-container
.home-4b .commercial-sprint-section
.home-4b .working-promise-section
.home-4b .proof-section
.home-4b .fit-section
.home-4b .faq-section
```

Use when:

- the page needs calm explanation
- the message needs authority
- the user should read in a clean vertical sequence

Avoid:

- split blocks that make the eye jump left/right
- giant empty zones with no content weight
- multiple unrelated ideas in one frame

### Dark Editorial Section

Use sparingly, for one section that needs contrast or system weight.

CSS reference:

```css
.home-4b .value-map-section
.home-4b .home-cta-section
```

Rules:

- Background is `--sb-dark`.
- Hairlines use `--sb-dark-rule`.
- Labels use `--sb-dark-muted`.
- Body uses `--sb-dark-body`.
- Do not use dark sections as decoration. They must mark a real structural shift.

### Ruled Index / Accordion

Use for lists of services, product modules, proof rows or FAQs where scanning matters.

Homepage reference:

```css
.home-4b .value-map-rows
.home-4b .value-map-row
.home-4b .value-map-row-button
.home-4b .value-map-detail
```

Rules:

- Rows should be readable when collapsed.
- The collapsed state must include the title and one useful summary line.
- Expanded detail should add depth, not repeat the headline.
- Use `+` / `-` or a similarly minimal indicator.
- Hover/focus/click states must be visible and calm.

### Evidence / Stat Block

Use when evidence needs to carry an argument.

Homepage reference:

```css
.home-4b .problem-stat-grid
.home-4b .problem-stat-card
.home-4b .problem-stat-value
.home-4b .problem-stat-label
.home-4b .problem-stat-source
```

Rules:

- The stat is the visual object.
- The caption explains the denominator.
- The source stays visible but secondary.
- Do not add tables unless the user needs comparison logic.
- Do not repeat the same fact twice.

### Proof Rows

Use for work, case studies, product links and proof items.

Homepage reference:

```css
.home-4b .proof-row-list
.home-4b .proof-row
.home-4b .proof-row-link
.home-4b .proof-row-title
.home-4b .proof-row-copy
```

Rules:

- Title left, proof copy right on desktop.
- Stack on mobile.
- Keep rows ruled and calm.
- No image cards unless the image is the actual subject and adds proof.

### Fit Cards

Use for binary fit / not-fit logic.

Homepage reference:

```css
.home-4b .fit-card-grid
.home-4b .fit-card
.home-4b .fit-card.is-dark
```

Rules:

- Two cards maximum for a binary contrast.
- Light card for positive fit.
- Dark card for negative/not-fit.
- Keep text compact.

### Final CTA

Use a dark editorial section with one clear action.

Homepage reference:

```css
.home-4b .home-cta-section
.home-4b [data-cta-button]
```

Rules:

- One CTA.
- No extra marketing fluff.
- Button text must match the content source.
- CTA should feel like a conclusion, not a banner.

---

## Homepage Exceptions

The homepage has two deliberate exceptions. Do not casually copy them to every page.

### Hero

The hero wordmark is a brand composition, not a normal type role.

Allowed:

- large `STUDIO / BAGGIO.AI` wordmark
- blue dot
- three-line hero promise
- compact top-left metadata block

Do not modify unless Jayme asks.

### Section 2 Core Proposition

Section 2 is the only centred proposition frame.

It may use:

- centred thesis
- larger opening title role
- larger setup role
- muted uppercase outcome stack
- blue final outcome line
- semantic scroll-led reveal

Do not copy this treatment to ordinary content pages unless the page has a similarly central thesis that deserves the exception.

---

## Motion System

Use motion to enforce semantic hierarchy.

### GSAP

Use GSAP for:

- scroll-led reveals
- masked title-line reveals
- rule draws
- section-level sequencing
- dark-section row reveals
- evidence reveal sequences

Rules:

- Motion must clarify reading order.
- Do not animate everything at once.
- Do not reveal important lines before the user reaches them.
- Do not use jittery strokes, scale-from-zero stats, or decorative motion.
- Reduced-motion users must still see all content clearly.

### Framer Motion

Use Framer Motion only for component-level interactions:

- hover
- focus/tap
- accordion open/close
- row micro-interactions
- button states

Do not use Framer Motion for scroll storytelling.

### Current Homepage Motion Order

Section 2:

1. Thesis.
2. Qualifier.
3. Studio Baggio setup line.
4. Muted outcome stack.
5. Blue final outcome.

Standard sections:

1. Eyebrow.
2. Title lines.
3. Evidence/list/body.
4. Source/close/CTA.

---

## Page Rollout Rules

When converting another page, follow this order:

1. Read this document.
2. Read `docs/studio-baggio-typography-system.md`.
3. Read that page's existing copy/source.
4. Keep copy unchanged unless Jayme explicitly asks.
5. Choose a page structure from the section system above.
6. Use existing homepage tokens first.
7. Add no new type/colour tokens unless unavoidable.
8. Test desktop and mobile.
9. Confirm no horizontal overflow.
10. Update `STATUS.md`.

Recommended page mapping:

| Page | Recommended pattern |
| --- | --- |
| `AI Advantage` | Standard light sections plus one dark ruled index |
| `Work` | Proof rows / case-study index |
| `Business Tracker` | Product case-study page: light intro, dark module index, proof/outcome rows |
| `Calm Authority` | Product case-study page with actual proof assets only |
| `About` | Plain editorial page, mostly light sections |
| `Contact` | Simple editorial contact page, no decorative form theatre |
| `Privacy` | Quiet legal/editorial text page |

---

## QA Checklist

Before a page is considered aligned:

- Aileron is the only visible typeface.
- Text weights are only `400` and `700`.
- Labels use the label role.
- Section titles use the section-title role.
- Body copy uses the body or small-body role.
- Hairlines are 1px and tokenised.
- Colours are only the locked neutral tokens plus approved blue usage.
- The first read of each section is obvious.
- No section reads as a random empty gap.
- No card-in-card.
- No horizontal overflow.
- Mobile text fits and does not create awkward single-word orphans where it can be avoided.
- Motion reinforces reading order.
- Reduced motion remains readable.
- Header/hero direction is not changed.

---

## Current Known Copy Note

The current live Gap design uses a three-stat visual treatment. Jayme has parked exact copy reconciliation for now.

Do not use this design-system rollout as permission to rewrite homepage copy. If copy accuracy is being checked, compare against:

```txt
HOMEPAGE_COPY_DRAFT.md
```

and resolve differences explicitly with Jayme.
