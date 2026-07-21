// lib/tags.js
//
// Generic "tag-index" mechanism: a single page shape --
//   { slug, title, kind, image, description, collectsTag, needsImage, needsReview }
// -- reused for author archives, issue digests (the-nevermind-issue etc.), and
// recurring series (Backstage, The Green Room, etc.) instead of separate
// bespoke templates for each. `kind` is metadata only (for display/filtering);
// matching a post to a tag page is done purely via `collectsTag`.
//
// A post belongs to a tag page if its `authorSlug` matches the tag's
// `collectsTag`, OR the tag's `collectsTag` appears in the post's
// `categories` array. Author slugs and WP category slugs don't collide,
// so this single OR check is all the matching logic that's needed.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllPosts } from "./posts";

const TAGS_DIR = path.join(process.cwd(), "content", "tags");

let _cache = null;

export function getAllTags() {
  if (_cache) return _cache;

  if (!fs.existsSync(TAGS_DIR)) {
    _cache = [];
    return _cache;
  }

  const files = fs.readdirSync(TAGS_DIR).filter((f) => f.endsWith(".md"));

  const tags = files.map((file) => {
    const raw = fs.readFileSync(path.join(TAGS_DIR, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: data.slug,
      title: data.title,
      kind: data.kind || null,
      image: data.image || null,
      description: data.description || null,
      collectsTag: data.collects_tag,
      needsImage: !!data.needsImage,
      needsReview: !!data.needsReview,
    };
  });

  _cache = tags;
  return _cache;
}

export function getTagBySlug(slug) {
  return getAllTags().find((t) => t.slug === slug) || null;
}

// Map of raw category/author-slug value -> tag page, for quick lookups
// (e.g. rendering category badges on a post that link to a tag page only
// when one actually exists).
export function getTagByCollectsTag(value) {
  return getAllTags().find((t) => t.collectsTag === value) || null;
}

export function getPostsForTag(collectsTag) {
  return getAllPosts()
    .filter(
      (p) => p.authorSlug === collectsTag || (p.categories || []).includes(collectsTag)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
