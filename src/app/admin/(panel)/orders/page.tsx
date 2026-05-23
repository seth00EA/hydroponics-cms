import Link from "next/link";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Card } from "@/components/ui/Card";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Orders",
};

export default async function AdminOrdersPage() {
  const admin = createAdminClient() as any;

  const { data: orders, error } = admin
    ? await admin
        .from("orders")
        .select("id, customer_name, customer_email, customer_phone, payment_method, total_amount, status, created_at")
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  return (
    <AdminPageShell
      title="Orders"
      description="View and manage customer orders."
    >
      {error && (
        <Card>
          <p className="text-sm text-red-700">{error.message}</p>
        </Card>
      )}

      <Card>
        {(orders ?? []).length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
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
                {(orders ?? []).map((order: any) => (
                  <tr key={order.id}>
                    <td className="py-3 pr-4">
                      <p className="font-medium text-foreground">{order.customer_name}</p>
                      <p className="text-xs text-muted">{order.customer_email}</p>
                    </td>
                    <td className="py-3 pr-4">{order.customer_phone}</td>
                    <td className="py-3 pr-4">{order.payment_method}</td>
                    <td className="py-3 pr-4 font-semibold">?{Number(order.total_amount).toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-muted-bg px-2 py-1 text-xs font-medium capitalize">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="py-3">
                      <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                        View
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
