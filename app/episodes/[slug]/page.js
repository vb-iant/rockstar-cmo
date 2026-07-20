// app/episodes/[slug]/page.js
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformBadges from "../../../components/PlatformBadges";

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

// Pre-render every episode page at build time (fully static, no per-request work)
export function generateStaticParams() {
  const { episodes } = loadEpisodes();
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export function generateMetadata({ params }) {
  const { episodes } = loadEpisodes();
  const episode = episodes.find((ep) => ep.slug === params.slug);
  if (!episode) return {};
  return {
    title: `${episode.title} | Rockstar CMO`,
    description: episode.description,
  };
}

export default function EpisodePage({ params }) {
  const { episodes } = loadEpisodes();
  const episode = episodes.find((ep) => ep.slug === params.slug);

  if (!episode) {
    notFound();
  }

  return (
    <main style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link href="/episodes" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        &larr; All episodes
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {episode.image && (
          <img
            src={episode.image}
            alt={episode.title}
            width={250}
            height={250}
            style={{ borderRadius: "8px", objectFit: "cover", flexShrink: 0, width: "250px", height: "250px" }}
          />
        )}
        <div>
          <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{episode.title}</h1>
          <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
            {formatDate(episode.pubDate)}
            {episode.duration ? ` · ${episode.duration}` : ""}
            {episode.episodeNumber ? ` · Episode ${episode.episodeNumber}` : ""}
          </p>
        </div>
      </div>

      {episode.audioUrl && (
        <audio
          controls
          preload="none"
          src={episode.audioUrl}
          style={{ width: "100%", marginBottom: "1.25rem" }}
        >
          Your browser does not support the audio element.
        </audio>
      )}

      <div style={{ marginBottom: "2rem" }}>
        <PlatformBadges />
      </div>

      {episode.contentHtml ? (
        <div
          style={{ color: "#333", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: episode.contentHtml }}
        />
      ) : (
        <p style={{ color: "#333" }}>{episode.description}</p>
      )}
    </main>
  );
}
