"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import type { SocialLink } from "@/types";

export type ContactActionState = {
  error?: string;
  success?: string;
};

const CONTACT_SETTINGS_ID = "00000000-0000-0000-0000-000000000001";

function parseFaqs(formData: FormData) {
  return [0, 1, 2, 3, 4].map((index) => {
    const question = String(formData.get(`faq-q-${index}`) ?? "").trim();
    const answer = String(formData.get(`faq-a-${index}`) ?? "").trim();

    if (!question || !answer) return null;

    return { question, answer };
  }).filter(Boolean);
}

export async function saveContactSettingsAction(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const session = await getAuthSession();

  if (!session || session.profile.role !== "owner") {
    return { error: "Only the owner can edit contact settings." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const hours = String(formData.get("hours") ?? "").trim();
  const facebookUrl = String(formData.get("facebook") ?? "").trim();
  const messengerUrl = String(formData.get("messenger") ?? "").trim();

  if (!email || !phone || !address || !hours) {
    return { error: "Email, phone, address, and hours are required." };
  }

  const socialLinks = [
    {
      platform: "facebook" as const,
      label: "Facebook Page",
      url: facebookUrl,
    },
    {
      platform: "messenger" as const,
      label: "Message on Messenger",
      url: messengerUrl,
    },
  ].filter((link) => link.url);

  const faqs = parseFaqs(formData);

  const admin = createAdminClient() as any;
  if (!admin) return { error: "Service role key required." };

  const { error } = await admin
    .from("contact_settings")
    .upsert({
      id: CONTACT_SETTINGS_ID,
      email,
      phone,
      address,
      hours,
      social_links: socialLinks,
      faqs,
      updated_at: new Date().toISOString(),
    });

  if (error) return { error: error.message };

  revalidatePath("/contact");
  revalidatePath("/admin/contact");

  return { success: "Contact settings updated successfully." };
}
