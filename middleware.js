// middleware.js
//
// Gates everything under /admin behind a signed session cookie (see
// lib/adminSession.js) rather than NextAuth -- swapped from GitHub OAuth
// to a simple password gate on 2026-07-23 to unblock building the actual
// editor tonight. Google OAuth is planned as a proper next phase.
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "./lib/adminSession";

export async function middleware(request) {
  // /admin/login must stay reachable, or a logged-out visitor can never
  // reach the page that lets them log in.
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);

  if (!valid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
