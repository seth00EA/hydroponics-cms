import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "primary";
};

const variants = {
  default: "bg-background",
  muted: "bg-muted-bg",
  primary: "bg-primary text-white",
};

export function Section({
  children,
  className,
  id,
  variant = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-12 sm:py-16", variants[variant], className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
