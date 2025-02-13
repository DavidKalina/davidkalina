import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const baseStyles = `
  relative 
  rounded
  px-6
  py-2
  font-sketch
  transition-all
  duration-75
  overflow-visible
  border
  shadow-[2px_2px_0px_rgba(0,0,0,0.1)]
  active:shadow-[1px_1px_0px_rgba(0,0,0,0.1)]
  active:translate-x-px
  active:translate-y-px
  bg-[length:4px_4px]
  bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.015)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.015)_3px)]
  [&>*]:relative
  [&>*]:z-10
`;

// Variant styles with texture
const variants = {
  default: `
    bg-white
    text-zinc-800
    border-zinc-200
    hover:bg-zinc-50
    before:border-zinc-200
    after:border-zinc-200
  `,
  blue: `
    bg-blue-100
    text-blue-900
    border-blue-200
    shadow-[2px_2px_0px_rgba(30,58,138,0.1)]
    active:shadow-[1px_1px_0px_rgba(30,58,138,0.1)]
    hover:bg-blue-50
    before:border-blue-200
    after:border-blue-200
  `,
  green: `
    bg-green-100
    text-green-900
    border-green-200
    shadow-[2px_2px_0px_rgba(22,101,52,0.1)]
    active:shadow-[1px_1px_0px_rgba(22,101,52,0.1)]
    hover:bg-green-50
    before:border-green-200
    after:border-green-200
  `,
  red: `
    bg-red-100
    text-red-900
    border-red-200
    shadow-[2px_2px_0px_rgba(153,27,27,0.1)]
    active:shadow-[1px_1px_0px_rgba(153,27,27,0.1)]
    hover:bg-red-50
    before:border-red-200
    after:border-red-200
  `,
  ghost: `
    bg-transparent
    text-zinc-600
    border-transparent
    shadow-none
    hover:bg-zinc-100
    hover:text-zinc-900
    active:shadow-none
    before:border-transparent
    after:border-transparent
  `,
  outline: `
    bg-white
    text-zinc-800
    border-zinc-300
    shadow-[1px_1px_0px_rgba(0,0,0,0.05)]
    hover:bg-zinc-50
    before:border-zinc-300
    after:border-zinc-300
  `,
  solid: `
    bg-zinc-900
    text-white
    border-zinc-800
    shadow-[2px_2px_0px_rgba(0,0,0,0.2)]
    active:shadow-[1px_1px_0px_rgba(0,0,0,0.2)]
    hover:bg-zinc-800
    before:border-zinc-800
    after:border-zinc-800
  `,
};

// Additional texture styles for each variant
const textureOverlays = {
  default:
    "after:bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.015)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.015)_3px)]",
  blue: "after:bg-[repeating-linear-gradient(45deg,rgba(30,58,138,0.02)_0px,transparent_1px,transparent_2px,rgba(30,58,138,0.02)_3px)]",
  green:
    "after:bg-[repeating-linear-gradient(45deg,rgba(22,101,52,0.02)_0px,transparent_1px,transparent_2px,rgba(22,101,52,0.02)_3px)]",
  red: "after:bg-[repeating-linear-gradient(45deg,rgba(153,27,27,0.02)_0px,transparent_1px,transparent_2px,rgba(153,27,27,0.02)_3px)]",
  ghost: "",
  outline:
    "after:bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.01)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.01)_3px)]",
  solid:
    "after:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0px,transparent_1px,transparent_2px,rgba(255,255,255,0.03)_3px)]",
};

const sizes = {
  sm: "px-4 py-1 text-sm",
  md: "px-6 py-2",
  lg: "px-8 py-3 text-lg",
};

const disabledStyles = `
  bg-zinc-50
  text-zinc-400
  border-zinc-200
  shadow-none
  cursor-not-allowed
  before:border-zinc-200
  after:border-zinc-200
  hover:bg-zinc-50
  active:shadow-none
  active:translate-x-0
  active:translate-y-0
`;

interface ExcalidrawButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

const ExcalidrawButton = React.forwardRef<HTMLButtonElement, ExcalidrawButtonProps>(
  ({ children, className, variant = "default", size = "md", disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          textureOverlays[variant],
          sizes[size],
          disabled && disabledStyles,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ExcalidrawButton.displayName = "ExcalidrawButton";

// Demo component
const ExcalidrawButtonDemo = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Variants */}
      <div className="space-y-2">
        <h3 className="font-sketch text-sm text-zinc-500 mb-4">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <ExcalidrawButton>Default Button</ExcalidrawButton>
          <ExcalidrawButton variant="blue">Blue Button</ExcalidrawButton>
          <ExcalidrawButton variant="green">Green Button</ExcalidrawButton>
          <ExcalidrawButton variant="red">Red Button</ExcalidrawButton>
          <ExcalidrawButton variant="ghost">Ghost Button</ExcalidrawButton>
          <ExcalidrawButton variant="outline">Outline Button</ExcalidrawButton>
          <ExcalidrawButton variant="solid">Solid Button</ExcalidrawButton>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <h3 className="font-sketch text-sm text-zinc-500 mb-4">Sizes</h3>
        <div className="flex items-center gap-4">
          <ExcalidrawButton size="sm">Small</ExcalidrawButton>
          <ExcalidrawButton size="md">Medium</ExcalidrawButton>
          <ExcalidrawButton size="lg">Large</ExcalidrawButton>
        </div>
      </div>

      {/* States */}
      <div className="space-y-2">
        <h3 className="font-sketch text-sm text-zinc-500 mb-4">States</h3>
        <div className="flex gap-4">
          <ExcalidrawButton disabled>Disabled Button</ExcalidrawButton>
          <ExcalidrawButton variant="blue" disabled>
            Disabled Blue
          </ExcalidrawButton>
        </div>
      </div>
    </div>
  );
};

export { ExcalidrawButton, ExcalidrawButtonDemo };
