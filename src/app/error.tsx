"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-3 text-gray-600">
        We could not load this page. Please try again or return to the homepage.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
