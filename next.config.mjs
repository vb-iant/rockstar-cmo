import fs from "fs";
import path from "path";

// Old-site -> new-site 301 redirects, accumulated across migration phases.
// See lib/redirects/README.md for how each source file was derived.
function loadRedirects(file) {
  const p = path.join(process.cwd(), "lib", "redirects", file);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const blogRedirects = loadRedirects("blogRedirects.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 373 migrated blog posts: old flat WP permalink -> /blog/[slug]
      // 1:1 mechanical mapping, old post slug === new post slug for all of these.
      ...blogRedirects.map(({ oldPath, newPath }) => ({
        source: oldPath,
        destination: newPath,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
