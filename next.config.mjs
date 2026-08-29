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
const pagesRedirects = loadRedirects("pagesRedirects.json");
const pagesRedirects2 = loadRedirects("pagesRedirects2.json");

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
      // handful of misc. old pages with a clear one-off new-site destination
      ...toNextRedirects(pagesRedirects),
      // Search Console traffic/backlink audit (2026-08-29): 3 Long Play PDFs
      // rehosted under a new path, + the umbrella podcast category archive
      ...toNextRedirects(pagesRedirects2),
      // WP pagination URLs Google has indexed for specific author/category
      // archives (found in the same traffic audit) -> the matching tag page.
      // Wildcard on page number since exact old page counts don't matter here.
      { source: "/author/ian/page/:num", destination: "/tags/author/ian-truscott", permanent: true },
      { source: "/author/jeffclark/page/:num", destination: "/tags/author/jeff-clark", permanent: true },
      { source: "/category/podcast/page/:num", destination: "/podcast", permanent: true },
      { source: "/category/rockstar-cmo-advisors/page/:num", destination: "/tags/series/rockstar-cmo-advisors", permanent: true },
      { source: "/category/rockstar-cmo-advisors/street-knowledge/page/:num", destination: "/tags/series/street-knowledge", permanent: true },
    ];
  },
};

export default nextConfig;
