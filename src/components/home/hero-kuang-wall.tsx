"use client";

import { useMemo } from "react";

/**
 * C안 — 狂의 벽
 *
 * 864개 (108 × 8) 의 작은 狂 한자를 36×24 그리드로 깔고, 모든 글자에 골드
 * 글로우 + 미세한 회전/위치 흔들림. 한자는 Gowun Batang 으로 렌더링.
 *
 * 모든 랜덤은 index 기반 결정적 함수로 만들어 SSR/CSR hydration 불일치를 피한다.
 */
const COLS = 36;
const ROWS = 24;
const COUNT = COLS * ROWS; // 864

function rand(seed: number): number {
  const x = Math.sin(seed * 9301.7 + 49297.13) * 233280;
  return x - Math.floor(x);
}

export function HeroKuangWall() {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const r1 = rand(i + 1);
        const r2 = rand(i * 2 + 7);
        const r3 = rand(i * 3 + 13);
        const r4 = rand(i * 5 + 17);
        const r5 = rand(i * 7 + 19);
        const isAccent = r5 < 0.3; // ~30% 가 골드 (이전 10% 의 3배)
        return {
          id: i,
          opacity: 0.55 + r1 * 0.4, // 0.55 ~ 0.95 — 모두 잘 보이도록
          rotate: (r2 - 0.5) * 10,
          jitterX: (r3 - 0.5) * 10,
          jitterY: (r4 - 0.5) * 10,
          isAccent,
        };
      }),
    [],
  );

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-night">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,195,106,0.08),transparent_70%)]"
      />

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {items.map((it) => (
          <span
            key={it.id}
            aria-hidden
            className="font-cjk flex select-none items-center justify-center"
            style={{
              fontSize: "clamp(10px, 1.6vw, 26px)",
              opacity: it.opacity,
              transform: `translate(${it.jitterX}px, ${it.jitterY}px) rotate(${it.rotate}deg)`,
              color: it.isAccent ? "var(--color-gold)" : "var(--color-bone)",
              textShadow: it.isAccent
                ? "0 0 18px rgba(230, 195, 106, 1), 0 0 8px rgba(230, 195, 106, 1), 0 0 3px rgba(255, 255, 255, 0.6)"
                : "0 0 12px rgba(230, 195, 106, 0.6), 0 0 5px rgba(230, 195, 106, 0.75), 0 0 2px rgba(255, 255, 255, 0.4)",
            }}
          >
            狂
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_95%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
    </section>
  );
}
