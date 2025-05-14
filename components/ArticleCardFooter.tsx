import { Button } from "@/components/ui/button";
import { Clock, MessageSquare, ArrowRight } from "lucide-react";

interface ArticleCardFooterProps {
  readTime: string;
  comments: number;
}

export const ArticleCardFooter = ({ readTime, comments }: ArticleCardFooterProps) => {
  return (
    <div className="p-6 lg:p-8 bg-white dark:bg-zinc-800">
      <div className="space-y-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="font-mono text-xs">{readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={14} />
            <span className="font-mono text-xs">{comments} comments</span>
          </div>
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          className="p-0 h-auto font-mono text-sm text-zinc-600 dark:text-zinc-300 
            group-hover:text-[#333] dark:group-hover:text-white w-full justify-between"
        >
          <span>READ ARTICLE</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
