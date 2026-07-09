"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: { title: "선배 광인들" },
  en: { title: "Gwangin Hall Alumni" },
} satisfies Record<Language, { title: string }>;

const PEOPLE = [
  {
    src: "/images/main-page/jinwoo.jpeg",
    width: 800,
    height: 800,
    name_ko: "김진우",
    name_en: "Jinu Kim",
    company_ko: "Liner.com 창업자",
    company_en: "Founder of Liner.com",
  },
  {
    src: "/images/main-page/seyoung.jpeg",
    width: 800,
    height: 800,
    name_ko: "이세영",
    name_en: "Seyoung Lee",
    company_ko: "뤼튼 창업자",
    company_en: "Founder of Wrtn",
  },
  {
    src: "/images/main-page/suji.jpeg",
    width: 372,
    height: 372,
    name_ko: "이수지",
    name_en: "Suji Lee",
    company_ko: "thingsflow 창업자",
    company_en: "Founder of thingsflow",
  },
  {
    src: "/images/main-page/taeyong.jpeg",
    width: 500,
    height: 500,
    name_ko: "김태용",
    name_en: "TaeYong Kim",
    company_ko: "EO Studio 창업자",
    company_en: "Founder of EO Studio",
  },
  {
    src: "/images/main-page/jaemyeong.jpeg",
    width: 800,
    height: 800,
    name_ko: "신재명",
    name_en: "Jay Shin",
    company_ko: "DelightRoom 창업자",
    company_en: "Founder of DelightRoom",
  },
  {
    src: "/images/main-page/hagyeong.png",
    width: 800,
    height: 800,
    name_ko: "김하경",
    name_en: "Hagyeong Kim",
    company_ko: "ZD.VC 창업자",
    company_en: "Founder of ZD.VC",
  },
];

export function SeniorsGrid() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section id="seniors" className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-bone"
        >
          {copy.title}
        </motion.h2>

        {/* 3 × 2 grid */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-14 md:grid-cols-3">
          {PEOPLE.map((person, i) => (
            <motion.div
              key={person.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: EASE }}
              className="flex flex-col"
            >
              {/* Square photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-hall-elevated">
                <Image
                  src={person.src}
                  alt={language === "ko" ? person.name_ko : person.name_en}
                  width={person.width}
                  height={person.height}
                  className="h-full w-full scale-[1.04] object-cover grayscale transition-[filter] duration-300 hover:grayscale-0"
                />
              </div>

              {/* Name + company */}
              <div className="mt-4">
                <p className="text-[0.95rem] font-semibold text-bone sm:text-[1.05rem]">
                  {language === "ko" ? person.name_ko : person.name_en}
                </p>
                <p className="mt-1 text-[0.82rem] text-ash sm:text-[0.9rem]">
                  {language === "ko" ? person.company_ko : person.company_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
