export type WorkItem = {
  slug: string;
  title: string;
  eyebrow: string;
  promise?: string;
  status?: string;
  proofCopy?: string;
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
    promise: "Your Own Expertise. At Scale.",
    status: "Live product",
    proofCopy:
      "A Studio Baggio product turning financial adviser expertise into publish-ready authority content.",
    problem:
      "37,136 UK financial advisers are authorised, but fewer than 300 post consistently on LinkedIn.",
    built:
      "A live LinkedIn writing system that maps each adviser's voice, surfaces weekly angles and drafts posts from an idea, URL or article.",
    whyItMatters:
      "It turns private expertise into public proof while keeping the adviser in control: every post is reviewed, edited and published manually.",
    proves:
      "Studio Baggio can turn expert judgement, compliance constraints and a market visibility gap into a practical AI-enabled product.",
    href: "/calm-authority",
    external: "https://www.calmauthority.ai/",
    image: "/assets/products/calm-authority.png"
  },
  {
    slug: "business-tracker",
    title: "Business Tracker",
    eyebrow: "Lead intelligence / attribution / follow-up",
    promise: "Lead intelligence for warmer follow-up.",
    status: "Live system",
    proofCopy:
      "A system for turning engagement into named prospects, clearer qualification and next-step intelligence.",
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
    promise: "What the market is saying right now.",
    status: "Placeholder case study",
    proofCopy:
      "A reporting system that pulls recent discussion and sentiment from Reddit, X, TikTok, Instagram, YouTube and the open web, then turns it into a sourced market report.",
    problem:
      "Teams need to know what people are saying now, not what a stale report said months ago.",
    built:
      "A reporting system that pulls recent discussion and sentiment from Reddit, X, TikTok, Instagram, YouTube and the open web, then turns it into a sourced market report.",
    whyItMatters:
      "It turns scattered current signals into structured intelligence that can support content, market mapping and commercial decisions.",
    proves:
      "Studio Baggio can build useful AI products that combine research, source discipline, synthesis and user-facing workflows.",
    href: "/last30days",
    external: "https://last30days.app",
    image: "/assets/products/last30days.png"
  },
  {
    slug: "fire-source",
    title: "Fire Source",
    eyebrow: "Commercial intelligence / cited web research",
    promise: "Commercial intelligence from the open web.",
    status: "Placeholder case study",
    proofCopy:
      "A research system that scans the open web, answers commercial questions quickly and turns cited intelligence into pitches, emails and strategy notes.",
    problem:
      "Commercial teams need competitor moves, market shifts, buyer signals and pitch intelligence faster than manual research allows.",
    built:
      "A research system that scans the open web, answers commercial questions quickly and turns cited intelligence into pitches, emails and strategy notes.",
    whyItMatters:
      "It can turn research into usable artefacts like pitch hooks, cold emails, battle cards, strategy notes and creative briefs.",
    proves:
      "Studio Baggio can build commercial intelligence products that preserve source discipline while accelerating decisions.",
    href: "/fire-source",
    external: "https://fire-source.vercel.app",
    image: "/assets/products/fire-source.png"
  }
];
