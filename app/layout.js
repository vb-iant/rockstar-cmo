import { Bevan, Domine } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Rockstar CMO",
  description: "Marketing wisdom for CMOs, one episode at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bevan.variable} ${domine.variable}`}>
      <body>{children}</body>
    </html>
  );
}
