"use client";

import {
  deleteAdminAccountFormAction,
  disableAdminAccountFormAction,
  resetStaffPasswordAction,
} from "@/app/admin/users/actions";

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: "owner" | "staff";
  created_at: string;
};

type AdminUsersTableProps = {
  users: AdminUser[];
  currentUserId: string;
  ownerCount: number;
};

export function AdminUsersTable({ users, currentUserId, ownerCount }: AdminUsersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/30 text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {users.map((user) => {
            const isCurrentUser = user.id === currentUserId;
            const isLastOwner = user.role === "owner" && ownerCount <= 1;
            const canDelete = !isCurrentUser && !isLastOwner;
            const canDisable = !isCurrentUser && !isLastOwner;

            return (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {user.full_name || "Unnamed admin"}
                  {isCurrentUser && (
                    <span className="ml-2 rounded-full bg-primary-light px-2 py-0.5 text-xs text-primary">
                      You
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-muted">{user.email}</td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium capitalize">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-muted">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>

                <td className="space-y-3 px-4 py-3">
                  {user.role === "staff" && (
                    <form action={resetStaffPasswordAction.bind(null, user.id)} className="flex gap-2">
                      <input
                        name="password"
                        type="password"
                        minLength={8}
                        placeholder="New staff password"
                        className="w-44 rounded-lg border px-3 py-2 text-xs"
                      />
                      <button
                        type="submit"
                        className="rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted/20"
                      >
                        Reset
                      </button>
                    </form>
                  )}

                  <div className="flex gap-2">
                    <form action={disableAdminAccountFormAction.bind(null, user.id)}>
                      <button
                        type="submit"
                        disabled={!canDisable}
                        className="rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted/20 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Disable
                      </button>
                    </form>

                    <form
                      action={deleteAdminAccountFormAction.bind(null, user.id)}
                      onSubmit={(event) => {
                        if (!confirm("Are you sure you want to delete this admin account?")) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <button
                        type="submit"
                        disabled={!canDelete}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Delete
                      </button>
                    </form>
                  </div>

                  {isCurrentUser && (
                    <p className="text-xs text-muted">You cannot delete or disable your own active session.</p>
                  )}

                  {isLastOwner && !isCurrentUser && (
                    <p className="text-xs text-muted">Last owner account is protected.</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
