"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutForm() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/order-success");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <input name="full_name" required className="mt-1 w-full rounded-lg border p-3" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border p-3" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input name="phone" required className="mt-1 w-full rounded-lg border p-3" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Delivery Address</label>
        <textarea name="delivery_address" required rows={3} className="mt-1 w-full rounded-lg border p-3" />
      </div>

      <div>
        <label className="text-sm font-medium">Order Notes</label>
        <textarea name="order_notes" rows={3} className="mt-1 w-full rounded-lg border p-3" />
      </div>

      <div>
        <label className="text-sm font-medium">Payment Method</label>
        <select
          name="payment_method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 w-full rounded-lg border p-3"
        >
          <option>Cash on delivery</option>
          <option>GCash</option>
          <option>Bank transfer</option>
        </select>
      </div>

      {paymentMethod !== "Cash on delivery" && (
        <div>
          <label className="text-sm font-medium">Proof of Payment Image Optional</label>
          <input name="proof_of_payment" type="file" accept="image/*" className="mt-1 w-full rounded-lg border p-3" />
        </div>
      )}

      <button type="submit" className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800">
        Submit Order
      </button>
    </form>
  );
}
