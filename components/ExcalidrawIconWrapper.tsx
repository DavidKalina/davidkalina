import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Code2, Heart, Star, Sun } from "lucide-react";

const baseStyles = `
  relative 
  inline-flex
  items-center
  justify-center
  p-4
  border
  border-slate-800
  rounded-2xl
  overflow-visible
  bg-[length:5px_5px]
  bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.08)_0px,transparent_1px,transparent_2px,rgba(255,255,255,0.08)_3px)]
  before:absolute
  before:inset-0
  before:border
  before:border-slate-800
  before:rounded-2xl
  before:-rotate-1
  before:translate-x-[0.5px]
  before:-translate-y-[0.5px]
  before:opacity-10
  after:absolute
  after:inset-0
  after:border
  after:border-slate-800
  after:rounded-2xl
  after:rotate-1
  after:-translate-x-[0.5px]
  after:translate-y-[0.5px]
  after:opacity-10
`;

const patternOverlay = `
  before:content-['']
  before:absolute
  before:inset-0
  before:rounded-2xl
  before:opacity-[0.15]
  before:bg-[length:12px_12px]
  before:bg-[repeating-linear-gradient(-45deg,transparent_0px,transparent_2px,currentColor_2px,transparent_3px)]
  before:z-0
`;

interface ExcalidrawIconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  iconClassName?: string;
  iconSize?: number;
  className?: string;
  hidePattern?: boolean;
}

const ExcalidrawIconWrapper = React.forwardRef<HTMLDivElement, ExcalidrawIconWrapperProps>(
  ({ icon: Icon, iconClassName, iconSize = 24, className, hidePattern = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(baseStyles, !hidePattern && patternOverlay, "bg-black", className)}
        {...props}
      >
        <Icon size={iconSize} className={cn("relative z-10 text-white", iconClassName)} />
      </div>
    );
  }
);

ExcalidrawIconWrapper.displayName = "ExcalidrawIconWrapper";

// Demo component showing different uses
const ExcalidrawIconWrapperDemo = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Default black background */}
      <ExcalidrawIconWrapper icon={Code2} />

      {/* Custom background color */}
      <ExcalidrawIconWrapper icon={Heart} className="bg-red-500" iconClassName="text-red-100" />

      {/* Different size */}
      <ExcalidrawIconWrapper
        icon={Star}
        iconSize={32}
        className="bg-yellow-500"
        iconClassName="text-yellow-100"
      />

      {/* Custom styling */}
      <ExcalidrawIconWrapper icon={Sun} className="bg-blue-500 p-6" iconClassName="text-blue-100" />

      {/* Without pattern */}
      <ExcalidrawIconWrapper
        icon={Code2}
        className="bg-purple-500"
        iconClassName="text-purple-100"
        hidePattern={true}
      />
    </div>
  );
};

export { ExcalidrawIconWrapper, ExcalidrawIconWrapperDemo };
