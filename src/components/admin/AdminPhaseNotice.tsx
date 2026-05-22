import { adminNotice } from "@/data/admin";
import { Card } from "@/components/ui/Card";

export function AdminPhaseNotice() {
  return (
    <Card className="border-dashed border-primary/30 bg-primary-light/30">
      <p className="text-sm text-primary">
        <span className="font-semibold">{adminNotice.title}.</span> {adminNotice.body}{" "}
        Owner and staff roles are enforced when Supabase is connected.
      </p>
    </Card>
  );
}
