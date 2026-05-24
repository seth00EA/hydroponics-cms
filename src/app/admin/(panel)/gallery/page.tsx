import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { GalleryAdminPanel } from "@/components/admin/GalleryAdminPanel";
import { getGalleryItems } from "@/lib/gallery";

export const metadata = {
  title: "Manage Gallery",
};

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();

  return (
    <AdminPageShell
      title="Gallery"
      description="Upload images and manage farm, growth, and harvest photos"
    >
      <AdminPageNotice />
      <GalleryAdminPanel items={items} />
    </AdminPageShell>
  );
}
