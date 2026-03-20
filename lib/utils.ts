import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { appEnv } from "@/lib/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, appEnv.siteUrl).toString();
}
