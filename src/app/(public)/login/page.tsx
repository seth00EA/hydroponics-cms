import { CustomerLoginForm } from "@/components/customer/CustomerLoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params.redirect ?? "/account";

  return (
    <main className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Customer Login</h1>
      <p className="mt-2 text-gray-600">
        Login is only required for premium services, online courses, consultation booking, saved order history, and your customer account.
      </p>

      <CustomerLoginForm redirectTo={redirectTo} />
    </main>
  );
}
