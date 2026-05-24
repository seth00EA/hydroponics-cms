"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";

export type OrderStatusActionState = {
  error?: string;
  success?: string;
};

const allowedStatuses = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export async function updateOrderStatusAction(
  orderId: string,
  _prev: OrderStatusActionState,
  formData: FormData,
): Promise<OrderStatusActionState> {
  const session = await getAuthSession();

  if (!session || !canAccessAdmin(session.profile.role)) {
    return { error: "You do not have permission to update orders." };
  }

  const status = String(formData.get("status") ?? "");

  if (!allowedStatuses.includes(status)) {
    return { error: "Invalid order status." };
  }

  const admin = createAdminClient() as any;
  if (!admin) return { error: "Service role key required." };

  const { error } = await admin
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/dashboard");

  return { success: `Order status updated to ${status}.` };
}
