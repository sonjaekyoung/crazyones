import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/records", label: "기록" },
  { href: "/members", label: "형제" },
  { href: "/join", label: "새로운 형제" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-seam/40 bg-night/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="광인회관 홈"
          className="group flex items-center gap-3"
        >
          <Image
            src="/logo/kuang.png"
            alt=""
            width={28}
            height={28}
            priority
            className="opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="font-display text-sm uppercase tracking-[0.25em] text-bone">
            광인회관
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-ash">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden transition-colors hover:text-bone sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/oath"
            className="rounded-full border border-seam px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-bone transition-all hover:border-gold hover:text-gold"
          >
            광인의 문
          </Link>
        </nav>
      </div>
    </header>
  );
}
