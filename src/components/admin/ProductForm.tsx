"use client";

import { useActionState, useEffect } from "react";
import {
  createProductAction,
  updateProductAction,
  type ProductActionResult,
} from "@/app/admin/actions/products";
import { PRODUCT_CATEGORIES } from "@/lib/products/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Product } from "@/types";

const initial: ProductActionResult = {};

type ProductFormProps = {
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const isEdit = Boolean(product);
  const action = isEdit ? updateProductAction : createProductAction;
  const [state, formAction, pending] = useActionState(action, initial);

  useEffect(() => {
    if (state.success) onSuccess();
  }, [state.success, onSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-card-border bg-card p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit product" : "Add product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {state.error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
            {state.error}
          </p>
        )}

        <form action={formAction} className="space-y-4">
          {product && <input type="hidden" name="id" value={product.id} />}
          <Input
            label="Name"
            name="name"
            defaultValue={product?.name}
            required
          />
          <Textarea
            label="Description"
            name="description"
            rows={3}
            defaultValue={product?.description}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Price ($)"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.price}
              required
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Category
              </label>
              <select
                name="category"
                defaultValue={product?.category ?? PRODUCT_CATEGORIES[0]}
                className="w-full rounded-lg border border-card-border bg-card px-3 py-2 text-sm"
                required
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="Stock quantity"
            name="stock_quantity"
            type="number"
            min="0"
            defaultValue={product?.stock_quantity ?? 0}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Product image
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-primary-light file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary"
            />
            {product?.image_url && (
              <p className="mt-1 text-xs text-muted">Leave empty to keep current image.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_available"
                defaultChecked={product?.is_available ?? true}
                className="rounded border-card-border"
              />
              Available for sale
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={product?.is_featured ?? false}
                className="rounded border-card-border"
              />
              Featured on homepage
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : isEdit ? "Save changes" : "Create product"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
