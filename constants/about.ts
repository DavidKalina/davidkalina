export const ABOUT_CONSTANTS = {
  section: {
    number: "002",
    eyebrow: "ABOUT",
  },
  headline: {
    before: "Full-stack engineer building ",
    accent: "thoughtful",
    after: " systems across SaaS, logistics, and marketplaces.",
  },
  paragraphs: [
    "Three-plus years of professional experience, with a focus on TypeScript, React, and Node.js — and a growing pull toward cloud infrastructure (AWS, Terraform) and AI-powered tooling. I'm most interested in the boring parts: latency budgets, failure modes, the seams between systems. That's where user trust is actually earned.",
    "Lately I've been shipping AI-driven document pipelines, GraphQL APIs, and cross-platform mobile experiences — and exploring how Claude Code, the Anthropic Agent SDK, and custom MCP integrations change what a small team can build.",
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
      content: "Colorado\nWorking remote (MT)",
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
      "Event-driven, non-blocking infrastructure on AWS + Terraform.",
      "Cross-platform mobile experiences with React Native.",
    ],
  },
} as const;
