import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: SITE.alternateName,
  description: SITE.descriptionEn,
  alternates: {
    canonical: "/en",
    languages: {
      "ko-KR": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: `${SITE.alternateName} · ${SITE.name}`,
    description: SITE.descriptionEn,
    url: "/en",
    locale: "en_US",
    alternateLocale: "ko_KR",
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
