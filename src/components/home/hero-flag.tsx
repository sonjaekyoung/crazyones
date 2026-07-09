"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage, type Language } from "@/lib/language-context";

const VIDEO_SRC = "/videos/hero.mp4";
const VIDEO_FALLBACK_SRC = "/videos/hero.mov";

const COPY = {
  ko: {
    eyebrow: "Here\u2019s to the Crazy Ones",
    title: "\uad11\uc778\ud68c\uad00",
    subtitle: "\ubbf8\uce5c \ucc3d\uc5c5\uac00\ub4e4\uc774 \ubaa8\uc5ec\uc0ac\ub294 \uacf5\uac04",
    cta: "문의하기",
  },
  en: {
    eyebrow: "Here\u2019s to the Crazy Ones",
    title: "GWANGIN HALL",
    subtitle: "A home for the most crazy founders.",
    cta: "Contact Us",
  },
} satisfies Record<Language, Record<string, string>>;

export function HeroFlag() {
  const [videoOk, setVideoOk] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  const copy = COPY[language];
  const videoVisible = videoOk && videoReady;
  const titleSizeClass =
    language === "ko"
      ? "text-[clamp(3.25rem,17cqw,10rem)]"
      : "text-[clamp(2.1rem,8.8cqw,5.85rem)]";

  useEffect(() => {
    if (!videoOk) return;

    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      markReady();
    }

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);
    void video.play().catch(() => {
      setVideoReady(false);
    });

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
    };
  }, [videoOk]);

  return (
    <section id="about" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
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

      {videoOk && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoReady(false);
            setVideoOk(false);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <source src={VIDEO_FALLBACK_SRC} type="video/quicktime" />
        </video>
      )}

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-[6] bg-black transition-opacity duration-1000 ease-out ${
          videoVisible ? "opacity-0" : "opacity-100"
        }`}
      />

      <div aria-hidden className="absolute inset-0 bg-black/50" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(0,0,0,0.72)_90%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.48),transparent_30%,rgba(0,0,0,0.74)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,195,106,0.10),transparent_55%)] mix-blend-screen"
      />

      <div className="absolute inset-x-0 top-[56%] z-10 mx-auto flex max-w-6xl -translate-y-1/2 flex-col items-center gap-[clamp(1.45rem,4cqw,2.75rem)] px-5 text-center [container-type:inline-size] sm:px-6">
        <p className="max-w-full whitespace-nowrap font-display text-[clamp(0.9rem,4.2cqw,1.55rem)] uppercase tracking-[0.28em] text-bone/82 drop-shadow-[0_4px_18px_rgba(0,0,0,0.98)] sm:tracking-[0.36em]">
          {copy.eyebrow}
        </p>
        <h1 className={`${titleSizeClass} max-w-full whitespace-nowrap font-display leading-none tracking-[0.05em] text-bone drop-shadow-[0_10px_34px_rgba(0,0,0,0.95)] sm:tracking-[0.08em]`}>
          {copy.title}
        </h1>
        <p className="max-w-full whitespace-nowrap text-[clamp(1rem,5.8cqw,2.45rem)] leading-none text-bone/90 drop-shadow-[0_5px_22px_rgba(0,0,0,0.96)]">
          {copy.subtitle}
        </p>
        <a
          href="mailto:crazyones.us@gmail.com"
          className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 text-[clamp(0.85rem,2.8cqw,1.05rem)] font-semibold text-night shadow-[0_8px_32px_rgba(0,0,0,0.55)] transition-all duration-300 hover:bg-gold hover:shadow-[0_8px_32px_rgba(230,195,106,0.28)]"
        >
          {copy.cta}
        </a>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[8] bg-night hero-loop-fade-overlay"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
    </section>
  );
}
