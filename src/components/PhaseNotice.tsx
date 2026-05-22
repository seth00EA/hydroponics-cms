import { Card } from "@/components/ui/Card";

export function PhaseNotice() {
  return (
    <Card className="border-dashed border-primary/30 bg-primary-light/30">
      <p className="text-sm text-primary">
        <span className="font-semibold">Phase 1 preview.</span> Editing and saving
        content will be enabled in Phase 2 with Supabase authentication and database
        integration.
      </p>
    </Card>
  );
}
