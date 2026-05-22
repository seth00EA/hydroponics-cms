import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";
import type { Product } from "@/types";

type FeaturedProductsSectionProps = {
  products: Product[];
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section id="products" className="bg-muted-bg py-14 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title={homepageContent.featuredTitle}
            subtitle={homepageContent.featuredSubtitle}
            className="mb-0"
          />
          <Link
            href="/products"
            className="shrink-0 text-sm font-semibold text-primary hover:underline"
          >
            View all products →
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No featured products yet.</p>
        )}
      </Container>
    </section>
  );
}
