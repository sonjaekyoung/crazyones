"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: {
    title: "광인회관 사람들",
    p1: "미친 창업가들이 함께 사는 공간이다.",
    p2: "당신이 어떤 꿈을 꾸든 의심하지 않는다.",
    p3: "방산·의료·교육·미디어 등 다양하게 꿈을 현실로 만들고 있다.",
  },
  en: {
    title: "Who lives in Gwangin Hall?",
    p1: "Gwangin Hall is home to founders of all ages building startups and ambitious ideas.",
    p2: "We are your first believers.",
    p3: "Our residents include college dropouts, university students, and experienced professionals building across AI, healthcare, blockchain, consumer, education, media, fintech, and more.",
  },
} satisfies Record<Language, Record<string, string>>;

export function WhoLives() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Centered title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-bone"
        >
          {copy.title}
        </motion.h2>

        {/* Two-column body */}
        <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text */}
          <div className="space-y-7 text-center lg:text-left">
            {([copy.p1, copy.p2, copy.p3] as const).map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease: EASE }}
                className={`leading-relaxed text-mist ${
                  i === 1
                    ? "text-[1.15rem] font-semibold text-bone sm:text-[1.25rem]"
                    : "text-[1.05rem] sm:text-[1.15rem]"
                }`}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Polaroid image */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="flex justify-center lg:justify-end"
          >
            <div
              style={{
                filter:
                  "drop-shadow(0 28px 60px rgba(0,0,0,0.75)) drop-shadow(0 6px 18px rgba(0,0,0,0.55))",
              }}
            >
              <div className="bg-white p-3 sm:p-5">
                <div className="relative w-[clamp(15rem,42vw,28rem)] overflow-hidden">
                  <Image
                    src="/images/main-page/crazyones-2.jpg"
                    alt="Gwangin Hall residents"
                    width={800}
                    height={600}
                    className="block w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
