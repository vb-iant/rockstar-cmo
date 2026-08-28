// app/page.js
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../lib/posts";
import { getNewsletterIssues } from "../lib/newsletter";

// Newsletter data is fetched at request time via ISR (see lib/newsletter.js) --
// matches the /newsletter page's own revalidate window so the two don't drift.
export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Rockstar CMO",
  description:
    "Our jam is to share our marketing street knowledge to help ambitious CEOs, CMOs, marketing leaders and founders grow their start-up or established B2B businesses.",
};

function loadEpisodes() {
  const filePath = path.join(process.cwd(), "content", "episodes.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Shared 3-up teaser row for Podcast / Blog / Newsletter -- same column
// shape (image, title, byline, excerpt) across all three, per the
// homepage copy doc's intent that these read as one consistent pattern.
function ContentRow({ items, imageClassName = "index-card-image" }) {
  return (
    <div className="card-grid-3" style={{ marginBottom: "1.5rem" }}>
      {items.map((item) => {
        const TitleWrap = item.external ? "a" : Link;
        const titleProps = item.external
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : { href: item.href };
        return (
          <div key={item.key}>
            {item.image && (
              <TitleWrap {...titleProps} style={{ textDecoration: "none" }}>
                <img src={item.image} alt={item.title} width={500} height={500} className={imageClassName} />
              </TitleWrap>
            )}
            <TitleWrap {...titleProps} style={{ textDecoration: "none", color: "inherit" }}>
              <h3 className="blog-hover-red" style={{ marginBottom: "0.25rem" }}>
                {item.title}
              </h3>
            </TitleWrap>
            {(item.byline || item.date) && (
              <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                {item.date}
                {item.date && item.byline && " \u00b7 "}
                {item.byline}
              </p>
            )}
            {item.excerpt && (
              <p style={{ color: "#333", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{item.excerpt}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default async function Home() {
  const { episodes } = loadEpisodes();
  const latestEpisodes = episodes.slice(0, 3);

  const posts = getAllPosts().slice(0, 3);

  const { issues } = await getNewsletterIssues(3);

  const episodeItems = latestEpisodes.map((ep) => ({
    key: ep.slug,
    href: `/episodes/${ep.slug}`,
    image: ep.image,
    title: ep.title,
    byline: "Rockstar CMO",
    date: formatDate(ep.pubDate),
    excerpt: ep.description,
  }));

  const postItems = posts.map((post) => ({
    key: post.slug,
    href: `/blog/${post.slug}`,
    image: post.image,
    title: post.title,
    byline: post.author,
    date: formatDate(post.date),
    excerpt: post.excerpt,
  }));

  const issueItems = issues.map((issue) => ({
    key: issue.link,
    href: issue.link,
    external: true,
    image: issue.image,
    title: issue.title,
    byline: issue.author,
    date: formatDate(issue.pubDate),
    excerpt: issue.description,
  }));

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Hero: two column -- copy on the left, photo on the right treated the
          same as blog images (grayscale + contrast, via .blog-image). */}
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "center", marginBottom: "4rem" }}>
        <div style={{ flex: "1 1 400px" }}>
          <h1>Our Jam</h1>
          <p style={{ fontWeight: 700 }}>
            Our jam is to share our marketing street knowledge to help ambitious CEOs, CMOs,
            marketing leaders and founders grow their start-up or established B2B businesses.
          </p>
          <p>
            We call it &ldquo;street knowledge&rdquo; as it comes hard-earned from decades of
            experience of <em>actually</em> doing it, with a hat tip to bosses, mentors, clients,
            colleagues, and the occasional f&rsquo;up that taught us these lessons.
          </p>
          <p>
            We share this through our podcast, newsletter, and blog &ndash; and if you&rsquo;d like
            to chat about anything we discuss, please get in touch.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
        <div style={{ flex: "1 1 280px", maxWidth: "340px" }}>
          <img
            src="/images/home/our-jam-hero.jpg"
            alt="Rockstar CMO"
            width={668}
            height={1000}
            className="blog-image"
            style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}
          />
        </div>
      </div>

      <h2 style={{ marginBottom: "2rem" }}>Street Knowledge</h2>

      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "1.25rem" }}>Podcast</h3>
        <ContentRow items={episodeItems} />
        <Link href="/podcast" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All episodes &rarr;
        </Link>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "1.25rem" }}>Blog</h3>
        <ContentRow items={postItems} imageClassName="blog-image index-card-image" />
        <Link href="/blog" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All posts &rarr;
        </Link>
      </section>

      <section>
        <h3 style={{ marginBottom: "1.25rem" }}>Newsletter</h3>
        <ContentRow items={issueItems} imageClassName="newsletter-card-image" />
        <Link href="/newsletter" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All issues &rarr;
        </Link>
      </section>
    </main>
  );
}
