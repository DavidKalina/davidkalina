export const ABOUT_CONSTANTS = {
  section: {
    number: "002",
    eyebrow: "ABOUT",
  },
  headline: {
    before: "Full-stack developer crafting ",
    accent: "thoughtful",
    after: " solutions that put people first.",
  },
  paragraphs: [
    "I believe in building technology that enhances rather than replaces human capability. Four-plus years in, I'm still most interested in the boring parts — latency budgets, failure modes, the seams between systems — because that's where user trust is actually earned.",
    "My approach marries technical depth with a genuine appreciation for how people think, work, and get interrupted. I enjoy mentoring engineers early in their careers, and I like building tools that quietly make a day easier.",
  ],
  stats: [
    {
      label: "Core skills",
      content: "React, Next.js, TypeScript\nNode.js, Postgres, Supabase",
    },
    {
      label: "Interests",
      content: "Human-centered design\nTool creation & DX",
    },
    {
      label: "Based in",
      content: "Cleveland, OH\nWorking remote (EST)",
    },
    {
      label: "Currently",
      content: "Open to senior roles\n& select freelance",
    },
  ],
  featured: {
    eyebrow: "Featured — 2023",
    quoteBefore: "“Designed and launched a white-label review-management tool, contributing to a ",
    quoteAccent: "$400k+ product sale",
    quoteAfter: ".”",
    meta: "ALFAPHOX / REVIVE",
    action: "SEE CASE",
  },
  focus: {
    label: "Current focus",
    items: [
      "Tools that amplify — rather than replace — human judgment.",
      "Intuitive, accessible interfaces for technical audiences.",
      "Collaborative development environments where engineers can grow.",
    ],
  },
} as const;
