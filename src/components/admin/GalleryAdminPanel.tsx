"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
  updateGalleryItemAction,
  type GalleryActionState,
} from "@/app/admin/actions/gallery";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { galleryCategoryLabels } from "@/data/gallery";
import { FileUploadField } from "@/components/admin/FileUploadField";
import type { GalleryCategory, GalleryItem } from "@/types";

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "farm", label: galleryCategoryLabels.farm },
  { value: "growth", label: galleryCategoryLabels.growth },
  { value: "harvest", label: galleryCategoryLabels.harvest },
];

const initialState: GalleryActionState = {};

export function GalleryAdminPanel({ items }: { items: GalleryItem[] }) {
  const [state, formAction, pending] = useActionState(createGalleryItemAction, initialState);
  const [category, setCategory] = useState<GalleryCategory>("farm");

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle className="mb-1">Upload new image</CardTitle>
        <p className="mb-6 text-sm text-muted">
          Add farm, growth process, or harvest photos to the public gallery.
        </p>

        <form className="space-y-4" action={formAction}>
          {state.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.error}
            </p>
          )}

          {state.success && (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              {state.success}
            </p>
          )}

                  <FileUploadField
                      label="Gallery image"
                      name="image_file"
                      hint="Upload PNG, JPG, or WebP up to 5MB"
                  />

                  <Input
                      label="Image URL fallback"
                      name="image_url"
                      placeholder="/images/gallery-farm-1.svg or https://..."
                  />
          <Input label="Title" name="title" placeholder="e.g. Morning harvest" required />
          <Textarea
            label="Description"
            name="description"
            rows={3}
            placeholder="Short caption shown on the gallery page"
          />
          <Input label="Sort order" name="sort_order" type="number" defaultValue="0" />

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <input type="hidden" name="category" value={category} />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    category === cat.value
                      ? "bg-primary text-white"
                      : "bg-muted-bg text-muted hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Adding..." : "Add to gallery"}
            </Button>
            <Button type="reset" variant="outline">
              Clear form
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Published images ({items.length})</CardTitle>
          <p className="text-sm text-muted">Edit sort order to reorder images.</p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <form
              key={item.id}
              action={updateGalleryItemAction.bind(null, item.id)}
              className="rounded-xl border border-card-border p-4"
            >
              <div className="grid gap-4 lg:grid-cols-[120px_1fr_auto]">
                <div className="relative h-24 w-full overflow-hidden rounded-lg bg-muted-bg lg:w-28">
                  <Image src={item.image} alt="" fill className="object-cover p-1" />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Input label="Title" name="title" defaultValue={item.title} />
                          <div className="md:col-span-2">
                              <FileUploadField
                                  label="Replace image"
                                  name="image_file"
                                  hint="Leave empty to keep current image"
                              />
                          </div>

                          <Input label="Image URL" name="image_url" defaultValue={item.image} />
                  <Textarea
                    label="Description"
                    name="description"
                    defaultValue={item.description}
                    rows={2}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={item.category}
                        className="w-full rounded-lg border border-input-border bg-white px-3 py-2 text-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Sort order"
                      name="sort_order"
                      type="number"
                      defaultValue={String(index)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Badge variant="outline">{galleryCategoryLabels[item.category]}</Badge>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                  <button
                    type="submit"
                    formAction={deleteGalleryItemAction.bind(null, item.id)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          ))}
        </div>
      </Card>
    </div>
  );
}
