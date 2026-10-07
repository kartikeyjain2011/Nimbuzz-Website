import type { Metadata } from "next";
import { ExploreGames } from "@/components/dashboard/ExploreGames";
import { FeaturedCarousel } from "@/components/dashboard/FeaturedCarousel";
import { catalog, gamesPageFeatured } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: "Games — Nimbus",
};

export default function GamesPage() {
  return (
    <>
      <FeaturedCarousel slides={gamesPageFeatured} />
      <div className="relative z-10 mx-auto -mt-6 flex max-w-[1100px] flex-col px-4 pb-16 sm:-mt-10 sm:px-[34px]">
        <ExploreGames games={catalog} />
      </div>
    </>
  );
}
