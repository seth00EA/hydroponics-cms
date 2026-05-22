export const adminDashboardContent = {
  welcome: "Welcome back",
  subtitle: "Manage your storefront content from one place.",
};

export const quickActions = [
  {
    label: "Add product",
    href: "/admin/products",
    description: "Expand your catalog",
    variant: "primary" as const,
  },
  {
    label: "Upload gallery image",
    href: "/admin/gallery",
    description: "Farm, growth, or harvest",
    variant: "secondary" as const,
  },
  {
    label: "Edit homepage",
    href: "/admin/homepage",
    description: "Hero & landing sections",
    variant: "outline" as const,
  },
  {
    label: "Update contact",
    href: "/admin/contact",
    description: "Phone, email, social",
    variant: "outline" as const,
  },
];

export const adminNotice = {
  title: "CMS preview",
  body: "Content forms still use static sample data until wired to the database. Auth and roles are active when Supabase env vars are set.",
};
