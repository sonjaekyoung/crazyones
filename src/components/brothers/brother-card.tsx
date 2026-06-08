"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Brother } from "@/types/brother";
import { WantedPosterCanvas } from "./wanted-poster-canvas";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  brother: Brother;
  index?: number;
};

export function BrotherCard({ brother, index = 0 }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [logoBroken, setLogoBroken] = useState(false);
  const canHover = useCanHover();

  const handleClick = useCallback(() => {
    if (brother.websiteUrl && flipped) {
      window.open(brother.websiteUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setFlipped((f) => !f);
  }, [brother.websiteUrl, flipped]);

  const hasLogo = !!brother.logoUrl && !logoBroken;
  const posterNumber = String(index + 1).padStart(2, "0");
  const aria = `${brother.founderName} 수배지, 뒤집어서 회사 깃발 보기`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.025, duration: 0.65, ease: EASE }}
      onMouseEnter={() => canHover && setFlipped(true)}
      onMouseLeave={() => canHover && setFlipped(false)}
      className="[perspective:1400px]"
    >
      <button
        type="button"
        onClick={handleClick}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        aria-label={aria}
        aria-pressed={flipped}
        className="group relative block aspect-[3/4.42] w-full overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-[800ms] [transform-style:preserve-3d] motion-reduce:duration-200",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          <WantedPosterCanvas
            brother={brother}
            posterNumber={posterNumber}
          />
          <PirateBack
            brother={brother}
            hasLogo={hasLogo}
            posterNumber={posterNumber}
            onLogoError={() => setLogoBroken(true)}
          />
        </div>
      </button>
    </motion.div>
  );
}

function PirateBack({
  brother,
  hasLogo,
  posterNumber,
  onLogoError,
}: {
  brother: Brother;
  hasLogo: boolean;
  posterNumber: string;
  onLogoError: () => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden border border-bone/10 bg-[#070707] p-[8%] text-bone shadow-[0_24px_80px_rgb(0_0_0/0.45)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(237_237_237/0.12),transparent_58%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-bone/12" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-bone/12" />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <p className="absolute left-0 top-0 font-display text-[10px] uppercase tracking-[0.34em] text-ash/60">
          Flag #{posterNumber}
        </p>
        <p className="absolute right-0 top-0 font-display text-[10px] uppercase tracking-[0.34em] text-ash/60">
          Crew
        </p>

        <div className="relative flex aspect-square w-[72%] items-center justify-center rounded-full border border-bone/16 bg-bone/[0.03]">
          <Crossbones />
          <div className="relative z-10 flex h-[58%] w-[72%] items-center justify-center">
            {hasLogo ? (
              <Image
                src={brother.logoUrl!}
                alt={`${brother.companyName} 로고`}
                fill
                sizes="(min-width:1280px) 20vw, (min-width:640px) 30vw, 70vw"
                className="object-contain grayscale invert"
                onError={onLogoError}
              />
            ) : (
              <span className="font-display text-sm uppercase tracking-[0.26em] text-bone/72">
                Logo Pending
              </span>
            )}
          </div>
        </div>

        <p className="mt-8 font-display text-[11px] uppercase tracking-[0.34em] text-ash">
          {brother.companyName}
        </p>
        <p className="mt-3 text-2xl font-bold text-bone">
          {brother.founderName}
        </p>
        {brother.websiteUrl && (
          <p className="mt-5 font-display text-[10px] uppercase tracking-[0.3em] text-gold/80">
            Click again to visit
          </p>
        )}
      </div>
    </div>
  );
}

function Crossbones() {
  return (
    <>
      <span className="absolute h-[82%] w-3 rotate-45 rounded-full bg-bone/10" />
      <span className="absolute h-[82%] w-3 -rotate-45 rounded-full bg-bone/10" />
      <span className="absolute left-[17%] top-[18%] h-5 w-5 rounded-full bg-bone/10" />
      <span className="absolute right-[17%] top-[18%] h-5 w-5 rounded-full bg-bone/10" />
      <span className="absolute bottom-[18%] left-[17%] h-5 w-5 rounded-full bg-bone/10" />
      <span className="absolute bottom-[18%] right-[17%] h-5 w-5 rounded-full bg-bone/10" />
    </>
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
