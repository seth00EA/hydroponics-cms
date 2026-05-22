export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Customer Login</h1>
      <p className="mt-2 text-gray-600">
        Login is only for extra services like courses, consultation, saved history, and premium content.
      </p>

      <form className="mt-8 space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-lg border p-3" />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" className="mt-1 w-full rounded-lg border p-3" />
        </div>
        <button type="button" className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white">
          Login Coming Soon
        </button>
      </form>
    </main>
  );
}
