"use client";

import { useActionState } from "react";
import { createStaffAction, type AuthActionResult } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardTitle } from "@/components/ui/Card";

const initialState: AuthActionResult = {};

export function CreateStaffForm() {
  const [state, formAction, pending] = useActionState(createStaffAction, initialState);

  return (
    <Card>
      <CardTitle className="mb-4">Add staff account</CardTitle>
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
        <Input label="Full name" name="full_name" required />
        <Input label="Email" name="email" type="email" required />
        <Input
          label="Temporary password"
          name="password"
          type="password"
          minLength={8}
          required
        />
        <p className="text-xs text-muted">
          Staff can access dashboard, products, gallery, and homepage. They cannot manage
          contact settings, staff, or your owner account.
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create staff account"}
        </Button>
      </form>
    </Card>
  );
}
