import Image from "next/image";
import type { Product } from "@/types";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const unavailable = !product.is_available || product.stock_quantity <= 0;
  const isRemoteImage =
    product.image_url.startsWith("http") ||
    product.image_url.includes("supabase.co");

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
          className={cn(
            "object-cover p-6",
            unavailable && "grayscale-[30%]",
          )}
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
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {product.description}
        </p>
        <div className="mt-4 flex items-end justify-between gap-2 border-t border-card-border pt-4">
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          {unavailable ? (
            <span className="text-xs font-medium text-muted">Unavailable</span>
          ) : product.stock_quantity <= 5 ? (
            <span className="text-xs font-medium text-amber-700">
              {product.stock_quantity} left
            </span>
          ) : (
            <span className="text-xs font-medium text-primary">In stock</span>
          )}
        </div>
      </div>
    </Card>
  );
}
