import { Bevan, Domine, Special_Elite } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
