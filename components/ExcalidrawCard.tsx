import React from "react";
import { cn } from "@/lib/utils";

const baseStyles = `
  relative 
  rounded-xl
  border
  border-zinc-200
  overflow-visible
  bg-white
  bg-[length:4px_4px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.01)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.01)_3px)]
  before:absolute
  before:inset-0
  before:rounded-xl
  before:shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]
  after:absolute
  after:inset-[1px]
  after:rounded-lg
  after:border
  after:border-zinc-100
  after:opacity-50
`;

const patternOverlay = `
  before:content-['']
  before:absolute
  before:inset-0
  before:rounded-xl
  before:opacity-[0.02]
  before:bg-[length:16px_16px]
  before:bg-[repeating-linear-gradient(-45deg,transparent_0px,transparent_3px,currentColor_3px,transparent_4px)]
  before:z-0
`;

interface ExcalidrawCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  contentClassName?: string;
  hidePattern?: boolean;
  variant?: "default" | "solid" | "subtle";
}

const ExcalidrawCard = React.forwardRef<HTMLDivElement, ExcalidrawCardProps>(
  (
    { children, className, contentClassName, hidePattern = false, variant = "default", ...props },
    ref
  ) => {
    const variantStyles = {
      default: "bg-white border-zinc-200",
      solid: "bg-zinc-900 border-zinc-800 text-white",
      subtle: "bg-zinc-50 border-zinc-100",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          !hidePattern && patternOverlay,
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Content wrapper to ensure proper z-index */}
        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      </div>
    );
  }
);

ExcalidrawCard.displayName = "ExcalidrawCard";

// Demo component showing different uses
const ExcalidrawCardDemo = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Basic card */}
      <ExcalidrawCard className="p-6">
        <h3 className="font-sketch text-lg font-bold mb-2">Simple Card</h3>
        <p className="font-sketch">This is a basic card with some content.</p>
      </ExcalidrawCard>

      {/* Solid variant */}
      <ExcalidrawCard variant="solid" className="p-6">
        <h3 className="font-sketch text-lg font-bold mb-2">Solid Card</h3>
        <p className="font-sketch text-zinc-300">This card has a solid background.</p>
      </ExcalidrawCard>

      {/* Subtle variant */}
      <ExcalidrawCard variant="subtle" className="p-6">
        <h3 className="font-sketch text-lg font-bold mb-2">Subtle Card</h3>
        <p className="font-sketch text-zinc-600">This card has a subtle background.</p>
      </ExcalidrawCard>

      {/* Card with custom content layout */}
      <ExcalidrawCard
        className="bg-blue-50 border-blue-100"
        contentClassName="grid grid-cols-2 gap-4 p-6"
      >
        <div>
          <h3 className="font-sketch text-lg font-bold mb-2">Left Content</h3>
          <p className="font-sketch">Some content on the left side.</p>
        </div>
        <div>
          <h3 className="font-sketch text-lg font-bold mb-2">Right Content</h3>
          <p className="font-sketch">Some content on the right side.</p>
        </div>
      </ExcalidrawCard>

      {/* Card without pattern */}
      <ExcalidrawCard className="p-6" hidePattern={true}>
        <h3 className="font-sketch text-lg font-bold mb-2">Clean Card</h3>
        <p className="font-sketch">This card has no background pattern.</p>
      </ExcalidrawCard>
    </div>
  );
};

export { ExcalidrawCard, ExcalidrawCardDemo };
