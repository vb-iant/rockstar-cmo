// app/page.js
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../lib/posts";
import { getNewsletterIssues } from "../lib/newsletter";
import SubscribeEmbed from "../components/SubscribeEmbed";

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

// Shared 3-up teaser row for Podcast / Blog / Newsletter.
//
// variant="plain"   -- image (square or 16:9 per imageClassName), title below,
//                      byline + excerpt. Used for Podcast and Newsletter.
// variant="overlay" -- the blog index page's dymo-tape treatment: title
//                      overlaid directly on the image. Used for Blog, to
//                      match /blog exactly per Ian's steer.
function ContentRow({ items, imageClassName = "index-card-image", imageWidth = 500, imageHeight = 500, variant = "plain" }) {
  return (
    <div className="card-grid-3" style={{ marginBottom: "1.5rem" }}>
      {items.map((item) => {
        const TitleWrap = item.external ? "a" : Link;
        const titleProps = item.external
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : { href: item.href };

        if (variant === "overlay") {
          return (
            <div key={item.key}>
              {item.image && (
                <TitleWrap {...titleProps} className="dymo-label-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={imageWidth}
                    height={imageHeight}
                    className={imageClassName}
                  />
                  <h4 className="dymo-label">
                    <span className="dymo-label-text dymo-label-text-compact">{item.title}</span>
                  </h4>
                </TitleWrap>
              )}
              {(item.byline || item.date) && (
                <p style={{ color: "#666", fontSize: "0.85rem", margin: "0.5rem 0 0.4rem" }}>
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
        }

        return (
          <div key={item.key}>
            {item.image && (
              <TitleWrap {...titleProps} style={{ textDecoration: "none" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  width={imageWidth}
                  height={imageHeight}
                  className={imageClassName}
                />
              </TitleWrap>
            )}
            <TitleWrap {...titleProps} style={{ textDecoration: "none", color: "inherit" }}>
              <h4 className="blog-hover-red" style={{ marginBottom: "0.25rem" }}>
                {item.title}
              </h4>
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
        <h3 style={{ marginBottom: "0.5rem" }}>Podcast</h3>
        <p style={{ color: "#333", marginBottom: "1.25rem", maxWidth: "var(--prose-width)" }}>
          Does the world need another f&rsquo;in&rsquo; marketing podcast? Our host and 4xCMO Ian
          Truscott asked this in 2020, and the world said &ldquo;no&rdquo;, but he did it anyway.
        </p>
        {/* Square, matching the original podcast art (source images are
            themselves 3000x3000) -- imageWidth/imageHeight kept equal so the
            intrinsic HTML attributes agree with the CSS aspect-ratio. */}
        <ContentRow items={episodeItems} imageWidth={500} imageHeight={500} />
        <Link href="/podcast" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All episodes &rarr;
        </Link>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Blog</h3>
        <p style={{ color: "#333", marginBottom: "1.25rem", maxWidth: "var(--prose-width)" }}>
          Contributions from our regular podcast guests and across the Rockstar CMO community.
        </p>
        <ContentRow
          items={postItems}
          imageClassName="blog-image index-card-image"
          imageWidth={500}
          imageHeight={500}
          variant="overlay"
        />
        <Link href="/blog" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All posts &rarr;
        </Link>
      </section>

      <section style={{ marginBottom: "4rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>The Beat Newsletter</h3>
        <p style={{ color: "#333", marginBottom: "1.25rem", maxWidth: "var(--prose-width)" }}>
          Join our incredible rockstar CMO community and get our marketing street knowledge
          straight into your inbox.
        </p>
        {/* Landscape 16:9 -- imageWidth/imageHeight set to a true 16:9 pair
            (not the 500x500 used above) so the intrinsic size matches the
            .newsletter-card-image CSS aspect-ratio exactly. */}
        <ContentRow items={issueItems} imageClassName="newsletter-card-image" imageWidth={560} imageHeight={315} />
        <Link href="/newsletter" className="blog-hover-red" style={{ fontWeight: 600 }}>
          All issues &rarr;
        </Link>
      </section>

      {/* Stay in touch: red CTA block per the copy doc. */}
      <div
        style={{
          backgroundColor: "#F22F29",
          color: "#fff",
          borderRadius: "8px",
          padding: "2.5rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#fff" }}>Stay in touch</h2>
        <p style={{ maxWidth: "480px", margin: "0 auto 1.5rem" }}>
          Sharing the latest from here and around our community with a couple of hundred of our
          closest friends.
        </p>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <SubscribeEmbed />
        </div>
      </div>
    </main>
  );
}
