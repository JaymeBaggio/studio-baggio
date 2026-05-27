# Studio Baggio Homepage Motion Handover

Date: 27 May 2026
Status: Locked homepage motion reference
Local preview used by Jayme: `http://localhost:3006/`
Branch: `quiet-luxury-homepage-system`

This document records the approved Studio Baggio homepage motion system and the lessons learned from the earlier motion problems. Future agents should use this as the motion reference before touching homepage animation or adapting the feel to other Studio Baggio pages.

## Role For Future Agents

You are not being asked to "add more animation". You are protecting a quiet editorial motion system.

Only change motion when Jayme asks for motion, interaction, animation, sticky sections, scroll feel, accordions, image loading polish, or page rhythm. Do not change copy, content, layout, typography, routes, product data, metadata, forms, deployment or domain settings unless Jayme explicitly asks.

## Primary Files

- `src/components/page-reveals.tsx` - homepage GSAP reveal and scroll-story controller
- `src/components/smooth-scroll.tsx` - Lenis + ScrollTrigger integration
- `src/app/globals.css` - sticky stages, keyframes, reduced-motion fallback, animated element styling
- `src/app/page.tsx` - homepage section data attributes and reveal markers
- `src/components/site-header.tsx` - Framer Motion header/mobile menu micro-interactions
- `src/components/value-map.tsx` - What We Build accordion motion
- `src/components/proof-tiles.tsx` - Live Work accordion motion and media readiness
- `src/components/faq-accordion.tsx` - FAQ accordion motion
- `src/components/ui/button.tsx` - CTA tap motion
- `STUDIO_BAGGIO_DESIGN_SYSTEM.md` - full visual system reference

## Motion Feel

The Studio Baggio motion feel is:

- quiet
- editorial
- smooth
- precise
- commercially serious
- readable before it is impressive
- gently progressive, not theatrical

Each section should feel like it catches lightly, breathes, reveals in reading order, holds long enough to read, then releases.

## Ownership Rules

Use GSAP + ScrollTrigger for:

- scroll storytelling
- scrubbed section progress
- line reveal sequencing
- count-up timing
- section reveal triggers
- ScrollTrigger measurement refreshes

Use Lenis for:

- page-level smooth vertical scroll
- softening wheel movement without creating a trapped page feel

Use Framer Motion / Motion for React for:

- accordions
- menu open/close
- button tap states
- small component enter/exit states

Use CSS keyframes for:

- first-load hero/header entrance when the motion is static, simple and should not wait for JS.

Do not use Framer Motion for pinned or scrubbed scroll choreography. Do not use GSAP for simple accordion tap states.

## Current Architecture

### Smooth Scroll

`src/components/smooth-scroll.tsx` owns Lenis:

- `duration: 1.05`
- exponential easing
- `wheelMultiplier: 0.78`
- `syncTouch: false`
- disabled completely for `prefers-reduced-motion`
- Lenis scroll events call `ScrollTrigger.update()`
- GSAP ticker drives Lenis
- route changes scroll to top and refresh ScrollTrigger

Do not add a second smooth-scroll system. Do not add ScrollSmoother unless replacing Lenis deliberately and testing the whole homepage.

### Native Sticky Story Sections

The two big narrative moments use CSS native sticky stages, not GSAP `pin: true`:

- `opening-argument-section`
- `problem-clarifier-section`

The outer section creates scroll distance:

- Opening section: about `226svh`
- Gap section: about `214svh`

The inner frame is sticky:

- `position: sticky`
- `top: 0`
- `min-height: 100svh`

GSAP animates only the child content inside the sticky stage. This avoids the hard fixed-position spacer switch that made earlier versions feel like they slammed.

Default rule: do not use GSAP `pin: true` on Studio Baggio pages unless there is a strong reason and the entry/exit has been tested in full-page context.

### PageReveals Controller

`PageReveals`:

- waits for `document.fonts.ready` before splitting lines
- uses `gsap.matchMedia()` for desktop, mobile and reduced motion
- uses one custom ease: `studioEditorialOut`, `M0,0 C0.16,0.82 0.34,1 1,1`
- splits `[data-split]` headings into line wrappers
- prepares hidden elements with `autoAlpha: 0.001`, not fully absent content
- reveals using transform and opacity
- kills timelines/tweens and reverts split text on cleanup

Important starts:

- Standard section reveal: desktop `top 76%`, mobile `top 84%`
- Opening sticky story: desktop `top 12%`, mobile `top 10%`
- Gap story: desktop `top 64%`, mobile `top 70%`

Do not replace the section-specific reveal logic with one generic batch. The generic approach is what made parts of the page feel flat or mistimed.

## Section Rules

### Hero

The hero uses CSS keyframes, not GSAP:

- Meta lines fade/lift in with small stagger.
- Wordmark enters as one whole mark with opacity and `y`, not masked line blinds.
- Promise lines follow after the wordmark.
- Reduced motion shows everything immediately.

Do not reintroduce blinds, heavy masks, scale-from-zero, bounce, letter-by-letter tricks or wordmark choreography.

### Opening Argument

Motion section id: `opening`

This is the first sticky story and sets the model for the site.

Sequence:

1. Main headline line reveal.
2. Qualifier fades/lifts under it.
3. Top message softens to `autoAlpha: 0.3`.
4. Setup line enters.
5. Outcome support lines enter in order.
6. Blue final line lands last.
7. Final state holds before release.

