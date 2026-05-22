-- Phase 7: Profiles, roles, and RBAC
-- Run after schema.sql in Supabase SQL Editor

-- ---------------------------------------------------------------------------
-- Role enum & profiles table
-- ---------------------------------------------------------------------------
create type public.user_role as enum ('owner', 'staff', 'customer');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);
create index profiles_email_idx on public.profiles (email);

-- ---------------------------------------------------------------------------
-- Auto-create profile on auth signup (default: customer)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'customer'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helpers for RBAC
-- ---------------------------------------------------------------------------
create or replace function public.owner_exists()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where role = 'owner'
  );
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('owner', 'staff')
  );
$$;

create or replace function public.is_owner_user()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'owner'
  );
$$;

-- ---------------------------------------------------------------------------
-- Profiles RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Owners read all profiles"
  on public.profiles for select
  using (public.is_owner_user());

create policy "Users update own profile name"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

create policy "Owners manage staff profiles"
  on public.profiles for update
  using (public.is_owner_user())
  with check (role in ('staff', 'customer'));

create policy "Owners insert staff profiles"
  on public.profiles for insert
  with check (public.is_owner_user() and role = 'staff');

-- ---------------------------------------------------------------------------
-- CMS write policies (owner full, staff limited — contact owner-only)
-- ---------------------------------------------------------------------------
create policy "Admin read products"
  on public.products for select
  using (public.is_admin_user());

create policy "Admin write products"
  on public.products for all
  using (public.is_admin_user())
  with check (public.is_admin_user());

create policy "Admin read gallery"
  on public.gallery for select
  using (public.is_admin_user());

create policy "Admin write gallery"
  on public.gallery for all
  using (public.is_admin_user())
  with check (public.is_admin_user());

create policy "Admin read homepage_sections"
  on public.homepage_sections for select
  using (public.is_admin_user());

create policy "Admin write homepage_sections"
  on public.homepage_sections for all
  using (public.is_admin_user())
  with check (public.is_admin_user());

create policy "Admin read features"
  on public.features for select
  using (public.is_admin_user());

create policy "Admin write features"
  on public.features for all
  using (public.is_admin_user())
  with check (public.is_admin_user());

create policy "Public read contact_settings"
  on public.contact_settings for select
  using (true);

create policy "Owner write contact_settings"
  on public.contact_settings for all
  using (public.is_owner_user())
  with check (public.is_owner_user());

-- Public read policies from Phase 6 remain unchanged
