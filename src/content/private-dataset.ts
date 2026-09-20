export type PrivateDatasetContent = {
  kicker: string;
  pillLine: string;
  title: string;
  stats: { value: string; copy: string; source: string }[];
  points: { label: string; copy: string }[];
  body: string;
  button: string;
  inlineButton: string;
  success: string;
  failure: string;
};

export const privateDataset: PrivateDatasetContent = {
  kicker: "Private dataset",
  pillLine: "How HNW & UHNW clients choose advisers",
  title: "How HNW & UHNW clients choose advisers in AI search",
  stats: [
    {
      value: "82%",
      copy: "of HNW investors use AI for finance and investment.",
      source: "HSBC Global Affluent Report, 2026"
    },
    {
      value: "1 in 2",
      copy: "investors with $5m+ found their adviser without a referral.",
      source: "Ficomm Partners, 2026"
    }
  ],
  points: [
    {
      label: "What's in the dataset",
      copy: "The questions HNW and UHNW clients are asking in AI search, which firms enter the consideration set, and the sources shaping those answers. Updated each quarter."
    },
    {
      label: "What HNW & UHNW clients are asking",
      copy: "High-intent questions across investing, retirement, inheritance, business ownership and major liquidity events."
    },
    {
      label: "Which firms are considered",
      copy: "Which firms AI recommends, what shapes those answers, and how firms can reach these clients earlier."
    }
  ],
  body:
    "Private data set exclusively available for Studio Baggio clients. Used to identify how firms can reach HNW & UHNW clients earlier in their journey and build the route from first search to qualified enquiry.",
  button: "Enquire now",
  inlineButton: "Enquire now",
  success: "Enquiry sent.",
  failure: "That didn't send. Email jayme@studiobaggio.ai directly."
};

export const privateDatasetLaw: PrivateDatasetContent = {
  ...privateDataset,
  title: "How HNW & UHNW clients choose law firms & lawyers in AI search",
  stats: [
    {
      value: "82%",
      copy: "of HNW individuals already use AI to research their options before taking advice.",
      source: "HSBC Global Affluent Report, 2026"
    },
    {
      value: "1 in 2",
      copy: "people with $5m+ found their current adviser without a referral.",
      source: "Ficomm Partners, 2026"
    }
  ],
  pillLine: "How HNW & UHNW clients choose law firms",
  points: [
    {
      label: "What's in the dataset",
      copy: "The questions HNW and UHNW clients are asking in AI search, who enters the consideration set, and the sources that shape those answers. Updated each quarter."
    },
    {
      label: "What HNW & UHNW clients are asking",
      copy: "High-intent legal buying questions across business ownership, private wealth, family, property, tax, reputation and other significant personal and commercial decisions."
    },
    {
      label: "Which firms & lawyers are considered",
      copy: "The firms and individuals AI recommends for those questions, and the sources shaping those answers."
    }
  ],
  body:
    "Private data set exclusively available for Studio Baggio clients. Used to identify how firms can reach HNW & UHNW clients earlier in their journey and build the route from first search to qualified enquiry."
};
