"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";
import { homepageContent } from "@/data/homepage";
import type { HomepageContent } from "@/types";

export type HomepageActionState = {
  error?: string;
  success?: string;
};

const IMAGE_BUCKET = "cms-images";

function parseProcessSteps(formData: FormData): HomepageContent["processSteps"] {
  return homepageContent.processSteps.map((step) => ({
    step: step.step,
    title: String(formData.get(`step-${step.step}-title`) ?? step.title),
    description: String(formData.get(`step-${step.step}-desc`) ?? step.description),
  }));
}

function parseWhyChooseFeatures(formData: FormData): HomepageContent["whyChooseFeatures"] {
  return homepageContent.whyChooseFeatures.map((feature, index) => ({
    icon: feature.icon,
    title: String(formData.get(`why-${index}-title`) ?? feature.title),
    description: String(formData.get(`why-${index}-desc`) ?? feature.description),
  }));
}

function getFileExtension(file: File) {
  const name = file.name || "image";
  return name.split(".").pop() || "jpg";
}

async function uploadHomepageImage(admin: any, file: FormDataEntryValue | null) {
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
  const filePath = `homepage/${Date.now()}-${crypto.randomUUID()}.${extension}`;

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

export async function saveHomepageAction(
  _prev: HomepageActionState,
  formData: FormData,
): Promise<HomepageActionState> {
  const session = await getAuthSession();

  if (!session || !canAccessAdmin(session.profile.role)) {
    return { error: "You do not have permission to edit homepage content." };
  }

  const admin = createAdminClient() as any;
  if (!admin) return { error: "Service role key required." };

  let heroImage = String(formData.get("heroImage") ?? homepageContent.heroImage);
let logoImage = String(formData.get("logoImage") ?? homepageContent.logoImage ?? "");
let backgroundImage = String(
  formData.get("backgroundImage") ?? homepageContent.backgroundImage ?? "",
);

try {
  const uploadedHeroImage = await uploadHomepageImage(
    admin,
    formData.get("hero_image_file"),
  );
  if (uploadedHeroImage) heroImage = uploadedHeroImage;

  const uploadedLogoImage = await uploadHomepageImage(
    admin,
    formData.get("logo_image_file"),
  );
  if (uploadedLogoImage) logoImage = uploadedLogoImage;

  const uploadedBackgroundImage = await uploadHomepageImage(
    admin,
    formData.get("background_image_file"),
  );
  if (uploadedBackgroundImage) backgroundImage = uploadedBackgroundImage;
} catch (error) {
  return {
    error: error instanceof Error ? error.message : "Image upload failed.",
  };
}

  const content: HomepageContent = {
    ...homepageContent,
    heroTitle: String(formData.get("heroTitle") ?? homepageContent.heroTitle),
    heroSubtitle: String(formData.get("heroSubtitle") ?? homepageContent.heroSubtitle),
    heroCta: String(formData.get("heroCta") ?? homepageContent.heroCta),
    heroSecondaryCta: String(formData.get("heroSecondaryCta") ?? homepageContent.heroSecondaryCta),
    heroImage,
    heroImageAlt: String(formData.get("heroImageAlt") ?? homepageContent.heroImageAlt),
    logoImage,
    backgroundImage,
    overlayOpacity: Number(formData.get("overlayOpacity") ?? homepageContent.overlayOpacity ?? 0.45),

    processTitle: String(formData.get("processTitle") ?? homepageContent.processTitle),
    processSubtitle: String(formData.get("processSubtitle") ?? homepageContent.processSubtitle),
    processSteps: parseProcessSteps(formData),

    featuredTitle: String(formData.get("featuredTitle") ?? homepageContent.featuredTitle),
    featuredSubtitle: String(formData.get("featuredSubtitle") ?? homepageContent.featuredSubtitle),

    whyChooseTitle: String(formData.get("whyChooseTitle") ?? homepageContent.whyChooseTitle),
    whyChooseSubtitle: String(formData.get("whyChooseSubtitle") ?? homepageContent.whyChooseSubtitle),
    whyChooseFeatures: parseWhyChooseFeatures(formData),

    galleryPreviewTitle: String(formData.get("galleryPreviewTitle") ?? homepageContent.galleryPreviewTitle),
    galleryPreviewSubtitle: String(formData.get("galleryPreviewSubtitle") ?? homepageContent.galleryPreviewSubtitle),

    contactCtaTitle: String(formData.get("contactCtaTitle") ?? homepageContent.contactCtaTitle),
    contactCtaSubtitle: String(formData.get("contactCtaSubtitle") ?? homepageContent.contactCtaSubtitle),
    contactCtaPrimary: String(formData.get("contactCtaPrimary") ?? homepageContent.contactCtaPrimary),
    contactCtaSecondary: String(formData.get("contactCtaSecondary") ?? homepageContent.contactCtaSecondary),

    aboutTitle: homepageContent.aboutTitle,
    aboutBody: homepageContent.aboutBody,
    features: homepageContent.features,
  };

  const { error } = await admin
    .from("homepage_settings")
    .upsert({
      id: "main",
      content,
      updated_at: new Date().toISOString(),
    });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/homepage");

  return { success: "Homepage updated successfully." };
}