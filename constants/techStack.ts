export const TECH_STACK_CONSTANTS = {
  section: {
    number: "001",
    title: "Technical Skills",
    description:
      "Focused on delivering high-performance web applications with modern technologies. Committed to continuous learning and best practices.",
  },
  categories: {
    frontend: {
      icon: "Laptop",
      title: "FRONTEND DEVELOPMENT",
      description: "Specializing in modern, user-centric web applications",
      skills: [
        {
          name: "TYPESCRIPT",
          level: "Advanced",
          proficiency: "4+ years of production experience",
          icon: "SiTypescript",
          iconColor: "text-blue-500 dark:text-blue-400",
        },
        {
          name: "REACT",
          level: "Advanced",
          proficiency: "Enterprise-level applications",
          icon: "SiReact",
          iconColor: "text-blue-400 dark:text-blue-300",
        },
        {
          name: "NEXT.JS",
          level: "Advanced",
          proficiency: "Full-stack applications",
          icon: "SiNextdotjs",
          iconColor: "text-black dark:text-white",
        },
      ],
    },
    backend: {
      icon: "Database",
      title: "BACKEND DEVELOPMENT",
      description: "Building scalable server-side solutions",
      skills: [
        {
          name: "NODE.JS",
          level: "Proficient",
          proficiency: "Production microservices",
          icon: "SiNodedotjs",
          iconColor: "text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "EXPRESS",
          level: "Proficient",
          proficiency: "REST API development",
          icon: "SiExpress",
          iconColor: "text-zinc-500 dark:text-zinc-300",
        },
        {
          name: "DOCKER",
          level: "Intermediate",
          proficiency: "Container orchestration",
          icon: "SiDocker",
          iconColor: "text-blue-400 dark:text-blue-300",
        },
      ],
    },
    database: {
      icon: "Layers",
      title: "DATABASE & INFRASTRUCTURE",
      description: "Database design and infrastructure management",
      skills: [
        {
          name: "SUPABASE",
          level: "Proficient",
          proficiency: "Full-stack integration",
          icon: "SiSupabase",
          iconColor: "text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "REDIS",
          level: "Intermediate",
          proficiency: "Caching & queuing",
          icon: "SiRedis",
          iconColor: "text-red-500 dark:text-red-400",
        },
      ],
    },
  },
} as const;
