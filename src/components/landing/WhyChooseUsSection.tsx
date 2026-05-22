import { FeatureIcon } from "@/components/landing/FeatureIcon";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { homepageContent } from "@/data/homepage";

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="bg-background py-14 sm:py-20">
      <Container>
        <SectionHeading
          title={homepageContent.whyChooseTitle}
          subtitle={homepageContent.whyChooseSubtitle}
          align="center"
          className="mx-auto"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageContent.whyChooseFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col transition-shadow hover:shadow-md"
            >
              <FeatureIcon icon={feature.icon} />
              <h3 className="mt-4 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
