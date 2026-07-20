// app/episodes/page.js
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

const PER_PAGE = 10;

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
  title: "Episodes | Rockstar CMO",
  description: "Browse all episodes of the Rockstar CMO podcast.",
};

export default function EpisodesIndex({ searchParams }) {
  const { episodes } = loadEpisodes();

  const pageParam = parseInt(searchParams?.page ?? "1", 10);
  const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = Math.max(1, Math.ceil(episodes.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const start = (safePage - 1) * PER_PAGE;
  const pageEpisodes = episodes.slice(start, start + PER_PAGE);

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Episodes</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pageEpisodes.map((ep) => (
          <li key={ep.slug} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #e5e5e5" }}>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {ep.image && (
                <img
                  src={ep.image}
                  alt={ep.title}
                  width={150}
                  height={150}
                  style={{ borderRadius: "8px", objectFit: "cover", flexShrink: 0, width: "150px", height: "150px" }}
                />
              )}
              <div>
                <h2 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{ep.title}</h2>
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {formatDate(ep.pubDate)}
                  {ep.duration ? ` · ${ep.duration}` : ""}
                </p>
                <p style={{ color: "#333", marginBottom: "0.5rem" }}>{ep.description}</p>
                <Link href={`/episodes/${ep.slug}`} style={{ fontWeight: 600 }}>
                  Read more &rarr;
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {safePage > 1 ? (
          <Link href={`/episodes?page=${safePage - 1}`}>&larr; Newer</Link>
        ) : (
          <span />
        )}
        <span style={{ color: "#666" }}>
          Page {safePage} of {totalPages}
        </span>
        {safePage < totalPages ? (
          <Link href={`/episodes?page=${safePage + 1}`}>Older &rarr;</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
