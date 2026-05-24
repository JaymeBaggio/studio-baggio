# Studio Baggio Website Build — `/goal` Prompt
*Created: 24 May 2026*

The full original prompt is preserved below, but the practical version now uses a modular build pack so the `/goal` prompt can stay under 4000 characters.

Use this short prompt in the fresh build thread:

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

Full detailed version remains below for reference.

---

## /goal

Build and launch the new Studio Baggio website from the existing local repo, replacing the outdated current site with a premium, conversion-led, AI commercial advantage site.

### Core Objective

Create a complete, polished Studio Baggio website that makes the offer immediately clear:

> Turn AI into a commercial advantage.

Studio Baggio helps expert-led businesses find and build practical AI systems that make the business easier to find, faster to act, better informed and harder to compete with.

The site must feel slick, premium, editorial and motion-led. It should demonstrate the quality of the work through the experience itself: Aileron typography, Obys/AIM-inspired scroll motion, GSAP-led hero/scrollytelling, Framer Motion micro-interactions, and clean conversion structure.

Use subagents where available to split copy/content, design/motion, engineering implementation and QA/deploy. If subagents are unavailable, run those tracks sequentially.

### Working Folder And Repo

Start in:

`/Users/jaymebaggio/Desktop/Studio Baggio/Website`

This is the existing Studio Baggio website repo. Current GitHub remote appears to be:

`https://github.com/JaymeBaggio/studio-baggio.git`

Before editing:

- Read `/Users/jaymebaggio/Desktop/Studio Baggio/Website/CLAUDE.md` if present.
- Read `/Users/jaymebaggio/Desktop/Studio Baggio/Website/STATUS.md` if present.
- Read `/Users/jaymebaggio/Desktop/Consulting/STATUS.md`.
- Read `/Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting/STATUS.md`.
- Check `git status` and do not delete unrelated untracked files without understanding them.

Move the strategy resources into the website workspace so the site repo contains its own source materials:

From:

`/Users/jaymebaggio/Desktop/Consulting/Studio baggio consulting`

To a clean folder inside the website repo, for example:

`/Users/jaymebaggio/Desktop/Studio Baggio/Website/_strategy/Studio baggio consulting`

If moving the folder risks breaking current session continuity, copy it first, verify all files are present, then update both STATUS files with the new location and leave a clear pointer from the old location.

### Primary Source Files

Use these as the source of truth:

- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_Script_v9_AI_Commercial_Advantage.md`
- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_v9_AI_Commercial_Advantage_Full_Copy_and_Outline.docx`
- `_strategy/Studio baggio consulting/design.md`
- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_Script_v8.md` as historical/Paper-reference context only
- `_strategy/Studio baggio consulting/Studio_Baggio_Landing_Page_v8_Full_Copy_and_Outline.docx` as historical/Paper-reference context only
- Existing local assets in `/Users/jaymebaggio/Desktop/Studio Baggio/Website`
- Studio Baggio logos in `/Users/jaymebaggio/Desktop/Studio Baggio/Studio Baggio Logos`
- Calm Authority source pages:
  - `https://www.calmauthority.ai/press/calm-authority-fact-sheet.html`
  - `https://www.calmauthority.ai/about`
- Local Calm Authority folder if needed:
  - `/Users/jaymebaggio/Desktop/Calm Authority`
- Local Last30Days folder if needed:
  - `/Users/jaymebaggio/Desktop/Last 30 Days`
- Local Fire Source folder:
  - `/Users/jaymebaggio/Desktop/Fire Source`

Do not scrape the current live `studiobaggio.ai` for copy. The existing live site is outdated. Use it only if needed to locate existing assets or understand current deployment/domain, not as a copy/design source.

Important copy/source rule:

- Use v9 as the homepage and site copy source of truth.
- Use v8 only as historical context and to understand the Paper visual mockup direction.
- Do not revert the site back to the v8 Growth Intelligence-led copy unless Jayme explicitly asks.

Paper visual reference:

- Paper file: `Jubilant island`
- Artboard: `Studio Baggio v8 Landing Page`
- Use this for hero composition, Aileron typography, sparse white space, top-left metadata, huge `STUDIO BAGGIO.AI` wordmark and bottom-right promise placement.
- Do not treat the Paper mockup as final copy.

### Scope For Phase 1

Build these pages:

1. Home
2. AI Commercial Advantage / Services
3. Work
4. Business Tracker
5. Calm Authority
6. About
7. Contact
8. Privacy

