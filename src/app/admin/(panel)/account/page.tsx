import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { Card, CardTitle } from "@/components/ui/Card";
import { requireOwnerSession } from "@/lib/auth/guards";
import { ROLE_LABELS } from "@/lib/auth/roles";

export const metadata = {
  title: "Account",
};

export default async function AdminAccountPage() {
  const session = await requireOwnerSession();

  return (
    <AdminPageShell
      title="Account"
      description="Owner profile and security settings"
    >
      <AdminPageNotice />
      <Card>
        <CardTitle className="mb-4">Profile</CardTitle>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Name</dt>
            <dd className="font-medium">{session.profile.full_name || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="font-medium">{session.profile.email}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="font-medium">{ROLE_LABELS[session.profile.role]}</dd>
          </div>
        </dl>
      </Card>
      <Card>
        <CardTitle className="mb-4">Change password</CardTitle>
        <ChangePasswordForm />
      </Card>
    </AdminPageShell>
  );
}
