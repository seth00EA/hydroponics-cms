"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase";

type CartItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
};

export async function submitOrderAction(formData: FormData): Promise<void> {
  const admin = createAdminClient() as any;
  if (!admin) throw new Error("Supabase service role key is required.");

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const items = JSON.parse(String(formData.get("cart_items") ?? "[]")) as CartItem[];

  if (!items.length) {
    throw new Error("Cart is empty.");
  }

  let totalAmount = 0;

  for (const item of items) {
    const { data: product, error } = await admin
      .from("products")
      .select("id, name, price, stock_quantity")
      .eq("id", item.product_id)
      .single();

    if (error || !product) throw new Error(`Product not found: ${item.product_name}`);

    if (product.stock_quantity < item.quantity) {
      throw new Error(`Not enough stock for ${product.name}.`);
    }

    totalAmount += Number(product.price) * item.quantity;
  }

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      customer_id: user?.id ?? null,
      customer_name: String(formData.get("full_name") ?? ""),
      customer_email: String(formData.get("email") ?? ""),
      customer_phone: String(formData.get("phone") ?? ""),
      delivery_address: String(formData.get("delivery_address") ?? ""),
      order_notes: String(formData.get("order_notes") ?? ""),
      payment_method: String(formData.get("payment_method") ?? ""),
      total_amount: totalAmount,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) throw new Error(orderError?.message ?? "Failed to create order.");

  for (const item of items) {
    const { data: product } = await admin
      .from("products")
      .select("name, price, stock_quantity")
      .eq("id", item.product_id)
      .single();

    if (!product) throw new Error("Product missing during stock update.");

    const subtotal = Number(product.price) * item.quantity;

    await admin.from("order_items").insert({
      order_id: order.id,
      product_id: item.product_id,
      product_name: product.name,
      quantity: item.quantity,
      unit_price: product.price,
      subtotal,
    });

    await admin
      .from("products")
      .update({
        stock_quantity: product.stock_quantity - item.quantity,
      })
      .eq("id", item.product_id);
  }

  redirect("/order-success");
}
