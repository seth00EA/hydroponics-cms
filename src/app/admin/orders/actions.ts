"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";

const allowedStatuses = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];

export async function updateOrderStatusAction(orderId: string, formData: FormData): Promise<void> {
  const session = await getAuthSession();

  if (!session || !canAccessAdmin(session.profile.role)) {
    return;
  }

  const status = String(formData.get("status") ?? "");

  if (!allowedStatuses.includes(status)) {
    return;
  }

  const admin = createAdminClient() as any;
  if (!admin) return;

  await admin
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/dashboard");
}
