"use client";

import { BLOG_URL } from "@/config/site";
import { useLanguage, type Language } from "@/lib/language-context";

const CONTACT_EMAIL = "contact@crazyones.us";

const COPY = {
  ko: {
    motto: "\ubbf8\uccd0\uc57c \ubbf8\uce5c\ub2e4.",
    name: "\uad11\uc778\ud68c\uad00",
    location: "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub9c8\ud3ec\uad6c",
    mediaLabel: "\ubbf8\ub514\uc5b4\ub97c Substack\uc5d0\uc11c \uc5f4\uae30",
    kicker: "\uad11\uc778\ub4e4\uc5d0\uac8c",
  },
  en: {
    motto: "Only those crazy enough can arrive.",
    name: "Gwangin Hall",
    location: "Mapo-gu, Seoul",
    mediaLabel: "Open Media on Substack",
    kicker: "Here\u2019s to the Crazy Ones",
  },
} satisfies Record<Language, Record<string, string>>;

function SubstackMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-7 w-7 md:h-8 md:w-8"
      fill="none"
    >
      <path d="M6 5h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 8.7h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.8 12h10.4v7l-5.2-3.2L6.8 19v-7Z" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <footer className="relative isolate overflow-visible bg-night px-6 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 z-0 h-32 bg-gradient-to-b from-transparent via-night/80 to-night"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(10,10,11,0.72)_0%,rgba(10,10,11,0.92)_42%,rgba(10,10,11,1)_100%)]"
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 py-6 text-bone/65 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-bone/38">
            {copy.kicker}
          </p>
          <p className="mt-3 text-sm text-bone/50">{copy.motto}</p>
          <p className="mt-5 text-xs text-bone/30">
            &copy; {year} {copy.name}
          </p>
        </div>

        <div className="flex items-end justify-between gap-8 sm:justify-end">
          <div className="flex min-w-0 flex-col items-start text-sm leading-tight text-bone/45 sm:items-end">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="max-w-full truncate text-bone/70 transition-colors hover:text-bone"
            >
              {CONTACT_EMAIL}
            </a>
            <span className="mt-1 text-bone/34">{copy.location}</span>
          </div>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.mediaLabel}
            className="flex items-center justify-center text-bone/48 transition hover:-translate-y-0.5 hover:text-bone"
          >
            <SubstackMark />
          </a>
        </div>
      </div>
    </footer>
  );
}
