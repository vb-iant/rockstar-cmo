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
      image: data.image || null,
      categories: data.categories || [],
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

export function renderPostHtml(post) {
  return marked.parse(post.bodyMarkdown || "");
}
