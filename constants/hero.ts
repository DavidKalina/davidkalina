export const HERO_CONSTANTS = {
  eyebrow: "Full-Stack Software Engineer · Colorado / Remote",
  availability: "",
  headline: {
    line1: "I make things",
    accent: "better and simpler ",
    line2After: "than they were yesterday.",
    line3: "Cheaper too, usually.",
  },
  description: {
    before: "I ask the tough questions and ",
    accent: "narrow the scope.",
    after: "AI handles the gruntwork.",
  },
  cta: {
    primary: "VIEW SELECTED WORK",
    secondary: "GET IN TOUCH",
  },
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
