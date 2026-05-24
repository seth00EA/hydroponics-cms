import { ContactCtaSection } from "@/components/landing/ContactCtaSection";
import { FeaturedProductsSection } from "@/components/landing/FeaturedProductsSection";
import { GalleryPreviewSection } from "@/components/landing/GalleryPreviewSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WhyChooseUsSection } from "@/components/landing/WhyChooseUsSection";
import { getHomepageContent } from "@/lib/homepage";
import { getFeaturedProducts } from "@/lib/products/get-products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(3);
  const homepage = await getHomepageContent();

  return (
    <>
      <HeroSection content={homepage} />
      <ProcessSection content={homepage} />
      <FeaturedProductsSection products={featuredProducts} />
      <WhyChooseUsSection content={homepage} />
      <GalleryPreviewSection />
      <ContactCtaSection content={homepage} />
    </>
  );
}
