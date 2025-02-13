import React from "react";
import { LucideIcon } from "lucide-react";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { ExcalidrawIconWrapper } from "./ExcalidrawIconWrapper";
import { cn } from "@/lib/utils";

interface ExcalidrawStatCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ExcalidrawStatCard = React.forwardRef<HTMLDivElement, ExcalidrawStatCardProps>(
  ({ icon, title, children, className }, ref) => {
    return (
      <ExcalidrawCard ref={ref} className={cn("p-4 space-y-2", className)}>
        <ExcalidrawIconWrapper icon={icon} className="bg-zinc-900" iconClassName="text-zinc-400" />
        <p className="font-sketch text-base font-bold text-zinc-900">{title}</p>
        <div className="font-sketch text-sm text-zinc-600">{children}</div>
      </ExcalidrawCard>
    );
  }
);

ExcalidrawStatCard.displayName = "ExcalidrawStatCard";

export default ExcalidrawStatCard;
