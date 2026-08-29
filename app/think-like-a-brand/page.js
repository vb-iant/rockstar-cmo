// app/think-like-a-brand/page.js
//
// Bespoke landing page for the "Think Like a Brand" podcast mini-series
// (9 episodes with Ian Truscott + Liz High), same treatment as the Long
// Play pages: hand-built narrative content, not the generic tag-index
// mechanism (episodes aren't part of that system, and this page has real
// bio/book/links content beyond an auto-generated list). Width follows
// the Long Play page's convention -- content runs the full page-width,
// no extra prose-width narrowing -- rather than mixing narrow text with
// a wider grid.
//
// Episode titles/descriptions/images are pulled live from
// content/episodes.json (written by scripts/fetch-episodes.mjs at build
// time) via the slug list below, so the copy can't drift out of sync
// with the podcast feed -- only the curated slug list needs maintaining
// if more episodes are ever added to the mini-series.

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import PlatformBadges from "../../components/PlatformBadges";
import { formatDuration } from "../../lib/formatDuration";

export const metadata = {
  title: "Think Like a Brand | Rockstar CMO",
  description:
    "A special podcast mini-series: Ian Truscott and author Liz High dive into her book \u201cThink Like a Brand, Not a Bank\u201d and its five growth principles.",
};

const EPISODE_SLUGS = [
  "think-like-a-brand-special-1-intro-and-the-drug-of-choice",
  "think-like-a-brand-2-sometimes-do-the-counter-intuitive-thing",
  "think-like-a-brand-3-embrace-tension-and-create-contradictions",
  "think-like-a-brand-4-cue-the-remix",
  "think-like-a-brand-5-product-aint-what-it-used-to-be",
  "think-like-a-brand-6-coach-and-compose",
  "think-like-a-brand-7-what-happened-to-marcus",
  "think-like-a-brand-8-coach-and-compose-with-ramen-noodles",
  "think-like-a-brand-9-brand-is-the-business-case",
];

