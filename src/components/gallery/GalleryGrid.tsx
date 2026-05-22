import { GalleryCard } from "@/components/GalleryCard";
import { galleryCategoryLabels } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import { cn } from "@/lib/cn";

type GalleryGridProps = {
  items: GalleryItem[];
  className?: string;
};

export function GalleryGrid({ items, className }: GalleryGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <GalleryCard
          key={item.id}
          item={item}
          featured={index === 0 && items.length > 2}
        />
      ))}
    </div>
  );
}

type GalleryGroupedSectionsProps = {
  groups: { category: keyof typeof galleryCategoryLabels; items: GalleryItem[] }[];
};

export function GalleryGroupedSections({ groups }: GalleryGroupedSectionsProps) {
  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.category} id={group.category}>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-card-border pb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {galleryCategoryLabels[group.category]}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {group.items.length}{" "}
                {group.items.length === 1 ? "photo" : "photos"}
              </p>
            </div>
          </div>
          <GalleryGrid items={group.items} />
        </section>
      ))}
    </div>
  );
}
