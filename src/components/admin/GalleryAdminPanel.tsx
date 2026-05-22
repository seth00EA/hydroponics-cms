"use client";

import Image from "next/image";
import { useState } from "react";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { galleryCategoryLabels, galleryItems } from "@/data/gallery";
import type { GalleryCategory } from "@/types";

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "farm", label: galleryCategoryLabels.farm },
  { value: "growth", label: galleryCategoryLabels.growth },
  { value: "harvest", label: galleryCategoryLabels.harvest },
];

export function GalleryAdminPanel() {
  const [category, setCategory] = useState<GalleryCategory>("farm");

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle className="mb-1">Upload new image</CardTitle>
        <p className="mb-6 text-sm text-muted">
          Add farm, growth process, or harvest photos to the public gallery.
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <FileUploadField />
          <Input label="Title" name="title" placeholder="e.g. Morning harvest" />
          <Textarea
            label="Description"
            name="description"
            rows={3}
            placeholder="Short caption shown on the gallery page"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
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
            <Button type="button">Add to gallery</Button>
            <Button type="reset" variant="outline">
              Clear form
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Published images ({galleryItems.length})</CardTitle>
          <Button variant="outline" size="sm" disabled>
            Reorder
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-card-border bg-muted-bg">
              <tr>
                <th className="px-3 py-3 font-semibold">Preview</th>
                <th className="px-3 py-3 font-semibold">Title</th>
                <th className="px-3 py-3 font-semibold">Category</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleryItems.map((item) => (
                <tr key={item.id} className="border-b border-card-border last:border-0">
                  <td className="px-3 py-3">
                    <div className="relative h-14 w-20 overflow-hidden rounded-lg bg-muted-bg">
                      <Image src={item.image} alt="" fill className="object-cover p-1" />
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <p className="font-medium">{item.title}</p>
                    <p className="line-clamp-1 text-xs text-muted">{item.description}</p>
                  </td>
                  <td className="px-3 py-3">
                    <Badge variant="outline">{galleryCategoryLabels[item.category]}</Badge>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <AdminSaveBar saveLabel="Save gallery" />
    </div>
  );
}
