import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { contactFaqs, contactPageContent } from "@/data/contact";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <PageHeader
          title={contactPageContent.title}
          description={contactPageContent.description}
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactDetails />
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold text-foreground">Common questions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactFaqs.map((faq) => (
              <Card key={faq.question} padding="sm">
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
