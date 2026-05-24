# Studio Baggio Website Build Pack
*Created: 24 May 2026*

This folder is the source-of-truth build pack for the new Studio Baggio website.

The pasteable `/goal` prompt should be short and should point the build agent here first. The agent must read this file, then read every numbered file in this pack before building.

## Objective

Build and launch the new Studio Baggio website from:

`/Users/jaymebaggio/Desktop/Studio Baggio/Website`

Replace the outdated live site with a premium, conversion-led, AI commercial advantage site.

The website must make this immediately clear:

> Turn AI into a commercial advantage.

Studio Baggio helps expert-led businesses find and build practical AI systems that make the business easier to find, faster to act, better informed and harder to compete with.

## Read Order

1. `01_SOURCE_FILES_AND_RULES.md`
2. `02_V9_COPY_AND_MESSAGING.md`
3. `03_DESIGN_AND_MOTION.md`
4. `04_SITE_STRUCTURE.md`
5. `05_WORK_AND_PROOF.md`
6. `06_BUSINESS_TRACKER_COPY.md`
7. `08_CALM_AUTHORITY_COPY.md`
8. `07_CONTACT_SEO_DEPLOY_QA.md`

## Non-Negotiables

- Use v9 copy as the source of truth.
- Use v8/Paper only as visual reference.
- Use `design.md` for Aileron, GSAP, Framer Motion and premium editorial direction.
- Use Jayme's latest Business Tracker copy in `06_BUSINESS_TRACKER_COPY.md`.
- Use Calm Authority page/case-study copy in `08_CALM_AUTHORITY_COPY.md`.
- Build phase 1 only: Home, AI Commercial Advantage / Services, Work, Business Tracker, Calm Authority, About, Contact, Privacy.
- Do not build Rough Cut / Newsletter or Playbooks in phase 1.
- Use a real contact form to `jayme@studiobaggio.ai`.
- Commit, push to GitHub, deploy to Vercel and connect/verify `studiobaggio.ai` and `www.studiobaggio.ai`.

## Subagent Instruction

Use subagents where available to improve quality and speed. At minimum, split the work into these tracks:

- Copy/content agent: extract v9, Business Tracker, Calm Authority, Work, About and SEO copy into the content layer.
- Design/motion agent: implement Aileron, Paper-inspired hero, GSAP scroll moments, Framer micro-interactions and responsive visual polish.
- Engineering agent: build routes, components, content architecture, contact form, privacy page and deployment setup.
- QA/deploy agent: run lint/typecheck/build, inspect desktop/mobile, verify forms/nav/animation/SEO, deploy and document status.

If subagents are unavailable in the build session, run those tracks sequentially yourself.

## Decision Priority

If files conflict:

1. User's latest instruction wins.
2. This build pack wins over older notes.
3. v9 copy wins over v8/v7/older copy.
4. `design.md` wins for visual and animation direction.
5. Existing live `studiobaggio.ai` is outdated and must not be used as copy source.
