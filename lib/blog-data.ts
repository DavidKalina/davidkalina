import { parseMarkdown } from "./markdown";
import type { Database } from "@/types/supabase";
import { supabase } from "./supabase";
import { calculateReadTime } from "./utils";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleTag = Database["public"]["Tables"]["article_tags"]["Row"] & {
  tags: Database["public"]["Tables"]["tags"]["Row"];
};

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  comments: number;
  tags: string[];
  content: string;
  markdownContent: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data: articles } = await supabase
    .from("articles")
    .select(
      `
      *,
      article_tags (
        tags (
          name
        )
      )
    `
    )
    .order("date", { ascending: false });

  const posts = await Promise.all(
    (articles as (Article & { article_tags: ArticleTag[] })[]).map(async (article) => {
      // If we have cached HTML content, use it
      if (article.html_content) {
        const readTime = calculateReadTime(article.html_content);
        // Update read time in database if it's different
        if (readTime !== article.read_time) {
          await supabase.from("articles").update({ read_time: readTime }).eq("id", article.id);
        }
        return {
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          date: article.date,
          readTime,
          comments: article.comments_count,
          tags: article.article_tags.map((at) => at.tags.name),
          content: article.html_content,
          markdownContent: article.markdown_content,
        };
      }

      // Otherwise, parse the markdown
      const parsed = await parseMarkdown(article.markdown_content);
      const readTime = calculateReadTime(parsed.content);

      // Update the article with the parsed HTML and read time
      await supabase
        .from("articles")
        .update({
          html_content: parsed.content,
          read_time: readTime,
        })
        .eq("id", article.id);

      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        date: article.date,
        readTime,
        comments: article.comments_count,
        tags: article.article_tags.map((at) => at.tags.name),
        content: parsed.content,
        markdownContent: article.markdown_content,
      };
    })
  );

  // Always include the sample post at the beginning
  return [...posts];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data: article } = await supabase
    .from("articles")
    .select(
      `
      *,
      article_tags (
        tags (
          name
        )
      )
    `
    )
    .eq("slug", slug)
    .single();

  const typedArticle = article as Article & { article_tags: ArticleTag[] };

  // If we have cached HTML content, use it
  if (typedArticle.html_content) {
    const readTime = calculateReadTime(typedArticle.html_content);
    // Update read time in database if it's different
    if (readTime !== typedArticle.read_time) {
      await supabase.from("articles").update({ read_time: readTime }).eq("id", typedArticle.id);
    }
    return {
      id: typedArticle.id,
      slug: typedArticle.slug,
      title: typedArticle.title,
      excerpt: typedArticle.excerpt,
      category: typedArticle.category,
      date: typedArticle.date,
      readTime,
      comments: typedArticle.comments_count,
      tags: typedArticle.article_tags.map((at) => at.tags.name),
      content: typedArticle.html_content,
      markdownContent: typedArticle.markdown_content,
    };
  }

  // Otherwise, parse the markdown
  const parsed = await parseMarkdown(typedArticle.markdown_content);
  const readTime = calculateReadTime(parsed.content);

  // Update the article with the parsed HTML and read time
  await supabase
    .from("articles")
    .update({
      html_content: parsed.content,
      read_time: readTime,
    })
    .eq("id", typedArticle.id);

  return {
    id: typedArticle.id,
    slug: typedArticle.slug,
    title: typedArticle.title,
    excerpt: typedArticle.excerpt,
    category: typedArticle.category,
    date: typedArticle.date,
    readTime,
    comments: typedArticle.comments_count,
    tags: typedArticle.article_tags.map((at) => at.tags.name),
    content: parsed.content,
    markdownContent: typedArticle.markdown_content,
  };
}
