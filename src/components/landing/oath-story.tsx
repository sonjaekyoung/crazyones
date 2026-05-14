"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OathStory() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-32 text-center sm:py-40">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="font-display text-[10px] uppercase tracking-[0.4em] text-ash"
      >
        The Oath · 도원결의
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        우리는, 점이었다.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 1, ease: EASE }}
        className="mt-10 space-y-6 leading-loose text-ash"
      >
        <p>
          각자의 자리에서, 각자의 광기로,
          <br />각자의 회사를 세우던 사람들.
        </p>
        <p>어느 날, 같은 방향을 보고 있다는 걸 알았다.</p>
        <p className="text-bone">그리고, 모였다.</p>
      </motion.div>
    </section>
  );
}
