# Production Deployment Checklist

## Vercel Environment Variables
Set these in Vercel Production + Preview:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://your-production-domain.vercel.app

## Supabase Production Checks
- Auth enabled
- Email auth configured
- Production redirect URLs added
- RLS enabled
- Tables created:
  - profiles
  - products
  - orders
  - order_items
  - homepage_content
  - gallery_items
  - contact_settings

## Admin Security
Owner only:
- /admin/contact
- /admin/staff
- /admin/users
- /admin/account

Staff access:
- /admin/dashboard
- /admin/products
- /admin/gallery
- /admin/homepage
- /admin/orders

Customer protected:
- /account
- /courses
- /services/premium
- /consultation-booking

## Functional QA
Test:
- homepage CMS update
- gallery add/edit/delete
- contact settings update
- product ordering
- checkout
- order success
- admin login
- staff login
- customer login
- admin order status updates
- cart behavior
- mobile responsiveness
- 404 page
- loading state
- error page

## Deployment
1. Push main branch
2. Confirm Vercel production deployment
3. Verify environment variables
4. Test live site
5. Send client testing URL
