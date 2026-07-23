// lib/tags.js
//
// Generic "tag-index" mechanism: a single page shape --
//   { slug, title, kind, image, description, collectsTag, needsImage, needsReview }
// -- reused for author archives, issue digests (the-nevermind-issue etc.),
// recurring series (Backstage, The Green Room, etc.), and eventually genuine
// topic tags, instead of separate bespoke templates for each.
//
// URLs are namespaced by kind: /tags/author/jeff-clark, /tags/issue/nevermind,
// /tags/series/backstage, /tags/topic/b2b-marketing (once that kind exists).
// This keeps slugs from colliding across kinds and makes the URL self-
// describing. Matching a post to a tag page is still done purely via
// `collectsTag`, independent of the URL structure.
//
// A post belongs to a tag page if its `authorSlug` matches the tag's
// `collectsTag`, OR the tag's `collectsTag` appears in the post's
// `series` array. Author slugs and series slugs don't collide, so this
// single OR check is all the matching logic that's needed. (Post
// frontmatter also carries a separate `tags` array for genuine topic
// categories -- those don't have tag-index pages yet, so they aren't
// part of this matching.)

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

export function getTagByKindAndSlug(kind, slug) {
  return getAllTags().find((t) => t.kind === kind && t.slug === slug) || null;
}

// Map of raw category/author-slug value -> tag page, for quick lookups
// (e.g. rendering category badges on a post that link to a tag page only
// when one actually exists).
export function getTagByCollectsTag(value) {
  return getAllTags().find((t) => t.collectsTag === value) || null;
}

// Canonical URL for a tag page, given a tag object (or anything with
// { kind, slug }). Use this everywhere instead of hand-building the path.
export function tagHref(tag) {
  if (!tag || !tag.kind || !tag.slug) return "/tags";
  return `/tags/${tag.kind}/${tag.slug}`;
}

export function getPostsForTag(collectsTag) {
  return getAllPosts()
    .filter(
      (p) => p.authorSlug === collectsTag || (p.series || []).includes(collectsTag)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
