import { Cta } from "@/components/sections/Cta";
import { Discover } from "@/components/sections/Discover";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { PlayAnywhere } from "@/components/sections/PlayAnywhere";
import { Pricing } from "@/components/sections/Pricing";
import { Trending } from "@/components/sections/Trending";

export default function Home() {
  return (
    <div className="overflow-x-clip bg-black">
      <Navbar />
      <Hero />
      <main className="mx-auto flex max-w-[1653px] flex-col gap-16 px-4 pt-10 pb-6 md:gap-40 md:pb-10 md:px-[38px]">
        <Discover />
        <HowItWorks />
        <Trending />
        <PlayAnywhere />
        <Pricing />
        <Faq />
        <div className="flex flex-col gap-20">
          <Cta />
          <Footer />
        </div>
      </main>
    </div>
  );
}
