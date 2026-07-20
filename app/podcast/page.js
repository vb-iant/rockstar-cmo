// app/podcast/page.js
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

function loadEpisodes() {
  const filePath = path.join(process.cwd(), "content", "episodes.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export const metadata = {
  title: "Podcast | Rockstar CMO",
  description: "Rockstar CMO -- the podcast.",
};

export default function PodcastPage() {
  const { show, episodes } = loadEpisodes();
  const latest = episodes.slice(0, 4);

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {show.image && (
          <img
            src={show.image}
            alt={show.title}
            width={250}
            height={250}
            style={{ borderRadius: "8px", objectFit: "cover", flexShrink: 0, width: "250px", height: "250px" }}
          />
        )}
        <div style={{ flex: "1 1 300px" }}>
          <h1 style={{ marginBottom: "0.75rem" }}>{show.title}</h1>
          <p style={{ color: "#333", marginBottom: "1rem" }}>{show.description}</p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a
              href="https://podcasts.apple.com/us/podcast/the-rockstar-cmo-fin-marketing-podcast/id1491934161"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Listen on Apple Podcasts
            </a>
            <a
              href="https://open.spotify.com/show/3FwxIXY3flUhPjG5xBJREH"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Listen on Spotify
            </a>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "1.25rem" }}>Latest Episodes</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {latest.map((ep) => (
          <Link
            key={ep.slug}
            href={`/episodes/${ep.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {ep.image && (
              <img
                src={ep.image}
                alt={ep.title}
                width={250}
                height={250}
                style={{ borderRadius: "8px", objectFit: "cover", width: "100%", height: "auto", marginBottom: "0.75rem" }}
              />
            )}
            <h3 style={{ marginBottom: "0.25rem" }}>{ep.title}</h3>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>{formatDate(ep.pubDate)}</p>
          </Link>
        ))}
      </div>

      <Link href="/episodes" className="btn-primary">
        All Episodes
      </Link>
    </main>
  );
}
