import Image from "next/image";
import type { GalleryItem } from "@/types";
import { galleryCategoryLabels } from "@/data/gallery";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type GalleryCardProps = {
  item: GalleryItem;
  className?: string;
  featured?: boolean;
};

export function GalleryCard({ item, className, featured }: GalleryCardProps) {
  return (
    <Card
      padding="none"
      className={cn(
        "group overflow-hidden transition-shadow hover:shadow-lg",
        featured && "sm:col-span-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative bg-primary-light",
          featured ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>
      <div className="p-5">
        <Badge variant="outline" className="mb-2">
          {galleryCategoryLabels[item.category]}
        </Badge>
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      </div>
    </Card>
  );
}
