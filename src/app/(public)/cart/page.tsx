"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
    getStoredCart,
    removeFromCart,
    updateCartQuantity,
    type StoredCartItem,
} from "@/lib/cart";

function formatMoney(value: number) {
    return Number(value).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

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
        updateCartQuantity(productId, Math.max(1, quantity));
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
                Review your selected hydroponic products before checkout.
            </p>

            {cartItems.length === 0 ? (
                <div className="mt-8 rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl">
                        Cart
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-gray-900">
                        Your cart is empty
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Browse our fresh hydroponic products and add items to your cart.
                    </p>
                    <Link
                        href="/products"
                        className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
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
                                            Unit price: PHP {formatMoney(item.unit_price)}
                                        </p>
                                        <p className="text-sm font-semibold text-green-700">
                                            Subtotal: PHP {formatMoney(item.unit_price * item.quantity)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center overflow-hidden rounded-lg border">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleQuantityChange(item.product_id, item.quantity - 1)
                                                }
                                                className="px-3 py-2 text-lg font-semibold hover:bg-gray-50"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-12 px-4 py-2 text-center font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleQuantityChange(item.product_id, item.quantity + 1)
                                                }
                                                className="px-3 py-2 text-lg font-semibold hover:bg-gray-50"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

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
                            <span>PHP {formatMoney(total)}</span>
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