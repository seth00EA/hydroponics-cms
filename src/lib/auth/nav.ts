import { adminNavLinks } from "@/data/site";
import type { UserRole } from "@/types/auth";

const OWNER_NAV = [
  { label: "Staff", href: "/admin/staff", description: "Team accounts" },
  { label: "Users", href: "/admin/users", description: "Manage admin accounts" },
  { label: "Account", href: "/admin/account", description: "Password & profile" },
] as const;

export function getAdminNavForRole(role: UserRole) {
  if (role === "owner") {
    return [...adminNavLinks, ...OWNER_NAV];
  }

  if (role === "staff") {
    return adminNavLinks.filter((link) => link.href !== "/admin/contact");
  }

  return [];
}
