export type InsightCategory = {
  slug: string;
  label: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  tags: string[];
  source: string;
  sourcePath: string;
  sourceStart: string;
  sourceEnd?: string;
  readTime: string;
  date: string;
  updated: string;
  summary: string;
  preview: string;
  thesis: string;
  metaTitle: string;
  metaDescription: string;
  sourceMarkdown: string;
  related: string[];
};

export const insightCategories: InsightCategory[] = [
  { slug: "commercial-intelligence", label: "Commercial Intelligence" },
  { slug: "ai-adoption", label: "AI Adoption" },
  { slug: "ai-skills", label: "AI Skills" },
  { slug: "ai-search", label: "AI Search" },
  { slug: "owned-media", label: "Owned Media" },
  { slug: "ai-products", label: "AI Products" }
];

export const insightArticles: InsightArticle[] = [
  {
    slug: "firecrawl-for-business",
    title: "Firecrawl just gave any business access to 96% of the open web",
    category: "Commercial Intelligence",
    categorySlug: "commercial-intelligence",
    tags: ["Firecrawl", "public web", "lead intelligence", "market intelligence", "AI search", "public proof"],
    source: "Rough Cut 9 / Rough Cut 10",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC9/RC9-ARTICLE-1-DRAFT-v2.md",
    sourceStart: "# Firecrawl just gave any business access to 96% of the open web",
    readTime: "16 min read",
    date: "2026-05-29",
    updated: "2026-05-29",
    summary:
      "Firecrawl does not just let you scrape the market. It lets you apply your own commercial judgement to the market at scale.",
    preview:
      "The commercial edge moves to the criteria you choose, the signals you combine, the qualification logic you apply, and the questions you ask.",
    thesis: "The lead list is no longer the asset. The qualification logic is.",
    metaTitle: "Firecrawl just gave any business access to 96% of the open web | Studio Baggio",
    metaDescription:
      "Firecrawl does not just let you scrape the market. It lets you apply your own commercial judgement to the market at scale.",
    related: [
      "owned-vs-rented-audience",
      "ai-adoption-value-gap",
    ],
    sourceMarkdown: `# Firecrawl just gave any business access to 96% of the open web

If you have not heard of Firecrawl yet, put it on your radar. It is the infrastructure tool that reads any website and returns the contents in a form AI can use, in seconds, for pennies per query.

You can now ask the open web which competitor dropped their price this week, which firms in your sector are hiring senior brand people, which rival just partnered with a new distributor, what messaging your category is shifting toward, where the next budget in your space is being assigned. The answers come back structured.

What used to require a £50,000 vendor contract with the likes of Salesforce, Tubular or a research agency, a dashboard subscription, or a week-long research turnaround is now buildable in-house, shaped to the questions your team actually cares about.

Companies already running this in production include Shopify, whose CEO Tobi Lütke personally invested in Firecrawl's Series A. Replit runs it inside its coding agent. Zapier wired it into their chatbot in a single afternoon. Hedge funds use it for live market analysis. Firecrawl raised $14.5M last summer.

## What this looks like in practice

The clearest place it lands is around prospects.

Inbound, a team receives twenty new leads from a marketing campaign. Within seconds, every lead arrives with a personalised brief covering what they have published in the last month, their recent LinkedIn activity, the news their company has been in, and the angle most likely to open the conversation. The whole pipeline runs while someone is making a coffee.

Outbound, take a business targeting brands that spend heavily in creator marketing but underinvest in their own owned channels. Three stages.

First, surface the universe. Every brand spending in creator, with weak owned social channels, poor organic distribution, a recent campaign launch, budget but no clear strategy, signs of category literacy from how they have spent before, or one or more touchpoints already crossed with your business.

Second, qualify each one against your own commercial logic. Standard commercial lead. Strategic reputation play. Warm lead, where touchpoints are crossed. Cold but high-fit. Category-literate buyer. Education-heavy buyer. Urgent opportunity, where a campaign just launched and the budget is assigned. Poor fit despite surface-level relevance.

Third, pick the in. The angle that lands for this segment, this brand, this moment.

Firecrawl does not just let you scrape the market. It lets you apply your own commercial judgement to the market at scale.

If your positioning is sharp and your ICP is clear, Firecrawl gives you a way to find the people who match it, qualify them properly, and decide what kind of opportunity each one is before anyone wastes time chasing the wrong lead.

## Two builds running today

We are running two builds on this pattern in production today.

The first is a daily lead qualifier wired into a commercial dashboard. Inbound activity from across the business, content downloads, social comments, website enquiries, diagnostic completions and in-product sign-ups, flows in overnight. By 8am, every lead has been enriched with what is currently published on the firm's website and the founder's public record, scored against a rubric the team wrote themselves, and ranked with a tailored outreach angle. Around six pence per fully qualified lead, eight to fifteen seconds per fresh lead, daily cost under a coffee. The closest commercial equivalent is a sales-intelligence database licence plus the SDR hours to research each lead manually, which runs four to six figures a year and is never bespoke to the team's actual definition of a good prospect.

The second is a small research interface that answers commercial intelligence questions in three minutes, with sources, and ends each answer with the next move drafted from what it actually found. The job it replaces: log into four dashboards, export three CSVs, brief an analyst, wait two weeks. The bespoke version delivers the same answer with sources before the kettle boils, for pennies.

## The same logic, across the business

Prospecting is the easiest example, but the pattern generalises.

For pricing and product, you watch stock levels, variant launches and discount deploys across competitor sites in real time, in the tool the team already uses.

Due diligence becomes a full dossier on any acquisition target, ready before the first call. Industry research compresses regulator updates, analyst commentary, competitor announcements and trade press into a weekly brief.

And productised intelligence (building a tool or report from public data, the way Indeed built a company on aggregating public job adverts) is open to any small team that knows what to ask.

## The deeper unlock

Firecrawl lets you measure and compare things that were never measurable or comparable before.

Brand positioning against Reddit sentiment. Founder narrative against creator commentary. Pricing claims against market reaction. Website claims against customer reviews.

The advantage is not seeing more data. It is being able to compare signals that were never designed to sit next to each other.

## The new advantage

When everyone has access to more public information, the advantage isn't scraping everything. It is knowing which data matters.

The commercial edge moves to the criteria you choose, the signals you combine, the qualification logic you apply, and the questions you ask.

When public data becomes easier to access, the advantage moves to the business that knows what a good customer actually looks like.

## The strategic move

The next competitive advantage is not proprietary data. It is proprietary judgement applied to public data.

The lead list is no longer the asset. The qualification logic is. That logic defines who matters, why they matter, what signals prove they matter, how to prioritise them, how to approach them, and what commercial angle to lead with.

A sharp person on your team can build the working version in 48 hours once given the green light. The companies moving first build a compounding advantage. They will know more about their market in three months than competitors learn in three years.

## One question to take into this week

What does your business currently pay someone else to know about your market? A competitor tracking subscription, a prospect database, a sector report, a market intelligence platform. Pick one. Try answering the same question from inside the business: faster, cheaper, and shaped to questions only your team would think to ask.

The answer is going to be more interesting than you expect.

The open web is now this readable to your business, and to anyone reading you. That's article two.

# Article 2 — Your public profile is no longer your shop window

*It is your evidence layer.*

The same shift works in the other direction.

If the public web is becoming easier for businesses to read, then businesses, founders and professionals are becoming easier to read too. When AI can read the market, the market can read you.

For years, public profile was treated as a visibility exercise. Personal brand. Posting. Being seen. Networking. Marketing. Thought leadership. That framing now feels too small.

AI search is changing what public profile does. It is becoming the evidence layer that humans and machines use to decide whether your claims are credible.

A human can factor in a lot when assessing authority. A trusted referral. A meeting. A long-standing client relationship. A strong industry reputation. A warm introduction. Context from a shared network.

AI mostly sees public fragments. LinkedIn profile. About pages. Press mentions. Podcast transcripts. Event pages. Companies House. Articles. Client stories. Comments. Reviews. Search snippets. Old bios. Third-party references. Public posts. Then it tries to assemble a version of you.

Your reputation is increasingly being assembled from public fragments, whether you designed those fragments or not.

The obvious concern is that AI surfaces bad information. That is true, but it is not the most useful insight. The sharper risk for credible professionals is weak signal.

The future risk is not just that AI finds something bad about you. It is that AI cannot find enough good evidence to understand why you should be trusted.

I ran myself through Firecrawl. It found my LinkedIn, other people's posts about me, the Calm Authority about page. But it could not strongly substantiate every claim because there wasn't enough third-party evidence. The model wasn't saying the claim was false. It was saying the public web couldn't verify it strongly enough.

That is a system problem, not a personal one. And it is going to land on a lot of credible people.

Professionals can be genuinely credible and still be under-legible to the new discovery layer. Their authority lives in client relationships. Closed networks. Referrals. Internal reputation. Credentials. Track record. Trusted recommendations. Results clients never publish. All of those things still matter commercially. But AI search can't read most of them.

The new risk is not that professionals lack authority. It is that their authority is trapped somewhere AI cannot read.

Public content becomes the bridge.

Public content is not just distribution. It is not just posting more. It becomes the way private expertise gets translated into public proof. LinkedIn posts that show judgement. Articles that explain your thinking. Case studies that prove results. Press mentions that substantiate claims. Podcast appearances that capture expertise. Event pages that verify speaking work. Client stories that demonstrate impact. Owned pages that make positioning clear. Third-party references that corroborate authority.

Public content becomes authority transfer: the bridge between private expertise and machine-readable credibility.

This matters most for the people whose work is trust-led. Advisers, consultants, founders, senior experts. Trust is the product. But trust often lives offline. An adviser may have twenty years of judgement, deep client relationships, calm decision-making, family referrals, high retention, strong outcomes and a quiet reputation. If the public web only shows a generic firm bio and a dormant LinkedIn profile, AI has very little to work with.

That doesn't mean the adviser lacks authority. It means the authority hasn't been translated into public evidence.

AI discoverability isn't just about being found. It is about being understood correctly. That requires consistent positioning, specific claims, proof attached to claims, third-party corroboration, repeated themes, clear expertise markers and owned pages that explain context.

Once data was the moat. Then distribution was the moat. In trust-led markets, machine-readable authority is the next moat. The market does not just need to hear from you. It needs enough evidence to understand why you should be trusted.

The professionals who win will not just be the most credible in private. They will be the easiest to verify in public.`
  },
  {
    slug: "ai-adoption-value-gap",
    title: "AI adoption is high. Value is patchy.",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: ["AI adoption", "ROI", "workflows", "shadow AI", "operating models", "data quality"],
    source: "Rough Cut 6",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md",
    sourceStart: "## Slide 1: AI at Work in 2025 — Lots of Adoption, Not Much Effectiveness",
    sourceEnd: "## Slide 3: 2026 Predictions",
    readTime: "12 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "Adoption is high. Value is patchy.",
    preview:
      "Lots of activity at the edges. Very little wired into the operating system.",
    thesis: "If you can't answer those for even one area, you have experiments, not effective use.",
    metaTitle: "AI adoption is high. Value is patchy. | Studio Baggio",
    metaDescription: "Adoption is high. Value is patchy. High performers think in operating systems, not tools.",
    related: [
      "building-ai-operating-systems",
      "what-is-an-ai-skill",
      "firecrawl-for-business"
    ],
    sourceMarkdown: `## Slide 1: AI at Work in 2025 — Lots of Adoption, Not Much Effectiveness

Over the past few weeks there's been a flood of high profile reports on AI in the workplace. McKinsey, IBM, Salesforce, Microsoft, Ramp and others have all tried to answer the same question. Where are we really, as we head into 2026? To save you reading them all — here's the TLDR:

**Adoption is high. Value is patchy.**

Around 90% of firms say they use AI in some way, but around 75% are still stuck in pilot mode. On paper, AI adoption looks like a success story. Almost every organisation can tick the "we are doing something with AI" box. But the bar is low. When you ask, "where have we scaled AI into multiple functions with measurable impact", the pool shrinks fast. Lots of activity at the edges. Very little wired into the operating system.

**Action:** Stop asking "where are we using AI"? Instead ask *"where is AI so embedded we would feel pain if we turned it off"*. Pick one function and ask:
1. *"Which workflow, if we removed AI tomorrow, would meaningfully slow us down?"*
2. *"What is the single metric that proves it is working?"*

If you can't answer those for even one area, you have experiments, not effective use.

**There is a real profit gap.**

Roughly 75% of firms say AI is helping with innovation, but only 40% can see any impact on profit. Most workers say they feel more productive. However these personal time savings rarely show up as organisational value. Companies pay for licence and change programmes — the upside stays vague. AI that only speeds up tasks does not automatically move the profit needle. The firms seeing financial impact are the ones that have redesigned the work around what AI can do, rather than sprinkling it over existing steps.

**Action:** Ban "time saved" as a success metric. Pick a concrete outcome and commit to moving that: fewer failed pitches; faster time from brief to first cut; more campaigns shipped per quarter with the same headcount. Design your AI usage around shifting that outcome and track it properly. If you cannot tie AI use to a number your finance team cares about, you are still in "feels productive" territory, not effectiveness.

**Shadow AI is ahead of your governance.**

More than half of employees are using AI tools without formal approval. You should assume AI use in your organisation is higher than any official policy suggests. People use whichever tool gets past the firewall and use it to fix their own pain points. That is not automatically a problem. Often it is where the most useful experimentation lives.

The issue is that all of this sits outside your data strategy, security model and learning loop. You inherit the risk without capturing the insight. Knowledge stays with a handful of early adopters instead of becoming part of the operating system.

**Action:** Do not respond to shadow AI with a blanket ban. Channel it. Run a simple, high-trust audit: *"Which tools are you using, for what, and which actually help?"* Use the answers to find unofficial workflows that clearly add value and make them official. That is how you convert underground experimentation into shared capability without killing momentum.

## Slide 2: High Performers Think in Operating Systems, Not Tools

The organisations seeing real gains from AI were over 3x more likely to have redesigned their workflows around what AI can do, vs just adding tools on top.

This is the real dividing line. Most firms are in a tool first phase. They buy licences, bolt AI into existing processes, and struggle to see real impact. The organisations seeing meaningful gains have shifted to an operating system first mindset. They break down end to end workflows and rebuild them on the assumption that AI can handle large chunks of execution. Then add human checkpoints in at key stages and treat data and process as shared infrastructure.

**The real blocker is not models. It is the "data tax".**

Most Chief Data Officers now say AI is a top priority, but only a minority feel their data is clean enough to support AI driven revenue. The limiting factor now is rarely the power of the model. It is the state of data living in legacy systems, spreadsheets, shared drives, one off tools and old exports. Definitions are inconsistent. Ownership is unclear. Governance flips between too rigid and totally absent.

In that environment, it does not matter how clever your model is, you won't get high quality results. High performers are doing something that looks boring but is extremely effective. They are spending money on making their data boring: clean, structured, accessible, and ready to plug into multiple workflows.

**Action:** Pick one revenue linked area and pay the data tax there. Make one person clearly accountable for that data set. Standardise how it is captured and cleaned. Then put AI in the place where that data already lives. The goal is not perfect data across the whole company. The goal is one high value domain where data quality is no longer the excuse.

**Action:** Choose one workflow in 2026 and rebuild it properly: map the steps, decide where AI should sit by default, decide where humans are non-negotiable, and give it a single success metric. Make that your first real AI workflow, not your next pilot.

**End-of-year TLDR:**

If we zoom out, we've moved from the hype phase to the friction phase. Almost everyone now "uses AI". Very few do so effectively. Access is no longer the issue — it's messy data, shallow pilots and a lack of operating-system thinking.

Your advantage in 2026 won't come from buying more tools. It will come from a real understanding of what AI can and can't do well and an operating system 1st mindset.

---`
  },
  {
    slug: "what-is-an-ai-skill",
    title: "A skill is an app without a user interface",
    category: "AI Skills",
    categorySlug: "ai-skills",
    tags: ["AI skills", "prompts", "workflow packaging", "AI capability", "productisation", "launch systems"],
    source: "Rough Cut 8 Skills Special",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC8/RC8-content/Rough Cut RC8.md",
    sourceStart: "## Slide 2: What is a Skill?",
    sourceEnd: "Jayme Baggio - Views are my own",
    readTime: "14 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "The simplest way to think about a skill is as an app without a user interface.",
    preview:
      "A skill packages these elements to do a specific job reliably every time. It lets teams package useful capabilities before building a full software product.",
    thesis: "Unlike a prompt, a skill compounds.",
    metaTitle: "A skill is an app without a user interface | Studio Baggio",
    metaDescription: "The simplest way to think about a skill is as an app without a user interface.",
    related: [
      "ai-adoption-value-gap",
      "chatgpt-for-business-owners",
      "building-ai-operating-systems"
    ],
    sourceMarkdown: `## Slide 2: What is a Skill?

You will have heard more people talking about AI skills recently. They are going to be a theme for 2026.

The simplest way to think about a skill is as an app without a user interface.

It contains templates, workflows, logic, code and often access to tools, but instead of interacting with a webpage, you access it through a terminal or AI chat window.

A prompt is a one-off instruction. A system prompt sets the rules for how an AI should behave. A tool gives the AI a specific capability, like searching the web or calling an API.

A skill packages these elements to do a specific job reliably every time. It lets teams package useful capabilities before building a full software product.

Unlike a prompt, a skill compounds. Every refinement makes it more valuable. Over time, a strong skill library becomes a proprietary asset and a real advantage.

---

## Slide 3: /Last30Days Skill

That really hit home when I discovered Matt Van Horn's /Last30Days skill.

Last30Days is a research engine. You ask any question and it pulls live data from Reddit, X, YouTube and advanced web search, then synthesises it into a structured report in about 60 seconds.

It shows where consensus is forming, what is gaining traction and where trends are emerging, from the places those conversations are actually happening.

It has become one of the first things I run before a client conversation, a brief or a strategy session.

Every strategic decision is only as good as the information behind it. Much of the information people still rely on is outdated, expensive or guesswork dressed up as strategy. With Last30Days, you are no longer guessing.

You know which ads are converting on any platform, which tools people are using, what users are asking for in a category, and what content is performing best for a given audience.

The commercial value of a product like this is obvious. The challenge is making that value visible to a non-technical audience.

I wanted to show colleagues and friends what this looked like in a format they could engage with immediately. You cannot show someone a skill in Cursor and expect them to get it.

So a couple of weeks ago I built a simple miniapp inspired by the skill to make the output visible, usable and easier to assess.

It took about two hours to create a working prototype. It works well as an internal tool or proof of concept.

The rest of this issue follows the same idea: putting a face on some of the most useful skills I have come across to show what they are capable of, and why businesses are leaving opportunity on the table by not taking full advantage.

*The official /last30days skill now includes TikTok, polymarket, Instagram + others - so it's extremely comprehensive!

It's the first time I have felt a real gap emerge between the people who are capitalising on these capabilities and those who are not.

---

## Slide 4: From Skill to Product

Once you have a valuable skill, the next question is: What can you build around it?

A strong skill is not just a back-end capability. It can become the foundation for a product, a landing page, campaign assets, positioning, copy and launch materials.

This is the playbook I would run:

Start with the capability.
Turn it into something visible.
Package it clearly.
Position it properly.
Then build the assets that help people understand it, buy into it and share it.

---

## Slide 5: No 1 — Research

Research Prompt Template:

We are creating a /Last30Days-style research tool for [audience].

Define:
- Audience: [audience + revenue range + industry]
- Example: "2-10M SMBs in fintech struggling with AI adoption"
- What makes this different: [unique approach or methodology]
- Current state: [starting point]

Research goals:
- Market landscape and key competitors
- Customer pain points and positioning gaps
- Pricing models and service packaging
- Best practices worth repackaging for the target market

Tools for Research:
- Perplexity MCP: deep market research
- Brave Search: quick competitor lookups + Live information
- Firecrawl: competitor websites at scale
- Playwright: screenshots and pattern capture

The Golden Rule:
Cast a wide net. Gather deep context. 30 to 60 minutes of serious research improves everything that follows.

Save the output as .md files in your project folder.

Also research keywords and create your brand kit at this stage. You will need both later.

Once you have the research and context, you can stack from there.

---

## Slide 6: No 2 — Positioning Angles Skill

The positioning angles skill takes one product and generates multiple strategically different ways to talk about it.

Each angle comes with the logic behind it, the psychology it is tapping into, and the context in which it is most likely to convert.

This is not just generating hooks and hoping one lands.

It uses April Dunford's positioning method to clarify the real alternatives, differentiators and customer value. It uses Eugene Schwartz's market sophistication model to judge what kind of message the market is ready for. It uses Hormozi's value equation to anchor each angle in outcome, likelihood, speed and effort. It also draws on Todd Brown's unique mechanism thinking to explain why the promise should be believed.

It is then sharpened by the discipline of Halbert, Ogilvy, Hopkins and Kennedy.

The result is not vague creative output. It is a set of strategically different ways to position the same product, each grounded in positioning logic, buyer psychology and market awareness.

Behind these angles are frameworks such as market sophistication, unique mechanism, transformation mapping, contrarian positioning and competitive advantage framing. That is why the output feels strategic rather than generic.

---

## Slide 7: No 3 — Direct Response Copy Skill

Once you have your positioning angles nailed - you can use skills like /directresponsecopywriting to draw on frameworks built on the classical advertising masters, adapted for modern internet writing. Start with the landing page copy.

The Frameworks it draws from:

- Eugene Schwartz - Levels of Awareness: Know where the reader sits before you write.
- Claude Hopkins - Reason why copy. Do not just claim something works. Explain why.
- David Ogilvy: Headlines do the most work. Write like you talk. Show, don't tell.
- Gary Halbert - Find a starving crowd first. Write to one person, not an audience.
- John Caples - Self-interest beats cleverness. Curiosity alone is not enough. It needs to be paired with benefit.
- Joseph Sugarman - Every element has one job: get the reader to the next element.
- Robert Collier: Enter the conversation already happening in the reader's mind.

Best Used for:
Landing pages, email sequences, sales copy, headlines, cold outreach and social posts. Anything where conversion matters.

The core principle: Write like you are talking to a smart, sceptical friend. Back every claim with specifics. Make the transformation clear.

---

## Slide 8: No 4 — From Angles to Copy (Part 1)

The positioning angles skill defines the strategic frames.
The direct response skill turns those frames into persuasive copy.

That is why the output feels sharp. It is not guessing. It is built on positioning logic first, then translated into direct response language.

Decision Intelligence
Direct response logic: Turn weak market awareness into a business risk
Line: "Every business decision made without knowing what the market is saying right now is a guess dressed up as strategy."

Honest Research
Direct response logic: Use contrarian framing and specificity to challenge the old research model
Line: "The most valuable market intelligence has not been filtered through a survey, a focus group or an analyst deck."

---

## Slide 9: No 4 — From Angles to Copy (Part 2)

Democratisation / Paywall Enemy
Direct response logic: Name the enemy and make the cost of the old way concrete
Line: "40,000 a year and up before a single analyst logs in, and the output still needs human interpretation."

Unique Mechanism
Direct response logic: Handle the obvious objection by defining what the product is not, then what it is
Line: "Not a summary. Not a scrape. A defensible brief."

Secret Weapon
Direct response logic: Use competitive advantage and loss aversion to push action
Line: "The businesses acting on what the market is saying now are the ones that pull ahead. The ones that are not are already behind."

---

## Slide 10: No 5 — The Front End Design Skill

Once you have the research, positioning and copy in place, you can start shaping the interface around them. The Front-end design skill is most useful when working from a strong brief.

What makes front-end design skills so useful is speed and range. With a strong brief, they can generate multiple different landing page directions in a short space of time. That helps you choose a direction faster, compare very different styles against the same strategy, and test what performs best.

What improves the output:

1. References: If you know the style you're aiming for, feed in examples. The result is far stronger than leaving the model to guess. Use sites like Siteinspire, viewport UI & Dribble to capture image references and learn terminology.
2. Brand kit: Bring your colours, typography and brand voice with you.
3. Context: Research, positioning angles and landing page copy give the design direction and structure.

This is where /Last30Days is particularly useful. It can help surface landing page references, UI patterns and design styles worth exploring before you start building.

---

## Slide 11: Design Direction — Lando Norris-inspired

One of the strongest directions took inspiration from Lando Norris's website. It uses bi-directional marquee animation, fan-card layouts and parallax to create a more dynamic, archive-led feel.

---

## Slide 12: Design Direction — Bold, campaign-led

A higher-impact, more commercial direction. Strong hero imagery, sharp contrast and clearer calls to action make it feel more like a launch page for a media brand with a point of view.

---

## Slide 13: Design Direction — Premium editorial

Inspired by SheerLuxe, this version feels more polished, curated and magazine-led. Lighter layout, more white space and stronger issue discovery make it feel more premium and browseable.

---

## Slide 14: Design Direction — Forbes media kit-inspired

More authority-led and commercially polished, with sharper hierarchy, stronger type contrast and a clearer sense of Rough Cut as an established media property rather than just a newsletter.

---

## Slide 15: Design Directions — Forbes continued + Glassmorphic

Forbes media kit-inspired:
More authority-led and commercially polished, with sharper hierarchy, stronger type contrast and a clearer sense of Rough Cut as an established media property rather than just a newsletter.

Modern glassmorphic:
A more digital, interface-led direction with softer layering, depth and a more contemporary product feel. This version pushes Rough Cut closer to a modern media product or members platform than a traditional newsletter page.

---

## Slide 16: Design Directions — Glassmorphic + Brutalist + Cinematic

Modern glassmorphic:
A more digital, interface-led direction with softer layering, depth and a more contemporary product feel. This version pushes Rough Cut closer to a modern media product or members platform than a traditional newsletter page.

Brutalist / editorial manifesto:
Designed to feel sharper, more independent and more provocative, with stronger editorial tension and a more uncompromising point of view.

Cinematic / film-room:
Designed to feel more immersive and experience-led, using film-inspired UI cues to make Rough Cut feel like a world, not just a publication.

Each landing page design has been uploaded to one site for reference. You can scroll through them individually and see how the styles compare.

---

## Slide 17: No 6 — Launch Materials

Once you have the product, positioning, copy and landing page in place, you can shift to launch materials.

That can include email sequences, social copy, social graphics, lead magnets and even a launch video.

The /Last30Days video was built using Remotion - I'll do a deeper dive on that in a future issue - but for now, I've stopped at first pass because I set a hard limit on time spent here. It still makes the point that anyone can now create a strong product video by using AI skills to help bring the idea in your head to life.

Across this issue, I have taken one product through that full launch chain end to end. I took one skill, turned it into a product, built the positioning, translated that into copy, used that foundation to generate multiple landing page directions, and pushed it into launch materials.

That is the commercial advantage.

Businesses that know how to stack and build these skills can move from idea to market faster.

Businesses that are not using them are leaving value on the table.

Jayme Baggio - Views are my own`
  },
  {
    slug: "owned-vs-rented-audience",
    title: "The channels you rent can change overnight",
    category: "Owned Media",
    categorySlug: "owned-media",
    tags: ["owned audience", "AI search", "creator strategy", "distribution"],
    source: "Rough Cut 7",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - Voice Reference.md",
    sourceStart: "## Slide 2: Reuters Institute's Trends & Predictions 2026",
    sourceEnd: "## Slide 4: OpenAI Is Bringing Ads To ChatGPT",
    readTime: "6 min read",
    date: "2026-05-29",
    updated: "2026-05-29",
    summary: "Even if you're not a publisher, the lesson is the same: **the channels you rent can change overnight, so build one you own.**",
    preview:
      "Search referrals are expected to keep falling. Audiences are spending more time with creators and personality-led formats.",
    thesis: "The channels you rent can change overnight, so build one you own.",
    metaTitle: "The channels you rent can change overnight | Studio Baggio",
    metaDescription:
      "Even if you're not a publisher, the lesson is the same: the channels you rent can change overnight, so build one you own.",
    related: [
      "firecrawl-for-business",
      "ai-adoption-value-gap",
    ],
    sourceMarkdown: `## Slide 2: Reuters Institute's Trends & Predictions 2026

The Reuters Institute's Trends & Predictions Report is an annual survey-led read on where media leaders think the industry is heading. This year's message: Search is sending less traffic, platforms are keeping more users inside their own interfaces, and media businesses need to build stronger direct relationships with audiences.

**Headline Predictions:**

1) **Search referrals are expected to almost halve.** Media leaders expect search traffic to fall by 43% over the next three years as AI summaries and chat-style search reduce the need to click through to publisher sites.

2) **Publishers are being hit from two sides at once.** On one side, AI reduces clicks by answering the question upfront. On the other, attention keeps moving towards creators and personality-led formats, where audiences follow people and series, not pages.

3) **The middle gets squeezed first (the barbell effect).** You end up with two ends that hold value: Premium, distinctive, human-led work people actively seek out vs utility content produced efficiently at scale. *The hardest place to sit is the middle: routine reporting and generic service content that can be summarised, scraped, or replaced.*

4) **"Personalised briefings"** are becoming a normal way people consume news. More people will get their news through assistants that assemble and summarise what they need.

**What it means in practice:**
- Creator strategy is no longer a nice-to-have. 76% of publishers say they plan to encourage journalists to behave more like creators and build personal brands.
- This is not "do more socials". It's a distribution decision.
- If audiences can choose voices and formats directly, you're less exposed to whatever search or platform UX decides to prioritise.

Even if you're not a publisher, the lesson is the same: **the channels you rent can change overnight, so build one you own.**

**Example: SheerLuxe** have demonstrated how to execute on this strategy. SL was an email newsletter-1st, but they expanded into YouTube, social video and podcasts and put their people at the forefront of the product. Personalities become a route to distribution and that direct relationship compounds over time. They formalised it with BLUSH Talent MGMT, so the business participates in the commercial upside of employee influence — instead of treating it as a risk to manage. The market has just validated the model.

## Slide 3: What execs should do now

Future acquired SheerLuxe for £39.9m upfront, with total consideration capped at £80m based on future performance. Publishers can still build meaningful value, but it's coming from direct audience habits, recognisable voices, and formats people seek out on purpose.

- **Demote old-style SEO:** Keep it, but stop treating it as the growth engine. Put leadership focus on return paths you control: newsletters, podcasts, app experiences, membership, repeat viewing.

- **Plan for discovery through summaries and briefings.** Assume your work will be encountered through an AI layer.

- **Structure content so it survives that layer:** clear headlines, clear sourcing, strong "what it means," and a version that can travel (clips, charts, short explainers).

- **Invest in formats people choose directly.** Video, audio, and personality-led series build familiarity and loyalty. They are also harder to reduce into a single substitute answer.

- **Treat creator strategy as an operating decision with incentives.** If staff are building personal brands, decide the structure up front: what the company gets (distribution, series IP, loyalty), what talent gets (support, upside), and how you keep value in-house where it makes sense.

- **Build repeatable franchises, not one-off posts.** If links are weaker and feeds are noisier, repeatable formats win. Series create habit. Habit creates direct audience.

- **Diversify revenue away from page views.** Prioritise streams that don't depend on referrals: events, bundles that reduce churn, commerce, and premium products.

**The takeaway:**
Search referrals are expected to keep falling. Audiences are spending more time with creators and personality-led formats. More consumption will happen through personalised briefings. The practical response is not complicated: build direct audience habits, make formats people actively choose, and design a creator strategy that strengthens the business rather than sitting awkwardly beside it.`
  },
  {
    slug: "chatgpt-for-business-owners",
    title: "ChatGPT for Business Owners — If You Only Do 6 Things...",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: [
      "ChatGPT",
      "business owners",
      "AI operating system",
      "system prompts"
    ],
    source: "Rough Cut 7",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - All Issues & Playbooks.md",
    sourceStart: "## Slide 1: ChatGPT for Business Owners — If You Only Do 6 Things...",
    sourceEnd: "## Slide 2: Reuters Institute",
    readTime: "5 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Six practical ways business owners can make ChatGPT compound inside the way they work.",
    preview: "Build a Role Master Prompt so ChatGPT understands your business. Most people get generic answers because ChatGPT does not know who they are.",
    thesis: "Make it an Operating System.",
    metaTitle: "ChatGPT for Business Owners — If You Only Do 6 Things... | Studio Baggio",
    metaDescription: "Six practical ways business owners can make ChatGPT compound inside the way they work.",
    related: [
      "ai-adoption-value-gap",
      "building-ai-operating-systems",
      "what-is-an-ai-skill"
    ],
    sourceMarkdown: "## Slide 1: ChatGPT for Business Owners — If You Only Do 6 Things...\n\n1. **Build a Role \"Master Prompt\"** so ChatGPT understands your business. Most people get generic answers because ChatGPT doesn't know who they are. Get it to interview you (role, goals, audience, offers, constraints), then save that as your reusable \"master context doc\" you can add as a reference file in every project.\n\n2. **Run everything through Projects** so context compounds over time. Create a Project per department or goal. Upload your core reference docs, then keep all related chats inside that Project so the work gets sharper & more specific every time.\n\n3. **Turn the best outputs into System Prompts** (these are your IP). Iterate until you get the result you're looking for, then lock it in. Ask ChatGPT to reverse-engineer the output into a repeatable 'system prompt'. You should have: Email writing system prompt, LinkedIn post system prompt, Proposal system prompt, Award entry system prompt. Reuse these as templates for future work.\n\n4. **Build a simple OS dashboard.** Ask ChatGPT to build you a dashboard in Canvas: Main goals / projects, This month's desired outcomes, This week's non-negotiables. \"Live State snapshot\" text box with a 'build snapshot' button that generates a summary of the week from your inputs in the status sections. Favourite in your browser and use it as your control panel.\n\n5. **Make it an Operating System.** Update the dashboard noting what moved, then hit \"Build snapshot\" to generate a \"live Snapshot\". Copy your Master Prompt, live snapshot & this prompt into a new chat: *Using the Live State Snapshot pasted above + my Master Prompt, help me: Review what moved last week. Set 3x non-negotiables for next week. Flag anything I should stop doing or postpone for 30 days. Suggest 1x high leverage move I can complete in 45 minutes or less.* Let ChatGPT do the review & planning, then paste the next weeks non-negotiables into the dashboard so you can build momentum over time.\n\n6. **Productise your best prompts into Custom GPTs** or vibecode them into mini apps. Once a system prompt works reliably, turn it into a custom GPT & share it internally. That's how you scale your output without being the bottleneck, and how you make \"your way of working\" repeatable for others in your organisation."
  },
  {
    slug: "ai-future-of-work",
    title: "If your work happens on a screen, assume the shape of it is going to change",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: [
      "future of work",
      "AI literacy",
      "AI adoption",
      "automation"
    ],
    source: "Rough Cut 7.5",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - All Issues & Playbooks.md",
    sourceStart: "## Slide 1",
    sourceEnd: "---",
    readTime: "8 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "If your work happens on a screen, assume the shape of your job or business is going to change fast.",
    preview: "I do not get asked about AI much, which still surprises me. And when I do, I can usually feel how quickly people want the conversation to be over.",
    thesis: "If your work happens on a screen, assume the shape of your job or business is going to change fast.",
    metaTitle: "If your work happens on a screen, assume the shape of it is going to change | Studio Baggio",
    metaDescription: "A Rough Cut essay on why screen-based work, AI literacy and business capability are about to change fast.",
    related: [
      "ai-adoption-value-gap",
      "chatgpt-for-business-owners"
    ],
    sourceMarkdown: "## Slide 1\n\nI don't get asked about AI much, which still surprises me....\n\nAnd when I do, I can usually feel how quickly people want the conversation to be over.\n\nThe coverage is noisy. The tools change constantly. Most people already feel overloaded.\n\nStill, when it comes up, it tends to be with people I like. Smart friends. Founders. People who are good at what they do.\n\nThey'll say, \"How's your AI stuff going?\" and you can tell they're hoping for a one-line answer.\n\nSo I give them the polite version.\n\n'AI is moving fast. If you have real domain expertise, your output can jump in quality when you learn how to use the tools properly. I've never felt more creative. I can finally build what I had in my head.'\nI'll also add the reassuring line: 'AI won't replace humans. It'll be human plus AI. It'll become part of how we work.'\n\nThat's the polite version. The honest version is harder to say out loud.\n\nMy journey with AI started last August, and I still feel behind. I don't think anyone feels up to date. It moves too fast. The distance between an idea and a working prototype is collapsing. I know this because I've experienced it first-hand.\n\nLast September I tried to build an app that would add brand graphics to video assets. It was a steep learning curve. To get anything working, I had to understand databases, APIs, FFmpeg, and how the parts connect. My lack of technical knowledge was the bottleneck.\nToday, I could build a version of that in under an hour.\n\nNot because I became an engineer. Because more of the technical setup now happens quietly in the background.\n\nA few weeks ago I built a tiny app that receives my AI newsletters each day, lets me swipe through them tinder-style, and includes text-to-speech so I can listen as a podcast on the way to the tube. That took about three prompts.\nA year ago, I wouldn't have been able to do that at all.\n\n## Slide 2\n\nOnce you've seen what's possible, you start seeing automation everywhere.\n\nI no longer wonder if something is possible. I assume it is, and I start thinking about how I'd build it.\nI now have an 'AI setup' that covers work I would have had to spread across an accountant, a research function, and a CRM.\nI've also noticed I've stopped looking for software that does one specific task. More and more, I'd rather build a simple version myself that fits what I need.\n\nAnd that's the part that worries me.\nBecause the people doing those jobs often cannot see what's coming.\n\nSo why are so many people still dismissing it?\nA few misconceptions come up again and again.\n\nFirst: \"AI isn't that good.\"\nFor a lot of people, that opinion comes from one bad test. They tried it once in 2024, asked a generic question, got a generic answer, and decided that was the ceiling. Or they only use the free tier like a search engine and assume it reflects what the tools can really do. It doesn't.\n\nSecond: \"AI output is generic.\"\nAI output reflects your input. If your direction is vague, the output will be vague. If your direction is clear, the quality improves fast.\nThe Coca-Cola AI Christmas ad is a good example. It got a lot of hate. That wasn't a technology limitation. It was a weak ad. A poor creative decision is a poor creative decision, with or without AI.\n\nThird: \"You have to be technical.\"\nThis is the biggest barrier, because it stops people from starting.\nYou don't need technical skill. You need curiosity, reps, and the willingness to iterate until the output is usable.\n\nAnd starting now doesn't mean you're \"six months behind\". Yes, I can push further today because I understand more of what's happening. But the tools have changed.\nIn September, I had to stitch components together just to get a basic version of something working. That knowledge mattered then. The technology is moving so fast that a lot of it is already obsolete.\n\nSo if you're hesitating because it feels like too much to learn, you're thinking about it the wrong way. Start now, because the barrier is dropping.\n\n## Slide 3\n\nIf you start now, you can still learn the fundamentals while they're still visible.\n\n- Cost versus quality.\n- Speed versus accuracy.\n- Wrapper versus underlying capability.\n- How to set up a simple automation.\n- Why context matters more than clever prompting.\n\nThe people who learn those things now will be the ones who can lead with this technology inside a business. They'll be the ones who can choose the right tools, set the right expectations, and get reliable outcomes.\n\nIf you arrive once the barriers are gone and everything is hidden behind the scenes, you'll still be able to use AI, but you won't get the same chance to learn what goes into driving the best results.\n\nSo don't wait to start.\nNot because you're behind. Because you're early enough to learn the fundamentals while they still hold their value.\n\nNow the uncomfortable bit.\n\nMore and more, I can see roles that can be automated or radically restructured. That has nothing to do with whether people are good at what they do. It's because a lot of modern work centres around drafting, summarising, researching, analysing, rewriting, reporting.\n\nThese are the areas the tools are strongest, and they're getting better all the time.\nThis is why I believe the timeline is short.\n\nFrom where I sit, we have 6 to 12 months before the shift becomes undeniable. It will vary by sector, but the pressure is the same everywhere. Smaller, more adaptable businesses will produce better work with fewer people and shorter cycles. That becomes visible.\nThen it becomes unavoidable.\n\n## Slide 4\n\nFor leaders, what changes first is a capability gap inside the organisation.\n\nThey'll realise their workforce is strong at yesterday's tools, but not equipped for what's now available. They'll start to notice which employees become more valuable, and which become harder to justify. They'll see competitors shipping more, testing more, learning faster, often with smaller teams.\n\nSo what stays valuable?\n\nKnowing what good looks like, and being able to get there reliably. Clear direction. Accountability. Trust and relationships. Distribution. The ability to teach others how to use these tools properly. And the ability to implement change so the business actually improves, not just talks about AI.\n\nIf your work happens on a screen, assume the shape of your job or business is going to change fast.\n\nFor employees, the safest move is to become the person who can use these tools properly and show outcomes. Not because it's trendy. Because it makes you harder to replace and easier to promote.\n\nFor founders, it's the same shift in a different form. Smaller teams will ship faster, test more, and compete with companies that used to have far more resources.\n\nEither way, this is a moment to take your own positioning seriously.\n\nIf you take anything practical away from this,\n\nDo three things this week:\n\n1. Pay for ChatGPT Plus or the Claude Pro plan. Don't judge this from the free tier.\n\n2. Use ChatGPT or Claude once a day for seven days on something real. Iterate until you get a result you can use. Save the prompt and reuse it.\n\n3. Build one small thing. Use a tool like Lovable and create a simple app. Ask AI to help you refine the idea, hit 'build' and watch it come together in front of you.\n\nIf you do that, you won't just \"understand AI\". You'll understand what has changed.\n\nJayme Baggio - Views are my own"
  },
  {
    slug: "geo-generative-engine-optimisation",
    title: "Brands Lean into GEO For Visibility",
    category: "AI Search",
    categorySlug: "ai-search",
    tags: [
      "GEO",
      "AI SEO",
      "AI search",
      "brand visibility"
    ],
    source: "Rough Cut 2",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - All Issues & Playbooks.md",
    sourceStart: "## Brands Lean into GEO For Visibility",
    sourceEnd: "## Check Out: NotebookLM",
    readTime: "3 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Generative Engine Optimisation is becoming critical for brand discoverability.",
    preview: "Brands like LinkedIn, Mars & Arla are adopting strategies to stay visible in AI answer engines - ChatGPT & Google AI Overviews.",
    thesis: "Traditional SEO is no longer enough.",
    metaTitle: "Brands Lean into GEO For Visibility | Studio Baggio",
    metaDescription: "Generative Engine Optimisation is becoming critical for brand discoverability as behaviour shifts from search engines to AI-driven recommendations.",
    related: [
      "ai-seo-framework",
      "firecrawl-for-business",
      "owned-vs-rented-audience"
    ],
    sourceMarkdown: "## Brands Lean into GEO For Visibility\n\nBrands like LinkedIn, Mars & Arla are adopting strategies to stay visible in AI answer engines - ChatGPT & Google AI Overviews. Generative Engine Optimisation (GEO) or simply AI SEO - is becoming critical for brand discoverability. Agencies are responding too - Ogilvy ANZ just launched 'Generative Impact' with Semrush, a service combining earned media and AI-optimised content to counter falling traffic from traditional search.\n\n**Why it matters:** As behaviour shifts from search engines to AI-driven recommendations, traditional SEO is no longer enough. Early GEO adopters secure a major \"share of voice\" advantage while competitors lag.\n\n**Actionable takeaway:** Audit your brand's visibility in AI answer engines. Media owners should pitch outlets with AI partnerships now and track citation share-of-voice."
  },
  {
    slug: "ai-seo-framework",
    title: "AI SEO Framework",
    category: "AI Search",
    categorySlug: "ai-search",
    tags: [
      "AI SEO",
      "GEO",
      "AI search",
      "landing pages"
    ],
    source: "RC AI SEO Framework PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Future Ideas/RC AI SEO Framework.pdf",
    sourceStart: "AI SEO Framework",
    readTime: "4 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "A tactical framework for building visibility around AI search and AI-assisted buying journeys.",
    preview: "Intent-mining through AI search. Run your product category through ChatGPT, Gemini, and Perplexity and note every question they surface.",
    thesis: "AI search becomes a quiet distribution engine.",
    metaTitle: "AI SEO Framework | Studio Baggio",
    metaDescription: "A tactical framework for building visibility around AI search and AI-assisted buying journeys.",
    related: [
      "geo-generative-engine-optimisation",
      "firecrawl-for-business",
      "chatgpt-for-business-owners"
    ],
    sourceMarkdown: "# AI SEO Framework\n\n1. Intent-mining through AI search. Run your product category through ChatGPT, Gemini, and Perplexity and note every question they surface. Build landing pages that answer those questions with extreme clarity.\n\n2. AI search. Run your entire category through ChatGPT, Gemini, and Perplexity and list every question the models surface. Then create landing pages that answer those questions clearly. AI search becomes a quiet distribution engine.\n\n3. Make your product embedded in a framework. Create a 5-step tactical playbook that solves a common pain in your market, and place your SaaS as one step inside the system. People adopt tools embedded inside frameworks. I think frameworks travel farther than features.\n\n4. Build a “coaching layer” on top of your product. Overlay AI guidance that teaches users how leaders in their role operate. A product that teaches while solving becomes a habit, and habits create highly engaged early users.\n\n5. “Best Of” industry directories. Build top 100 lists for every niche in your industry. SEO goldmine.\n\n6. Gamify everything. Onboarding, referrals, feature unlocks. Users compete, you grow.\n\n7. Workflow teardown series. Pick one real company each week and rebuild a broken process using your product. Operators share these because they learn from them.\n\n8. Job change targeting. Target people who just changed roles in your category and send them a workflow for their new job. Fresh hires influence tool selections."
  },
  {
    slug: "building-ai-operating-systems",
    title: "Building AI Operating Systems in 2026",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: [
      "AI operating systems",
      "AI adoption",
      "marketing leaders",
      "human in the loop"
    ],
    source: "Downloaded PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Downloaded source PDFs/Building AI Operating Systems in 2026.pdf",
    sourceStart: "BUILD INCLUSIVE AI OPERATING SYSTEMS IN 2026",
    readTime: "8 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "For success in 2026, your AI operating system needs stance, stack and spine.",
    preview: "Most of us have spent the year treating AI like an intellectual exercise. Hiding behind policy & debate is no longer productive.",
    thesis: "For success in 2026- your AI operating system needs three things: Stance, Stack and Spine.",
    metaTitle: "Building AI Operating Systems in 2026 | Studio Baggio",
    metaDescription: "A practical framework for building AI operating systems around stance, stack and spine.",
    related: [
      "ai-adoption-value-gap",
      "chatgpt-for-business-owners"
    ],
    sourceMarkdown: "# Building AI Operating Systems in 2026\n\n## THE REAL QUESTION:\n\nMost of us have spent the year treating AI like an intellectual exercise. We’ve heard from regulators, platforms, policy bodies & ethics committees. We’ve seen multiple drafts of copyright and IP guidelines. When things are moving this fast, it’s understandable that many of us prefer to wait for somebody else to tell us what the rules are.\n\nHiding behind policy & debate is no longer productive.\n\nAI is already in our workflows. The way content is made has already changed. So the real question is simple:\n\nWhat are you changing in how you operate so you take advantage of this shift-rather than be overtaken by it?\n\n## THE OS IN ONE VIEW:\n\nFor success in 2026- your AI operating system needs three things:\n\nSTANCE\n\nWhat you believe and protect.\n\nSTACK\n\nHow AI lives in your organisation & whose judgement you choose to scale.\n\nSPINE\n\nThe diverse human judgement at the centre of that system.\n\n## STANCE:\n\nYou cannot outsource your stance on AI to regulators, platforms or holding company committees. Rules differ by market. Platforms move quickly. There is no stable baseline for what responsible use looks like day to day. That is not going to resolve neatly any time soon. If you wait for a perfect rulebook, braver competitors will set the norms and the work will move without you. So Action 1 is simple & concrete →\n\n## ACTION 1: SET YOUR STANCE:\n\nBy January, your organisation should have a 1x page AI stance, in plain English, that your teams can summarise out loud:\n\nWhat is encouraged.\n\nWhat is off limits.\n\nWhat is always protected.\n\nYour stance should be tight on principles, loose on tools.\n\nYou set the non-negotiables. BUT Inside that guardrail, your teams have permission to explore & use the tools that fit their process.\n\nIf your stance is so vague or restrictive that people are scared to touch anything, you are not protecting the organisation.\n\nYou are gifting the advantage to people who are willing to lead.\n\n## STACK:\n\nExecution is becoming infrastructure.\n\nTools like Pomelli, AdCreative, Typeface & others, will produce a brand DNA from just a URL, then create campaign ideas and Ad creative in a matter of minutes.\n\nThe individual tools are not the point. The Signal is.\n\nOnce a brand is established, a large slice of execution can now be automated.\n\nThat pushes your role & your value higher up the stack.\n\nIf a labs tool can get a brand to ¾ of the way there in 90 secs, you need a very clear answer as to why clients still need you in the room.\n\n## STACK: FIND YOUR VALUE GAP\n\nThat answer is not ‘stronger copy’ or ‘nicer visuals’. It is;\n\nInsight, strategy Taste, Brave ideas.\n\nResponsible Framework Automation + Creative Direction\n\nand the discipline to protect communities from narrow casting & lazy stereotypes.\n\nClients expect AI enabled efficiency as standard- but they still need partners who can deliver speed with creative judgement & reliability.\n\nThose who can deliver automation + creative direction inside a clear Responsible framework will WIN BRIEFS & RETAIN TRUST.\n\nSo don’t view these tools as competition. View them as infrastructure to test.\n\n## ACTION 2: FIND YOUR VALUE GAP\n\nTest the infrastructure and find your value gap.\n\nRun new tools on a brand you know well.\n\nCompare the output to what your team would normally deliver.\n\nIdentify the gap where your judgment changes the direction.\n\nThat gap is where your value sits, That’s the part you need to double down on.\n\n## STACK: HUMAN IN THE LOOP\n\nAI raises the floor. The human in the loop raises the roof.\n\nIf you want AI to improve representation rather than quietly distort it, your human quality layer has to be;\n\nExplicit, Visible Diverse.\n\nWho checks for meaning risk & representation & at what stage of the process? Are they equipped & culturally fluent enough to carry that responsibility?\n\nYour human in the loop defines what your organisations output looks like in an AI System. They should reflect the audience you’re trying to reach.\n\n## ACTION 3: TURN “HUMAN IN THE LOOP” INTO A VISIBLE ASSET.\n\nTurn your ‘Human in the loop’ into an asset clients can see & Trust.\n\nBuild a 1x page, ‘responsible by design’ checklist, inc:\n\n• Where AI is used.\n• Where a named human intervenes.\n• What they check for: Quality, risk, representation.\n\nThe people whose judgement you scale must be diverse, visible and equipped to judge what is inclusive.\n\nThat is where your stack meets your spine.\n\n## SPINE: BUILD A HYBRID CORE\n\nAI is redefining who is most valuable.\n\nYour hybrid talent will be your most important asset in 2026:\n\nDomain Expertise + Technical Literacy\n\nPeople who combine domain expertise + technical literacy, and use AI to widen their range, rather than flatten it.\n\nName your future AI spine. Identify the A players whose judgement you trust.\n\nMake it explicit that their job is to become hybrids, not spectators.\n\nIf they cannot adapt, you will need to look elsewhere to find that talent.\n\n## ACTION 4: BUILD OPERATING SYSTEMS AROUND YOUR A+ PLAYERS\n\nThe biggest advantage you can give yourself is to turn your best people into an operating system that can scale.\n\nOutline with them:\n\n• What they never do manually again.\n• What they always review.\n• How their best calls are captured in systems that can scale.\n\nYou are leveraging their expertise in a repeatable system to scale high quality inclusive output.\n\nMake that cohort deliberately diverse.\n\nIf you only scale one type of expert you only scale one type of perspective.\n\n## SPINE: FROM THEORY TO PRACTICE\n\nYour spine is also your willingness to move from theory to practice while the ground is still moving under your feet.\n\nTo say:\n\nThis is new for everyone.\n\nWe’re going to put these tools into real work,watch what happens,and feed that back into our Stance and our Stack.\n\nYou cannot credibly lead on AI from a safe distance.\n\nYou will learn more in half a day of using these tools in your own context than you will from another summit or panel session.\n\n## ACTION 5: LEADERSHIP IMMERSION\n\nThis week, pick a live brief & produce a rough cut of an ad using the tools available to you-not just the ones that have made it through your IT department.\n\nGenerate images, create video coverage & use ChatGPT to outline the workflow, refine prompts & help when you get stuck.\n\nCapture what you learn on 1x page:\n\nWhere do the tools break? Where are the opportunities?\n\nWhere was human judgement non-negotiable?\n\nUse that page, not an external case study, as shared training for your teams on both craft & inclusion.\n\nThis exercise will give you agency & perspective- which alone get you 90% of the way there.\n\n## EXECUTIVE CHECKLIST FOR ADVERTISERS\n\nBy the end of Q1, you should be able to say:\n\n1.We have a clear AI stance that everyone can explain.\n\n2.We have tested the new infrastructure & know exactly where our value sits.\n\n3.Our human in the loop is a documented asset not a vague principle.\n\n4.We have named & backed our AI spine across creative, strategy, media and insight.\n\n5.Our leaders have used the tools hands on & have turned that into training.\n\nThis is the operating system that will decide who leads as AI becomes standard across the industry.\n\nIn a year’s time, everyone in this industry will have access to roughly the same tools. The difference will be:\n\nSTANCE\n\nWho set a clear Stance and backed their principles.\n\nSTACK\n\nWho accepted that Execution is becomming Infrastructure & shifted their value up the stack?\n\nSPINE\n\nWho built a spine of diverse human judgement around their best people and had the courage to put it to work?"
  },
  {
    slug: "ai-predictions-2026",
    title: "2026 Predictions",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: [
      "AI predictions",
      "2026",
      "future of work",
      "AI media"
    ],
    source: "Rough Cut 6",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - All Issues & Playbooks.md",
    sourceStart: "## Slide 3: 2026 Predictions",
    sourceEnd: "## Slide 5: Tools of the Year 2025",
    readTime: "5 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Predictions for how AI-led firms, AI literacy, media, voice and human connection shift in 2026.",
    preview: "AI led firms win: Companies that redesign processes around what AI can do - with humans focused on oversight and creativity, massively outperform those that bolt AI onto old workflows.",
    thesis: "AI led firms win.",
    metaTitle: "2026 Predictions | Studio Baggio",
    metaDescription: "Predictions for how AI-led firms, AI literacy, media, voice and human connection shift in 2026.",
    related: [
      "best-ai-tools-2025",
      "ai-future-of-work",
      "building-ai-operating-systems"
    ],
    sourceMarkdown: "## Slide 3: 2026 Predictions\n\n- AI led firms win: Companies that redesign processes around what AI can do - with humans focused on oversight and creativity, massively outperform those that bolt AI onto old workflows. The gap between those who led early and those who dithered widens.\n- Skills, not titles = most valuable: Hiring & progression move toward skills portfolios and fluid roles, with AI literacy, data fluency, and change-navigation becoming baseline expectations.\n- Personalised education sees university applications drop sharply: Students learn faster from AI tutors & the chances of getting an entry level job are slim. Proving your worth with AI start ups before entering workplace higher up the ladder with tech literacy & real AI director creds becomes the ambition.\n- The fastest wealth creation path in 2026: Spotting assets mispriced because people underestimate AI's speed. Entire markets move before the public notices.\n- Agent-run media companies appear: Daily shows, newsletters, and channels where one human editor supervises AI agents that research, write, and distribute content at scale.\n- Google vs OpenAI: distribution beats IQ: Google will claw back market share from OpenAI not with a better model, but with better real estate & frictionless integration. The extra 5% intelligence of GPT-5 won't matter to the average user. Convenience & familiarity are worth a lot when it comes to the mass adoption play.\n- Anthropic wins the coding war and becomes the place for top 1% power users.\n- The YouTube moment for 'vibe coding': Just as YouTube made video creation & distribution accessible, vibe-coding tools make software creation accessible to non-coders. We have our first totally non-technical multi-million pound+ apps and vibecoders become the new 'creators' of the moment.\n- Entertainment goes infinite: Netflix lets you continue cancelled shows just for yourself. AI generates new episodes of The Office or Friends dynamically based on your mood.\n- Meta Vibes Flop: Zuckerberg integrates \"Meta Vibes\" (AI video generation) into Instagram. It flops because people don't want AI content in personal feeds.\n\n## Slide 4: 2026 Predictions (continued)\n\n- XTwitterGames: Musk/xAI releases a tool allowing users to build and play video games directly inside the X feed. It's popular initially, then fades.\n- Sora turns into a social player & positions itself as a major competitor to both social & streaming platforms. Create, publish, discover, remix.\n- Massive backlash and craving for connection. People crave genuine human connection, leading to a rise in 'dumb phones' and IRL experiences.\n- \"AI-free\" becomes the new organic: \"made by humans\" becomes a premium signal, not because it's better, but because people crave human imperfection again.\n- Human-in-the-loop becomes a luxury feature: customer support is 99% AI. Talking to a real human becomes a platinum-tier upsell.\n- The rise of \"authentic\" influencers: influencers prove they're human. Verification shifts from blue checks to \"human-generated\" badges.\n- The rise of analog status: analog becomes the flex. Film cameras, handwritten notes, acoustic instruments rise because they signal something AI can't fake: friction.\n- Zero AI platform & return of the invite-only web: A new platform strictly bans AI, likely disallowing video uploads or editing entirely, forcing raw, real-time moments.\n- Death of the keyboard and the transition over to voice being your primary method of input.\n- Hyper-personalised everything: media, shopping, health all become more tailored as agents customise feeds, offers, and micro-interventions by default.\n- AI glasses hit the third iteration - goes mainstream, and drops into accessible pricing. They become a default must have tech accessory.\n- Waymo comes to the UK - There are teething problems with roundabouts."
  },
  {
    slug: "best-ai-tools-2025",
    title: "Tools of the Year 2025",
    category: "AI Skills",
    categorySlug: "ai-skills",
    tags: [
      "AI tools",
      "ChatGPT",
      "Perplexity",
      "NotebookLM",
      "Lovable"
    ],
    source: "Rough Cut 6",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Rough Cut - All Issues & Playbooks.md",
    sourceStart: "## Slide 5: Tools of the Year 2025",
    sourceEnd: "# RC7 — January 2026",
    readTime: "4 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "A practical 2025 AI tool list covering research, building, writing, design, video and workflow tools.",
    preview: "ChatGPT: The anchor behind everything. Use it for: Strategy, mapping process, learning new skills, building in real time, structuring content & weekly non-negotiables.",
    thesis: "The anchor behind everything.",
    metaTitle: "Tools of the Year 2025 | Studio Baggio",
    metaDescription: "A practical 2025 AI tool list covering research, building, writing, design, video and workflow tools.",
    related: [
      "chatgpt-for-business-owners",
      "what-is-an-ai-skill",
      "building-ai-operating-systems"
    ],
    sourceMarkdown: "## Slide 5: Tools of the Year 2025\n\n- **ChatGPT:** The anchor behind everything. Use it for: Strategy, mapping process, learning new skills, building in real time, structuring content & weekly non-negotiables.\n- **WhisperFlow:** AI transcription assistant - press a hot key to chat to everything on your phone or laptop. ~3x productivity boost from speaking vs typing.\n- **Perplexity:** The fastest way to get context driven research across the most reliable & widest range of sources.\n- **NotebookLM:** Get a solid understanding of large amounts of complex material quickly & turn the TLDR into publishable outputs.\n- **Gemini + Google AI Studio:** The multi media timesaver. Turn one asset into 15 more.\n- **Figma:** The best way to work on shotlists, outline workflows & find inspiration for UI concepts.\n- **Calm Authority.ai:** Best new AI writing tool. Helps you draft credible, consistent output in your own voice. *Still in closed beta.*\n- **Krea.ai:** Image & video generation with multiple models & multiple outputs.\n\n## Slide 6: Tools of the Year 2025 (continued)\n\n- **Relay.app:** The most beginner-friendly way to build simple agents with human-in-the-loop approvals.\n- **Canva:** High-quality design with everything you could possibly need in 1x place.\n- **Descript:** Editing video by editing a transcript is still the most practical time-saver.\n- **Opus Clip:** The strongest clip selection for turning long-form into short-form.\n- **Gamma:** Presentations that look super professional from the outset.\n- **YouTube:** The most underrated AI workflow tool. Library of AI knowledge.\n- **Speechify:** Transfer anything written into your own personal podcast.\n- **Lovable.dev:** Vibe coding real deployable apps with no code.\n\nJayme Baggio - Views are my own\n\n---"
  }
];

