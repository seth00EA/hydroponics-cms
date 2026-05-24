import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contactInfo } from "@/data/contact";
import type { HomepageContent } from "@/types";

export function ContactCtaSection({ content }: { content: HomepageContent }) {
  return (
    <section id="contact-cta" className="py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-hover px-6 py-12 text-white shadow-xl sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/30 blur-2xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {content.contactCtaTitle}
            </h2>
            <p className="mt-4 text-lg text-primary-light/90">
              {content.contactCtaSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="secondary" size="lg">
                {content.contactCtaPrimary}
              </Button>
              <Button
                href="/products"
                variant="outline"
                size="lg"
                className="border-white/35 bg-transparent text-white hover:bg-white/10"
              >
                {content.contactCtaSecondary}
              </Button>
            </div>
            <p className="mt-8 text-sm text-primary-light/75">
              Or email us at{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-medium text-white underline-offset-2 hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

