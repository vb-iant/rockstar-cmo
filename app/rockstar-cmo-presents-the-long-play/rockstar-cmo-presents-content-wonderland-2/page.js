// app/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-content-wonderland-2/page.js
import Link from "next/link";
import PDFResource from "../../../../components/PDFResource";
import SubscribeEmbed from "../../../../components/SubscribeEmbed";
import WantAnLP from "../../../../components/WantAnLP";

export const metadata = {
  title: "Content Wonderland | Rockstar CMO",
  description:
    "97% of marketers say content is their biggest concern -- take a tour of the 6 stops on the road to Content Wonderland.",
};

export default function ContentWonderlandPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Rockstar CMO Presents: Content Wonderland</h1>

      <p>
        According to research by our friends at Sitecore there is a content crisis as 97% of
        marketers say content is their biggest concern. There is a place for these good people to
        go, we call it Content Wonderland, and in this Long Play we define 6 steps to get you to
        groove on there.
      </p>
      <p>
        Sometimes a tune doesn&rsquo;t quite fit on a single track and we give it the full, long
        play, extended remix, album-length treatment.
      </p>
      <p>
        Our experienced marketing band does some proper research, the in-penthouse artists make it
        beautiful and the result is something that is not your father&rsquo;s e-boring-book, but
        something worth your time.
      </p>

      <h2 style={{ marginTop: "2.5rem" }}>Content Wonderland</h2>

      <PDFResource
        coverImage="/images/long-play/content-wonderland-cover.png"
        coverAlt="Rockstar CMO Presents: Content Wonderland"
        downloadHref="/pdfs/long-play/content-wonderland.pdf"
        intro={[
          "According to research from our chums at Sitecore, we have a content crisis and marketers have shared that it\u2019s their biggest concern. In this Long Play, we take a tour of the 6 stops on the road to content wonderland.",
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
