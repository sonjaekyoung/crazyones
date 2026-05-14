import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gowun_Batang } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteFooter } from "@/components/nav/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import { SITE } from "@/config/site";

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
    default: `${SITE.name} · Here’s to the Crazy Ones`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
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
        <LanguageProvider>
          <SiteHeader />
          <main className="relative z-0 min-h-screen bg-night">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
