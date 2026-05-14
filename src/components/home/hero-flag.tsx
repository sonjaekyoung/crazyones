"use client";

import Image from "next/image";
import { useState } from "react";

const VIDEO_SRC = "/videos/gwangin-flag.mp4";
const VIDEO_SRC_WEBM = "/videos/gwangin-flag.webm";

/**
 * A안 — Full-bleed Hero
 *
 * 영상이 화면 전체를 덮고, 안쪽 모서리에 라디얼 비네트와 미세한 골드 글로우가
 * 더해져 "내부에서 빛이 모이는" 시네마틱 느낌을 낸다.
 */
export function HeroFlag() {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Fallback layer — 영상 없을 때 보이는 배경 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,195,106,0.10),transparent_60%)]"
      />
      <Image
        aria-hidden
        src="/logo/kuang.png"
        alt=""
        width={900}
        height={900}
        priority
        className="pointer-events-none absolute inset-0 m-auto select-none opacity-[0.05]"
      />

      {/* 깃발 영상 */}
      {videoOk && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/logo/kuang.png"
          aria-hidden
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={VIDEO_SRC_WEBM} type="video/webm" />
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      )}

      {/* Inner vignette — 가장자리는 어둡게, 중앙은 밝게 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_90%)]"
      />

      {/* 골드 글로우 — 중앙에서 은은하게 새어 나오는 빛 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,195,106,0.12),transparent_55%)] mix-blend-screen"
      />

      {/* 하단 페이드 — 다음 섹션으로 연결 */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
    </section>
  );
}
