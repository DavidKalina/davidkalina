import React from "react";
import { ExcalidrawBadge } from "./ExcalidrawBadge";
import { cn } from "@/lib/utils";

interface ExcalidrawFeaturedWorkProps {
  title: string;
  year: string;
  description: string;
  className?: string;
}

const ExcalidrawFeaturedWork = React.forwardRef<HTMLDivElement, ExcalidrawFeaturedWorkProps>(
  ({ title, year, description, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <p className="font-sketch text-sm text-white/90">FEATURED WORK</p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <ExcalidrawBadge className="bg-black text-white">{title}</ExcalidrawBadge>
            <span className="font-sketch text-sm text-white/90">{year}</span>
          </div>
          <p className="font-sketch text-base text-white/80">{description}</p>
        </div>
      </div>
    );
  }
);

ExcalidrawFeaturedWork.displayName = "ExcalidrawFeaturedWork";

export default ExcalidrawFeaturedWork;
