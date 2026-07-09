"use client";

import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: "30년 전의 빌 게이츠와\n20년 전의 일론 머스크와\n함께 살아볼 수 있는 기회가 주어진다면,\n당신은 어떤 선택을 내리겠는가?",
  en: "If you had the chance to live with\nBill Gates 30 years ago\nor Elon Musk 20 years ago,\nwould you take it?",
} satisfies Record<Language, string>;

export function FullQuote() {
  const { language } = useLanguage();

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-hall px-6 py-24">
      {/* top edge fade from night */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night to-transparent"
      />
      {/* bottom edge fade to night */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent"
      />

      {/* gold radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(230,195,106,0.07),transparent)]"
      />

      <motion.p
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative z-10 max-w-4xl whitespace-pre-line text-center font-serif text-[clamp(1.45rem,4.2vw,2.75rem)] font-bold leading-[1.6] tracking-tight text-bone"
      >
        {COPY[language]}
      </motion.p>
    </section>
  );
}
