# 09 Homepage Revised Direction - 25 May 2026

Status: revised homepage direction to use for the next implementation pass.

This file supersedes the current homepage section order and wording in `02_V9_COPY_AND_MESSAGING.md` where there is a conflict. It does not replace the wider v9 strategy. The existing hero/header reference direction stays locked.

## Skills To Use

- `ui-ux-pro-max`: overall hierarchy, spacing, responsive design and visual system.
- `direct-response-copy`: tighten the commercial argument and remove generic AI phrasing.
- `gsap-scrolltrigger`: scroll-led section progression only, not decorative motion.
- `framer-motion-animator`: tabs, accordions, hover/active states and mobile interactions.
- `21st.dev`: inspiration for accessible tabs/accordion behaviour, then restyle heavily into Studio Baggio's monochrome editorial system.

## Homepage Structure

1. Hero/header.
2. Opening commercial argument.
3. Problem/clarifier.
4. Expertise-to-proof bridge.
5. Where AI creates value: Discoverability, Market Intelligence, Lead Quality, Authority And Proof, Workflow Acceleration.
6. Commercial AI Sprint.
7. Working promise / not generic AI training.
8. Proof.
9. Fit / not fit.
10. CTA.

## Section 1 - Hero/Header

Keep the current reference direction unchanged:

- top-left metadata
- full-frame `STUDIO BAGGIO.AI` wordmark
- bottom-right promise copy
- restrained nav and CTA

## Section 2 - Opening Commercial Argument

Top centre:

```text
Most businesses are "experimenting with AI". Very few are using it to create real commercial advantage.
```

Small uppercase line:

```text
FOR COMPANIES THAT RELY ON TRUST AND CREDIBILITY TO WIN CLIENTS.
```

Main left block:

```text
Studio Baggio designs and builds practical AI systems that help your business become:
```

Outcome stack:

```text
EASIER TO FIND.
FASTER TO ACT.
BETTER INFORMED.
HARDER TO COMPETE WITH.
```

Design notes:

- White background.
- Generous vertical space.
- Black headline.
- Grey uppercase qualifier.
- Outcome stack left-aligned and oversized.
- Use black only for the strongest final line, with earlier outcomes in neutral grey so the eye lands on `HARDER TO COMPETE WITH.`

## Section 3 - Problem / Clarifier

Headline:

```text
Businesses know AI is changing their market. Far fewer know where to apply it to create measurable commercial value.
```

Stat block:

```text
A 2026 Studio Graphene study found that 78% of UK businesses are using AI tools, but only 31% report positive ROI. Just 41% say they can clearly define what success looks like.
```

Source note:

- TechRadar reported the Studio Graphene figures on 25 March 2026.
- URL: `https://www.techradar.com/pro/security/a-critical-point-nearly-80-of-uk-firms-have-adopted-ai-but-barely-any-are-seeing-a-positive-roi-so-far`

Strong paragraph:

```text
Studio Baggio helps expert-led businesses identify where AI can create measurable commercial value, then turns those opportunities into practical systems across SEO, AI search, market intelligence, lead capture, prospect research, authority-building and workflow acceleration.
```

Pull quote:

```text
"We know exactly where AI can give this business an edge, and we have the systems live to prove it."
```

Design notes:

- Light grey background.
- Centred opening copy.
- Lower-right pull quote.
- This section should feel like the page taking a breath and making the buying logic obvious.

## Section 4 - Expertise-To-Proof Bridge

Purpose: turn the page from "AI problem" into "commercial mechanism".

Copy:

```text
Your expertise only creates commercial value when the market can understand it, trust it and act on it.

Studio Baggio turns the expertise inside your business into visible public proof.

That means showing up consistently where your prospects already are, giving them useful value before they are ready to buy, and connecting the dots between who is engaging, what they care about and how the business should follow up.

That is how expertise becomes commercial advantage.
```

Design notes:

- White or very pale grey section.
- Big first line.
- Simple progression:

```text
Internal expertise -> visible proof -> buyer engagement -> intelligent follow-up
```

- GSAP can resolve each part as the user scrolls, then land into the value areas.

## Section 5 - Where AI Creates Value

Eyebrow:

```text
Where AI Creates Value
```

Headline:

```text
Most businesses know AI matters. Few know where to put it. Fewer still have embedded it into the work that creates revenue, visibility, insight or competitive advantage. Studio Baggio helps close that gap.
```

Areas:

```text
01 Discoverability
Show up where buyers, search engines and AI systems are already looking. Make the business easier to surface, understand and choose before a sales conversation starts.

02 Market Intelligence
Turn public signals into useful commercial information. See prospect movement, competitor activity, market questions and emerging opportunities earlier.

03 Lead Quality
Turn attention into named prospects, clearer qualification and stronger follow-up, so the business spends more time with the right opportunities.

04 Authority And Proof
Make expert judgement visible before a buyer reaches the sales conversation. In trust-based businesses, people need evidence that the expertise on the website actually exists.

05 Workflow Acceleration And Amplification
Use AI to speed up research, reporting, content, sales prep and client work, while improving the quality and usefulness of what the business delivers.
```

