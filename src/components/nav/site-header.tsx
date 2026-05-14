"use client";

import Image from "next/image";
import Link from "next/link";
import { BLOG_URL } from "@/config/site";
import { useLanguage, type Language } from "@/lib/language-context";

const LABELS = {
  ko: {
    brothers: "\ud615\uc81c\ub4e4",
    media: "\ubbf8\ub514\uc5b4",
    about: "\uc18c\uac1c",
    toggle: "EN",
    homeLabel: "\uad11\uc778\ud68c\uad00 \ud648",
  },
  en: {
    brothers: "Brothers",
    media: "Media",
    about: "About",
    toggle: "KO",
    homeLabel: "Gwangin Hall home",
  },
} satisfies Record<Language, Record<string, string>>;

export function SiteHeader() {
  const { language, toggleLanguage } = useLanguage();
  const labels = LABELS[language];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.72)_18%,rgba(0,0,0,0.50)_42%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0)_100%)]"
      />
      <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between">
        <Link
          href="/"
          aria-label={labels.homeLabel}
          className="group flex h-14 w-20 items-center justify-center overflow-hidden rounded-sm transition-opacity hover:opacity-85"
        >
          <Image
            src="/logo/header-logo.png"
            alt=""
            width={90}
            height={72}
            priority
            className="h-10 w-auto max-w-none object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
          />
        </Link>

        <nav className="flex items-center gap-4 text-[0.96rem] text-bone/72 drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)] sm:gap-7 sm:text-[1.08rem]">
          <Link
            href="/brothers"
            className="transition-colors hover:text-bone"
          >
            {labels.brothers}
          </Link>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-bone"
          >
            {labels.media}
          </a>
          <Link href="/#about" className="transition-colors hover:text-bone">
            {labels.about}
          </Link>
          <button
            type="button"
            aria-label="Toggle language"
            onClick={toggleLanguage}
            className="ml-1 rounded-full border border-bone/18 px-3 py-1 text-[0.76rem] tracking-[0.18em] text-bone/62 transition hover:border-bone/35 hover:text-bone sm:ml-2"
          >
            {labels.toggle}
          </button>
        </nav>
      </div>
    </header>
  );
}
