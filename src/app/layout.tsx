import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/UI/CookieConsent";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Živá mapa letadel nad Českem | FlyQueens",
  description: "Sledujte dostupná ADS-B data o letadlech nad Českem a okolím — polohu, výšku, rychlost a odhad trasy.",
  keywords: ["flight tracker", "letadla live", "sledování letů", "mapa letadel", "ADS-B"],
  openGraph: {
    title: "Živá mapa letadel nad Českem | FlyQueens",
    description: "Dostupná ADS-B data o letadlech nad Českem a okolím na interaktivní mapě.",
    type: "website",
    locale: "cs_CZ",
    siteName: "FlyQueens",
    url: "https://www.flyqueens.cz",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "FlyQueens — živá mapa letadel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Živá mapa letadel nad Českem | FlyQueens",
    description: "Dostupná ADS-B data o letadlech nad Českem a okolím.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "MAN4NfQiLcoRVR51idXywyLvfgE5YIfBNh6lnVFQBV0",
  },
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
      { url: "/icon.svg?v=20260911-2", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png?v=20260911-2", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png?v=20260911-2", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=20260911-2", sizes: "180x180" }],
    other: [{ url: "/icons/icon-512.png?v=20260911-2", sizes: "512x512" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080D",
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
      className={`h-full ${archivo.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-ibm-plex-sans), 'IBM Plex Sans', sans-serif", background: "var(--midnight)", color: "var(--text-primary)" }} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
        {/* GA se načítá uvnitř CookieConsent až po souhlasu (GDPR) */}
        <CookieConsent />
      </body>
    </html>
  );
}
