import Script from "next/script";
import { Bevan, Domine, Special_Elite } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BigFooter from "../components/BigFooter";

const GTM_ID = "GTM-N6HHRZRR";

const bevan = Bevan({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bevan",
  display: "swap",
});

const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});

// Distressed typewriter face -- used only for the Dymo-tape title overlay
// on blog card images. Only ships in one weight (regular), but the worn,
// slightly uneven strokes read closer to old embossed label-maker tape
// than a clean modern monospace does.
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dymo",
  display: "swap",
});

export const metadata = {
  title: "Rockstar CMO",
  description: "Marketing wisdom for CMOs, one episode at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bevan.variable} ${domine.variable} ${specialElite.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <BigFooter />
        <Footer />
      </body>
    </html>
  );
}
