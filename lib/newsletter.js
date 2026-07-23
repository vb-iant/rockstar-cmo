// lib/newsletter.js
//
// Unlike the podcast (build-time fetch via scripts/fetch-episodes.mjs +
// manual /podcast/update rebuild trigger), the newsletter teaser is small
// and low-stakes enough to just fetch at request time with Next.js ISR:
// `fetch(..., { next: { revalidate } })` caches the response and
// transparently refetches in the background once it's stale, so a new
// issue shows up on its own without anyone needing to remember to trigger
// a rebuild.
//
// Source is beehiiv's RSS feed, which only exposes the ~20 most recent
// issues -- fine here, since we only ever show the latest 5 with a link
// out to Beehiiv for the full archive. (A full historical archive would
// need beehiiv's REST API instead, which supports pagination -- not
// needed for this scope.)

import Parser from "rss-parser";

const FEED_URL = "https://rss.beehiiv.com/feeds/1dPOSh3l50.xml";
const REVALIDATE_SECONDS = 3600; // 1 hour

const parser = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

export async function getNewsletterIssues(limit = 5) {
  const res = await fetch(FEED_URL, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch newsletter feed: ${res.status}`);
  }

  const xml = await res.text();
  const feed = await parser.parseString(xml);

  const publication = {
    title: feed.title ?? "",
    description: feed.description ?? "",
    link: feed.link ?? "",
    image: feed.image?.url ?? null,
  };

  const issues = (feed.items ?? []).map((item) => ({
    title: item.title ?? "",
    description: item.contentSnippet ?? item.description ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ?? item.isoDate ?? "",
    image: item.enclosure?.url ?? null,
    author: item.creator ?? item["dc:creator"] ?? null,
  }));

  return { publication, issues: issues.slice(0, limit) };
}
