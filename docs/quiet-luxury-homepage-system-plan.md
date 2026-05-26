# Quiet Luxury Homepage System Plan

## Summary

Start with the homepage only. Keep the existing header/hero intact and rebuild everything below it into one precise editorial system, with the homepage becoming the design source of truth for the rest of the site.

Execution branch: `quiet-luxury-homepage-system`

## Key Changes

- Hard rule: homepage copy remains unchanged.
- Reuse the existing copy from `src/content/site.ts` and `src/content/work.ts` exactly as written.
- Do not rewrite headings, labels, CTA text, body copy, proof copy or section wording.
- Layout, hierarchy, section framing, CSS, component structure and animation may change.
- Keep the existing homepage header/hero direction unchanged.
- Replace the accumulated `.home-4b` CSS patch stack with one clean homepage design system.
- Define reusable tokens for colour, type, spacing, section frames, rules, dark sections, CTA states and motion timing.
- Rebuild homepage sections below the hero as deliberate full-frame editorial compositions:
  - Opening argument
  - AI Gap / `78%` and `31%` proof object
  - Practical Systems
  - Where AI Creates Value
  - Commercial AI Sprint
  - Working Promise
  - Live Work
  - Fit / Not Fit
  - Final CTA
- Use GSAP for scroll-led reveals, line masks, rule draws and the main value-section progression.
- Use Framer Motion only for micro-interactions.
- Use `emil-design-eng` for the final craft pass: precise easing, no sloppy transitions, clear active states and reduced-motion support.

## Full-Site Follow-On

After homepage approval, roll the same visual system across the rest of the site without changing copy unless explicitly requested:

- `AI Advantage`
- `Work`
- `Business Tracker`
- `Calm Authority`
- `About`
- `Contact`
- `Privacy`

## Test Plan

- Before editing, snapshot current homepage rendered text and compare after rebuild.
- Run `npm run typecheck`, `npm run lint`, `npm run build`.
- Verify homepage in Codex browser at desktop `1440x900` and mobile `390x844`.
- Confirm header/hero remains unchanged.
- Confirm every homepage section below hero reads as a complete frame.
- Confirm no horizontal overflow.
- Confirm reduced-motion users still see all content clearly.
- Confirm dark header contrast works over dark sections.
- Capture homepage full-page desktop and mobile screenshots.

## Assumptions

- Copy is frozen for this pass.
- Header/hero is locked.
- Homepage is the design source of truth before touching the rest of the site.
- Quiet luxury means precision, restraint, hierarchy and motion discipline, not decoration.
- Black, white and true neutral greys remain the hard colour rule.
