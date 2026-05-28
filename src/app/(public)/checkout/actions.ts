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
export type CheckoutActionState = {
  error?: string;
};

export async function submitOrderAction(
  _prev: CheckoutActionState | void,
  formData: FormData,
): Promise<CheckoutActionState | void> {
  const admin = createAdminClient() as any;
  if (!admin) return { error: "Checkout service is currently unavailable." };

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const items = JSON.parse(String(formData.get("cart_items") ?? "[]")) as CartItem[];
  const phone = String(formData.get("phone") ?? "").trim();

const phoneRegex = /^(09\d{9}|\+639\d{9})$/;

if (!phoneRegex.test(phone)) {
  return { error: "Please enter a valid Philippine phone number." };
}
  if (!items.length) {
    return { error: "Your cart is empty." };
  }

  let totalAmount = 0;

  for (const item of items) {
    const { data: product, error } = await admin
      .from("products")
      .select("id, name, price, stock_quantity")
      .eq("id", item.product_id)
      .single();

    if (error || !product) return {
      error: `${item.product_name} is no longer available.`,
    };

    if (product.stock_quantity < item.quantity) {
      return {
        error: `Only limited stock is available for ${product.name}.`,
      };
    }

    totalAmount += Number(product.price) * item.quantity;
  }

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      customer_id: user?.id ?? null,
      customer_name: String(formData.get("full_name") ?? ""),
      customer_email: String(formData.get("email") ?? ""),
      customer_phone: phone,
      delivery_address: String(formData.get("delivery_address") ?? ""),
      order_notes: String(formData.get("order_notes") ?? ""),
      payment_method: String(formData.get("payment_method") ?? ""),
      total_amount: totalAmount,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError || !order) return {
    error: "Unable to process your order right now. Please try again.",
  };

  for (const item of items) {
    const { data: product } = await admin
      .from("products")
      .select("name, price, stock_quantity")
      .eq("id", item.product_id)
      .single();

    if (!product) return {
      error: "A product became unavailable during checkout.",
    };

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
