import { HeroFlag } from "@/components/home/hero-flag";
import { BrothersMarquee } from "@/components/home/brothers-marquee";
import { NewsletterCTA } from "@/components/home/newsletter-cta";

export default function Page() {
  return (
    <>
      <HeroFlag />
      <BrothersMarquee />
      <NewsletterCTA />
    </>
  );
}
