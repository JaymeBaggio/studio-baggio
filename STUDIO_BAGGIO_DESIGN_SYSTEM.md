# Studio Baggio Design System
*Locked from the approved homepage on 27 May 2026.*

This is the design source of truth for the Studio Baggio website. The current homepage is the reference implementation. Preserve its editorial, quiet, monochrome system before adding new sections, pages, components or motion.

Primary implementation files:

- `src/app/globals.css` — tokens, layout rules, component styling
- `src/app/page.tsx` — homepage section structure
- `src/components/site-header.tsx` — global header
- `src/components/site-footer.tsx` — global footer
- `src/components/value-map.tsx` — What We Build accordion
- `src/components/proof-tiles.tsx` — Live Work accordion
- `src/components/faq-accordion.tsx` — FAQ accordion
- `src/components/page-reveals.tsx` — homepage motion controller
- `src/content/site.ts` and `src/content/work.ts` — editable copy and product data

## Design Direction

Studio Baggio is quiet, editorial, Swiss-informed and commercially serious. The interface should feel like an expert strategy document made interactive, not like a SaaS landing page.

Use:

- White and true-neutral surfaces
- Thin ruled rows and section dividers
- Large but regular-weight typography
- Tight uppercase labels
- Long-form copy with controlled line length
- Sparse blue only for deliberate emphasis and active states
- Natural-height editorial sections where possible

Avoid:

- Decorative gradients, blobs, bento cards, glassmorphism, heavy shadows or rounded SaaS cards
- Purple, beige, cream, blue-grey or colour-cast greys
- Bold-heavy headings
- Dense panels inside panels
- Adding new colours or type roles without a repeated system need

## Font

Font family: Aileron, loaded locally via `next/font/local`.

Available files:

- `Aileron-Regular.woff2` — weight `400`
- `Aileron-Bold.woff2` — weight `700`
- `Aileron-Italic.woff2` — weight `400 italic`

Rules:

- Use `400` for most headings, labels, rows and body copy.
- Use `700` only for CTAs and deliberate inline emphasis.
- Do not use synthetic `300`, `500` or `600`.
- Do not use negative letter spacing.

## Colour Tokens

Global base:

```css
--background: #f7f7f7;
--foreground: #141414;
--muted: #747474;
--hairline: #d9d9d9;
--focus: #141414;
--sb-accent-blue: #2563eb;
```

Homepage system:

```css
--sb-ink: #111111;
--sb-paper: #ffffff;
--sb-soft: #f4f4f4;
--sb-dark: #101010;
--sb-rule: #d8d8d8;
--sb-dark-rule: #303030;
--sb-muted: #8a8a8a;
--sb-faint: #c8c8c4;
--sb-blue: var(--sb-accent-blue);
--sb-dark-muted: #b8b8b8;
--sb-body: #4f4f4f;
--sb-dark-body: #d4d4d4;
--sb-source: #b0b0b0;
--sb-outcome-muted: #9a9a9a;
```

Use blue only for:

- Hero emphasis lines
- Active accordion chevrons/icons
- Live Work text links
- CTA hover states

## Type Scale

Global hero roles:

| Role | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| Hero meta | `13px` | `1.75` | `0.1em` | `400` |
| Hero promise | `clamp(0.88rem, 0.92vw, 1rem)` | `1.8` | `0.08em` | `400` |
| Hero promise emphasis | same as promise | `1.8` | `0.08em` | `700` |
| Hero wordmark mobile/base | `clamp(2.1rem, 10vw, 3.1rem)` | `0.84` | `0` | inherited regular |
| Hero wordmark desktop | `clamp(5.2rem, 10.4vw, 12.6rem)` | `0.86` | `0` | inherited regular |

Homepage system tokens:

