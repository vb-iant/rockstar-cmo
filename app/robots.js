// app/robots.js
//
// Next.js App Router metadata file -- compiles to /robots.txt automatically,
// no separate route handler needed. Was missing entirely post-migration
// (WordPress had one; the new site never got an equivalent), found during
// the pre-decommission site audit on 2026-08-30.
//
// www is canonical (the site redirects rockstarcmo.com -> www.rockstarcmo.com),
// so robots.txt and the sitemap reference live there directly rather than
// making every crawler follow the apex redirect first.

const BASE_URL = "https://www.rockstarcmo.com";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/podcast/update"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
