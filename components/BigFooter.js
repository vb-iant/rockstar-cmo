// components/BigFooter.js
//
// The dark, three-column footer from the old WordPress site (nav / quotes /
// subscribe+connect+contact). Sits above the slim white copyright bar in
// components/Footer.js, which is unchanged and still renders beneath this.
//
// Nav list is a curated, hand-picked set (not auto-generated from every
// series tag) -- mirrors the old site's footer picks, with Ian's 2026-08-29
// changes: Street Knowledge now points straight at /blog (its old category
// archive is gone), Back Issues is replaced by Newsletter and moved to the
// 3rd slot, and Work with Us (/rockstar-b2b) is added before Say Hello!,
// which stays last. No Velocity B logo -- dropped per Ian's request.

import Link from "next/link";
import SubscribeEmbed from "./SubscribeEmbed";

const FOOTER_NAV = [
  { label: "Street Knowledge", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "The Long Plays", href: "/rockstar-cmo-presents-the-long-play" },
  { label: "Backstage", href: "/tags/series/backstage" },
  { label: "The Swimming Pool", href: "/tags/series/the-swimming-pool" },
  { label: "Tales from the Tour Bus", href: "/tags/series/tales-from-the-tour-bus" },
  { label: "Think Like a Brand", href: "/think-like-a-brand" },
  { label: "Work with Us", href: "/rockstar-b2b" },
  { label: "Say Hello!", href: "/contact" },
];

const QUOTES = [
  {
    text: "Marketing is telling the world you\u2019re a rock star. Content marketing is showing the world you are one.",
    author: "Robert Rose",
  },
  {
    text: "Marketing is no longer about the stuff that you make, but about the stories you tell.",
    author: "Seth Godin",
  },
  {
    text: "Yes! But, you can't just say it, man. You've gotta feel it in your blood and guts! If you wanna rock...",
    author: "Dewey Finn \u2013 School of Rock",
  },
  {
    text: "I\u2019m not doing this to be a popstar. I\u2019ve had plenty of money and attention. I\u2019m doing this for credibility.",
    author: "Lisa Marie Presley",
  },
];

export default function BigFooter() {
  return (
    <div className="big-footer">
      <div className="big-footer-inner">
        <div className="big-footer-col">
          <h3 className="big-footer-heading">Features</h3>
          <ul className="big-footer-nav">
            {FOOTER_NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="big-footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="big-footer-col">
          {QUOTES.map((q, i) => (
            <blockquote className="big-footer-quote" key={i}>
              <p>&ldquo;{q.text}&rdquo;</p>
              <cite>{q.author}</cite>
            </blockquote>
          ))}
        </div>

        <div className="big-footer-col">
          <h3 className="big-footer-heading">Subscribe</h3>
          <p className="big-footer-subscribe-copy">
            Join hundreds of your peers and get your weekly hit of marketing
            street knowledge.
          </p>
          <SubscribeEmbed />

          <h3 className="big-footer-heading big-footer-heading-spaced">Connect</h3>
          <ul className="big-footer-connect">
            <li>
              <a href="https://twitter.com/RockstarCMO" className="big-footer-link" target="_blank" rel="noopener noreferrer">
                X
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/rockstar-cmo" className="big-footer-link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@rockstarcmo.com" className="big-footer-link">
                Email
              </a>
            </li>
          </ul>

          <Link href="/contact" className="btn-primary big-footer-contact-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
