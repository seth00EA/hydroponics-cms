# Authentication & roles — Phase 7

Role-based access control (RBAC) uses **Supabase Auth** and a `profiles` table.

## Roles

| Role | Admin access |
|------|----------------|
| **owner** | Full CMS: dashboard, homepage, products, gallery, contact, staff, account |
| **staff** | Limited: dashboard, homepage, products, gallery (no contact, staff, or account) |
| **customer** | No admin access (storefront only) |

## Database setup

1. Apply Phase 6 schema: `supabase/schema.sql`
2. Apply Phase 7 migration: `supabase/migrations/007_profiles_rbac.sql`

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Required for initial owner setup and creating staff accounts
SUPABASE_SERVICE_ROLE_KEY=...
```

Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` only — never expose it in the browser.

## Default owner setup

1. Configure Supabase env vars and run migrations.
2. Visit **`/admin/setup`** (redirects from login when no owner exists).
3. Submit owner name, email, and password.
4. Server creates the user via service role and sets `profiles.role = 'owner'`.
5. You are signed in and redirected to `/admin/dashboard`.

If an owner already exists, `/admin/setup` redirects to `/admin/login`.

## Sign in

- **`/admin/login`** — email + password via Supabase Auth.
- Customers and users without `owner`/`staff` role are rejected.

## Owner capabilities

- **Change password** — `/admin/account`
- **Add staff** — `/admin/staff` (creates auth user + `role = 'staff'`)
- **Remove staff** — delete staff auth users (owner cannot remove self)

## Route protection

- **`middleware.ts`** — refreshes session; blocks `/admin/*` by role.
- **Server guards** — `requireOwnerSession()`, `requireOwnerForContact()` on sensitive pages.
- **Sidebar** — nav links filtered by role.

## Demo mode (no Supabase)

If `NEXT_PUBLIC_SUPABASE_*` is unset, middleware allows admin routes and the panel layout works without auth (static CMS preview).

## Files

| Path | Purpose |
|------|---------|
| `src/lib/auth/session.ts` | Current user + profile |
| `src/lib/auth/permissions.ts` | Role checks |
| `src/lib/supabase/middleware.ts` | Session refresh + redirects |
| `src/app/admin/actions/auth.ts` | Sign in, setup, password, staff CRUD |

## Next phase (not included)

- Wire CMS forms to Supabase tables
- Email invites for staff
- Customer registration on storefront
- Ordering system
