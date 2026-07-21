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
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Blog</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pagePosts.map((post) => (
          <li key={post.slug} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #e5e5e5" }}>
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
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h2 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{post.title}</h2>
                </Link>
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {formatDate(post.date)}
                </p>
                <p style={{ color: "#333", marginBottom: "0.5rem" }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} style={{ fontWeight: 600 }}>
                  Read more &rarr;
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {safePage > 1 ? (
          <Link href={`/blog?page=${safePage - 1}`}>&larr; Newer</Link>
        ) : (
          <span />
        )}
        <span style={{ color: "#666" }}>
          Page {safePage} of {totalPages}
        </span>
        {safePage < totalPages ? (
          <Link href={`/blog?page=${safePage + 1}`}>Older &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
