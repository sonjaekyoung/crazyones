import Link from "next/link";
import { SITE, BLOG_URL } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-seam/40 bg-night/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={`${SITE.name} 홈`}
          className="font-display text-[1.35rem] uppercase tracking-[0.15em] text-bone transition-colors hover:text-parchment sm:text-2xl"
        >
          {SITE.name}
        </Link>

        <nav className="flex items-center gap-5 text-[0.96rem] text-ash sm:gap-8 sm:text-[1.08rem]">
          <Link
            href="/brothers"
            className="transition-colors hover:text-parchment"
          >
            광인 형제
          </Link>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-parchment"
          >
            블로그
          </a>
        </nav>
      </div>
    </header>
  );
}
