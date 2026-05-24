import { SectionHeading } from "@/components/landing/SectionHeading";
import { Container } from "@/components/ui/Container";
import type { HomepageContent } from "@/types";

export function ProcessSection({ content }: { content: HomepageContent }) {
  return (
    <section id="process" className="bg-background py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={content.processTitle}
          subtitle={content.processSubtitle}
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.processSteps.map((step) => (
            <li
              key={step.step}
              className="group relative rounded-2xl border border-card-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
              {step.step < content.processSteps.length && (
                <span
                  className="absolute -right-3 top-12 hidden text-2xl text-accent lg:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

