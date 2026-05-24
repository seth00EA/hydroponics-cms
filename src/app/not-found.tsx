import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-green-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-600">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
      >
        Back to homepage
      </Link>
    </main>
  );
}
