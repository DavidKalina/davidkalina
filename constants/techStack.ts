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
      "TypeScript on both ends of the wire. A small, sharpened kit instead of a sprawling one — every tool here has earned its place through years of production use.",
    quote: "“Mastery is a small pile of tools, well-kept.”",
  },
  categories: [
    {
      idx: "01",
      title: "Frontend",
      lede: "Applications that feel fast and stay out of the way.",
      skills: [
        { name: "TypeScript", yrs: "5+ yrs", note: "Advanced types, zod schemas, strict mode everywhere." },
        { name: "React", yrs: "5+ yrs", note: "Hooks, suspense, perf tuning, complex component trees." },
        { name: "Next.js", yrs: "3 yrs", note: "App router, RSC, streaming, ISR." },
        { name: "Vue", yrs: "3 yrs", note: "Composition API, Pinia, enterprise SPAs." },
        { name: "Tailwind", yrs: "3 yrs", note: "Design tokens, dark mode, component variants." },
        { name: "HTML / CSS", yrs: "—", note: "Semantic markup, accessibility, modern layout." },
      ],
    },
    {
      idx: "02",
      title: "Backend",
      lede: "Servers that wake up, do one thing well, and go back to sleep.",
      skills: [
        { name: "Node.js", yrs: "4+ yrs", note: "Event-driven services, perf optimization, security." },
        { name: "Express", yrs: "4 yrs", note: "REST APIs, middleware patterns, error boundaries." },
        { name: "Bun", yrs: "1 yr", note: "Fast runtime, built-in bundler, TS-first." },
        { name: "WebSockets", yrs: "3 yrs", note: "Realtime channels, scaling, fallback strategies." },
      ],
    },
    {
      idx: "03",
      title: "Data & Infrastructure",
      lede: "Schemas that make sense in a year.",
      skills: [
        { name: "PostgreSQL", yrs: "4 yrs", note: "Query tuning, indexing, data modeling." },
        { name: "Supabase", yrs: "2 yrs", note: "RLS, realtime, edge functions, auth." },
        { name: "Redis", yrs: "2 yrs", note: "Caching, pub/sub, session stores." },
      ],
    },
    {
      idx: "04",
      title: "Cloud & DevOps",
      lede: "Deploying without waking anyone up.",
      skills: [
        { name: "AWS", yrs: "2+ yrs", note: "EC2, S3, Lambda, IaC fundamentals." },
        { name: "DigitalOcean", yrs: "3 yrs", note: "Droplets, managed DBs, container hosting." },
        { name: "Docker", yrs: "3 yrs", note: "Multi-stage builds, Compose, CI integration." },
      ],
    },
  ] as ReadonlyArray<StackCategory>,
} as const;
