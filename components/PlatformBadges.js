// components/PlatformBadges.js

const APPLE_URL =
  "https://podcasts.apple.com/us/podcast/the-rockstar-cmo-fin-marketing-podcast/id1491934161";
const SPOTIFY_URL = "https://open.spotify.com/show/3FwxIXY3flUhPjG5xBJREH";

export default function PlatformBadges() {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <a href={APPLE_URL} target="_blank" rel="noopener noreferrer" className="platform-badge">
        Apple Podcasts
      </a>
      <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="platform-badge">
        Spotify
      </a>
    </div>
  );
}
