import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    variant?: ButtonVariant;
  }>;

export function buttonClassName(variant: ButtonVariant = "primary") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[6px] border px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-px",
    variant === "primary" &&
      "border-accent/50 bg-accentSoft text-accent hover:border-accent hover:bg-accent/16 hover:text-ink",
    variant === "secondary" &&
      "border-line bg-surfaceMuted text-ink hover:border-accent/40 hover:bg-surfaceStrong hover:text-accent",
    variant === "ghost" &&
      "border-transparent bg-transparent text-muted hover:border-line hover:bg-surfaceMuted hover:text-ink"
  );
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(buttonClassName(variant), className)} {...props} />;
}
