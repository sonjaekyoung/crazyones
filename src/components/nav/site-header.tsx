"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NEWSLETTER_URL } from "@/config/site";
import { useLanguage, type Language } from "@/lib/language-context";

const LABELS = {
  ko: {
    about: "소개",
    seniors: "광인들",
    faq: "FAQ",
    newsletter: "뉴스레터",
    contact: "문의하기",
    toggle: "EN",
    homeLabel: "광인회관 홈",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
  },
  en: {
    about: "About",
    seniors: "Alumni",
    faq: "FAQ",
    newsletter: "Newsletter",
    contact: "Contact Us",
    toggle: "KO",
    homeLabel: "Gwangin Hall home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
} satisfies Record<Language, Record<string, string>>;

const NAV_ITEMS = [
  { id: "environment", labelKey: "about" as const },
  { id: "seniors", labelKey: "seniors" as const },
  { id: "faq", labelKey: "faq" as const },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteHeader() {
  const { language, toggleLanguage } = useLanguage();
  const labels = LABELS[language];
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    setMenuOpen(false);
    // Wait a tick so the drawer unmount doesn't steal focus/scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-5 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.72)_18%,rgba(0,0,0,0.50)_42%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0)_100%)]"
      />

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label={labels.homeLabel}
          className="group flex h-12 w-16 items-center justify-center overflow-hidden rounded-sm transition-opacity hover:opacity-85 sm:h-14 sm:w-20"
        >
          <Image
            src="/logo/header-logo.png"
            alt=""
            width={90}
            height={72}
            priority
            className="h-9 w-auto max-w-none object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)] sm:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[1.08rem] text-bone/72 drop-shadow-[0_3px_14px_rgba(0,0,0,0.9)] md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="transition-colors hover:text-bone"
            >
              {labels[item.labelKey]}
            </button>
          ))}
          <a
            href={NEWSLETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-bone"
          >
            {labels.newsletter}
          </a>
          <a
            href="mailto:crazyones.us@gmail.com"
            className="ml-1 inline-flex items-center rounded-full bg-bone px-5 py-1.5 text-[0.88rem] font-semibold text-night transition-all duration-200 hover:bg-gold"
          >
            {labels.contact}
          </a>
          <button
            type="button"
            aria-label="Toggle language"
            onClick={toggleLanguage}
            className="ml-1 rounded-full border border-bone/18 px-3 py-1 text-[0.76rem] tracking-[0.18em] text-bone/62 transition hover:border-bone/35 hover:text-bone"
          >
            {labels.toggle}
          </button>
        </nav>

        {/* Mobile: contact + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="mailto:crazyones.us@gmail.com"
            className="inline-flex items-center rounded-full bg-bone px-3.5 py-1.5 text-[0.78rem] font-semibold text-night transition-all duration-200 hover:bg-gold"
          >
            {labels.contact}
          </a>
        <button
          type="button"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center text-bone transition-opacity hover:opacity-80 md:hidden"
        >
          <span className="sr-only">{menuOpen ? labels.closeMenu : labels.openMenu}</span>
          <span
            aria-hidden
            className="relative flex h-[18px] w-[26px] flex-col justify-between drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            {/* Uneven widths + square ends for a hand-cut, grungy feel */}
            <span
              className={`block h-[3.5px] w-full origin-center bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[7.25px] rotate-[42deg]" : "rotate-[-1deg]"
              }`}
            />
            <span
              className={`ml-auto block h-[4px] w-[92%] origin-center bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "rotate-[0.5deg] opacity-100"
              }`}
            />
            <span
              className={`block h-[3.5px] w-[96%] origin-center bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7.25px] -rotate-[42deg]" : "rotate-[1.5deg]"
              }`}
            />
          </span>
        </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={labels.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-night/80 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-0 top-16 z-50 border-b border-seam bg-hall/95 px-5 pb-8 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md md:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease: EASE }}
                    onClick={() => scrollTo(item.id)}
                    className="rounded-lg px-3 py-3.5 text-left text-[1.15rem] text-bone/80 transition-colors hover:bg-hall-elevated hover:text-bone"
                  >
                    {labels[item.labelKey]}
                  </motion.button>
                ))}
                <motion.a
                  href={NEWSLETTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + NAV_ITEMS.length * 0.05, duration: 0.35, ease: EASE }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3.5 text-left text-[1.15rem] text-bone/80 transition-colors hover:bg-hall-elevated hover:text-bone"
                >
                  {labels.newsletter}
                </motion.a>

                <div className="mt-4 flex items-center justify-between border-t border-seam pt-5">
                  <span className="text-sm text-ash">
                    {language === "ko" ? "언어" : "Language"}
                  </span>
                  <button
                    type="button"
                    aria-label="Toggle language"
                    onClick={toggleLanguage}
                    className="rounded-full border border-bone/18 px-4 py-1.5 text-[0.8rem] tracking-[0.18em] text-bone/70 transition hover:border-bone/35 hover:text-bone"
                  >
                    {labels.toggle}
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
