export type ProductAvailability = "in_stock" | "low_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock_quantity: number;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
  /** Derived for display badges */
  availability: ProductAvailability;
};

export type GalleryCategory = "farm" | "growth" | "harvest";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: GalleryCategory;
};

export type SocialPlatform = "facebook" | "messenger";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  hours: string;
  socialLinks: SocialLink[];
  mapEmbedUrl?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: "water" | "support" | "quality" | "sustainable" | "local" | "warranty";
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type HomepageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondaryCta: string;
  heroImage: string;
  heroImageAlt: string;
  logoImage: string;
  backgroundImage: string;
  overlayOpacity: number;
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
  featuredTitle: string;
  featuredSubtitle: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChooseFeatures: FeatureItem[];
  galleryPreviewTitle: string;
  galleryPreviewSubtitle: string;
  contactCtaTitle: string;
  contactCtaSubtitle: string;
  contactCtaPrimary: string;
  contactCtaSecondary: string;
  aboutTitle: string;
  aboutBody: string;
  features: FeatureItem[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type AdminNavLink = {
  label: string;
  href: string;
  description?: string;
};
