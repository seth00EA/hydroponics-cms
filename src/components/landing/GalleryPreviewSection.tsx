import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";
import { galleryCategoryLabels, galleryItems } from "@/data/gallery";

export function GalleryPreviewSection() {
  const preview = galleryItems.slice(0, 4);

  return (
    <section id="gallery" className="bg-muted-bg py-14 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title={homepageContent.galleryPreviewTitle}
            subtitle={homepageContent.galleryPreviewSubtitle}
            className="mb-0"
          />
          <Link
            href="/gallery"
            className="shrink-0 text-sm font-semibold text-primary hover:underline"
          >
            View full gallery →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((item, index) => (
            <Link
              key={item.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-all hover:shadow-lg ${
                index === 0 ? "sm:col-span-2 sm:row-span-1 lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative bg-primary-light ${
                  index === 0 ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover p-4 transition-transform duration-300 group-hover:scale-105"
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4">
                <Badge variant="outline" className="mb-2">
                  {galleryCategoryLabels[item.category]}
                </Badge>
                <h3 className="font-semibold text-foreground group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
