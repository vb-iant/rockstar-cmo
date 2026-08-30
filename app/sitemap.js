// app/sitemap.js
//
// Next.js App Router metadata file -- compiles to /sitemap.xml automatically.
// Was missing entirely post-migration (WordPress had one; the new site never
// got an equivalent), found during the pre-decommission site audit on
// 2026-08-30. Particularly useful right now: helps Google re-discover the
// post-migration URL structure (/blog/[slug], /tags/[kind]/[slug],
// /episodes/[slug]) quickly rather than relying solely on crawling through
// the redirect map.
//
// Rebuilds automatically on every deploy since it reads the same content
// sources (content/blog, content/tags, content/episodes.json) as the pages
// themselves -- no separate list to keep in sync by hand.

import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../lib/posts";
import { getAllTags, tagHref } from "../lib/tags";

const BASE_URL = "https://www.rockstarcmo.com";

function loadEpisodeSlugs() {
  const filePath = path.join(process.cwd(), "content", "episodes.json");
  if (!fs.existsSync(filePath)) return [];
  try {
    const { episodes } = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return episodes || [];
  } catch {
    return [];
  }
}

// Static, hand-built pages not covered by the dynamic sources below.
// Deliberately excludes /admin, /admin/login, /admin/podcast, /podcast/update
// (utility/internal routes, already disallowed in robots.js).
const STATIC_ROUTES = [
  "",
  "/blog",
  "/podcast",
  "/episodes",
  "/about",
  "/contact",
  "/newsletter",
  "/privacy-policy",
  "/rockstar-b2b",
  "/marketing-operations-assessment",
  "/think-like-a-brand",
  "/track-list",
  "/the-official-rockstar-cmo-rider",
  "/rockstar-cmo-presents-the-long-play",
  "/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-content-wonderland-2",
  "/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-the-5-fin-marketing-fundamentals",
  "/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-the-employee-amplifier",
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" || route === "/blog" || route === "/podcast" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : 0.6,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : undefined,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const tagEntries = getAllTags().map((tag) => ({
    url: `${BASE_URL}${tagHref(tag)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const episodeEntries = loadEpisodeSlugs().map((ep) => ({
    url: `${BASE_URL}/episodes/${ep.slug}`,
    lastModified: ep.pubDate ? new Date(ep.pubDate).toISOString() : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries, ...tagEntries, ...episodeEntries];
}
