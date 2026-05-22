import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { CreateStaffForm } from "@/components/admin/CreateStaffForm";
import { StaffList } from "@/components/admin/StaffList";
import { requireOwnerSession } from "@/lib/auth/guards";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { Profile } from "@/types/auth";

export const metadata = {
  title: "Staff",
};

async function loadStaff(): Promise<Profile[]> {
  if (!isSupabaseConfigured()) return [];
  const admin = createAdminClient();
  if (!admin) return [];

  const { data } = await admin
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .in("role", ["owner", "staff"])
    .order("created_at", { ascending: true });

  return (data ?? []) as Profile[];
}

export default async function AdminStaffPage() {
  const session = await requireOwnerSession();
  const team = await loadStaff();

  return (
    <AdminPageShell
      title="Staff"
      description="Add and manage staff accounts with limited admin access"
    >
      <AdminPageNotice />
      <CreateStaffForm />
      <StaffList staff={team} ownerId={session.userId} />
    </AdminPageShell>
  );
}
