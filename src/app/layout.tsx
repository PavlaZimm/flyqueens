import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/UI/CookieConsent";
import { socialMetadata } from "@/lib/socialMetadata";
import "./globals.css";

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
  // Mono je jen v drobných popiscích; nepřednačítat, ať nebrzdí hlavní text.
  preload: false,
});

export const metadata: Metadata = {
  title: "Sledování letů online: živá mapa letadel | FlyQueens",
  description: "Sledujte dostupná ADS-B data o letadlech ve vybraných oblastech Evropy: polohu, výšku, rychlost a dostupnou trasu.",
  authors: [{ name: "Pavla Zimmermannová", url: "https://www.linklady.cz/o-mne" }],
  creator: "Pavla Zimmermannová",
  publisher: "FlyQueens",
  keywords: ["flight tracker", "letadla live", "sledování letů", "mapa letadel", "ADS-B"],
  ...socialMetadata({
    title: "Sledování letů online: živá mapa letadel | FlyQueens",
    description: "Dostupná ADS-B data o letadlech ve vybraných oblastech Evropy na interaktivní mapě.",
    url: "https://www.flyqueens.cz",
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      suppressHydrationWarning
    >
      <head>
        <meta name="impact-site-verification" content="a3b0fde4-f8f0-4760-a162-47cc1a925d93" {...{ value: "a3b0fde4-f8f0-4760-a162-47cc1a925d93" }} />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('flyqueens-theme')==='light')document.documentElement.classList.add('light')}catch{}",
          }}
        />
      </head>
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
