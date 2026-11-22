"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WantedPosterCanvas } from "@/components/brothers/wanted-poster-canvas";
import { useLanguage, type Language } from "@/lib/language-context";
import type { Brother } from "@/types/brother";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY = {
  ko: { title: "광인들", prev: "이전 광인", next: "다음 광인" },
  en: { title: "Gwangin Hall Alumni", prev: "Previous", next: "Next" },
} satisfies Record<Language, { title: string; prev: string; next: string }>;

const FEATURED: Brother[] = [
  { id: "kim-jin-woo", founderName: "김진우", companyName: "Liner.com", bounty: "Liner.com 창업자", founderImageUrl: "/images/main-page/jinwoo.jpeg" },
  { id: "lee-se-young", founderName: "이세영", companyName: "뤼튼", bounty: "뤼튼 창업자", founderImageUrl: "/images/main-page/seyoung.jpeg" },
  { id: "lee-su-ji", founderName: "이수지", companyName: "thingsflow", bounty: "thingsflow 창업자", founderImageUrl: "/images/main-page/suji.jpeg" },
  { id: "kim-tae-yong", founderName: "김태용", companyName: "EO Studio", bounty: "EO Studio 창업자", founderImageUrl: "/images/main-page/taeyong.jpeg" },
  { id: "shin-jae-myeong", founderName: "신재명", companyName: "DelightRoom", bounty: "DelightRoom 창업자", founderImageUrl: "/images/main-page/jaemyeong.jpeg" },
  { id: "kim-ha-gyeong", founderName: "김하경", companyName: "ZD.VC", bounty: "ZD.VC 창업자", founderImageUrl: "/images/main-page/hagyeong.png" },
];

const REST: Brother[] = [
  { id: "nam-seong-pil", founderName: "남성필", companyName: "AB180", bounty: "AB180 대표", founderImageUrl: "/images/main-page/nam-seong-pil.png" },
  { id: "park-do-hyeon", founderName: "박도현", companyName: "스톡데일랩스", bounty: "스톡데일랩스 대표", founderImageUrl: "/images/main-page/park-do-hyeon.png" },
  { id: "park-ji-soo", founderName: "박지수", companyName: "수호아이오", bounty: "수호아이오 대표", founderImageUrl: "/images/main-page/park-ji-soo.png" },
  { id: "baek-hyeon-woo", founderName: "백현우", companyName: "플랜핏", bounty: "플랜핏 창업자", founderImageUrl: "/images/main-page/baek-hyeon-woo.png" },
  { id: "son-jae-kyeong", founderName: "손재경", companyName: "오름", bounty: "오름 창업자", founderImageUrl: "/images/main-page/son-jae-kyeong.jpg" },
  { id: "son-jae-kwon", founderName: "손재권", companyName: "더밀크", bounty: "더밀크 창업자", founderImageUrl: "/images/main-page/son-jae-kwon.png" },
  { id: "oh-jun-ho", founderName: "오준호", companyName: "마야크루", bounty: "마야크루 창업자", founderImageUrl: "/images/main-page/oh-jun-ho.png" },
  { id: "woo-chan-min", founderName: "우찬민", companyName: "Liner", bounty: "Liner 창업자", founderImageUrl: "/images/main-page/woo-chan-min.png" },
  { id: "yoo-do-hee", founderName: "유도희", companyName: "호랑에듀", bounty: "호랑에듀 창업자", founderImageUrl: "/images/main-page/yoo-do-hee.png" },
  { id: "yoon-yong-seop", founderName: "윤용섭", companyName: "NMAX", bounty: "NMAX 창업자", founderImageUrl: "/images/main-page/yoon-yong-seop.png" },
  { id: "yoon-hee-sang", founderName: "윤희상", companyName: "Endo Health", bounty: "Endo Health 창업자", founderImageUrl: "/images/main-page/yoon-hee-sang.png" },
  { id: "lee-do-hyeon", founderName: "이도현", companyName: "NeoMakes", bounty: "NeoMakes 대표", founderImageUrl: "/images/main-page/lee-do-hyeon.png" },
  { id: "lee-min-seok", founderName: "이민석", companyName: "비바디오스", bounty: "비바디오스 대표", founderImageUrl: "/images/main-page/lee-min-seok.png" },
  { id: "lee-yun-seok", founderName: "이윤석", companyName: "두잇", bounty: "두잇 창업자", founderImageUrl: "/images/main-page/lee-yun-seok.png" },
  { id: "lee-jae-heon", founderName: "이재헌", companyName: "직행", bounty: "직행 창업자", founderImageUrl: "/images/main-page/lee-jae-heon.png" },
  { id: "lim-yeon-jae", founderName: "임연재", companyName: "SENEH Robotics", bounty: "SENEH Robotics 창업자", founderImageUrl: "/images/main-page/lim-yeon-jae.png" },
  { id: "jeong-geun-sik", founderName: "정근식", companyName: "리필드", bounty: "리필드 대표", founderImageUrl: "/images/main-page/jeong-geun-sik.png" },
  { id: "ji-dong-hwan", founderName: "지동환", companyName: "Rhetoric", bounty: "Rhetoric 창업자", founderImageUrl: "/images/main-page/ji-dong-hwan.png" },
  { id: "ji-hyeon-jun", founderName: "지현준", companyName: "바카티오", bounty: "바카티오 창업자", founderImageUrl: "/images/main-page/ji-hyeon-jun.png" },
  { id: "choi-jae-hyeong", founderName: "최재형", companyName: "커브길에서", bounty: "커브길에서 창업자", founderImageUrl: "/images/main-page/choi-jae-hyeong.jpg" },
  { id: "pyo-si-hyeong", founderName: "표시형", companyName: "아이언피그", bounty: "아이언피그 창업자", founderImageUrl: "/images/main-page/pyo-si-hyeong.png" },
];

