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

export async function customerGoogleSignInAction(
  formData: FormData,
): Promise<void> {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase");
  }

  const redirectTo = safeRedirectPath(
    String(formData.get("redirect_to") ?? "/account"),
  );

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/login?error=supabase");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(
        redirectTo,
      )}`,
    },
  });

  if (error || !data.url) {
    redirect("/login?error=google");
  }

  redirect(data.url);
}

export async function customerSignOutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}