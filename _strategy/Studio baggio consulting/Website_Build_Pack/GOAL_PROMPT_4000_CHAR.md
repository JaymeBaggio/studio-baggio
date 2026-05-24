# Pasteable 4000-Character `/goal` Prompt

Use this prompt in the new build thread:

```text
/goal Build and launch the new Studio Baggio website from /Users/jaymebaggio/Desktop/Studio Baggio/Website, replacing the outdated live site.

Before building, read and follow the full build pack starting here:
/Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/Website_Build_Pack/00_READ_ME_FIRST.md

Then read every numbered file in that folder: sources/rules, v9 copy, design/motion, site structure, work/proof, Business Tracker copy, Calm Authority copy, contact/SEO/deploy/QA. Business Tracker is mandatory: read and use /Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/Website_Build_Pack/06_BUSINESS_TRACKER_COPY.md. Calm Authority is mandatory: read and use /Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/Website_Build_Pack/08_CALM_AUTHORITY_COPY.md.

Use subagents where available: one for copy/content extraction, one for design/motion, one for engineering implementation, and one for QA/deploy. If subagents are unavailable, run those tracks sequentially yourself.

Non-negotiables: use v9 as the copy source of truth, not the old live site. Lead with “Turn AI into a commercial advantage.” Use v8/Paper only as visual reference. Use the full design brief at /Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/design.md for Aileron, premium monochrome editorial direction, Paper hero reference, GSAP + ScrollTrigger + SplitText scrollytelling, Framer Motion micro-interactions, shadcn/RHF/Zod forms.

Build phase 1 pages only: Home, AI Commercial Advantage/Services, Work, Business Tracker, Calm Authority, About, Contact and Privacy. Do not build Rough Cut/Newsletter or Playbooks yet; add those as phase 2 TODOs in STATUS.

Work must include Calm Authority, Hanbury/Growth Intelligence, Business Tracker, Last30Days and Fire Source. Business Tracker must also have its own phase-1 page linked from Work and AI Advantage. Use Jayme’s exact latest direction from 06_BUSINESS_TRACKER_COPY.md: “The operating system that captures every interaction, makes it visible and produces a named follow-up pipeline.” Include the market-specific prospecting system explanation, named leads, qualification, AI rationale, suggested follow-up, prioritised pipeline, Intelligence, Attribution, Qualification, Live AI Search Intelligence, Follow-up, Intel Bank, Reporting/Scale, and channel logic for SEO/AI Search, LinkedIn, Lead Magnets and Email. Calm Authority must have its own page using 08_CALM_AUTHORITY_COPY.md and the fact sheet/about sources.

Use a clean editable content layer for nav, homepage copy, services copy, work items, CTAs, footer and metadata. Build a real contact form to jayme@studiobaggio.ai with validation, loading/success/error states, spam protection and documented env vars if email API keys are missing.

Add SEO metadata, Open Graph, sitemap, robots, canonical URLs and schema where practical. Commit, push to GitHub, deploy to Vercel and connect/verify studiobaggio.ai and www.studiobaggio.ai. Run lint/typecheck/build, inspect desktop/mobile, verify animations/forms/nav/SEO/domain, then update STATUS.md with built, deferred, deployed and follow-up items.
```
