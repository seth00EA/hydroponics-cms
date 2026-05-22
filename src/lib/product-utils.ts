import type { Product } from "@/types";

export function filterProducts(
  products: Product[],
  search: string,
  category: string,
): Product[] {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}
