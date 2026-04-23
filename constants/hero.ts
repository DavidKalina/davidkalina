export const HERO_CONSTANTS = {
  eyebrow: "Full-Stack Software Engineer · Colorado / Remote",
  availability: "",
  headline: {
    line1: "I build scalable",
    accent: "systems ",
    line2After: "and solve real-world ",
    line3: "problems—end to end.",
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
    { label: "Saved annually", value: "$20", unit: "k+" },
    { label: "Domains shipped", value: "3", unit: "+" },
  ],
} as const;

import {
  BookOpen,
  Brain,
  Cable,
  CheckCheck,
  Ear,
  Eye,
  FileText,
  FlaskConical,
  GitMerge,
  Hammer,
  HelpCircle,
  Pencil,
  PenLine,
  Puzzle,
  Rocket,
  Ruler,
  ScanEye,
  Search,
  type LucideIcon,
} from "lucide-react";

export type SubStep = { fn: string; icon: LucideIcon };

export type ProcessStep = {
  fn: string;
  icon: LucideIcon;
  sub: readonly [SubStep, SubStep];
};

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    fn: "listen",
    icon: Ear,
    sub: [
      { fn: "parse", icon: Puzzle },
      { fn: "reflect", icon: Brain },
    ],
  },
  {
    fn: "clarify",
    icon: Search,
    sub: [
      { fn: "ask", icon: HelpCircle },
      { fn: "confirm", icon: CheckCheck },
    ],
  },
  {
    fn: "sketch",
    icon: Pencil,
    sub: [
      { fn: "model", icon: Ruler },
      { fn: "outline", icon: FileText },
    ],
  },
  {
    fn: "build",
    icon: Hammer,
    sub: [
      { fn: "write", icon: PenLine },
      { fn: "wire", icon: Cable },
    ],
  },
  {
    fn: "review",
    icon: ScanEye,
    sub: [
      { fn: "read", icon: BookOpen },
      { fn: "test", icon: FlaskConical },
    ],
  },
  {
    fn: "ship",
    icon: Rocket,
    sub: [
      { fn: "merge", icon: GitMerge },
      { fn: "observe", icon: Eye },
    ],
  },
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
