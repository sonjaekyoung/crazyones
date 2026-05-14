"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CrazyOnes() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-40 text-center sm:py-52">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="font-serif text-[1.8rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem] lg:text-[4.8rem]"
      >
        Here&rsquo;s to the Crazy Ones
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.15, duration: 1, ease: EASE }}
        className="mt-8 text-[1.4rem] text-mist sm:mt-10 sm:text-[1.575rem]"
      >
        미친 창업가들이 모여사는 공간 광인회관
      </motion.p>
    </section>
  );
}
