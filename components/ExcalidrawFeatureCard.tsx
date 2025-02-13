import React from "react";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { cn } from "@/lib/utils";

interface ExcalidrawFeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

const ExcalidrawFeatureCard = React.forwardRef<HTMLDivElement, ExcalidrawFeatureCardProps>(
  ({ children, className }, ref) => {
    return (
      <ExcalidrawCard ref={ref} className={cn("bg-black p-4 lg:p-6", className)}>
        <p className="font-sketch text-base text-white">{children}</p>
      </ExcalidrawCard>
    );
  }
);

ExcalidrawFeatureCard.displayName = "ExcalidrawFeatureCard";

export default ExcalidrawFeatureCard;
