import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "featured" | "outline";
  className?: string;
};

const variants = {
  default: "bg-muted-bg text-primary",
  featured: "bg-primary-light text-primary-hover",
  outline: "border border-card-border text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
