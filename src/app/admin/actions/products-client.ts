"use server";

import {
  deleteProductAction,
  toggleProductAvailabilityAction,
  toggleProductFeaturedAction,
  updateProductStockAction,
} from "@/app/admin/actions/products";

export async function deleteProductFormAction(formData: FormData): Promise<void> {
  const productId = String(formData.get("productId") ?? "");
  if (productId) await deleteProductAction(productId);
}

export async function toggleAvailabilityFormAction(formData: FormData): Promise<void> {
  const productId = String(formData.get("productId") ?? "");
  const isAvailable = formData.get("is_available") === "true";
  if (productId) await toggleProductAvailabilityAction(productId, isAvailable);
}

export async function toggleFeaturedFormAction(formData: FormData): Promise<void> {
  const productId = String(formData.get("productId") ?? "");
  const isFeatured = formData.get("is_featured") === "true";
  if (productId) await toggleProductFeaturedAction(productId, isFeatured);
}

export async function updateStockFormAction(formData: FormData): Promise<void> {
  const productId = String(formData.get("productId") ?? "");
  const stock = Number(formData.get("stock_quantity"));
  if (productId && !Number.isNaN(stock)) {
    await updateProductStockAction(productId, stock);
  }
}
