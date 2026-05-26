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
const IMAGE_BUCKET = "cms-images";

function cleanCategory(value: FormDataEntryValue | null): GalleryCategory {
  const category = String(value ?? "farm") as GalleryCategory;
  return validCategories.includes(category) ? category : "farm";
}

async function canManageGallery() {
  const session = await getAuthSession();
  return Boolean(session && canAccessAdmin(session.profile.role));
}

function getFileExtension(file: File) {
  const name = file.name || "image";
  return name.split(".").pop() || "jpg";
}

async function uploadImage(admin: any, file: FormDataEntryValue | null, folder: string) {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be 5MB or smaller.");
  }

  const extension = getFileExtension(file);
  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await admin.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = admin.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl as string;
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
  const imageUrlInput = String(formData.get("image_url") ?? "").trim();
  const category = cleanCategory(formData.get("category"));
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  const admin = createAdminClient() as any;
  if (!admin) return { error: "Service role key required." };

  let imageUrl = imageUrlInput;

  try {
    const uploadedUrl = await uploadImage(admin, formData.get("image_file"), "gallery");
    if (uploadedUrl) imageUrl = uploadedUrl;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  if (!title || !imageUrl) {
    return { error: "Title and image file or image URL are required." };
  }

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

  let imageUrl = String(formData.get("image_url") ?? "").trim();

  try {
    const uploadedUrl = await uploadImage(admin, formData.get("image_file"), "gallery");
    if (uploadedUrl) imageUrl = uploadedUrl;
  } catch {
    return;
  }

  await admin
    .from("gallery_items")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      image_url: imageUrl,
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