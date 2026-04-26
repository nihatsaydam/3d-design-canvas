import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
  label?: string;
  labelTone?: "red" | "neon" | "muted";
  size?: "sm" | "md" | "lg" | "square";
}

const ToolButton = forwardRef<HTMLButtonElement, ToolButtonProps>(
  ({ active, icon, label, labelTone = "red", size = "md", className, children, ...props }, ref) => {
    const sizeClass = {
      sm: "h-8 px-2 text-[10px]",
      md: "h-10 px-3 text-[11px]",
      lg: "h-12 px-4 text-xs",
      square: "h-12 w-12 text-[10px]",
    }[size];

    const toneClass = {
      red: "label-red",
      neon: "label-neon",
      muted: "text-muted-foreground",
    }[labelTone];

    return (
      <button
        ref={ref}
        className={cn(
          "tool-btn rounded-xl flex flex-col items-center justify-center gap-0.5 select-none",
          active && "tool-btn-active",
          sizeClass,
          className
        )}
        {...props}
      >
        {icon && <span className="opacity-90">{icon}</span>}
        {label && <span className={cn("uppercase tracking-wider", toneClass, active && "text-white")}>{label}</span>}
        {children}
      </button>
    );
  }
);
ToolButton.displayName = "ToolButton";

export default ToolButton;
