"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signInAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

const initialState: AuthActionResult = {};

export function AdminLoginForm({ supabaseEnabled }: { supabaseEnabled: boolean }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  if (!supabaseEnabled) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Supabase is not configured. Add <code className="font-mono">.env.local</code>{" "}
          or complete{" "}
          <Link href="/admin/setup" className="font-medium underline">
            owner setup
          </Link>{" "}
          after connecting.
        </p>
        <p className="text-sm text-muted">
          For local UI preview without auth, configure Supabase first (see docs/AUTH.md).
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {errorParam === "no_admin_access" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
          This account does not have admin access.
        </p>
      )}
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
          {state.error}
        </p>
      )}
      <Input label="Email" name="email" type="email" placeholder="owner@example.com" required />
      <Input label="Password" name="password" type="password" required />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-xs text-muted">
        First time?{" "}
        <Link href="/admin/setup" className="text-primary hover:underline">
          Create owner account
        </Link>
      </p>
    </form>
  );
}
