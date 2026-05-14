"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const points: [number, number][] = [
  [18, 22],
  [34, 12],
  [54, 28],
  [72, 14],
  [88, 32],
  [14, 50],
  [38, 56],
  [60, 48],
  [78, 60],
  [26, 78],
  [50, 86],
  [74, 80],
];

const THRESHOLD = 32;

function buildLines(): Array<[number, number, number, number, number]> {
  const lines: Array<[number, number, number, number, number]> = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const d = Math.hypot(x1 - x2, y1 - y2);
      if (d < THRESHOLD) lines.push([x1, y1, x2, y2, d]);
    }
  }
  return lines.sort((a, b) => a[4] - b[4]);
}

const lines = buildLines();

export function DotsConnected() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-32 text-center sm:py-40">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="font-display text-[10px] uppercase tracking-[0.4em] text-ash"
      >
        Dots Connected
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1, duration: 0.9, ease: EASE }}
        className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl"
      >
        각자의 점들이
        <br />
        이곳에서 연결된다.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2, duration: 1.2 }}
        className="mx-auto mt-16 aspect-[16/9] max-w-3xl"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
          aria-hidden
        >
          {lines.map(([x1, y1, x2, y2], idx) => (
            <motion.line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#EDEDED"
              strokeWidth={0.15}
              strokeOpacity={0.55}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.55 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: 0.3 + idx * 0.06,
                duration: 1.1,
                ease: EASE,
              }}
            />
          ))}
          {points.map(([x, y], idx) => (
            <motion.circle
              key={idx}
              cx={x}
              cy={y}
              r={0.8}
              fill="#EDEDED"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.06, duration: 0.6, ease: EASE }}
            />
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
