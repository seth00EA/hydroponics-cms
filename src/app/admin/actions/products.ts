"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";
import { uploadProductImage } from "@/lib/products/upload-image";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { AuthActionResult } from "@/app/admin/actions/auth";
import type { TablesUpdate } from "@/types/database";

export type ProductActionResult = AuthActionResult;

async function requireProductAdmin() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const session = await getAuthSession();
  if (!session || !canAccessAdmin(session.profile.role)) {
    throw new Error("Unauthorized.");
  }
  return session;
}

function parseProductForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: Number(formData.get("price")),
    category: String(formData.get("category") ?? "").trim(),
    stock_quantity: Number(formData.get("stock_quantity") ?? 0),
    is_available: formData.get("is_available") === "on" || formData.get("is_available") === "true",
    is_featured: formData.get("is_featured") === "on" || formData.get("is_featured") === "true",
    image: formData.get("image") as File | null,
  };
}

function revalidateProductPaths() {
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}

export async function createProductAction(
  _prev: ProductActionResult,
  formData: FormData,
): Promise<ProductActionResult> {
  try {
    await requireProductAdmin();
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Could not connect to Supabase." };

    const fields = parseProductForm(formData);
    if (!fields.name || !fields.category || Number.isNaN(fields.price)) {
      return { error: "Name, category, and price are required." };
    }

    const placeholder = "/images/placeholder-system.svg";
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: fields.name,
        description: fields.description,
        price: fields.price,
        category: fields.category,
        image_url: placeholder,
        stock_quantity: Math.max(0, fields.stock_quantity),
        is_available: fields.is_available,
        is_featured: fields.is_featured,
      })
      .select("id")
      .single();

    if (error || !data) return { error: error?.message ?? "Failed to create product." };

    if (fields.image && fields.image.size > 0) {
      const upload = await uploadProductImage(fields.image, data.id);
      if (upload.url) {
        await supabase
          .from("products")
          .update({ image_url: upload.url })
          .eq("id", data.id);
      }
    }

    revalidateProductPaths();
    return { success: "Product created." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to create product." };
  }
}

export async function updateProductAction(
  _prev: ProductActionResult,
  formData: FormData,
): Promise<ProductActionResult> {
  try {
    await requireProductAdmin();
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Could not connect to Supabase." };

    const id = String(formData.get("id") ?? "");
    const fields = parseProductForm(formData);
    if (!id || !fields.name || !fields.category || Number.isNaN(fields.price)) {
      return { error: "Invalid product data." };
    }

    const updates: TablesUpdate<"products"> = {
      name: fields.name,
      description: fields.description,
      price: fields.price,
      category: fields.category,
      stock_quantity: Math.max(0, fields.stock_quantity),
      is_available: fields.is_available,
      is_featured: fields.is_featured,
    };

    if (fields.image && fields.image.size > 0) {
      const upload = await uploadProductImage(fields.image, id);
      if (upload.error) return { error: upload.error };
      if (upload.url) updates.image_url = upload.url;
    }

    const { error } = await supabase.from("products").update(updates).eq("id", id);
    if (error) return { error: error.message };

    revalidateProductPaths();
    return { success: "Product updated." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update product." };
  }
}

export async function deleteProductAction(productId: string): Promise<void> {
  await requireProductAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("products").delete().eq("id", productId);
  revalidateProductPaths();
}

export async function toggleProductAvailabilityAction(
  productId: string,
  isAvailable: boolean,
): Promise<ProductActionResult> {
  try {
    await requireProductAdmin();
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Could not connect." };

    const { error } = await supabase
      .from("products")
      .update({ is_available: isAvailable })
      .eq("id", productId);

    if (error) return { error: error.message };
    revalidateProductPaths();
    return { success: "Availability updated." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Update failed." };
  }
}

export async function toggleProductFeaturedAction(
  productId: string,
  isFeatured: boolean,
): Promise<ProductActionResult> {
  try {
    await requireProductAdmin();
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Could not connect." };

    const { error } = await supabase
      .from("products")
      .update({ is_featured: isFeatured })
      .eq("id", productId);

    if (error) return { error: error.message };
    revalidateProductPaths();
    return { success: "Featured status updated." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Update failed." };
  }
}

export async function updateProductStockAction(
  productId: string,
  stockQuantity: number,
): Promise<ProductActionResult> {
  try {
    await requireProductAdmin();
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Could not connect." };

    const qty = Math.max(0, Math.floor(stockQuantity));
    const { error } = await supabase
      .from("products")
      .update({
        stock_quantity: qty,
        is_available: qty > 0,
      })
      .eq("id", productId);

    if (error) return { error: error.message };
    revalidateProductPaths();
    return { success: "Stock updated." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Update failed." };
  }
}
