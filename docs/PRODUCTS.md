# Product management — Phase 8

Products are stored in Supabase and managed from `/admin/products` by **owner** and **staff**.

## Schema (`products`)

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `name` | text | Product name |
| `description` | text | Long description |
| `price` | numeric | Price (USD) |
| `category` | text | Systems, Nutrients, etc. |
| `image_url` | text | Public URL or `/images/...` path |
| `stock_quantity` | integer | Units in stock (≥ 0) |
| `is_available` | boolean | Available for sale toggle |
| `is_featured` | boolean | Shown on homepage featured block |
| `created_at` | timestamptz | Created timestamp |

Apply migration: `supabase/migrations/008_products_management.sql`

Optional seed: `supabase/seed-products.sql`

## Storage

- Bucket: `product-images` (public read)
- Uploads from admin form → `{productId}/{timestamp}.ext`
- Requires signed-in owner/staff (RLS via `is_admin_user()`)

## Admin capabilities

| Action | Owner | Staff |
|--------|-------|-------|
| Add product | ✓ | ✓ |
| Edit product | ✓ | ✓ |
| Delete product | ✓ | ✓ |
| Upload image | ✓ | ✓ |
| Toggle availability | ✓ | ✓ |
| Toggle featured | ✓ | ✓ |
| Update stock | ✓ | ✓ |

## Public site

- `/products` — loads from Supabase (falls back to static `src/data/products.ts` if DB errors)
- Homepage featured section — `is_featured = true` products from DB

## Server actions

`src/app/admin/actions/products.ts`

- `createProductAction` / `updateProductAction`
- `deleteProductAction`
- `toggleProductAvailabilityAction` / `toggleProductFeaturedAction`
- `updateProductStockAction`

## Availability badges (UI)

Derived from `is_available` + `stock_quantity`:

- Out of stock: not available OR quantity 0
- Low stock: quantity 1–5
- In stock: otherwise
