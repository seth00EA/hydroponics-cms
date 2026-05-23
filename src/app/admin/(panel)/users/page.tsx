import { redirect } from "next/navigation";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { Card } from "@/components/ui/Card";
import { getAuthSession } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Manage Admin Accounts",
};

export default async function AdminUsersPage() {
  const session = await getAuthSession();

  if (!session || session.profile.role !== "owner") {
    redirect("/admin/dashboard");
  }

  const admin = createAdminClient();

  if (!admin) {
    return (
      <main className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Admin Accounts</h1>
          <p className="mt-1 text-sm text-muted">
            Service role key is required to manage admin users.
          </p>
        </div>

        <Card>
          <p className="text-sm text-muted">
            Add SUPABASE_SERVICE_ROLE_KEY to .env.local, then restart the dev server.
          </p>
        </Card>
      </main>
    );
  }

  const { data: users, error } = await admin
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .in("role", ["owner", "staff"])
    .order("created_at", { ascending: false });

  const adminUsers = (users ?? []) as {
    id: string;
    email: string;
    full_name: string;
    role: "owner" | "staff";
    created_at: string;
  }[];

  const ownerCount = adminUsers.filter((user) => user.role === "owner").length;

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Admin Accounts</h1>
        <p className="mt-1 text-sm text-muted">
          Owner-only controls for owner and staff accounts.
        </p>
      </div>

      {error && (
        <Card>
          <p className="text-sm text-red-700">{error.message}</p>
        </Card>
      )}

      <Card>
        <div className="mb-4 space-y-1">
          <h2 className="text-lg font-semibold">Admin users</h2>
          <p className="text-sm text-muted">
            You cannot delete your current account or the last remaining owner.
          </p>
        </div>

        <AdminUsersTable
          users={adminUsers}
          currentUserId={session.userId}
          ownerCount={ownerCount}
        />
      </Card>
    </main>
  );
}
