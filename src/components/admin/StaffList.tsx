import { removeStaffFormAction } from "@/app/admin/actions/auth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { ROLE_LABELS } from "@/lib/auth/roles";
import type { Profile } from "@/types/auth";

type StaffListProps = {
  staff: Profile[];
  ownerId: string;
};

export function StaffList({ staff, ownerId }: StaffListProps) {
  return (
    <Card>
      <CardTitle className="mb-4">Staff accounts ({staff.length})</CardTitle>
      {staff.length === 0 ? (
        <p className="text-sm text-muted">No staff accounts yet.</p>
      ) : (
        <ul className="divide-y divide-card-border">
          {staff.map((member) => (
            <li
              key={member.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{member.full_name || member.email}</p>
                <p className="text-sm text-muted">{member.email}</p>
                <Badge variant="outline" className="mt-1">
                  {ROLE_LABELS[member.role]}
                </Badge>
              </div>
              {member.id !== ownerId && member.role === "staff" && (
                <form action={removeStaffFormAction.bind(null, member.id)}>
                  <Button type="submit" variant="ghost" size="sm" className="text-red-600">
                    Remove
                  </Button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
