import { Badge } from "@/components/ui/badge";
import { ArticleCardFooter } from "@/components/ArticleCardFooter";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

// Map categories to gradient colors
const categoryGradients = {
  Technology: "from-[#3B82F6] to-[#2563EB]",
  Development: "from-[#10B981] to-[#059669]",
  Design: "from-[#8B5CF6] to-[#7C3AED]",
  Business: "from-[#F59E0B] to-[#D97706]",
  default: "from-[#64748B] to-[#475569]",
} as const;

export function ArticleCard({ slug, title, excerpt, category, readTime }: ArticleCardProps) {
  // Get gradient based on category or use default
  const gradientClass =
    categoryGradients[category as keyof typeof categoryGradients] || categoryGradients.default;

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
        {/* Dynamic Gradient Header */}
        <div className={cn("relative bg-gradient-to-br h-[200px] p-6 lg:p-8", gradientClass)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),rgba(255,255,255,0))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            {/* Category Badge */}
            <Badge
              className="bg-white/20 backdrop-blur-sm text-white px-3 lg:px-4 py-2 
              rounded-full text-[10px] lg:text-xs font-mono mb-4
              border border-white/10 hover:bg-white/30 transition-colors duration-300"
            >
              {category}
            </Badge>

            {/* Title */}
            <h3
              className="font-mono text-xl font-bold text-white mb-3
              group-hover:text-white/90 transition-colors duration-300
              drop-shadow-sm"
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p className="font-mono text-sm text-white/80 line-clamp-3 drop-shadow-sm">{excerpt}</p>
          </div>
        </div>

        {/* Content Footer */}
        <ArticleCardFooter readTime={readTime} />
      </div>
    </Link>
  );
}
