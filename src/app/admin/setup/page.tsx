import Link from "next/link";
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
        <div className="mt-4 flex justify-center gap-4">
          <Link href="/admin/login" className="text-primary hover:underline">
            Back to Login
          </Link>
          <Link href="/" className="text-primary hover:underline">
            Back to Website
          </Link>
        </div>
      </div>
    );
  }

  const hasOwner = await ownerExists();

  if (hasOwner) {
    return (
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Owner account already exists.</h1>
          <p className="mt-2 text-sm text-muted">
            Use the admin login page to access {siteConfig.name} content management.
          </p>
        </div>

        <Card>
          <div className="space-y-3">
            <Link
              href="/admin/login"
              className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
            >
              Go to Admin Login
            </Link>
            <Link
              href="/"
              className="block rounded-lg border px-4 py-2 text-center text-sm font-medium hover:bg-muted/20"
            >
              Back to Website
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            VR
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Create owner account</h1>
        <p className="mt-1 text-sm text-muted">
          Set up the first admin account for {siteConfig.name}.
        </p>
        <Link href="/" className="mt-3 inline-block text-sm text-primary hover:underline">
          Back to Website
        </Link>
      </div>

      <Card>
        <OwnerSetupForm />
      </Card>
    </div>
  );
}
