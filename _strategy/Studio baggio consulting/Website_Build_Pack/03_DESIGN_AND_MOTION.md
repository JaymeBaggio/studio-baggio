# 03 Design And Motion

Use this source as the main design brief:

`_strategy/Studio baggio consulting/design.md`

Before the strategy folder is copied into the website repo, the same full design brief lives at:

`/Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/design.md`

Do not treat this file as optional. It is the full visual, motion and component brief.

## Design Direction

The site should feel:

- premium
- editorial
- understated
- slick
- motion-led
- commercially serious

It should demonstrate the quality of the work through the experience itself.

## Typography

- Use Aileron as the primary font.
- Make typography the main interface.
- Use large, confident, sparse typographic compositions.
- Avoid cramped sections and tiny decorative text.
- Ensure all text fits on desktop and mobile without overlap.

## Visual Style

- Mostly monochrome palette.
- Premium editorial composition.
- Large typographic hero.
- Sparse white space.
- Strong section rhythm.
- No generic AI SaaS purple gradients.
- No decorative blobs/orbs.
- No generic card-heavy bento page.
- No fake proof.
- No generic AI trainer positioning.

## Paper Reference

Paper file:

`Jubilant island`

Artboard:

`Studio Baggio v8 Landing Page`

Use it for:

- hero composition
- Aileron typography
- sparse whitespace
- top-left metadata
- huge `STUDIO BAGGIO.AI` wordmark
- bottom-right promise placement

Do not use Paper as final copy source.

## Animation Split

GSAP owns:

- hero load timeline
- hero pin / transition
- SplitText word/line reveals
- pinned scrollytelling
- scroll-scrubbed section transitions
- value-area progression
- proof/work scroll experiences

Framer Motion owns:

- nav open/close
- CTA hover/tap states
- active tab/index transitions
- proof item hover/selection
- form states
- mobile accordions
- small layout transitions

Do not use Framer Motion for pinned scroll storytelling.

Use reduced-motion fallbacks.

Wait for fonts before running SplitText.

Motion should feel smooth and satisfying, not busy. The site should feel better because of GSAP, not merely animated.

## Design References

- `https://aim.obys.agency/`
- `https://www.refs.gallery/projects/obys-agency`
- `https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html`
- `https://www.awwwards.com/sites/made-with-gsap`

Carry forward the learnings from `design.md`: typography as the interface, GSAP for cinematic scroll, Framer Motion for component polish, masked SplitText reveals, sparse pinned moments, selected-work proof display and accessible shadcn/RHF/Zod forms.
