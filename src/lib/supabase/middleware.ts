import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  canAccessAdmin,
  canAccessRoute,
} from "@/lib/auth/permissions";
import {
  OWNER_ONLY_ROUTES,
  PUBLIC_ADMIN_ROUTES,
} from "@/lib/auth/roles";
import type { UserRole } from "@/types/auth";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  const env = getSupabaseEnv();
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next({ request });
  }

  // Demo mode: no Supabase env — allow existing static admin UX
  if (!env) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicAdmin = PUBLIC_ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  if (pathname.startsWith("/admin/setup")) {
    const { count } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "owner");

    if ((count ?? 0) > 0) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (user) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return supabaseResponse;
  }

  if (pathname.startsWith("/admin/login")) {
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role as UserRole | undefined;
      if (role && canAccessAdmin(role)) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      await supabase.auth.signOut();
    }
    return supabaseResponse;
  }

  if (isPublicAdmin) {
    return supabaseResponse;
  }

  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "customer") as UserRole;

  if (!canAccessAdmin(role)) {
    await supabase.auth.signOut();
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "no_admin_access");
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessRoute(role, pathname)) {
    const fallback =
      role === "owner"
        ? "/admin/dashboard"
        : "/admin/dashboard";
    return NextResponse.redirect(new URL(fallback, request.url));
  }

  return supabaseResponse;
}

export { OWNER_ONLY_ROUTES };
