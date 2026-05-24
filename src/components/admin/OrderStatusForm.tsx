"use client";

import { useActionState } from "react";
import { updateOrderStatusAction, type OrderStatusActionState } from "@/app/admin/orders/actions";

const initialState: OrderStatusActionState = {};

export function OrderStatusForm({
  orderId,
  currentStatus,
  statuses,
}: {
  orderId: string;
  currentStatus: string;
  statuses: string[];
}) {
  const [state, formAction, pending] = useActionState(
    updateOrderStatusAction.bind(null, orderId),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
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

      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          name="status"
          defaultValue={currentStatus}
          className="rounded-lg border px-3 py-2"
          disabled={pending}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Updating..." : "Update Status"}
        </button>
      </div>
    </form>
  );
}
