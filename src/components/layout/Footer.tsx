import Link from "next/link";
import { publicNavLinks, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Explore</p>
            <ul className="mt-3 space-y-2">
              {publicNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Admin</p>
            <p className="mt-3 text-sm text-muted">
              Content managers can sign in to update the site.
            </p>
            <Link
              href="/admin/login"
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Admin login →
            </Link>
          </div>
        </div>
        <p className="mt-10 border-t border-card-border pt-6 text-center text-sm text-muted">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
