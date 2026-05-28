import { createAdminClient } from "@/lib/supabase/admin";
import type { PaymentSettings } from "@/types";

const defaultPaymentSettings: PaymentSettings = {
  cashOnDeliveryEnabled: true,
  gcashEnabled: true,
  bankTransferEnabled: false,
  gcashName: "",
  gcashNumber: "",
  gcashQrUrl: "",
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankInstructions: "",
};

export async function getPaymentSettings(): Promise<PaymentSettings> {
  try {
    const admin = createAdminClient();

    if (!admin) {
      return defaultPaymentSettings;
    }

    const { data, error } = await admin
      .from("payment_settings")
      .select("content")
      .eq("id", "main")
      .single();

    const row = data as { content?: Partial<PaymentSettings> } | null;

    if (error || !row?.content) {
      return defaultPaymentSettings;
    }

    return {
      ...defaultPaymentSettings,
      ...row.content,
    };
  } catch (error) {
    console.error("Payment settings load failed:", error);

    return defaultPaymentSettings;
  }
}