"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: {
    title: "미친 사람끼리\n뭉쳐야 한다.",
    p1: "세상은 당신의 꿈을 의심한다.",
    p2: "미쳐 있는 사람들끼리 서로 응원하자.",
    p3: "함께 살며 같이 꿈을 이루자.",
  },
  en: {
    title: "Crazy ones belong\naround crazy ones.",
    p1: "The world tells you to think smaller.",
    p2: "Changing the world starts with changing your environment.",
    p3: "Live with founders who push you to think bigger.",
  },
} satisfies Record<Language, Record<string, string>>;

export function EnvironmentCTA() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section id="environment" className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      {/* subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* ── Text side ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="whitespace-pre-line font-serif text-[clamp(1.9rem,5cqw,3rem)] font-bold leading-[1.1] tracking-tight text-bone"
          >
            {copy.title}
          </motion.h2>

          <div className="mt-10 space-y-6">
            {([copy.p1, copy.p2, copy.p3] as const).map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.12 + i * 0.12, duration: 0.9, ease: EASE }}
                className="text-[1.1rem] leading-relaxed text-mist sm:text-[1.2rem]"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ── Polaroid image ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="relative"
            style={{
              filter:
                "drop-shadow(0 28px 60px rgba(0,0,0,0.75)) drop-shadow(0 6px 18px rgba(0,0,0,0.55))",
            }}
          >
            {/* white frame — equal on all sides */}
            <div className="bg-white p-3 sm:p-5">
              <div className="relative w-[clamp(15rem,42vw,28rem)] overflow-hidden">
                <Image
                  src="/images/main-page/crazyones-1.png"
                  alt="Gwangin Hall founders"
                  width={660}
                  height={495}
                  className="block w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
