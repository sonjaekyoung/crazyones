import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/preview", "/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
