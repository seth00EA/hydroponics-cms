import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth/session";
import {
  canAccessAdmin,
  canManageStaff,
  canManageContactSettings,
} from "@/lib/auth/permissions";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { AuthSession } from "@/types/auth";

export async function requireAdminSession(): Promise<AuthSession | null> {
  if (!isSupabaseConfigured()) return null;
  const session = await getAuthSession();
  if (!session || !canAccessAdmin(session.profile.role)) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireOwnerSession(): Promise<AuthSession> {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");
  if (!canManageStaff(session.profile.role)) {
    redirect("/admin/dashboard");
  }
  return session;
}

export async function requireOwnerForContact(): Promise<AuthSession> {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");
  if (!canManageContactSettings(session.profile.role)) {
    redirect("/admin/dashboard");
  }
  return session;
}
