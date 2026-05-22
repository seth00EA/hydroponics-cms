"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  deleteProductFormAction,
  updateStockFormAction,
  toggleAvailabilityFormAction,
  toggleFeaturedFormAction,
} from "@/app/admin/actions/products-client";
import { ProductForm } from "@/components/admin/ProductForm";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Product } from "@/types";

type ProductsAdminManagerProps = {
  products: Product[];
};

export function ProductsAdminManager({ products }: ProductsAdminManagerProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null | "new">(null);
  const supabaseEnabled = isSupabaseConfigured();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [products, search]);

  function refresh() {
    router.refresh();
    setEditing(null);
  }

  if (!supabaseEnabled) {
    return (
      <Card className="py-8 text-center text-sm text-muted">
        Configure Supabase in <code className="font-mono">.env.local</code> to manage
        products in the database.
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-card-border bg-card py-2 pl-3 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button size="sm" onClick={() => setEditing("new")}>
            + Add product
          </Button>
        </div>

        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-card-border bg-muted-bg">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Featured</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-card-border hover:bg-muted-bg/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted-bg">
                          <Image
                            src={product.image_url}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized={product.image_url.includes("supabase")}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">{product.name}</p>
                          <p className="line-clamp-1 max-w-[180px] text-xs text-muted">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{product.category}</td>
                    <td className="px-4 py-3 font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <form action={updateStockFormAction} className="flex items-center gap-1">
                        <input type="hidden" name="productId" value={product.id} />
                        <input
                          name="stock_quantity"
                          type="number"
                          min={0}
                          defaultValue={product.stock_quantity}
                          className="w-16 rounded border border-card-border px-2 py-1 text-sm"
                        />
                        <Button type="submit" variant="ghost" size="sm">
                          Save
                        </Button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        <AvailabilityBadge availability={product.availability} />
                        <form action={toggleAvailabilityFormAction}>
                          <input type="hidden" name="productId" value={product.id} />
                          <input
                            type="hidden"
                            name="is_available"
                            value={String(!product.is_available)}
                          />
                          <Button type="submit" variant="ghost" size="sm">
                            {product.is_available ? "Mark unavailable" : "Mark available"}
                          </Button>
                        </form>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <form action={toggleFeaturedFormAction} className="flex flex-col gap-1">
                        <input type="hidden" name="productId" value={product.id} />
                        <input
                          type="hidden"
                          name="is_featured"
                          value={String(!product.is_featured)}
                        />
                        {product.is_featured ? (
                          <Badge variant="featured">Featured</Badge>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                        <Button type="submit" variant="ghost" size="sm">
                          {product.is_featured ? "Unfeature" : "Feature"}
                        </Button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditing(product)}
                        >
                          Edit
                        </Button>
                        <form action={deleteProductFormAction}>
                          <input type="hidden" name="productId" value={product.id} />
                          <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            Delete
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted">No products found.</p>
          )}
        </Card>
        <p className="text-xs text-muted">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>

      {editing !== null && (
        <ProductForm
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSuccess={refresh}
        />
      )}
    </>
  );
}
