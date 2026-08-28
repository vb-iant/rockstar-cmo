// app/tags/[kind]/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getTagByKindAndSlug, getPostsForTag, tagHref } from "../../../../lib/tags";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ kind: tag.kind, slug: tag.slug }));
}

export function generateMetadata({ params }) {
  const tag = getTagByKindAndSlug(params.kind, params.slug);
  if (!tag) return {};
  return {
    title: `${tag.title} | Rockstar CMO`,
    description: tag.description || `Posts tagged ${tag.title} on Rockstar CMO.`,
  };
}

// Social links for author tag pages. Only rendered when kind === "author"
// and at least one link is present; harmless no-op for issues/series.
function AuthorSocialLinks({ tag }) {
  const links = [
    tag.linkedin && { href: tag.linkedin, label: "LinkedIn" },
    tag.twitter && { href: tag.twitter, label: "Twitter" },
    tag.website && { href: tag.website, label: "Website" },
  ].filter(Boolean);

  if (links.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-hover-red"
          style={{ fontWeight: 600, textDecoration: "none" }}
        >
          {l.label} &rarr;
        </a>
      ))}
    </div>
  );
}

export default function TagIndexPage({ params }) {
  const tag = getTagByKindAndSlug(params.kind, params.slug);
  if (!tag) notFound();

  const posts = getPostsForTag(tag.collectsTag);
  const isAuthor = tag.kind === "author";

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--prose-width)", margin: "0 auto" }}>
        {tag.image && isAuthor ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <img
              src={tag.image}
              alt={tag.title}
              className="blog-image"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <div>
              <h1 style={{ margin: 0 }}>{tag.title}</h1>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {tag.description && (
          <p style={{ color: "#333", marginBottom: isAuthor ? "0.75rem" : "2rem" }}>{tag.description}</p>
        )}

        {isAuthor && <AuthorSocialLinks tag={tag} />}
      </div>

      <div className="card-grid" style={{ marginBottom: "2rem" }}>
        {posts.map((post) => (
          <div key={post.slug}>
            {post.image ? (
              <Link href={`/blog/${post.slug}`} className="dymo-label-wrap">
                <img
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={500}
                  className="blog-image index-card-image"
                />
                <h2 className="dymo-label"><span className="dymo-label-text">{post.title}</span></h2>
              </Link>
            ) : (
              <Link href={`/blog/${post.slug}`} className="blog-hover-red" style={{ textDecoration: "none" }}>
                <h2 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{post.title}</h2>
              </Link>
            )}
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
              {formatDate(post.date)}
              {post.author && post.authorSlug !== tag.collectsTag && (
                <>
                  {" "}
                  &middot;{" "}
                  <Link href={`/tags/author/${post.authorSlug}`} className="blog-hover-red">
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
        ))}
      </div>

      {posts.length === 0 && <p style={{ color: "#666" }}>No posts here yet.</p>}
    </main>
  );
}
