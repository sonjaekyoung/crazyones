"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type Language } from "@/lib/language-context";

const LABELS = {
  ko: {
    about: "소개",
    seniors: "광인들",
    faq: "FAQ",
    contact: "문의하기",
    toggle: "EN",
    homeLabel: "광인회관 홈",
  },
  en: {
    about: "About",
    seniors: "Alumni",
    faq: "FAQ",
    contact: "Contact Us",
    toggle: "KO",
    homeLabel: "Gwangin Hall home",
  },
} satisfies Record<Language, Record<string, string>>;

export function SiteHeader() {
  const { language, toggleLanguage } = useLanguage();
  const labels = LABELS[language];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

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
          <button type="button" onClick={() => scrollTo("environment")} className="transition-colors hover:text-bone">
            {labels.about}
          </button>
          <button type="button" onClick={() => scrollTo("seniors")} className="transition-colors hover:text-bone">
            {labels.seniors}
          </button>
          <button type="button" onClick={() => scrollTo("faq")} className="transition-colors hover:text-bone">
            {labels.faq}
          </button>
          <a
            href="mailto:crazyones.us@gmail.com"
            className="ml-1 inline-flex items-center rounded-full bg-bone px-4 py-1.5 text-[0.82rem] font-semibold text-night transition-all duration-200 hover:bg-gold sm:ml-2 sm:px-5 sm:text-[0.88rem]"
          >
            {labels.contact}
          </a>
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
