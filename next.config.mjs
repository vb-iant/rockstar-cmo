import fs from "fs";
import path from "path";

// Old-site -> new-site 301 redirects, accumulated across migration phases.
// See lib/redirects/README.md for how each source file was derived.
function loadRedirects(file) {
  const p = path.join(process.cwd(), "lib", "redirects", file);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const blogRedirects = loadRedirects("blogRedirects.json");
const authorRedirects = loadRedirects("authorRedirects.json");
const issueRedirects = loadRedirects("issueRedirects.json");
const seriesRedirects = loadRedirects("seriesRedirects.json");
const episodeRedirects = loadRedirects("episodeRedirects.json");

function toNextRedirects(entries) {
  return entries.map(({ oldPath, newPath }) => ({
    source: oldPath,
    destination: newPath,
    permanent: true,
  }));
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 373 migrated blog posts: old flat WP permalink -> /blog/[slug]
      ...toNextRedirects(blogRedirects),
      // 40 WP author archives -> /tags/author/[slug] (old nicenames sourced
      // from the live WP REST API, not guessed from display names)
      ...toNextRedirects(authorRedirects),
      // 31 issue digest posts + their category archives -> /tags/issue/[slug]
      ...toNextRedirects(issueRedirects),
      // 12 series category archives -> /tags/series/[slug]
      ...toNextRedirects(seriesRedirects),
      // 390 podcast episode posts -> /episodes/[slug] (title-matched against
      // the Megaphone RSS feed, since new slugs are RSS-derived, not WP slugs)
      ...toNextRedirects(episodeRedirects),
    ];
  },
};

export default nextConfig;
