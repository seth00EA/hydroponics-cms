import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { getPaymentSettings } from "@/lib/payment-settings";
import { PaymentSettingsForm } from "@/components/admin/PaymentSettingsForm";

export const metadata = {
  title: "Payment Settings",
};

export default async function PaymentSettingsPage() {
  const settings = await getPaymentSettings();

  return (
    <AdminPageShell
      title="Payment Settings"
      description="Manage GCash, bank transfer, and checkout payment methods."
    >
      <PaymentSettingsForm settings={settings} />
    </AdminPageShell>
  );
}