import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { HomepageEditorForm } from "@/components/admin/HomepageEditorForm";
import { getHomepageContent } from "@/lib/homepage";

export const metadata = {
  title: "Manage Homepage",
};

export default async function AdminHomepagePage() {
  const content = await getHomepageContent();

  return (
    <AdminPageShell
      title="Homepage"
      description="Edit hero, process, features, and landing page copy"
    >
      <AdminPageNotice />
      <HomepageEditorForm content={content} />
    </AdminPageShell>
  );
}
