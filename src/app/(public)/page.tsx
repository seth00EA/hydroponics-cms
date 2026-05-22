import { ContactCtaSection } from "@/components/landing/ContactCtaSection";
import { FeaturedProductsSection } from "@/components/landing/FeaturedProductsSection";
import { GalleryPreviewSection } from "@/components/landing/GalleryPreviewSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WhyChooseUsSection } from "@/components/landing/WhyChooseUsSection";
import { getFeaturedProducts } from "@/lib/products/get-products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <>
      <HeroSection />
      <ProcessSection />
      <FeaturedProductsSection products={featuredProducts} />
      <WhyChooseUsSection />
      <GalleryPreviewSection />
      <ContactCtaSection />
    </>
  );
}
