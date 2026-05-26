import type { NavLink } from "@/types";

export const siteConfig = {
  name: "Nolex Hydroponics",
  tagline: "Fresh hydroponic produce grown with care",
  description:
    "Premium hydroponic vegetables, fresh produce, and expert hydroponic growing solutions.",
  copyright: `© ${new Date().getFullYear()} Nolex Hydroponics. All rights reserved.`,
};

export const publicNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const adminNavLinks = [
  { label: "Dashboard", href: "/admin/dashboard", description: "Overview" },
  { label: "Homepage", href: "/admin/homepage", description: "Hero & branding" },
  { label: "Products", href: "/admin/products", description: "Catalog" },
  { label: "Orders", href: "/admin/orders", description: "Customer orders" },
  { label: "Gallery", href: "/admin/gallery", description: "Photos" },
  { label: "Contact", href: "/admin/contact", description: "Business info" },
] as const;