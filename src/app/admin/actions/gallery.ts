"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";
import type { GalleryCategory } from "@/types";

export type GalleryActionState = {
  error?: string;
  success?: string;
};

const validCategories: GalleryCategory[] = ["farm", "growth", "harvest"];

function cleanCategory(value: FormDataEntryValue | null): GalleryCategory {
  const category = String(value ?? "farm") as GalleryCategory;
  return validCategories.includes(category) ? category : "farm";
}

async function canManageGallery() {
  const session = await getAuthSession();
  return Boolean(session && canAccessAdmin(session.profile.role));
}

export async function createGalleryItemAction(
  _prev: GalleryActionState,
  formData: FormData,
): Promise<GalleryActionState> {
  if (!(await canManageGallery())) {
    return { error: "You do not have permission to manage gallery items." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const category = cleanCategory(formData.get("category"));
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  if (!title || !imageUrl) {
    return { error: "Title and image URL are required." };
  }

  const admin = createAdminClient() as any;
  if (!admin) return { error: "Service role key required." };

  const { error } = await admin.from("gallery_items").insert({
    title,
    description,
    image_url: imageUrl,
    category,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");

  return { success: "Gallery item added." };
}

export async function updateGalleryItemAction(
  id: string,
  formData: FormData,
): Promise<void> {
  if (!(await canManageGallery())) return;

  const admin = createAdminClient() as any;
  if (!admin) return;

  await admin
    .from("gallery_items")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      image_url: String(formData.get("image_url") ?? "").trim(),
      category: cleanCategory(formData.get("category")),
      sort_order: Number(formData.get("sort_order") ?? 0),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItemAction(id: string): Promise<void> {
  if (!(await canManageGallery())) return;

  const admin = createAdminClient() as any;
  if (!admin) return;

  await admin.from("gallery_items").delete().eq("id", id);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
