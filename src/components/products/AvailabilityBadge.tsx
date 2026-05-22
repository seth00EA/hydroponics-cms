import type { ProductAvailability } from "@/types";
import { cn } from "@/lib/cn";

const config: Record<
  ProductAvailability,
  { label: string; className: string }
> = {
  in_stock: {
    label: "In stock",
    className: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  },
  low_stock: {
    label: "Low stock",
    className: "bg-amber-50 text-amber-800 ring-amber-600/20",
  },
  out_of_stock: {
    label: "Out of stock",
    className: "bg-zinc-100 text-zinc-600 ring-zinc-500/15",
  },
};

export function AvailabilityBadge({
  availability,
  className,
}: {
  availability: ProductAvailability;
  className?: string;
}) {
  const { label, className: styles } = config[availability];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles,
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          availability === "in_stock" && "bg-emerald-500",
          availability === "low_stock" && "bg-amber-500",
          availability === "out_of_stock" && "bg-zinc-400",
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}
