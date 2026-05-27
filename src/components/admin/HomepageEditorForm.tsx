"use client";
import { useActionState } from "react";
import { saveHomepageAction, type HomepageActionState } from "@/app/admin/actions/homepage";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUploadField } from "@/components/admin/FileUploadField";
import type { HomepageContent } from "@/types";

const initialState: HomepageActionState = {};

export function HomepageEditorForm({ content }: { content: HomepageContent }) {
  const [state, formAction, pending] = useActionState(saveHomepageAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      )}

      {state.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{state.success}</p>
      )}

      <Card>
        <CardTitle className="mb-4">Hero section</CardTitle>
        <div className="space-y-4">
          <Input label="Headline" name="heroTitle" defaultValue={content.heroTitle} />
          <Textarea label="Subtitle" name="heroSubtitle" defaultValue={content.heroSubtitle} rows={3} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Primary CTA" name="heroCta" defaultValue={content.heroCta} />
            <Input label="Secondary CTA" name="heroSecondaryCta" defaultValue={content.heroSecondaryCta} />
                  </div>
                  {content.heroImage && (
                      <div>
                          <p className="mb-2 text-sm font-medium text-foreground">
                              Current hero image
                          </p>

                          <div className="h-56 overflow-hidden rounded-2xl border border-card-border bg-muted-bg">
                              <img
                                  src={content.heroImage}
                                  alt={content.heroImageAlt || "Homepage hero preview"}
                                  className="h-full w-full object-cover"
                              />
                          </div>
                      </div>
                  )}
                  <FileUploadField
                      label="Hero image upload"
                      name="hero_image_file"
                      hint="Upload PNG, JPG, or WebP up to 5MB"
                  />

                  <Input
                      label="Hero image URL fallback"
                      name="heroImage"
                      defaultValue={content.heroImage}
                  />
                  <FileUploadField
                      label="Logo image upload"
                      name="logo_image_file"
                      hint="Upload logo image PNG, JPG, or WebP"
                  />

                  <Input
                      label="Logo image URL fallback"
                      name="logoImage"
                      defaultValue={content.logoImage}
                  />

                  <FileUploadField
                      label="Homepage background image upload"
                      name="background_image_file"
                      hint="Upload homepage background image"
                  />

                  <Input
                      label="Background image URL fallback"
                      name="backgroundImage"
                      defaultValue={content.backgroundImage}
                  />

                  <Input
                      label="Background overlay opacity"
                      name="overlayOpacity"
                      type="number"
                      step="0.05"
                      min="0"
                      max="1"
                      defaultValue={content.overlayOpacity}
                  />
          <Input label="Image alt text" name="heroImageAlt" defaultValue={content.heroImageAlt} />
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Process section</CardTitle>
        <div className="space-y-4">
          <Input label="Section title" name="processTitle" defaultValue={content.processTitle} />
          <Textarea label="Section subtitle" name="processSubtitle" defaultValue={content.processSubtitle} rows={2} />

          {content.processSteps.map((step) => (
            <div key={step.step} className="rounded-lg border border-card-border p-4">
              <p className="mb-3 text-xs font-semibold text-muted">Step {step.step}</p>
              <div className="space-y-3">
                <Input label="Title" defaultValue={step.title} name={`step-${step.step}-title`} />
                <Textarea label="Description" defaultValue={step.description} rows={2} name={`step-${step.step}-desc`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Featured products block</CardTitle>
        <div className="space-y-4">
          <Input label="Section title" name="featuredTitle" defaultValue={content.featuredTitle} />
          <Textarea label="Section subtitle" name="featuredSubtitle" defaultValue={content.featuredSubtitle} rows={2} />
          <p className="text-sm text-muted">Featured items are managed on the Products page.</p>
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Why choose us</CardTitle>
        <div className="space-y-4">
          <Input label="Section title" name="whyChooseTitle" defaultValue={content.whyChooseTitle} />
          <Textarea label="Section subtitle" name="whyChooseSubtitle" defaultValue={content.whyChooseSubtitle} rows={2} />

          {content.whyChooseFeatures.map((feature, i) => (
            <div key={`${feature.title}-${i}`} className="rounded-lg border border-card-border p-4">
              <p className="mb-3 text-xs font-semibold text-muted">Feature {i + 1}</p>
              <div className="space-y-3">
                <Input label="Title" defaultValue={feature.title} name={`why-${i}-title`} />
                <Textarea label="Description" defaultValue={feature.description} rows={2} name={`why-${i}-desc`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle className="mb-4">Gallery preview and contact CTA</CardTitle>
        <div className="space-y-4">
          <Input label="Gallery block title" name="galleryPreviewTitle" defaultValue={content.galleryPreviewTitle} />
          <Textarea label="Gallery block subtitle" name="galleryPreviewSubtitle" defaultValue={content.galleryPreviewSubtitle} rows={2} />
          <Input label="Contact CTA title" name="contactCtaTitle" defaultValue={content.contactCtaTitle} />
          <Textarea label="Contact CTA subtitle" name="contactCtaSubtitle" defaultValue={content.contactCtaSubtitle} rows={2} />
          <Input label="Contact CTA primary button" name="contactCtaPrimary" defaultValue={content.contactCtaPrimary} />
          <Input label="Contact CTA secondary button" name="contactCtaSecondary" defaultValue={content.contactCtaSecondary} />
        </div>
      </Card>

      <div className="sticky bottom-4 rounded-2xl border bg-white p-4 shadow-lg">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Publishing..." : "Publish homepage"}
        </button>
      </div>
    </form>
  );
}
