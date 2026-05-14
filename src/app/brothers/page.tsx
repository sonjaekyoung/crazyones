import type { Metadata } from "next";
import { BrothersGrid } from "@/components/brothers/brothers-grid";

export const metadata: Metadata = {
  title: "광인 형제",
  description:
    "우리는 같은 집에 모였고, 각자의 전장에서 깃발을 꽂고 있다. 광인회관의 형제들.",
};

export default function BrothersPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-24 sm:pt-32">
        <p className="font-display text-[11px] tracking-[0.3em] text-ash">
          family... brother.. friend..
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          광인 형제
        </h1>
        <p className="mt-6 max-w-xl text-[1.4rem] text-mist sm:text-[1.575rem]">
          우리는 같은 집에 모였고,
          <br />
          각자의 전장에서 깃발을 꽂고 있다.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <BrothersGrid />
        <p className="mt-10 text-center font-display text-[10px] uppercase tracking-[0.4em] text-ash/60">
          곧 새 형제가 합류한다
        </p>
      </section>
    </>
  );
}
