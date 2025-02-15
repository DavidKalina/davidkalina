export interface NodeDatum extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  emoji: string;
  group?: number;
  description: string;
}

export interface LinkDatum extends d3.SimulationLinkDatum<NodeDatum> {
  value?: number;
}

export const defaultNodes: NodeDatum[] = [
  // Initial Phase - Understanding and Planning
  {
    id: "1",
    label: "1. Idea",
    emoji: "💡",
    group: 1,
    description:
      "Share your app idea with me. We'll discuss your vision, target audience, and core features that will make your app stand out in the market.",
  },
  {
    id: "2",
    label: "2. Discovery",
    emoji: "🔍",
    group: 1,
    description:
      "Deep dive into your requirements. We'll explore user stories, identify potential challenges, and outline the key functionalities needed for success.",
  },
  {
    id: "3",
    label: "3. Research",
    emoji: "📚",
    group: 1,
    description:
      "Market and technical research phase. We'll analyze competitors, explore technology options, and determine the best tech stack for your specific needs.",
  },

  // Planning Phase - Design and Architecture
  {
    id: "4",
    label: "4. Planning",
    emoji: "📋",
    group: 2,
    description:
      "Create a detailed project roadmap. We'll break down the development into sprints, set milestones, and establish clear deliverables and timelines.",
  },
  {
    id: "5",
    label: "5. UI/UX",
    emoji: "🎨",
    group: 2,
    description:
      "Design the user interface and experience. We'll create wireframes, mockups, and interactive prototypes to visualize your app before development begins.",
  },
  {
    id: "6",
    label: "6. Architecture",
    emoji: "🏗️",
    group: 2,
    description:
      "Design the technical architecture. We'll plan the database structure, API endpoints, and ensure scalability, security, and performance are built-in from the start.",
  },

  // Development Phase - Building and Testing
  {
    id: "7",
    label: "7. Development",
    emoji: "👨‍💻",
    group: 3,
    description:
      "Write clean, efficient code. We'll implement features according to the plan, following best practices and maintaining high code quality standards.",
  },
  {
    id: "8",
    label: "8. Testing",
    emoji: "🧪",
    group: 3,
    description:
      "Rigorous testing process. We'll conduct unit tests, integration tests, and user acceptance testing to ensure everything works flawlessly.",
  },
  {
    id: "9",
    label: "9. Feedback",
    emoji: "💭",
    group: 3,
    description:
      "Regular feedback loops. We'll review progress, gather your input, and make adjustments to ensure the app meets your vision and user needs.",
  },

  // Launch Phase - Deployment and Growth
  {
    id: "10",
    label: "10. Launch",
    emoji: "🚀",
    group: 4,
    description:
      "Deploy your app to production. We'll handle the deployment process, ensuring a smooth launch with monitoring and backup systems in place.",
  },
  {
    id: "11",
    label: "11. Maintenance",
    emoji: "🔧",
    group: 4,
    description:
      "Ongoing support and updates. We'll monitor performance, fix any issues that arise, and implement security patches to keep your app running smoothly.",
  },
  {
    id: "12",
    label: "12. Growth",
    emoji: "📈",
    group: 4,
    description:
      "Scale and improve your app. We'll analyze user data, implement new features, and optimize performance to help your app grow and succeed.",
  },
];

export const defaultLinks: LinkDatum[] = [
  // Initial phase
  { source: "1", target: "2", value: 2 },
  { source: "2", target: "3", value: 2 },

  // Planning phase
  { source: "3", target: "4", value: 2 },
  { source: "4", target: "5", value: 1.5 },
  { source: "4", target: "6", value: 1.5 },

  // Development phase
  { source: "5", target: "6", value: 1.5 },
  { source: "6", target: "7", value: 1.5 },
  { source: "7", target: "8", value: 1.5 },
  { source: "8", target: "9", value: 1.5 },
  { source: "9", target: "7", value: 1 }, // Feedback loop back to development

  // Launch and beyond
  { source: "8", target: "9", value: 2 },
  { source: "9", target: "10", value: 1.5 },
  { source: "10", target: "11", value: 1.5 },
  { source: "11", target: "12", value: 1 }, // Growth leads to more feedback
];
