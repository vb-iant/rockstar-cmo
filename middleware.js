// middleware.js
//
// Gates everything under /admin behind a signed session cookie (see
// lib/adminSession.js) rather than NextAuth -- swapped from GitHub OAuth
// to a simple password gate on 2026-07-23 to unblock building the actual
// editor tonight. Google OAuth is planned as a proper next phase.
//
// Also handles a handful of legacy WP URLs that carry a stray Byte Order
// Mark (BOM, U+FEFF) baked into the slug -- e.g. old WordPress redirected
// /speaking-in-tongues/ to /speaking-in-tongues%ef%bb%bf/. next.config.mjs's
// declarative redirects() couldn't reliably match this: depending on how
// the request reaches Vercel, the BOM shows up as a literal %ef%bb%bf
// string, an %EF%BB%BF (uppercase) string, or the actual decoded \uFEFF
// character, and testing showed next.config.mjs redirects() echoing the
// raw suffix back into the destination for the percent-encoded forms
// instead of using the clean destination -- a path-to-regexp quirk with
// literal "%" in a source string, not something worth fighting further.
// Doing the match here instead, against request.nextUrl.pathname (which
// Next normalizes for us), sidesteps the whole encoding ambiguity: strip
// every representation of the BOM, then compare against the known clean
// slugs. Added 2026-08-29 alongside the 7 posts these URLs point to, which
// were migrated in the same session.
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "./lib/adminSession";

const BOM_SLUGS = new Set([
  "speaking-in-tongues",
  "start-thinking-more-like-a-customer-and-less-like-a-marketer",
  "how-to-talk-like-a-human-and-not-a-corporate-company",
  "into-the-pool-12-omnichannel-for-the-sake-of-omnichannel",
  "how-to-scoop-content-with-a-real-fresh-flavor",
  "true-engagement-should-never-be-overwhelming",
  "the-green-room-with-all-the-fakery-how-do-you-keep-it-real",
]);

function stripBom(pathname) {
  return pathname
    .replace(/\uFEFF/g, "")
    .replace(/%ef%bb%bf/gi, "");
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Legacy BOM-slug redirects (see comment above).
  const cleaned = stripBom(pathname).replace(/^\/+/, "").replace(/\/+$/, "");
  if (BOM_SLUGS.has(cleaned)) {
    const url = new URL(`/blog/${cleaned}`, request.url);
    return NextResponse.redirect(url, 308);
  }

  // /admin/login must stay reachable, or a logged-out visitor can never
  // reach the page that lets them log in.
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const valid = await verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);

    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|pdfs/).*)"],
};
