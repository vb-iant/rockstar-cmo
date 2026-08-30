// app/track-list/page.js
//
// Migrated from the old WP page of the same slug (2026-08-30). Reuses the
// same markdown-body rendering pattern as the Rider page (marked +
// .blog-post-body CSS class) for visual consistency -- a simple
// article-style page, not a template that will be reused elsewhere.
//
// The old page embedded the playlist via WordPress's now-defunct
// embed.spotify.com oEmbed URL, which no longer resolves (Spotify retired
// that embed format) -- on the live WP site this renders as a broken
// "This page could not be found" iframe. Replaced here with Spotify's
// current open.spotify.com/embed iframe format, pointing at the same
// playlist ID.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const metadata = {
  title: "Track List | Rockstar CMO",
  description:
    "The Ultimate Spotify Playlist to get your Monday morning marketing mojo working -- built from tunes requested by our Backstage interview guests, issue by issue.",
};

export default function TrackListPage() {
  const filePath = path.join(process.cwd(), "content", "pages", "track-list.md");
  const markdown = fs.readFileSync(filePath, "utf-8");
  const html = marked.parse(markdown);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: "var(--prose-width)", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Track List</h1>
        <p
          style={{
            fontFamily: "var(--font-bevan), Georgia, serif",
            color: "#666",
            marginBottom: "1.5rem",
          }}
        >
          The Ultimate Spotify Playlist to get your Monday morning marketing mojo working.
        </p>
        <div className="blog-post-body" style={{ color: "#333" }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
