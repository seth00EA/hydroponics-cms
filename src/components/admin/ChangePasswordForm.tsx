"use client";

import { useActionState } from "react";
import { changePasswordAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionResult = {};

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-primary-light/50 px-3 py-2 text-xs text-primary" role="status">
          {state.success}
        </p>
      )}
      <Input label="New password" name="password" type="password" minLength={8} required />
      <Input
        label="Confirm password"
        name="confirm_password"
        type="password"
        minLength={8}
        required
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
