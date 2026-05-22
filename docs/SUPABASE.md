# Supabase setup — Phase 6

This project is wired for Supabase but **continues to use static sample data** until Phase 7 connects pages and admin forms to the database.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the database to finish provisioning.

## 2. Environment variables

Copy the example file and add your project credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API → `anon` `public` key |

Optional (server-only, Phase 7+ seeding and admin mutations):

| Variable | Where to find it |
|----------|------------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → `service_role` key (never expose to the browser) |

Restart the dev server after changing env vars:

```bash
npm run dev
```

## 3. Apply the database schema

1. Open **SQL Editor** in the Supabase dashboard.
2. Paste the contents of [`supabase/schema.sql`](../supabase/schema.sql).
3. Run the script.

This creates tables, indexes, `updated_at` triggers, and public read RLS policies.

## 4. Client files in this repo

| File | Purpose |
|------|---------|
| `src/lib/supabase/env.ts` | Reads and validates `NEXT_PUBLIC_*` vars; returns `null` if unset |
| `src/lib/supabase/client.ts` | Browser client (`createBrowserClient`) for Client Components |
| `src/lib/supabase/server.ts` | Server client with cookies for Server Components / Route Handlers |
| `src/lib/supabase/admin.ts` | Service-role client (server-only, optional) |
| `src/types/database.ts` | TypeScript types matching the schema |

### Usage (Phase 7+)

**Server Component:**

```ts
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export default async function Page() {
  if (!isSupabaseConfigured()) {
    // fallback to src/data/*.ts static samples
  }
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase!.from("products").select("*").order("sort_order");
}
```

**Client Component:**

```ts
"use client";
import { createBrowserSupabaseClient } from "@/lib/supabase";

const supabase = createBrowserSupabaseClient();
if (supabase) {
  await supabase.from("gallery").select("*");
}
```

---

## Database integration plan

### Table: `products`

Maps to public `/products` and admin `/admin/products`.

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid | PK |
| `name`, `description`, `category`, `image` | text | Product card fields |
| `price` | numeric(10,2) | Display price |
| `availability` | enum | `in_stock`, `low_stock`, `out_of_stock` |
| `featured` | boolean | Homepage featured block |
| `sort_order` | int | Catalog ordering |

**Phase 7:** Replace `src/data/products.ts` reads with `supabase.from("products").select()`. Admin save → `insert` / `update` / `delete`.

---

### Table: `gallery`

Maps to `/gallery` and `/admin/gallery`.

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid | PK |
| `title`, `description`, `image` | text | Card content |
| `category` | enum | `farm`, `growth`, `harvest` |
| `sort_order` | int | Grid ordering |

**Phase 7:** Upload images to Supabase Storage (`gallery` bucket), store public URL in `image`. Admin upload form → Storage + `insert`.

---

### Table: `homepage_sections`

Maps to landing page blocks and `/admin/homepage`. One row per `section_key`.

| `section_key` | UI block |
|---------------|----------|
| `hero` | Hero title, subtitle, CTAs, image |
| `process` | Process section title/subtitle; steps in `metadata.process_steps` |
| `featured` | Featured products section copy |
| `why_choose` | Why choose us title/subtitle |
| `gallery_preview` | Gallery preview heading |
| `contact_cta` | Bottom CTA banner |
| `about` | About copy (optional legacy block) |

| Column | Type | Notes |
|--------|------|--------|
| `section_key` | enum | Unique |
| `title`, `subtitle`, `body` | text | Section copy |
| `image_url`, `cta_primary`, `cta_secondary` | text | Hero / CTA |
| `metadata` | jsonb | Nested data (e.g. process steps array) |

**Phase 7:** Load sections into `homepageContent` shape in a server helper. Admin homepage form → `upsert` on `section_key`.

---

### Table: `features`

Repeatable feature cards (why choose us, optional hero bullets).

| Column | Type | Notes |
|--------|------|--------|
| `section_key` | text | e.g. `why_choose`, `about` |
| `title`, `description` | text | Card copy |
| `icon` | enum | Matches `FeatureIcon` in app types |
| `sort_order` | int | Display order |

**Phase 7:** Query `features` where `section_key = 'why_choose'` for landing page. Admin edits → CRUD on `features` rows.

---

### Table: `contact_settings`

Singleton row for `/contact` and `/admin/contact`.

| Column | Type | Notes |
|--------|------|--------|
| `email`, `phone`, `address`, `hours` | text | Contact details |
| `social_links` | jsonb | `[{ platform, label, url }]` |
| `form_settings` | jsonb | Form title, success message, toggles |
| `faqs` | jsonb | `[{ question, answer }]` |

**Phase 7:** `select` single row (limit 1). Admin save → `update` on fixed id. Contact form submit → insert into `contact_messages` table (future).

---

## 5. Seed data (Phase 7)

A seed script can copy `src/data/*.ts` into Supabase using `createAdminClient()` and `SUPABASE_SERVICE_ROLE_KEY`. Do not run seeds until schema is applied.

## 6. Regenerate TypeScript types (optional)

With [Supabase CLI](https://supabase.com/docs/guides/cli) linked to your project:

```bash
npx supabase gen types typescript --project-id <your-project-ref> > src/types/database.ts
```

## 7. Security checklist (before production)

- [ ] Enable RLS write policies for authenticated admin users only
- [ ] Never commit `.env.local` or service role key
- [ ] Use Storage policies for gallery uploads
- [ ] Add rate limiting on contact form Route Handler

## 8. What Phase 6 does *not* include

- No UI changes to public or admin pages
- No live queries; static `src/data/*` remains the runtime source
- No Supabase Auth (planned Phase 7)

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, `isSupabaseConfigured()` is `false` and clients return `null` so the app keeps working offline.
