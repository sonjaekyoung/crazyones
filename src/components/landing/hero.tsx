"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotField } from "./dot-field";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <DotField className="absolute inset-0 h-full w-full" />

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,195,106,0.07),transparent_55%)]"
      />
      <Image
        aria-hidden
        src="/logo/kuang.png"
        alt=""
        width={680}
        height={680}
        priority
        className="pointer-events-none absolute inset-0 m-auto select-none opacity-[0.04]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-night"
      />

      <div className="relative flex min-h-[100vh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-xs uppercase tracking-[0.5em] text-ash"
        >
          Here&rsquo;s to the Crazy Ones
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1, ease: EASE }}
          className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-7xl"
        >
          미쳐야 미친다.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
          className="mt-6 max-w-md text-ash"
        >
          세상을 바꿀 수 있다고 믿는 형제들의 회관.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.3em]"
        >
          <Link
            href="/records"
            className="rounded-full border border-seam px-5 py-2.5 text-bone transition hover:border-bone"
          >
            광인들의 기록
          </Link>
          <Link
            href="/oath"
            className="rounded-full border border-gold/60 px-5 py-2.5 text-gold transition hover:border-gold hover:bg-gold/5"
          >
            광인의 문
          </Link>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="pointer-events-none absolute bottom-10 hidden flex-col items-center gap-2 text-ash/60 sm:flex"
        >
          <span className="font-display text-[10px] uppercase tracking-[0.4em]">
            scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-6 w-px bg-ash"
          />
        </motion.div>
      </div>
    </section>
  );
}
