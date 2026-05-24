import {
  ADMIN_ROUTES,
  OWNER_ONLY_ROUTES,
  PUBLIC_ADMIN_ROUTES,
  ROLES,
} from "@/lib/auth/roles";
import type { UserRole } from "@/types/auth";

function matchesRoute(pathname: string, routes: readonly string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function canAccessAdmin(role: UserRole): boolean {
  return role === ROLES.OWNER || role === ROLES.STAFF;
}

export function isPublicAdminRoute(pathname: string): boolean {
  return matchesRoute(pathname, PUBLIC_ADMIN_ROUTES);
}

export function isOwnerOnlyRoute(pathname: string): boolean {
  return matchesRoute(pathname, OWNER_ONLY_ROUTES);
}

export function isSharedAdminRoute(pathname: string): boolean {
  return matchesRoute(pathname, ADMIN_ROUTES) || pathname === "/admin" || pathname === "/admin/";
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  if (isPublicAdminRoute(pathname)) return true;
  if (!canAccessAdmin(role)) return false;

  if (isOwnerOnlyRoute(pathname)) {
    return role === ROLES.OWNER;
  }

  if (isSharedAdminRoute(pathname)) {
    return role === ROLES.OWNER || role === ROLES.STAFF;
  }

  return role === ROLES.OWNER;
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
