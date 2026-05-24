import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";
import { requireOwnerForContact } from "@/lib/auth/guards";
import { getContactSettings } from "@/lib/contact";

export const metadata = {
  title: "Manage Contact",
};

export default async function AdminContactPage() {
  await requireOwnerForContact();
  const settings = await getContactSettings();

  return (
    <AdminPageShell
      title="Contact"
      description="Business details, social links, form settings, and FAQs"
    >
      <AdminPageNotice />
      <ContactSettingsForm settings={settings} />
    </AdminPageShell>
  );
}
