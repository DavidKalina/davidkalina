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
      label: "Core skills",
      content: "TypeScript, React, Vue\nNode.js, GraphQL, Postgres",
    },
    {
      label: "Cloud & AI",
      content: "AWS, Terraform, Docker\nVercel AI SDK, MCP",
    },
    {
      label: "Based in",
      content: "Colorado\nWorking Hybrid (MT)",
    },
    {
      label: "Currently",
      content: "Open to senior roles\n& select freelance",
    },
  ],
  featured: {
    eyebrow: "Featured — 2025",
    quoteBefore:
      "“Designed an AI-powered document pipeline that reduced shipping-PDF processing costs by ",
    quoteAccent: "98%",
    quoteAfter: " — saving $20k+ annually.”",
    meta: "EEL DATA SYSTEMS",
    action: "SEE CASE",
  },
  focus: {
    label: "Current focus",
    items: [
      "AI-powered tooling that amplifies — rather than replaces — human judgment.",
      "Developing 'anti-doomscroll' mobile software to help people become well-adjusted and more intentional",
      "Event-driven, non-blocking infrastructure on AWS + Terraform.",
      "Cross-platform mobile experiences with React Native.",
    ],
  },
} as const;
