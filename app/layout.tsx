import "@fontsource-variable/inter";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ToTop } from "@/components/site/to-top";
import { LenisProvider } from "@/components/fx/lenis-provider";
import { ScrollProgress } from "@/components/fx/scroll-progress";
import { Grain } from "@/components/fx/grain";
import { Splash } from "@/components/fx/splash";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "PingMyBio — Your Bio, Now Intelligent.",
    template: "%s · PingMyBio",
  },
  description: SITE.description,
  applicationName: "PingMyBio",
  authors: [{ name: "PingMyBio" }],
  keywords: [
    "link in bio",
    "ai link in bio",
    "AI storefront",
    "creator economy",
    "linktree alternative",
    "stan store alternative",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "PingMyBio",
    title: "PingMyBio — Your Bio, Now Intelligent.",
    description: SITE.description,
    images: [
      {
        url: "/assets/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "PingMyBio — sonar ping arcs on black",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PingMyBio — Your Bio, Now Intelligent.",
    description: SITE.description,
  },
  icons: { icon: [{ url: "/assets/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PingMyBio",
  url: SITE.url,
  logo: `${SITE.url}/assets/favicon.svg`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <LenisProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <ToTop />
          <ScrollProgress />
          <Grain />
          <Splash />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
