import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Forgot Admin Password",
};

export default function AdminForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            VR
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Reset admin password</h1>
        <p className="mt-1 text-sm text-muted">
          Send a password reset email for {siteConfig.name} admin access.
        </p>
        <Link href="/" className="mt-3 inline-block text-sm text-primary hover:underline">
          Back to Website
        </Link>
      </div>

      <Card>
        <ForgotPasswordForm />
      </Card>
    </div>
  );
}
