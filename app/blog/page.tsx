import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/blog-data";
import { BookOpen, Clock } from "lucide-react";
import { ArticleCard } from "../components/ArticleCard";

// Configure static generation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Blog | David Kalina",
  description: "Read my latest articles about software development, technology, and more.",
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-800/95 dark:to-zinc-900/95">
      {/* Hero Section */}
      <div className="relative border-b border-zinc-100 dark:border-zinc-700/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Blog
            </h1>
            <p className="font-mono text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Exploring software development, technology, and the intersection of code and
              creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-1.5 rounded-full font-mono text-sm">
                Software Development
              </Badge>
              <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-1.5 rounded-full font-mono text-sm">
                Technology
              </Badge>
              <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-1.5 rounded-full font-mono text-sm">
                Web Development
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Grid Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            <h2 className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Latest Articles
            </h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="font-mono">Sort by Date</span>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts?.length ? (
            posts.map((post) => (
              <ArticleCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                readTime={post.readTime}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-4 mb-6">
                <BookOpen className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="font-mono text-xl font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                No Articles Yet
              </h3>
              <p className="font-mono text-zinc-600 dark:text-zinc-400 max-w-md">
                I&apos;m currently working on some exciting articles. Check back soon for new
                content!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
