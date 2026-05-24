"use client";

import { useMemo, useState } from "react";
import {
  GalleryFilters,
  type GalleryFilter,
} from "@/components/gallery/GalleryFilters";
import {
  GalleryGrid,
  GalleryGroupedSections,
} from "@/components/gallery/GalleryGrid";
import { galleryPageContent } from "@/data/gallery";
import {
  filterGalleryItems,
  groupGalleryByCategory,
} from "@/lib/gallery-utils";
import { Card } from "@/components/ui/Card";
import type { GalleryItem } from "@/types";

export function GalleryCatalog({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");

  const filtered = useMemo(
    () => filterGalleryItems(items, filter),
    [items, filter],
  );

  const grouped = useMemo(
    () => groupGalleryByCategory(items),
    [items],
  );

  return (
    <div className="space-y-8">
      <GalleryFilters active={filter} onChange={setFilter} />

      {filter !== "all" && (
        <p className="text-sm text-muted">
          {galleryPageContent.resultsLabel(filtered.length)}
        </p>
      )}

      {filter === "all" ? (
        <GalleryGroupedSections groups={grouped} />
      ) : filtered.length > 0 ? (
        <GalleryGrid items={filtered} />
      ) : (
        <Card className="py-12 text-center">
          <p className="font-medium text-foreground">No images in this category</p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-3 text-sm font-medium text-primary hover:underline"
          >
            View all gallery
          </button>
        </Card>
      )}
    </div>
  );
}