Do not build Rough Cut / Newsletter pages in this first build.

Do not build Playbooks pages in this first build.

Add a clear `STATUS.md` note that Rough Cut / Newsletter and Playbooks are parked for phase 2 after the main site is looking and working properly. Preserve any existing local Rough Cut/playbook assets but do not spend phase 1 building archive functionality.

### Information Architecture

Recommended top navigation:

- Studio Baggio
- AI Advantage
- Work
- Business Tracker
- Calm Authority
- About
- Contact
- Privacy in the footer only, not main nav

Primary CTA:

`Discuss your AI opportunity`

Avoid:

`Map Your AI Advantage`

It sounds too packaged/wanky and should not be used.

### Conversion And Messaging Guardrails

This site must pass the 5-second clarity test.

Above the fold, a serious business owner or senior leader should understand:

- who Studio Baggio helps
- what Studio Baggio sells
- why AI matters commercially now
- what outcome the work creates
- what the next step is

Do not make the page sound like generic AI consulting, marketing strategy, content marketing, automation training or a vague digital transformation offer.

Lead with:

- AI turned into commercial advantage
- practical systems, not theory
- expert-led businesses
- visibility, intelligence, lead quality, workflow acceleration and better follow-up
- the ability to become easier to find, faster to act, better informed and harder to compete with

Keep `Growth Intelligence` and `Business Tracker` as named mechanisms/proof once explained. Do not use them as unexplained front-door jargon.

Audit every major line for plain meaning. If a sentence sounds impressive but does not tell the buyer what happens, replace it.

### Design Direction

Use `_strategy/Studio baggio consulting/design.md` as the design source of truth.

Design requirements:

- Use Aileron as the primary font.
- Mostly monochrome palette.
- Premium editorial composition.
- Large typographic hero.
- Obys/AIM-inspired scroll rhythm.
- Carry forward the research learnings from `design.md`: typography as the interface, GSAP for cinematic scroll, Framer Motion for component polish, masked SplitText reveals, sparse pinned moments, selected-work proof display and accessible shadcn/RHF/Zod forms.
- No AI SaaS purple gradient look.
- No decorative blobs/orbs.
- No generic card-heavy SaaS bento page.
- No fake proof.
- No generic AI trainer positioning.

Primary design references:

- `https://aim.obys.agency/`
- `https://www.refs.gallery/projects/obys-agency`
- `https://www.awwwards.com/inkwell-a-scroll-driven-narrative-for-ais-most-stealth-player.html`
- `https://www.awwwards.com/sites/made-with-gsap`

### Tech Direction

Use the strongest practical stack for this site. Preferred:

- Next.js / React
- TypeScript
- Tailwind
- GSAP + ScrollTrigger + SplitText
- Framer Motion
- shadcn/ui
- React Hook Form + Zod
- Vercel deployment

If the existing repo is static HTML, it is acceptable to convert it into a modern React/Next site in the same repo, preserving useful assets and Git history. Do not keep the old static site if it blocks quality.

### Content Architecture

Keep the copy easy to edit.

Do not bury all homepage, services and work copy inside large JSX components.

Create a clear content layer, for example:

- `src/content/site.ts`
- `src/content/work.ts`
- `src/content/navigation.ts`

or an equivalent Markdown/MDX content structure.

The build should centralise:

- nav labels and URLs
- homepage section copy
- service/offer copy
- work item copy
- CTA copy
- footer links
- metadata

This matters because Jayme will keep refining the positioning and case-study copy after launch.

### Animation Requirements

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

The motion should feel smooth and satisfying, not busy. The site should feel better because of GSAP, not just animated.

### Home Page Copy And Structure

Use v9 copy as source of truth.

Hero must include:

- `STUDIO BAGGIO.AI`
- `Practical AI systems built around how your business wins in market.`
- `Create visibility, intelligence, leads and commercial advantage.`
- `Not AI theory. Not generic automation.`
- `AI commercial advantage systems for expert-led businesses.`
- `We help serious businesses work out where AI can create value, then build the systems that make it useful.`

Main conversion headline:

> Turn AI into a commercial advantage.

Subline:

> Most businesses know they should be using AI. Far fewer know where it can create real value.

Core explanatory copy:

> Studio Baggio helps expert-led businesses identify the highest-value places to apply AI, from SEO and AI search to market research, lead capture, prospect intelligence, authority-building and client workflow.

