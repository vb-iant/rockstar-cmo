// app/blog/[slug]/page.js
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts, renderPostHtml } from "../../../lib/posts";
import { getTagByCollectsTag, tagHref } from "../../../lib/tags";
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

  // Only linkify series/issue values that actually have a tag-index page
  // built for them yet -- genuine topic tags (post.tags) don't have their
  // own tag-index pages yet, so they aren't surfaced as clickable badges.
  const tagLinks = (post.series || [])
    .map((c) => getTagByCollectsTag(c))
    .filter(Boolean);

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
    <div style={{ maxWidth: "var(--prose-width)", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
      <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {formatDate(post.date)}
        {post.author && (
          <>
            {" "}
            &middot; by{" "}
            <Link href={`/tags/author/${post.authorSlug}`} className="blog-hover-red">
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
              href={tagHref(tag)}
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
    </div>

    {relatedPosts.length > 0 && (
      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e5e5" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Related Posts</h2>
        <div className="card-grid-3">
          {relatedPosts.map((related) => (
            <div key={related.slug}>
              {related.image ? (
                <Link href={`/blog/${related.slug}`} className="dymo-label-wrap">
                  <img
                    src={related.image}
                    alt={related.title}
                    width={500}
                    height={500}
                    className="blog-image index-card-image"
                  />
                  <h3 className="dymo-label"><span className="dymo-label-text">{related.title}</span></h3>
                </Link>
              ) : (
                <Link href={`/blog/${related.slug}`} className="blog-hover-red" style={{ textDecoration: "none" }}>
                  <h3 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{related.title}</h3>
                </Link>
              )}
              <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {formatDate(related.date)}
                {related.author && (
                  <>
                    {" "}
                    &middot;{" "}
                    <Link href={`/tags/author/${related.authorSlug}`} className="blog-hover-red">
                      {related.author}
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
    </main>
  );
}
