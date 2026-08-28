// app/contact/page.js
import ContactForm from "../../components/ContactForm";

export const metadata = {
  title: "Contact | Rockstar CMO",
  description: "Get in touch with Rockstar CMO -- for podcast feedback, advisory sessions, or just to say hello.",
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Contact Us</h1>

      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 340px", maxWidth: "var(--prose-width)" }}>
          <h2>Hello!</h2>
          <p>
            Vanilla Ice once said, &ldquo;And if there was a problem Yo, I&rsquo;ll solve
            it&rdquo; Although we are not Vanilla Ice, we like marketing problems.
          </p>
          <p>Or maybe you&rsquo;ve listened to our podcast and have a comment or suggestion?</p>
          <p>Or would you like to set up an advisory session?</p>
          <p>Connect with us on the socials or fill in our shiny new form, and we&rsquo;ll get back to you.</p>
          <img
            src="/images/contact/contact-hero.jpg"
            alt=""
            width={818}
            height={818}
            className="blog-image"
            style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px", display: "block", marginTop: "1.5rem" }}
          />
        </div>

        <div style={{ flex: "1 1 320px", maxWidth: "500px" }}>
          <h2>Ready to rock?</h2>
          <p>Drop in your deets..</p>
          {/* Switched to Web3Forms 2026-08-28 -- Ian moved off FormCrafts.
              See components/ContactForm.js for the actual form + submit logic. */}
          <ContactForm />
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", margin: "3rem 0 2rem" }} />

      <h2>The Socials</h2>
      <p>Let&rsquo;s face it, it&rsquo;s mainly LinkedIn; we don&rsquo;t do much on Twitter these days&hellip;</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <a href="https://www.linkedin.com/company/rockstar-cmo" target="_blank" rel="noopener noreferrer" className="platform-badge">
          LinkedIn
        </a>
        <a href="https://twitter.com/RockstarCMO" target="_blank" rel="noopener noreferrer" className="platform-badge">
          X
        </a>
      </div>
    </main>
  );
}
