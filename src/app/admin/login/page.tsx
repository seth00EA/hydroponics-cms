import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/data/site";
import { ownerExists } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage() {
  const supabaseEnabled = isSupabaseConfigured();
  if (supabaseEnabled && !(await ownerExists())) {
    redirect("/admin/setup");
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            VR
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">
          {siteConfig.name} content management
        </p>
      </div>
      <Card>
        <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
          <AdminLoginForm supabaseEnabled={supabaseEnabled} />
        </Suspense>
      </Card>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="text-primary hover:underline">
          ← Back to website
        </Link>
      </p>
    </div>
  );
}
