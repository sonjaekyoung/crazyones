"use client";

import Image from "next/image";
import { useState } from "react";

const VIDEO_SRC = "/videos/hero.mp4";
const VIDEO_FALLBACK_SRC = "/videos/hero.mov";

/**
 * B안 — Ambient (앰비라이트)
 *
 * 영상이 화면 가운데에 16:9 박스로 떠 있고, 그 뒤에 동일 영상의 크게-확대-블러
 * 처리한 복제본이 깔려 영상 실제 색이 가장자리로 번지는 효과 (필립스 앰비라이트).
 * 영상이 없을 때는 狂 워터마크가 같은 자리에서 halo 역할.
 *
 * 주의: 영상 파일을 두 번 재생한다. 같은 src 라 브라우저가 캐시하지만,
 * 디코딩 비용은 두 배다. 큰 영상 (>20MB) 이면 첫 로드가 느릴 수 있음.
 */
export function HeroFlagAmbient() {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-night">
      {/* 정적 halo — 영상 없을 때도 항상 분위기 유지 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,195,106,0.16),transparent_55%)]"
      />
      <Image
        aria-hidden
        src="/logo/kuang.png"
        alt=""
        width={1200}
        height={1200}
        priority
        className="pointer-events-none absolute inset-0 m-auto scale-150 select-none opacity-[0.06] blur-2xl"
      />

      {/* Ambilight 레이어 — 같은 영상을 크게 확대 + 블러 + 채도 강화 */}
      {videoOk && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          onError={() => setVideoOk(false)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-auto min-h-full w-[130vw] max-w-none -translate-x-1/2 -translate-y-1/2 scale-110 object-cover opacity-70 blur-[100px] saturate-150"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <source src={VIDEO_FALLBACK_SRC} type="video/quicktime" />
        </video>
      )}

      {/* 메인 영상 — 가운데 액자 */}
      <div className="relative flex h-full items-center justify-center px-6 py-16">
        <div className="relative aspect-video w-full max-w-[1100px] overflow-hidden rounded-md shadow-[0_30px_120px_-30px_rgba(0,0,0,0.95)] ring-1 ring-seam/50">
          {videoOk ? (
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
              <source src={VIDEO_SRC} type="video/mp4" />
              <source src={VIDEO_FALLBACK_SRC} type="video/quicktime" />
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-hall">
              <Image
                src="/logo/kuang.png"
                alt=""
                width={420}
                height={420}
                className="opacity-30"
              />
            </div>
          )}
        </div>
      </div>

      {/* 하단 페이드 */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
    </section>
  );
}
