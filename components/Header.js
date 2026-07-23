// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #e5e5e5",
        padding: "2rem 1.5rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--page-width)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <Link href="/" style={{ display: "inline-block" }}>
          <img
            src="/logo.webp"
            alt="Rockstar CMO"
            width={1906}
            height={435}
            style={{ height: "180px", width: "auto", maxWidth: "100%" }}
          />
        </Link>

        <nav>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontSize: "0.95rem",
            }}
          >
            <li><Link href="/" className="nav-link">Home</Link></li>
            <li><Link href="/podcast" className="nav-link">Podcast</Link></li>
            <li><Link href="/blog" className="nav-link">Blog</Link></li>
            <li><Link href="/newsletter" className="nav-link">Newsletter</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
