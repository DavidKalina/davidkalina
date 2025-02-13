import React from "react";
import { cn } from "@/lib/utils";

const baseStyles = `
  relative 
  inline-flex
  items-center
  bg-white
  text-slate-800
  text-sm
  border
  border-slate-800
  rounded-full
  px-3
  py-0.5
  font-sketch
  overflow-visible
  before:absolute
  before:inset-0
  before:border
  before:border-slate-800
  before:rounded-full
  before:-rotate-1
  before:translate-x-[0.5px]
  before:-translate-y-[0.5px]
  before:opacity-10
  after:absolute
  after:inset-0
  after:border
  after:border-slate-800
  after:rounded-full
  after:rotate-1
  after:-translate-x-[0.5px]
  after:translate-y-[0.5px]
  after:opacity-10
  [&>*]:relative
  [&>*]:z-10
`;

const variants = {
  default: "",
  blue: `
    bg-blue-100
    text-blue-900
    border-blue-900
    before:border-blue-900
    after:border-blue-900
  `,
  green: `
    bg-green-100
    text-green-900
    border-green-900
    before:border-green-900
    after:border-green-900
  `,
  red: `
    bg-red-100
    text-red-900
    border-red-900
    before:border-red-900
    after:border-red-900
  `,
  yellow: `
    bg-yellow-100
    text-yellow-900
    border-yellow-900
    before:border-yellow-900
    after:border-yellow-900
  `,
};

interface ExcalidrawBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
  className?: string;
}

const ExcalidrawBadge = React.forwardRef<HTMLSpanElement, ExcalidrawBadgeProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    return (
      <span ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </span>
    );
  }
);

ExcalidrawBadge.displayName = "ExcalidrawBadge";

// Demo component to show all variants
const ExcalidrawBadgeDemo = () => {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      <ExcalidrawBadge>Default</ExcalidrawBadge>
      <ExcalidrawBadge variant="blue">Blue</ExcalidrawBadge>
      <ExcalidrawBadge variant="green">Success</ExcalidrawBadge>
      <ExcalidrawBadge variant="red">Error</ExcalidrawBadge>
      <ExcalidrawBadge variant="yellow">Warning</ExcalidrawBadge>
      <ExcalidrawBadge className="bg-purple-100 text-purple-900 border-purple-900">
        Custom
      </ExcalidrawBadge>
    </div>
  );
};

export { ExcalidrawBadge, ExcalidrawBadgeDemo };
