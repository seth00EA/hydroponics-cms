import { products as staticProducts } from "@/data/products";
import { mapDbProduct, mapStaticProduct } from "@/lib/products/map-product";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return staticProducts.map(mapStaticProduct);
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return staticProducts.map(mapStaticProduct);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[products] getProducts:", error.message);
    return staticProducts.map(mapStaticProduct);
  }

  return (data ?? []).map(mapDbProduct);
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.is_featured).slice(0, limit);
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}
