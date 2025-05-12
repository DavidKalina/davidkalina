import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: BlogPost | undefined = blogPosts.find((post) => post.slug === params.slug);

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
  return blogPosts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post: BlogPost | undefined = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white/80 dark:bg-zinc-800/95 pt-32 pb-16">
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
            <div className="flex items-center gap-2">
              <MessageSquare size={14} />
              <span className="font-mono text-xs">{post.comments} comments</span>
            </div>
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
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {/* This is where the actual blog post content would go */}
          <p className="font-mono text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Example content - replace with actual blog post content */}
          <div className="space-y-6 font-mono text-zinc-600 dark:text-zinc-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-200 mt-12 mb-6">
              Getting Started
            </h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            {/* Add more content sections as needed */}
          </div>
        </div>

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
