import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const languages = {
  "ko-KR": SITE.url,
  "en-US": `${SITE.url}/en`,
  "x-default": SITE.url,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: "2026-11-26",
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE.url}/en`,
      lastModified: "2026-11-26",
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages },
    },
    {
      url: `${SITE.url}/brothers`,
      lastModified: "2026-11-26",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