> We do not sell generic AI training or tool demos. We design and build practical AI systems that help your business become easier to find, faster to act, better informed and harder to compete with.

Include the five commercial value areas:

- Findability
- Market Intelligence
- Lead Quality
- Authority
- Workflow Acceleration

Entry offer:

`Commercial AI Sprint`

Explain it as a focused first step to identify where AI can create the most commercial value, what should be built first, and how it connects to visibility, pipeline, workflow or client experience.

### AI Commercial Advantage / Services Page

Purpose:

Make the offer concrete for buyers who need more detail than the homepage.

Include:

- What AI commercial advantage means.
- Why most businesses waste time on generic AI adoption.
- The five value areas.
- Commercial AI Sprint.
- AI Advantage Build.
- AI Advantage Partner.
- Example systems:
  - AI SEO and search visibility
  - market intelligence
  - lead intelligence / Business Tracker
  - prospect research workflows
  - authority and content systems
  - internal workflow tools
  - client-facing tools or productised experiences

### Work Page

Purpose:

Show real proof without turning the page into a generic portfolio grid.

Include these first:

1. Calm Authority
2. Hanbury / Growth Intelligence
3. Business Tracker
4. Last30Days
5. Fire Source

Design:

- Selected-work index with animated preview pane, or equivalent premium editorial proof section.
- Each work item should include:
  - commercial problem
  - system / product / asset built
  - why it matters
  - what it proves about Studio Baggio
  - link to deeper page or external site where relevant

Phase-1 work page rule:

- Build strong Work cards / feature panels for all five work items.
- Build a deeper standalone Calm Authority page.
- Build a deeper standalone Business Tracker page in phase 1 using Jayme's latest Business Tracker copy.
- Add other deeper standalone work detail pages only where the source material is strong enough and doing so does not compromise the main site build.
- If Hanbury, Last30Days or Fire Source need deeper pages later, leave clean content hooks/routes/TODOs rather than overbuilding thin pages.
- Keep every Work item editable in the content layer.

Calm Authority should also have its own page.

For Hanbury / Growth Intelligence, avoid revealing sensitive client detail. Frame it as a specialist wealth launch / growth intelligence system: positioning, website direction, search visibility, authority assets, lead capture, email nurture and follow-up intelligence.

For Business Tracker, use this as the source direction:

> The operating system that captures every interaction, makes it visible and produces a named follow-up pipeline.

The Business Tracker is a market-specific prospecting system built around the audience a business wants to reach and the qualification criteria that matter commercially.

It captures website analytics, SEO and AI search visibility, LinkedIn engagement, lead magnet activity, email performance, enquiries, referrals, target accounts and market context. Then it turns that into named leads, qualification, AI rationale and suggested follow-up.

Position it as a system that produces a prioritised follow-up pipeline, so smaller teams invest their time in the conversations most likely to shift ROI. The commercial point: it makes growth more feasible for smaller teams because the business can see who is warming up, why they matter and what should happen next.

Business Tracker modules:

1. Intelligence — commercial insight competitors do not have.
2. Attribution — captures interactions across website, SEO, LinkedIn, lead magnets and email.
3. Qualification — scores leads against business criteria such as ICP fit, funds, relevance and relationship value.
4. Live AI Search Intelligence — adds current market context around each lead or target account. The source changes by market: funding, hiring, regulation, acquisitions, partnerships, leadership changes, public commentary, agents, managers, press, sponsorships, injuries, tours, events, social activity or career moves.
5. Follow-up — recommends the next action per lead, so teams know who to prioritise.
6. The Intel Bank — keeps target firms, decision-makers, introducers, recent news, campaign status, relationship context and follow-up angles in one place.
7. Reporting and Scale — creates a board-ready monthly view of what is working, what is not and what to optimise next.

Include these channel-specific ideas where useful:

- SEO / AI Search Visibility: which articles convert, where the business sits in search, AI search rationale and optimal follow-up. SEO without lead magnets creates anonymous traffic.
- LinkedIn: who followed, commented and engaged; qualified prospects and best-performing formats; when to post and what hooks work. LinkedIn without analytics creates blind impressions without growth mechanics.
- Lead Magnets: who interacted, when and why; engagement and lead quality score; AI rationale and optimal follow-up. Lead magnets without email marketing waste the chance to keep depositing value.
- Email Marketing: behavioural triggers, source attribution, messaging stage, engagement score, lead quality, AI rationale and optimal follow-up. Email without the Business Tracker means sending without knowing who engaged.

