import { GalleryCatalog } from "@/components/gallery/GalleryCatalog";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { galleryPageContent } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <PageHeader
          title={galleryPageContent.title}
          description={galleryPageContent.description}
        />
        <GalleryCatalog />
      </Container>
    </Section>
  );
}
