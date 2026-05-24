export type WorkItem = {
  slug: string;
  title: string;
  eyebrow: string;
  problem: string;
  built: string;
  whyItMatters: string;
  proves: string;
  href?: string;
  external?: string;
  image?: string;
};

export const workItems: WorkItem[] = [
  {
    slug: "calm-authority",
    title: "Calm Authority",
    eyebrow: "Product / financial advice / authority systems",
    problem:
      "Financial advisers have valuable judgement, but too little of it is visible before prospects decide who to trust.",
    built:
      "A LinkedIn writing system that maps adviser voice, surfaces weekly angles and drafts publish-ready posts from an idea, URL or article.",
    whyItMatters:
      "It turns private expertise into public proof without flattening the adviser's voice or removing manual editorial control.",
    proves:
      "Studio Baggio can turn expert judgement into a practical AI-enabled product and operating system.",
    href: "/calm-authority",
    external: "https://www.calmauthority.ai/",
    image: "/assets/products/calm-authority.png"
  },
  {
    slug: "hanbury-growth-intelligence",
    title: "Hanbury / Growth Intelligence",
    eyebrow: "Specialist wealth / market entry / growth system",
    problem:
      "A specialist wealth opportunity needed sharper market positioning, proof, visibility and follow-up logic without exposing sensitive client detail.",
    built:
      "A growth-intelligence system across positioning, website direction, search visibility, authority assets, lead capture, email nurture and follow-up intelligence.",
    whyItMatters:
      "It shows how a market opportunity becomes a joined-up commercial system rather than a scattered set of marketing assets.",
    proves:
      "Studio Baggio can turn a high-value niche into a practical route to visibility, qualified interest and better-informed follow-up."
  },
  {
    slug: "business-tracker",
    title: "Business Tracker",
    eyebrow: "Lead intelligence / attribution / follow-up",
    problem:
      "Smaller expert-led teams often create visibility without knowing who is warming up, why they matter or what should happen next.",
    built:
      "A market-specific prospecting system that captures interactions, qualifies named leads, adds AI rationale and produces a prioritised follow-up pipeline.",
    whyItMatters:
      "It makes growth more feasible because teams can put time into conversations most likely to shift ROI.",
    proves:
      "Studio Baggio can connect visibility, market context and practical follow-up into one operating layer.",
    href: "/business-tracker"
  },
  {
    slug: "last30days",
    title: "Last30Days",
    eyebrow: "Live signal intelligence / multi-source research",
    problem:
      "Teams need to know what people are saying now, not what a stale report said months ago.",
    built:
      "A multi-source research engine for the last 30 days across Reddit, X, YouTube, web and other live sources, synthesising sourced reports with attribution.",
    whyItMatters:
      "It turns scattered current signals into structured intelligence that can support content, market mapping and commercial decisions.",
    proves:
      "Studio Baggio can build useful AI products that combine research, source discipline, synthesis and user-facing workflows.",
    external: "https://last30days.app",
    image: "/assets/products/last30days.png"
  },
  {
    slug: "fire-source",
    title: "Fire Source",
    eyebrow: "Commercial intelligence / cited web research",
    problem:
      "Commercial teams need competitor moves, market shifts, buyer signals and pitch intelligence faster than manual research allows.",
    built:
      "A Firecrawl and Claude-powered intelligence product with cited web research, stacked follow-up threads, compressed memory, Supabase auth and saved reports.",
    whyItMatters:
      "It can turn research into usable artefacts like pitch hooks, cold emails, battle cards, strategy notes and creative briefs.",
    proves:
      "Studio Baggio can build commercial intelligence products that preserve source discipline while accelerating decisions.",
    external: "https://fire-source.vercel.app",
    image: "/assets/products/fire-source.png"
  }
];
