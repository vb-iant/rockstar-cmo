// app/the-official-rockstar-cmo-rider/page.js
//
// Migrated from the old WP page of the same slug (2026-08-29). Reuses the
// same markdown-body rendering pattern as blog posts (marked + the
// .blog-post-body CSS class) for visual consistency, rather than a bespoke
// layout -- this is a simple article-style page, not a template that will
// be reused elsewhere.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const metadata = {
  title: "The Official Rockstar CMO Rider | Rockstar CMO",
  description:
    "We asked our Rockstar CMO community what they insist on being in their marketing dressing room -- here's the result.",
};

export default function RiderPage() {
  const filePath = path.join(process.cwd(), "content", "pages", "the-official-rockstar-cmo-rider.md");
  const markdown = fs.readFileSync(filePath, "utf-8");
  const html = marked.parse(markdown);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--prose-width)", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>The Official Rockstar CMO Rider</h1>
        <div className="blog-post-body" style={{ color: "#333" }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
