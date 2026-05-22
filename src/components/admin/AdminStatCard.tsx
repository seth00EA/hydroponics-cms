import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  trend?: string;
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  hint,
  icon,
  trend,
  className,
}: AdminStatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
          {trend && (
            <p className="mt-2 text-xs font-medium text-secondary">{trend}</p>
          )}
        </div>
        {icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            {icon}
          </span>
        )}
      </div>
    </Card>
  );
}
