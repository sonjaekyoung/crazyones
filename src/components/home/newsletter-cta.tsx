"use client";

import { motion } from "framer-motion";
import { BLOG_URL } from "@/config/site";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: {
    title: "\uc6b0\ub9ac\uc758 \ubb38\ud654",
    description: "\ubbf8\uccd0\uc57c \ubbf8\uce5c\ub2e4, \uad11\uc778\ub4e4\uc758 \uc0dd\uac01\uc744 \ub098\ub215\ub2c8\ub2e4.",
    cta: "\ub274\uc2a4\ub808\ud130 \ubcf4\ub7ec\uac00\uae30",
    aria: "\uad11\uc778\ud68c\uad00 \ub274\uc2a4\ub808\ud130 \ubcf4\ub7ec\uac00\uae30, \uc0c8 \ucc3d\uc5d0\uc11c \uc5f4\ub9bc",
  },
  en: {
    title: "Inside Our Culture",
    description: "We share the notes, obsessions, and experiments of Gwangin builders.",
    cta: "Read the Newsletter",
    aria: "Read Gwangin Hall newsletter, opens in a new tab",
  },
} satisfies Record<Language, Record<string, string>>;

export function NewsletterCTA() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="mx-auto max-w-6xl px-6 py-40 text-center sm:py-52">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="font-serif text-[1.8rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]"
      >
        {copy.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.15, duration: 1, ease: EASE }}
        className="mt-8 text-[1.4rem] text-mist sm:mt-10 sm:text-[1.575rem]"
      >
        {copy.description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3, duration: 1, ease: EASE }}
        className="mt-12 sm:mt-14"
      >
        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.aria}
          className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-night transition-all hover:bg-gold sm:text-base"
        >
          {copy.cta}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}
