import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";
import { isSupabaseConfigured } from "@/lib/supabase";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured()) {
    const session = await getAuthSession();
    if (!session || !canAccessAdmin(session.profile.role)) {
      redirect("/admin/login");
    }

    return (
      <AdminProvider session={session}>
        <AdminLayout>{children}</AdminLayout>
      </AdminProvider>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
