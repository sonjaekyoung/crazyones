import { Hero } from "@/components/landing/hero";
import { Intro } from "@/components/landing/intro";
import { OathStory } from "@/components/landing/oath-story";
import { DotsConnected } from "@/components/landing/dots-connected";
import { CompaniesGrid } from "@/components/landing/companies-grid";
import { RecentRecords } from "@/components/landing/recent-records";
import { NextBrotherCTA } from "@/components/landing/next-brother-cta";

export default function Page() {
  return (
    <>
      <Hero />
      <Intro />
      <OathStory />
      <DotsConnected />
      <CompaniesGrid />
      <RecentRecords />
      <NextBrotherCTA />
    </>
  );
}
