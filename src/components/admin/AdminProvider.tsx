"use client";

import { createContext, useContext } from "react";
import type { AuthSession } from "@/types/auth";

const AdminContext = createContext<AuthSession | null>(null);

export function AdminProvider({
  session,
  children,
}: {
  session: AuthSession;
  children: React.ReactNode;
}) {
  return (
    <AdminContext.Provider value={session}>{children}</AdminContext.Provider>
  );
}

export function useAdminSession(): AuthSession | null {
  return useContext(AdminContext);
}
