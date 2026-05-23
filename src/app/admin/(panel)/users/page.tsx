import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Admin Users",
};

export default function AdminUsersPage() {
  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Admin Accounts</h1>
        <p className="mt-1 text-sm text-muted">
          Owner-only admin account management. Delete, disable, and password reset tools will be added in the next patch.
        </p>
      </div>

      <Card>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Account management coming next</h2>
          <p className="text-sm text-muted">
            This page is now connected to the admin navigation. The next patch will list owner/staff accounts and add safe account actions.
          </p>
        </div>
      </Card>
    </main>
  );
}
