import type { UserRole } from "@/types/auth";

export const ROLES = {
  OWNER: "owner",
  STAFF: "staff",
  CUSTOMER: "customer",
} as const satisfies Record<string, UserRole>;

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Owner",
  staff: "Staff",
  customer: "Customer",
};

/** Routes any admin role (owner + staff) may access */
export const ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/homepage",
  "/admin/products",
  "/admin/gallery",
] as const;

/** Routes restricted to owner only */
export const OWNER_ONLY_ROUTES = [
  "/admin/contact",
  "/admin/staff",
  "/admin/account",
] as const;

export const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/setup"] as const;
