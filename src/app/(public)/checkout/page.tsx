import CheckoutForm from "@/components/customer/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <p className="mt-2 text-gray-600">
        Fill out your order details. You do not need to login to order products.
      </p>

      <div className="mt-8">
        <CheckoutForm />
      </div>
    </main>
  );
}
