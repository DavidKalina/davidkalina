import fs from "fs";
import path from "path";
import { parseMarkdown } from "./markdown";
import { calculateReadTime } from "./utils";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const parsed = await parseMarkdown(raw);
      const readTime = calculateReadTime(parsed.content);

      return {
        id: slug,
        slug,
        title: parsed.metadata.title,
        excerpt: parsed.metadata.excerpt,
        category: parsed.metadata.category,
        date: parsed.metadata.date,
        readTime,
        tags: parsed.metadata.tags,
        content: parsed.content,
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = await parseMarkdown(raw);
  const readTime = calculateReadTime(parsed.content);

  return {
    id: slug,
    slug,
    title: parsed.metadata.title,
    excerpt: parsed.metadata.excerpt,
    category: parsed.metadata.category,
    date: parsed.metadata.date,
    readTime,
    tags: parsed.metadata.tags,
    content: parsed.content,
  };
}
