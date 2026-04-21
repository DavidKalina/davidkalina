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
    counter: "05 / 05",
    headlineLine1: "Recent",
    headlineAccent: "work.",
    paragraph:
      "A selection of things shipped to real users — from notification infrastructure and AI content pipelines to white-label SaaS and progressive web apps. Case studies on request.",
  },
  projects: [
    {
      num: "05",
      year: "2024",
      title: "Real-time Notification Center",
      client: "Flowty.io",
      role: "Full-stack, from schema to UI",
      blurb:
        "Built a durable notification pipeline on Firebase + TypeScript. Engagement and retention measurably up, notification fatigue measurably down.",
      metrics: [
        ["Notifications sent", "1M+"],
        ["Retention lift", "+15%"],
      ],
      stack: ["Firebase", "TypeScript", "React"],
      hue: 75,
      href: "https://flowty.io",
    },
    {
      num: "04",
      year: "2024",
      title: "AI Content Optimization Tool",
      client: "Kent State OEOC",
      role: "Lead engineer",
      blurb:
        "GPT-4-powered content categorization and ranking, embedded into the university's engagement workflow. D3-driven visualizations for editors.",
      metrics: [
        ["Content analyzed", "100k+"],
        ["Accuracy", "95%"],
        ["Lighthouse", "97"],
      ],
      stack: ["OpenAI", "Next.js", "Supabase", "D3"],
      hue: 265,
      href: "#",
    },
    {
      num: "03",
      year: "2023",
      title: "Alfaphox / Revive Ratings",
      client: "White-label SaaS",
      role: "Design & engineering lead",
      blurb:
        "Review-management platform for local businesses, built as a white-label product. Contributed to a product sale valued north of $400k.",
      metrics: [
        ["Users", "5k+"],
        ["Revenue", "$400k+"],
        ["Retention", "80%"],
      ],
      stack: ["React", "Node.js", "TypeScript", "Firebase"],
      hue: 340,
      href: "#",
    },
    {
      num: "02",
      year: "2023",
      title: "Maxwell Pipeline PWA",
      client: "Maxwell Pipeline Services",
      role: "Full-stack",
      blurb:
        "Progressive web app for field ops — offline-tolerant, installable, used across warehouses and job sites.",
      metrics: [
        ["Monthly uses", "10k+"],
        ["Efficiency", "+40%"],
      ],
      stack: ["React", "PWA", "Supabase"],
      hue: 175,
      href: "#",
    },
    {
      num: "01",
      year: "2021",
      title: "Email Distribution Automation",
      client: "Internal operations",
      role: "Backend",
      blurb:
        "SendGrid-driven automation that compressed a manual four-hour daily email run into a twenty-minute self-service flow.",
      metrics: [
        ["Emails processed", "500k+"],
        ["Speed", "10×"],
      ],
      stack: ["Python", "SendGrid", "Node.js"],
      hue: 210,
      href: "#",
    },
  ] as ReadonlyArray<Project>,
} as const;
