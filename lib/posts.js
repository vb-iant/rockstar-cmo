// lib/posts.js
//
// Loads blog posts from content/blog/*.md (frontmatter + markdown body).
// These were migrated from the old WordPress site as a one-time conversion
// -- unlike episodes.json, this is NOT refetched on every build. New posts
// going forward get added the same way (a new .md file in content/blog/).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

let _cache = null;

export function getAllPosts() {
  if (_cache) return _cache;

  if (!fs.existsSync(BLOG_DIR)) {
    _cache = [];
    return _cache;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      excerptGenerated: !!data.excerptGenerated,
      author: data.author || null,
      authorSlug: data.authorSlug || null,
      image: data.image || null,
      tags: data.tags || [],
      series: data.series || [],
      needsReview: data.needsReview || [],
      sourceId: data.sourceId,
      sourceUrl: data.sourceUrl,
      bodyMarkdown: content,
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  _cache = posts;
  return posts;
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

// Cheap "related posts": no NLP, just scores every other post by how many
// tags+series it shares with this one (weighted higher, since a shared
// topic/issue/series is a stronger signal than authorship) plus a bonus
// for sharing the same author. Ties broken by recency.
// A more accurate embedding-based version is a separate, deferred task --
// this is deliberately just a lookup against data already in frontmatter.
export function getRelatedPosts(post, limit = 3) {
  if (!post) return [];

  const candidates = getAllPosts().filter((p) => p.slug !== post.slug);
  const postGroups = [...(post.tags || []), ...(post.series || [])];

  const scored = candidates
    .map((p) => {
      const pGroups = [...(p.tags || []), ...(p.series || [])];
      const sharedGroups = pGroups.filter((c) => postGroups.includes(c)).length;
      const sameAuthor = p.authorSlug && p.authorSlug === post.authorSlug ? 1 : 0;
      return { post: p, score: sharedGroups * 2 + sameAuthor };
    })
    .filter((s) => s.score > 0);

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date) - new Date(a.post.date);
  });

  return scored.slice(0, limit).map((s) => s.post);
}

export function renderPostHtml(post) {
  return marked.parse(post.bodyMarkdown || "");
}
