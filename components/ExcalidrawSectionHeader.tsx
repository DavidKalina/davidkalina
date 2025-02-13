import React from "react";
import { LucideIcon } from "lucide-react";
import { ExcalidrawIconWrapper } from "./ExcalidrawIconWrapper";
import { cn } from "@/lib/utils";

interface ExcalidrawSectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconBgColor?: string;
  className?: string;
}

const ExcalidrawSectionHeader = React.forwardRef<HTMLDivElement, ExcalidrawSectionHeaderProps>(
  ({ icon, title, subtitle, iconBgColor = "bg-black", className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-6 mb-8", className)}>
        <ExcalidrawIconWrapper icon={icon} className={iconBgColor} />
        <div>
          <p className="text-sm font-sketch text-zinc-500 mb-1">{subtitle}</p>
          <h2 className="text-3xl font-sketch font-bold text-zinc-900">{title}</h2>
        </div>
      </div>
    );
  }
);

ExcalidrawSectionHeader.displayName = "ExcalidrawSectionHeader";

export default ExcalidrawSectionHeader;
