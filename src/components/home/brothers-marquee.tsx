"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { GWANGIN_LOGO_LINKS } from "@/lib/gwangin-links";
import { useLanguage, type Language } from "@/lib/language-context";

const LABELS = {
  ko: {
    cta: "\ud615\uc81c\ub4e4 \uc54c\uc544\ubcf4\uae30",
  },
  en: {
    cta: "Meet the Brothers",
  },
} satisfies Record<Language, { cta: string }>;

const COMPACT_LOGO_LINKS = new Set([
  "https://planfit.ai/ko",
  "https://theconst.recruit.roundhr.com/",
  "https://www.zd.vc/",
  "https://wrtn.career.greetinghr.com/ko/career",
  "https://eo.career.greetinghr.com/ko/hiring",
]);

const LOGOS = GWANGIN_LOGO_LINKS.map((href, index) => {
  const number = String(index + 1).padStart(2, "0");
  const isNeoMakes = href === "https://neomakes.com";
  const isVivaDios = href === "https://vivadios.dev";
  const isHorang = href === "https://horang.it";

  return {
    outboundHref: `/out?to=${encodeURIComponent(href)}`,
    src: isNeoMakes
      ? "/images/logos-white/neomakes-logo.png"
      : isVivaDios
        ? "/images/logos-white/vivadios-logo.svg"
        : isHorang
          ? "/images/logos-white/horang-logo.png"
          : `/images/logos-white/gwangin-logo-${number}.webp`,
    label: isNeoMakes
      ? "NeoMakes logo"
      : isVivaDios
        ? "Viva Dios logo"
        : isHorang
          ? "Horang Edu logo"
          : `Gwangin company logo ${number}`,
    width: isNeoMakes ? 666 : isVivaDios ? 80 : isHorang ? 800 : 582,
    height: isNeoMakes ? 210 : isVivaDios ? 50 : isHorang ? 800 : 250,
    scale: isNeoMakes
      ? 1.2
      : isVivaDios
        ? 0.9
        : isHorang
          ? 0.82
          : COMPACT_LOGO_LINKS.has(href)
            ? 0.75
            : 1,
  };
});

type LogoStyle = CSSProperties & {
  "--logo-scale": number;
};

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
      {/* <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-end text-bone/62">
        <Link
          href="/brothers"
          className="group inline-flex items-center gap-2 whitespace-nowrap text-sm text-bone/72 transition-colors hover:text-bone sm:text-base"
        >
          {labels.cta}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div> */}

      <div className="brothers-marquee relative z-10 mx-auto mt-8 max-w-6xl overflow-hidden py-5">
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
      {LOGOS.map((logo) => (
        <a
          key={logo.src}
          href={logo.outboundHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaHidden ? undefined : `${logo.label} website`}
          style={{ "--logo-scale": logo.scale } as LogoStyle}
          onClick={(event) => {
            event.preventDefault();

            const outboundUrl = new URL(logo.outboundHref, window.location.origin).toString();
            const popup = window.open("about:blank", "_blank");

            if (popup) {
              popup.opener = null;
              popup.location.href = outboundUrl;
              return;
            }

            window.location.assign(outboundUrl);
          }}
          tabIndex={ariaHidden ? -1 : undefined}
          className="brothers-marquee-item"
        >
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.label}
            width={logo.width}
            height={logo.height}
            loading="eager"
            unoptimized
            className="h-full w-full object-contain"
          />
        </a>
      ))}
    </div>
  );
}
