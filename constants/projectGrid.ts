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
  | "express"
  | "trpc"
  | "postgres"
  | "expo"
  | "fastify"
  | "maplibre";

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
  /** Seconds into the demo video at which this beat becomes active. Markers
   *  should ascend across a project's steps. Drives the scrubber when the
   *  project has a `demoVideoSrc`; ignored for the CSS-placeholder fallback. */
  time?: number;
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
  /** Muted screen-capture for the demo panel. When set, the scrubber is driven
   *  by the video's playback time (via each step's `time` marker) instead of
   *  the auto-advance timer. Leave unset to keep the CSS-placeholder demo. */
  demoVideoSrc?: string;
  /** Optional poster frame shown before the demo video loads. */
  demoPoster?: string;
  /** Orientation of the demo capture. "portrait" renders a phone-shaped (9:16)
   *  panel for footage shot on a mobile device; defaults to "landscape". */
  demoOrientation?: "portrait" | "landscape";
};

export const PROJECT_GRID_CONSTANTS = {
  section: {
    headlineLine1: "Recent",
    headlineAccent: "work.",
    paragraph:
      "Compact case studies on what I built, how I built it, and the impact it had.",
  },
  projects: [
    {
      num: "01˝",
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
    {
      num: "02",
      year: "2026",
      title: "Route King",
      client: "Independent",
      role: "Sole developer — design, architecture, implementation",
      blurb:
        "Discovery + tracking app for electric longboarders. Find trails, record rides offline-first, broadcast live to your crew, and compete for segment 'Kings' — best gate-to-gate time wins.",
      metrics: [
        ["Live stream", "SSE push"],
        ["Ride capture", "offline-first"],
        ["Every query", "spatial"],
      ],
      stack: [
        "React Native",
        "TypeScript",
        "tRPC",
        "PostGIS",
        "Redis",
        "MapLibre",
      ],
      hue: 145,
      href: "#",
      tags: [
        "react-native",
        "typescript",
        "trpc",
        "postgis",
        "redis",
        "maplibre",
      ],
      tech: [
        {
          icon: "expo",
          label: "React Native",
          role: "CLIENT",
          body: "Expo Router app — trail discovery, the live ride HUD (<b>elapsed</b>, splits, vibration ribbon), and ride capture that buffers fully <b>on-device</b> so a session is never lost to a dead zone.",
        },
        {
          icon: "ts",
          label: "TypeScript",
          role: "LANGUAGE",
          body: "End to end across the <b>pnpm monorepo</b> — app, Fastify backend, shared Zod schemas. Types flow from the DB to the screen.",
        },
        {
          icon: "trpc",
          label: "tRPC",
          role: "API",
          body: "tRPC v11 on Fastify. Location pings are mutations; viewers consume a <b>subscription over SSE</b> — typed end to end, auto-reconnecting, with a react-query polling fallback.",
        },
        {
          icon: "postgres",
          label: "PostGIS",
          role: "DATA",
          body: "Rides stored as PostGIS <b>geography</b> with a GIST index. Sync runs authoritative gate-timing on the canonical track and awards segment <b>Kings</b> — every core query is spatial.",
        },
        {
          icon: "realtime",
          label: "SSE",
          role: "LIVE",
          body: "Broadcast on by default. Each ping is persisted (late joiners replay) and published to an event bus; spectators render the <b>same server events</b> as the rider and can fire boosts.",
        },
        {
          icon: "redis",
          label: "Redis",
          role: "SCALE",
          body: "Pub/sub seam behind the <b>EventBus interface</b> — swap the in-memory bus for Redis to fan the live stream out across multiple backend replicas.",
        },
      ],
      journey: {
        label: "USER JOURNEY · record → sync → King",
        steps: [
          {
            title: "Start a ride",
            sub: "Pick a trail and a board. Broadcast goes live to your crew by default.",
            tech: "React Native · tRPC",
          },
          {
            title: "Captured on-device",
            sub: "GPS + accelerometer buffer locally and auto-pause when you stop — nothing lost to bad signal.",
            tech: "React Native",
          },
          {
            title: "Crew watches live",
            sub: "Pings stream over SSE; spectators see the dot move and send boosts.",
            tech: "tRPC · SSE",
          },
          {
            title: "Sync reconciles",
            sub: "Server runs gate-timing on the canonical track and awards segment Kings.",
            tech: "PostGIS",
          },
          {
            title: "Get your grade",
            sub: "Post-ride King Grade: speed-vs-King per segment plus how cleanly you rode.",
            tech: "TypeScript · PostGIS",
          },
        ],
      },
      status: {
        primary: "BUILDING · TESTFLIGHT BETA 2026",
        secondary: "role: solo · design + eng + realtime",
      },
      demoOrientation: "portrait",
    },
  ] as ReadonlyArray<Project>,
} as const;
