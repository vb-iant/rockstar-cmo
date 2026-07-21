// app/blog/page.js
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

const PER_PAGE = 10;

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export const metadata = {
  title: "Blog | Rockstar CMO",
  description: "Marketing street knowledge, backstage passes and rockstar wisdom from the Rockstar CMO blog.",
};

export default function BlogIndex({ searchParams }) {
  const posts = getAllPosts();

  const pageParam = parseInt(searchParams?.page ?? "1", 10);
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const start = (safePage - 1) * PER_PAGE;
  const pagePosts = posts.slice(start, start + PER_PAGE);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>Blog</h1>

      <div className="card-grid" style={{ marginBottom: "2rem" }}>
        {pagePosts.map((post) => (
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
              {post.author && (
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

      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {safePage > 1 ? (
          <Link href={`/blog?page=${safePage - 1}`} className="blog-hover-red">&larr; Newer</Link>
        ) : (
          <span />
        )}
        <span style={{ color: "#666" }}>
          Page {safePage} of {totalPages}
        </span>
        {safePage < totalPages ? (
          <Link href={`/blog?page=${safePage + 1}`} className="blog-hover-red">Older &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
