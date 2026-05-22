"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { productCategories, productsPageContent } from "@/data/products";
import { filterProducts } from "@/lib/product-utils";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/types";

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const fromData = [...new Set(products.map((p) => p.category))].sort();
    return ["All", ...fromData] as readonly string[];
  }, [products]);

  const filtered = useMemo(
    () => filterProducts(products, search, category),
    [products, search, category],
  );

  return (
    <div className="space-y-8">
      <ProductFilters
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        categories={categories.length > 1 ? categories : productCategories}
      />

      <p className="text-sm text-muted">
        {productsPageContent.resultsLabel(filtered.length, products.length)}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="py-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            {productsPageContent.emptyTitle}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {productsPageContent.emptyDescription}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        </Card>
      )}
    </div>
  );
}
