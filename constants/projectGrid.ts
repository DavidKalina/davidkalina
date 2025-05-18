export type Project = {
  id: number;
  title: string;
  description: string;
  tags: readonly string[];
  icon: string;
  bgColor: string;
  metrics: Record<string, string>;
  year: string;
  href?: string;
  source?: string | null;
};

export const PROJECT_GRID_CONSTANTS = {
  section: {
    number: "004",
    title: "Recent Projects",
    description:
      "A selection of recent projects showcasing my expertise in full-stack development, from interactive user interfaces to robust backend systems.",
  },
  projects: [
    {
      id: 1,
      title: "WebMine",
      description: "Real-time analytics dashboard for tracking sales, inventory, and customer data",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT", "STRIPE"],
      icon: "Layout",
      bgColor: "bg-emerald-500",
      metrics: {
        technology: "Cutting Edge",
        architecture: "Modular",
        ui: "Modern",
      },
      year: "2023",
      href: "https://webmine.davidkalina.com",
      source: null,
    },
    {
      id: 6,
      title: "Flowty.io Real-Time Notification Center",
      description:
        "Built with Firebase and TypeScript, significantly improving engagement and retention.",
      tags: ["FIREBASE", "TYPESCRIPT", "REACT"],
      icon: "Bell",
      bgColor: "bg-orange-500",
      metrics: {
        "Notifications Sent": "1M+",
        "Retention Increase": "15%",
      },
      year: "2022",
      href: "https://flowty.io",
      source: null,
    },
    {
      id: 2,
      title: "AI Content Optimization Tool",
      description:
        "AI-powered content categorization tool using OpenAI's GPT-4, enhancing engagement workflows for Kent State University's OEOC.",
      tags: ["OPENAI", "NEXT.JS", "SUPABASE", "D3.JS"],
      icon: "Brain",
      bgColor: "bg-blue-500",
      metrics: {
        "Content Analyzed": "100K+",
        accuracy: "95%",
        performance: "97",
      },
      year: "2024",
      source: null,
    },
    {
      id: 3,
      title: "Alfaphox/Revive Ratings",
      description:
        "A white-label review management tool that contributed to a product sale valued at over $400,000.",
      tags: ["REACT", "NODE.JS", "TYPESCRIPT", "FIREBASE"],
      icon: "Star",
      bgColor: "bg-red-500",
      metrics: {
        users: "5K+",
        revenue: "$400K+",
        retention: "80%",
      },
      year: "2023",
      source: null,
    },
    {
      id: 4,
      title: "Progressive Web App for Maxwell Pipeline Services",
      description:
        "A PWA designed to streamline operations, achieving several thousand monthly uses.",
      tags: ["REACT", "PWA", "SUPABASE"],
      icon: "Globe",
      bgColor: "bg-green-500",
      metrics: {
        "Monthly Uses": "10K+",
        "Efficiency Boost": "40%",
      },
      year: "2023",
      source: null,
    },
    {
      id: 5,
      title: "Automated Email Distribution System",
      description:
        "SendGrid API-based automation reducing email processing time from 4-5 hours to 20-30 minutes.",
      tags: ["PYTHON", "SENDGRID", "NODE.JS"],
      icon: "Mail",
      bgColor: "bg-indigo-500",
      metrics: {
        emailsProcessed: "500K+",
        speedImprovement: "10x",
      },
      year: "2021",
      source: null,
    },
  ] as readonly Project[],
} as const;
