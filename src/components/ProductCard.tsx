"use client";

import Image from "next/image";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/types";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  className?: string;
  onCartChange?: () => void;
};

export function ProductCard({ product, className, onCartChange }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const unavailable = !product.is_available || product.stock_quantity <= 0;

  const isRemoteImage =
    product.image_url.startsWith("http") ||
    product.image_url.includes("supabase.co");

  function handleAddToCart() {
    addToCart({
      product_id: product.id,
      product_name: product.name,
      quantity,
      unit_price: product.price,
    });

    onCartChange?.();
    alert(`${quantity} ${product.name} added to cart`);
  }

  return (
    <Card
      padding="none"
      className={cn(
        "flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md",
        unavailable && "opacity-90",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-muted-bg">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className={cn("object-cover p-6", unavailable && "grayscale-[30%]")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={isRemoteImage}
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.is_featured && <Badge variant="featured">Featured</Badge>}
        </div>

        <div className="absolute right-3 top-3">
          <AvailabilityBadge availability={product.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {product.category}
        </p>

        <h3 className="mt-1 text-lg font-semibold text-foreground">{product.name}</h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 border-t border-card-border pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xl font-bold text-primary">
            ₱{product.price.toFixed(2)}
            </p>

            {unavailable ? (
              <span className="text-xs font-medium text-muted">Unavailable</span>
            ) : (
              <span className="text-xs font-medium text-primary">
                {product.stock_quantity} in stock
              </span>
            )}
          </div>

          {!unavailable && (
            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={product.stock_quantity}
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setQuantity(Math.min(Math.max(value, 1), product.stock_quantity));
                }}
                className="w-20 rounded-lg border px-3 py-2 text-center text-sm"
              />

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
