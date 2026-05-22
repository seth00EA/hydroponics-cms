import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  farm: "Farm",
  growth: "Growth Process",
  harvest: "Harvest",
};

export const galleryFilterOptions = [
  { id: "all" as const, label: "All" },
  { id: "farm" as const, label: galleryCategoryLabels.farm },
  { id: "growth" as const, label: galleryCategoryLabels.growth },
  { id: "harvest" as const, label: galleryCategoryLabels.harvest },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "farm-1",
    title: "Morning at the greenhouse",
    description:
      "Our main farm facility at sunrise—rows of NFT channels ready for the day’s nutrient cycle.",
    image: "/images/gallery-farm-1.svg",
    category: "farm",
  },
  {
    id: "farm-2",
    title: "Reservoir and pump room",
    description:
      "Centralized nutrient mixing and filtration keeps every bay supplied with balanced solution.",
    image: "/images/gallery-farm-2.svg",
    category: "farm",
  },
  {
    id: "farm-3",
    title: "Aerial view of grow bays",
    description:
      "Organized bays for lettuce, herbs, and trial crops across climate-controlled zones.",
    image: "/images/gallery-farm-3.svg",
    category: "farm",
  },
  {
    id: "farm-4",
    title: "Seedling propagation bench",
    description:
      "Young starts under tuned light and humidity before transplant into production systems.",
    image: "/images/placeholder-gallery-3.svg",
    category: "farm",
  },
  {
    id: "growth-1",
    title: "Week 2 — Root development",
    description:
      "Healthy white roots emerging in DWC after the first nutrient transition.",
    image: "/images/gallery-growth-1.svg",
    category: "growth",
  },
  {
    id: "growth-2",
    title: "Nutrient monitoring",
    description:
      "Daily pH and EC checks ensure stable growth through vegetative stage.",
    image: "/images/gallery-growth-2.svg",
    category: "growth",
  },
  {
    id: "growth-3",
    title: "Canopy fill under LEDs",
    description:
      "Basil and lettuce canopies closing in under full-spectrum panels.",
    image: "/images/placeholder-gallery-4.svg",
    category: "growth",
  },
  {
    id: "growth-4",
    title: "Training and pruning",
    description:
      "Light pruning and spacing adjustments for even light distribution.",
    image: "/images/gallery-growth-3.svg",
    category: "growth",
  },
  {
    id: "harvest-1",
    title: "First lettuce harvest",
    description:
      "Crisp butterhead heads packed for local restaurant partners the same morning.",
    image: "/images/gallery-harvest-1.svg",
    category: "harvest",
  },
  {
    id: "harvest-2",
    title: "Cherry tomato pick",
    description:
      "Vine-ripe clusters from vertical towers—peak Brix and uniform color.",
    image: "/images/gallery-harvest-2.svg",
    category: "harvest",
  },
  {
    id: "harvest-3",
    title: "Herb bundles",
    description:
      "Basil, cilantro, and mint harvested to order for farmers market stands.",
    image: "/images/gallery-harvest-3.svg",
    category: "harvest",
  },
  {
    id: "harvest-4",
    title: "Community harvest day",
    description:
      "Workshop attendees take home their first hydroponic harvest from demo systems.",
    image: "/images/placeholder-gallery-1.svg",
    category: "harvest",
  },
];

export const galleryPageContent = {
  title: "Gallery",
  description:
    "Explore our farm, follow the growth process from seedling to canopy, and see the harvests we deliver to local partners.",
  resultsLabel: (count: number) =>
    count === 1 ? "1 image" : `${count} images`,
};
