import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().default("admin@example.com"),
  ADMIN_FULL_NAME: z.string().default("Kevin Mok"),
  AI_BLOG_DEMO_MODE: z.enum(["0", "1"]).default("0"),
  E2E_BYPASS_AUTH: z.enum(["0", "1"]).default("0")
});

const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "admin@example.com",
  ADMIN_FULL_NAME: process.env.ADMIN_FULL_NAME ?? "Kevin Mok",
  AI_BLOG_DEMO_MODE: process.env.AI_BLOG_DEMO_MODE ?? "0",
  E2E_BYPASS_AUTH: process.env.E2E_BYPASS_AUTH ?? "0"
});

export const appEnv = {
  siteUrl: parsedEnv.NEXT_PUBLIC_SITE_URL,
  supabaseUrl: parsedEnv.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: parsedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: parsedEnv.SUPABASE_SERVICE_ROLE_KEY,
  databaseUrl: parsedEnv.DATABASE_URL,
  adminEmail: parsedEnv.ADMIN_EMAIL.toLowerCase(),
  adminFullName: parsedEnv.ADMIN_FULL_NAME,
  demoMode: parsedEnv.AI_BLOG_DEMO_MODE === "1",
  authBypass: parsedEnv.E2E_BYPASS_AUTH === "1"
};

export function isDatabaseConfigured() {
  return Boolean(appEnv.databaseUrl);
}

export function isSupabaseConfigured() {
  return Boolean(appEnv.supabaseUrl && appEnv.supabaseAnonKey);
}

export function isDemoMode() {
  return appEnv.demoMode;
}

export function isAuthBypassed() {
  return appEnv.authBypass && process.env.NODE_ENV !== "production";
}
