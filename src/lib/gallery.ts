import { galleryItems } from "@/data/gallery";
import { createAdminClient } from "@/lib/supabase/admin";
import type { GalleryItem, GalleryCategory } from "@/types";

type GalleryRow = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: GalleryCategory;
  sort_order: number | null;
  is_featured: boolean;
};

function mapGalleryRow(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    image: row.image_url,
    category: row.category,
    is_featured: row.is_featured,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const admin = createAdminClient() as any;

  if (!admin) {
    return galleryItems;
  }

  const { data, error } = await admin
    .from("gallery_items")
    .select("id, title, description, image_url, category, sort_order, is_featured")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return galleryItems;
  }

  return (data as GalleryRow[]).map(mapGalleryRow);
}
