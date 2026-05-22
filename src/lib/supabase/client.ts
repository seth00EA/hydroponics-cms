import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Browser Supabase client for Client Components.
 * Returns null when env vars are missing (static fallback mode).
 */
export function createClient() {
  const env = getSupabaseEnv();
  if (!env) return null;

  return createBrowserClient<Database>(env.url, env.anonKey);
}
