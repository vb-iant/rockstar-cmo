// components/Footer.js
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e5e5",
        marginTop: "3rem",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-width)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.85rem",
          color: "#666",
        }}
      >
        <span>&copy; {new Date().getFullYear()} Rockstar CMO</span>
        <span>Marketing wisdom for CMOs, one episode at a time.</span>
      </div>
    </footer>
  );
}
