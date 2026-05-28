import { homepageContent } from "@/data/homepage";
import { createAdminClient } from "@/lib/supabase/admin";
import type { HomepageContent } from "@/types";

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const admin = createAdminClient();

    if (!admin) {
      return homepageContent;
    }

    const { data, error } = await admin
  .from("homepage_settings")
  .select("content")
  .eq("id", "main")
  .single();

const row = data as { content?: Partial<HomepageContent> } | null;

if (error || !row?.content || Object.keys(row.content).length === 0) {
  return homepageContent;
}

return {
  ...homepageContent,
  ...row.content,
};
  } catch (error) {
    console.error("Homepage CMS load failed:", error);
    return homepageContent;
  }
}