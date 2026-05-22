import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card>
      <CardDescription>{label}</CardDescription>
      <CardTitle className="mt-2 text-2xl">{value}</CardTitle>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}
