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
          maxWidth: "760px",
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
            style={{ height: "110px", width: "auto", maxWidth: "100%" }}
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
