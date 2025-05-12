import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

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
  // Use gray-matter to parse the frontmatter
  const { data, content } = matter(markdown);

  // Use remark to convert markdown to HTML
  const processedContent = await remark().use(html).process(content);

  return {
    content: processedContent.toString(),
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
