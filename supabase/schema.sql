-- Verdant Roots — Phase 6 database schema
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.product_availability as enum (
  'in_stock',
  'low_stock',
  'out_of_stock'
);

create type public.gallery_category as enum (
  'farm',
  'growth',
  'harvest'
);

create type public.feature_icon as enum (
  'water',
  'support',
  'quality',
  'sustainable',
  'local',
  'warranty'
);

create type public.homepage_section_key as enum (
  'hero',
  'process',
  'featured',
  'why_choose',
  'gallery_preview',
  'contact_cta',
  'about'
);

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  image text not null,
  availability public.product_availability not null default 'in_stock',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_idx on public.products (category);
create index products_featured_idx on public.products (featured) where featured = true;
create index products_sort_order_idx on public.products (sort_order);

-- ---------------------------------------------------------------------------
-- gallery
-- ---------------------------------------------------------------------------
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image text not null,
  category public.gallery_category not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index gallery_category_idx on public.gallery (category);
create index gallery_sort_order_idx on public.gallery (sort_order);

-- ---------------------------------------------------------------------------
-- homepage_sections (one row per CMS block)
-- metadata jsonb: e.g. { "process_steps": [...], "hero_image_alt": "..." }
-- ---------------------------------------------------------------------------
create table public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key public.homepage_section_key not null unique,
  title text,
  subtitle text,
  body text,
  image_url text,
  cta_primary text,
  cta_secondary text,
  metadata jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- features (cards linked to a section, e.g. why_choose, process highlights)
-- ---------------------------------------------------------------------------
create table public.features (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  title text not null,
  description text not null,
  icon public.feature_icon not null default 'quality',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index features_section_key_idx on public.features (section_key);
create index features_sort_order_idx on public.features (section_key, sort_order);

-- ---------------------------------------------------------------------------
-- contact_settings (singleton row — id fixed in seed)
-- social_links: [{ "platform": "facebook", "label": "...", "url": "..." }]
-- form_settings: { "form_title": "...", "show_phone": true, ... }
-- faqs: [{ "question": "...", "answer": "..." }]
-- ---------------------------------------------------------------------------
create table public.contact_settings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  phone text not null,
  address text not null,
  hours text not null,
  social_links jsonb not null default '[]'::jsonb,
  form_settings jsonb not null default '{}'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger gallery_updated_at
  before update on public.gallery
  for each row execute function public.set_updated_at();

create trigger homepage_sections_updated_at
  before update on public.homepage_sections
  for each row execute function public.set_updated_at();

create trigger features_updated_at
  before update on public.features
  for each row execute function public.set_updated_at();

create trigger contact_settings_updated_at
  before update on public.contact_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security (public read, authenticated write — Phase 7 auth)
-- ---------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.gallery enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.features enable row level security;
alter table public.contact_settings enable row level security;

-- Public read for storefront
create policy "Public read products"
  on public.products for select
  using (true);

create policy "Public read gallery"
  on public.gallery for select
  using (true);

create policy "Public read homepage_sections"
  on public.homepage_sections for select
  using (true);

create policy "Public read features"
  on public.features for select
  using (true);

create policy "Public read contact_settings"
  on public.contact_settings for select
  using (true);

-- Authenticated admin write (enable after Supabase Auth in Phase 7)
-- create policy "Admin write products"
--   on public.products for all
--   using (auth.role() = 'authenticated')
--   with check (auth.role() = 'authenticated');
