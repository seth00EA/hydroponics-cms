"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/admin/actions/auth";
import { useAdminSession } from "@/components/admin/AdminProvider";
import { getAdminNavForRole } from "@/lib/auth/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { ROLE_LABELS } from "@/lib/auth/roles";

const navIcons: Record<string, React.ReactNode> = {
  Dashboard: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8M4 18h16" />
  ),
  Homepage: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
    Orders: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6M5 7h14M5 7a2 2 0 012-2h10a2 2 0 012 2M5 7v12a2 2 0 002 2h10a2 2 0 002-2V7"
        />
    ),
  Products: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  ),
  Gallery: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  Contact: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  Staff: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  ),
  Account: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  ),
};

export function AdminSidebar() {
  const pathname = usePathname();
  const session = useAdminSession();
  const role = session?.profile.role ?? "owner";
  const navLinks = getAdminNavForRole(role);

  return (
    <aside className="flex h-full min-h-screen w-full flex-col bg-admin-sidebar text-admin-sidebar-text lg:sticky lg:top-0 lg:w-64 lg:shrink-0">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/admin/dashboard" className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-accent/80">
            CMS Admin
          </span>
          <span className="mt-1 block text-lg font-semibold">{siteConfig.name}</span>
          {session && (
            <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {ROLE_LABELS[session.profile.role]}
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
              pathname === link.href
                ? "bg-white/15 text-white"
                : "text-admin-sidebar-text/80 hover:bg-white/10 hover:text-white",
            )}
          >
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              {navIcons[link.label]}
            </svg>
            <span>
              <span className="block text-sm font-medium">{link.label}</span>
              {link.description && (
                <span className="mt-0.5 block text-xs text-admin-sidebar-text/60">
                  {link.description}
                </span>
              )}
            </span>
          </Link>
        ))}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-accent hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </Link>

        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-0 py-1 text-left text-sm text-admin-sidebar-text/80 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
