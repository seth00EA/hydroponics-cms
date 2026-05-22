"use client";

import { useActionState } from "react";
import { setupOwnerAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionResult = {};

export function OwnerSetupForm() {
  const [state, formAction, pending] = useActionState(setupOwnerAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <p className="rounded-lg bg-primary-light/50 px-3 py-2 text-xs text-primary">
        Create the first <strong>owner</strong> account. Requires{" "}
        <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> in .env.local.
      </p>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
          {state.error}
        </p>
      )}
      <Input label="Full name" name="full_name" placeholder="Jordan Lee" required />
      <Input label="Email" name="email" type="email" placeholder="owner@verdantroots.com" required />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Min. 8 characters"
        required
        minLength={8}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create owner account"}
      </Button>
    </form>
  );
}
