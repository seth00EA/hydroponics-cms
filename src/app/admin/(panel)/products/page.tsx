import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { ProductsAdminManager } from "@/components/admin/ProductsAdminManager";
import { getProducts } from "@/lib/products/get-products";

export const metadata = {
  title: "Manage Products",
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <AdminPageShell
      title="Products"
      description="Add, edit, and organize items in your public catalog"
    >
     
      <ProductsAdminManager products={products} />
    </AdminPageShell>
  );
}
