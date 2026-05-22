import type { GalleryCategory, GalleryItem } from "@/types";

export function filterGalleryItems(
  items: GalleryItem[],
  filter: "all" | GalleryCategory,
): GalleryItem[] {
  if (filter === "all") return items;
  return items.filter((item) => item.category === filter);
}

export function groupGalleryByCategory(
  items: GalleryItem[],
): { category: GalleryCategory; items: GalleryItem[] }[] {
  const order: GalleryCategory[] = ["farm", "growth", "harvest"];
  return order
    .map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);
}
