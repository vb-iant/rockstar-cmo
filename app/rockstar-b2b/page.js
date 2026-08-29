// app/rockstar-b2b/page.js
//
// Replaces the old WordPress "Work with us" page (same URL, /rockstar-b2b,
// kept for continuity even though nothing links to it yet -- Ian wants it
// off the top nav for now). Copy is from the "Work with us" Notion page
// under Website Migration; the old page's inline photo is the hero image.
// New vs. the old page: a "The band" section profiling the advisory team
// (Ian + 3 associates), which didn't exist before.

import Link from "next/link";

export const metadata = {
  title: "Work With Us | Rockstar CMO",
  description:
    "Let us help you and your B2B business grow with our mentoring, consulting and advisory services.",
};

const HOW_WE_HELP = [
  "CMO coaching and mentoring",
  "Strategy and planning",
  "Capability review and gap analysis",
  "Martech assessment & selection",
  "Marketing operations advisory",
  "Campaign strategy",
  "Content Marketing",
  "Content Strategy",
  "Agency review",
  "Fractional marketing leadership",
];

const TEAM = [
  {
    name: "Ian Truscott",
    title:
      "Techie turned B2B Marketing Leader | Building Awareness, Revenue & Trust (ART) | Fractional CMO & Advisor for B2B Tech",
    image: "/images/about/ian-headshot.jpg",
    linkedin: "https://www.linkedin.com/in/iantruscott/",
  },
  {
    name: "Jeff Clark",
    title:
      "Independent marketing consultant with extensive experience running high tech marketing teams and was Principal Analyst at Forrester Research.",
    image: "/images/rockstar-b2b/jeff-clark.jpg",
    linkedin: "https://www.linkedin.com/in/jjclark08/",
  },
  {
    name: "Robert Rose",
    title:
      "Creative marketing leader \u2014 clear thinking, bold storytelling, real business results. Bestselling author, keynote speaker, trusted marketing guide.",
    image: "/images/rockstar-b2b/robert-rose.jpg",
    linkedin: "https://www.linkedin.com/in/robrose/",
  },
  {
    name: "Cathy McKnight",
    title:
      "Marketing Strategy & Operations Advisor | Content Orchestration Expert | Helping enterprise leaders and teams fix broken content and marketing systems.",
    image: "/images/rockstar-b2b/cathy-mcknight.jpg",
    linkedin: "https://www.linkedin.com/in/cathymcknight/",
  },
];

const half = Math.ceil(HOW_WE_HELP.length / 2);
const HOW_WE_HELP_COL_1 = HOW_WE_HELP.slice(0, half);
const HOW_WE_HELP_COL_2 = HOW_WE_HELP.slice(half);

export default function RockstarB2BPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Work With Us</h1>
      <p style={{ fontStyle: "italic", color: "#666", marginBottom: "1.5rem" }}>
        If you have a marketing problem, our band can solve it.
      </p>

      <img
        src="/images/rockstar-b2b/work-with-us-hero.jpg"
        alt="Work with us"
        className="blog-image"
        style={{
          width: "100%",
          maxHeight: "420px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          display: "block",
        }}
      />

      <p>
        Our jam is to share our marketing street knowledge to help ambitious CEOs, CMOs, marketing
        leaders and founders grow their start-up or established B2B businesses.
      </p>
      <p>
        We call it &ldquo;street knowledge&rdquo; as it comes hard-earned from decades of
        experience of actually doing it, with a hat tip to bosses, mentors, clients, colleagues
        and the occasional f&rsquo;up that taught us these lessons. This street knowledge will
        make a difference to you and your business.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>How we help</h2>
      <p>Our band has helped some cool CEOs and CMOs with the following:</p>

      <div className="two-col-section" style={{ marginBottom: "1.5rem" }}>
        <ul>
          {HOW_WE_HELP_COL_1.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul>
          {HOW_WE_HELP_COL_2.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p>Or we can just be a safe pair of extra hands when you need some help or advice.</p>

      <h2 style={{ marginTop: "2.5rem", marginBottom: "0.5rem" }}>The band</h2>
      <p style={{ marginBottom: "1.5rem" }}>Let us introduce you to our regulars:</p>

      <div className="card-grid" style={{ marginBottom: "2.5rem" }}>
        {TEAM.map((person) => (
          <div key={person.name}>
            <img
              src={person.image}
              alt={person.name}
              width={400}
              height={400}
              className="blog-image index-card-image"
            />
            <h3 style={{ marginBottom: "0.25rem", marginTop: 0 }}>{person.name}</h3>
            <p style={{ color: "#333", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
              {person.title}
            </p>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-hover-red"
              style={{ fontWeight: 600 }}
            >
              LinkedIn &rarr;
            </a>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          paddingTop: "2rem",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <Link href="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
          Get in touch
        </Link>
      </div>
    </main>
  );
}