export const featuredInsight = insightArticles[0];

export function getInsightBySlug(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}

export function getRelatedInsights(article: InsightArticle) {
  return article.related
    .map((slug) => getInsightBySlug(slug))
    .filter((related): related is InsightArticle => Boolean(related));
}

export function getInsightPath(article: Pick<InsightArticle, "slug">) {
  return `/insights/${article.slug}`;
}

export function getInsightOpeningParagraphs(article: Pick<InsightArticle, "sourceMarkdown">, count = 2) {
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length) {
      paragraphs.push(currentParagraph.join(" "));
      currentParagraph = [];
    }
  };

  for (const line of article.sourceMarkdown.split("\n")) {
    const trimmed = line.trim();
    const isListItem = /^(-|\d+\.)\s+/.test(trimmed);

    if (!trimmed) {
      flushParagraph();
      if (paragraphs.length >= count) {
        break;
      }
      continue;
    }

    if (trimmed === "---" || /^#{1,6}\s/.test(trimmed) || /^\*\*[^*]+:\*\*$/.test(trimmed)) {
      flushParagraph();
      if (paragraphs.length >= count) {
        break;
      }
      continue;
    }

    if (isListItem) {
      flushParagraph();
      paragraphs.push(trimmed);
      if (paragraphs.length >= count) {
        break;
      }
      continue;
    }

    currentParagraph.push(trimmed);

    if (paragraphs.length >= count) {
      break;
    }
  }

  flushParagraph();

  return paragraphs.slice(0, count);
}

export function getInsightPreviewText(article: Pick<InsightArticle, "sourceMarkdown">, count = 2) {
  return getInsightOpeningParagraphs(article, count).join("\n\n");
}
