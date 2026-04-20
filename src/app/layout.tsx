import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
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
  description: "Sleduj lety živě na mapě. Real-time flight tracking pro střední Evropu — letadla, výšky, rychlosti, trasy.",
  keywords: ["flight tracker", "letadla live", "sledování letů", "mapa letadel", "ADS-B"],
  openGraph: {
    title: "FlyQueens · Track Every Flight",
    description: "Sleduj lety živě na mapě. Real-time flight tracking pro střední Evropu.",
    type: "website",
    locale: "cs_CZ",
    siteName: "FlyQueens",
    url: "https://www.flyqueens.cz",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "FlyQueens · Track Every Flight" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyQueens · Track Every Flight",
    description: "Real-time mapa letadel nad střední Evropou.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.flyqueens.cz"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlyQueens",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ url: "/icons/icon-512.png", sizes: "512x512" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",   // nutné pro env(safe-area-inset-*) na iOS
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
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "var(--midnight)", color: "var(--text-primary)" }} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SMFS92YP8L" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SMFS92YP8L');
        `}</Script>
      </body>
    </html>
  );
}
