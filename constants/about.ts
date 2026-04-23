export const ABOUT_CONSTANTS = {
  headline: {
    before: "Full-stack engineer building ",
    accent: "thoughtful",
    after: " systems across SaaS, logistics, and marketplaces.",
  },
  paragraphs: [
    "Four-plus years of professional experience, with a focus on TypeScript, React, and Node.js — and a growing pull toward cloud infrastructure (AWS, Terraform) and AI-powered tooling. Recently, I've taken an interest in the more 'boring' parts, focusing  on reliability, latency, cutting down costs, and building durable software that stand the test of time. I've been working a lot with agentic flows, document processing and image-to-text extraction with AI, as well as GraphQL, and cross-platform mobile experiences. I'm currently also utilizing tools like Claude Code, Codex, and trying to find the sweet spot for productivity and learning.",
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
