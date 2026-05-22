import { ProductCatalog } from "@/components/products/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { productsPageContent } from "@/data/products";
import { getProducts } from "@/lib/products/get-products";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <PageHeader
          title={productsPageContent.title}
          description={productsPageContent.description}
        />
        <ProductCatalog products={products} />
      </Container>
    </Section>
  );
}
