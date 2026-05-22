import type { FeatureItem } from "@/types";
import { cn } from "@/lib/cn";

const icons: Record<FeatureItem["icon"], React.ReactNode> = {
  water: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 3c-1.5 3-4 5.5-4 9a4 4 0 108 0c0-3.5-2.5-6-4-9z"
    />
  ),
  support: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 10a6 6 0 10-12 0v1.5a3 3 0 00-1 2.2V16h14v-2.3a3 3 0 00-1-2.2V10zM9 20h6"
    />
  ),
  quality: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  sustainable: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M5.6 18.4l1.4-1.4m10-10l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  ),
  local: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  ),
  warranty: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m-6 8h8a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0010.586 2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  ),
};

export function FeatureIcon({
  icon,
  className,
}: {
  icon: FeatureItem["icon"];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary",
        className,
      )}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        {icons[icon]}
      </svg>
    </span>
  );
}
