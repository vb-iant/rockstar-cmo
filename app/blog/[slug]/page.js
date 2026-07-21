// app/blog/[slug]/page.js
import Link from "next/link";
import { getAllPosts, getPostBySlug, renderPostHtml } from "../../../lib/posts";
import { getTagByCollectsTag } from "../../../lib/tags";
import { notFound } from "next/navigation";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Rockstar CMO`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = renderPostHtml(post);

  // Only linkify categories that actually have a tag-index page built for
  // them yet (issues + series) -- the rest of the raw WP category soup is
  // carried through in frontmatter but not surfaced as clickable tags.
  const tagLinks = (post.categories || [])
    .map((c) => getTagByCollectsTag(c))
    .filter(Boolean);

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
      <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {formatDate(post.date)}
        {post.author && (
          <>
            {" "}
            &middot; by{" "}
            <Link href={`/tags/${post.authorSlug}`} className="blog-hover-red">
              {post.author}
            </Link>
          </>
        )}
      </p>
      {/* Featured image is index/card-only (like the excerpt) -- the post
          body frequently already includes its own inline image(s) from the
          original content, so rendering it again here would duplicate it. */}
      <div className="blog-post-body" style={{ color: "#333" }} dangerouslySetInnerHTML={{ __html: html }} />

      {tagLinks.length > 0 && (
        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #e5e5e5" }}>
          {tagLinks.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="blog-hover-red"
              style={{
                display: "inline-block",
                marginRight: "0.75rem",
                marginBottom: "0.5rem",
                padding: "0.25rem 0.75rem",
                border: "1px solid #e5e5e5",
                borderRadius: "999px",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              {tag.title}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
