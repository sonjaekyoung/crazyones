"use client";

import Link from "next/link";
import { brothers } from "@/data/brothers";
import { useLanguage, type Language } from "@/lib/language-context";

const LABELS = {
  ko: {
    cta: "\ud615\uc81c\ub4e4 \uc54c\uc544\ubcf4\uae30",
  },
  en: {
    cta: "Meet the Brothers",
  },
} satisfies Record<Language, { cta: string }>;

const companyNames = brothers.map((brother) => brother.companyName);

export function BrothersMarquee() {
  const { language } = useLanguage();
  const labels = LABELS[language];

  return (
    <section className="relative isolate overflow-hidden bg-night px-6 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-night"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_64%)]"
      />
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-end text-bone/62">
        <Link
          href="/brothers"
          className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-bone/72 transition-colors hover:text-bone sm:text-base"
        >
          {labels.cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="brothers-marquee relative z-10 mx-auto mt-8 max-w-6xl overflow-hidden border-y border-bone/[0.08] py-5">
        <div className="brothers-marquee-track">
          <MarqueeSet />
          <MarqueeSet ariaHidden />
        </div>
      </div>
    </section>
  );
}

function MarqueeSet({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="brothers-marquee-set">
      {companyNames.map((name) => (
        <span key={name} className="brothers-marquee-item">
          {name}
        </span>
      ))}
    </div>
  );
}
