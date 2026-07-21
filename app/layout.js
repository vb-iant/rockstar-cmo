import { Bevan, Domine, Space_Mono } from "next/font/google";
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

// Bold monospace -- used only for the Dymo-tape title overlay on blog card
// images. Monospaced + heavy gives the blocky, evenly-spaced look of real
// embossed label-maker tape, which the display serif (Bevan) doesn't.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-dymo",
  display: "swap",
});

export const metadata = {
  title: "Rockstar CMO",
  description: "Marketing wisdom for CMOs, one episode at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bevan.variable} ${domine.variable} ${spaceMono.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
