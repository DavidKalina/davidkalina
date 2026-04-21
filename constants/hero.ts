export const HERO_CONSTANTS = {
  eyebrow: "Full-Stack Software Engineer · Colorado / Remote",
  availability: "AVAILABLE — Q2 2026",
  headline: {
    line1: "Human-centered",
    accent: "innovation",
    line2After: ", built on",
    line3: "scalable tech.",
  },
  description: {
    before: "I design and ship ",
    accent: "scalable, high-performing, non-blocking",
    after:
      " systems — quickly, quietly, and with an obsession for the humans who end up using them.",
  },
  cta: {
    primary: "VIEW SELECTED WORK",
    secondary: "GET IN TOUCH",
    tertiary: "RESUME",
  },
  stats: [
    { label: "Professional exp.", value: "4+", unit: "yrs" },
    { label: "Pipeline cost cut", value: "98", unit: "%" },
    { label: "Saved annually", value: "$12", unit: "k+" },
    { label: "Domains shipped", value: "3", unit: "+" },
  ],
} as const;

export type HeroNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  primary?: boolean;
};

export const HERO_GRAPH_NODES: HeroNode[] = [
  { id: "ts", label: "TS", x: 250, y: 250, r: 30, primary: true },
  { id: "react", label: "React", x: 140, y: 170, r: 20 },
  { id: "next", label: "Next", x: 370, y: 170, r: 20 },
  { id: "node", label: "Node", x: 140, y: 340, r: 20 },
  { id: "pg", label: "PG", x: 370, y: 340, r: 20 },
  { id: "tw", label: "Tw", x: 70, y: 100, r: 14 },
  { id: "vue", label: "Vue", x: 80, y: 240, r: 14 },
  { id: "bun", label: "Bun", x: 60, y: 400, r: 14 },
  { id: "gql", label: "GQL", x: 250, y: 410, r: 14 },
  { id: "rd", label: "Rd", x: 430, y: 400, r: 14 },
  { id: "aws", label: "AWS", x: 440, y: 260, r: 14 },
  { id: "tf", label: "TF", x: 420, y: 100, r: 14 },
  { id: "ai", label: "AI", x: 240, y: 80, r: 14 },
];

export const HERO_GRAPH_EDGES: ReadonlyArray<readonly [string, string]> = [
  ["ts", "react"],
  ["ts", "next"],
  ["ts", "node"],
  ["ts", "pg"],
  ["react", "tw"],
  ["react", "vue"],
  ["node", "bun"],
  ["node", "gql"],
  ["pg", "rd"],
  ["pg", "aws"],
  ["next", "tf"],
  ["next", "ai"],
  ["react", "next"],
  ["node", "pg"],
  ["pg", "gql"],
  ["aws", "tf"],
];

export const HERO_MARQUEE = [
  "TYPESCRIPT",
  "REACT",
  "NEXT.JS",
  "VUE",
  "NODE",
  "BUN",
  "GRAPHQL",
  "POSTGRES",
  "REDIS",
  "AWS",
  "TERRAFORM",
  "DOCKER",
  "TAILWIND",
  "REACT NATIVE",
] as const;
