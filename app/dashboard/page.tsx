import { FeaturedCarousel } from "@/components/dashboard/FeaturedCarousel";
import { ContinueRow, PosterRow, RankedRow, RecommendedRow } from "@/components/dashboard/Rows";
import { continuePlaying, newGames, popularGames, recommended, trendingNow } from "@/lib/dashboard";

export default function DashboardHome() {
  return (
    <>
      <FeaturedCarousel />
      <div className="relative z-10 mx-auto -mt-6 flex max-w-[1100px] flex-col gap-10 px-4 pb-16 sm:-mt-10 sm:gap-[50px] sm:px-[34px]">
        <div id="continue" className="scroll-mt-20">
          <ContinueRow games={continuePlaying} />
        </div>
        <RankedRow id="trending" title="Trending Now" games={trendingNow} />
        <PosterRow id="popular" title="Popular Games" games={popularGames} />
        <PosterRow id="new" title="New Games" games={newGames} />
        <RecommendedRow games={recommended} />
      </div>
    </>
  );
}
