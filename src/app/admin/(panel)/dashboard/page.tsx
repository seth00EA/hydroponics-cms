import Link from "next/link";
import { AdminPageNotice, AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { QuickActionGrid } from "@/components/admin/QuickActionGrid";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { adminDashboardContent } from "@/data/admin";
import { adminNavLinks } from "@/data/site";
import { galleryItems } from "@/data/gallery";
import { getProducts } from "@/lib/products/get-products";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const inStock = products.filter((p) => p.availability === "in_stock").length;
  const lowStock = products.filter((p) => p.availability === "low_stock").length;
  const featured = products.filter((p) => p.is_featured).length;

  const admin = createAdminClient() as any;

  const { count: totalOrders } = admin
    ? await admin.from("orders").select("id", { count: "exact", head: true })
    : { count: 0 };

  const { count: pendingOrders } = admin
    ? await admin
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending")
    : { count: 0 };

  const { count: completedOrders } = admin
    ? await admin
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "completed")
    : { count: 0 };

  const { count: cancelledOrders } = admin
    ? await admin
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "cancelled")
    : { count: 0 };

  return (
    <AdminPageShell
      title={adminDashboardContent.welcome}
      description={adminDashboardContent.subtitle}
    >
      <AdminPageNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total orders"
          value={totalOrders ?? 0}
          hint="All customer orders"
          trend={`${pendingOrders ?? 0} pending`}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6M5 7h14M5 7a2 2 0 012-2h10a2 2 0 012 2M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7" />
            </svg>
          }
        />

        <AdminStatCard
          label="Pending orders"
          value={pendingOrders ?? 0}
          hint="Need review"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
          }
        />

        <AdminStatCard
          label="Completed orders"
          value={completedOrders ?? 0}
          hint="Successfully fulfilled"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          }
        />

        <AdminStatCard
          label="Cancelled orders"
          value={cancelledOrders ?? 0}
          hint="Cancelled requests"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total products"
          value={products.length}
          hint="In catalog"
          trend={`${inStock} in stock - ${lowStock} low`}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        />

        <AdminStatCard
          label="Gallery images"
          value={galleryItems.length}
          hint="Farm, growth, harvest"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />

        <AdminStatCard
          label="Featured products"
          value={featured}
          hint="On homepage"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />

        <AdminStatCard
          label="CMS sections"
          value={adminNavLinks.length - 1}
          hint="Homepage, products, orders, gallery, contact"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
      </div>

      <QuickActionGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Content sections</CardTitle>
          <CardDescription className="mb-4">
            Jump directly to an editor.
          </CardDescription>

          <ul className="space-y-2">
            {adminNavLinks
              .filter((l) => l.href !== "/admin/dashboard")
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-lg border border-card-border px-4 py-3 text-sm transition-colors hover:bg-muted-bg"
                  >
                    <span>
                      <span className="font-medium text-foreground">{link.label}</span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {link.description}
                      </span>
                    </span>
                    <span className="text-primary">View</span>
                  </Link>
                </li>
              ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>Inventory snapshot</CardTitle>
          <CardDescription className="mb-4">
            Availability from product data.
          </CardDescription>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-card-border pb-2">
              <span className="text-muted">In stock</span>
              <span className="font-semibold text-foreground">{inStock}</span>
            </li>

            <li className="flex justify-between border-b border-card-border pb-2">
              <span className="text-muted">Low stock</span>
              <span className="font-semibold text-amber-700">{lowStock}</span>
            </li>

            <li className="flex justify-between">
              <span className="text-muted">Out of stock</span>
              <span className="font-semibold text-foreground">
                {
                  products.filter(
                    (p) => p.availability === "out_of_stock" || !p.is_available,
                  ).length
                }
              </span>
            </li>
          </ul>

          <Link
            href="/admin/products"
            className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
          >
            Manage products
          </Link>
        </Card>
      </div>
    </AdminPageShell>
  );
}