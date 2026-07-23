// app/newsletter/page.js
import { getNewsletterIssues } from "../../lib/newsletter";

// Matches the fetch()'s own `next.revalidate` window in lib/newsletter.js --
// keeping both in one place would require importing a shared constant, but
// this is small enough that keeping the number visible in both spots (with
// the comment pointing at the other) is clearer than an extra import.
export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Newsletter | Rockstar CMO",
  description: "The Beat by Rockstar CMO -- the newsletter.",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function NewsletterPage() {
  const { publication, issues } = await getNewsletterIssues(6);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {publication.image && (
          <img
            src={publication.image}
            alt={publication.title}
            width={200}
            height={200}
            style={{ borderRadius: "8px", objectFit: "cover", flexShrink: 0, width: "200px", height: "200px" }}
          />
        )}
        <div style={{ flex: "1 1 300px" }}>
          <h1 style={{ marginBottom: "0.75rem" }}>{publication.title || "Newsletter"}</h1>
          <p style={{ color: "#333", marginBottom: "1rem" }}>{publication.description}</p>
          {publication.link && (
            <a href={publication.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Subscribe on Beehiiv
            </a>
          )}
        </div>
      </div>

      <h2 style={{ marginBottom: "1.25rem" }}>Latest Issues</h2>

      <div className="card-grid-3" style={{ marginBottom: "2.5rem" }}>
        {issues.map((issue) => (
          <a
            key={issue.link}
            href={issue.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {issue.image && (
              <img src={issue.image} alt={issue.title} width={500} height={281} className="newsletter-card-image" />
            )}
            <h3 className="blog-hover-red" style={{ marginBottom: "0.25rem" }}>
              {issue.title}
            </h3>
            {issue.description && (
              <p style={{ color: "#333", fontSize: "0.95rem", margin: "0 0 0.35rem" }}>{issue.description}</p>
            )}
            <p style={{ color: "#666", fontSize: "0.85rem", margin: 0 }}>{formatDate(issue.pubDate)}</p>
          </a>
        ))}
      </div>

      {publication.link && (
        <a href={publication.link} target="_blank" rel="noopener noreferrer" className="blog-hover-red">
          Read more issues on Beehiiv &rarr;
        </a>
      )}
    </main>
  );
}
