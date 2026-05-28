"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthSession } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/permissions";
import type { PaymentSettings } from "@/types";

export type PaymentSettingsActionState = {
  error?: string;
  success?: string;
};

const IMAGE_BUCKET = "cms-images";

function getFileExtension(file: File) {
  const name = file.name || "image";
  return name.split(".").pop() || "jpg";
}

async function uploadPaymentImage(
    admin: ReturnType<typeof createAdminClient>,
    file: FormDataEntryValue | null,
) {
    if (!admin) return null;
  if (!file || typeof file === "string") return null;

  const uploadedFile = file as File;

  if (!uploadedFile.name || uploadedFile.size === 0) return null;

  if (!uploadedFile.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  if (uploadedFile.size > 5 * 1024 * 1024) {
    throw new Error("Image must be 5MB or smaller.");
  }

  const extension = getFileExtension(uploadedFile);
  const filePath = `payments/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await admin.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, uploadedFile, {
      contentType: uploadedFile.type,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = admin.storage.from(IMAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl as string;
}

export async function savePaymentSettingsAction(
  _prev: PaymentSettingsActionState,
  formData: FormData,
): Promise<PaymentSettingsActionState> {
  const session = await getAuthSession();

  if (!session || !canAccessAdmin(session.profile.role)) {
    return { error: "You do not have permission to edit payment settings." };
  }

    const admin = createAdminClient();
  if (!admin) return { error: "Service role key required." };

  let gcashQrUrl = String(formData.get("gcashQrUrl") ?? "").trim();

  try {
    const uploadedQr = await uploadPaymentImage(admin, formData.get("gcash_qr_file"));
    if (uploadedQr) gcashQrUrl = uploadedQr;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "GCash QR upload failed.",
    };
  }

  const content: PaymentSettings = {
    cashOnDeliveryEnabled: formData.get("cashOnDeliveryEnabled") === "on",
    gcashEnabled: formData.get("gcashEnabled") === "on",
    bankTransferEnabled: formData.get("bankTransferEnabled") === "on",
    gcashName: String(formData.get("gcashName") ?? "").trim(),
    gcashNumber: String(formData.get("gcashNumber") ?? "").trim(),
    gcashQrUrl,
    bankName: String(formData.get("bankName") ?? "").trim(),
    bankAccountName: String(formData.get("bankAccountName") ?? "").trim(),
    bankAccountNumber: String(formData.get("bankAccountNumber") ?? "").trim(),
    bankInstructions: String(formData.get("bankInstructions") ?? "").trim(),
  };

  const { error } = await admin
  .from("payment_settings" as never)
  .upsert({
    id: "main",
    content,
    updated_at: new Date().toISOString(),
  } as never);

  if (error) return { error: error.message };

  revalidatePath("/checkout");
  revalidatePath("/admin/payment-settings");

  return { success: "Payment settings updated." };
}