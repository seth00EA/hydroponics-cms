"use client";

import { galleryFilterOptions } from "@/data/gallery";
import { cn } from "@/lib/cn";
import type { GalleryCategory } from "@/types";

export type GalleryFilter = "all" | GalleryCategory;

type GalleryFiltersProps = {
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
};

export function GalleryFilters({ active, onChange }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {galleryFilterOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            active === option.id
              ? "bg-primary text-white shadow-sm"
              : "bg-muted-bg text-muted hover:bg-primary-light hover:text-primary",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
