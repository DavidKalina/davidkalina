import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface MarkdownContent {
  content: string;
  metadata: {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    tags: string[];
  };
}

export async function parseMarkdown(markdown: string): Promise<MarkdownContent> {
  const { data, content } = matter(markdown);

  const result = await remark().use(html).process(content);

  return {
    content: result.toString(),
    metadata: {
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      readTime: data.readTime,
      tags: data.tags || [],
    },
  };
}

// Optional: Function to validate markdown content
export function validateMarkdown(markdown: string): boolean {
  try {
    matter(markdown);
    return true;
  } catch {
    return false;
  }
}
