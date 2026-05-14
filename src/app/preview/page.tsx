import type { Metadata } from "next";
import { HeroFlag } from "@/components/home/hero-flag";
import { HeroFlagAmbient } from "@/components/home/hero-flag-ambient";
import { HeroKuangWall } from "@/components/home/hero-kuang-wall";

export const metadata: Metadata = {
  title: "Hero 비교",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <>
      <VariantHeader
        label="A · Full-bleed"
        desc="영상이 화면 전체. 안쪽에 비네트 + 골드 글로우."
      />
      <HeroFlag />

      <VariantHeader
        label="B · Ambient (앰비라이트)"
        desc="가운데 액자 영상 + 뒤에 블러된 영상 복제본이 색을 번지게 함."
      />
      <HeroFlagAmbient />

      <VariantHeader
        label="C · 狂의 벽"
        desc="108개의 작은 狂 한자가 그리드로 깔리고, 골드 글로우 + 미세한 흔들림으로 '광인의 노트' 느낌."
      />
      <HeroKuangWall />

      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="font-display text-[10px] uppercase tracking-[0.4em] text-ash">
          Note
        </p>
        <p className="mt-6 text-ash">
          A · B 는 영상 파일이 들어와야 차이가 보입니다.
          <br />C 는 영상 없이 그 자체로 hero — 영상이 들어오면 그 뒤/위에
          레이어로 깔 수도 있습니다.
        </p>
      </section>
    </>
  );
}

function VariantHeader({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-6 pt-16">
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold">
        {label}
      </p>
      <p className="mt-3 text-sm text-ash">{desc}</p>
    </div>
  );
}