| Token | Desktop value | Mobile override |
| --- | --- | --- |
| `--sb-label-size` | `12px` | unchanged, FAQ question `11px` |
| `--sb-label-line` | `16px` | unchanged |
| `--sb-label-tracking` | `0.26em` | unchanged |
| `--sb-label-weight` | `400` | unchanged |
| `--sb-title-size` | `clamp(34px, 3.35vw, 52px)` | `clamp(27px, 7.2vw, 34px)` |
| `--sb-title-line` | `1.04` | unchanged |
| `--sb-title-weight` | `400` | unchanged |
| `--sb-lead-size` | `clamp(26px, 2.65vw, 40px)` | `clamp(22px, 6.2vw, 28px)` |
| `--sb-lead-line` | `1.14` | unchanged |
| `--sb-body-size` | `16px` | `14px` |
| `--sb-body-line` | `1.46` | `1.4` |
| `--sb-row-size` | `20px` | `15px` |
| `--sb-row-line` | `1.35` | unchanged |
| `--sb-row-weight` | `400` | unchanged |
| `--sb-small-size` | `15px` | `13px` |
| `--sb-small-line` | `1.45` | `1.38` |
| `--sb-strong-weight` | `700` | unchanged |
| `--sb-cta-weight` | `700` | unchanged |

Special homepage roles:

| Token | Desktop value | Mobile override |
| --- | --- | --- |
| `--sb-service-heading-size` | `clamp(16px, 1.05vw, 18px)` | unchanged |
| `--sb-offer-title-size` | `clamp(36px, 3.25vw, 58px)` | unchanged |
| `--sb-deliverable-size` | `clamp(15px, 1vw, 18px)` | unchanged |
| `--sb-promise-negative-size` | `clamp(30px, 3vw, 50px)` | unchanged |
| `--sb-opening-title-size` | `clamp(38px, 3.75vw, 58px)` | `clamp(30px, 8.4vw, 40px)` |
| `--sb-opening-qualifier-size` | `clamp(15px, 1.15vw, 20px)` | `clamp(13px, 3.9vw, 16px)` |
| `--sb-opening-setup-size` | `clamp(26px, 2.45vw, 40px)` | `clamp(24px, 7.2vw, 32px)` |
| `--sb-opening-outcome-size` | `clamp(20px, 1.7vw, 28px)` | `clamp(18px, 5.4vw, 24px)` |
| `--sb-opening-outcome-emphasis-size` | `clamp(28px, 2.6vw, 44px)` | `clamp(24px, 7.2vw, 32px)` |
| `--sb-stat-size` | `clamp(64px, 5.4vw, 86px)` | `clamp(42px, 13vw, 58px)` |
| `--sb-stat-caption-size` | `clamp(15px, 1.05vw, 17px)` | `13px` |
| `--sb-stat-source-size` | `12px` | `10px` |
| `--sb-gap-close-size` | `clamp(19px, 1.35vw, 24px)` | `15px` |
| `--sb-value-summary-size` | `clamp(13px, 0.86vw, 15px)` | unchanged |

## Layout Tokens

```css
--sb-page-x: clamp(24px, 5.6vw, 80px);
--sb-frame: 1280px;
--sb-reading: 940px;
--sb-wide: 1120px;
--sb-section-y: clamp(74px, 9vh, 104px);
```

Mobile `<=1023px`:

```css
--sb-page-x: 24px;
--sb-section-y: 30px;
```

Frame rules:

- Standard homepage frame: `width: min(calc(100% - (var(--sb-page-x) * 2)), var(--sb-frame))`
- Wide ruled lists: `width: min(100%, var(--sb-wide))`
- Reading copy: max `var(--sb-reading)`
- Body copy line length should stay below roughly 65-75 characters on desktop.

## Section Rhythm

Default `.home-4b .home-section`:

- `min-height: 100svh`
- `padding-block: calc(4rem + var(--sb-section-y)) var(--sb-section-y)`
- `border-top: 1px solid var(--sb-rule)`

Natural-height editorial sections:

