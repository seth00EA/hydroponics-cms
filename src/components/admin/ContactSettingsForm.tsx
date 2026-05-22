"use client";

import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactFaqs, contactInfo } from "@/data/contact";

export function ContactSettingsForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <Card>
        <CardTitle className="mb-4">Business information</CardTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email" name="email" type="email" defaultValue={contactInfo.email} />
          <Input label="Phone" name="phone" type="tel" defaultValue={contactInfo.phone} />
          <Input
            label="Street address"
            name="address"
            defaultValue={contactInfo.address}
            className="sm:col-span-2"
          />
          <Input
            label="Business hours"
            name="hours"
            defaultValue={contactInfo.hours}
            className="sm:col-span-2"
          />
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Social & messaging</CardTitle>
        <div className="space-y-4">
          {contactInfo.socialLinks.map((link) => (
            <Input
              key={link.platform}
              label={link.label}
              name={link.platform}
              type="url"
              defaultValue={link.url}
              placeholder="https://"
            />
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Contact form settings</CardTitle>
        <div className="space-y-4">
          <Input
            label="Form heading"
            name="formTitle"
            defaultValue="Send a message"
          />
          <Textarea
            label="Success message (after submit)"
            name="successMessage"
            rows={2}
            defaultValue="Thanks for reaching out! We will reply within one business day."
          />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" defaultChecked className="rounded border-card-border" />
            Show phone field on public form
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" defaultChecked className="rounded border-card-border" />
            Enable FAQ section on contact page
          </label>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">FAQs</CardTitle>
        <div className="space-y-4">
          {contactFaqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-lg border border-card-border p-4"
            >
              <p className="mb-3 text-xs font-semibold text-muted">FAQ {i + 1}</p>
              <Input label="Question" defaultValue={faq.question} name={`faq-q-${i}`} />
              <Textarea
                label="Answer"
                defaultValue={faq.answer}
                rows={2}
                name={`faq-a-${i}`}
                className="mt-3"
              />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto">
            + Add FAQ
          </Button>
        </div>
      </Card>

      <AdminSaveBar saveLabel="Save contact settings" />
    </form>
  );
}
