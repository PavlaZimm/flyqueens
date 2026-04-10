import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlyQueens · Track Every Flight",
  description: "Sleduj lety živě na mapě — real-time flight tracking pro střední Evropu.",
  openGraph: {
    title: "FlyQueens · Track Every Flight",
    description: "Sleduj lety živě na mapě — real-time flight tracking pro střední Evropu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${syne.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "var(--midnight)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
