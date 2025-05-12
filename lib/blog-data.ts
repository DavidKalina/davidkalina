import { parseMarkdown } from "./markdown";
import type { Database } from "@/types/supabase";
import { supabase } from "./supabase";

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
  const { data: articles, error } = await supabase
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

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return Promise.all(
    (articles as (Article & { article_tags: ArticleTag[] })[]).map(async (article) => {
      // If we have cached HTML content, use it
      if (article.html_content) {
        return {
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          date: article.date,
          readTime: article.read_time,
          comments: article.comments_count,
          tags: article.article_tags.map((at) => at.tags.name),
          content: article.html_content,
          markdownContent: article.markdown_content,
        };
      }

      // Otherwise, parse the markdown
      const parsed = await parseMarkdown(article.markdown_content);

      // Optionally update the article with the parsed HTML
      await supabase.from("articles").update({ html_content: parsed.content }).eq("id", article.id);

      return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        date: article.date,
        readTime: article.read_time,
        comments: article.comments_count,
        tags: article.article_tags.map((at) => at.tags.name),
        content: parsed.content,
        markdownContent: article.markdown_content,
      };
    })
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data: article, error } = await supabase
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

  if (error || !article) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  const typedArticle = article as Article & { article_tags: ArticleTag[] };

  // If we have cached HTML content, use it
  if (typedArticle.html_content) {
    return {
      id: typedArticle.id,
      slug: typedArticle.slug,
      title: typedArticle.title,
      excerpt: typedArticle.excerpt,
      category: typedArticle.category,
      date: typedArticle.date,
      readTime: typedArticle.read_time,
      comments: typedArticle.comments_count,
      tags: typedArticle.article_tags.map((at) => at.tags.name),
      content: typedArticle.html_content,
      markdownContent: typedArticle.markdown_content,
    };
  }

  // Otherwise, parse the markdown
  const parsed = await parseMarkdown(typedArticle.markdown_content);

  // Update the article with the parsed HTML
  await supabase
    .from("articles")
    .update({ html_content: parsed.content })
    .eq("id", typedArticle.id);

  return {
    id: typedArticle.id,
    slug: typedArticle.slug,
    title: typedArticle.title,
    excerpt: typedArticle.excerpt,
    category: typedArticle.category,
    date: typedArticle.date,
    readTime: typedArticle.read_time,
    comments: typedArticle.comments_count,
    tags: typedArticle.article_tags.map((at) => at.tags.name),
    content: parsed.content,
    markdownContent: typedArticle.markdown_content,
  };
}
