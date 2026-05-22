"use client";

import { productCategories, productsPageContent } from "@/data/products";
import { cn } from "@/lib/cn";

type ProductFiltersProps = {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  categories?: readonly string[];
};

export function ProductFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  categories = productCategories,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-sm sm:p-5">
      <div className="relative">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={productsPageContent.searchPlaceholder}
          className="w-full rounded-xl border border-card-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                category === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted-bg text-muted hover:bg-primary-light hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
