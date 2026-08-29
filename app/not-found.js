// app/not-found.js
import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Rockstar CMO",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: "var(--page-width)",
        margin: "0 auto",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-bevan), Georgia, serif",
          color: "#F22F29",
          fontSize: "5rem",
          lineHeight: 1,
          margin: "0 0 1rem",
        }}
      >
        404
      </p>
      <h1 style={{ marginBottom: "1rem" }}>This track doesn&rsquo;t exist</h1>
      <p
        style={{
          maxWidth: "var(--prose-width)",
          margin: "0 auto 2rem",
          color: "var(--color-text-muted)",
        }}
      >
        Looks like this page got left on the cutting room floor. It may have moved,
        been retired, or never existed in the first place.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/blog" className="btn-primary" style={{ backgroundColor: "#222" }}>
          Browse the Blog
        </Link>
        <Link href="/podcast" className="btn-primary" style={{ backgroundColor: "#222" }}>
          Listen to the Podcast
        </Link>
      </div>
    </main>
  );
}