- `What We Build`
- `AI Opportunity Audit`
- `Working Promise`
- `Live Work`
- `Who This Is For`
- `FAQ`

These use:

```css
padding-block: clamp(72px, 7vw, 108px);
min-height: auto;
```

Value Map is intentionally tighter:

```css
padding-block: clamp(44px, 4vw, 68px) clamp(58px, 5vw, 82px);
```

## Fit-In-Frame Rule

This is a hard homepage rule. Each major section must read as a complete frame, not as a cropped fragment.

Must fit in one desktop/laptop viewport:

- Hero
- Opening argument
- The Gap
- What We Build closed state and normal open row state
- Live Work closed state and normal open row state
- AI Opportunity Audit
- Working Promise
- Who This Is For
- FAQ opening view
- Final CTA and footer handoff

Rules:

- Treat the visible browser viewport minus the fixed header as the frame.
- For pinned or scroll-driven sections, the sticky frame must fit inside `calc(100svh - 4rem)`. The scroll container may be taller, but the active pinned composition cannot rely on cut-off copy above or below the fold.
- Do not let a section headline, stat row, close paragraph, CTA, or first meaningful row sit under the fixed header or below the viewport edge.
- If copy grows, first reduce vertical dead space, tighten gaps, or use existing responsive type tokens. Do not simply increase section height.
- Pinned sections should use `top: 4rem` so the fixed header does not cover the section.
- Check at desktop/laptop viewports before sign-off: `1920x1080`, `1440x900`, and the visible in-app browser frame Jayme is using.
- Mobile can naturally scroll for long content, but it still needs proper side padding and no clipped headings, rows, or CTAs.

## Component System

### Header

- Fixed top header.
- Desktop height is `min-h-16`.
- Transparent at homepage top.
- Paper blur state after scroll.
- Dark state only over sections marked `data-header-theme="dark"`.
- Desktop nav: uppercase `text-xs`, tracking `0.07em`, muted until hover.
- Mobile menu uses full-width ruled links and Framer Motion open/close.
- Mobile menu links stay in the same restrained nav language as desktop: small uppercase text, tight tracking, ruled rows. Do not use oversized mixed-case page-title links.

### Buttons / CTAs

Base CTA:

- Inline-flex
- Minimum height `44px`, large homepage CTA `56px`
- Border-based, square corners
- Uppercase text
- ArrowUpRight icon from Lucide
- Tap scale `0.985`

Homepage final CTA:

- Dark band `#101010`
- White bordered button
- Hover flips to white surface with black text

### Ruled Accordions

Use this pattern for `What We Build`, `Live Work` and FAQ:

- Parent list has a top hairline.
- Each row has a bottom hairline.
- Row button is full width.
- Row numbers are small, faint, fixed-width.
- Open row background uses `--sb-soft`.
- Active chevron/icon uses `--sb-accent-blue`.
- Animation uses height/opacity only, with `ScrollTrigger.refresh()` after open/close where needed.

### What We Build

Row button:

- Grid: `46px minmax(0, 1fr) 24px`
- Column gap: `clamp(18px, 3vw, 32px)`
- Minimum height: `74px`
- Padding block: `clamp(17px, 1.65vw, 22px)`

Service heading:

- Uppercase
- `--sb-service-heading-size`
- `0.06em` tracking
- Weight `400`

Detail panel:

- Copy starts in column 2.
- Includes list uses dash markers and `13px / 1.38`.
- Goal text stays regular weight; do not over-bold.

### Live Work / Products

Rows:

- List width: `var(--sb-wide)`
- Button grid: `46px minmax(0, 1fr) 24px`
- Padding block: `clamp(22px, 2.4vw, 30px)`
- Product title: uppercase, `--sb-row-size`, weight `400`, tracking `0.06em`
- Summary: `--sb-small-size`, `--sb-small-line`, `--sb-body`

Open panel:

