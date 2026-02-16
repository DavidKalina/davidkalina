export const ABOUT_CONSTANTS = {
  section: {
    number: "002",
    title: "About Me",
  },
  bio: {
    heading: "Full-stack developer crafting thoughtful solutions that put people first",
    paragraphs: [
      "I believe in building technology that enhances rather than replaces human capabilities. With over four years of experience, I focus on creating applications that are both powerful and intuitive.",
      "My approach combines technical expertise with a deep appreciation for human needs and experiences. I enjoy mentoring others and building tools that make a real difference in people's daily lives.",
    ],
  },
  stats: {
    coreSkills: {
      title: "Core Skills",
      content: "React, Next.js, TypeScript\nNode.js, SQL, Supabase",
    },
    interests: {
      title: "Interests",
      content: "Human-Centered Design\nTool Creation",
    },
  },
  cta: {
    contact: "GET IN TOUCH",
    github: "GITHUB",
  },
  featuredWork: {
    title: "FEATURED WORK",
    project: {
      name: "ALFAPHOX/REVIVE",
      year: "2024",
      description:
        "Designed and launched a white-label review management tool, contributing to a $400k+ product sale",
    },
  },
  currentFocus: {
    title: "CURRENT FOCUS",
    items: [
      "Building tools that amplify human capabilities",
      "Creating intuitive, accessible interfaces",
      "Fostering collaborative development environments",
    ],
  },
} as const;
