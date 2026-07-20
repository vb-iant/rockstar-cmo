// app/page.js
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

export default function Home() {
  const { show, episodes } = loadEpisodes();
  const latest = episodes.slice(0, 5);

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <p style={{ color: "#333", fontSize: "1.1rem", marginBottom: "2rem" }}>
        {show.description}
      </p>

      <h2 style={{ marginBottom: "1.25rem" }}>Latest Episodes</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {latest.map((ep) => (
          <li
            key={ep.slug}
            style={{
              marginBottom: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {ep.image && (
                <Link href={`/episodes/${ep.slug}`} style={{ flexShrink: 0 }}>
                  <img
                    src={ep.image}
                    alt={ep.title}
                    width={120}
                    height={120}
                    style={{ borderRadius: "8px", objectFit: "cover", display: "block", width: "120px", height: "120px" }}
                  />
                </Link>
              )}
              <div>
                <h3 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{ep.title}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {formatDate(ep.pubDate)}
                </p>
                <Link href={`/episodes/${ep.slug}`} style={{ fontWeight: 600 }}>
                  Read more &rarr;
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/episodes" className="btn-primary">
        All Episodes
      </Link>
    </main>
  );
}
