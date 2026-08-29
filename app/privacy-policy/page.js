// app/privacy-policy/page.js
export const metadata = {
  title: "Privacy Policy | Rockstar CMO",
  description: "How Rockstar CMO Ltd handles the personal information you share with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: "var(--prose-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>Privacy Policy</h1>

      <p>
        This notice describes how Rockstar CMO Ltd (&ldquo;we&rdquo; or &ldquo;us&rdquo;) handle the
        personal information that you may provide us with when transacting with us or visiting our
        website.
      </p>

      <h2>Your data protection rights</h2>
      <p>Under data protection law, you have rights including:</p>
      <ul>
        <li>Your right of access &ndash; You have the right to ask us for copies of your personal information.</li>
        <li>Your right to rectification &ndash; You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete.</li>
        <li>Your right to erasure &ndash; You have the right to ask us to erase your personal information in certain circumstances.</li>
        <li>Your right to restriction of processing &ndash; You have the right to ask us to restrict the processing of your personal information in certain circumstances.</li>
        <li>Your right to object to processing &ndash; You have the right to object to the processing of your personal information in certain circumstances.</li>
        <li>Your right to data portability &ndash; You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.</li>
        <li>You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.</li>
        <li>Please contact us, if you wish to make a request.</li>
      </ul>

      <h2>Contact Details</h2>
      <p>
        Rockstar CMO Ltd, 49 Greek Street, London, W1D 4EG or use our{" "}
        <a href="/contact">contact us form</a>.
      </p>

      <h2>The type of personal information we collect</h2>
      <p>We currently collect and process the following personal data:</p>
      <ul>
        <li>Name, email address and whatever you share on our contact us form</li>
        <li>Web session data (for example, IP address and browser) captured when visiting our website</li>
      </ul>

      <h2>Why do we collect data?</h2>
      <p>Most of the personal information we process is provided to us directly by you for one of the following reasons:</p>
      <ul>
        <li>Sales and marketing communications</li>
        <li>To be able to transact with us and engage our services</li>
        <li>To provide a better website experience</li>
        <li>To optimize our marketing and messaging</li>
      </ul>

      <h2>Legal basis</h2>
      <p>Under the UK General Data Protection Regulation (UK GDPR), the lawful bases we rely on for processing this information are:</p>
      <ul>
        <li>Your consent</li>
        <li>We have a contractual obligation</li>
        <li>We have a legal obligation</li>
        <li>We have a legitimate interest</li>
      </ul>
      <p>
        You can remove your consent at any time by unsubscribing from our email communications using
        the &lsquo;unsubscribe&rsquo; link in the communication or by emailing{" "}
        <a href="mailto:hello@rockstarcmo.com">hello@rockstarcmo.com</a>.
      </p>

      <h2>How do we store your personal information?</h2>
      <p>
        We store your information in our sales and marketing systems. We ensure that all systems
        enable compliance with GDPR and local privacy laws in the countries in which our clients are
        based.
      </p>

      <h2>Sharing your data</h2>
      <p>
        We do not share this data with any third party unless we are required by law or to complete a
        transaction you have authorized. This includes marketing partners in the case of a co-hosted
        event, provided your consent is obtained through the registration process. We may also share
        this data internally to fulfil the sales, marketing, and service activities listed above.
      </p>

      <h2>How to complain</h2>
      <p>
        If you have any concerns about our use of your personal information, you can make a complaint
        to us at the address above or by emailing{" "}
        <a href="mailto:hello@rockstarcmo.com">hello@rockstarcmo.com</a>.
      </p>
      <p>You can also complain to the ICO if you are unhappy with how we have used your data.</p>
      <ul>
        <li>Information Commissioner&rsquo;s Office &ndash; Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
        <li>Helpline number: 0303 123 1113</li>
        <li>ICO website: <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a></li>
      </ul>

      <h2>Any questions?</h2>
      <p>We respect your privacy and take seriously how we manage your data.</p>
      <p>
        If you have any questions or feedback on this policy, please{" "}
        <a href="/contact">get in touch</a>.
      </p>
    </main>
  );
}
