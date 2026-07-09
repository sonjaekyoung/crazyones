"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: {
    headline1: "광인회관 출신 창업자들은",
    headline2: "총 수천억을 투자받고,",
    headline3: "수조 원 규모의 기업을 만들었습니다.",
  },
  en: {
    headline1: "Gwangin Hall alumni have raised",
    headline2: "hundreds of millions of dollars",
    headline3: "and built companies worth billions.",
  },
} satisfies Record<Language, Record<string, string>>;

const LOGOS = [
  { src: "/images/main-page/a16z-bw.png",       alt: "a16z" },
  { src: "/images/main-page/gc-bw.png",          alt: "General Catalyst" },
  { src: "/images/main-page/goodwater-bw.png",   alt: "Goodwater" },
  { src: "/images/main-page/samsung-bw.png",     alt: "Samsung Ventures" },
  { src: "/images/main-page/kakao-bw.png",       alt: "Kakao Ventures" },
  { src: "/images/main-page/capstone-bw.png",    alt: "Capstone" },
  { src: "/images/main-page/sazze-bw.png",       alt: "Primer Sazze" },
  { src: "/images/main-page/bass-bw.png",        alt: "Bass Ventures" },
  { src: "/images/main-page/mashup-bw.png",      alt: "Mashup Ventures" },
  { src: "/images/main-page/spring-bw.png",      alt: "Spring Camp" },
  { src: "/images/main-page/zdvc-bw.png",        alt: "ZD.VC" },
  { src: "/images/main-page/eo-bw.png",          alt: "EO" },
];

export function InvestorsGrid() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_65%_50%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

        {/* ── Left: headline ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] font-bold leading-[1.2] tracking-tight text-bone"
          >
            {copy.headline1}{" "}
            <span className="text-gold">{copy.headline2}</span>{" "}
            {copy.headline3}
          </motion.p>
        </div>

        {/* ── Right: 3-column logo grid ── */}
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-seam bg-seam">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.04, duration: 0.7, ease: EASE }}
              className="flex items-center justify-center bg-hall p-5 sm:p-6"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={490}
                height={274}
                className="w-full max-w-[9rem] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 sm:max-w-[10.5rem]"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
