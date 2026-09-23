// scripts/fetch-episodes.mjs
//
// Runs before every build (see package.json "prebuild").
// Fetches the Simplecast RSS feed and writes parsed episode data to
// content/episodes.json so pages can read it as plain JSON at build time
// (no network calls needed from within the page components themselves).
//
// Note on the feed structure: on Megaphone, <itunes:subtitle> held a short
// hand-written one-liner, which we used as the episode summary. Simplecast
// (from Sept 2026) fills <itunes:subtitle>, <itunes:summary> and
// <description> with the FULL show notes, so there is no ready-made short
// summary any more. summarize() below derives one: the first paragraph of
// the notes (almost always the "This week, X joins our host..." intro),
// capped at SUMMARY_MAX chars on a sentence or word boundary. Some episodes
// have no paragraph breaks at all, hence the cap.

import Parser from "rss-parser";
import fs from "node:fs";
import path from "node:path";

const FEED_URL = "https://feeds.simplecast.com/m4EkR_PR";
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

const SUMMARY_MAX = 250;

function summarize(text) {
  const firstPara = (text ?? "").trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim();
  if (firstPara.length <= SUMMARY_MAX) return firstPara;
  const clipped = firstPara.slice(0, SUMMARY_MAX);
  // Prefer ending on a full sentence, if one ends reasonably far in.
  const sentenceEnd = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("? "), clipped.lastIndexOf("! "));
  if (sentenceEnd >= 100) return clipped.slice(0, sentenceEnd + 1);
  const wordEnd = clipped.lastIndexOf(" ");
  return clipped.slice(0, wordEnd > 0 ? wordEnd : SUMMARY_MAX).replace(/[\s,;:\-\u2013\u2014]+$/, "") + "\u2026";
}

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
      // Short summary derived from the full show notes (see note at top).
      // Full notes are kept separately as contentHtml below.
      description: summarize(item.itunesSubtitle ?? item.contentSnippet ?? ""),
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
