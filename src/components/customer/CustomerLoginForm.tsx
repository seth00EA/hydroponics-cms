"use client";

import { useActionState, useState } from "react";
import { customerSignInAction, type CustomerAuthState } from "@/app/(public)/login/actions";

const initialState: CustomerAuthState = {};

export function CustomerLoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(customerSignInAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
      <input type="hidden" name="redirect_to" value={redirectTo} />

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="mt-1 w-full rounded-lg border p-3"
        />
        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="mt-2 text-sm text-green-700 hover:underline"
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
