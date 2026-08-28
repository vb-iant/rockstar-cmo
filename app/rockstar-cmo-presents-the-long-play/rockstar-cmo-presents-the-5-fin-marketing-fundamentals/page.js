// app/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-the-5-fin-marketing-fundamentals/page.js
import Link from "next/link";
import PDFResource from "../../../components/PDFResource";
import SubscribeEmbed from "../../../components/SubscribeEmbed";
import WantAnLP from "../../../components/WantAnLP";

export const metadata = {
  title: "The 5 F\u2019in\u2019 Marketing Fundamentals | Rockstar CMO",
  description:
    "With all the noise, the acronyms, and the claims of thousands of marketing technology vendors, marketing can appear bloody complicated -- we distill it down to five fundamentals.",
};

export default function FiveFinFundamentalsPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Rockstar CMO Presents: The 5 F&rsquo;in&rsquo; Marketing Fundamentals</h1>

      <p>
        With all the noise, the acronyms, and the claims of thousands of marketing technology
        vendors, marketing can appear bloody complicated.
      </p>
      <p>
        Since the launch of Rockstar CMO, we&rsquo;ve been distilling down our decades of marketing
        experience into five marketing fundamentals to try and make things simple.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>The Long Play</h2>

      <PDFResource
        coverImage="/images/long-play/5-fin-fundamentals-cover.png"
        coverAlt="Rockstar CMO Presents: The 5 F'in' Marketing Fundamentals"
        downloadHref="/pdfs/long-play/5-fin-fundamentals.pdf"
        intro={[
          "We\u2019ve published them here in what we call a Long Play, for download, for free (no email).",
          "These fundamentals are not pulled from the latest self-published work from a marketing maven (or god forbid a \u201cninja\u201d), a TikFace influencer who\u2019s giddy on Gary Vee, or the dude (it\u2019s always dudes) with the shortcut to hustle harder, but has never done the work.",
          "This is marketing street knowledge, learned from bosses, mentors, clients, colleagues and the occasional screw-up from the hard-earned experience of actually doing it.",
        ]}
      />

      <h2>Like it?</h2>
      <p>
        If you feel bad that we are giving the good stuff away for free and ungated, why not
        subscribe to our newsletter (which is also free!) or maybe share what we&rsquo;ve created
        with your band.
      </p>
      <div style={{ margin: "1.25rem 0 2.5rem", maxWidth: "480px" }}>
        <SubscribeEmbed />
      </div>

      <h2>Can we help?</h2>
      <p>
        We&rsquo;ve provided advisory services to a range of successful B2B companies, their CEOs
        and CMOs. If you&rsquo;d like to chat about your challenge,{" "}
        <Link href="/contact" className="blog-hover-red">
          get in touch
        </Link>{" "}
        for a chat (also for free).
      </p>

      <WantAnLP />
    </main>
  );
}
