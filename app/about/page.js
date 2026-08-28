// app/about/page.js
import Link from "next/link";

export const metadata = {
  title: "About | Rockstar CMO",
  description:
    "Founded in 2018, our jam is to share our marketing street knowledge to help ambitious CEOs, CMOs, marketing leaders and founders grow their start-up or established B2B businesses.",
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>About Rockstar CMO</h1>

      <div style={{ maxWidth: "var(--prose-width)" }}>
        <p>
          Founded in 2018, our jam is to share our marketing street knowledge to help ambitious
          CEOs, CMOs, marketing leaders and founders grow their start-up or established B2B
          businesses.
        </p>
        <p>
          We call it &ldquo;street knowledge&rdquo; as it comes hard-earned from decades of
          experience of actually doing it, with a hat tip to bosses, mentors, clients, colleagues,
          and the occasional f&rsquo;up that taught us these lessons.
        </p>
        <p>
          We share this through our podcast, newsletter, and blog &ndash; and if you&rsquo;d like
          to chat about anything we discuss, please{" "}
          <Link href="/contact" className="blog-hover-red">
            get in touch
          </Link>
          .
        </p>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", margin: "3rem 0" }} />

      {/* Two column: host bio on the left, headshot on the right -- same
          grayscale/contrast image treatment used for the homepage hero and
          blog photos, for visual consistency across the site. */}
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 400px" }}>
          <h2>Your Host: Ian Truscott</h2>
          <p>
            I&rsquo;m a B2B technology marketing leader, CMO, and mentor who believes
            marketing&rsquo;s true mission is to create ART &mdash; Awareness, Revenue, and Trust.
            I&rsquo;ve spent 25 years helping tech companies grow, and the marketers who lead them
            find their footing.
          </p>
          <p>I try to do all of it with a smile and a cup of tea.</p>
          <a
            href="https://iantruscott.com"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-hover-red"
            style={{ fontWeight: 600 }}
          >
            Learn more about me &rarr;
          </a>
        </div>
        <div style={{ flex: "1 1 280px", maxWidth: "340px" }}>
          <img
            src="/images/about/ian-headshot.jpg"
            alt="Ian Truscott"
            width={668}
            height={668}
            className="blog-image"
            style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
          />
        </div>
      </div>
    </main>
  );
}
