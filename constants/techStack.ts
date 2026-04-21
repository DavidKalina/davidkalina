export type Skill = {
  name: string;
  yrs: string;
  note: string;
};

export type StackCategory = {
  idx: string;
  title: string;
  lede: string;
  skills: ReadonlyArray<Skill>;
};

export const TECH_STACK_CONSTANTS = {
  section: {
    number: "001",
    eyebrow: "EXPERTISE",
    headlinePrefix: "The ",
    headlineAccent: "tools",
    headlineSuffix: "",
    headlineLine2: "I reach for.",
    paragraph:
      "TypeScript on both ends of the wire, with a growing kit for cloud infrastructure and AI-powered tooling. A small, sharpened set of tools instead of a sprawling one — every entry here has earned its place through production use.",
    quote: "“Mastery is a small pile of tools, well-kept.”",
  },
  categories: [
    {
      idx: "01",
      title: "Frontend",
      lede: "Applications that feel fast and stay out of the way.",
      skills: [
        { name: "TypeScript", yrs: "3+ yrs", note: "Advanced types, strict mode, schema-driven contracts." },
        { name: "React", yrs: "3+ yrs", note: "Hooks, suspense, perf tuning, complex component trees." },
        { name: "Next.js", yrs: "3 yrs", note: "App router, RSC, streaming, ISR." },
        { name: "Vue.js", yrs: "1+ yrs", note: "Composition API, production SPA maintenance." },
        { name: "Storybook", yrs: "2 yrs", note: "Reusable component libraries, shared design systems." },
        { name: "Tailwind", yrs: "3 yrs", note: "Design tokens, dark mode, component variants." },
      ],
    },
    {
      idx: "02",
      title: "Backend",
      lede: "Servers that wake up, do one thing well, and go back to sleep.",
      skills: [
        { name: "Node.js", yrs: "3+ yrs", note: "Event-driven services, perf optimization, security." },
        { name: "Bun", yrs: "1 yr", note: "Fast runtime, built-in bundler, TS-first." },
        { name: "Express", yrs: "3 yrs", note: "REST APIs, middleware patterns, error boundaries." },
        { name: "GraphQL", yrs: "1+ yrs", note: "Schema design, resolver patterns, frontend DX." },
      ],
    },
    {
      idx: "03",
      title: "Cloud, Data & DevOps",
      lede: "Event-driven infrastructure that doesn't wake anyone up.",
      skills: [
        { name: "AWS", yrs: "1+ yrs", note: "Lambda, SQS, S3 — serverless and queue-driven workflows." },
        { name: "Terraform", yrs: "1+ yrs", note: "IaC for serverless functions, queues, and storage." },
        { name: "Docker", yrs: "3 yrs", note: "Multi-stage builds, Compose, CI integration." },
        { name: "PostgreSQL", yrs: "3 yrs", note: "Query tuning, indexing, data modeling." },
        { name: "Redis", yrs: "2 yrs", note: "Caching, pub/sub, session stores." },
      ],
    },
    {
      idx: "04",
      title: "Mobile & AI",
      lede: "Cross-platform apps and AI-native tooling.",
      skills: [
        { name: "React Native", yrs: "1+ yrs", note: "Driver-facing apps, App Store submissions." },
        { name: "Vercel AI SDK", yrs: "1 yr", note: "Document processing pipelines, structured outputs." },
        { name: "Claude Code", yrs: "1 yr", note: "Agentic dev workflows, custom skill authoring." },
        { name: "Anthropic Agent SDK", yrs: "1 yr", note: "MCP integrations, tool authoring, prompt engineering." },
      ],
    },
  ] as ReadonlyArray<StackCategory>,
} as const;
