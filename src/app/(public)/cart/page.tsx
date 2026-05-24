"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getStoredCart,
  removeFromCart,
  updateCartQuantity,
  type StoredCartItem,
} from "@/lib/cart";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<StoredCartItem[]>(() =>
        typeof window === "undefined" ? [] : getStoredCart(),
    );

  function refreshCart() {
    setCartItems(getStoredCart());
  }



  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0),
    [cartItems],
  );

  function handleQuantityChange(productId: string, quantity: number) {
    updateCartQuantity(productId, quantity);
    refreshCart();
  }

  function handleRemove(productId: string) {
    removeFromCart(productId);
    refreshCart();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
      <p className="mt-2 text-gray-600">
        No login required. Review your products before checkout.
      </p>

      {cartItems.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add products before proceeding to checkout.</p>
          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                    <p className="text-sm text-gray-500">
                      Unit price: PHP {item.unit_price.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-green-700">
                     Subtotal: PHP {(item.unit_price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        handleQuantityChange(
                          item.product_id,
                          Number(event.target.value),
                        )
                      }
                      className="w-20 rounded-lg border p-2 text-center"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemove(item.product_id)}
                      className="rounded-lg border px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border bg-green-50 p-6">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
             <span>PHP {total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-5 block rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
