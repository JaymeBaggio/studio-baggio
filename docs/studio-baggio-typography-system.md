# Studio Baggio Typography System
*Locked guide. 26 May 2026.*

## Status

The homepage now has a locked typography system in `src/app/globals.css` under:

```css
/* Studio Baggio homepage - Option A Editorial Calm system */
.home-4b { ... }
```

This document makes that system explicit so future page work does not drift into random font sizes, weights, colours or casing.

Current scope:
- Locked for the homepage editorial system.
- To be rolled across `AI Advantage`, `Work`, `Business Tracker`, `Calm Authority`, `About`, `Contact` and `Privacy`.

Rule:
- Do not add a new font size, weight, tracking value or text colour unless it becomes a named role in this document.

---

## Font Family

Primary typeface: `Aileron`

Loaded from:

```txt
public/fonts/aileron/Aileron-Regular.woff2
public/fonts/aileron/Aileron-Bold.woff2
public/fonts/aileron/Aileron-Italic.woff2
```

CSS stack:

```css
font-family: var(--font-aileron), Aileron, Arial, sans-serif;
```

Allowed weights:

| Weight | Use |
| --- | --- |
| `400` | Body, supporting copy, proof copy, FAQ answers |
| `700` | Labels, section titles, lead statements, row titles, CTAs, emphasis |

No intermediate weights. No fake semi-bold.

---

## Core Colour Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--sb-ink` | `#111111` | Primary text |
| `--sb-paper` | `#ffffff` | Light section background |
| `--sb-soft` | `#f4f4f4` | Soft evidence section background |
| `--sb-dark` | `#101010` | Dark section background |
| `--sb-muted` | `#8a8a8a` | Light-section labels, source text, muted outcome lines |
| `--sb-body` | `#4f4f4f` | Long-form body copy on light backgrounds |
| `--sb-dark-muted` | `#b8b8b8` | Dark-section labels |
| `--sb-dark-body` | `#d4d4d4` | Dark-section body copy |
| `--sb-rule` | `#d8d8d8` | Light-section hairlines |
| `--sb-dark-rule` | `#303030` | Dark-section hairlines |
| `--sb-accent-blue` | `#2f5cff` | Sparing brand accent, currently only the `BAGGIO.AI` dot |

Colour rule:
- Use true neutral greys only.
- Blue is the only approved accent and should behave like a signal, not decoration.
- Do not introduce blue-grey, beige, brown, purple or any second accent colour.
- Use token colours instead of opacity stacking for text.

---

## Homepage Type Scale

Base body size: `16px`.

| Role | CSS Token | Desktop Size | Mobile Size | Line Height | Weight | Tracking | Case | Colour |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Label / Eyebrow | `--sb-label-size` | `12px` | `12px` | `16px` | `700` | `0.26em` | Uppercase | `--sb-muted` / `--sb-dark-muted` |
| Section Title | `--sb-title-size` | `clamp(38px, 3.9vw, 56px)` | `clamp(30px, 8.4vw, 36px)` | `1.07` | `700` | `0` | Sentence case | `--sb-ink` |
| Lead / Proof Statement | `--sb-lead-size` | `clamp(23px, 2.35vw, 34px)` | `clamp(22px, 6.2vw, 28px)` | `1.14` | `700` | `0` | Sentence case | `--sb-ink` |
| Body | `--sb-body-size` | `16px` | `15px` | `1.46` | `400` | `0` | Sentence case | `--sb-body` / `--sb-ink` |
| Row Title | `--sb-row-size` | `18px` | `16px` | `1.35` | `700` | `0` | Context dependent | `--sb-ink` / white |
| Small / Dense Body | `--sb-small-size` | `15px` | `15px` | `1.45` | `400` | `0` | Sentence case | `--sb-body` / `--sb-dark-body` |

---

## Role Mapping

### Label / Eyebrow

Use for:
- Section eyebrows.
- Source labels.
- Number labels.
- CTA button text.
- Fit card labels.

CSS selectors:

```css
.home-4b .eyebrow,
.home-4b .problem-source,
.home-4b .commercial-deliverable-row span,
.home-4b .fit-card h3,
.home-4b [data-cta-button] a > span
```

Rules:
- Always uppercase.
- Always `12px / 16px`.
- Always `700`.
- Always letter-spaced.

### Section Title

Use for:
- Opening argument H1-style section heading.
- Gap title.
- Audit title.
- Working promise title.
- Live work title.
- Fit title.
- CTA title if present.

CSS selectors:

