import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const baseFieldStyles = `
  font-sketch
  text-sm
  bg-white
  border
  border-slate-800
  rounded-xl
  transition-all
  duration-75
  focus:outline-none
  focus:ring-0
  before:absolute
  before:inset-0
  before:border
  before:border-slate-800
  before:rounded-xl
  before:-rotate-1
  before:translate-x-[0.5px]
  before:-translate-y-[0.5px]
  before:opacity-10
  after:absolute
  after:inset-0
  after:border
  after:border-slate-800
  after:rounded-xl
  after:rotate-1
  after:-translate-x-[0.5px]
  after:translate-y-[0.5px]
  after:opacity-10
`;

interface ExcalidrawFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

interface ExcalidrawTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export const ExcalidrawInput = React.forwardRef<HTMLInputElement, ExcalidrawFieldProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="font-sketch text-xs text-slate-500 block pl-1">{label}</label>}
        <div className="relative">
          <Input ref={ref} className={cn(baseFieldStyles, "h-12 px-4", className)} {...props} />
        </div>
      </div>
    );
  }
);

export const ExcalidrawTextarea = React.forwardRef<HTMLTextAreaElement, ExcalidrawTextAreaProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="font-sketch text-xs text-slate-500 block pl-1">{label}</label>}
        <div className="relative">
          <Textarea
            ref={ref}
            className={cn(baseFieldStyles, "min-h-[200px] p-4", className)}
            {...props}
          />
        </div>
      </div>
    );
  }
);

ExcalidrawInput.displayName = "ExcalidrawInput";
ExcalidrawTextarea.displayName = "ExcalidrawTextarea";
