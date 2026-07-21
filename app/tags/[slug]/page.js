// app/tags/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getTagBySlug, getPostsForTag } from "../../../lib/tags";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export function generateMetadata({ params }) {
  const tag = getTagBySlug(params.slug);
  if (!tag) return {};
  return {
    title: `${tag.title} | Rockstar CMO`,
    description: tag.description || `Posts tagged ${tag.title} on Rockstar CMO.`,
  };
}

export default function TagIndexPage({ params }) {
  const tag = getTagBySlug(params.slug);
  if (!tag) notFound();

  const posts = getPostsForTag(tag.collectsTag);

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {tag.image && (
        <img
          src={tag.image}
          alt={tag.title}
          className="blog-image"
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            display: "block",
          }}
        />
      )}

      <h1 style={{ marginBottom: tag.description ? "0.5rem" : "1.5rem" }}>{tag.title}</h1>

      {tag.description && (
        <p style={{ color: "#333", marginBottom: "2rem" }}>{tag.description}</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #e5e5e5" }}
          >
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {post.image && (
                <Link href={`/blog/${post.slug}`} style={{ flexShrink: 0 }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    width={250}
                    height={250}
                    className="blog-image"
                    style={{ borderRadius: "8px", objectFit: "cover", display: "block", width: "250px", height: "250px" }}
                  />
                </Link>
              )}
              <div style={{ flex: "1 1 300px" }}>
                <Link href={`/blog/${post.slug}`} className="blog-hover-red" style={{ textDecoration: "none" }}>
                  <h2 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{post.title}</h2>
                </Link>
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {formatDate(post.date)}
                  {post.author && post.authorSlug !== tag.collectsTag && (
                    <>
                      {" "}
                      &middot;{" "}
                      <Link href={`/tags/${post.authorSlug}`} className="blog-hover-red">
                        {post.author}
                      </Link>
                    </>
                  )}
                </p>
                <p style={{ color: "#333", marginBottom: "0.5rem" }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="blog-hover-red" style={{ fontWeight: 600 }}>
                  Read more &rarr;
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {posts.length === 0 && <p style={{ color: "#666" }}>No posts here yet.</p>}
    </main>
  );
}
