import React from "react";
import { ExcalidrawCard } from "./ExcalidrawCard";
import { cn } from "@/lib/utils";

interface ExcalidrawFormAlertProps {
  type: "success" | "error";
  message: string;
  className?: string;
}

const alertStyles = {
  success: "bg-emerald-50 border-emerald-500 text-emerald-700",
  error: "bg-red-50 border-red-500 text-red-700",
};

export const ExcalidrawFormAlert = React.forwardRef<HTMLDivElement, ExcalidrawFormAlertProps>(
  ({ type, message, className }, ref) => {
    return (
      <ExcalidrawCard ref={ref} className={cn("p-4", alertStyles[type], className)}>
        <p className="font-sketch text-sm">{message}</p>
      </ExcalidrawCard>
    );
  }
);

ExcalidrawFormAlert.displayName = "ExcalidrawFormAlert";
