// app/rockstar-cmo-presents-the-long-play/page.js
import Link from "next/link";
import SubscribeEmbed from "../../components/SubscribeEmbed";
import WantAnLP from "../../components/WantAnLP";

export const metadata = {
  title: "The Long Play | Rockstar CMO",
  description:
    "Free, ungated marketing eBooks from Rockstar CMO -- proper research, made beautiful, no email required.",
};

const longPlays = [
  {
    slug: "rockstar-cmo-presents-the-5-fin-marketing-fundamentals",
    title: "The 5 F\u2019in\u2019 Marketing Fundamentals",
    blurb:
      "With all the noise, the acronyms, and the claims of thousands of marketing technology vendors, marketing can appear bloody complicated. Since the launch of Rockstar CMO, we\u2019ve been distilling down our decades of marketing experience into five marketing fundamentals to try and make things simple.",
    image: "/images/long-play/5-fin-fundamentals-cover.png",
    cta: "Get the 5",
  },
  {
    slug: "rockstar-cmo-presents-the-employee-amplifier",
    title: "The Employee Amplifier",
    blurb:
      "In this Long Play, produced in partnership with our friends at Photofy, we explore Employee Created Content (ECC). It\u2019s proven to engage employees, is trusted by consumers craving authenticity and we share how you can build an employee amplifier and crank it up to 11!",
    image: "/images/long-play/employee-amplifier-cover.png",
    cta: "Engage!",
  },
  {
    slug: "rockstar-cmo-presents-content-wonderland-2",
    title: "Content Wonderland",
    blurb:
      "According to research by our friends at Sitecore there is a content crisis as 97% of marketers say content is their biggest concern. There is a place for these good people to go, we call it Content Wonderland, and in this Long Play we define 6 steps to get you to groove on there.",
    image: "/images/long-play/content-wonderland-cover.png",
    cta: "Boogie!",
  },
];

export default function LongPlayPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Rockstar CMO Presents: The Long Play</h1>

      <p>
        Sometimes a tune doesn&rsquo;t quite fit on a single track and we give it the full, long
        play, extended remix, album-length treatment.
      </p>
      <p>
        Our experienced marketing band does some proper research, the in-penthouse artists make it
        beautiful, and the result is something that is not your father&rsquo;s e-boring-book or an
        f&rsquo;in&rsquo; whitepaper, but something worth your time.
      </p>
      <p>And then we share them here for free. Completely free, and no email is required.</p>

      <div style={{ margin: "2rem 0 3rem", maxWidth: "480px" }}>
        <p style={{ fontStyle: "italic", marginBottom: "0.75rem", color: "#333" }}>
          But, if getting this good stuff for free feels wrong, subscribe to our newsletter and
          you&rsquo;ll feel better.
        </p>
        <SubscribeEmbed />
      </div>

      <div className="card-grid-3">
        {longPlays.map((lp) => (
          <Link
            key={lp.slug}
            href={`/rockstar-cmo-presents-the-long-play/${lp.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={lp.image} alt={lp.title} className="index-card-image" />
            <h3 className="blog-hover-red" style={{ marginBottom: "0.5rem" }}>
              {lp.title}
            </h3>
            <p style={{ color: "#333", fontSize: "0.95rem", marginBottom: "0.5rem" }}>{lp.blurb}</p>
            <span className="blog-hover-red" style={{ fontFamily: "var(--font-bevan), Georgia, serif" }}>
              {lp.cta} &rarr;
            </span>
          </Link>
        ))}
      </div>

      <blockquote
        style={{
          marginTop: "3rem",
          paddingLeft: "1.25rem",
          borderLeft: "3px solid var(--color-border)",
          color: "#333",
          fontStyle: "italic",
        }}
      >
        &ldquo;Love the layout of the eBook! Well done sir!!&rdquo;
        <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.9rem", color: "#666" }}>
          Michael Fraser, Avalanche Media Works
        </footer>
      </blockquote>

      <WantAnLP />
    </main>
  );
}
