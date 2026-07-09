"use client";

import { useLayoutEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { HeroFlag } from "@/components/home/hero-flag";
import { BrothersMarquee } from "@/components/home/brothers-marquee";
import { EnvironmentCTA } from "@/components/home/environment-cta";
import { FullQuote } from "@/components/home/full-quote";
import { WhoLives } from "@/components/home/who-lives";
import { AlumniSection } from "@/components/home/alumni-section";
import { SeniorsGrid } from "@/components/home/seniors-grid";
import { InvestorsGrid } from "@/components/home/investors-grid";
import { VideoSection } from "@/components/home/video-section";
import { FaqSection } from "@/components/home/faq-section";

export default function EnglishPage() {
  const { setLanguage } = useLanguage();

  // Run before first paint so header/footer also flip to English immediately
  useLayoutEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  return (
    <>
      <HeroFlag />
      <BrothersMarquee />
      <EnvironmentCTA />
      <FullQuote />
      <WhoLives />
      <AlumniSection />
      <SeniorsGrid />
      <InvestorsGrid />
      <VideoSection />
      <FaqSection />
    </>
  );
}
