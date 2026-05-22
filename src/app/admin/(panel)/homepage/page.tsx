import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { HomepageEditorForm } from "@/components/admin/HomepageEditorForm";

export const metadata = {
  title: "Manage Homepage",
};

export default function AdminHomepagePage() {
  return (
    <AdminPageShell
      title="Homepage"
      description="Edit hero, process, features, and landing page copy"
    >
      <AdminPageNotice />
      <HomepageEditorForm />
    </AdminPageShell>
  );
}
