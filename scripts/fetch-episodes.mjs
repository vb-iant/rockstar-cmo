// scripts/fetch-episodes.mjs
//
// Runs before every build (see package.json "prebuild").
// Fetches the Megaphone RSS feed and writes parsed episode data to
// content/episodes.json so pages can read it as plain JSON at build time
// (no network calls needed from within the page components themselves).
//
// Note on Megaphone's feed structure: <itunes:summary> and <description>
// are identical (both the full show notes) -- the short per-episode
// summary actually lives in <itunes:subtitle>. Confirmed against a sample
// of the live feed on 2026-07-20.

import Parser from "rss-parser";
import fs from "node:fs";
import path from "node:path";

const FEED_URL = "https://feeds.megaphone.fm/rockstarcmo";
const OUTPUT_PATH = path.join(process.cwd(), "content", "episodes.json");

const parser = new Parser({
  customFields: {
    feed: [
      ["itunes:image", "itunesImage"],
      ["itunes:author", "itunesAuthor"],
      ["itunes:summary", "itunesSummary"],
      ["itunes:owner", "itunesOwner"],
    ],
    item: [
      ["itunes:image", "itunesImage"],
      ["itunes:duration", "duration"],
      ["itunes:episode", "episodeNumber"],
      ["itunes:season", "seasonNumber"],
      ["itunes:subtitle", "itunesSubtitle"],
      ["itunes:summary", "itunesSummary"],
      ["itunes:explicit", "explicit"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log(`Fetching RSS feed: ${FEED_URL}`);
  const feed = await parser.parseURL(FEED_URL);

  const show = {
    title: feed.title ?? "",
    description: feed.description ?? feed.itunesSummary ?? "",
    image:
      feed.itunesImage?.$?.href ??
      feed.image?.url ??
      null,
    link: feed.link ?? "",
    author: feed.itunesAuthor ?? "",
  };

  const episodes = (feed.items ?? []).map((item) => {
    const slug = slugify(item.title ?? "untitled");
    return {
      slug,
      title: item.title ?? "",
      pubDate: item.pubDate ?? item.isoDate ?? "",
      // Short summary: itunes:subtitle is the deliberately-written one-liner.
      // (itunes:summary/description are the full show notes, identical to
      // each other on this feed -- kept separately as contentHtml below.)
      description: item.itunesSubtitle ?? item.contentSnippet ?? "",
      contentHtml: item.contentEncoded ?? item.content ?? "",
      audioUrl: item.enclosure?.url ?? "",
      audioType: item.enclosure?.type ?? "",
      duration: item.duration ?? "",
      episodeNumber: item.episodeNumber ?? null,
      seasonNumber: item.seasonNumber ?? null,
      image: item.itunesImage?.$?.href ?? show.image,
      guid: item.guid ?? item.link ?? slug,
    };
  });

  // Sort newest first, just in case the feed isn't already ordered that way
  episodes.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const output = { show, episodes, fetchedAt: new Date().toISOString() };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  console.log(`Wrote ${episodes.length} episodes to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed to fetch/parse RSS feed:", err);
  process.exit(1);
});
