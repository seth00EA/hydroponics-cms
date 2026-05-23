import type { NavLink } from "@/types";

export const siteConfig = {
  name: "Verdant Roots",
  tagline: "Premium hydroponics for growers who care",
  description:
    "Sustainable hydroponic systems, nutrients, and expert guidance for home and commercial growers.",
  copyright: `© ${new Date().getFullYear()} Verdant Roots. All rights reserved.`,
};

export const publicNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const adminNavLinks = [
  { label: "Dashboard", href: "/admin/dashboard", description: "Overview" },
  { label: "Homepage", href: "/admin/homepage", description: "Hero & about" },
  { label: "Products", href: "/admin/products", description: "Catalog" },
  { label: "Orders", href: "/admin/orders", description: "Customer orders" },
  { label: "Gallery", href: "/admin/gallery", description: "Photos" },
  { label: "Contact", href: "/admin/contact", description: "Business info" },
] as const;
