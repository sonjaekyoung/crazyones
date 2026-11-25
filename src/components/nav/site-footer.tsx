"use client";

import { NEWSLETTER_URL } from "@/config/site";
import { useLanguage, type Language } from "@/lib/language-context";

const CONTACT_EMAIL = "crazyones.us@gmail.com";

const COPY = {
  ko: {
    motto: "\ubbf8\uccd0\uc57c \ubbf8\uce5c\ub2e4.",
    name: "\uad11\uc778\ud68c\uad00",
    location: "\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \ub9c8\ud3ec\uad6c",
    newsletter: "\ub274\uc2a4\ub808\ud130",
    kicker: "\uad11\uc778\ub4e4\uc5d0\uac8c",
  },
  en: {
    motto: "Only those crazy enough can arrive.",
    name: "Gwangin Hall",
    location: "Mapo-gu, Seoul",
    newsletter: "Newsletter",
    kicker: "Here\u2019s to the Crazy Ones",
  },
} satisfies Record<Language, Record<string, string>>;

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
          <p className="font-display text-sm uppercase tracking-[0.4em] text-bone/50">
            {copy.kicker}
          </p>
          <p className="mt-3 text-base text-bone/65 sm:text-lg">{copy.motto}</p>
          <p className="mt-5 text-sm text-bone/40">
            &copy; {year} {copy.name}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-start text-base leading-tight text-bone/55 sm:items-end">
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone/80 transition-colors hover:text-bone"
          >
            {copy.newsletter}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1.5 max-w-full truncate text-bone/80 transition-colors hover:text-bone"
          >
            {CONTACT_EMAIL}
          </a>
          <span className="mt-1.5 text-sm text-bone/45">{copy.location}</span>
        </div>
      </div>
    </footer>
  );
}
