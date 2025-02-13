import React from "react";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { cn } from "@/lib/utils";

interface ExcalidrawStatusProps {
  status: "available" | "busy" | "offline";
  title: string;
  description: string;
  className?: string;
}

const statusColors = {
  available: "bg-emerald-500",
  busy: "bg-amber-500",
  offline: "bg-slate-500",
};

export const ExcalidrawStatus = React.forwardRef<HTMLDivElement, ExcalidrawStatusProps>(
  ({ status, title, description, className }, ref) => {
    return (
      <ExcalidrawCard ref={ref} className={cn("p-6", className)}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", statusColors[status])} />
            <p className="font-sketch text-sm font-bold text-slate-900">{title}</p>
          </div>
          <p className="font-sketch text-sm text-slate-600">{description}</p>
        </div>
      </ExcalidrawCard>
    );
  }
);

ExcalidrawStatus.displayName = "ExcalidrawStatus";
