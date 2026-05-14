"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mockRecords } from "@/lib/mock-records";

const EASE = [0.22, 1, 0.36, 1] as const;

export function RecentRecords() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="font-display text-[10px] uppercase tracking-[0.4em] text-ash"
          >
            Latest Inscriptions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
            className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            광인들의 기록은
            <br />
            사라지지 않는다.
          </motion.h2>
        </div>
        <Link
          href="/records"
          className="hidden text-xs uppercase tracking-[0.3em] text-ash transition-colors hover:text-bone sm:block"
        >
          전체 기록 →
        </Link>
      </div>

      <div className="mt-16 grid gap-px bg-seam/50 sm:grid-cols-3">
        {mockRecords.map((r, i) => (
          <motion.article
            key={r.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.1,
              duration: 0.8,
              ease: EASE,
            }}
            className="group relative flex flex-col gap-8 bg-night p-8 transition-colors hover:bg-hall sm:p-10"
          >
            <div
              aria-hidden
              className="aspect-[16/10] bg-gradient-to-br from-hall via-seam to-hall-elevated opacity-70"
            />
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ash">
                {r.date}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-snug transition-colors group-hover:text-gold">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {r.excerpt}
              </p>
              <p className="mt-6 text-xs text-ash">— {r.author}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <Link
        href="/records"
        className="mt-10 inline-block text-xs uppercase tracking-[0.3em] text-ash transition-colors hover:text-bone sm:hidden"
      >
        전체 기록 →
      </Link>
    </section>
  );
}
