"use client";

import { motion } from "framer-motion";
import { BLOG_URL } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-40 text-center sm:py-52">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="font-serif text-[1.8rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]"
      >
        Inside Our Culture
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.15, duration: 1, ease: EASE }}
        className="mt-8 text-[1.4rem] text-mist sm:mt-10 sm:text-[1.575rem]"
      >
        미쳐야 미친다, 광인들의 생각을 나눕니다.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3, duration: 1, ease: EASE }}
        className="mt-12 sm:mt-14"
      >
        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="광인회관 뉴스레터 보러가기, 새 창에서 열림"
          className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-night transition-all hover:bg-gold sm:text-base"
        >
          뉴스레터 보러가기
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}
