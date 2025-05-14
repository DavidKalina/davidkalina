import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { getBlogPosts, type BlogPost } from "@/lib/blog-data";
import Script from "next/script";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type MetadataProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Generate metadata for each blog post
export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { params, searchParams }: MetadataProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | David Kalina's Blog`,
    description: post.excerpt,
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return (await getBlogPosts()).map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white/80 dark:bg-zinc-800/95 pt-32 pb-16">
      <Script id="code-block-setup">
        {`
          document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('pre code').forEach((block) => {
              const pre = block.parentElement;
              if (pre) {
                const button = document.createElement('div');
                button.innerHTML = \`
                  <button class="copy-button" aria-label="Copy code" title="Copy code">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                  </button>
                \`;
                pre.appendChild(button);

                button.addEventListener('click', async () => {
                  const code = block.textContent || '';
                  await navigator.clipboard.writeText(code);
                  
                  const icon = button.querySelector('svg');
                  if (icon) {
                    icon.innerHTML = \`
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    \`;
                    setTimeout(() => {
                      icon.innerHTML = \`
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      \`;
                    }, 2000);
                  }
                });
              }
            });
          });
        `}
      </Script>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/#blog">
            <Button
              variant="ghost"
              className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
                hover:text-[#333] dark:hover:text-white group/button"
            >
              <ArrowLeft
                size={16}
                className="mr-2 transition-transform group-hover/button:-translate-x-1"
              />
              BACK TO ARTICLES
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8 space-y-6">
          <div className="flex items-center gap-4">
            <Badge className="bg-[#333] dark:bg-zinc-700 text-white px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-xs font-mono">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <Clock size={14} />
              <span className="font-mono text-xs">{post.readTime}</span>
            </div>
          </div>

          <h1 className="font-mono text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-200">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <span className="font-mono text-xs">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-mono prose-p:font-mono prose-li:font-mono
            prose-headings:text-zinc-900 dark:prose-headings:text-zinc-200
            prose-p:text-zinc-600 dark:prose-p:text-zinc-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-code:text-zinc-900 dark:prose-code:text-zinc-200
            prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800
            prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800
            prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-700
            prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-700"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/<h1[^>]*>.*?<\/h1>/i, "") }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-700/50">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <Badge
                key={tag}
                className="bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200 
                  hover:bg-zinc-200 dark:hover:bg-zinc-600 px-3 py-1 rounded-full 
                  text-[10px] lg:text-xs font-mono transition-colors duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
