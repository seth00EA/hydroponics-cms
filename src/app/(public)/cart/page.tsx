import Link from "next/link";
import CartItem from "@/components/customer/CartItem";

const cartItems = [
  { name: "Fresh Hydroponic Lettuce", price: 120, quantity: 2 },
  { name: "Hydroponic Herbs Pack", price: 90, quantity: 1 },
];

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      <p className="mt-2 text-gray-600">No login required. Review your products before checkout.</p>

      <div className="mt-8 space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.name} {...item} />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-green-50 p-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>?{total}</span>
        </div>
        <Link href="/checkout" className="mt-5 block rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}
