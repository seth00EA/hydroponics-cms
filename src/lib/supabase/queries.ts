import { mapDbProduct } from "@/lib/products/map-product";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Tables } from "@/types/database";

export async function fetchProducts(): Promise<Tables<"products">[] | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[supabase] fetchProducts:", error.message);
    return null;
  }
  return data;
}

export async function fetchProductsMapped() {
  const rows = await fetchProducts();
  return rows?.map(mapDbProduct) ?? null;
}

export async function fetchGallery(): Promise<Tables<"gallery">[] | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[supabase] fetchGallery:", error.message);
    return null;
  }
  return data;
}

export async function fetchHomepageSections(): Promise<
  Tables<"homepage_sections">[] | null
> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[supabase] fetchHomepageSections:", error.message);
    return null;
  }
  return data;
}

export async function fetchFeatures(
  sectionKey: string,
): Promise<Tables<"features">[] | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("features")
    .select("*")
    .eq("section_key", sectionKey)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[supabase] fetchFeatures:", error.message);
    return null;
  }
  return data;
}

export async function fetchContactSettings(): Promise<
  Tables<"contact_settings"> | null
> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("contact_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[supabase] fetchContactSettings:", error.message);
    return null;
  }
  return data;
}
