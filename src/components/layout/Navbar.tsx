"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import Image from "next/image";

export function Navbar({ logoImage }: { logoImage?: string }) {
    const pathname = usePathname();

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-card-border bg-card/90 backdrop-blur-md">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-primary text-sm font-bold text-white shadow-md">
                            {logoImage ? (
                                <Image
                                    src={logoImage}
                                    alt={`${siteConfig.name} logo`}
                                    fill
                                    className="object-contain p-1"
                                    unoptimized={logoImage.includes("supabase")}
                                />
                            ) : (
                                "NH"
                            )}
                        </span>

                        <div>
                            <p className="font-semibold text-foreground">
                                {siteConfig.name}
                            </p>
                            <p className="text-xs text-muted">
                                Hydroponic Farm
                            </p>
                        </div>
                    </Link>

                    <ul className="hidden items-center gap-1 md:flex">
                        {publicNavLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-primary-light text-primary"
                                            : "text-muted hover:bg-muted-bg hover:text-foreground",
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
                <div className="grid grid-cols-4">
                    {publicNavLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-2 py-3 text-center text-xs font-medium",
                                pathname === link.href
                                    ? "bg-primary-light text-primary"
                                    : "text-muted",
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}