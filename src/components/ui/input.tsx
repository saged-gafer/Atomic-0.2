import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => (
    <div className="w-full space-y-1.5">
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-md",
          error && "border-red-500/50 focus-visible:ring-red-500/30",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-[10px] font-bold text-red-400/80 ml-1">
          {error}
        </span>
      )}
    </div>
  )
);

Input.displayName = "Input";
