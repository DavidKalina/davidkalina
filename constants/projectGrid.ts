export type TechIconKey =
  | "react"
  | "ts"
  | "ai"
  | "mcp"
  | "gp"
  | "aws"
  | "terraform"
  | "graphql"
  | "storybook"
  | "node"
  | "realtime"
  | "vercel"
  | "vue";

export type TechAnnotation = {
  icon: TechIconKey;
  label: string;
  role?: string;
  body?: string;
};

export type JourneyStep = {
  title: string;
  sub: string;
  tech?: string;
};

export type ProjectJourney = {
  label: string;
  steps: ReadonlyArray<JourneyStep>;
};

export type ProjectStatus = {
  primary: string;
  secondary: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

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
  tags?: ReadonlyArray<string>;
  tech?: ReadonlyArray<TechAnnotation>;
  journey?: ProjectJourney;
  status?: ProjectStatus;
  links?: ReadonlyArray<ProjectLink>;
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
      metrics: [],
      stack: [
        "React Native",
        "TypeScript",
        "Google Places",
        "AI Agents",
        "MCP",
      ],
      hue: 200,
      href: "#",
      tags: ["react-native", "typescript", "ai-agents", "mcp", "google-places"],
      tech: [
        {
          icon: "react",
          label: "React Native",
          role: "CLIENT",
          body: "Quest card stack, check-in flow, <b>streak calendar</b>. Expo + Reanimated for low-friction micro-interactions.",
        },
        {
          icon: "ts",
          label: "TypeScript",
          role: "CONTRACT",
          body: "<b>Zod</b> schemas shared between app and agent. One source of truth for quests, venues, and user profile.",
        },
        {
          icon: "ai",
          label: "AI Agents",
          role: "PLANNER",
          body: "Onboarding interviewer + quest generator. Reads social anxiety profile, proposes <b>low-pressure</b> outings tuned to energy level.",
        },
        {
          icon: "mcp",
          label: "MCP",
          role: "TOOLS",
          body: "Agent exposes <b>places.search</b>, <b>calendar.book</b>, <b>profile.recall</b> as tools. Clean boundary between reasoning and side-effects.",
        },
        {
          icon: "gp",
          label: "Google Places",
          role: "REALITY",
          body: "Grounds every suggestion in a real venue — hours, crowd level, photos. <b>No hallucinated spots.</b>",
        },
      ],
      journey: {
        label: "USER JOURNEY · 7 min first session",
        steps: [
          {
            title: "Guided onboarding",
            sub: "Agent asks about interests, comfort zone, energy.",
            tech: "AI · React Native",
          },
          {
            title: "Quest proposed",
            sub: "'Walk past the Sunday market. Stay 10 min. No need to buy.'",
            tech: "AI · MCP",
          },
          {
            title: "Grounded in real venue",
            sub: "Pulled hours, photos, and walking time from Places.",
            tech: "Google Places",
          },
          {
            title: "Low-pressure check-in",
            sub: "One tap. How'd it feel? 1–5.",
            tech: "React Native",
          },
          {
            title: "Next quest adapts",
            sub: "Agent tunes difficulty based on feedback + streak.",
            tech: "AI · TypeScript",
          },
        ],
      },
      status: {
        primary: "BUILDING · TESTFLIGHT BETA APR 2026",
        secondary: "role: solo · design + eng + ai",
      },
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
        ["Token cost", "1/50th"],
        ["Saved annually", "$20k+"],
        ["Uses per day", "100s"],
      ],
      stack: ["Vue", "GraphQL", "SQS", "AWS Lambda", "Vercel AI SDK", "Terraform"],
      hue: 75,
      href: "#",
      tags: ["vue", "graphql", "sqs", "aws-lambda", "vercel-ai-sdk", "terraform"],
      tech: [
        {
          icon: "vue",
          label: "Vue",
          role: "CLIENT",
          body: "PDF upload form, job status polling, and the <b>auto-fill</b> flow that saves operators hours of manual entry.",
        },
        {
          icon: "graphql",
          label: "GraphQL",
          role: "API",
          body: "One schema for upload, poll, and hydrate. The form consumes the extracted shipment the moment it lands.",
        },
        {
          icon: "aws",
          label: "SQS",
          role: "QUEUE",
          body: "Upload writes a job row, drops a message, returns in <b>milliseconds</b>. Heavy work happens off the request path.",
        },
        {
          icon: "aws",
          label: "AWS Lambda",
          role: "WORKER",
          body: "Consumes the queue. Rasterizes the PDF with <b>Ghostscript</b>, calls the AI SDK, writes results back to the DB.",
        },
        {
          icon: "vercel",
          label: "Vercel AI SDK",
          role: "EXTRACTION",
          body: "<b>Structured outputs</b> turn the page image into typed shipment JSON. No regex, no fragile templates.",
        },
        {
          icon: "terraform",
          label: "Terraform",
          role: "INFRA",
          body: "Whole stack as code. Remote state in <b>S3</b>, apply gated behind a <b>GitHub Actions</b> runner — no one ships from a laptop.",
        },
      ],
      journey: {
        label: "USER JOURNEY · Upload → auto-filled form",
        steps: [
          {
            title: "Upload PDF",
            sub: "Operator drops a shipping document into the web app.",
            tech: "Vue",
          },
          {
            title: "Job queued",
            sub: "Record written, SQS message fired, response returns instantly.",
            tech: "SQS · GraphQL",
          },
          {
            title: "Worker picks up",
            sub: "Lambda pulls the message and rasterizes the PDF via Ghostscript.",
            tech: "AWS Lambda",
          },
          {
            title: "AI extracts fields",
            sub: "Page image in, structured shipment JSON out.",
            tech: "Vercel AI SDK",
          },
          {
            title: "Form auto-fills",
            sub: "Frontend poll resolves; extracted data populates the operator's form.",
            tech: "Vue · GraphQL",
          },
        ],
      },
      status: {
        primary: "SHIPPED · 1/50TH TOKEN COST",
        secondary: "role: full-stack · pipeline + infra + api",
      },
      links: [
        { label: "app.cudacartagetms.com", href: "https://app.cudacartagetms.com" },
      ],
    },
    {
      num: "02",
      year: "2024",
      title: "Flowty.io — Real-time Marketplace",
      client: "K-Optional Software",
      role: "Frontend lead",
      blurb:
        "Built the React frontend for a real-time digital asset marketplace, collaborating closely with a designer to deliver a polished UI for buying, selling, and trading. Handled complex state management and real-time transaction flows.",
      metrics: [],
      stack: ["React", "TypeScript", "Realtime"],
      hue: 265,
      href: "https://Flowty.io",
      tags: ["react", "typescript", "realtime"],
      tech: [
        { icon: "react", label: "React" },
        { icon: "ts", label: "TypeScript" },
        { icon: "realtime", label: "Realtime" },
      ],
      status: {
        primary: "SHIPPED · REAL-TIME MARKETPLACE",
        secondary: "role: frontend lead",
      },
    },
    {
      num: "01",
      year: "2023",
      title: "Alpha Fox / Revive Ratings",
      client: "K-Optional Software",
      role: "Core feature engineer",
      blurb:
        "White-label SaaS review platform for local businesses. Shipped multi-tenant onboarding, email and SMS campaign tooling, and business-facing dashboards. Authored a Storybook-driven React component library used across multiple product teams.",
      metrics: [],
      stack: ["React", "TypeScript", "Storybook", "Node.js"],
      hue: 340,
      href: "#",
      tags: ["react", "typescript", "storybook", "node"],
      tech: [
        { icon: "react", label: "React" },
        { icon: "ts", label: "TypeScript" },
        { icon: "storybook", label: "Storybook" },
        { icon: "node", label: "Node.js" },
      ],
      status: {
        primary: "SHIPPED · MULTI-TENANT SAAS",
        secondary: "role: core feature engineer",
      },
    },
  ] as ReadonlyArray<Project>,
} as const;
