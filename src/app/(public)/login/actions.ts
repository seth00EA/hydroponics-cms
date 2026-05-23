"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type CustomerAuthState = {
  error?: string;
};

function safeRedirectPath(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/account";
  }

  if (path.startsWith("/admin")) {
    return "/account";
  }

  return path;
}

export async function customerSignInAction(
  _prev: CustomerAuthState,
  formData: FormData,
): Promise<CustomerAuthState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeRedirectPath(String(formData.get("redirect_to") ?? "/account"));

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Could not connect to Supabase." };

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(redirectTo);
}

export async function customerSignOutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}
