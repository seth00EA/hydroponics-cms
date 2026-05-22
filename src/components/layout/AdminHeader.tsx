"use client";

import { useState } from "react";
import { useAdminSession } from "@/components/admin/AdminProvider";
import { signOutAction } from "@/app/admin/actions/auth";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

type AdminHeaderProps = {
  title: string;
  description?: string;
};

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useAdminSession();

  return (
    <>
      <header className="border-b border-card-border bg-card px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-foreground lg:hidden"
              aria-label="Toggle admin menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
              {description && (
                <p className="text-sm text-muted">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {session && (
              <span className="hidden text-right text-sm sm:block">
                <span className="block font-medium text-foreground">
                  {session.profile.full_name || session.email}
                </span>
                <span className="text-xs text-muted">{siteConfig.name} CMS</span>
              </span>
            )}
            <form action={signOutAction}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 h-full w-64 overflow-y-auto">
            <AdminSidebar />
          </div>
        </div>
      )}
    </>
  );
}