- Grid with copy left, media right.
- Panel padding: `0 clamp(24px, 4vw, 64px) clamp(30px, 3.6vw, 42px) 84px`
- Media column: `minmax(240px, 360px)`

Media treatment:

- Desktop max width: `360px`
- Mobile max width: `360px`, stacked under copy
- Outer frame padding: `8px`
- Border: `1px solid rgba(216, 216, 216, 0.88)`
- Background: `rgba(255, 255, 255, 0.72)`
- Shadow: `0 1px 0 rgba(17, 17, 17, 0.03)`
- Inner image aspect ratio: `16 / 9`
- Image fit: `object-fit: cover`
- Product images preload and decode on component mount.
- Keep the media frame hidden until its image is ready, then fade it in; this prevents a blank image box from flashing when an accordion row opens.

### AI Opportunity Audit

Title:

- `--sb-offer-title-size`
- Line height `1.06`
- Weight `400`
- Max width `900px`

Deliverables:

- Width `var(--sb-wide)`
- Top and row hairlines
- Grid: `48px minmax(0, 1fr)`
- Row padding: `clamp(16px, 1.65vw, 22px)`
- Body size: `--sb-deliverable-size`
- Use `strong` only for the leading phrase in each deliverable.

### Working Promise

Current locked layout:

- Eyebrow above.
- Two-column body grid below.
- Left column: body copy.
- Right column: strikethrough negative lines.

Grid:

```css
grid-template-columns: minmax(0, 0.88fr) minmax(420px, 1fr);
gap: clamp(64px, 8vw, 128px);
```

Body copy:

- Width max `700px`
- Gap `28px`
- Size `clamp(17px, 1.2vw, 20px)`
- Line height `1.75`

Negative lines:

- Width max `760px`
- Size `--sb-promise-negative-size`
- Line height `1.25`
- Weight `400`
- Color `#cccccc`
- Strikethrough thickness `0.08em`

### Who This Is For

- Title uses `--sb-offer-title-size`, line height `1.06`, weight `400`.
- Two columns on desktop.
- List grid gap: `clamp(56px, 7vw, 100px)`.
- Top ruled line and row hairlines.
- Labels use `--sb-label-*`.
- Rows use dash marker plus `--sb-small-size`.

### FAQ

- Width `var(--sb-wide)`.
- First row open by default.
- Single-open accordion.
- Questions are uppercase label text:
  - `--sb-label-size`
  - line `--sb-label-line`
  - tracking `0.18em`
  - weight `400`
- Question button minimum height: `80px` desktop, `64px` mobile.
- Toggle icon grey when closed, blue when open.
- Answer copy: `--sb-small-size`, `--sb-small-line`, `--sb-body`, max `620px`.

### Footer

- CTA band is compact, dark and not full screen.
- White info footer below uses neutral grid lines and restrained text.
- Keep the CTA/footer handoff compact; do not return to a huge black empty block.

## Motion System

Detailed motion reference:

- `MOTION_AGENT_HANDOVER_2026-05-27.md`

Ownership:

- GSAP + ScrollTrigger owns scroll storytelling and section reveals.
- Lenis owns page-level smooth vertical scrolling.
- Framer Motion owns component micro-interactions, taps and accordion open/close.
- CSS keyframes own the simple first-load hero/header entrance.
- Do not use Framer Motion for scroll-driven pinned/cinematic sections.
- Do not use GSAP for simple button/accordion microstates.

Core motion feel:

- Calm editorial reveal, not flashy.
- Reading order first, polish second.
- Each major section should catch lightly, breathe, reveal, hold and release.
- Movement should be visible enough to feel deliberate, but never theatrical.
- Easing: `[0.23, 1, 0.32, 1]` for UI transitions.
- Hero meta enter: `780ms`.
- Hero wordmark enter: `900ms`.
- Hero promise enter: `820ms`.
- Accordion height: about `0.36s`.
- Accordion opacity: about `0.2s`.
- Tap scale: `0.985` or `0.97` for menu button.

