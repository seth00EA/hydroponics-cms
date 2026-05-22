"use client";

import { useState } from "react";
import { useActionState } from "react";
import { setupOwnerAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionResult = {};

export function OwnerSetupForm() {
  const [state, formAction, pending] = useActionState(setupOwnerAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

      <div className="space-y-2">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 characters"
          required
          minLength={8}
        />
        <button type="button" className="text-xs text-primary hover:underline" onClick={() => setShowPassword((v) => !v)}>
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <div className="space-y-2">
        <Input
          label="Confirm password"
          name="confirm_password"
          type={showConfirm ? "text" : "password"}
          placeholder="Repeat password"
          required
          minLength={8}
        />
        <button type="button" className="text-xs text-primary hover:underline" onClick={() => setShowConfirm((v) => !v)}>
          {showConfirm ? "Hide confirm password" : "Show confirm password"}
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create owner account"}
      </Button>
    </form>
  );
}
