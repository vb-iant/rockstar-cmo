// app/admin/access-denied/page.js
export const metadata = {
  title: "Access denied | Rockstar CMO",
  robots: { index: false, follow: false },
};

export default function AccessDeniedPage() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      <h1>Access denied</h1>
      <p style={{ color: "#333" }}>
        This admin area is restricted to a single GitHub account. If this is your site, sign in
        with the GitHub account it's configured for.
      </p>
    </main>
  );
}
