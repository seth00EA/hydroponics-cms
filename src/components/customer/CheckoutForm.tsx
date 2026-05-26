"use client";

import { submitOrderAction } from "@/app/(public)/checkout/actions";
import { getStoredCart } from "@/lib/cart";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? "Submitting Order..." : "Submit Order"}
        </button>
    );
}

export default function CheckoutForm() {
    const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
    const [storedCart] = useState(() =>
        typeof window === "undefined" ? [] : getStoredCart(),
    );

    const cartItems = JSON.stringify(storedCart);
    const cartCount = storedCart.reduce((sum, item) => sum + item.quantity, 0);

    const cartIsEmpty = cartCount === 0;

    return (
        <form action={submitOrderAction} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
            <input type="hidden" name="cart_items" value={cartItems} />

            {cartIsEmpty && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Your cart is empty. Please add products before submitting an order.
                </div>
            )}

            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                You are ordering {cartCount} item{cartCount === 1 ? "" : "s"}.
            </div>

            <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                    name="full_name"
                    required
                    minLength={2}
                    placeholder="Enter your full name"
                    className="mt-1 w-full rounded-lg border p-3"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input
                        name="phone"
                        required
                        minLength={7}
                        placeholder="09XXXXXXXXX"
                        className="mt-1 w-full rounded-lg border p-3"
                    />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium">Delivery Address</label>
                <textarea
                    name="delivery_address"
                    required
                    minLength={10}
                    rows={3}
                    placeholder="House number, street, barangay, city/province"
                    className="mt-1 w-full rounded-lg border p-3"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Order Notes</label>
                <textarea
                    name="order_notes"
                    rows={3}
                    placeholder="Optional instructions"
                    className="mt-1 w-full rounded-lg border p-3"
                />
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

                {paymentMethod === "Cash on delivery" ? (
                    <p className="mt-2 text-xs text-gray-500">
                        Payment will be collected upon delivery.
                    </p>
                ) : (
                    <p className="mt-2 text-xs text-gray-500">
                        Please upload proof of payment after sending payment.
                    </p>
                )}
            </div>

            {paymentMethod !== "Cash on delivery" && (
                <div>
                    <label className="text-sm font-medium">Proof of Payment Image</label>
                    <input
                        name="proof_of_payment"
                        type="file"
                        accept="image/*"
                        className="mt-1 w-full rounded-lg border p-3"
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        Accepted format: image screenshot or receipt.
                    </p>
                </div>
            )}

            <SubmitButton disabled={cartIsEmpty} />
        </form>
    );
}