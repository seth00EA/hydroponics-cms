/**
 * Supabase Database types (Phase 6).
 * Regenerate after applying schema with:
 *   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
 *
 * Hand-maintained until CLI types are generated.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProductAvailability = "in_stock" | "low_stock" | "out_of_stock";
export type GalleryCategory = "farm" | "growth" | "harvest";
export type FeatureIcon =
  | "water"
  | "support"
  | "quality"
  | "sustainable"
  | "local"
  | "warranty";

export type HomepageSectionKey =
  | "hero"
  | "process"
  | "featured"
  | "why_choose"
  | "gallery_preview"
  | "contact_cta"
  | "about";

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          stock_quantity: number;
          is_available: boolean;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          stock_quantity?: number;
          is_available?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image_url?: string;
          stock_quantity?: number;
          is_available?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string;
          category: GalleryCategory;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image: string;
          category: GalleryCategory;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image?: string;
          category?: GalleryCategory;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: HomepageSectionKey;
          title: string | null;
          subtitle: string | null;
          body: string | null;
          image_url: string | null;
          cta_primary: string | null;
          cta_secondary: string | null;
          metadata: Json;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: HomepageSectionKey;
          title?: string | null;
          subtitle?: string | null;
          body?: string | null;
          image_url?: string | null;
          cta_primary?: string | null;
          cta_secondary?: string | null;
          metadata?: Json;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: HomepageSectionKey;
          title?: string | null;
          subtitle?: string | null;
          body?: string | null;
          image_url?: string | null;
          cta_primary?: string | null;
          cta_secondary?: string | null;
          metadata?: Json;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      features: {
        Row: {
          id: string;
          section_key: string;
          title: string;
          description: string;
          icon: FeatureIcon;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          title: string;
          description: string;
          icon: FeatureIcon;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          title?: string;
          description?: string;
          icon?: FeatureIcon;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "owner" | "staff" | "customer";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          role?: "owner" | "staff" | "customer";
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "owner" | "staff" | "customer";
          created_at?: string;
        };
        Relationships: [];
      };
      contact_settings: {
        Row: {
          id: string;
          email: string;
          phone: string;
          address: string;
          hours: string;
          social_links: Json;
          form_settings: Json;
          faqs: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          phone: string;
          address: string;
          hours: string;
          social_links?: Json;
          form_settings?: Json;
          faqs?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          phone?: string;
          address?: string;
          hours?: string;
          social_links?: Json;
          form_settings?: Json;
          faqs?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      product_availability: ProductAvailability;
      gallery_category: GalleryCategory;
      feature_icon: FeatureIcon;
      homepage_section_key: HomepageSectionKey;
      user_role: "owner" | "staff" | "customer";
    };
    CompositeTypes: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
