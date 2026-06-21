export const ABOUT_CONSTANTS = {
  headline: {
    before: "Full-stack engineer building ",
    accent: "thoughtful",
    after: " systems across SaaS, logistics, and marketplaces.",
  },
  paragraphs: [
    "Four-plus years of professional experience, with a focus on TypeScript, React, and Node.js — and a growing pull toward cloud infrastructure (AWS, Terraform) and AI-powered tooling. Recently, I've taken an interest in cutting down on unnecessary frameworks, packages, libraries, and abstractions while shipping lean, performant software that's easy to reason about.",
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
    quoteBefore:
      "I want to be the guy where, the whole time I'm on the team, things just run smooth and ",
    quoteAccent: "the hard parts never become anyone else's problem",
    quoteAfter: ".",
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