Use this punchy strap copy if useful:

> Business intelligence. Qualified prospects. More conversations. More clients. More impact.

CTA:

> Enquire Now

For Last30Days, inspect local materials and write it as a market/current-signal intelligence project. If there is not enough source material, include a polished but honest work teaser and add a TODO in STATUS.md for deeper case-study copy.

For Fire Source, inspect `/Users/jaymebaggio/Desktop/Fire Source`, especially `STATUS.md`, `BIO.md`, `METHOD.md`, `BLUEPRINT.md` and the `design/` screenshots. Frame it as a commercial intelligence product: web research, competitor moves, market shifts, buyer/prospect signals and cited intelligence briefs in under three minutes. Key proof points from local docs:

- Live at `https://fire-source.vercel.app`
- Built by Studio Baggio.
- Uses Firecrawl + Claude to search/scrape the web, synthesize cited answers and suggest follow-up questions.
- Supports stacked follow-up threads through compressed thread memory.
- Includes Supabase auth, per-user accounts, thread storage and admin role foundations.
- Use-case examples include competitor intelligence before a pitch, prospecting with real signal, market/category trends, and turning research into usable artefacts like pitch hooks, cold emails, battle cards, strategy notes and creative briefs.

Do not expose any secrets from `.env` files. Do not copy API keys. Use screenshots and public/product copy only.

### Calm Authority Page

Build this as a proper Studio Baggio product/work page, not a tiny redirect.

Use source material from:

- `https://www.calmauthority.ai/press/calm-authority-fact-sheet.html`
- `https://www.calmauthority.ai/about`
- local Calm Authority materials if useful

Facts to include, rewritten in Studio Baggio voice:

- Calm Authority is a LinkedIn writing system for financial advisers.
- It turns real adviser expertise into publish-ready LinkedIn posts in the adviser’s own voice.
- Built by Harry Sims, a Chartered Financial Planner, and Jayme Baggio, a content/systems strategist.
- It maps voice from real samples, surfaces weekly angles, and drafts posts from a URL, article or idea.
- Advisers review, edit and publish manually. Nothing is auto-published.
- It was built around the trust gap in financial advice: expertise exists inside firms, but too little of it is visible publicly.
- It is proof of Jayme’s ability to turn expert judgement into a practical AI-enabled product and operating system.

Useful proof points from the fact sheet:

- UK adviser market visibility gap: 37,136 authorised advisers, fewer than 300 posting consistently on LinkedIn.
- One adviser grew impressions by more than 500% in a short measured period.
- Reported inbound lead and revenue proof points exist in Calm Authority materials; include only if phrased carefully and not overclaimed.
- Calm Authority has been featured / referenced in financial services press materials.

Include clear links:

- `https://www.calmauthority.ai/`
- `https://app.calmauthority.ai/` if relevant

### About Page

Draft this page from Jayme’s current positioning.

Do not mention Channel 4.

Tone:

- senior
- clear
- founder/operator
- commercial
- strategic
- not influencer-ish
- not over-personal

Core points:

- Jayme Baggio is a strategist, founder and systems operator at the intersection of AI, creativity, media and commercial strategy.
- Her work focuses on how AI can turn expert judgement in creative and commercial teams into practical operating systems, content and products.
- She builds systems that help experts package and leverage their IP at scale.
- She speaks about practical AI implementation and executive-level frameworks for leaders.
- She publishes Rough Cut, an ongoing briefing on AI, creativity and media, used as a live portfolio of what is working inside organisations in practice, not theory.
- She brings strong teams together, designs systems around them and focuses on work that delivers cultural traction and business value.
- Include relevant proof from Calm Authority and work projects.

### Contact Page And Form

Use `jayme@studiobaggio.ai` as the main contact email.

Build a real contact form.

Fields:

- Name
- Email
- Business / firm
- Website
- What are you trying to improve?
- Where do you think AI could help?

Technical requirements:

