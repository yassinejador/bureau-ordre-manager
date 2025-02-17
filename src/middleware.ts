/**
 * WARNING:
 * This program is strictly temporary and intended solely for testing purposes.
 * It is completely insecure.
 */

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;
  const role_id ="2";

  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path === "/login") {
    return NextResponse.next();
  }

  const restrictedRoutes = {
    "1": [], // La direction a accès à tout
    "2": ["/permissions"], // Le secrétariat n'a pas accès à la gestion des permissions
    "3": [
      "/permissions",
      "/roles",
      "/etablissements",
      "/utilisateur",
      "/profile",
      "/logs",
      "/services",
    ], // L'agent administratif a accès uniquement aux courriers
  };

  // Vérification des restrictions pour le rôle actuel
  const isRestricted = restrictedRoutes[role_id]?.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isRestricted) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Application du middleware aux routes protégées
export const config = {
  matcher: [
    "/permissions/:path*",
    "/roles/:path*",
    "/etablissements/:path*",
    "/courriers/:path*",
    "/utilisateur/:path*",
    "/profile/:path*",
    "/logs/:path*",
    "/services/:path*",
  ],
};