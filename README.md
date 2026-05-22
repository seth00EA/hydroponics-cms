# Verdant Roots — Hydroponics Website

Phase 1–5: site UI and admin CMS preview. Phase 6: Supabase client + schema (data still static until Phase 7). See **[docs/SUPABASE.md](docs/SUPABASE.md)** for setup.

## Tech stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **TypeScript**

## Getting started

```bash
cd hydroponics-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Public pages

| Route | Description |
|-------|-------------|
| `/` | Landing page: hero, process, featured products, why choose us, gallery preview, contact CTA |
| `/products` | Product catalog with search, category filters, and availability |
| `/gallery` | Farm, growth process, and harvest image galleries with filters |
| `/contact` | Contact form, phone, email, Facebook/Messenger, address |

## Admin (CMS preview)

| Route | Description |
|-------|-------------|
| `/admin/login` | Demo login (redirects to dashboard) |
| `/admin/dashboard` | Overview stats and quick links |
| `/admin/homepage` | Homepage content preview |
| `/admin/products` | Product table |
| `/admin/gallery` | Gallery management preview |
| `/admin/contact` | Contact & FAQ preview |

Sign in with any email/password — authentication is not implemented yet.

## Project structure

```
src/
├── app/
│   ├── (public)/          # Public site + layout (navbar, footer)
│   └── admin/
│       ├── login/         # Standalone login layout
│       └── (panel)/       # Admin sidebar layout
├── components/
│   ├── ui/                # Button, Card, Input, etc.
│   ├── layout/            # Navbar, Footer, Admin layouts
│   └── admin/             # Login form, page shell
├── data/                  # Static sample data
├── types/
└── lib/
```

## Phase 2 — Landing page (`/`)

- **Hero** — Title, subtitle, dual CTAs, large image area, trust bullets
- **Process** — 4-step hydroponics workflow
- **Featured products** — Top 3 from static catalog
- **Why choose us** — 6 icon feature cards
- **Gallery preview** — 4 items with bento-style layout
- **Contact CTA** — Gradient banner with email link

Section components live in `src/components/landing/`.

## Phase 3 — Products page (`/products`)

- **Product cards** — Image, name, description, price, category, availability, featured badge
- **Search** — Client-side filter by name, description, or category
- **Category filters** — Pill buttons (All, Systems, Nutrients, etc.)
- **Responsive grid** — 1 / 2 / 3 columns with empty state and reset

## Phase 4 — Gallery & Contact

**Gallery (`/gallery`)**
- Categories: Farm, Growth Process, Harvest
- Filter pills + grouped sections when viewing all
- Responsive grid with title and description per image

**Contact (`/contact`)**
- Contact form UI (client preview with success state)
- Phone, email, hours, address, map placeholder
- Facebook and Messenger link buttons
- FAQ section

## Phase 5 — Admin dashboard UI

| Route | Features |
|-------|----------|
| `/admin/dashboard` | Summary stat cards, quick actions, section links, inventory snapshot |
| `/admin/products` | Searchable table with thumbnails, availability, bulk select UI, add/edit/delete buttons |
| `/admin/homepage` | Full homepage editor (hero, process, featured, why choose us, CTA blocks) |
| `/admin/gallery` | Image upload form (drag-drop preview) + published images table |
| `/admin/contact` | Business info, social URLs, form settings, FAQ editor |

Shared: sidebar navigation with icons, save bar with preview feedback, Phase notice (no Supabase yet).

## Phase 6 — Supabase setup

- `@supabase/supabase-js` + `@supabase/ssr`
- Clients: `src/lib/supabase/client.ts`, `server.ts`, `admin.ts`
- Schema: `supabase/schema.sql` (products, gallery, homepage_sections, features, contact_settings)
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`)
- Full guide: [docs/SUPABASE.md](docs/SUPABASE.md)

## Phase 7 — Auth & roles

- `profiles` table: `owner`, `staff`, `customer`
- `/admin/setup` — first owner account
- `/admin/login` — Supabase sign-in
- `/admin/staff` — owner adds staff (service role)
- `/admin/account` — owner password change
- Middleware + RLS protect admin routes

See **[docs/AUTH.md](docs/AUTH.md)** and `supabase/migrations/007_profiles_rbac.sql`.

## Phase 8 — Product management

- Supabase `products` table with stock, availability, featured flags
- Admin CRUD + image upload to Storage (`product-images` bucket)
- Public `/products` and homepage featured section read from DB

See **[docs/PRODUCTS.md](docs/PRODUCTS.md)** and `supabase/migrations/008_products_management.sql`.

## Phase 9+ (not included)

- Homepage, gallery, contact CMS wired to Supabase
- Customer storefront auth
- Ordering system
- Real CRUD for CMS sections
- Image uploads
- Contact form submission

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
