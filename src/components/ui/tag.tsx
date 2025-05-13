
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  onRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center text-xs px-2 py-1 rounded-md font-medium",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-primary text-primary-foreground": variant === "primary",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "border border-input bg-background": variant === "outline",
        },
        className
      )}
    >
      <span className="truncate">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full hover:bg-white/20 p-0.5"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  );
};
