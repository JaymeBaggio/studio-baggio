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
    title: "Firecrawl just gave any business access to 96% of the web:",
    category: "Commercial Intelligence",
    categorySlug: "commercial-intelligence",
    tags: ["Firecrawl", "public web", "lead intelligence", "market intelligence", "AI search", "public proof"],
    source: "Rough Cut 9 final PDF",
    sourcePath: "/Users/jaymebaggio/Downloads/roughcut rc9.pdf",
    sourceStart: "Firecrawl just gave any business access to 96% of the web:",
    readTime: "9 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "If you haven’t heard of Firecrawl yet, put it on your radar.",
    preview: "If you haven’t heard of Firecrawl yet, put it on your radar. Firecrawl is an API (a connector) which, when plugged into Codex or Claude- allows you to access 96% of the open web and return it in a format AI can read.",
    thesis: "Public footprint is now part of how a business gets qualified.",
    metaTitle: "Firecrawl for Business: Access 96% of the Web | Studio Baggio",
    metaDescription: "If you haven’t heard of Firecrawl yet, put it on your radar.",
    related: [
      "owned-vs-rented-audience",
      "ai-adoption-value-gap",
    ],
    sourceMarkdown: "# Firecrawl just gave any business access to 96% of the web:\n\nIf you haven’t heard of Firecrawl yet, put it on your radar.\n\nFirecrawl is an API (a connector) which, when plugged into\nCodex or Claude- allows you to access 96% of the open\nweb and return it in a format AI can read.\n\nYou can now scrape every competitor’s website, pull out their pricing models, &\nanalyse how they position themselves in the market. You can find out-who’s\nspending in which sectors- as well as how much. Performance metrics, who’s offer is\nstrongest against any criteria, which prospects are worth pursuing based on your\nown specific ICP- You can even search every two-bedroom flat in London and build a\nlive property database around any given criteria.\nFirecrawl enables you to find all publically available\ninformation on any practitioner in any niche, assess\ntheir public profile, then rate them against a quality\nframework your business has defined.\nWhat used to sit across the likes of Salesforce,\nTubular, a prospect database or a research agency\ncan now be accessed in seconds, for pennies a queery\nand its made parts of the old intelligence market\nsuddenly look distinctly exposed.\nWhen just last week we saw Salesforce’s own\nMarc Benicoff announce their own API ‘connector’- it’s clear the direction we’re\nheaded in- Bespoke curation of data and a collapse in cost and speed of\ncommercial intelligence.\nWhat stikes me is the ease with which this is accessible. Copy one API key into Claude\nor codex and you now have a purpose built dashboard plugged into every piece of\ninformation publicly available- live.\nIn real Terms:\nThere is now near zero barrier to entry for anybody to launch a\nvertical saas for any niche; Aim Firecrawl at job boards &\ncareer pages- you have built a niche Indeed. Add\nscrapecreators or supadata & you have “Tubular for fitness\ncreators” or “Rephonic for B2B podcasters” in under an\nhour- without any company wide data engineering project.\nFirecrawl makes it easier to build a niche data company.\nBut it also makes the niche data company easier to replace.\nIf a product is just public web data, AI classification & a\ndashboard, then the buyer won’t need to buy it for long. It\nbegs the question “Why would we pay for a genralised view of\nthe market when we can build a private view of the market\naround our own priorities?”\n\nSalesforce & HubSpot are not replaced overnight, but the manually maintained CRM,\ndoes now start to look like a pre-AI artefact. An old-school CRM told you who made\nan enquiry, clicked on an AD, signed up to your newsletter.\nThe new era lead tracker pulls public information about any person or company, then\nqualifies them against a rubric your business defines. Do they fit the ICP? Do they\nhave budget? What did their CEO post on LinkedIn this week? Are they a standard\ncommercial opportunity or a reputation play?\nThe output becomes a rationale & a recommended angle for approach. It starts to\nlook a lot less like a leads trakcer and a lot more like a prospecting machine.\nExample: A production company working with brands to help scale their owned &\noperated platforms.\nThey can now find out which brands are spending heavily on creator marketing; Of\nthose- which have underdeveloped owned channels? Which brands are growing on\nTiktok but haven’t yet managed to extend to longer form on YouTube? Which\ncategry has unoccupied whitespace ready for the redbull of that sector to fill the\ngap?\n\nNow you are not just looking at brands with budget. You are looking at brands with\nbudget, category literacy and a visible gap your business is positioned to fill.\nWhat does this mean for businesses?\n  If your company is looking at a stale dashboard built around someone elses view\n  of the market, you are now at a distinct disadvantage versus those with hands\n  and eyes on the whole of the internet.\n  When access to data is this easily accessible the onus shifts towards\n  understanding what to do with it. More data only helps if the business has a\n  sharp enough filter- vague thinking just became a lot more expensive. The\n  more data you can access, the more important a clear ICP, positioning and sharp\n  qualification criteria become.\n  If your business can use public data to qualify the market, the market can use\n  public data to qualify your business.\n\nPublic footprint is now part of how a business gets qualified.\nAs public data becomes easier to analyse, unclear positioning and weak public\nproof become harder to hide.\nYour website, SEO, case studies, press, reviews & public content need to give\nbuyers, partners & AI systems enough evidence to understand what you do\nand why you are credible. A strong digital footprint becomes a stronger\nqualification metric.\nA thin website, poor search presence, limited proof and weak third-party\nevidence make the business harder to understand and easier to discount.\nA business may have strong clients, strong results and a solid offline reputation.\nBut if those signals are trapped in private conversations, they are harder for new\nbuyers to verify and harder for AI systems to qualify- which becomes a real\ncommercial risk.\nThat applies to businesses and\nindividuals- There is another side to\nthis shift.\nIf public data can be used to qualify\nthe market, it can also be used to\nqualify you.\n\nThat changes the value of public\nprofile. If Firecrawl can be used to\nqualify prospects, then every\nprospect ’s public footprint becomes\npart of how they are assessed. AI\nsearch assesses whether the public\nweb can substantiate you. Your public\nprofile is now not only your shop\nwindow, it ’s your evidence layer.\n\nThe flip side of exposure is under-evidence. The new risk is not that professionals\n.lack authority. It is that their authority is trapped somewhere AI cannot read.\nMany professionals are credible in ways AI can’t surface- client relationships,\nclosed networks, warm introductions &internal reputation, Those things still\nmatter- but they don’t automatically transfer into AI search.\nPublic content is not just distribution. It’s is how private expertise becomes\nvisible, readable and verifiable. That means LinkedIn posts that show judgement,\narticles that explain thinking, case studies that prove results, press mentions that\nsubstantiate claims, podcast appearances, they all matter more than they ever\nhave previously.\nThe professionals who win in the next few years will not just be the most credible\nin private. They will be the easiest to verify in public."
  },
  {
    slug: "ai-adoption-value-gap",
    title: "AI adoption is high. Value is patchy.",
    category: "AI Adoption",
    categorySlug: "ai-adoption",
    tags: ["AI adoption", "ROI", "workflows", "shadow AI", "operating models", "data quality"],
    source: "Rough Cut 6 final PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC6/ROUGH CUT RC6 Dec Final (LinkedIn Carousel).pdf",
    sourceStart: "AI at work in 2025. Lots of adoption. Not much effectiveness.",
    sourceEnd: "Ramp – Business AI adoption flatlines",
    readTime: "8 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "AI at work in 2025. Lots of adoption. Not much effectiveness.",
    preview: "Over the past few weeks there’s been a flood of high profile reports on AI in the workplace.",
    thesis: "Your advantage in 2026 won’t come from buying more tools.",
    metaTitle: "AI adoption is high. Value is patchy. | Studio Baggio",
    metaDescription: "AI at work in 2025. Lots of adoption. Not much effectiveness.",
    related: [
      "building-ai-operating-systems",
      "what-is-an-ai-skill",
      "firecrawl-for-business"
    ],
    sourceMarkdown: "# AI adoption is high. Value is patchy.\n\nAI at work in 2025. Lots of adoption. Not much effectiveness.\n\nOver the past few weeks there’s been a flood of high profile reports on AI in the workplace.\nMcKinsey, IBM, Salesforce, Microsoft, Ramp & others have all tried to answer the same question.\nWhere are we really, as we head into 2026? To save you reading them all- here’s the TLDR:\nAdoption is high. Value is patchy.\nAround 90% of firms say they use AI in some way, but around 75% are still stuck in pilot\nmode. On paper, AI adoption looks like a success story. Almost every organisation can\ntick the “we are doing something with AI” box. But the bar is low. When you ask, “where\nhave we scaled AI into multiple functions with measurable impact”, the pool shrinks fast.\nLots of activity at the edges. Very little wired into the operating system.\nAction: Stop asking “where are we using AI”? Instead ask “where is AI so embedded we\nwould feel pain if we turned it off”. Pick one function and ask:\n   1. “Which workflow, if we removed AI tomorrow, would meaningfully slow us down?”\n   2. “What is the single metric that proves it is working?”\nIf you can’t answer those for even one area, you have experiments, not effective use.\nThere is a real profit gap.\nRoughly 75% of firms say AI is helping with innovation, but only 40% can see any\nimpact on profit. Most workers say they feel more productive. However these\npersonal time savings rarely show up as organisational value. Companies pay for licence\n& change programmes-the upside stays vague. AI that only speeds up tasks does not\nautomatically move the profit needle. The firms seeing financial impact are the ones that\nhave redesigned the work around what AI can do, rather than sprinkling it over existing steps.\nAction:\nBan “time saved” as a success metric. Pick a concrete outcome & commit to moving that: fewer\nfailed pitches; faster time from brief to first cut; more campaigns shipped per quarter with the same\nheadcount. Design your AI usage around shifting that outcome and track it properly. If you cannot tie\nAI use to a number your finance team cares about, you are still in “feels productive” territory, not\neffectiveness.\nShadow AI is ahead of your governance.\nMore than half of employees are using AI tools without formal approval. You should assume AI use in\nyour organisation is higher than any official policy suggests. People use whichever tool gets past the\nfirewall and use it to fix their own pain points. That is not automatically a problem. Often it is where\nthe most useful experimentation lives.\nThe issue is that all of this sits outside your data strategy, security model & learning loop. You inherit\nthe risk without capturing the insight. Knowledge stays with a handful of early adopters instead of\nbecoming part of the operating system.\nAction: Do not respond to shadow AI with a blanket ban. Channel it. Run a simple, high-trust audit:\n“Which tools are you using, for what, and which actually help?”\nUse the answers to find unofficial workflows that clearly add value & make them official. That is how\nyou convert underground experimentation into shared capability without killing momentum.\n\nThe real blocker is not models. It is the “data tax”.\nMost Chief Data Officers now say AI is a top priority, but only a minority feel their data is clean\nenough to support AI driven revenue.The limiting factor now is rarely the power of the model.\nIt is the state of data living in legacy systems, spreadsheets, shared drives, one off tools and\nold exports.\nDefinitions are inconsistent. Ownership is unclear. Governance flips between too rigid &\ntotally absent.\nIn that environment, it does not matter how clever your model is, you wont get high quality\nresults. High performers are doing something that looks boring but is extremely effective.\nThey are spending money on making their data boring: clean, structured, accessible, and\nready to plug into multiple workflows.\nAction:\nPick one revenue linked area and pay the data tax there. Make one person clearly\naccountable for that data set. Standardise how it is captured and cleaned. Then put AI in the\nplace where that data already lives.The goal is not perfect data across the whole company.\nThe goal is one high value domain where data quality is no longer the excuse.\n\nHigh performers think in operating systems, not tools.\nThe organisations seeing real gains from AI were over 3x more likely to\nhave redesigned their workflows around what AI can do, V’s just adding\ntools on top.\nThis is the real dividing line. Most firms are in a tool first phase. They buy\nlicences, bolt AI into existing processes, and struggle to see real impact.\nThe organisations seeing meaningful gains have shifted to an operating\nsystem first mindset. They break down end to end workflow’s and rebuild\nthem on the assumption that AI can handle large chunks of\nexecution.Then add human checkpoints in at key stages and treat data &\nprocess as shared infrastructure.\nAction: Choose one workflow in 2026 and rebuild it properly: map the steps, decide where AI\nshould sit by default, decide where humans are non-negotiable, and give it a single success\nmetric. Make that your first real AI workflow, not your next pilot.\nEnd-of-year TLDR\nIf we zoom out, we’ve moved from the hype phase to the friction phase. Almost everyone now\n“uses AI”. Very few do so effectively. Access is no longer the issue, it’s messy data, shallow pilots\nand a lack of operating-system thinking.\nYour advantage in 2026 won’t come from buying more tools. It will come from a real\nunderstanding of what AI can and can’t do well and an operating system 1st mindset.\n\nMcKinsey – The State of AI in 2025; McKinsey – Agents, robots, and us; IBM – 2025 CDO\nStudy; Salesforce – State of Service 2025; Strategic Report / BCG – State of AI in the\nWorkplace; Ramp – Business AI adoption flatlines"
  },
  {
    slug: "what-is-an-ai-skill",
    title: "A skill is an app without a user interface",
    category: "AI Skills",
    categorySlug: "ai-skills",
    tags: ["AI skills", "prompts", "workflow packaging", "AI capability", "productisation", "launch systems"],
    source: "Rough Cut 8 dedicated issue markdown",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC8/RC8-content/Rough Cut RC8.md",
    sourceStart: "## Slide 1: Cover",
    sourceEnd: "Jayme Baggio - Views are my own",
    readTime: "14 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "By the end of this issue, you will understand what a skill is, why it matters, and why the businesses using skills well will move faster than those that are not.",
    preview: "By the end of this issue, you will understand what a skill is, why it matters, and why the businesses using skills well will move faster than those that are not.",
    thesis: "Businesses that know how to stack and build these skills can move from idea to market faster.",
    metaTitle: "A skill is an app without a user interface | Studio Baggio",
    metaDescription: "By the end of this issue, you will understand what a skill is, why it matters, and why the businesses using skills well will move faster than those that are not.",
    related: [
      "ai-adoption-value-gap",
      "chatgpt-for-business-owners",
      "building-ai-operating-systems"
    ],
    sourceMarkdown: "# A skill is an app without a user interface\n\n## Slide 1: Cover\n\nSKILLS SPECIAL:\n\nBy the end of this issue, you will understand what a skill is, why it matters, and why the businesses using skills well will move faster than those that are not.\n\nYou will also see that not all skills are equal, and that the most valuable ones can be used to build, market and sell products.\n\nThat is why skill marketplaces are emerging, and why the smartest organisations are already building skills more like products than prompts.\n\nThe issue with Skills:\n\nMany of the most valuable skills are being built by engineers and domain specialists. They are accessible via GitHub, but often require technical setup before you can see their value.\n\nWith an app, you can show someone the value instantly. With a skill, that is much harder. There is no homepage, no sign-in flow and no menu bar.\n\n---\n\n## Slide 2: What is a Skill?\n\nYou will have heard more people talking about AI skills recently. They are going to be a theme for 2026.\n\nThe simplest way to think about a skill is as an app without a user interface.\n\nIt contains templates, workflows, logic, code and often access to tools, but instead of interacting with a webpage, you access it through a terminal or AI chat window.\n\nA prompt is a one-off instruction. A system prompt sets the rules for how an AI should behave. A tool gives the AI a specific capability, like searching the web or calling an API.\n\nA skill packages these elements to do a specific job reliably every time. It lets teams package useful capabilities before building a full software product.\n\nUnlike a prompt, a skill compounds. Every refinement makes it more valuable. Over time, a strong skill library becomes a proprietary asset and a real advantage.\n\n---\n\n## Slide 3: /Last30Days Skill\n\nThat really hit home when I discovered Matt Van Horn's /Last30Days skill.\n\nLast30Days is a research engine. You ask any question and it pulls live data from Reddit, X, YouTube and advanced web search, then synthesises it into a structured report in about 60 seconds.\n\nIt shows where consensus is forming, what is gaining traction and where trends are emerging, from the places those conversations are actually happening.\n\nIt has become one of the first things I run before a client conversation, a brief or a strategy session.\n\nEvery strategic decision is only as good as the information behind it. Much of the information people still rely on is outdated, expensive or guesswork dressed up as strategy. With Last30Days, you are no longer guessing.\n\nYou know which ads are converting on any platform, which tools people are using, what users are asking for in a category, and what content is performing best for a given audience.\n\nThe commercial value of a product like this is obvious. The challenge is making that value visible to a non-technical audience.\n\nI wanted to show colleagues and friends what this looked like in a format they could engage with immediately. You cannot show someone a skill in Cursor and expect them to get it.\n\nSo a couple of weeks ago I built a simple miniapp inspired by the skill to make the output visible, usable and easier to assess.\n\nIt took about two hours to create a working prototype. It works well as an internal tool or proof of concept.\n\nThe rest of this issue follows the same idea: putting a face on some of the most useful skills I have come across to show what they are capable of, and why businesses are leaving opportunity on the table by not taking full advantage.\n\n*The official /last30days skill now includes TikTok, polymarket, Instagram + others - so it's extremely comprehensive!\n\nIt's the first time I have felt a real gap emerge between the people who are capitalising on these capabilities and those who are not.\n\n---\n\n## Slide 4: From Skill to Product\n\nOnce you have a valuable skill, the next question is: What can you build around it?\n\nA strong skill is not just a back-end capability. It can become the foundation for a product, a landing page, campaign assets, positioning, copy and launch materials.\n\nThis is the playbook I would run:\n\nStart with the capability.\nTurn it into something visible.\nPackage it clearly.\nPosition it properly.\nThen build the assets that help people understand it, buy into it and share it.\n\n---\n\n## Slide 5: No 1 — Research\n\nResearch Prompt Template:\n\nWe are creating a /Last30Days-style research tool for [audience].\n\nDefine:\n- Audience: [audience + revenue range + industry]\n- Example: \"2-10M SMBs in fintech struggling with AI adoption\"\n- What makes this different: [unique approach or methodology]\n- Current state: [starting point]\n\nResearch goals:\n- Market landscape and key competitors\n- Customer pain points and positioning gaps\n- Pricing models and service packaging\n- Best practices worth repackaging for the target market\n\nTools for Research:\n- Perplexity MCP: deep market research\n- Brave Search: quick competitor lookups + Live information\n- Firecrawl: competitor websites at scale\n- Playwright: screenshots and pattern capture\n\nThe Golden Rule:\nCast a wide net. Gather deep context. 30 to 60 minutes of serious research improves everything that follows.\n\nSave the output as .md files in your project folder.\n\nAlso research keywords and create your brand kit at this stage. You will need both later.\n\nOnce you have the research and context, you can stack from there.\n\n---\n\n## Slide 6: No 2 — Positioning Angles Skill\n\nThe positioning angles skill takes one product and generates multiple strategically different ways to talk about it.\n\nEach angle comes with the logic behind it, the psychology it is tapping into, and the context in which it is most likely to convert.\n\nThis is not just generating hooks and hoping one lands.\n\nIt uses April Dunford's positioning method to clarify the real alternatives, differentiators and customer value. It uses Eugene Schwartz's market sophistication model to judge what kind of message the market is ready for. It uses Hormozi's value equation to anchor each angle in outcome, likelihood, speed and effort. It also draws on Todd Brown's unique mechanism thinking to explain why the promise should be believed.\n\nIt is then sharpened by the discipline of Halbert, Ogilvy, Hopkins and Kennedy.\n\nThe result is not vague creative output. It is a set of strategically different ways to position the same product, each grounded in positioning logic, buyer psychology and market awareness.\n\nBehind these angles are frameworks such as market sophistication, unique mechanism, transformation mapping, contrarian positioning and competitive advantage framing. That is why the output feels strategic rather than generic.\n\n---\n\n## Slide 7: No 3 — Direct Response Copy Skill\n\nOnce you have your positioning angles nailed - you can use skills like /directresponsecopywriting to draw on frameworks built on the classical advertising masters, adapted for modern internet writing. Start with the landing page copy.\n\nThe Frameworks it draws from:\n\n- Eugene Schwartz - Levels of Awareness: Know where the reader sits before you write.\n- Claude Hopkins - Reason why copy. Do not just claim something works. Explain why.\n- David Ogilvy: Headlines do the most work. Write like you talk. Show, don't tell.\n- Gary Halbert - Find a starving crowd first. Write to one person, not an audience.\n- John Caples - Self-interest beats cleverness. Curiosity alone is not enough. It needs to be paired with benefit.\n- Joseph Sugarman - Every element has one job: get the reader to the next element.\n- Robert Collier: Enter the conversation already happening in the reader's mind.\n\nBest Used for:\nLanding pages, email sequences, sales copy, headlines, cold outreach and social posts. Anything where conversion matters.\n\nThe core principle: Write like you are talking to a smart, sceptical friend. Back every claim with specifics. Make the transformation clear.\n\n---\n\n## Slide 8: No 4 — From Angles to Copy (Part 1)\n\nThe positioning angles skill defines the strategic frames.\nThe direct response skill turns those frames into persuasive copy.\n\nThat is why the output feels sharp. It is not guessing. It is built on positioning logic first, then translated into direct response language.\n\nDecision Intelligence\nDirect response logic: Turn weak market awareness into a business risk\nLine: \"Every business decision made without knowing what the market is saying right now is a guess dressed up as strategy.\"\n\nHonest Research\nDirect response logic: Use contrarian framing and specificity to challenge the old research model\nLine: \"The most valuable market intelligence has not been filtered through a survey, a focus group or an analyst deck.\"\n\n---\n\n## Slide 9: No 4 — From Angles to Copy (Part 2)\n\nDemocratisation / Paywall Enemy\nDirect response logic: Name the enemy and make the cost of the old way concrete\nLine: \"40,000 a year and up before a single analyst logs in, and the output still needs human interpretation.\"\n\nUnique Mechanism\nDirect response logic: Handle the obvious objection by defining what the product is not, then what it is\nLine: \"Not a summary. Not a scrape. A defensible brief.\"\n\nSecret Weapon\nDirect response logic: Use competitive advantage and loss aversion to push action\nLine: \"The businesses acting on what the market is saying now are the ones that pull ahead. The ones that are not are already behind.\"\n\n---\n\n## Slide 10: No 5 — The Front End Design Skill\n\nOnce you have the research, positioning and copy in place, you can start shaping the interface around them. The Front-end design skill is most useful when working from a strong brief.\n\nWhat makes front-end design skills so useful is speed and range. With a strong brief, they can generate multiple different landing page directions in a short space of time. That helps you choose a direction faster, compare very different styles against the same strategy, and test what performs best.\n\nWhat improves the output:\n\n1. References: If you know the style you're aiming for, feed in examples. The result is far stronger than leaving the model to guess. Use sites like Siteinspire, viewport UI & Dribble to capture image references and learn terminology.\n2. Brand kit: Bring your colours, typography and brand voice with you.\n3. Context: Research, positioning angles and landing page copy give the design direction and structure.\n\nThis is where /Last30Days is particularly useful. It can help surface landing page references, UI patterns and design styles worth exploring before you start building.\n\n---\n\n## Slide 11: Design Direction — Lando Norris-inspired\n\nOne of the strongest directions took inspiration from Lando Norris's website. It uses bi-directional marquee animation, fan-card layouts and parallax to create a more dynamic, archive-led feel.\n\n---\n\n## Slide 12: Design Direction — Bold, campaign-led\n\nA higher-impact, more commercial direction. Strong hero imagery, sharp contrast and clearer calls to action make it feel more like a launch page for a media brand with a point of view.\n\n---\n\n## Slide 13: Design Direction — Premium editorial\n\nInspired by SheerLuxe, this version feels more polished, curated and magazine-led. Lighter layout, more white space and stronger issue discovery make it feel more premium and browseable.\n\n---\n\n## Slide 14: Design Direction — Forbes media kit-inspired\n\nMore authority-led and commercially polished, with sharper hierarchy, stronger type contrast and a clearer sense of Rough Cut as an established media property rather than just a newsletter.\n\n---\n\n## Slide 15: Design Directions — Forbes continued + Glassmorphic\n\nForbes media kit-inspired:\nMore authority-led and commercially polished, with sharper hierarchy, stronger type contrast and a clearer sense of Rough Cut as an established media property rather than just a newsletter.\n\nModern glassmorphic:\nA more digital, interface-led direction with softer layering, depth and a more contemporary product feel. This version pushes Rough Cut closer to a modern media product or members platform than a traditional newsletter page.\n\n---\n\n## Slide 16: Design Directions — Glassmorphic + Brutalist + Cinematic\n\nModern glassmorphic:\nA more digital, interface-led direction with softer layering, depth and a more contemporary product feel. This version pushes Rough Cut closer to a modern media product or members platform than a traditional newsletter page.\n\nBrutalist / editorial manifesto:\nDesigned to feel sharper, more independent and more provocative, with stronger editorial tension and a more uncompromising point of view.\n\nCinematic / film-room:\nDesigned to feel more immersive and experience-led, using film-inspired UI cues to make Rough Cut feel like a world, not just a publication.\n\nEach landing page design has been uploaded to one site for reference. You can scroll through them individually and see how the styles compare.\n\n---\n\n## Slide 17: No 6 — Launch Materials\n\nOnce you have the product, positioning, copy and landing page in place, you can shift to launch materials.\n\nThat can include email sequences, social copy, social graphics, lead magnets and even a launch video.\n\nThe /Last30Days video was built using Remotion - I'll do a deeper dive on that in a future issue - but for now, I've stopped at first pass because I set a hard limit on time spent here. It still makes the point that anyone can now create a strong product video by using AI skills to help bring the idea in your head to life.\n\nAcross this issue, I have taken one product through that full launch chain end to end. I took one skill, turned it into a product, built the positioning, translated that into copy, used that foundation to generate multiple landing page directions, and pushed it into launch materials.\n\nThat is the commercial advantage.\n\nBusinesses that know how to stack and build these skills can move from idea to market faster.\n\nBusinesses that are not using them are leaving value on the table."
  },
  {
    slug: "owned-vs-rented-audience",
    title: "Reuters Institute’s Trends & Predictions 2026: What businesses should do next.",
    category: "Owned Media",
    categorySlug: "owned-media",
    tags: ["owned audience", "AI search", "creator strategy", "distribution"],
    source: "Rough Cut 7 dedicated issue markdown",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC7/Rough Cut RC7.md",
    sourceStart: "## Slide 2: Reuters Institute's Trends & Predictions 2026",
    sourceEnd: "## Slide 4: OpenAI Is Bringing Ads To ChatGPT",
    readTime: "6 min read",
    date: "2026-05-29",
    updated: "2026-05-30",
    summary: "Even if you're not a publisher, the lesson is the same: **the channels you rent can change overnight, so build one you own.**",
    preview:
      "Search referrals are expected to keep falling. Audiences are spending more time with creators and personality-led formats.",
    thesis: "The channels you rent can change overnight, so build one you own.",
    metaTitle: "Owned vs Rented Audience: Reuters 2026 Lessons | Studio Baggio",
    metaDescription:
      "Even if you're not a publisher, the lesson is the same: the channels you rent can change overnight, so build one you own.",
    related: [
      "firecrawl-for-business",
      "ai-adoption-value-gap",
      "geo-generative-engine-optimisation",
    ],
    sourceMarkdown: "## Slide 2: Reuters Institute's Trends & Predictions 2026 — What Businesses Should Do Next\n\nThe Reuters Institute's Trends & Predictions Report is an annual survey-led read on where media leaders think the industry is heading. This year's message: Search is sending less traffic, platforms are keeping more users inside their own interfaces, and media businesses need to build stronger direct relationships with audiences.\n\n**Headline Predictions:**\n\n1) **Search referrals are expected to almost halve.** Media leaders expect search traffic to fall by 43% over the next three years as AI summaries and chat-style search reduce the need to click through to publisher sites.\n\n2) **Publishers are being hit from two sides at once.** On one side, AI reduces clicks by answering the question upfront. On the other, attention keeps moving towards creators and personality-led formats, where audiences follow people and series, not pages.\n\n3) **The middle gets squeezed first (the barbell effect).** You end up with two ends that hold value: Premium, distinctive, human-led work people actively seek out vs utility content produced efficiently at scale. The hardest place to sit is the middle: routine reporting and generic service content that can be summarised, scraped, or replaced.\n\n4) **\"Personalised briefings\"** are becoming a normal way people consume news. More people will get their news through assistants that assemble and summarise what they need.\n\n**What it means in practice:**\n- Creator strategy is no longer a nice-to-have. 76% of publishers say they plan to encourage journalists to behave more like creators and build personal brands.\n- This is not \"do more socials\". It's a distribution decision.\n- If audiences can choose voices and formats directly, you're less exposed to whatever search or platform UX decides to prioritise.\n\nEven if you're not a publisher, the lesson is the same: the channels you rent can change overnight, so build one you own.\n\n**Example: SheerLuxe** have demonstrated how to execute on this strategy. SL was an email newsletter-1st, but they expanded into YouTube, social video & podcasts & put their people the forefront of the product. Personalities become a route to distribution & that direct relationship compounds over time. They formalised it with BLUSH Talent MGMT, so the business participates in the commercial upside of employee influence - instead of treating it as a risk to manage. The market has just validated the model.\n\n---\n\n## Slide 3: Reuters 2026 Trends & Predictions Report cont.\n\nFuture acquired SheerLuxe for £39.9m upfront, with total consideration capped at £80m based on future performance. Publishers can still build meaningful value, but it's coming from direct audience habits, recognisable voices, and formats people seek out on purpose.\n\n**What execs should do now:**\n\n- **Demote old-style SEO:** Keep it, but stop treating it as the growth engine. Put leadership focus on return paths you control: newsletters, podcasts, app experiences, membership, repeat viewing.\n\n- **Plan for discovery through summaries and briefings.** Assume your work will be encountered through an AI layer.\n\n- **Structure content so it survives that layer:** clear headlines, clear sourcing, strong \"what it means,\" and a version that can travel (clips, charts, short explainers).\n\n- **Invest in formats people choose directly.** Video, audio, and personality-led series build familiarity and loyalty. They are also harder to reduce into a single substitute answer.\n\n- **Treat creator strategy as an operating decision with incentives.** If staff are building personal brands, decide the structure up front: what the company gets (distribution, series IP, loyalty), what talent gets (support, upside), and how you keep value in-house where it makes sense.\n\n- **Build repeatable franchises, not one-off posts.** If links are weaker and feeds are noisier, repeatable formats win. Series create habit. Habit creates direct audience.\n\n- **Diversify revenue away from page views.** Prioritise streams that don't depend on referrals: events, bundles that reduce churn, commerce, and premium products.\n\n**The takeaway:**\nSearch referrals are expected to keep falling. Audiences are spending more time with creators and personality-led formats. More consumption will happen through personalised briefings. The practical response is not complicated: build direct audience habits, make formats people actively choose, and design a creator strategy that strengthens the business rather than sitting awkwardly beside it."
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
    source: "Rough Cut 7 dedicated issue markdown",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC7/Rough Cut RC7.md",
    sourceStart: "## Slide 1: ChatGPT for Business Owners",
    sourceEnd: "## Slide 2: Reuters Institute's Trends & Predictions 2026",
    readTime: "4 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Six practical ways business owners can make ChatGPT compound inside the way they work.",
    preview: "Build a Role Master Prompt so ChatGPT understands your business. Most people get generic answers because ChatGPT does not know who they are.",
    thesis: "Make it an Operating System.",
    metaTitle: "ChatGPT for Business Owners: 6 Things to Do | Studio Baggio",
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
    source: "Rough Cut 7.5 dedicated issue markdown",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC7.5/Rough Cut RC7.5.md",
    sourceStart: "## Slide 1",
    sourceEnd: "---",
    readTime: "7 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "If your work happens on a screen, assume the shape of your job or business is going to change fast.",
    preview: "I do not get asked about AI much, which still surprises me. And when I do, I can usually feel how quickly people want the conversation to be over.",
    thesis: "If your work happens on a screen, assume the shape of your job or business is going to change fast.",
    metaTitle: "Screen-Based Work Is About to Change Fast | Studio Baggio",
    metaDescription: "A Rough Cut essay on why screen-based work, AI literacy and business capability are about to change fast.",
    related: [
      "ai-adoption-value-gap",
      "chatgpt-for-business-owners"
    ],
    sourceMarkdown: "## Slide 1\n\nI don't get asked about AI much, which still surprises me....\n\nAnd when I do, I can usually feel how quickly people want the conversation to be over.\n\nThe coverage is noisy. The tools change constantly. Most people already feel overloaded.\n\nStill, when it comes up, it tends to be with people I like. Smart friends. Founders. People who are good at what they do.\n\nThey'll say, \"How's your AI stuff going?\" and you can tell they're hoping for a one-line answer.\n\nSo I give them the polite version.\n\n'AI is moving fast. If you have real domain expertise, your output can jump in quality when you learn how to use the tools properly. I've never felt more creative. I can finally build what I had in my head.'\nI'll also add the reassuring line: 'AI won't replace humans. It'll be human plus AI. It'll become part of how we work.'\n\nThat's the polite version. The honest version is harder to say out loud.\n\nMy journey with AI started last August, and I still feel behind. I don't think anyone feels up to date. It moves too fast. The distance between an idea and a working prototype is collapsing. I know this because I've experienced it first-hand.\n\nLast September I tried to build an app that would add brand graphics to video assets. It was a steep learning curve. To get anything working, I had to understand databases, APIs, FFmpeg, and how the parts connect. My lack of technical knowledge was the bottleneck.\nToday, I could build a version of that in under an hour.\n\nNot because I became an engineer. Because more of the technical setup now happens quietly in the background.\n\nA few weeks ago I built a tiny app that receives my AI newsletters each day, lets me swipe through them tinder-style, and includes text-to-speech so I can listen as a podcast on the way to the tube. That took about three prompts.\nA year ago, I wouldn't have been able to do that at all.\n\n---\n\n## Slide 2\n\nOnce you've seen what's possible, you start seeing automation everywhere.\n\nI no longer wonder if something is possible. I assume it is, and I start thinking about how I'd build it.\nI now have an 'AI setup' that covers work I would have had to spread across an accountant, a research function, and a CRM.\nI've also noticed I've stopped looking for software that does one specific task. More and more, I'd rather build a simple version myself that fits what I need.\n\nAnd that's the part that worries me.\nBecause the people doing those jobs often cannot see what's coming.\n\nSo why are so many people still dismissing it?\nA few misconceptions come up again and again.\n\nFirst: \"AI isn't that good.\"\nFor a lot of people, that opinion comes from one bad test. They tried it once in 2024, asked a generic question, got a generic answer, and decided that was the ceiling. Or they only use the free tier like a search engine and assume it reflects what the tools can really do. It doesn't.\n\nSecond: \"AI output is generic.\"\nAI output reflects your input. If your direction is vague, the output will be vague. If your direction is clear, the quality improves fast.\nThe Coca-Cola AI Christmas ad is a good example. It got a lot of hate. That wasn't a technology limitation. It was a weak ad. A poor creative decision is a poor creative decision, with or without AI.\n\nThird: \"You have to be technical.\"\nThis is the biggest barrier, because it stops people from starting.\nYou don't need technical skill. You need curiosity, reps, and the willingness to iterate until the output is usable.\n\nAnd starting now doesn't mean you're \"six months behind\". Yes, I can push further today because I understand more of what's happening. But the tools have changed.\nIn September, I had to stitch components together just to get a basic version of something working. That knowledge mattered then. The technology is moving so fast that a lot of it is already obsolete.\n\nSo if you're hesitating because it feels like too much to learn, you're thinking about it the wrong way. Start now, because the barrier is dropping.\n\n---\n\n## Slide 3\n\nIf you start now, you can still learn the fundamentals while they're still visible.\n\n- Cost versus quality.\n- Speed versus accuracy.\n- Wrapper versus underlying capability.\n- How to set up a simple automation.\n- Why context matters more than clever prompting.\n\nThe people who learn those things now will be the ones who can lead with this technology inside a business. They'll be the ones who can choose the right tools, set the right expectations, and get reliable outcomes.\n\nIf you arrive once the barriers are gone and everything is hidden behind the scenes, you'll still be able to use AI, but you won't get the same chance to learn what goes into driving the best results.\n\nSo don't wait to start.\nNot because you're behind. Because you're early enough to learn the fundamentals while they still hold their value.\n\nNow the uncomfortable bit.\n\nMore and more, I can see roles that can be automated or radically restructured. That has nothing to do with whether people are good at what they do. It's because a lot of modern work centres around drafting, summarising, researching, analysing, rewriting, reporting.\n\nThese are the areas the tools are strongest, and they're getting better all the time.\nThis is why I believe the timeline is short.\n\nFrom where I sit, we have 6 to 12 months before the shift becomes undeniable. It will vary by sector, but the pressure is the same everywhere. Smaller, more adaptable businesses will produce better work with fewer people and shorter cycles. That becomes visible.\nThen it becomes unavoidable.\n\n---\n\n## Slide 4\n\nFor leaders, what changes first is a capability gap inside the organisation.\n\nThey'll realise their workforce is strong at yesterday's tools, but not equipped for what's now available. They'll start to notice which employees become more valuable, and which become harder to justify. They'll see competitors shipping more, testing more, learning faster, often with smaller teams.\n\nSo what stays valuable?\n\nKnowing what good looks like, and being able to get there reliably. Clear direction. Accountability. Trust and relationships. Distribution. The ability to teach others how to use these tools properly. And the ability to implement change so the business actually improves, not just talks about AI.\n\nIf your work happens on a screen, assume the shape of your job or business is going to change fast.\n\nFor employees, the safest move is to become the person who can use these tools properly and show outcomes. Not because it's trendy. Because it makes you harder to replace and easier to promote.\n\nFor founders, it's the same shift in a different form. Smaller teams will ship faster, test more, and compete with companies that used to have far more resources.\n\nEither way, this is a moment to take your own positioning seriously.\n\nIf you take anything practical away from this,\n\nDo three things this week:\n\n1. Pay for ChatGPT Plus or the Claude Pro plan. Don't judge this from the free tier.\n\n2. Use ChatGPT or Claude once a day for seven days on something real. Iterate until you get a result you can use. Save the prompt and reuse it.\n\n3. Build one small thing. Use a tool like Lovable and create a simple app. Ask AI to help you refine the idea, hit 'build' and watch it come together in front of you.\n\nIf you do that, you won't just \"understand AI\". You'll understand what has changed."
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
    source: "Rough Cut 2 dedicated issue markdown",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC2/Rough Cut RC2.md",
    sourceStart: "## Brands Lean into GEO For Visibility",
    sourceEnd: "## Check Out: NotebookLM's New Features",
    readTime: "2 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Generative Engine Optimisation is becoming critical for brand discoverability.",
    preview: "Brands like LinkedIn, Mars & Arla are adopting strategies to stay visible in AI answer engines - ChatGPT & Google AI Overviews.",
    thesis: "Traditional SEO is no longer enough.",
    metaTitle: "Brands Lean into GEO For Visibility | Studio Baggio",
    metaDescription: "Generative Engine Optimisation is becoming critical for brand discoverability as behaviour shifts from search engines to AI-driven recommendations.",
    related: [
      "firecrawl-for-business",
      "owned-vs-rented-audience"
    ],
    sourceMarkdown: "## Brands Lean into GEO For Visibility\n\nBrands like LinkedIn, Mars & Arla are adopting strategies to stay visible in AI answer engines - ChatGPT & Google AI Overviews. Generative Engine Optimisation (GEO) or simply AI SEO - is becoming critical for brand discoverability. Agencies are responding too - Ogilvy ANZ just launched 'Generative Impact' with Semrush, a service combining earned media and AI-optimised content to counter falling traffic from traditional search.\n\n**Why it matters:** As behaviour shifts from search engines to AI-driven recommendations, traditional SEO is no longer enough. Early GEO adopters secure a major \"share of voice\" advantage while competitors lag.\n\n**Actionable takeaway:** Audit your brand's visibility in AI answer engines. Media owners should pitch outlets with AI partnerships now and track citation share-of-voice."
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
    slug: "ai-creative-summit-2025",
    title: "AI Creative Summit 2025",
    category: "Owned Media",
    categorySlug: "owned-media",
    tags: [
      "AI creative",
      "creative industry",
      "media",
      "AI production",
      "human in the loop"
    ],
    source: "Downloaded PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Downloaded source PDFs/AI Creative Summit 2025.pdf",
    sourceStart: "AI CREATIVE SUMMIT 2025",
    sourceEnd: "CLARITY → FLUENCY → CAPABILITY → SPEED → ADVANTAGE.",
    readTime: "7 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "8x Signals that Stood Out & What They Mean For Creative Decision-Makers.",
    preview: "Sessions revealed inconsistent governance expectations across the sector.",
    thesis: "Teams who build clarity into their workflows, develop AI fluency & pair automation with strong human judgement will move faster than the rest of the industry.",
    metaTitle: "AI Creative Summit 2025 | Studio Baggio",
    metaDescription: "8x signals from AI Creative Summit 2025 and what they mean for creative decision-makers.",
    related: [
      "ai-disruption-in-media-and-advertising",
      "building-ai-operating-systems",
      "owned-vs-rented-audience"
    ],
    sourceMarkdown: `# AI Creative Summit 2025

8x Signals that Stood Out & What They Mean For Creative Decision-Makers.

## #1: FRAGMENTED STANDARDS ARE SLOWING THE SECTOR DOWN.

Sessions revealed inconsistent governance expectations across the sector.

INSIGHT: Different organisations presented different rules for governance, rights and ethics.

There’s still no shared reference point for responsible, practical use. This leaves teams navigating multiple interpretations instead of a single, stable baseline.

WHY IT MATTERS:
Inconsistent expectations limit how far & how fast teams can move.Without clarity, organisations struggle to scale or apply learnings consistently.

OPPORTUNITY: Define a simple, consistent position internally so teams can act with confidence.

Clear expectations enable faster decisions & more predictable delivery.

ACTION: Create a concise internal stance that guides decisions across projects. Move at the pace of your principles, not the slowest policy body.

“We’ve made so many rules- it’s hard to get in the sandbox”

Alex Mahon
Chair - Centre for Creative AI

## #2: COPYRIGHT CLARITY REMAINS UNEVEN.

The Rights & Regulation panel highlighted uneven interpretations of copyright.

INSIGHT: Norms around training data, consent and ownership are stabilising, but not consistently.
Studios & vendors use different standards- creating confusion for teams.

WHY IT MATTERS: Unclear rights create delays. Teams default to caution, slowing commissioning & reducing experimentation.
Creative ambition shrinks when expectations aren’t clear from the start.

OPPORTUNITY: Set a consistent internal standard for rights at commissioning.
Apply it across partners to remove ambiguity and protect pace.

ACTION: Use a single rights checklist for all projects and share it with partners upfront.

“There are layers and layers of different rights & licencing stances”

Joana O’Sullivan
Head of Media Policy & Regulatory Affairs, ITV

## #3: AGILE TEAMS ARE ACCELERATING.

The pace gap was visible across panels.

INSIGHT: Smaller teams are experimenting early, iterating quickly & shipping work.
Larger organisations are slowed by layers of approval and legacy processes.
AI is widening the gap between them.

WHY IT MATTERS:
Capability compounds. Teams who move early gain more ground, faster.
Slow structures fall further behind as workflows evolve.

Opportunity: Adopt lightweight processes. Test early.
Establish pace before formal structures catch up.

Action: Run focused AI pilots with clear goals and measures of success. Use results to decide where to scale.

“We’ve made mistakes- but they felt important- we’ve make things we couldnt have made without AI”

Will Hanrahan,
Editor in Chief - FirstLookTV

## #4: TECH-LITERATE CREATIVES HOLD THE ADVANTAGE.

Talent signals across the day all pointed in the same direction.

INSIGHT: Creatives who understand both production & technical workflows are already shaping the strongest outputs.They use AI to improve quality, widen creative range and direct work more effectively.

WHY IT MATTERS:
Hybrid creatives multiply the value of their expertise when paired with AI.
They unlock stronger ideas, faster iteration and higher-quality outputs.

OPPORTUNITY: Build capability in people who can operate across both domains.
These roles will shape how teams use AI to deliver better work.

ACTION: Create a skills roadmap and appoint hybrid leads who set standards and share best practice.

“”Its about understanding the tehcnoligy and the data AND the audience- if you havent got all three its going to be very difficult.”

Tom Sadler,
Data Science & AI Solution Lead UK - HP

## #5:CAPABILITY, NOT TECHNOLOGY, IS NOW THE BOTTLENECK.

Speakers reinforced that understanding, not access to tools, is the gap.

INSIGHT: GlobalData showed uneven readiness across roles.
AI in post & tools pannels demonstarted how literacy is now a baseline.

It was clear across the day that gaps in understanding slow adoption more than the tech itself.

WHY IT MATTERS: Teams deliver stronger work when they understand how to direct AI, not just use it.
Fluency unlocks quality, confidence and consistent output.

Opportunity: Build practical understanding of what AI can and can’t do, so teams choose tools that fit their workflow and scale their expertise.

Action: Map real workflows and identify where specific tools add value. Use this to guide tool selection and embed process‑first adoption.

“It isnt just about having a human in the loop- it’s about having a human with the right skillset “

Donna Mulvey Jones
Director of Post Production, Banijay UK

## #6: THE OPPORTUNITY FOR DEVELOPER-PRODUCERS

A gap emerged for me- that few speakers named directly.

INSIGHT: People who understand production and can build, will shape the next wave.

There’s a clear need for workflow-first tools shaped by those who are currently producing content.

WHY IT MATTERS: Process-first solutions unlock stronger gains than generic AI features.

OPPORTUNITY: Production experts who can build- even at a simple level- can create high-value tools that deliver immediate impact & ROI. Tailoring solutions to the people doing the work lets teams leverage their own expertise at scale.

ACTION:
Identify a production pain point & prototype a lightweight tool that solves it.
Don’t wait for someone else to build it.

“Most AI production tools are built outside the production environment… There’s a need for workflow-first tools shaped by those producing content.”

Georgie Holt
Co-Founder & CEO - FlightStory Studios

## #7: HYBRID PIPELINES ARE BECOMING THE STANDARD

Post, live production & filmmaker panels all converged on “Human in the loop” as a clear priority. Automation is scaling, but progress still depends on human direction.

INSIGHT: The creative edge now lies in how humans guide intelligent systems, not whether they use them.

WHY IT MATTERS: Quality depends on where humans add context and verify output. Hybrid models protect creative integrity while enabling speed.

OPPORTUNITY:
Articulate where human judgement sits in your pipeline.
Make oversight visible to clients and partners.
Clear hybrid models strengthen trust and accelerate delivery.

ACTION: Create a visible quality layer in every workflow: who verifies, who signs off, what’s protected.
That’s how you prove you’re scaling responsibly.

“You still need taste & judgement but AI helps you get there faster”

Eline Van Der Velden
Founder and CEO, Particle6

## #8: EVIDENCE OF ACCELERATION

Teams Using AI Well Are Already Moving Faster.

Fluent teams showed clear signs of momentum.

INSIGHT: Micro Dramas & Filmmaker sessions showed quicker ideation and tighter iteration cycles.

Fluent teams widened creative range and delivered stronger early outputs.

WHY IT MATTERS: AI strengthens creative R&D and reduces time-to-concept.

Teams who build fluency learn faster and deliver more in less time.

OPPORTUNITY:
Use AI as an exploratory layer to widen options at the start of projects.

ACTION: Add an AI-first exploration phase before committing resources.

“It’s an amazing opportunity & it’s going to make my indie bigger. ”

Emma Cooper,
Film-maker, Producer & Founder -
Empress Films

## FINAL THOUGHTS

CLARITY → FLUENCY → CAPABILITY → SPEED → ADVANTAGE.

Teams who build clarity into their workflows, develop AI fluency & pair automation with strong human judgement will move faster than the rest of the industry.

In a two‑speed landscape, pace becomes strategy.`
  },
  {
    slug: "ai-disruption-in-media-and-advertising",
    title: "The State of Play: AI Disruption in Media & Advertising",
    category: "Owned Media",
    categorySlug: "owned-media",
    tags: [
      "AI media",
      "advertising",
      "Futureweek AIMM",
      "human in the loop",
      "ad tech"
    ],
    source: "Downloaded PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/Downloaded source PDFs/Future week AIIM.pdf",
    sourceStart: "The State of Play: AI Disruption in Media & Advertising",
    sourceEnd: "The next wave of progress will come from people who can combine technical literacy with creative and commercial expertise.",
    readTime: "5 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "The 5x Key Takeouts from Futureweek AIMM 2025.",
    preview: "ISBA’s Nick Louisson shared how quickly advertisers are scaling GenAI- faster than most creative teams can respond.",
    thesis: "Human direction is central across all stages of the pipeline & areas of the business.",
    metaTitle: "AI Disruption in Media & Advertising | Studio Baggio",
    metaDescription: "The 5x key takeouts from Futureweek AIMM 2025 on AI disruption in media and advertising.",
    related: [
      "ai-creative-summit-2025",
      "building-ai-operating-systems",
      "owned-vs-rented-audience"
    ],
    sourceMarkdown: `# The State of Play: AI Disruption in Media & Advertising

The 5x Key Takeouts from Futureweek AIMM 2025

## INSIGHT #1: ADVERTISERS ARE MOVING FASTER THAN CREATORS

ISBA’s Nick Louisson shared how quickly advertisers are scaling GenAI- faster than most creative teams can respond.

Insight:.
Advertisers now expect AI-enabled efficiency as standard, but they still need trusted partners who can deliver speed with reliability, risk control and creative judgement.

Why it matters:
Creative and production teams that can blend automation with creative direction within a clear, responsible framework- will win briefs and retain trust.

Opportunity:
Align your processes to mirror client speed. Build a ‘responsible-by-design’ checklist that proves readiness for AI-driven briefs.

Action:
Identify one area of delivery that AI could accelerate without compromising quality.

“Adoption is scaling faster than anyone expected.”

NICK LOUISSON
DIRECTOR OF AGENCY SERVICES
ISBA

## INSIGHT #2: HUMAN IN THE LOOP WAS THEME OF THE DAY

Across every panel- from advertisers to technologists- one phrase kept surfacing: “Human in the loop”

It’s the clearest indicator of where the industry actually is with AI: automation is scaling, but progress still depends on human direction.

Insight:
AI raises the floor; the human in the loop raises the roof. Systems can optimise, but only people can ensure purpose, tone and ethics.

The creative edge now lies in how humans guide intelligent systems, not whether they use them.

Why it matters:
The market has moved past experimentation. “AI slop”- low quality, mass-produced content- is what happens when people drop out of the process.

Opportunity:
Turn “human in the loop” from a principle into a process. Document where human judgement checks output & use that transparency to build client trust.

Action:
Create a visible quality layer in every workflow: who verifies, who signs off, what’s protected. That’s how you prove you’re scaling responsibly.

“AI raises the floor- the human in the loop raises the roof.”

THIAGO CORREA
HEAD OF MEDIA EMEA
MONKS

## INSIGHT #3: AI IS REDEFINING WHO IS MOST VALUABLE

AI will reframe who the most valuable players are & who fails by the wayside.

The edge now belongs to those who can translate: technical literacy, anchored in industry expertise.

Insight:
The teams that can direct the pipeline will lead the decade.

“Your team needs to be the directors; value moves to those who can organise data & direct the pipeline architecture.”

Why it matters:
The creative advantage sits with hybrid thinkers- people fluent in both great storytelling & tech systems.

Opportunity:
Build AI literacy into every role. Treat prompt strategy, data awareness and ethical fluency as creative craft.

Action:
Create an AI Director track- half strategist, half systems lead- responsible for orchestration, not automation.

“You need to be fluent in marketing theory and ad tech- if you’re not, you’re not going to be at the forefront.”

THIAGO CORREA
HEAD OF MEDIA EMEA
MONKS

## INSIGHT #4: THERE’S QUIET EVOLUTION BEHIND THE AD STACK

For years, ad tech has been a maze of competing systems & unreliable data. Frameworks like AdCP create a shared language between buyers & sellers that speeds campaigns while baking trust and transparency directly into the stack.

Insight:
Shared protocols are bringing order to fragmented systems & giving brands clearer sightlines into where spend goes and how decisions are made.

Why it matters:
As automation scales, interoperability & transparency will define competitive advantage.

These quiet upgrades are already redefining how campaigns are built, measured and priced.

Those who understand how data and delivery pipelines work will make sharper creative and strategic decisions.

Opportunity:
Understanding the infrastructure lets you spot inefficiencies & future-proof your workflows. You don’t need to be an engineer, just fluent in how data, delivery and accountability connect.

Action:
Audit your workflow for fragmentation.

Where are briefs, approvals or reporting still trapped in silos?
Building your own shared language across teams will deliver the same clarity the ad-tech world is chasing.

“AdCP bridges the gap between all the systems brands rely on -it’s how we scale without losing control.”

ALEX OAKDEN
DIRECTOR, UK & NORTHERN EUROPE
SCOPE 3

## INSIGHT #5: AI IS FINALLY DELIVERING- QUIETLY

The closing panel was refreshingly grounded.

AI is no longer hypothetical- it’s working in the background, quietly compounding efficiency.

Insight:
Real ROI is emerging wherever AI is used to leverage expertise at scale & remains focused on value to the consumer.

As Rob Webster put it:

“AI Heaven is high-quality assets at scale with a human in the loop; AI Hell is low-quality, mass-produced creative built for speed.”

Why it matters: Consumers don’t hate AI- they hate bad AI.

Brands pairing talented people with powerful tools are seeing measurable lift; those chasing automation for volume are flooding feeds with “AI slop.”

Opportunity:
Make quality your KPI.

Show that automation and artistry can coexist & outperform.

Action:
Track & publish the proof: hours saved, revisions reduced, engagement uplift.

Use those metrics to demonstrate creative maturity, not curiosity.

“When you have talented people working with great AI, you get a really great result.”

ROB WEBSTER
FOUNDER & CEO
TAU MARKETING SOLUTIONS

## TL/DR: There were 2x Major signals to take from Futureweek:

Human direction is central- across all stages of the pipeline & areas of the business.

The next wave of progress will come from people who can combine technical literacy with creative and commercial expertise.`
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
    source: "Rough Cut 6 final PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC6/ROUGH CUT RC6 Dec Final (LinkedIn Carousel).pdf",
    sourceStart: "2026 Predictions- What I think we’ll see in the next 12 months.",
    sourceEnd: "british humour resulting in a minor level of carnage on the roads.",
    readTime: "6 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "AI led firms win: Companies that redesign processes around what AI can do- with humans focused on oversight and creativity, massively outperform those that bolt AI onto old workflows.",
    preview: "AI led firms win: Companies that redesign processes around what AI can do- with humans focused on oversight and creativity, massively outperform those that bolt AI onto old workflows.",
    thesis: "The gap between those who led early and those who dithered widens.",
    metaTitle: "2026 Predictions | Studio Baggio",
    metaDescription: "2026 Predictions- What I think we’ll see in the next 12 months.",
    related: [
      "best-ai-tools-2025",
      "ai-future-of-work",
      "building-ai-operating-systems"
    ],
    sourceMarkdown: "# 2026 Predictions\n\n## 2026 Predictions- What I think we’ll see in the next 12 months.\n\n AI led firms win: Companies that redesign processes around what AI can do- with humans\n focused on oversight and creativity, massively outperform those that bolt AI onto old\n workflows. The gap between those who led early and those who dithered widens.\n\n Skills, not titles = most valuable: Hiring & progression move toward skills portfolios and\n fluid roles, with AI literacy, data fluency, and change-navigation becoming baseline\n expectations.\n\n Personalised education sees university applications drop sharply: Students learn faster\n from AI tutors & the chances of getting an entry level job are slim. Proving your worth with\n AI start ups before entering workplace higher up the ladder with tech literacy & real AI\n director creds becomes the ambition. Those youngsters who do this leapfrog older more\n ‘senior’ employees who can’t or wont adapt.\n\n The fastest wealth creation path in 2026: Spotting assets mispriced because people\n underestimate AI’s speed. Entire markets move before the public notices.\n\n Agent-run media companies appear: Daily shows, newsletters, and channels where one\n human editor supervises AI agents that research, write, and distribute content at scale.\n\n Google vs OpenAI: distribution beats IQ: Google will claw back market share from OpenAI\n not with a better model, but with better real estate & frictionless integration. The extra 5%\n intelligence of GPT-5 won’t matter to the average user. Convenience & familiarity are\n worth a lot when it comes to the mass adoption play.\n\n Anthropic wins the coding war and becomes the place for top 1% power users.\n\n The YouTube moment for ‘vibe coding’: Just as YouTube made video creation &\n distribution accessible, vibe-coding tools make software creation accessible to non-\n coders. We have our first totally non-technical multi-million £+ apps and vibecoders\n become the new ‘creators’ of the moment. Just like gaming has a huge YouTube following,\n Vibecoders gather fame from sharing their skill and UI design becomes THE #no1 skill to\n master.\n\n Entertainment goes infinite: Netflix lets you continue cancelled shows just for yourself. AI\n generates new episodes of The Office or Friends dynamically based on your mood.\n\n Meta Vibes Flop: Zuckerberg integrates “Meta Vibes” (AI video generation) into Instagram.\n It flops because people don’t want AI content in personal feeds.\n\n 2026 Predictions- What I think we’ll see in the next 12 months.\nXTwitterGames: Musk/xAI releases a tool allowing users to build and play video games\ndirectly inside the X feed. It’s popular initially, then fades.\n\nSora turns into a social player & positions itself as a major competitor to both social &\nstreaming platforms. Create, publish, discover, remix.The accelerant is big IP partnerships and\ndistribution power.\n\nMassive backlash and craving for connection. People crave genuine human connection,\nleading to a rise in ‘dumb phones’ and IRL experiences.\n\nAI-free” becomes the new organic: “made by humans” becomes a premium signal, not\nbecause it’s better, but because people crave human imperfection again.\n\nHuman-in-the-loop becomes a luxury feature: customer support is 99% AI. Talking to a real\nhuman becomes a platinum-tier upsell.\n\nThe rise of “authentic” influencers: influencers prove they’re human. Verification shifts from\nblue checks to “human-generated” badges.\n\nThe rise of analog status: analog becomes the flex. Film cameras, handwritten notes, acoustic\ninstruments rise because they signal something AI can’t fake: friction.\n\nZero AI platform & return of the invite-only web: A new platform strictly bans AI, likely\ndisallowing video uploads or editing entirely, forcing raw, real-time moments. It takes\nmeaningful market share. Social platforms for verified humans only with tech to review all\nuploads to ban any use of AI across all posts. The best become gated & reputation-scored.\n\nDeath of the keyboard and the transition over to voice being your primary method of input\ninto your computer and your phone and any way you interact with technology. Keyboards start\nto look like archaic tools reserved for coding or academic writing.\n\nHyper-personalised everything: media, shopping, health all become more tailored as agents\ncustomise feeds, offers, and micro-interventions by default.\n\nAI glasses hit the third iteration- i.e. usually the version that’s actually useful, goes\nmainstream, and drops into accessible pricing.They become a default must have/ cannot\nfunction without tech accessory. Within 12 months, we wonder how we lived without them.\n\nWaymo comes to the UK- There are teething problems with roundabouts- nobody giving way\n& british humour resulting in a minor level of carnage on the roads."
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
    source: "Rough Cut 6 final PDF",
    sourcePath: "/Users/jaymebaggio/Desktop/Rough Cut/RC6/ROUGH CUT RC6 Dec Final (LinkedIn Carousel).pdf",
    sourceStart: "Tools of the Year (2025): The ones I'll be bringing into 2026",
    sourceEnd: "requirements prompt) is everything.",
    readTime: "7 min read",
    date: "2026-05-30",
    updated: "2026-05-30",
    summary: "Tools of the Year (2025): The ones I'll be bringing into 2026",
    preview: "ChatGPT: The anchor behind everything. I use it as a tutor & thinking partner for pretty much everything.",
    thesis: "The ones I'll be bringing into 2026.",
    metaTitle: "Tools of the Year 2025 | Studio Baggio",
    metaDescription: "Tools of the Year (2025): The ones I'll be bringing into 2026.",
    related: [
      "chatgpt-for-business-owners",
      "what-is-an-ai-skill",
      "building-ai-operating-systems",
      "ai-predictions-2026"
    ],
    sourceMarkdown: "# Tools of the Year 2025\n\n## Tools of the Year (2025): The ones I'll be bringing into 2026\n\nChatGPT:\nThe anchor behind everything.\nI use it as a tutor & thinking partner for\npretty much everything.\nUse it for: Strategy, mapping process,\nlearning new skills, building in real time,\nstructuring content & weekly non\nnegotiables.\n\nWhisperFlow\nAI transcription assistant- press a hot key to\nchat to everything on your phone or laptop.\nWe type around 51 words per minute vs\nspeaking 161 words per minute. That’s\nroughly a 3x productivity boost straight away.\nUse it for: Dictate everything- drafts, notes,\nreplies, ideas. We’ll wonder why we need\nkeyboards by the end of next year.\n\nPerplexity\nThe fastest way to get context driven\nresearch across the most reliable & widest\nrange of sources.\nUse it for: Building a source pack (credible\nlinks) before I write, present, or form an\nopinion. Gathering consensus or planning\nGEO strategies.\n\nNotebookLM\nGet a solid understanding of large amounts of\ncomplex material quickly & turn the TLDR\ninto publishable outputs.\nUse it for: Executive summaries, podcasts,\nslides, infographics,\n\nGemini + Google AI Studio\nThe multi media timesaver. Turn one asset\ninto 15 more.\nUse it for: Anything Multimodal. Ask it to\nsummarise YouTube videos and search for\nsimilar topics then distil that information\ninto Slides, images, infographics, diagrams,\nvideos, apps, landing pages.\n\nFigma\nThe best way to work on shotlists, outline\nworkflows & find inspiration for UI concepts.\nUse it for: Turning a process into a clean\nvisual. Use the ChatGPT Figma connector to\nrefine a concept in chat GPT then ask it to\nbuild that out in Figma for you to refine from\nthere.\n\nCalm Authority.ai\nBest new AI writing tool. Helps you draft\ncredible, consistent output in your own voice.\nUse it for: Turning ideas and relevant topics\ninto professional output in your true TOV.\nGenerate drafts from an article or URL, or\nstraight from an idea.\n*Still in closed beta, but definitely one to check\nout in the new year.*\n\nKrea.ai\nImage & video generation with multiple\nmodels & multiple outputs.\nUse it for: Storyboarding, ‘enhance’ or\n‘masking’ when you want more control over\nedits.Top tip: Generate multiple shots per\nidea (angles, lighting, mood), pick the\nwinners, then refine.\n\nRelay.app\nThe most beginner-friendly way to build simple\nagents with human-in-the-loop approvals.\nUse it for: Streamlining multi-step tasks across\napps without losing control. Connecting to a huge\nrange of AI tools in one place and getting a solid\nunderstanding of workflows.\n\nCanva\nHigh-quality design with everything you\ncould possibly need in 1x place.\nUse it for: Carousels, one-pagers, decks,\nproposals. Remove background, Magic Grab,\nMagic Edit, BG generator, Resize for different\nplatforms.Use Instagram as your cheat sheet.\nSearch Canva hacks, save the best, use those\nto inspire new ideas.\n\nDescript\nEditing video by editing a transcript is still the\nmost practical time-saver.\nUse it for: Cutting long-form, removing filler\nwords, identifying speakers, cleaning audio,\npulling highlights. Reframing, Screen recording,\nrecording tutorials etc.\nTop tip: Import straight from YouTube. Great for\ngrabbing clips to use as examples.\n\nOpus Clip\nThe strongest clip selection I’ve used for turning\nlong-form into short-form.\nUse it for: Longform to shortform clip selection,\nreframing, captions, and iterating hooks and\ntitles. It also gives clips a virality score based on\nhook, flow, viewer value, and trends.\n\nGamma\nPresentations that look super professional\nfrom the outset. Customise your brand theme,\n‘Generate with AI’ for the design but insert\nyour own fixed text.\nUse it for: Decks & web-published one-pagers.\nSmart diagrams and quick edits inside the doc.\nTop tip: Paste in text and use --- to control\nslide breaks.\n\nYouTube\nThe most underrated AI workflow tool. It’s my\nlibrary of AI knowledge as well as staying up to\ndate on what’s happening and best use cases.\nUse it for: Hearing from those 2x steps ahead\nof you and following along when you’re\nlearning a new skill. Finding use-case\ninspiration, and staying current.\n\nSpeechify\nTransfer anything written into your own\npersonal podcast. Copy& paste or upload text\nor articles and listen on the go.\nUse it for: Long articles, PDFs, newsletters.\nAlso listening to my own work back before I\npublish. You can save inputs to go back to &\nlisten with several different voices in up to 3x\nspeed output.\n\nLovable.dev\nVibe coding real deployable apps with no code.\nAdd OAth, database & API’s all via text based\nprompts.\nUse it for: Prompt-to-app prototypes so a\nworkflow becomes a repeatable system, not a one-\noff effort. Top tip: A strong PRP (product\nrequirements prompt) is everything."
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
  const lines = article.sourceMarkdown.split("\n");
  const paragraphs: string[] = [];
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length) {
      paragraphs.push(currentParagraph.join(" "));
      currentParagraph = [];
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();
    const isListItem = /^(-|•|\d+[\.)])\s+/.test(trimmed);
    const isPackagingLine = trimmed === "SKILLS SPECIAL:";

    if (!trimmed) {
      flushParagraph();
      if (paragraphs.length >= count) {
        break;
      }
      continue;
    }

    if (trimmed === "---" || /^#{1,6}\s/.test(trimmed) || /^\*\*[^*]+:\*\*$/.test(trimmed) || isPackagingLine) {
      flushParagraph();
      if (paragraphs.length >= count) {
        break;
      }
      continue;
    }

    if (isListItem) {
      flushParagraph();

      const itemLines = [trimmed];

      for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
        const nextTrimmed = lines[nextIndex].trim();
        if (
          !nextTrimmed ||
          /^(-|•|\d+[\.)])\s+/.test(nextTrimmed) ||
          /^#{1,6}\s/.test(nextTrimmed) ||
          nextTrimmed === "---"
        ) {
          break;
        }
        itemLines.push(nextTrimmed);
        index = nextIndex;
      }

      paragraphs.push(itemLines.join(" "));
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
