import Link from "next/link";
import { quickActions } from "@/data/admin";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";

export function QuickActionGrid() {
  return (
    <Card>
      <CardTitle className="mb-4">Quick actions</CardTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex flex-col rounded-xl border border-card-border p-4 transition-colors hover:border-primary/40 hover:bg-muted-bg"
          >
            <span className="font-semibold text-foreground group-hover:text-primary">
              {action.label}
            </span>
            <span className="mt-1 text-sm text-muted">{action.description}</span>
            <span className="mt-3">
              <Button
                variant={action.variant}
                size="sm"
                className="pointer-events-none"
              >
                Open →
              </Button>
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
