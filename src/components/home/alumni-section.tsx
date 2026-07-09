"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: {
    eyebrow: "광인회관을 거쳐간 사람들",
    p1: "아래 사진 속 광인들은 총 수천억 원의 투자를 유치하고, 수조 원 규모의 기업을 만들었습니다.",
    p2: "그리고 지금도 다음 세대 창업자들을 응원하며, 도와주고 있습니다.",
    alt: "광인회관 출신 창업자들",
  },
  en: {
    eyebrow: "Gwangin Hall Alumni",
    p1: "The founders in this photo went on to raise hundreds of millions of dollars in funding, building companies valued in the billions.",
    p2: "And today, they still come back — sharing their experience with the next generation of builders.",
    alt: "Gwangin Hall alumni founders",
  },
} satisfies Record<Language, Record<string, string>>;

export function AlumniSection() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_30%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 inline-block border-b border-bone/25 pb-2 text-xs font-semibold uppercase tracking-[0.22em] text-bone/50"
        >
          {copy.eyebrow}
        </motion.p>

        {/* Text */}
        <div className="mx-auto max-w-3xl space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08, duration: 1, ease: EASE }}
            className="text-[1.35rem] font-semibold leading-relaxed text-bone sm:text-[1.65rem]"
          >
            {copy.p1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2, duration: 1, ease: EASE }}
            className="text-[1.2rem] leading-relaxed text-mist sm:text-[1.4rem]"
          >
            {copy.p2}
          </motion.p>
        </div>

        {/* Polaroid image — capped at native resolution to avoid upscale blur */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.18, duration: 1.1, ease: EASE }}
          className="mt-14 mx-auto"
          style={{
            maxWidth: "39.375rem",
            filter:
              "drop-shadow(0 32px 64px rgba(0,0,0,0.72)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
          }}
        >
          <div className="bg-white p-3 sm:p-5">
            <div className="relative w-full overflow-hidden">
              <Image
                src="/images/main-page/crazyones-3.jpg"
                alt={copy.alt}
                width={630}
                height={354}
                className="block w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
