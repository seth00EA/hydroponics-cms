import { LOW_STOCK_THRESHOLD } from "@/lib/products/constants";
import type { Tables } from "@/types/database";
import type { Product, ProductAvailability } from "@/types";

export function deriveAvailability(
  isAvailable: boolean,
  stockQuantity: number,
): ProductAvailability {
  if (!isAvailable || stockQuantity <= 0) return "out_of_stock";
  if (stockQuantity <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

export function mapDbProduct(row: Tables<"products">): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    image_url: row.image_url,
    stock_quantity: row.stock_quantity,
    is_available: row.is_available,
    is_featured: row.is_featured,
    created_at: row.created_at,
    availability: deriveAvailability(row.is_available, row.stock_quantity),
  };
}

/** Map legacy static sample rows (Phase 3) for fallback */
export function mapStaticProduct(row: {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  availability: ProductAvailability;
  featured?: boolean;
}): Product {
  const stock =
    row.availability === "out_of_stock"
      ? 0
      : row.availability === "low_stock"
        ? 3
        : 20;

  const is_available = row.availability !== "out_of_stock";

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    category: row.category,
    image_url: row.image,
    stock_quantity: stock,
    is_available,
    is_featured: row.featured ?? false,
    created_at: new Date().toISOString(),
    availability: row.availability,
  };
}
