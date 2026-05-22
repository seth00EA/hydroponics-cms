import {
  ADMIN_ROUTES,
  OWNER_ONLY_ROUTES,
  ROLES,
} from "@/lib/auth/roles";
import type { UserRole } from "@/types/auth";

export function canAccessAdmin(role: UserRole): boolean {
  return role === ROLES.OWNER || role === ROLES.STAFF;
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (!canAccessAdmin(role)) return false;

  const isOwnerOnly = OWNER_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  if (isOwnerOnly) return role === ROLES.OWNER;

  const isAdminRoute =
    ADMIN_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ) || pathname === "/admin" || pathname === "/admin/";

  return isAdminRoute || role === ROLES.OWNER;
}

export function canManageStaff(role: UserRole): boolean {
  return role === ROLES.OWNER;
}

export function canManageContactSettings(role: UserRole): boolean {
  return role === ROLES.OWNER;
}

export function canChangeOwnPassword(role: UserRole): boolean {
  return role === ROLES.OWNER;
}
