"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const initialState: AuthActionResult = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-800" role="status">
          {state.success}
        </p>
      )}

      <Input
        label="Admin email"
        name="email"
        type="email"
        placeholder="owner@example.com"
        required
      />

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending reset email..." : "Send password reset email"}
      </Button>

      <div className="flex justify-between text-xs">
        <Link href="/admin/login" className="text-primary hover:underline">
          Back to Login
        </Link>
        <Link href="/" className="text-primary hover:underline">
          Back to Website
        </Link>
      </div>
    </form>
  );
}
