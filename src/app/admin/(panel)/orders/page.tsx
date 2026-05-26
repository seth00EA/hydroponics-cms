import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { createAdminClient } from "@/lib/supabase/admin";
import { cn } from "@/lib/cn";

export const metadata = {
    title: "Orders",
};

type OrderRow = {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    payment_method: string;
    total_amount: number;
    status: string;
    created_at: string;
};

function formatMoney(value: number) {
    return Number(value).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function getStatusClass(status: string) {
    switch (status) {
        case "pending":
            return "bg-amber-50 text-amber-700";
        case "confirmed":
            return "bg-blue-50 text-blue-700";
        case "preparing":
            return "bg-purple-50 text-purple-700";
        case "ready":
            return "bg-teal-50 text-teal-700";
        case "completed":
            return "bg-green-50 text-green-700";
        case "cancelled":
            return "bg-red-50 text-red-700";
        default:
            return "bg-muted-bg text-muted";
    }
}

export default async function AdminOrdersPage() {
    const admin = createAdminClient();

    const { data: ordersData, error } = admin
        ? await admin
            .from("orders")
            .select("id, customer_name, customer_email, customer_phone, payment_method, total_amount, status, created_at")
            .order("created_at", { ascending: false })
        : { data: [], error: null };

    const orders = (ordersData ?? []) as OrderRow[];

    return (
        <AdminPageShell title="Orders" description="View and manage customer orders.">
            {error && (
                <Card>
                    <p className="text-sm text-red-700">{error.message}</p>
                </Card>
            )}

            <Card>
                <CardTitle className="mb-4">Customer Orders</CardTitle>

                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-10 text-center">
                        <h2 className="text-lg font-semibold text-foreground">No orders yet</h2>
                        <p className="mt-2 text-sm text-muted">
                            Customer orders will appear here after checkout.
                        </p>
                        <Link
                            href="/products"
                            className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                        >
                            View Products Page
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="border-b text-xs uppercase text-muted">
                                <tr>
                                    <th className="py-3 pr-4">Customer</th>
                                    <th className="py-3 pr-4">Phone</th>
                                    <th className="py-3 pr-4">Payment</th>
                                    <th className="py-3 pr-4">Total</th>
                                    <th className="py-3 pr-4">Status</th>
                                    <th className="py-3 pr-4">Date</th>
                                    <th className="py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {orders.map((order) => (
                                    <tr key={order.id} className="align-top">
                                        <td className="py-3 pr-4">
                                            <p className="font-medium text-foreground">{order.customer_name}</p>
                                            <p className="text-xs text-muted">{order.customer_email}</p>
                                        </td>
                                        <td className="py-3 pr-4">{order.customer_phone}</td>
                                        <td className="py-3 pr-4">{order.payment_method}</td>
                                        <td className="py-3 pr-4 font-semibold">
                                            PHP {formatMoney(order.total_amount)}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={cn(
                                                    "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                                                    getStatusClass(order.status),
                                                )}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            {new Date(order.created_at).toLocaleDateString("en-PH")}
                                        </td>
                                        <td className="py-3">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="rounded-lg border px-3 py-2 text-xs font-semibold text-primary hover:bg-muted-bg"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </AdminPageShell>
    );
}