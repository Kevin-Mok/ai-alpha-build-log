import type { MetadataRoute } from "next";
import { appEnv } from "@/lib/env";

export const siteConfig = {
  name: "AI Blog",
  shortName: "AI Blog",
  description:
    "A technical writing studio for AI-native product engineering, long-form notes, and pragmatic full-stack systems.",
  url: appEnv.siteUrl,
  email: "hello@aiblog.dev"
};

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const budgetRanges = [
  "Under $2k",
  "$2k - $5k",
  "$5k - $10k",
  "$10k - $25k",
  "$25k+"
] as const;

export const defaultManifest: MetadataRoute.Manifest = {
  name: siteConfig.name,
  short_name: siteConfig.shortName,
  description: siteConfig.description,
  start_url: "/",
  display: "standalone",
  background_color: "#091018",
  theme_color: "#091018"
};