- React Hook Form + Zod validation.
- shadcn/ui form primitives where appropriate.
- Clear field labels and field-level errors.
- Loading, success and error states.
- Submit should send email to `jayme@studiobaggio.ai`.
- Prefer Resend or another Vercel-friendly transactional email provider.
- Use environment variables, e.g. `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- If no API key exists locally, implement the endpoint and document exactly which Vercel env vars are required. Do not pretend the form works if env vars are missing.
- Add spam protection appropriate for v1, such as honeypot field and basic rate limiting if practical.

### Privacy Page And Legal Basics

Because the site collects contact-form submissions, include a simple Privacy page.

The Privacy page should cover:

- what information the form collects
- why it is collected
- where submissions are sent
- that users can contact `jayme@studiobaggio.ai` about their data
- that the site may use basic analytics only if analytics is actually installed

Do not add cookie-banner or analytics language unless analytics/tracking is actually implemented.

Footer should include:

- Studio Baggio Ltd
- `jayme@studiobaggio.ai`
- Privacy link
- current year

If adding company registration details, verify them first from a reliable source or leave them out.

### SEO And Metadata

Add strong metadata for:

- Home
- AI Commercial Advantage
- Work
- Business Tracker
- Calm Authority
- About
- Contact
- Privacy
- Fire Source if it becomes a standalone work detail page rather than only a work-section feature

Use terms:

- AI commercial advantage
- practical AI systems
- commercial AI implementation
- AI strategy for expert-led businesses
- AI search
- AI SEO
- market intelligence
- lead intelligence
- authority systems
- workflow acceleration

Add Open Graph metadata and clean social preview where practical.

Also add, where practical for the chosen stack:

- `sitemap.xml`
- `robots.txt`
- canonical URLs
- Organization schema / JSON-LD for Studio Baggio Ltd
- clean page titles and descriptions that do not keyword-stuff

SEO should support the positioning, not flatten the copy into generic AI-consultant language.

Suggested title direction:

- Home: `Studio Baggio | AI Commercial Advantage Systems`
- AI Advantage: `AI Commercial Advantage for Expert-Led Businesses`
- Work: `Studio Baggio Work | AI Systems, Products and Growth Intelligence`
- Calm Authority: `Calm Authority | AI LinkedIn System for Financial Advisers`

Adjust titles naturally if the final content structure needs it.

### Deployment

After build and QA:

- Commit changes to Git.
- Push to GitHub remote.
- Deploy to Vercel.
- Connect/verify production domain:
  - `studiobaggio.ai`
  - `www.studiobaggio.ai`

If the Vercel project already exists, use the existing project if sensible.

If it is cleaner to create a new Vercel project from the same GitHub repo, do that, but document the decision.

Deploy preview first if needed for QA, then promote production once checks pass. The goal is to replace the outdated live site.

### QA Requirements

Before final:

- Run lint/typecheck/build.
- Start local dev server and inspect full site.
- Use the in-app browser or approved browser workflow for screenshots.
- Verify desktop and mobile.
- Verify keyboard navigation, focus states and form accessibility.
- Verify all nav links.
- Verify contact form validation and submit behaviour.
- Verify reduced-motion mode does not break the page.
- Verify no text overlaps or gets clipped.
- Verify the GSAP hero and scroll sections are actually visible and smooth.
- Verify images/assets load.
- Verify SEO metadata.
- Verify sitemap, robots and canonical URLs if implemented.
- Verify Vercel deployment URL.
- Verify production domain after deployment.

### Status Updates

Update:

- `/Users/jaymebaggio/Desktop/Studio Baggio/Website/STATUS.md`
- the moved/copied strategy folder STATUS if relevant
- any root project notes needed for future sessions

Include:

- what was built
- what was deferred
- deployment URL
- production domain status
- contact form environment variable status
- known follow-up tasks

### Critical Deferrals

Do not build these in phase 1:

- Rough Cut / Newsletter archive
- Playbooks archive / gated playbooks

Add them as phase-2 TODOs only.

### Success Criteria

The build is successful when:

- The new site clearly communicates Studio Baggio’s offer within 5 seconds.
- The homepage leads with `Turn AI into a commercial advantage.`
- The design feels premium, editorial and motion-led.
- The GSAP hero and scroll animation feel smooth and deliberate.
- The site includes Home, AI Commercial Advantage, Work, Business Tracker, Calm Authority, About and Contact.
- The site includes a dedicated Business Tracker page using Jayme's latest Business Tracker copy.
- The site includes a simple Privacy page linked from the footer.
- Calm Authority has a proper page and external links.
- Work includes Calm Authority, Hanbury / Growth Intelligence, Business Tracker, Last30Days and Fire Source.
- Core site copy and Work copy live in an editable content layer, not only inside JSX components.
- Contact form is real or fully implemented pending documented env vars.
- The site is committed, pushed, deployed and connected to `studiobaggio.ai`.
