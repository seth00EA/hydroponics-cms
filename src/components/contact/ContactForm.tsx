"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactPageContent } from "@/data/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Card>
      <CardTitle>{contactPageContent.formTitle}</CardTitle>
      <p className="mt-1 text-sm text-muted">{contactPageContent.formNote}</p>

      {submitted ? (
        <div
          className="mt-6 rounded-xl border border-primary/20 bg-primary-light/40 px-4 py-5 text-sm text-primary"
          role="status"
        >
          {contactPageContent.formSuccessMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" name="name" placeholder="Your name" required />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <Input
            label="Phone (optional)"
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
          />
          <Input
            label="Subject"
            name="subject"
            placeholder="Product inquiry, installation, etc."
          />
          <Textarea
            label="Message"
            name="message"
            rows={5}
            placeholder="Tell us about your space, crops, and goals..."
            required
          />
          <Button type="submit">{contactPageContent.formSubmitLabel}</Button>
        </form>
      )}
    </Card>
  );
}
