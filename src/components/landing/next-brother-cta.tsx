"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NextBrotherCTA() {
  return (
    <section className="relative overflow-hidden border-y border-seam/40">
      <Image
        aria-hidden
        src="/logo/kuang.png"
        alt=""
        width={900}
        height={900}
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 select-none opacity-[0.04] sm:-right-10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(230,195,106,0.06),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center sm:py-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-display text-[10px] uppercase tracking-[0.4em] text-gold"
        >
          The Next One
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 1, ease: EASE }}
          className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-7xl"
        >
          다음 형제는 누구인가.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mx-auto mt-8 max-w-md text-ash"
        >
          너도 미칠 준비가 되었는가.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12"
        >
          <Link
            href="/join"
            className="inline-block rounded-full border border-gold bg-gold/5 px-8 py-3.5 text-xs uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-night"
          >
            문을 두드리기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
