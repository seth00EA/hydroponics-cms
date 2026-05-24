"use client";

import { useActionState } from "react";
import { saveContactSettingsAction, type ContactActionState } from "@/app/admin/actions/contact";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ContactSettings } from "@/lib/contact";

const initialState: ContactActionState = {};

export function ContactSettingsForm({ settings }: { settings: ContactSettings }) {
  const [state, formAction, pending] = useActionState(saveContactSettingsAction, initialState);

  const facebook = settings.info.socialLinks.find((link) => link.platform === "facebook")?.url ?? "";
  const messenger = settings.info.socialLinks.find((link) => link.platform === "messenger")?.url ?? "";

  const faqs = [...settings.faqs];
  while (faqs.length < 5) {
    faqs.push({ question: "", answer: "" });
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      {state.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{state.success}</p>
      )}

      <Card>
        <CardTitle className="mb-4">Business information</CardTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email" name="email" type="email" defaultValue={settings.info.email} />
          <Input label="Phone" name="phone" type="tel" defaultValue={settings.info.phone} />
          <Input
            label="Street address"
            name="address"
            defaultValue={settings.info.address}
            className="sm:col-span-2"
          />
          <Input
            label="Business hours"
            name="hours"
            defaultValue={settings.info.hours}
            className="sm:col-span-2"
          />
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Social & messaging</CardTitle>
        <div className="space-y-4">
          <Input
            label="Facebook Page"
            name="facebook"
            type="url"
            defaultValue={facebook}
            placeholder="https://facebook.com/your-page"
          />
          <Input
            label="Messenger Link"
            name="messenger"
            type="url"
            defaultValue={messenger}
            placeholder="https://m.me/your-page"
          />
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">FAQs</CardTitle>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
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
        </div>
      </Card>

      <div className="sticky bottom-4 rounded-2xl border bg-white p-4 shadow-lg">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save contact settings"}
        </button>
      </div>
    </form>
  );
}
