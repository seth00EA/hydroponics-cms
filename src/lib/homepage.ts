import { homepageContent } from "@/data/homepage";
import { createAdminClient } from "@/lib/supabase/admin";
import type { HomepageContent } from "@/types";

export async function getHomepageContent(): Promise<HomepageContent> {
  const admin = createAdminClient() as any;

  if (!admin) {
    return homepageContent;
  }

  const { data } = await admin
    .from("homepage_settings")
    .select("content")
    .eq("id", "main")
    .single();

  if (!data?.content || Object.keys(data.content).length === 0) {
    return homepageContent;
  }

  return {
    ...homepageContent,
    ...(data.content as Partial<HomepageContent>),
  };
}
