import { NextRequest, NextResponse } from "next/server";
import { GWANGIN_LOGO_LINKS } from "@/lib/gwangin-links";

const ALLOWED_LOGO_LINKS = new Set<string>(GWANGIN_LOGO_LINKS);

export function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("to");

  if (!target || !ALLOWED_LOGO_LINKS.has(target)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL(target));
}
