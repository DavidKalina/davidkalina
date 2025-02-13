import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExcalidrawInfoItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const ExcalidrawInfoItem = React.forwardRef<HTMLDivElement, ExcalidrawInfoItemProps>(
  ({ icon: Icon, title, description, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-4", className)}>
        <Icon size={20} className="text-slate-500" />
        <div>
          <p className="font-sketch text-sm text-slate-900 font-bold">{title}</p>
          <p className="font-sketch text-sm text-slate-600">{description}</p>
        </div>
      </div>
    );
  }
);

ExcalidrawInfoItem.displayName = "ExcalidrawInfoItem";
