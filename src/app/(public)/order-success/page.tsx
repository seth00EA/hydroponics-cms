import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <p className="text-5xl">?</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Submitted</h1>
        <p className="mt-3 text-gray-600">
          Thank you! Your order flow is ready. Backend order saving will be added in a future phase.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