Design notes:

- This is the first interactive section.
- Desktop should be charcoal/black with white text.
- Left rail of five areas.
- Right panel changes with each active area.
- Mobile becomes a clean accordion.
- GSAP can pin this section lightly on desktop so the five areas progress as the user scrolls.
- Framer Motion handles active panel transitions.

## Section 6 - Commercial AI Sprint

Eyebrow:

```text
Commercial AI Sprint
```

Headline:

```text
A strategy sprint to find where AI can create the most commercial value in your business.
```

Subline:

```text
Best when you know AI matters, but need clarity on where to apply it.
```

Body:

```text
The first step is a focused sprint to identify where AI can create commercial value, what should be built first, and how it should connect to visibility, pipeline, workflow or client experience.
```

Deliverables:

```text
Where AI can create value in the business.
The use cases worth prioritising.
The buyer, market and workflow signals already available.
What should be built first, and why.
A practical 30-90 day build plan.
```

## Section 7 - Working Promise / Not Generic AI Training

Placement: immediately after the Commercial AI Sprint as a "How this works" / "What this is not" section.

Copy:

```text
This is not generic AI training.

We do not send you away with a list of tools to learn, prompts to maintain or software your team has to adopt.

Every recommendation is practical, buildable and tied to a commercial outcome. If we recommend it, it is because it can be built, shipped or handed over as a working system.

Your time stays protected. Outside the intro call and proposal meeting, the work is designed to run with minimal input from you and your team. Most clients choose a 30-minute monthly update.

The point is to turn your expertise into commercial leverage.

Not to make you spend more time thinking about AI.
```

Commitment block:

```text
No tool theatre.
No software homework.
No training programme to keep alive.
No heavy time investment from your team.
```

Design notes:

- Ruled commitment block.
- Black text on white or white text on charcoal.
- Framer Motion can handle hover/accordion expansion for the commitments.
- No heavy GSAP needed here.

## Section 8 - Proof

Eyebrow:

```text
Built From Live Work
```

Headline:

```text
This is not AI theory. The systems are already live.
```

Proof blocks should click through to individual pages. Fire Source and Last30Days pages can be added as placeholders until deeper case-study pages are built.

Proof block format:

- Product/work name.
- One-line promise.
- What it proves about Studio Baggio.
- Status label: `Live product`, `Live system`, `Prototype` or `Placeholder case study`.
- CTA: `View work`.

Recommended layout:

- Desktop: two large featured proof blocks on top, then two smaller blocks underneath.
- Mobile: stacked blocks with clear CTAs.
- Calm Authority and Business Tracker should be strongest.
- Fire Source and Last30Days can be included, but label them honestly if the pages are placeholders.

Proof copy:

```text
Calm Authority
Your Own Expertise. At Scale.
A Studio Baggio product turning financial adviser expertise into publish-ready authority content.

Business Tracker
Lead intelligence for warmer follow-up.
A system for turning engagement into named prospects, clearer qualification and next-step intelligence.

Fire Source
Commercial intelligence from the open web.
A research system that scans the open web, answers commercial questions quickly and turns cited intelligence into pitches, emails and strategy notes.

Last30Days
What the market is saying right now.
A reporting system that pulls recent discussion and sentiment from Reddit, X, TikTok, Instagram, YouTube and the open web, then turns it into a sourced market report.
```

## Section 9 - Fit / Not Fit

Headline:

```text
For expert-led businesses that need AI connected to commercial outcomes.
```

Best for:

```text
Trust-led firms.
Specialist advisers.
Founder-led businesses.
Professional services.
Teams with valuable expertise but weak public proof.
```

Not for:

```text
Generic AI training.
One-off tools workshops.
Automation without commercial ownership.
Cheap-lead volume plays.
```

## Section 10 - CTA

Headline:

```text
If AI should be giving your business an edge, start with the opportunity.
```

Body:

```text
Bring the business, market or workflow you want to improve. Studio Baggio will help you work out where AI can create real commercial value and what should be built first.
```

CTA:

```text
Discuss your AI opportunity
```

## Visual Rhythm

Use this sequence:

```text
White hero
White opening argument
Grey problem/stat section
White expertise bridge
Charcoal value interaction
White sprint
White/grey proof
Light grey fit
Charcoal CTA
```

This gives continuity without every section feeling the same.

## Implementation Notes

- Do not change the hero/header unless Jayme explicitly asks.
- Replace `Findability` with `Discoverability`.
- Avoid generic SaaS cards.
- Use editorial proof tiles, not decorative nested cards.
- Keep all copy plain and concrete.
- Do not add interaction unless it clarifies the message.
- Verify desktop and mobile in full-page context before pushing.