function loadEpisodes() {
  const filePath = path.join(process.cwd(), "content", "episodes.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw).episodes;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ThinkLikeABrandPage() {
  const allEpisodes = loadEpisodes();
  const bySlug = new Map(allEpisodes.map((ep) => [ep.slug, ep]));
  const episodes = EPISODE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <img
        src="/images/think-like-a-brand/tlab-promo-square.jpg"
        alt="Think Like a Brand"
        className="blog-image"
        style={{
          width: "100%",
          maxHeight: "360px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          display: "block",
        }}
      />

      <h1 style={{ marginBottom: "0.25rem" }}>Think Like a Brand</h1>
      <p
        style={{
          fontFamily: "var(--font-bevan), Georgia, serif",
          color: "#666",
          marginBottom: "1.5rem",
        }}
      >
        Mini Podcast Series
      </p>

      <p>
        In this special podcast mini-series, Ian Truscott and author{" "}
        <a href="https://www.linkedin.com/in/lizhigh/" className="blog-hover-red">
          Liz High
        </a>{" "}
        &mdash; insight ninja, marketing strategist, speaker and author &mdash; dive into her
        book &ldquo;Think Like a Brand, Not a Bank.&rdquo;
      </p>
      <p>
        Written with her co-author Allison Netzer, based on their experience working with startup
        and growth FinTechs, banks and credit unions, they developed five growth principles for
        thinking like a brand. Across nine episodes, Ian and Liz work through each principle
        &mdash; and round things off with a look at how a real-world brand, Marcus by Goldman
        Sachs, put them to the test.
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
          margin: "2.5rem 0",
        }}
      >
        <img
          src="/images/think-like-a-brand/liz-high.png"
          alt="Liz High"
          width={317}
          height={374}
          className="blog-image"
          style={{ width: "180px", height: "auto", borderRadius: "8px", flexShrink: 0 }}
        />
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginTop: 0 }}>Liz High</h2>
          <p>
            Liz High is an insight ninja, marketing strategist, speaker and author who has worked
            in virtually every industry on both the client and agency side, using data-driven
            insight to help shape content, campaigns and brand value. Her clients have included
            tech giants Microsoft, Dell and Amazon, and entertainment heavyweight HBO.
          </p>
          <p>
            Her passion and consulting practice are now focused on supporting startup and growth
            FinTechs, banks and credit unions to innovate, embrace brand thinking, and tell
            resonant stories that drive growth &mdash; and with co-author Allison Netzer, she&rsquo;s
            written a book about it.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <p style={{ color: "#333" }}>
            In Think Like a Brand, Not a Bank, Allison Netzer and Liz High show banks and credit
            unions how to embrace their brand and reap the benefits. By introducing their five
            principles for growth, you&rsquo;ll learn how to shift your mindset, apply each
            principle, and utilize branding strategies for sustainable growth. With data-rich
            insight and real-life examples, it&rsquo;s a compelling look at how financial
            institutions can build value now and create a roadmap for the future.
          </p>
        </div>
        <img
          src="/images/think-like-a-brand/book-graphic.jpg"
          alt="Think Like a Brand, Not a Bank"
          className="blog-image"
          style={{
            width: "280px",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        />
      </div>

      <h2 style={{ marginBottom: "1.5rem" }}>All the episodes</h2>

      <div className="card-grid-3" style={{ marginBottom: "3rem" }}>
        {episodes.map((ep) => (
          <div key={ep.slug}>
            {ep.image && (
              <Link href={`/episodes/${ep.slug}`}>
                <img
                  src={ep.image}
                  alt={ep.title}
                  width={500}
                  height={500}
                  className="index-card-image"
                />
              </Link>
            )}
            <Link
              href={`/episodes/${ep.slug}`}
              className="blog-hover-red"
              style={{ textDecoration: "none" }}
            >
              <h3 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{ep.title}</h3>
            </Link>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {formatDate(ep.pubDate)}
              {ep.duration ? ` \u00b7 ${formatDuration(ep.duration)}` : ""}
            </p>
            <p style={{ color: "#333", marginBottom: "0.5rem" }}>{ep.description}</p>
            <Link href={`/episodes/${ep.slug}`} className="blog-hover-red" style={{ fontWeight: 600 }}>
              Listen &rarr;
            </Link>
          </div>
        ))}
      </div>

      <div className="two-col-section" style={{ paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
        <div>
          <h2>The Links</h2>
          <ul>
            <li>
              Ian Truscott on{" "}
              <a href="https://www.linkedin.com/in/iantruscott/" className="blog-hover-red">
                LinkedIn
              </a>{" "}
              and{" "}
              <a href="https://twitter.com/IanTruscott" className="blog-hover-red">
                Twitter
              </a>
            </li>
            <li>
              Liz High on{" "}
              <a href="https://www.linkedin.com/in/lizhigh/" className="blog-hover-red">
                LinkedIn
              </a>{" "}
              and{" "}
              <a href="https://twitter.com/LizzHighUK" className="blog-hover-red">
                Twitter
              </a>
            </li>
            <li>
              Liz High&rsquo;s book &mdash; on the web at{" "}
              <a href="https://thinklikeabrandbook.com/" className="blog-hover-red">
                Think Like a Brand Not a Bank
              </a>{" "}
              and on Twitter{" "}
              <a href="https://twitter.com/Brand_B4_Bank" className="blog-hover-red">
                @Brand_B4_Bank
              </a>
            </li>
            <li>
              You can also buy it{" "}
              <a href="https://amzn.to/3SLM5wu" className="blog-hover-red">
                on Amazon
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2>Follow Rockstar CMO FM</h2>
          <p>On all good podcast apps, including:</p>
          <PlatformBadges />
        </div>
      </div>
    </main>
  );
}
