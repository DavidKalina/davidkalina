export type Project = {
  num: string;
  year: string;
  title: string;
  client: string;
  role: string;
  blurb: string;
  metrics: ReadonlyArray<readonly [string, string]>;
  stack: ReadonlyArray<string>;
  hue: number;
  href: string;
};

export const PROJECT_GRID_CONSTANTS = {
  section: {
    number: "003",
    eyebrow: "SELECTED WORK",
    counter: "04 / 04",
    headlineLine1: "Recent",
    headlineAccent: "work.",
    paragraph:
      "A selection of things shipped to real users — from AI-powered document pipelines and GraphQL backends to white-label SaaS, real-time marketplaces, and mobile apps. Case studies on request.",
  },
  projects: [
    {
      num: "04",
      year: "2026",
      title: "Side Quests",
      client: "Independent",
      role: "Sole developer — design, architecture, implementation",
      blurb:
        "A mobile app helping people with social anxiety and habitual homebodies build the confidence and routine to get out, explore their interests, and find community. Agentic AI workflow combines guided onboarding with Google Places data to generate personalized, low-pressure activities. Targeting TestFlight beta April 2026.",
      metrics: [
        ["Beta target", "Apr 2026"],
        ["Built with", "Claude Code"],
      ],
      stack: [
        "React Native",
        "TypeScript",
        "Google Places",
        "AI Agents",
        "MCP",
      ],
      hue: 200,
      href: "#",
    },
    {
      num: "03",
      year: "2025",
      title: "AI Document Processing Pipeline",
      client: "Eel Data Systems",
      role: "Full-stack — pipeline, infra, GraphQL API",
      blurb:
        "Designed and shipped an event-driven pipeline that converts shipping PDFs into structured shipment data. Provisioned the underlying serverless infrastructure with Terraform, and exposed the data through a GraphQL API that powers the core product.",
      metrics: [
        ["Cost reduction", "98%"],
        ["Saved annually", "$20k+"],
      ],
      stack: ["Vercel AI SDK", "AWS Lambda", "SQS", "Terraform", "GraphQL"],
      hue: 75,
      href: "#",
    },
    {
      num: "02",
      year: "2024",
      title: "Floaty.io — Real-time Marketplace",
      client: "K-Optional Software",
      role: "Frontend lead",
      blurb:
        "Built the React frontend for a real-time digital asset marketplace, collaborating closely with a designer to deliver a polished UI for buying, selling, and trading. Handled complex state management and real-time transaction flows.",
      metrics: [
        ["Surface", "Marketplace UI"],
        ["Realtime", "Transactions"],
      ],
      stack: ["React", "TypeScript", "Realtime"],
      hue: 265,
      href: "https://floaty.io",
    },
    {
      num: "01",
      year: "2023",
      title: "Alpha Fox / Revive Ratings",
      client: "K-Optional Software",
      role: "Core feature engineer",
      blurb:
        "White-label SaaS review platform for local businesses. Shipped multi-tenant onboarding, email and SMS campaign tooling, and business-facing dashboards. Authored a Storybook-driven React component library used across multiple product teams.",
      metrics: [
        ["Tenancy", "Multi-tenant"],
        ["Channels", "Email + SMS"],
      ],
      stack: ["React", "TypeScript", "Storybook", "Node.js"],
      hue: 340,
      href: "#",
    },
  ] as ReadonlyArray<Project>,
} as const;
