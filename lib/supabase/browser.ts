"use client";

import { createBrowserClient } from "@supabase/ssr";
import { appEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  if (!appEnv.supabaseUrl || !appEnv.supabaseAnonKey) {
    throw new Error("Supabase is not configured.");
  }

  return createBrowserClient(appEnv.supabaseUrl, appEnv.supabaseAnonKey);
}
