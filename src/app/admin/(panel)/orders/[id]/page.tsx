import Link from "next/link";
import { notFound } from "next/navigation";
import { updateOrderStatusAction } from "@/app/admin/orders/actions";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card, CardTitle } from "@/components/ui/Card";
import { createAdminClient } from "@/lib/supabase/admin";

const statuses = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export const metadata = {
  title: "Order Details",
};

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient() as any;

  if (!admin) notFound();

  const { data: order } = await admin
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (!order) notFound();

  const { data: items } = await admin
    .from("order_items")
    .select("id, product_name, quantity, unit_price, subtotal")
    .eq("order_id", id);

  return (
    <AdminPageShell
      title={`Order #${order.id.slice(0, 8)}`}
      description="View customer information, ordered products, and update status."
    >
      <Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">
        ? Back to Orders
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
            <p><strong>Total:</strong> ?{Number(order.total_amount).toFixed(2)}</p>
            <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>

            {order.proof_of_payment_url ? (
              <a href={order.proof_of_payment_url} target="_blank" className="text-primary hover:underline">
                View proof of payment
              </a>
            ) : (
              <p className="text-muted">No proof of payment uploaded.</p>
            )}

            <form action={updateOrderStatusAction.bind(null, order.id)} className="flex gap-2">
              <select name="status" defaultValue={order.status} className="rounded-lg border px-3 py-2">
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button type="submit" className="rounded-lg bg-primary px-4 py-2 font-medium text-white">
                Update
              </button>
            </form>
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
              {(items ?? []).map((item: any) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4 font-medium">{item.product_name}</td>
                  <td className="py-3 pr-4">{item.quantity}</td>
                  <td className="py-3 pr-4">?{Number(item.unit_price).toFixed(2)}</td>
                  <td className="py-3">?{Number(item.subtotal).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminPageShell>
  );
}
