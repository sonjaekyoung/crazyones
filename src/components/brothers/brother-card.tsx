"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Brother } from "@/types/brother";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  brother: Brother;
  index?: number;
};

export function BrotherCard({ brother, index = 0 }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [logoBroken, setLogoBroken] = useState(false);
  const [faceBroken, setFaceBroken] = useState(false);
  const canHover = useCanHover();

  const handleClick = useCallback(() => {
    const url = brother.websiteUrl;
    if (!url) {
      setFlipped((f) => !f);
      return;
    }
    if (canHover || flipped) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setFlipped(true);
    }
  }, [brother.websiteUrl, canHover, flipped]);

  const hasLogo = !!brother.logoUrl && !logoBroken;
  const hasFace = !!brother.founderImageUrl && !faceBroken;
  const initial = brother.founderName?.trim()?.[0] ?? "·";

  const aria = brother.websiteUrl
    ? `${brother.companyName} · ${brother.founderName}, 새 창에서 사이트 열기`
    : `${brother.companyName} · ${brother.founderName}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.7, ease: EASE }}
      onMouseEnter={() => canHover && setFlipped(true)}
      onMouseLeave={() => canHover && setFlipped(false)}
      className="[perspective:1200px]"
    >
      <button
        type="button"
        onClick={handleClick}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-label={aria}
        aria-pressed={flipped}
        className="relative block aspect-[4/5] w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-[800ms] [transform-style:preserve-3d] motion-reduce:duration-200",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front — 회사 로고 */}
          <div className="absolute inset-0 flex items-center justify-center border border-seam/60 bg-hall p-10 [backface-visibility:hidden]">
            {hasLogo ? (
              <Image
                src={brother.logoUrl!}
                alt={`${brother.companyName} 로고`}
                fill
                sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 50vw"
                className="object-contain p-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                onError={() => setLogoBroken(true)}
              />
            ) : (
              <span className="font-display text-xl uppercase tracking-[0.3em] text-bone sm:text-2xl">
                {brother.companyName}
              </span>
            )}
            <span className="pointer-events-none absolute right-3 top-3 font-display text-[10px] uppercase tracking-[0.3em] text-ash/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Back — 형제 얼굴 + 이름 */}
          <div className="absolute inset-0 flex flex-col overflow-hidden border border-seam/60 bg-hall-elevated [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="relative flex-1 bg-hall">
              {hasFace ? (
                <Image
                  src={brother.founderImageUrl!}
                  alt={`${brother.founderName} 사진`}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:640px) 33vw, 50vw"
                  className="object-cover"
                  onError={() => setFaceBroken(true)}
                />
              ) : (
                <FaceFallback initial={initial} />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-hall-elevated" />
            </div>

            <div className="flex flex-col gap-1 p-5 text-left">
              <p className="text-base font-bold text-bone">
                {brother.founderName}
              </p>
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ash">
                {brother.companyName}
              </p>
              {brother.websiteUrl && (
                <p className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  Visit →
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function useCanHover(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(hover: hover)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: hover)").matches,
    () => true,
  );
}

function FaceFallback({ initial }: { initial: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-hall">
      <Image
        aria-hidden
        src="/logo/kuang.png"
        alt=""
        width={240}
        height={240}
        className="absolute select-none opacity-[0.05]"
      />
      <span className="relative font-display text-5xl text-ash/70">
        {initial}
      </span>
    </div>
  );
}
