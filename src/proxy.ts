import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EN_COUNTRIES = new Set(["US", "CA"]);

// Google crawls mostly from the US. An IP redirect would hide the Korean
// homepage, which is the page that should rank for "광인회관".
const CRAWLER =
  /googlebot|google-inspectiontool|storebot-google|adsbot-google|bingbot|duckduckbot|baiduspider|yandex|yeti|ads-naver|blueno|applebot|slurp|facebookexternalhit|twitterbot|linkedinbot|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|anthropic-ai|bytespider/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only act on the root path — already on /en or any other route: pass through
  if (pathname !== "/") {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (CRAWLER.test(userAgent)) {
    return NextResponse.next();
  }

  // Vercel sets this header at the edge; absent in local dev (gracefully ignored)
  const country = request.headers.get("x-vercel-ip-country") ?? "";

  if (EN_COUNTRIES.has(country.toUpperCase())) {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, { status: 302 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
