export const ABOUT_CONSTANTS = {
  headline: {
    before: "Full-stack engineer building ",
    accent: "thoughtful",
    after: " systems across SaaS, logistics, and marketplaces.",
  },
  paragraphs: [
    "5+ years across TypeScript, React, Node.js, and PostgreSQL. My current passion is figuring out how to combine the power of AI with software engineering philosophy to create pipelines that empower domain experts, project managers, and product owners to turn well-articulated vision into robust, shippable functionality.",
  ],
  stats: [
    {
      label: "Experience",
      content: "4+ years shipping\nproduction software",
    },
    {
      label: "Domains",
      content: "SaaS, logistics,\nmarketplaces",
    },
    {
      label: "Based in",
      content: "Colorado\nMountain Time (hybrid)",
    },
    {
      label: "Open to",
      content: "Mid-level & senior roles\nFull-time",
    },
  ],
  featured: {
    eyebrow: "How I work",
    quoteBefore: "Move fast and break things.",
    quoteAccent: "Behind the feature flag.",
    quoteAfter: "",
    meta: "STILL WORKING ON IT",
    action: "SEE SYSTEMS",
  },
  focus: {
    label: "Current focus",
    items: [
      "Building and shipping RouteKing, my own SaaS.",
      "Making the app I build at work genuinely easy to use, and faster to work in.",
      "A Jira integration that lets non-engineers tag a ticket and have Claude Code research the codebase and help build the product.",
    ],
  },
  offClock: {
    label: "Off the clock",
    items: [
      {
        eyebrow: "Currently enjoying",
        title: "Mina the Hollower",
        sub: "Steam",
        image: "/off-clock/mina-the-hollower.png",
      },
      {
        eyebrow: "Last boarded",
        title: "Poudre River Trail",
        sub: "Colorado",
        image: "/off-clock/poudre-river-trail.jpg",
      },
    ],
  },
} as const;
