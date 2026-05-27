import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HomepageContent } from "@/types";
import { siteConfig } from "@/data/site";

export function HeroSection({ content }: { content: HomepageContent }) {
    const hasBackground = Boolean(content.backgroundImage);
    const hasLogo = Boolean(content.logoImage);
    const overlayOpacity =
        typeof content.overlayOpacity === "number" ? content.overlayOpacity : 0.45;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-[#081c15] text-white">
            {hasBackground && (
                <Image
                    src={content.backgroundImage}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    unoptimized={content.backgroundImage.includes("supabase")}
                />
            )}

            <div
                className="absolute inset-0 bg-black"
                style={{ opacity: hasBackground ? overlayOpacity : 0.15 }}
                aria-hidden
            />

            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary blur-3xl" />
            </div>

            <Container className="relative py-14 sm:py-20 lg:py-24">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <div className="max-w-xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                        {hasLogo && (
                            <div className="mb-5 flex items-center gap-3">
                                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white/90 p-2">
                                    <Image
                                        src={content.logoImage}
                                        alt={`${siteConfig.name} logo`}
                                        fill
                                        className="object-contain p-1"
                                        unoptimized={content.logoImage.includes("supabase")}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                                        {siteConfig.name}
                                    </p>
                                    <p className="text-xs text-white/75">Hydroponic Farm</p>
                                </div>
                            </div>
                        )}

                        <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-accent backdrop-blur">
                            {siteConfig.tagline}
                        </p>

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                            {content.heroTitle}
                        </h1>

                        <p className="mt-5 text-lg leading-relaxed text-primary-light/95 sm:text-xl">
                            {content.heroSubtitle}
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Button href="/products" variant="secondary" size="lg">
                                {content.heroCta}
                            </Button>
                            <Button
                                href="/contact"
                                variant="outline"
                                size="lg"
                                className="border-white/35 bg-white/5 text-white hover:bg-white/15"
                            >
                                {content.heroSecondaryCta}
                            </Button>
                        </div>

                        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-light/80">
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                90% less water
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                Year-round growing
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                Fresh local harvest
                            </li>
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-md">
                            <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
                                <Image
                                    src={content.heroImage}
                                    alt={content.heroImageAlt}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    unoptimized={content.heroImage.includes("supabase")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}