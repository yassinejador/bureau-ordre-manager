/**
 * WARNING:
 * This program is strictly temporary and intended solely for testing purposes.
 * It is completely insecure.
 */
/*
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;
  const role_id ="1";

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
      "/logs",
      "/services",
    ], // L'agent administratif a accès uniquement aux courriers
  };

  // Vérification des restrictions pour le rôle actuel
  const isRestricted = restrictedRoutes[role_id]?.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isRestricted) {
    return NextResponse.redirect(new URL("/profile", req.url));
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
*/


import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  let decoded: any = null;
  if (token) {
    decoded = jwt.decode(token); 
  }

  if (decoded) {
    try {
      const userId = decoded.id;
      const userResponse = await fetch(`http://localhost:3000/api/users/${userId}`);
      
      if (!userResponse.ok) {
        const errorText = await userResponse.text(); 
        console.error("Erreur lors de la récupération de l'utilisateur :", errorText);
        return NextResponse.json(
          { error: "Erreur serveur ou utilisateur non trouvé" },
          { status: 500 }
        );
      }
      const user = await userResponse.json();
      console.log(user);

    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return NextResponse.json(
        { error: "Erreur serveur lors de la récupération de l'utilisateur" },
        { status: 500 }
      );
    }
  }

  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (path === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.png|images/logo.*).*)"], 
};