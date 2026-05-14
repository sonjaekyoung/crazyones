"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    word: "함께 산다",
    desc: "회관은 같은 시간을 함께 사는 형제들의 공간이다.",
  },
  {
    word: "함께 만든다",
    desc: "각자의 회사, 서로의 어깨. 흔들리는 밤에도 옆이 있다.",
  },
  {
    word: "함께 기록한다",
    desc: "사라지지 않는 것은 끝내 기록뿐이다.",
  },
];

export function Intro() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-32 sm:py-40">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display text-[10px] uppercase tracking-[0.4em] text-ash"
      >
        A House, Not a Company
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        광인회관은 회사가 아니다.
        <br />
        회관이다.
      </motion.h2>

      <div className="mt-20 grid gap-12 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.word}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: 0.1 + i * 0.1,
              duration: 0.8,
              ease: EASE,
            }}
            className="border-t border-seam/60 pt-6"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold/80">
              0{i + 1}
            </p>
            <h3 className="mt-4 text-2xl font-bold">{p.word}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ash">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
