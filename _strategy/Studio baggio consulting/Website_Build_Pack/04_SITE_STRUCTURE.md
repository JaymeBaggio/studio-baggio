# 04 Site Structure

## Phase 1 Pages

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

Add a clear `STATUS.md` note that Rough Cut / Newsletter and Playbooks are parked for phase 2 after the main site is looking and working properly.

Preserve any existing local Rough Cut/playbook assets, but do not spend phase 1 building archive functionality.

## Navigation

Recommended top navigation:

- Studio Baggio
- AI Advantage
- Work
- Business Tracker
- Calm Authority
- About
- Contact

Footer-only:

- Privacy

Primary CTA:

`Discuss your AI opportunity`

## Home Page

Use `02_V9_COPY_AND_MESSAGING.md` plus the full v9 source file.

Required homepage sections:

- Hero / Studio Baggio identity moment
- AI commercial advantage headline section
- why most AI adoption is commercially weak
- five commercial value areas
- Commercial AI Sprint
- selected proof / work
- how the system works
- final CTA

## AI Commercial Advantage / Services Page

Purpose: make the offer concrete for buyers who need more detail than the homepage.

Include:

- what AI commercial advantage means
- why most businesses waste time on generic AI adoption
- five value areas
- Commercial AI Sprint
- AI Advantage Build
- AI Advantage Partner
- example systems:
  - AI SEO and search visibility
  - market intelligence
  - lead intelligence / Business Tracker
  - prospect research workflows
  - authority and content systems
  - internal workflow tools
  - client-facing tools or productised experiences

## Business Tracker Page

Build a dedicated Business Tracker page in phase 1 using `06_BUSINESS_TRACKER_COPY.md` as the source of truth.

Purpose: make the lead intelligence / follow-up system tangible enough that buyers understand it is not just analytics or a dashboard.

The page should explain:

- what the Business Tracker is
- what inputs it captures
- how it turns activity into named leads
- how it qualifies those leads
- how Live AI Search Intelligence adds market context
- how the Intel Bank supports better follow-up
- how the system produces a prioritised follow-up pipeline
- why this makes growth more commercially feasible for smaller teams

Link to this page from:

- Work
- AI Commercial Advantage / Services
- relevant homepage proof/system sections

## About Page

Draft this page from Jayme's current positioning.

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

## Content Architecture

Keep copy easy to edit.

Do not bury all homepage, services and work copy inside large JSX components.

Create a clear content layer, for example:

- `src/content/site.ts`
- `src/content/work.ts`
- `src/content/navigation.ts`

or an equivalent Markdown/MDX content structure.

Centralise:

- nav labels and URLs
- homepage section copy
- service/offer copy
- work item copy
- CTA copy
- footer links
- metadata
