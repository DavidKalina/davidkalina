export type PipelineLayer = {
  layer: string;
  nodes: ReadonlyArray<string>;
};

export type System = {
  num: string;
  year: string;
  title: string;
  client: string;
  blurb: string;
  pipeline: ReadonlyArray<PipelineLayer>;
  infra?: string;
  href: string;
};

export const SYSTEMS_CONSTANTS = {
  section: {
    number: "001",
    eyebrow: "SYSTEMS",
    headlineLine1: "How I build",
    headlineAccent: "systems.",
    paragraph:
      "A selection of production pipelines I've designed and shipped — each one traced through the tools that make it run. Tech in context, not tech as a checklist.",
  },
  systems: [
    {
      num: "01",
      year: "2025",
      title: "AI Document Processing Pipeline",
      client: "Eel Data Systems",
      blurb:
        "Event-driven pipeline that turns shipping PDFs into structured shipment data. Uploads fan out through a queue, get parsed by a Lambda that calls a multi-modal AI extractor, and land in Postgres — all fronted by a GraphQL API powering the web app.",
      pipeline: [
        { layer: "Client", nodes: ["Next.js"] },
        { layer: "API", nodes: ["GraphQL"] },
        { layer: "Compute", nodes: ["Lambda", "Vercel AI SDK"] },
        { layer: "Queue", nodes: ["SQS"] },
        { layer: "Data", nodes: ["PostgreSQL"] },
      ],
      infra: "Provisioned with Terraform on AWS",
      href: "#",
    },
    {
      num: "02",
      year: "2026",
      title: "Side Quests — Agentic Mobile App",
      client: "Independent",
      blurb:
        "An 'anti-doomscroll' app that helps chronic homebodies, those struggling with social anxiety, and people looking for software to help funnel their attention more productively. An agentic workflow combines guided onboarding with Google Places data and user feedback to generate real-world activities in the user's zone of proximal development.",
      pipeline: [
        { layer: "Client", nodes: ["React Native", "TypeScript"] },
        { layer: "Agent", nodes: ["Anthropic Agent SDK"] },
        { layer: "Services", nodes: ["Google Places"] },
        { layer: "Data", nodes: ["PostgreSQL"] },
      ],
      infra: "Built with Claude Code",
      href: "#",
    },
    {
      num: "03",
      year: "2024",
      title: "Flowty.io — Real-time Marketplace",
      client: "K-Optional Software",
      blurb:
        "Real-time digital asset marketplace for buying, selling, and trading. Led the frontend: complex state, live transaction flows, and a polished UI built in close collaboration with design.",
      pipeline: [
        { layer: "Client", nodes: ["React", "TypeScript"] },
        { layer: "API", nodes: ["GraphQL"] },
        { layer: "Server", nodes: ["Node.js"] },
        { layer: "Data", nodes: ["PostgreSQL"] },
      ],
      href: "https://Flowty.io",
    },
    {
      num: "04",
      year: "2023",
      title: "Alpha Fox / Revive Ratings",
      client: "K-Optional Software",
      blurb:
        "White-label SaaS review platform for local businesses. Shipped multi-tenant onboarding, email + SMS campaign tooling, and business-facing dashboards — all drawing from a Storybook-driven component library used across product teams.",
      pipeline: [
        { layer: "Client", nodes: ["React", "TypeScript"] },
        { layer: "Tooling", nodes: ["Storybook"] },
        { layer: "Server", nodes: ["Node.js"] },
        { layer: "Data", nodes: ["PostgreSQL"] },
      ],
      infra: "Multi-tenant SaaS",
      href: "#",
    },
  ] as ReadonlyArray<System>,
} as const;
