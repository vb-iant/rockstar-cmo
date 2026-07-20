// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #e5e5e5",
        padding: "1.25rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="/logo.webp"
            alt="Rockstar CMO"
            width={1906}
            height={435}
            style={{ height: "44px", width: "auto" }}
          />
        </Link>

        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontSize: "0.95rem",
            }}
          >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/episodes">Episodes</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
