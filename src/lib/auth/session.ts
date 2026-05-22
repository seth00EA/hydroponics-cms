import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { AuthSession, Profile, UserRole } from "@/types/auth";

function mapProfile(row: {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}): Profile {
  return {
    id: row.id,
    email: row.email,
    full_name: row.full_name,
    role: row.role,
    created_at: row.created_at,
  };
}

export async function getAuthSession(): Promise<AuthSession | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) return null;

  return {
    userId: user.id,
    email: user.email ?? profile.email,
    profile: mapProfile(profile as Profile),
  };
}

export async function ownerExists(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return false;

  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "owner");

  if (error) {
    console.error("[auth] ownerExists:", error.message);
    return false;
  }

  return (count ?? 0) > 0;
}
