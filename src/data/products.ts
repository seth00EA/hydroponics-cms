import type { ProductAvailability } from "@/types";

/** Legacy static seed data (fallback when Supabase is unavailable) */
export type StaticProductSeed = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  availability: ProductAvailability;
  featured?: boolean;
};

export const products: StaticProductSeed[] = [
  {
    id: "1",
    name: "Compact NFT System",
    description:
      "A space-saving nutrient film technique kit ideal for leafy greens and herbs on balconies or patios.",
    price: 249.99,
    category: "Systems",
    image: "/images/placeholder-system.svg",
    availability: "in_stock",
    featured: true,
  },
  {
    id: "2",
    name: "Deep Water Culture Bucket",
    description:
      "Single-plant DWC setup with air pump, net pot, and starter nutrients for beginners.",
    price: 89.99,
    category: "Systems",
    image: "/images/placeholder-bucket.svg",
    availability: "in_stock",
    featured: true,
  },
  {
    id: "3",
    name: "Bloom Boost Nutrient",
    description:
      "Ph-balanced flowering formula designed for fruiting crops in recirculating systems.",
    price: 34.5,
    category: "Nutrients",
    image: "/images/placeholder-nutrient.svg",
    availability: "in_stock",
  },
  {
    id: "4",
    name: "Full-Spectrum LED Panel",
    description:
      "Energy-efficient grow light with adjustable spectrum for seedling through harvest stages.",
    price: 179.0,
    category: "Lighting",
    image: "/images/placeholder-light.svg",
    availability: "low_stock",
    featured: true,
  },
  {
    id: "5",
    name: "pH & EC Meter Kit",
    description:
      "Calibrated digital meters with storage solution for accurate reservoir monitoring.",
    price: 64.99,
    category: "Tools",
    image: "/images/placeholder-meter.svg",
    availability: "in_stock",
  },
  {
    id: "6",
    name: "Coco Coir Grow Blocks",
    description:
      "Sustainable, pH-neutral grow medium—six compressed blocks expand for multiple transplant cycles.",
    price: 28.0,
    category: "Media",
    image: "/images/placeholder-media.svg",
    availability: "in_stock",
  },
  {
    id: "7",
    name: "Vertical Tower Kit",
    description:
      "Stackable aeroponic towers for strawberries and leafy greens in compact footprints.",
    price: 399.0,
    category: "Systems",
    image: "/images/placeholder-system.svg",
    availability: "low_stock",
  },
  {
    id: "8",
    name: "Seedling Heat Mat",
    description:
      "Uniform warmth for propagation trays—water-resistant and thermostat compatible.",
    price: 42.99,
    category: "Tools",
    image: "/images/placeholder-meter.svg",
    availability: "out_of_stock",
  },
  {
    id: "9",
    name: "Grow A/B Nutrient Set",
    description:
      "Two-part vegetative formula for lettuce, basil, and other fast-turnover crops.",
    price: 48.0,
    category: "Nutrients",
    image: "/images/placeholder-nutrient.svg",
    availability: "in_stock",
    featured: true,
  },
];

export const productCategories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))).sort(),
] as const;

export const productsPageContent = {
  title: "Products",
  description:
    "Hydroponic systems, nutrients, lighting, and tools for every grow stage—browse our catalog below.",
  searchPlaceholder: "Search by name, description, or category…",
  resultsLabel: (count: number, total: number) =>
    count === total
      ? `Showing all ${total} products`
      : `Showing ${count} of ${total} products`,
  emptyTitle: "No products found",
  emptyDescription: "Try a different search term or category filter.",
};
