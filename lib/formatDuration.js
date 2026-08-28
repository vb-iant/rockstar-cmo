// lib/formatDuration.js
//
// Megaphone's itunes:duration field is inconsistent across episodes --
// sometimes raw seconds ("2080"), sometimes already "H:MM:SS" or "MM:SS".
// Normalize both into a clean "MM:SS" / "H:MM:SS" display string.
export function formatDuration(duration) {
  if (duration === null || duration === undefined || duration === "") return "";

  const str = String(duration).trim();

  // Already formatted (contains a colon) -- pass through as-is.
  if (str.includes(":")) return str;

  const totalSeconds = parseInt(str, 10);
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return str;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}
