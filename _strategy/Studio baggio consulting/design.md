# Studio Baggio Website Design Brief
*Created: 24 May 2026*
*Source copy: `Studio_Baggio_Landing_Page_Script_v9_AI_Commercial_Advantage.md`*

## Design Direction

The site should feel like a premium AI commercial strategy and systems studio.

Not a SaaS landing page.
Not a generic AI consultant site.
Not a content marketing agency.

The desired feeling is:

- typographic
- exact
- quiet
- intelligent
- editorial
- smooth
- premium
- commercially serious

The visual reference is closest to Obys-style modernist editorial motion: large type, strict grid, controlled negative space, cinematic scroll rhythm and high-quality text animation.

Primary reference:

- [AIM - AI Modernism of Kharkiv by Obys](https://aim.obys.agency/) for sparse AI/modernist editorial treatment, huge typography, minimal navigation and scroll-to-explore pacing.
- [Obys Agency reference write-up](https://www.refs.gallery/projects/obys-agency) for the broader principle: typography as the experience, strict grid, kinetic poster feel, restrained palette and performance discipline.
- [Inkwell on Awwwards](https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html) for the way a complex AI proposition can be introduced through a scroll-driven narrative without dumping all detail upfront.
- [Made With GSAP on Awwwards](https://www.awwwards.com/sites/made-with-gsap) for title animation, scroll sections and interaction-led motion references.

## Paper Reference

The Paper mockup is a visual reference, especially for the hero composition.

Paper file:

> `Jubilant island`

Artboard:

> `Studio Baggio v8 Landing Page`

Use it for:

- Aileron-led typographic feel
- sparse white hero
- top-left metadata
- large `STUDIO BAGGIO.AI` wordmark
- bottom-right positioning copy
- editorial section spacing
- black/white contrast bands

Do not treat the Paper mockup as final copy. The current copy source is v9.

## Research Learnings Applied

These are the practical design learnings to carry into the build:

- Typography should be the interface, not decoration. The big type, line breaks, labels and scroll rhythm should do most of the brand work.
- Scroll animation should clarify the commercial story. Each scroll beat should help the user understand the offer more clearly.
- GSAP should own the cinematic parts: hero timeline, pinned scroll sections, SplitText reveals and scrollytelling.
- Framer Motion should own component polish: hover/tap, active states, mobile menus, accordions, form success states and proof selection.
- Text animation should favour masked line reveals, word staggers and controlled scroll reveals. Avoid typewriter, glitch, particle and gimmick effects.
- Pinned sections should be used sparingly for the highest-value moments: hero transition, AI gap, offer mechanism and outcome manifesto.
- Proof/work should not be a generic portfolio grid. Use a selected-work index, animated preview pane or editorial case-study rail.
- Forms should use reliable accessible primitives rather than custom novelty: shadcn/ui, React Hook Form, Zod and clear field-level feedback.
- Smoothness is not the same as slow. The site should feel responsive, not trapped inside animations.
- Reduced-motion mode must preserve the same content and hierarchy with simpler transitions.

## Core Message

The page should visually support the v9 positioning:

> Turn AI into a commercial advantage.

The design should make that feel inevitable. The user should feel the site itself demonstrates the offer: clarity, intelligence, system, motion, precision.

## Typography

### Primary Font

Use **Aileron** across the site.

Do not introduce a second expressive display font unless there is a very strong reason. The point is controlled elegance, not typography chaos.

### Type Personality

Aileron should be used in a modernist way:

- huge wordmark typography
- tight editorial labels
- strong uppercase section headings
- large single-line statements
- restrained body copy
- generous line-height on prose
- sharp contrast between oversized display type and small navigational metadata

### Type Scale

Suggested desktop scale:

- Hero wordmark: clamp(88px, 13vw, 230px)
- Main conversion headline: clamp(56px, 8vw, 140px)
- Section H2: clamp(40px, 5.8vw, 96px)
- Editorial subheads: 24-36px
- Body: 17-20px
- Metadata / nav / labels: 11-13px uppercase

Suggested mobile scale:

- Hero wordmark: clamp(52px, 18vw, 92px)
- Main conversion headline: clamp(42px, 13vw, 72px)
- Section H2: 34-52px
- Body: 16-18px
- Metadata: 11-12px

### Text Rules

- Letter spacing should be `0` by default. Do not use negative tracking.
- Uppercase labels can use slight positive tracking: `0.04em` to `0.08em`.
- Body line length should stay around 55-75 characters.
- Avoid centered body copy except for very short isolated statements.
- Use hard line breaks deliberately in hero and major statements.

## Colour System

Keep the palette strictly monochrome with one approved blue accent.

Hard rule:

- Use black, white and true neutral greys as the base system.
- The only approved colour accent is Studio Baggio blue: `#2563EB`.
- Do not use pink, purple, violet, lavender, purple-tinted grey, blue-grey or any colour-cast grey.
- Do not introduce any additional coloured accents without explicit approval from Jayme.
- If a grey looks even slightly pink, purple, blue or beige on screen, replace it with an actual neutral grey.

Base:

- White: `#FFFFFF`
- Near-white: `#F5F5F3`
- Ink: `#141414`
- Black band: `#111111`
- Mid grey: `#777773`
- Hairline grey: `#D8D8D4`

Accent:

- Studio Baggio blue: `#2563EB`
- CSS token: `--sb-accent-blue: #2563EB`
- Alias token: `--sb-blue: var(--sb-accent-blue)`
- Use sparingly for blue dots, active links, selected stats, key emphasis, article accents and primary directional cues.
- Do not use the blue as a large background wash, gradient base, decorative blob, or SaaS-style brand wash.
- Use contrast, typography, rules, active states and black/white inversion first; use blue only when it adds orientation or emphasis.

Avoid:

- purple-blue gradient AI SaaS look
- pink/purple/violet/lavender accents
- purple-grey or blue-grey surfaces
- beige-heavy lifestyle look
- decorative blobs/orbs
- glassmorphism as a primary visual system
- card-heavy SaaS bento layout

## Layout System

The layout should be full-width editorial sections, not nested cards.

Use:

- 12-column grid on desktop
- strong left/right asymmetry
- oversized typography offset against small metadata
- full-viewport hero and several near-full-viewport narrative panels
- section transitions through scroll, not through decorative dividers
- hairline rules instead of heavy borders

Desktop max content width:

- Main constrained content: 1440-1680px
- Wide typographic moments: full viewport

Mobile:

- Keep the same editorial character.
- Stack sections, but preserve large type and strong vertical rhythm.
- Avoid cramming multi-column data into mobile. Turn grids into stacked editorial blocks.

## Homepage Sections

Use the v9 copy and section order.

### 1. Hero

Visual job:

Make the site feel immediately premium and different.

Content:

- Top-left metadata:
  - Practical AI systems built around how your business wins in market.
  - Create visibility, intelligence, leads and commercial advantage.
  - Not AI theory. Not generic automation.
- Massive wordmark:
  - STUDIO
  - BAGGIO.AI
- Bottom-right promise:
  - AI commercial advantage systems for expert-led businesses.
  - We help serious businesses work out where AI can create value, then build the systems that make it useful.

Design notes:

- Keep the visual composition close to the Paper direction.
- Large empty space is part of the design.
- Navigation should be minimal and almost editorial.
- CTA should be restrained: `Discuss your AI opportunity`.

Motion:

- GSAP owns the hero.
- On load, the wordmark should resolve through line/word masking, not a basic fade.
- Top-left copy should enter as staggered lines after the wordmark has settled.
- Bottom-right promise should appear last, like a precise caption.
- On first scroll, the hero should pin briefly and transition into the main conversion headline.

### 2. The AI Gap

Visual job:

State the page's clearest commercial idea.

Content:

> Turn AI into a commercial advantage.

> Most businesses know they should be using AI. Far fewer know where it can create real value.

Motion:

- Scroll-triggered SplitText line reveal.
- The headline should feel like it is being uncovered by the scroll.
- Body copy can use a subtle delayed reveal, not a flashy entrance.

### 3. The Expensive Problem

Visual job:

Make the cost of vague AI adoption feel obvious.

Design:

- Use a two-part layout:
  - left: strong statement
  - right: concise explanation
- Support lines can be set like editorial pull-quotes.

Motion:

- Use pinned text replacement or masked line transitions.
- Do not animate every paragraph. Animate the core contrast:
  - `using more AI`
  - `knowing where AI creates value`

### 4. What Studio Baggio Does

Visual job:

Explain the offer cleanly.

Design:

- Use a simple scrollytelling sequence:
  - Find the opportunity
  - Choose the highest-value use cases
  - Build the system
  - Prove the value
  - Improve the advantage

Motion:

- GSAP ScrollTrigger pin.
- As the user scrolls, each step becomes active while the previous step moves into a quiet trail state.
- Use transform and opacity only.

### 5. Where AI Creates Commercial Value

Visual job:

Turn breadth into a simple map.

Areas:

- Findability
- Market Intelligence
- Lead Quality
- Authority
- Workflow Acceleration

Design:

- Avoid a generic five-card grid.
- Better: large vertical index on the left, detail panel on the right.
- Active index item should expand or shift with Framer Motion.
- The section can be dark if it needs more contrast.

Motion:

- GSAP for scroll progression.
- Framer Motion for active-state transitions inside the component.

### 6. Commercial AI Sprint

Visual job:

Make the first step feel concrete and buyable.

Design:

- Use an editorial offer block, not a pricing card.
- Split:
  - left: "Start by finding the highest-value AI opportunities in the business."
  - right: deliverables list
- CTA: `Discuss your AI opportunity`.

Motion:

- Deliverables can reveal in a controlled stagger.
- The CTA should have a subtle magnetic or underline interaction.

### 7. What The System Includes

Visual job:

Show capability without dumping a menu.

Blocks:

- SEO And AI Search
- Market And Prospect Intelligence
- Lead Capture And Qualification
- Authority And Proof
- Workflow And Client Experience

Design:

- Use editorial rows or split panels, not cards inside cards.
- Each row should have:
  - small number
  - capability title
  - one-line promise
  - examples / outputs

Motion:

- Rows reveal through horizontal mask or slight y movement.
- Hover can reveal examples or shift the number marker.

### 8. What Changes For The Business

Visual job:

Sell the outcome.

Content rhythm:

- Better visibility.
- Better information.
- Better conversations.
- Faster action.

Design:

- This should feel like a confident manifesto section.
- Consider one huge line per viewport beat.

Motion:

- Pin section.
- Each outcome phrase replaces the previous one as the user scrolls.
- Keep it smooth and deliberate, not hyperactive.

### 9. Built From Live Work

Visual job:

Show proof without breaking the premium feel.

Proof areas:

- Calm Authority
- Hanbury / Growth Intelligence
- Rough Cut
- Business Tracker

Design:

- Use a selected-work index rather than a normal portfolio grid.
- Each item should show:
  - project name
  - commercial problem
  - system built / asset created
  - evidence screenshot or diagram
  - one-line takeaway

Recommended display pattern:

- Desktop: left index, right large preview pane.
- Mobile: stacked case-study panels.

Component inspiration:

- React Bits `Chroma Grid`, `Carousel`, `Circular Gallery` or `Card Swap` can inspire the work display, but restyle to match the sober editorial system.
- Do not use bright demo styling from component libraries unchanged.

### 10. Who It Is For

Visual job:

Qualify the right buyer.

Design:

- Split layout:
  - Good fit
  - Not a fit
- Keep it sharp and useful.

Motion:

- Framer Motion for subtle row reveal and hover/tap states.

### 11. CTA / Contact

Visual job:

Make the next step feel low-friction but serious.

CTA:

> Discuss your AI opportunity

Form fields:

- Name
- Email
- Business / firm
- Website
- What are you trying to improve?
- Where do you think AI could help?

Design:

- No generic contact card.
- Use a clean editorial form with visible labels.
- Make the form feel like a strategic intake, not a newsletter signup.

Recommended component base:

- Use shadcn/ui `Field`, `Input`, `Textarea`, `Select`, `Button`, `Sonner` with React Hook Form and Zod validation.
- shadcn's current form guidance uses React Hook Form, Zod, accessible `Field` components, field descriptions and field-level errors.
- Aceternity contact sections can inspire contact layout and success states, but do not use their visual style directly.

## Animation System

## GSAP Owns

Use GSAP for anything scroll-driven, cinematic or timeline-based.

GSAP should handle:

- hero load timeline
- hero pin and transition
- SplitText line/word reveals
- pinned scrollytelling
- scroll-scrubbed section transitions
- value-area progression
- work-preview transitions if tied to scroll

Use:

- GSAP
- ScrollTrigger
- SplitText
- `@gsap/react` / `useGSAP`
- Lenis only if smooth scroll is required and tested properly

Important:

- Do not use Framer Motion for pinned scroll storytelling.
- Do not mix locked-slide pagination with Lenis + scrub.
- This site is free-scroll, not locked slide navigation.
- If using Lenis, pair it cleanly with ScrollTrigger and test on trackpad, mouse wheel and mobile touch.

## Framer Motion Owns

Use Framer Motion for component-level interaction.

Framer Motion should handle:

- nav open/close
- CTA hover/tap states
- active tabs / selected index movement
- form success state
- proof item hover states
- mobile accordions
- small layout transitions
- button micro-interactions

Do not use Framer Motion for heavy scroll scenes.

## Text Animation

Use GSAP SplitText for hero and major scroll-reveal text.

Implementation rules:

- Wait for fonts before splitting text.
- Use `SplitText.create()` with `type: "lines, words"` for major statements.
- Use `mask: "lines"` for clean reveal effects.
- Use `autoSplit: true` where line wrapping can change responsively.
- Keep SplitText accessibility enabled; it adds screen-reader-friendly labelling.
- Revert SplitText on cleanup.
- Do not split long body-copy sections into characters.

Reference:

- [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/) for masked line reveals, staggered words, accessibility and responsive re-splitting.

Recommended motion language:

- masked line reveal
- subtle vertical lift
- small opacity change
- slight scale only on interactive elements
- smooth inertia on scroll sections
- controlled stagger

Avoid:

- glitch effects
- typewriter effects in the hero
- particle text
- scramble text as a primary voice
- animations that make the copy harder to read

## Smoothness And Interaction

The site should feel satisfying to use because the motion responds to scroll and interaction with weight.

Use:

- `expo.out` and `power3.out` for major reveals
- spring-like Framer transitions for interactive components
- 30-80ms staggers for line groups
- 500-900ms hero reveal timings
- 150-300ms hover/tap interactions

Do not:

- block scroll with long intro animations
- hide the browser scrollbar
- hijack wheel events
- make users wait before they can read the page
- animate layout properties like width, height, top or left when transform can do it

## Component Strategy

Use production primitives for reliable parts, then design the bespoke typographic experience around them.

### Forms

Use:

- shadcn/ui Field, Input, Textarea, Select, Button
- React Hook Form
- Zod
- Sonner for success/error toast

Reasons:

- accessible labels
- proper field-level errors
- type-safe validation
- easy styling
- reliable mobile behaviour

Source:

- [shadcn/ui React Hook Form guide](https://ui.shadcn.com/docs/forms/react-hook-form)

### Text And Micro-Animation Components

Useful references:

- [Motion Primitives Text Effect](https://motion-primitives.com/docs/text-effect) for Framer Motion text effects when GSAP is not needed.
- [React Bits](https://reactbits.dev/) for animated React components, text effects, backgrounds and UI patterns.
- [React Bits Pro](https://pro.reactbits.dev/about) for production-ready hero shaders, scroll reveals, cursors, landing-page blocks and animated UI if using paid components.
- [AnimBits](https://www.animbits.dev/) for Framer Motion-based buttons, cards, text shimmer, scramble and page transitions.

Usage rule:

Use libraries for small, controlled pieces. Do not let a component library decide the site aesthetic.

### Work / Proof Display

Recommended components/patterns:

- selected-work index with animated preview pane
- horizontal case-study rail on desktop, stacked panels on mobile
- sticky proof viewport where project screenshots change as the index changes
- before/after system maps for Hanbury and Business Tracker
- Rough Cut and Calm Authority as proof artefacts, not decorative logos

Possible component bases:

- React Bits `Chroma Grid` or `Carousel` for proof browsing
- shadcn `Tabs`, `Accordion`, `Dialog`, `Sheet` for accessible detail states
- Framer Motion shared-layout transition for active proof preview

Do not use:

- generic logo wall
- generic testimonial cards unless there is real testimonial proof
- fake dashboards
- stock imagery
- screenshots too small to inspect

## Technical Build Notes

Preferred stack:

- Next.js / React
- TypeScript
- Tailwind
- GSAP + ScrollTrigger + SplitText
- Framer Motion
- shadcn/ui
- React Hook Form + Zod
- Lenis only if needed for smooth scroll

Font:

- Load Aileron locally.
- Use `font-display: swap`.
- Preload only the critical weights used above the fold.
- Wait for `document.fonts.ready` before SplitText hero animation.

Performance:

- Animate only transform and opacity where possible.
- Use `will-change` only on elements currently animating.
- Lazy-load heavy proof visuals.
- Reserve dimensions for images and previews.
- Do not run SplitText across large body-copy blocks.
- Pause non-essential animation when not visible.

Accessibility:

- Respect `prefers-reduced-motion`.
- Reduced-motion version should keep the same layout and content, but swap scroll choreography for simple fades.
- Keep headings semantic even when visually split.
- Do not rely on hover-only interactions.
- Keep form labels visible.
- Keep focus states visible.
- Maintain contrast at WCAG AA minimum.

Mobile:

- Disable or simplify pinned scroll scenes where they feel cramped.
- Keep the hero expressive, but reduce pin duration.
- Turn value-area progression into an accordion or stacked sequence.
- Ensure form fields are at least 44px high.

## What Not To Do

- Do not make this look like an AI SaaS template.
- Do not use purple gradients, orbs, bokeh blobs or abstract "AI" decoration.
- Do not use a busy card grid for every section.
- Do not let the page become a list of services.
- Do not over-animate body copy.
- Do not put text inside rounded pills when a clean text label or icon would do.
- Do not use `Map Your AI Advantage` as the CTA.
- Do not lead with `Growth Intelligence` as the homepage promise.
- Do not create fake proof.

## Build Quality Bar

The page should pass these checks before shipping:

- Within 5 seconds, the user understands: Studio Baggio helps businesses turn AI into commercial advantage.
- The hero feels premium without hiding the message.
- The scroll animation is noticeable, smooth and satisfying.
- The motion never fights readability.
- The site feels better because of GSAP, not just busier.
- The form is accessible, validated and low-friction.
- The proof section makes Jayme's live work feel commercially credible.
- Mobile is not a compromised afterthought.

## Source References

- [AIM - AI Modernism of Kharkiv](https://aim.obys.agency/)
- [Obys Agency on Refs.Gallery](https://www.refs.gallery/projects/obys-agency)
- [Inkwell on Awwwards](https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html)
- [Made With GSAP on Awwwards](https://www.awwwards.com/sites/made-with-gsap)
- [GSAP SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- [React Bits](https://reactbits.dev/)
- [React Bits Pro](https://pro.reactbits.dev/about)
- [Motion Primitives Text Effect](https://motion-primitives.com/docs/text-effect)
- [shadcn/ui React Hook Form guide](https://ui.shadcn.com/docs/forms/react-hook-form)
- [Aceternity Contact Sections](https://ui.aceternity.com/contact-section)
- [AnimBits](https://www.animbits.dev/)
