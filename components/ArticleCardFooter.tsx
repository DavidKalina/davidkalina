import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

interface ArticleCardFooterProps {
  readTime: string;
}

export const ArticleCardFooter = ({ readTime }: ArticleCardFooterProps) => {
  return (
    <div className="p-6 lg:p-8 bg-white dark:bg-zinc-800/95 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-700/50 px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-zinc-400 dark:text-zinc-300" />
            <span className="font-mono text-xs">{readTime}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
            group-hover:text-[#333] dark:group-hover:text-white w-full justify-between
            hover:bg-transparent"
        >
          <span className="relative">
            READ ARTICLE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight
            size={16}
            className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500 dark:group-hover:text-blue-400"
          />
        </Button>
      </div>
    </div>
  );
};
