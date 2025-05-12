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

// Sample blog post for testing
const samplePost: BlogPost = {
  id: "welcome",
  slug: "welcome",
  title: "Welcome to My Blog",
  excerpt: "A showcase of my blog's features including code snippets, images, and more.",
  category: "Getting Started",
  date: new Date().toISOString(),
  readTime: "5 min read",
  comments: 0,
  tags: ["blog", "features", "markdown"],
  content: `
    <h1>Welcome to My Blog</h1>
    
    <p>Welcome to my corner of the internet! This post demonstrates the various features available in my blog posts, from code snippets to images and everything in between.</p>

    <h2>Code Snippets</h2>
    
    <p>Let's start with some code examples. Here's a simple React component:</p>

    <pre><code class="language-typescript">interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}</code></pre>

    <p>And here's a highlighted code block showing a Next.js API route:</p>

    <pre><code class="language-typescript">// This line is highlighted
export async function GET(request: Request) {
  // These lines are highlighted
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const results = await searchDatabase(query);
  // These lines are highlighted
  return Response.json({ results });
}</code></pre>

    <h2>Images</h2>

    <p>Here's an example of an image with a caption:</p>

    <figure>
      <img 
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop" 
        alt="Code on a laptop screen" 
      />
      <figcaption>A beautiful workspace setup for coding</figcaption>
    </figure>

    <h2>Lists and Formatting</h2>

    <p>Here are some key features of this blog:</p>

    <ul>
      <li>✨ Beautiful typography and spacing</li>
      <li>🎨 Syntax highlighting for code blocks</li>
      <li>📸 Responsive images with captions</li>
      <li>🌓 Dark mode support</li>
      <li>📱 Mobile-friendly design</li>
    </ul>

    <h2>Code Copy Button</h2>

    <p>Try copying this code block using the button in the top-right corner:</p>

    <pre><code class="language-javascript">// A simple counter component
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}</code></pre>

    <h2>Links and References</h2>

    <p>You can find more information about the technologies used in this blog:</p>

    <ul>
      <li><a href="https://nextjs.org">Next.js</a> - The React framework used</li>
      <li><a href="https://tailwindcss.com">Tailwind CSS</a> - For styling</li>
      <li><a href="https://mdxjs.com">MDX</a> - For enhanced markdown</li>
    </ul>

    <p>That's it for now! Feel free to explore the other posts and features of the blog.</p>
  `,
  markdownContent: "", // This would be the original markdown content
};

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
    // Calculate read time for sample post
    const samplePostWithReadTime = {
      ...samplePost,
      readTime: calculateReadTime(samplePost.content),
    };
    return [samplePostWithReadTime];
  }

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

  // Calculate read time for sample post
  const samplePostWithReadTime = {
    ...samplePost,
    readTime: calculateReadTime(samplePost.content),
  };

  // Always include the sample post at the beginning
  return [samplePostWithReadTime, ...posts];
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
    if (slug === "welcome") {
      // Calculate read time for sample post
      return {
        ...samplePost,
        readTime: calculateReadTime(samplePost.content),
      };
    }
    return null;
  }

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
