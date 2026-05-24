import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusForm } from "@/components/admin/OrderStatusForm";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { createAdminClient } from "@/lib/supabase/admin";

const statuses: string[] = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "cancelled",
];

type OrderItemRow = {
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
};
type OrderRow = {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    delivery_address: string;
    order_notes: string | null;
    payment_method: string;
    proof_of_payment_url: string | null;
    total_amount: number;
    status: string;
};

export const metadata = {
    title: "Order Details",
};

export default async function AdminOrderDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const admin = createAdminClient();

    if (!admin) notFound();

    const { data: orderData } = await admin
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

    if (!orderData) notFound();

    const order = orderData as OrderRow;

    const { data: items } = await admin
        .from("order_items")
        .select("id, product_name, quantity, unit_price, subtotal")
        .eq("order_id", id);

    const orderItems = (items ?? []) as OrderItemRow[];

    return (
        <AdminPageShell
            title={`Order #${order.id.slice(0, 8)}`}
            description="View customer information, ordered products, and update status."
        >
            <Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">
                Back to Orders
            </Link>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardTitle>Customer Details</CardTitle>
                    <div className="mt-4 space-y-2 text-sm">
                        <p><strong>Name:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.customer_email}</p>
                        <p><strong>Phone:</strong> {order.customer_phone}</p>
                        <p><strong>Address:</strong> {order.delivery_address}</p>
                        <p><strong>Notes:</strong> {order.order_notes || "None"}</p>
                    </div>
                </Card>

                <Card>
                    <CardTitle>Payment & Status</CardTitle>
                    <div className="mt-4 space-y-3 text-sm">
                        <p><strong>Payment:</strong> {order.payment_method}</p>
                        <p><strong>Total:</strong> PHP {Number(order.total_amount).toFixed(2)}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>

                        {order.proof_of_payment_url ? (
                            <a
                                href={order.proof_of_payment_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:underline"
                            >
                                View proof of payment
                            </a>
                        ) : (
                            <p className="text-muted">No proof of payment uploaded.</p>
                        )}

                        <OrderStatusForm
                            orderId={order.id}
                            currentStatus={order.status}
                            statuses={statuses}
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <CardTitle>Ordered Products</CardTitle>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b text-xs uppercase text-muted">
                            <tr>
                                <th className="py-3 pr-4">Product</th>
                                <th className="py-3 pr-4">Qty</th>
                                <th className="py-3 pr-4">Unit Price</th>
                                <th className="py-3">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orderItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-3 pr-4 font-medium">{item.product_name}</td>
                                    <td className="py-3 pr-4">{item.quantity}</td>
                                    <td className="py-3 pr-4">PHP {Number(item.unit_price).toFixed(2)}</td>
                                    <td className="py-3">PHP {Number(item.subtotal).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminPageShell>
    );
}