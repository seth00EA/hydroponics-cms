"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { getAuthSession, ownerExists } from "@/lib/auth/session";
import { canManageStaff } from "@/lib/auth/permissions";

export type AuthActionResult = {
  error?: string;
  success?: string;
};

export async function signInAction(
  _prev: AuthActionResult,
  formData: FormData,
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured. Use demo mode or add .env.local." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Could not connect to Supabase." };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "owner" && profile?.role !== "staff") {
    await supabase.auth.signOut();
    return { error: "You do not have admin access. Contact the store owner." };
  }

  redirect("/admin/dashboard");
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function setupOwnerAction(
  _prev: AuthActionResult,
  formData: FormData,
): Promise<AuthActionResult> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  if (await ownerExists()) {
    return { error: "An owner account already exists." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password || password.length < 8) {
    return { error: "Email, name, and password (min 8 characters) are required." };
  }

  const admin = createAdminClient();
  if (!admin) {
    return {
      error:
        "SUPABASE_SERVICE_ROLE_KEY is required for initial owner setup. Add it to .env.local.",
    };
  }

  const { data: userData, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (createError || !userData.user) {
    return { error: createError?.message ?? "Failed to create owner account." };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({
      email,
      full_name: fullName,
      role: "owner",
    })
    .eq("id", userData.user.id);

  if (profileError) {
    return { error: profileError.message };
  }

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signInWithPassword({ email, password });
  }

  redirect("/admin/dashboard");
}

export async function changePasswordAction(
  _prev: AuthActionResult,
  formData: FormData,
): Promise<AuthActionResult> {
  const session = await getAuthSession();
  if (!session || session.profile.role !== "owner") {
    return { error: "Only the owner can change this password." };
  }

  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Could not connect to Supabase." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  revalidatePath("/admin/account");
  return { success: "Password updated successfully." };
}

export async function createStaffAction(
  _prev: AuthActionResult,
  formData: FormData,
): Promise<AuthActionResult> {
  const session = await getAuthSession();
  if (!session || !canManageStaff(session.profile.role)) {
    return { error: "Only the owner can add staff accounts." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  if (!email || !password || password.length < 8) {
    return { error: "Email, name, and password (min 8 characters) are required." };
  }

  const admin = createAdminClient();
  if (!admin) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY is required to create staff accounts." };
  }

  const { data: userData, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (createError || !userData.user) {
    return { error: createError?.message ?? "Failed to create staff account." };
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({
      email,
      full_name: fullName,
      role: "staff",
    })
    .eq("id", userData.user.id);

  if (profileError) return { error: profileError.message };

  revalidatePath("/admin/staff");
  return { success: `Staff account created for ${email}.` };
}

export async function removeStaffFormAction(userId: string): Promise<void> {
  await removeStaffAction(userId);
}

export async function removeStaffAction(userId: string): Promise<AuthActionResult> {
  const session = await getAuthSession();
  if (!session || !canManageStaff(session.profile.role)) {
    return { error: "Only the owner can remove staff." };
  }

  if (userId === session.userId) {
    return { error: "You cannot remove your own account." };
  }

  const admin = createAdminClient();
  if (!admin) return { error: "Service role key required." };

  const { data: target } = await admin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (target?.role !== "staff") {
    return { error: "Only staff accounts can be removed here." };
  }

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };

  revalidatePath("/admin/staff");
  return { success: "Staff account removed." };
}
