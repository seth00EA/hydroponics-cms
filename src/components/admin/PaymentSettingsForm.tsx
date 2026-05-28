"use client";

import { useActionState } from "react";
import {
    savePaymentSettingsAction,
    type PaymentSettingsActionState,
} from "@/app/admin/actions/payment-settings";
import { FileUploadField } from "@/components/admin/FileUploadField";
import type { PaymentSettings } from "@/types";

const initialState: PaymentSettingsActionState = {};

export function PaymentSettingsForm({
  settings,
}: {
  settings: PaymentSettings;
}) {
  const [state, formAction, pending] = useActionState(
    savePaymentSettingsAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-8 rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Payment Methods</h2>

        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="cashOnDeliveryEnabled"
              defaultChecked={settings.cashOnDeliveryEnabled}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="gcashEnabled"
              defaultChecked={settings.gcashEnabled}
            />
            GCash
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="bankTransferEnabled"
              defaultChecked={settings.bankTransferEnabled}
            />
            Bank Transfer
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border p-5">
        <h3 className="text-base font-semibold">GCash Details</h3>

        <div>
          <label className="text-sm font-medium">GCash Account Name</label>
          <input
            name="gcashName"
            defaultValue={settings.gcashName}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium">GCash Number</label>
          <input
            name="gcashNumber"
            defaultValue={settings.gcashNumber}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <FileUploadField
          label="Upload GCash QR"
          name="gcash_qr_file"
          hint="PNG, JPG, or WebP under 5MB"
        />

        <div>
          <label className="text-sm font-medium">GCash QR URL fallback</label>
          <input
            name="gcashQrUrl"
            defaultValue={settings.gcashQrUrl}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        {settings.gcashQrUrl && (
          <div className="overflow-hidden rounded-xl border">
            <img
              src={settings.gcashQrUrl}
              alt="GCash QR"
              className="max-h-80 w-full object-contain bg-white"
            />
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-xl border p-5">
        <h3 className="text-base font-semibold">Bank Transfer Details</h3>

        <div>
          <label className="text-sm font-medium">Bank Name</label>
          <input
            name="bankName"
            defaultValue={settings.bankName}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Account Name</label>
          <input
            name="bankAccountName"
            defaultValue={settings.bankAccountName}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Account Number</label>
          <input
            name="bankAccountNumber"
            defaultValue={settings.bankAccountNumber}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Instructions</label>
          <textarea
            name="bankInstructions"
            defaultValue={settings.bankInstructions}
            rows={4}
            className="mt-1 w-full rounded-lg border p-3"
          />
        </div>
      </div>

      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.success}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save Payment Settings"}
      </button>
    </form>
  );
}