const LEAD_IDS = ["kim-jin-woo", "oh-jun-ho", "pyo-si-hyeong"];
const ALL = [...FEATURED, ...REST];

const PEOPLE: Brother[] = [
  ...LEAD_IDS.map((id) => {
    const person = ALL.find((entry) => entry.id === id);
    if (!person) throw new Error(`Missing poster for ${id}`);
    return person;
  }),
  ...ALL.filter((person) => !LEAD_IDS.includes(person.id)).sort((a, b) =>
    a.founderName.localeCompare(b.founderName, "ko"),
  ),
];

function postersPerView() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export function SeniorsGrid() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const maxIndex = Math.max(0, PEOPLE.length - perView);

  useEffect(() => {
    const sync = () => {
      const next = postersPerView();
      setPerView(next);
      setIndex((current) => Math.min(current, Math.max(0, PEOPLE.length - next)));
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  function step(direction: -1 | 1) {
    setIndex((current) => Math.min(maxIndex, Math.max(0, current + direction)));
  }

  return (
    <section id="seniors" className="relative overflow-hidden bg-night px-6 py-16 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(230,195,106,0.05),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-bone"
        >
          {copy.title}
        </motion.h2>

        <div className="relative mt-12">
          <button
            type="button"
            aria-label={copy.prev}
            disabled={index === 0}
            onClick={() => step(-1)}
            className="absolute top-1/2 left-0 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-hall text-xl text-bone transition hover:border-bone/40 hover:text-gold disabled:pointer-events-none disabled:opacity-30 sm:-left-2"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={copy.next}
            disabled={index >= maxIndex}
            onClick={() => step(1)}
            className="absolute top-1/2 right-0 z-20 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-hall text-xl text-bone transition hover:border-bone/40 hover:text-gold disabled:pointer-events-none disabled:opacity-30 sm:-right-2"
          >
            →
          </button>

          <div className="overflow-hidden px-2">
            <motion.div
              className="flex"
              animate={{ x: `${-index * (100 / PEOPLE.length)}%` }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ width: `${(PEOPLE.length / perView) * 100}%` }}
            >
              {PEOPLE.map((person, personIndex) => (
                <div
                  key={person.id}
                  className="px-2 sm:px-3"
                  style={{ width: `${100 / PEOPLE.length}%` }}
                >
                  <div className="relative mx-auto aspect-[760/1120] w-full max-w-[22rem]">
                    <WantedPosterCanvas
                      brother={person}
                      posterNumber={String(personIndex + 1).padStart(2, "0")}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
