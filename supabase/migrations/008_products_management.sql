-- Phase 8: Product management schema + storage

-- ---------------------------------------------------------------------------
-- Migrate products table to new columns
-- ---------------------------------------------------------------------------
alter table public.products rename column image to image_url;

alter table public.products
  add column if not exists stock_quantity integer not null default 0 check (stock_quantity >= 0);

alter table public.products
  add column if not exists is_available boolean not null default true;

alter table public.products
  add column if not exists is_featured boolean not null default false;

-- Backfill from legacy columns when present
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'products' and column_name = 'featured'
  ) then
    update public.products set is_featured = featured where is_featured = false;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'products' and column_name = 'availability'
  ) then
    update public.products
    set
      is_available = (availability <> 'out_of_stock'),
      stock_quantity = case
        when availability = 'out_of_stock' then 0
        when availability = 'low_stock' then 5
        else 20
      end;
  end if;
end $$;

alter table public.products drop column if exists availability;
alter table public.products drop column if exists featured;

create index if not exists products_is_featured_idx
  on public.products (is_featured) where is_featured = true;

create index if not exists products_is_available_idx
  on public.products (is_available);

-- ---------------------------------------------------------------------------
-- Storage bucket for product images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Admin upload / manage
create policy "Admin upload product images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and public.is_admin_user()
  );

create policy "Admin update product images"
  on storage.objects for update
  using (bucket_id = 'product-images' and public.is_admin_user())
  with check (bucket_id = 'product-images' and public.is_admin_user());

create policy "Admin delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and public.is_admin_user());
