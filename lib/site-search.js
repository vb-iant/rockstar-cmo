// lib/site-search.js
//
// Site-wide search across blog posts AND podcast episodes, powered by
// Fuse.js running server-side (same approach as the mediasurface reference
// blog search: a plain GET form submits ?q=..., the server matches, no
// client JS and no separate index-build step).
//
// Deliberately Rockstar CMO-specific rather than a copy of the reference
// implementation, because this site has two content sources the reference
// blog search doesn't:
//   - blog posts: content/blog/*.md, via getAllPosts() (cached in-process)
//   - podcast episodes: content/episodes.json, written at build time by
//     scripts/fetch-episodes.mjs (NOT fetched at request time, so search
//     never touches the RSS feed -- new episodes appear after a rebuild,
//     same as the episode pages themselves).
// Both are normalised to one record shape and searched by ONE Fuse
// instance, so results are a single relevance-ranked list.
//
// Tuning notes (measured against the real content, 373 posts + 394 episodes):
//   - threshold 0.20 (the mediasurface blog search uses 0.35): with show
//     notes in the index, looser values let long words fuzzy-match unrelated
//     text -- at 0.30 a search for "OpenText" returned 11 episodes of which
//     only 1 contained it (the rest matched "content"/"context" in the
//     notes), and at 0.35 "DXP" matched ~170 records for 1 real one. At 0.20
//     precision on exact-name queries was 100% and typo tolerance held
//     ("newsjackin", "sustainabilty", "content stratergy", "ian truscot").
//   - Post BODIES are deliberately not indexed. Fuse is a fuzzy matcher for
//     short fields: indexing ~2M characters of body text pushed queries to
//     ~370ms median and added a long tail of junk matches. Every post has a
//     hand-written excerpt, which carries the teaser. If true full-text body
//     search is ever wanted, use a real full-text index (e.g. Pagefind).
//   - Episode show notes ARE indexed, but only the first NOTES_CHARS
//     characters. Guest and company names live in the notes, not in the
//     title/subtitle, and ~90 episodes have no subtitle at all.

import fs from "node:fs";
import path from "node:path";
import Fuse from "fuse.js";
import { getAllPosts } from "./posts";
import { getAllTags } from "./tags";

const EPISODES_PATH = path.join(process.cwd(), "content", "episodes.json");

const NOTES_CHARS = 600; // how much of each episode's show notes is searchable
const SNIPPET_CHARS = 240; // display snippet fallback length
const MAX_QUERY_CHARS = 100;

const FUSE_OPTIONS = {
  threshold: 0.2,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.45 },
    { name: "summary", weight: 0.25 },
    { name: "tags", weight: 0.1 },
    { name: "people", weight: 0.1 },
    { name: "notes", weight: 0.1 },
  ],
};

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "\u2019",
  lsquo: "\u2018",
  rdquo: "\u201D",
  ldquo: "\u201C",
  hellip: "\u2026",
  mdash: "\u2014",
  ndash: "\u2013",
};

function htmlToText(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeFromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => safeFromCodePoint(parseInt(n, 10)))
    .replace(/&([a-z]+);/gi, (_, name) => NAMED_ENTITIES[name.toLowerCase()] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

function safeFromCodePoint(cp) {
  try {
    return String.fromCodePoint(cp);
  } catch {
    return " ";
  }
}

// Cut at a word boundary and add an ellipsis, never mid-word.
function truncate(text, max) {
  if (!text || text.length <= max) return text || "";
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}

function loadEpisodes() {
  try {
    const raw = fs.readFileSync(EPISODES_PATH, "utf-8");
    return JSON.parse(raw).episodes || [];
  } catch {
    // Missing/invalid episodes.json (e.g. local dev before `prebuild` has
    // run): search still works over blog posts rather than throwing.
    return [];
  }
}

function buildRecords() {
  // Tag/series slugs -> display names, so a search for "Nevermind" or
  // "B2B marketing" matches on what readers see, not the raw slug.
  const tagTitle = new Map(getAllTags().map((t) => [t.collectsTag, t.title]));
  const nameFor = (slug) => tagTitle.get(slug) || String(slug).replace(/-/g, " ");

  const postRecords = getAllPosts().map((p) => ({
    type: "post",
    href: `/blog/${p.slug}`,
    title: p.title || "",
    summary: p.excerpt || "",
    tags: [...(p.tags || []), ...(p.series || [])].map(nameFor),
    people: p.author || "",
    notes: "",
    // display-only fields
    snippet: p.excerpt || "",
    date: p.date || "",
    image: p.image || null,
    author: p.author || null,
    authorSlug: p.authorSlug || null,
    duration: "",
  }));

  const episodeRecords = loadEpisodes().map((e) => {
    const notesText = htmlToText(e.contentHtml);
    const summary = htmlToText(e.description);
    return {
      type: "episode",
      href: `/episodes/${e.slug}`,
      title: e.title || "",
      summary,
      tags: [],
      people: "",
      notes: notesText.slice(0, NOTES_CHARS),
      // Roughly 1 in 4 episodes has no subtitle, so fall back to the start
      // of the show notes for the displayed snippet.
      snippet: summary || truncate(notesText, SNIPPET_CHARS),
      date: e.pubDate || "",
      image: e.image || null,
      author: null,
      authorSlug: null,
      duration: e.duration || "",
    };
  });

  return [...postRecords, ...episodeRecords];
}

// Built once per server instance and reused across requests.
let _index = null;

function getIndex() {
  if (_index) return _index;
  const records = buildRecords();
  _index = {
    fuse: new Fuse(records, FUSE_OPTIONS),
    totals: {
      post: records.filter((r) => r.type === "post").length,
      episode: records.filter((r) => r.type === "episode").length,
    },
  };
  return _index;
}

export function getSearchTotals() {
  return getIndex().totals;
}

export function normalizeQuery(q) {
  return String(q ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_QUERY_CHARS);
}

// type: "all" | "post" | "episode". matchCounts always reflect the full
// (unfiltered-by-type) result set, so the type tabs can show their counts.
export function searchSite(query, type = "all") {
  const q = normalizeQuery(query);
  const empty = { all: 0, post: 0, episode: 0 };
  if (!q) return { query: "", results: [], matchCounts: empty };

  const hits = getIndex().fuse.search(q).map((h) => h.item);
  const matchCounts = {
    all: hits.length,
    post: hits.filter((h) => h.type === "post").length,
    episode: hits.filter((h) => h.type === "episode").length,
  };
  const results = type === "post" || type === "episode" ? hits.filter((h) => h.type === type) : hits;

  return { query: q, results, matchCounts };
}