```css
.home-4b .opening-argument-headline,
.home-4b .problem-clarifier-title,
.home-4b .commercial-sprint-title,
.home-4b .working-promise-title,
.home-4b .proof-section-title,
.home-4b .fit-section-title,
.home-4b .home-cta-title
```

Rules:
- Sentence case, not all caps.
- Same size across sections.
- Same weight across sections.
- No negative letter spacing.

### Lead / Proof Statement

Use for:
- Opening setup line.
- Key stat/emphasis line.
- Gap close/takeaway line.

CSS selectors:

```css
.home-4b .opening-outcome-setup,
.home-4b .problem-stat strong,
.home-4b .problem-strong
```

Rules:
- This is the hierarchy step below section title.
- Use for the point that should slow the reader down.
- Do not use for ordinary body copy.

### Body

Use for:
- Main explanatory paragraphs.
- Deliverables.
- Working promise paragraphs.
- Fit copy.
- FAQ answers.

CSS selectors:

```css
.home-4b .problem-stat,
.home-4b .commercial-deliverable-row p,
.home-4b .working-promise-copy p,
.home-4b .proof-row-copy,
.home-4b .fit-card-copy,
.home-4b .faq-row p
```

Rules:
- Default reading copy is `400`.
- Use `--sb-body` for secondary explanatory copy.
- Use `--sb-ink` when the copy is short, direct and part of a list/row.

### Row Title

Use for:
- Opening outcome stack.
- Value map row titles.
- Proof item titles.
- FAQ questions.

CSS selectors:

```css
.home-4b .opening-argument-qualifier,
.home-4b .opening-outcome-stack p,
.home-4b .value-map-row h3,
.home-4b .proof-row-title h3,
.home-4b .faq-row h3
```

Rules:
- Keep row titles compact.
- Do not promote row titles to section title size.
- Use colour, position and motion for emphasis before changing size.

---

## Hero Exception

The hero wordmark is a deliberate exception, not part of the standard section scale.

Use only for:
- `STUDIO`
- `BAGGIO.AI`
- The dot in `BAGGIO.AI` may use `--sb-accent-blue`.

Hero promise beneath the wordmark is now locked to three lines:

```txt
AI ENABLED GROWTH SYSTEMS FOR TRUST BASED BUSINESSES
WE ENABLE EXPERT-LED FIRMS COMPETING IN HIGH VALUE MARKETS TO
BUILD TRUST, CAPTURE DEMAND & FOLLOW UP SMARTER
```

Hero promise role:

| Role | CSS Token | Desktop Size | Mobile Size | Line Height | Weight | Tracking | Case | Colour |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero Promise | `--hero-promise-size` | `clamp(16px, 1.28vw, 23.2px)` | `12.8px` | `1.18` desktop / `1.25` mobile | `700` | `0` | Uppercase | `--hero-promise-muted`; final line `--hero-promise-ink` |

Do not let this text wrap organically on desktop. It should be three deliberate lines.

The hero promise is allowed to be larger than labels because it functions as the hero's supporting proposition, not as metadata.

Accent rule:
- Use the blue dot as a restrained brand signal.
- Do not turn whole lines of copy blue.
- Do not use blue for ordinary emphasis, body text, section titles or decorative rules.

---

## Hairlines And Section Rules

Light sections:

```css
border-top: 1px solid var(--sb-rule);
```

Dark sections:

```css
border-top-color: var(--sb-dark-rule);
```

Internal rules:

```css
.home-4b .section-rule {
  height: 1px;
  background: var(--sb-rule);
}
```

Rules:
- Use one-pixel hairlines.
- Do not use thick dividers.
- Do not use decorative borders unless they clarify hierarchy.

---

## Usage Rules

1. Pick the text role first, then use its token.
2. Do not make a one-off font size to solve hierarchy.
3. Do not change weight to compensate for weak layout.
4. Labels are uppercase; section titles are sentence case.
5. Letter spacing is `0` except for labels.
6. Use `400` and `700` only.
7. Use neutral colour tokens only.
8. If a section feels flat, adjust spacing, framing, order or motion before inventing a new type style.
9. If a new role is genuinely needed, add it to this document and the CSS token block together.

---

## Next Site-Wide Step

When the homepage is approved, migrate the rest of the site to this same role system:

- `AI Advantage`
- `Work`
- `Business Tracker`
- `Calm Authority`
- `About`
- `Contact`
- `Privacy`

The goal is one Studio Baggio editorial system, not a separate typography system per page.
