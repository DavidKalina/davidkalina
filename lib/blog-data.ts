export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  comments: number;
  tags: string[];
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-modern-web-applications",
    title: "Building Modern Web Applications with Next.js and TypeScript",
    excerpt:
      "Learn how to create performant, type-safe web applications using Next.js and TypeScript. This guide covers best practices, common patterns, and advanced techniques.",
    category: "Development",
    date: "2024-03-20",
    readTime: "8 min read",
    comments: 12,
    tags: ["Next.js", "TypeScript", "Web Development", "React"],
  },
  {
    slug: "mastering-css-grid",
    title: "Mastering CSS Grid: A Comprehensive Guide",
    excerpt:
      "Dive deep into CSS Grid layout and learn how to create complex, responsive designs with ease. From basic concepts to advanced techniques.",
    category: "Design",
    date: "2024-03-15",
    readTime: "10 min read",
    comments: 8,
    tags: ["CSS", "Grid", "Web Design", "Layout"],
  },
  {
    slug: "optimizing-react-performance",
    title: "Optimizing React Performance: Tips and Tricks",
    excerpt:
      "Discover practical techniques to improve your React application's performance. Learn about memoization, code splitting, and other optimization strategies.",
    category: "Development",
    date: "2024-03-10",
    readTime: "6 min read",
    comments: 15,
    tags: ["React", "Performance", "JavaScript", "Web Development"],
  },
];
