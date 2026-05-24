import { SocialLinks } from "@/components/contact/SocialLinks";
import { Card, CardTitle } from "@/components/ui/Card";
import { contactPageContent } from "@/data/contact";
import type { ContactInfo } from "@/types";

export function ContactDetails({ info }: { info: ContactInfo }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>{contactPageContent.detailsTitle}</CardTitle>
        <ul className="mt-5 space-y-4">
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Phone
            </p>
            <a
              href={`tel:${info.phone.replace(/\D/g, "")}`}
              className="mt-1 block text-lg font-medium text-foreground hover:text-primary"
            >
              {info.phone}
            </a>
          </li>
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Email
            </p>
            <a
              href={`mailto:${info.email}`}
              className="mt-1 block text-lg font-medium text-foreground hover:text-primary"
            >
              {info.email}
            </a>
          </li>
          <li>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Hours
            </p>
            <p className="mt-1 text-sm text-foreground">{info.hours}</p>
          </li>
        </ul>
      </Card>

      <Card>
        <CardTitle>{contactPageContent.addressTitle}</CardTitle>
        <address className="mt-4 not-italic text-sm leading-relaxed text-foreground">
          {info.address}
        </address>
        <div className="mt-4 flex h-40 items-center justify-center rounded-xl border border-dashed border-card-border bg-muted-bg text-sm text-muted">
          Map preview - coming in a future phase
        </div>
      </Card>

      <Card>
        <CardTitle>{contactPageContent.socialTitle}</CardTitle>
        <p className="mt-2 text-sm text-muted">
          Follow our farm updates or message us directly for quick questions.
        </p>
        <SocialLinks links={info.socialLinks} className="mt-4" />
      </Card>
    </div>
  );
}
