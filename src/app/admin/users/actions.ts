"use server";

import {
  deleteAdminAccountAction,
  disableAdminAccountAction,
  resetStaffPasswordAction,
} from "@/app/admin/actions/auth";

export async function deleteAdminAccountFormAction(userId: string): Promise<void> {
  await deleteAdminAccountAction(userId);
}

export async function disableAdminAccountFormAction(userId: string): Promise<void> {
  await disableAdminAccountAction(userId);
}

export { resetStaffPasswordAction };