Homepage scroll architecture:

- `SmoothScroll` uses Lenis with `duration: 1.05`, `wheelMultiplier: 0.78`, `syncTouch: false`, and calls `ScrollTrigger.update()` on Lenis scroll.
- The homepage uses CSS native sticky stages for the two major story sections, not GSAP `pin: true`.
- `opening-argument-section` provides about `226svh` of scroll distance.
- `problem-clarifier-section` provides about `214svh` of scroll distance.
- Their inner frames are `position: sticky; top: 0; min-height: 100svh`.
- GSAP only animates child transforms and opacity inside those sticky stages.

Homepage reveal controller:

- `PageReveals` waits for `document.fonts.ready` before line splitting.
- Major headings with `data-split` are split into lines for controlled editorial reveals.
- Sections are identified with `data-home-section` and `data-motion-section`.
- Standard one-time section reveals start at about `top 76%` desktop and `top 84%` mobile.
- Opening story starts at about `top 12%` desktop / `top 10%` mobile.
- Gap story starts at about `top 64%` desktop / `top 70%` mobile.
- Use section-specific timing branches instead of one generic reveal for every section.

Component motion rules:

- Accordions use Framer Motion height/opacity only.
- Accordions call `ScrollTrigger.refresh()` after open/close so scroll measurements stay correct.
- Live Work images preload/decode and the media frame stays hidden until ready.
- Button/menu tap states use small scale only: `0.985` for CTAs, `0.97` for the mobile menu.

Avoid:

- GSAP `pin: true` as the default for Studio Baggio pages.
- masked/blinds wordmark animation.
- bounce, overshoot, scale-from-zero or letter-by-letter tricks.
- invisible micro-motion such as 2px movement or barely changed opacity.
- animating layout properties during scroll.
- mounting large media on click without preloading or hiding until ready.
- copying the homepage's long sticky stages onto product pages by default.

Reduced motion:

- Respect `prefers-reduced-motion`.
- Disable Lenis.
- No sticky/pinned storytelling for reduced motion.
- Reveal content should be immediately visible.
- Keep all content readable without animation.
- Gap stat numbers should show final values immediately.

## Responsive Rules

Mobile breakpoint: `max-width: 1023px`.

Mobile rules:

- Page side padding stays `24px`.
- Typography scales down through tokens, not viewport-only ad hoc sizing.
- What We Build, Live Work, Working Promise, Fit and FAQ stack to one column.
- Product media stays under copy, max `360px`, never wider than container.
- FAQ buttons reduce to `64px` minimum.
- Touch targets should remain at least `44px`.
- No horizontal overflow at `390px` or `320px` widths.

## Accessibility Rules

- Preserve visible focus rings: `2px solid var(--focus)`, `outline-offset: 4px`.
- Use semantic buttons for accordions.
- Keep `aria-expanded` and `aria-controls` on accordion triggers.
- Decorative images may use empty alt text only when adjacent text already labels the product.
- Do not rely on blue alone to convey meaning; active states also use chevron rotation or icon change.
- Body text must keep enough contrast against white/soft surfaces.

## Implementation Guardrails

When adding or editing pages:

1. Start from `.home-4b` tokens and existing `studio-page` extension.
2. Use `src/content/site.ts` and `src/content/work.ts` for editable copy/data.
3. Prefer ruled rows, editorial grids and constrained reading widths over cards.
4. Reuse existing components before adding new ones.
5. Add a token only when the value will be reused.
6. Do not add new colour accents.
7. Do not introduce new font weights unless the local font files are actually added.
8. After any visual change, check desktop and mobile in full-page context.

Verification for design-system changes:

```bash
npm run typecheck
npm run lint
npm run build
```

For local visual QA, use the current preview at `http://localhost:3006/`.
