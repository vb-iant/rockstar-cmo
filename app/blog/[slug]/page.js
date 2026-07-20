// app/blog/[slug]/page.js
import { getAllPosts, getPostBySlug, renderPostHtml } from "../../../lib/posts";
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

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
      <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
        {formatDate(post.date)}
      </p>
      {/* Featured image is index/card-only (like the excerpt) -- the post
          body frequently already includes its own inline image(s) from the
          original content, so rendering it again here would duplicate it. */}
      <div style={{ color: "#333" }} dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