The blue line must land before the section releases. If it appears while the section is already leaving, the timing is wrong.

### Gap / Problem Clarifier

Motion section id: `gap`

This is the evidence story.

Sequence:

1. Eyebrow enters.
2. Title line reveal.
3. Evidence grid enters.
4. Stat cards stagger in.
5. Numbers count once.
6. Closing line enters.
7. Final state holds before release.

Count-up rules:

- Starts from `0%`.
- Ends at the final value.
- Runs once only.
- Uses normal tween timing, not frantic scrub.
- Reduced motion shows final values immediately.

### What We Build

Motion section id: `value`

This is a click accordion. It must stay calm:

- first item open by default
- Framer Motion height and opacity only
- no bounce
- no hover-open
- no scroll-driven row takeover
- call `ScrollTrigger.refresh()` after open/close completes

### AI Opportunity Audit / Offer

Motion section id: `offer`

Use editorial reveal:

- eyebrow first
- split title next
- supporting copy after title
- ruled deliverable rows stagger lightly
- CTA last

Keep row reveals readable. Do not fire every row at once.

### Working Promise

Motion section id: `promise`

Current approved layout:

- eyebrow above
- body copy left
- strikethrough negative lines right

Motion should support that layout:

- copy and negative lines reveal as related groups
- no fighting cross-column animation
- no huge movement
- no gimmicky strikethrough drawing

### Live Work / Products

Motion section id: `proof`

This is a click accordion:

- Framer Motion height and opacity only
- product rows reveal quietly on section approach
- open panel refreshes ScrollTrigger after completion
- product images are preloaded and media frame stays hidden until image readiness

No blank image boxes. No large image slap-in. No autoplay carousel.

### Who This Is For

Motion section id: `fit`

Use simple editorial reveal:

- eyebrow
- title
- two-column ruled list

Do not animate every list item independently unless it remains calm and readable. The list should feel like a strategy document, not a sales deck.

### FAQ

Motion section id: `faq`

This is a quiet accordion:

- first item open by default
- one item open at a time
- Framer Motion height and opacity only
- grey plus, blue active close icon
- refresh ScrollTrigger after open/close

### Final CTA

Motion section id: `cta`

The final CTA is compact and dark:

- reveal text first
- CTA button after
- brand/footer mark last
- keep it restrained

Do not turn it back into a huge full-screen black void.

## Lessons From The Earlier Motion Issues

What broke the page before:

- Tuning GSAP `pin: true` instead of changing the architecture.
- Assuming `scrub` makes pin entry feel smooth. It only smooths playhead catch-up.
- Assuming `anticipatePin` eases the pin. It helps timing/flash issues but does not make a fixed-position switch feel premium.
- Whole-section GSAP pinning created hard boundaries.
- Generic reveal logic made lower sections either too subtle, too early, or flat.
- Masked hero wordmark animation read as blinds.
- Tiny 2px / 5% opacity effects were effectively invisible.
- Accordions that changed height without refreshing ScrollTrigger caused scroll measurement oddities.
- Mounting large product media only after click could show a blank frame before decode.

What fixed it:

- Native CSS sticky stages for the two major story sections.
- GSAP only controls child transforms/opacity inside sticky sections.
- Section-specific reveal timings.
- Clear reading order per section.
- Framer Motion limited to tap/accordion/menu states.
- `ScrollTrigger.refresh()` after accordion layout changes.
- Preload/decode product media before revealing the frame.
- Reduced-motion fallback that shows final content without sticky storytelling.

## Rules For Other Studio Baggio Pages

Start simpler than the homepage.

Use homepage-level sticky storytelling only when a page has a true narrative proof moment. Most product pages should use:

- smooth page scroll
- one-time editorial section reveals
- calm accordion motion where needed
- no pinned scroll unless it materially helps comprehension

When adding motion to another page:

1. Use existing design-system tokens first.
2. Add `data-reveal` to content that should reveal.
3. Add `data-split` only to major headings where line reveal is useful.
4. Add a specific `data-motion-section` branch in `PageReveals` only when generic reveal timing is not enough.
5. Keep movement to `opacity`, `y`, `yPercent` or transform.
6. Avoid animating layout properties during scroll.
7. If content height changes after click, call `ScrollTrigger.refresh()` after the animation completes.
8. If media appears on interaction, preload or hide until ready.
9. Test in full page context, not isolated components.

Do not copy the homepage's 200svh sticky sections onto product pages by default.

## Reduced Motion Requirements

For `prefers-reduced-motion`:

- disable Lenis
- no sticky/pinned storytelling
- no scrubbed reveals
- no count-up animation
- all reveal content visible immediately
- stat numbers show final values
- accordions still work, but animation duration should effectively be zero

## Verification Before Showing Jayme

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Visual QA:

- Desktop around `1440x900`
- Mobile around `390x844`
- Narrow mobile around `320px` if anything wraps
- slow scroll
- fast scroll
- reduced motion
- accordion open/close
- Live Work image reveal
- no horizontal overflow
- no blank frames
- no clipped headings
- no sections that trap the user for too long
- no "blink and miss it" reveals
- blue/emphasis lines land before release

If using browser automation, record or screenshot the full page context. Do not judge motion on isolated test pages.

## Final Instruction

Studio Baggio motion is a controlled editorial system. Protect the rhythm: catch, breathe, reveal, hold, release. If an animation does not make the message easier to read or the page feel more composed, remove it.
