import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { GalleryAdminPanel } from "@/components/admin/GalleryAdminPanel";

export const metadata = {
  title: "Manage Gallery",
};

export default function AdminGalleryPage() {
  return (
    <AdminPageShell
      title="Gallery"
      description="Upload images and manage farm, growth, and harvest photos"
    >
      <AdminPageNotice />
      <GalleryAdminPanel />
    </AdminPageShell>
  );
}
