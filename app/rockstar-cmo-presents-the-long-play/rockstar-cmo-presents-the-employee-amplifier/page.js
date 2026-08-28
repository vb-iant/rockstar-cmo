// app/rockstar-cmo-presents-the-long-play/rockstar-cmo-presents-the-employee-amplifier/page.js
import Link from "next/link";
import PDFResource from "../../../../components/PDFResource";
import SubscribeEmbed from "../../../../components/SubscribeEmbed";
import WantAnLP from "../../../../components/WantAnLP";

export const metadata = {
  title: "The Employee Amplifier | Rockstar CMO",
  description:
    "Employee Created Content (ECC) is proven to engage employees and is trusted by consumers craving authenticity -- how to crank the employee amplifier up to 11.",
};

export default function EmployeeAmplifierPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Rockstar CMO Presents: The Employee Amplifier</h1>

      <p>
        In this long play, produced in partnership with our friends at Photofy, we explore Employee
        Created Content (ECC). It&rsquo;s proven to engage employees, is trusted by consumers
        craving authenticity and we share how you can build an employee amplifier and crank it up
        to 11!
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

      <h2 style={{ marginTop: "2.5rem" }}>The Employee Amplifier</h2>

      <PDFResource
        coverImage="/images/long-play/employee-amplifier-cover.png"
        coverAlt="Rockstar CMO Presents: The Employee Amplifier"
        downloadHref="/pdfs/long-play/employee-amplifier.pdf"
        intro={[
          "Consumer trust in brands and their marketing is at an all-time low.",
          "And yet trust, once considered a soft business objective, is now recognized as being crucial to revenue as trusted brands perform.",
          "One tune that builds trust is sung by the employees, those sitting on the front row of the brand experience, and Employee Created Content (ECC) is topping the trust charts for consumers.",
          "Organizations need to nurture this, to build the Employee Amplifier, and then, in the immortal words of Spinal Tap, turn it up to 11.",
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
