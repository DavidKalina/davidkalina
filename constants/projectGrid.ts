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
  | "vue"
  | "openai"
  | "redis"
  | "express";

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
      num: "01",
      year: "2026",
      title: "Side Quests",
      client: "Independent",
      role: "Sole developer — design, architecture, implementation",
      blurb:
        "Mobile app that turns real-world venues and activities into digital 'side quests' that challenge people to step out of their comfort zone and help them build a life they respect.",
      metrics: [],
      stack: [
        "React Native",
        "TypeScript",
        "OpenAI",
        "MCP",
        "Google Places",
        "Redis",
      ],
      hue: 200,
      href: "#",
      tags: [
        "react-native",
        "typescript",
        "openai",
        "mcp",
        "google-places",
        "redis",
      ],
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
          role: "LANGUAGE",
          body: "Language of the entire <b>monorepo</b> — app, agent, tools, shared types. One toolchain top to bottom.",
        },
        {
          icon: "openai",
          label: "OpenAI",
          role: "PLANNER",
          body: "Onboarding interviewer + quest generator tuned to energy level. <b>MCP</b> exposes <b>places.search</b>, <b>calendar.book</b>, <b>profile.recall</b> — clean boundary between reasoning and side-effects.",
        },
        {
          icon: "gp",
          label: "Google Places",
          role: "REALITY",
          body: "Grounds every suggestion in a real venue — hours, crowd level, photos. <b>No hallucinated spots.</b>",
        },
        {
          icon: "redis",
          label: "Redis",
          role: "CACHE",
          body: "Caches Places responses per venue and query. Hot lookups skip the API entirely — <b>trimming spend</b> on repeat suggestions.",
        },
      ],
      journey: {
        label: "USER JOURNEY · 7 min first session",
        steps: [
          {
            title: "Guided onboarding",
            sub: "Agent asks about interests, comfort zone, energy.",
            tech: "OpenAI · React Native",
          },
          {
            title: "Quest proposed",
            sub: "'Walk past the Sunday market. Stay 10 min. No need to buy.'",
            tech: "OpenAI · MCP",
          },
          {
            title: "Grounded in real venue",
            sub: "Hours, photos, and walking time from Places — hot venues served from Redis.",
            tech: "Google Places · Redis",
          },
          {
            title: "Low-pressure check-in",
            sub: "One tap. How'd it feel? 1–5.",
            tech: "React Native",
          },
          {
            title: "Next quest adapts",
            sub: "Agent tunes difficulty based on feedback + streak.",
            tech: "OpenAI · TypeScript",
          },
        ],
      },
      status: {
        primary: "BUILDING · TESTFLIGHT BETA APR 2026",
        secondary: "role: solo · design + eng + ai",
      },
    },
    {
      num: "02",
      year: "2025",
      title: "AI Document Processing Pipeline",
      client: "Eel Data Systems",
      role: "Full-stack — pipeline, infra, GraphQL API",
      blurb:
        "AI-powered pipeline for TMS software saving $2k+ a month. Extracts structured data from shipping documents in a non-blocking, asynchronous workflow.",
      metrics: [
        ["Token cost", "1/50th"],
        ["Saved annually", "$20k+"],
        ["Uses per day", "100s"],
      ],
      stack: [
        "Vue",
        "Express",
        "SQS",
        "AWS Lambda",
        "Vercel AI SDK",
        "Terraform",
      ],
      hue: 75,
      href: "#",
      tags: [
        "vue",
        "express",
        "sqs",
        "aws-lambda",
        "vercel-ai-sdk",
        "terraform",
      ],
      tech: [
        {
          icon: "vue",
          label: "Vue",
          role: "CLIENT",
          body: "PDF upload form, job status polling, and the <b>auto-fill</b> flow that saves operators hours of manual entry.",
        },
        {
          icon: "express",
          label: "Express",
          role: "API",
          body: "Plain REST — endpoints for upload, poll, and hydrate. Form fills the moment the worker finishes writing.",
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
            tech: "SQS · Express",
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
            tech: "Vue · Express",
          },
        ],
      },
      status: {
        primary: "SHIPPED · 1/50TH TOKEN COST",
        secondary: "role: full-stack · pipeline + infra + api",
      },
      links: [
        {
          label: "app.cudacartagetms.com",
          href: "https://app.cudacartagetms.com",
        },
      ],
    },
  ] as ReadonlyArray<Project>,
} as const;
