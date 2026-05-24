import { contactFaqs, contactInfo } from "@/data/contact";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactInfo, SocialLink } from "@/types";

export type ContactFaq = {
  question: string;
  answer: string;
};

export type ContactSettings = {
  info: ContactInfo;
  faqs: ContactFaq[];
};

type ContactSettingsRow = {
  email: string;
  phone: string;
  address: string;
  hours: string;
  social_links: SocialLink[];
  faqs: ContactFaq[];
};

const CONTACT_SETTINGS_ID = "00000000-0000-0000-0000-000000000001";

export async function getContactSettings(): Promise<ContactSettings> {
  const admin = createAdminClient() as any;

  if (!admin) {
    return {
      info: contactInfo,
      faqs: contactFaqs,
    };
  }

  const { data, error } = await admin
    .from("contact_settings")
    .select("email, phone, address, hours, social_links, faqs")
    .eq("id", CONTACT_SETTINGS_ID)
    .single();

  if (error || !data) {
    return {
      info: contactInfo,
      faqs: contactFaqs,
    };
  }

  const row = data as ContactSettingsRow;

  return {
    info: {
      email: row.email || contactInfo.email,
      phone: row.phone || contactInfo.phone,
      address: row.address || contactInfo.address,
      hours: row.hours || contactInfo.hours,
      socialLinks: Array.isArray(row.social_links) && row.social_links.length > 0
        ? row.social_links
        : contactInfo.socialLinks,
    },
    faqs: Array.isArray(row.faqs) && row.faqs.length > 0 ? row.faqs : contactFaqs,
  };
}
