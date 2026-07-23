// app/admin/page.js
import Link from "next/link";

export const metadata = {
  title: "Admin | Rockstar CMO",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Admin</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        <a href="/admin/logout" className="blog-hover-red">
          Sign out
        </a>
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ marginBottom: "1rem" }}>
          <Link href="/admin/podcast" className="btn-primary">
            Refresh podcast feed
          </Link>
        </li>
        {/* Posts and Tags editors land here next. */}
      </ul>
    </main>
  );
}
