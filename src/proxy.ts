import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const EN_COUNTRIES = new Set(["US", "CA"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only act on the root path — already on /en or any other route: pass through
  if (pathname !== "/") {
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
