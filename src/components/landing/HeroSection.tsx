import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";
import { siteConfig } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-hover to-[#081c15] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      >
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-accent backdrop-blur">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {homepageContent.heroTitle}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-primary-light/95 sm:text-xl">
              {homepageContent.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/products" variant="secondary" size="lg">
                {homepageContent.heroCta}
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white/35 bg-white/5 text-white hover:bg-white/15"
              >
                {homepageContent.heroSecondaryCta}
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
                Expert support
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
                <Image
                  src={homepageContent.heroImage}
                  alt={homepageContent.heroImageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-card-border bg-card px-4 py-3 shadow-lg sm:block">
              <p className="text-xs font-medium text-muted">Demo greenhouse</p>
              <p className="text-sm font-semibold text-primary">Portland, OR</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
