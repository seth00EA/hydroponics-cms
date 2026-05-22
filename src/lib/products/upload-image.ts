import { PRODUCT_IMAGE_BUCKET } from "@/lib/products/constants";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function getPublicImageUrl(path: string): string {
  const env = getSupabaseEnv();
  if (!env || path.startsWith("http") || path.startsWith("/")) {
    return path;
  }
  return `${env.url}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}/${path}`;
}

export async function uploadProductImage(
  file: File,
  productId: string,
): Promise<{ url?: string; error?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase not configured." };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${productId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) return { error: error.message };

  return { url: getPublicImageUrl(path) };
}
