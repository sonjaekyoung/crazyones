import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/nav/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import { SITE } from "@/config/site";
import { SiteJsonLd } from "@/components/seo/site-json-ld";

const griun = localFont({
  src: "./fonts/Griun_PolSensibility-Rg.ttf",
  variable: "--font-griun",
  display: "swap",
  weight: "400",
});

const gowun = Gowun_Batang({
  variable: "--font-gowun",
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  verification: {
    google: "9zvVDtdrDphvWZ_kNQHNbu5eWu56J9rZnskeyVvaxOk",
    other: {
      "naver-site-verification": "3a2c7b5a7cf8c9c786b2ade1791bad008bc6d8e9",
    },
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    alternateLocale: "en_US",
    type: "website",
    images: [
      {
        url: SITE.logo,
        width: 400,
        height: 400,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.logo],
  },
  icons: {
    icon: SITE.logo,
    apple: SITE.logo,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${griun.variable} ${gowun.variable} h-full`}
    >
      <body className="min-h-full overflow-x-hidden bg-night text-bone antialiased">
        <SiteJsonLd />
        <LanguageProvider>
          <SiteHeader />
          <main className="relative z-0 min-h-screen bg-night">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
