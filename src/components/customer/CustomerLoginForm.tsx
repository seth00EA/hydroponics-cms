"use client";

import Link from "next/link";
import { customerGoogleSignInAction } from "@/app/(public)/login/actions";

export function CustomerLoginForm({ redirectTo }: { redirectTo: string }) {
    const isCheckout = redirectTo.startsWith("/checkout");

    return (
        <div className="mt-8 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
            <form action={customerGoogleSignInAction}>
                <input type="hidden" name="redirect_to" value={redirectTo} />

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
                >
                    Continue with Google
                </button>
            </form>

            {isCheckout && (
                <Link
                    href="/checkout"
                    className="block w-full rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800"
                >
                    Continue as Guest
                </Link>
            )}

            <p className="text-center text-xs text-gray-500">
                Google login does not require Supabase email verification.
            </p>
        </div>
    );
}