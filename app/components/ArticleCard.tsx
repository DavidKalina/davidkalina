import { Badge } from "@/components/ui/badge";
import { ArticleCardFooter } from "@/components/ArticleCardFooter";
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export function ArticleCard({ slug, title, excerpt, category, readTime }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-white dark:bg-zinc-800 rounded-2xl lg:rounded-3xl 
        border-2 border-zinc-100 dark:border-zinc-700/50 
        hover:border-black dark:hover:border-white 
        transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50
        hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
    >
      <div className="relative h-full">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-[#333] to-zinc-700 dark:from-zinc-700 dark:to-zinc-800 h-[200px] p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.04),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            {/* Category Badge */}
            <Badge
              className="bg-white/10 text-white px-3 lg:px-4 py-2 
              rounded-full text-[10px] lg:text-xs font-mono mb-4"
            >
              {category}
            </Badge>

            {/* Title */}
            <h3
              className="font-mono text-xl font-bold text-white mb-3
              group-hover:text-white/90 transition-colors duration-300"
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p className="font-mono text-sm text-white/60 line-clamp-3">{excerpt}</p>
          </div>
        </div>

        {/* Content Footer */}
        <ArticleCardFooter readTime={readTime} />
      </div>
    </Link>
  );
}
