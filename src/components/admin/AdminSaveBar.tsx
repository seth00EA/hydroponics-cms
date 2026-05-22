"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type AdminSaveBarProps = {
  onSave?: () => void;
  saveLabel?: string;
  className?: string;
};

export function AdminSaveBar({
  onSave,
  saveLabel = "Save changes",
  className,
}: AdminSaveBarProps) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-card-border bg-card px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {saved ? (
        <p className="text-sm font-medium text-primary" role="status">
          Changes saved locally (preview only — not persisted yet).
        </p>
      ) : (
        <p className="text-sm text-muted">
          Changes are not sent to a server until Supabase is connected.
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" disabled>
          Discard
        </Button>
        <Button type="button" variant="ghost" size="sm" disabled>
          Save draft
        </Button>
        <Button type="button" size="sm" onClick={handleSave}>
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
