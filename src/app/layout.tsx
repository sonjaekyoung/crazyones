import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://crazyones.us";
const SITE_DESC =
  "미쳐야 미친다. 세상을 바꿀 수 있다고 믿는 형제들의 회관.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "광인회관 · Here’s to the Crazy Ones",
    template: "%s · 광인회관",
  },
  description: SITE_DESC,
  openGraph: {
    title: "광인회관",
    description: SITE_DESC,
    url: SITE_URL,
    siteName: "광인회관",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "광인회관",
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${cinzel.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-night text-bone antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
