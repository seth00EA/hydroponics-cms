import Link from "next/link";

export const metadata = {
    title: "Order Submitted",
};

export default function OrderSuccessPage() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                    ✓
                </div>

                <h1 className="mt-6 text-3xl font-bold text-gray-900">
                    Order Submitted Successfully
                </h1>

                <p className="mt-3 text-gray-600">
                    Thank you for ordering from Nolex Hydroponics. Your order has been received and is now pending confirmation.
                </p>

                <div className="mt-8 rounded-2xl bg-green-50 p-5 text-left">
                    <h2 className="font-semibold text-green-900">What happens next?</h2>
                    <ul className="mt-3 space-y-2 text-sm text-green-800">
                        <li>• Our team will review your order details.</li>
                        <li>• You may be contacted through phone or email for confirmation.</li>
                        <li>• For online payments, please keep your proof of payment for verification.</li>
                        <li>• Once confirmed, your order will be prepared for delivery or pickup.</li>
                    </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/products"
                        className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        href="/contact"
                        className="rounded-xl border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </main>
    );
}