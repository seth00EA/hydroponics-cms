import Link from "next/link";
import { redirect } from "next/navigation";
import { OwnerSetupForm } from "@/components/admin/OwnerSetupForm";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/data/site";
import { ownerExists } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Owner Setup",
};

export default async function AdminSetupPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold">Supabase required</h1>
        <p className="mt-2 text-sm text-muted">
          Add environment variables from .env.example before creating an owner account.
        </p>
        <Link href="/admin/login" className="mt-4 inline-block text-primary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  if (await ownerExists()) {
    redirect("/admin/login");
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          VR
        </span>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Create owner account</h1>
        <p className="mt-1 text-sm text-muted">
          One-time setup for {siteConfig.name}
        </p>
      </div>
      <Card>
        <OwnerSetupForm />
      </Card>
    </div>
  );
}
