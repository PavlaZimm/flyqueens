import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/UI/CookieConsent";
import "./globals.css";
import "leaflet/dist/leaflet.css";

// Fonty jsou self-hostované přes @font-face v globals.css (žádný next/font,
// žádný render-blocking požadavek na Google Fonts).

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
  // Canonical pro homepage — podstránky si nastavují vlastní přes alternates
  alternates: { canonical: "https://www.flyqueens.cz" },
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
      className="h-full"
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "var(--midnight)", color: "var(--text-primary)" }} suppressHydrationWarning>
        {/* Preload fontů — text se vykreslí bez čekání na objevení @font-face v CSS */}
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/syne-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/syne-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {children}
        <Analytics />
        <SpeedInsights />
        {/* GA se načítá uvnitř CookieConsent až po souhlasu (GDPR) */}
        <CookieConsent />
      </body>
    </html>
  );
}
