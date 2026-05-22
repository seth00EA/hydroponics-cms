"use client";

import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { homepageContent } from "@/data/homepage";

export function HomepageEditorForm() {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <Card>
        <CardTitle className="mb-4">Hero section</CardTitle>
        <div className="space-y-4">
          <Input label="Headline" name="heroTitle" defaultValue={homepageContent.heroTitle} />
          <Textarea
            label="Subtitle"
            name="heroSubtitle"
            defaultValue={homepageContent.heroSubtitle}
            rows={3}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Primary CTA" name="heroCta" defaultValue={homepageContent.heroCta} />
            <Input
              label="Secondary CTA"
              name="heroSecondaryCta"
              defaultValue={homepageContent.heroSecondaryCta}
            />
          </div>
          <FileUploadField label="Hero image" hint="Replace greenhouse hero (preview only)" />
          <Input
            label="Image alt text"
            name="heroImageAlt"
            defaultValue={homepageContent.heroImageAlt}
          />
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Process section</CardTitle>
        <div className="space-y-4">
          <Input label="Section title" name="processTitle" defaultValue={homepageContent.processTitle} />
          <Textarea
            label="Section subtitle"
            name="processSubtitle"
            defaultValue={homepageContent.processSubtitle}
            rows={2}
          />
          {homepageContent.processSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-lg border border-card-border p-4"
            >
              <p className="mb-3 text-xs font-semibold text-muted">Step {step.step}</p>
              <div className="space-y-3">
                <Input label="Title" defaultValue={step.title} name={`step-${step.step}-title`} />
                <Textarea
                  label="Description"
                  defaultValue={step.description}
                  rows={2}
                  name={`step-${step.step}-desc`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Featured products block</CardTitle>
        <div className="space-y-4">
          <Input
            label="Section title"
            name="featuredTitle"
            defaultValue={homepageContent.featuredTitle}
          />
          <Textarea
            label="Section subtitle"
            name="featuredSubtitle"
            defaultValue={homepageContent.featuredSubtitle}
            rows={2}
          />
          <p className="text-sm text-muted">
            Featured items are managed on the Products page (mark products as featured).
          </p>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Why choose us</CardTitle>
        <div className="space-y-4">
          <Input
            label="Section title"
            name="whyChooseTitle"
            defaultValue={homepageContent.whyChooseTitle}
          />
          <Textarea
            label="Section subtitle"
            name="whyChooseSubtitle"
            defaultValue={homepageContent.whyChooseSubtitle}
            rows={2}
          />
          {homepageContent.whyChooseFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-lg border border-card-border p-4"
            >
              <p className="mb-3 text-xs font-semibold text-muted">Feature {i + 1}</p>
              <div className="space-y-3">
                <Input label="Title" defaultValue={feature.title} name={`why-${i}-title`} />
                <Textarea
                  label="Description"
                  defaultValue={feature.description}
                  rows={2}
                  name={`why-${i}-desc`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Gallery preview & contact CTA</CardTitle>
        <div className="space-y-4">
          <Input
            label="Gallery block title"
            name="galleryPreviewTitle"
            defaultValue={homepageContent.galleryPreviewTitle}
          />
          <Textarea
            label="Gallery block subtitle"
            name="galleryPreviewSubtitle"
            defaultValue={homepageContent.galleryPreviewSubtitle}
            rows={2}
          />
          <Input
            label="Contact CTA title"
            name="contactCtaTitle"
            defaultValue={homepageContent.contactCtaTitle}
          />
          <Textarea
            label="Contact CTA subtitle"
            name="contactCtaSubtitle"
            defaultValue={homepageContent.contactCtaSubtitle}
            rows={2}
          />
        </div>
      </Card>

      <AdminSaveBar saveLabel="Publish homepage" />
    </form>
  );
}
