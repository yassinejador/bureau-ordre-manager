import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
 const token = req.cookies.get("auth_token")?.value;
 const path = req.nextUrl.pathname;

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
 matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/logo.*).*)",],
};