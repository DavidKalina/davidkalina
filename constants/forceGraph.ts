import type { SimulationNodeDatum, SimulationLinkDatum } from "d3-force";

export interface NodeDatum extends SimulationNodeDatum {
  id: string;
  label: string;
  emoji: string;
  group?: number;
  description: string;
}

export interface LinkDatum extends SimulationLinkDatum<NodeDatum> {
  value?: number;
}

export const defaultNodes: NodeDatum[] = [
  {
    id: "1",
    label: "1. Spark",
    emoji: "💡",
    group: 1,
    description: "Capture a raw idea without overthinking.",
  },
  {
    id: "2",
    label: "2. AI Draft",
    emoji: "🤖",
    group: 1,
    description: "Generate a rough draft using AI.",
  },
  {
    id: "3",
    label: "3. First Pass",
    emoji: "✍️",
    group: 2,
    description: "Refine the AI draft, shaping it with human intent.",
  },
  {
    id: "4",
    label: "4. Layering",
    emoji: "🖌️",
    group: 2,
    description: "Add depth, nuance, and creativity.",
  },
  {
    id: "5",
    label: "5. User Perspective",
    emoji: "👀",
    group: 3,
    description: "Step back, test usability, and ensure emotional connection.",
  },
  {
    id: "6",
    label: "6. Refinement Loops",
    emoji: "♻️",
    group: 3,
    description: "Iterate, tweak, and polish continuously.",
  },
  {
    id: "7",
    label: "7. Artistic Infusion",
    emoji: "🎭",
    group: 4,
    description: "Inject uniqueness, emotion, and human energy.",
  },
  {
    id: "8",
    label: "8. Feedback Loop",
    emoji: "💬",
    group: 4,
    description: "Gather insights and refine further.",
  },
  {
    id: "9",
    label: "9. Final Flourish",
    emoji: "✨",
    group: 5,
    description: "Make the final touches, ensuring a polished result.",
  },
  {
    id: "10",
    label: "10. Release & Evolve",
    emoji: "🚀",
    group: 5,
    description: "Launch, but keep improving over time.",
  },
];

export const defaultLinks: LinkDatum[] = [
  { source: "1", target: "2", value: 2 },
  { source: "2", target: "3", value: 2 },
  { source: "3", target: "4", value: 1.5 },
  { source: "4", target: "5", value: 1.5 },
  { source: "5", target: "6", value: 1.5 },
  { source: "6", target: "7", value: 1.5 },
  { source: "7", target: "8", value: 1.5 },
  { source: "8", target: "9", value: 1.5 },
  { source: "9", target: "10", value: 2 },
  { source: "8", target: "6", value: 1 }, // Feedback loop back to refinement
];
