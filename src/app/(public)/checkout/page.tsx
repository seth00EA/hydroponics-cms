import CheckoutForm from "@/components/customer/CheckoutForm";
import { getPaymentSettings } from "@/lib/payment-settings";

export default async function CheckoutPage() {
    const paymentSettings = await getPaymentSettings();

    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="mt-2 text-gray-600">
                Fill out your order details and choose your preferred payment method.
            </p>

            <div className="mt-8">
                <CheckoutForm paymentSettings={paymentSettings} />
            </div>
        </main>
    );
}