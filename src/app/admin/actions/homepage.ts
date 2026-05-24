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

  const content: HomepageContent = {
    ...homepageContent,
    heroTitle: String(formData.get("heroTitle") ?? homepageContent.heroTitle),
    heroSubtitle: String(formData.get("heroSubtitle") ?? homepageContent.heroSubtitle),
    heroCta: String(formData.get("heroCta") ?? homepageContent.heroCta),
    heroSecondaryCta: String(formData.get("heroSecondaryCta") ?? homepageContent.heroSecondaryCta),
    heroImage: String(formData.get("heroImage") ?? homepageContent.heroImage),
    heroImageAlt: String(formData.get("heroImageAlt") ?? homepageContent.heroImageAlt),

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
