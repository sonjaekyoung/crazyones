"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { members } from "@/data/members";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLOTS = 16;

export function CompaniesGrid() {
  const total = Math.max(SLOTS, members.length);
  const cells = Array.from({ length: total });

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-display text-[10px] uppercase tracking-[0.4em] text-ash"
        >
          The Brothers Are Building
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
          className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          형제들이 만들고 있다.
        </motion.h2>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px border border-seam/50 bg-seam/50 sm:grid-cols-3 lg:grid-cols-4">
        {cells.map((_, i) => {
          const member = members[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.025, duration: 0.6, ease: EASE }}
              className="group relative aspect-square bg-night"
            >
              {member ? (
                <a
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.company} 사이트 새 창으로 열기`}
                  className="flex h-full w-full items-center justify-center p-8 opacity-60 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={member.logo}
                    alt={member.company}
                    width={180}
                    height={80}
                    className="max-h-[60%] w-auto object-contain"
                  />
                </a>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src="/logo/kuang.png"
                    alt=""
                    aria-hidden
                    width={88}
                    height={88}
                    className="select-none opacity-[0.04] transition-opacity duration-700 group-hover:opacity-[0.1]"
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-10 text-center font-display text-[10px] uppercase tracking-[0.4em] text-ash/60">
        곧 새 형제가 합류한다
      </p>
    </section>
  );
}
