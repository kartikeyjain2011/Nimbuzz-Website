"use client";

import Image from "next/image";
import Link from "next/link";
import { gameHref } from "@/lib/gameDetail";
import { useState } from "react";
import { type CatalogGame, type Genre, dashArt, dashIcon, genres } from "@/lib/dashboard";
import { Reveal } from "../Reveal";
import { Icon } from "../ui";
import { PlusIcon } from "./icons";

const PAGE_SIZE = 8;

function GameTile({ game, index }: { game: CatalogGame; index: number }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{ animationDelay: `${(index % PAGE_SIZE) * 60}ms` }}
      className="group relative aspect-[166/259] w-full animate-[fade-in_600ms_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-[11px] shadow-poster outline outline-[1.39px] -outline-offset-[1.39px] outline-white/80 transition-all duration-500 ease-snap hover:-translate-y-2 hover:outline-brand"
    >
      {game.image && (
        <Image src={game.image} alt={game.title} fill sizes="(min-width: 768px) 180px, 45vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_50%,#000_100%)]" />
      <Link href={gameHref(game.title)} aria-label={`View ${game.title}`} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-2 bottom-3 flex flex-col gap-1.5 [&_button]:pointer-events-auto">
        <p className="flex items-center gap-1 text-[10px] leading-5 text-white">
          <Image src={dashArt.ratingStar} alt="" width={10} height={10} />
          {game.rating}
        </p>
        <div className="flex items-end justify-between gap-1.5">
          <p className="line-clamp-2 flex-1 text-sm leading-tight text-white capitalize sm:text-base">{game.title}</p>
          <button
            type="button"
            aria-label={saved ? `Remove ${game.title} from library` : `Add ${game.title} to library`}
            aria-pressed={saved}
            onClick={() => setSaved((s) => !s)}
            className={`flex size-6 shrink-0 items-center justify-center rounded-md outline outline-1 -outline-offset-1 transition-all duration-300 ${
              saved ? "bg-brand/20 text-brand outline-brand" : "bg-white/[0.03] text-[#D9D9D9] outline-white/10 hover:outline-white/40"
            }`}
          >
            <PlusIcon className={`size-3.5 transition-transform duration-300 ${saved ? "rotate-45" : ""}`} />
          </button>
          <button
            type="button"
            aria-label={`Play ${game.title}`}
            className="flex size-6 shrink-0 items-center justify-center rounded-[4.4px] bg-brand text-white shadow-[0_0_36px_1.5px_rgba(22,163,74,0.28)] transition-transform duration-300 group-hover:scale-110"
          >
            <Icon name={dashIcon("at-icons_play")} className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExploreGames({ games }: { games: CatalogGame[] }) {
  const [genre, setGenre] = useState<"All" | Genre>("All");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = genre === "All" ? games : games.filter((g) => g.genres.includes(genre));
  const visible = filtered.slice(0, limit);

  const pick = (g: "All" | Genre) => {
    setGenre(g);
    setLimit(PAGE_SIZE);
  };

  return (
    <section id="explore" className="flex scroll-mt-20 flex-col gap-4">
      <Reveal step="first" className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-white">Explore Games</h1>
          <span className="text-xs text-white">120+ Games</span>
        </div>
        <p className="text-xs text-[#D0D0D0]">Discover new adventures and challenges waiting for you.</p>
      </Reveal>

      <Reveal step="second" className="relative">
        <span aria-hidden className="pointer-events-none absolute top-2 left-9 size-[90px] rounded-full bg-[rgba(1,218,127,0.53)] blur-[100px]" />
        <div role="tablist" aria-label="Filter by genre" className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-1">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={genre === g}
              onClick={() => pick(g)}
              className={`relative shrink-0 overflow-hidden rounded-full bg-black/5 px-3.5 py-1 text-sm leading-5 font-medium outline outline-1 -outline-offset-1 transition-all duration-300 ${
                genre === g ? "text-brand outline-brand" : "text-white outline-white/80 hover:-translate-y-0.5 hover:outline-brand/60"
              }`}
            >
              {genre === g && <span aria-hidden className="absolute inset-0 bg-brand/15" />}
              <span className="relative">{g}</span>
            </button>
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-[linear-gradient(270deg,#0A0A0A,rgba(10,10,10,0))]" />
      </Reveal>

      <div key={genre} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-[19px]">
        {visible.map((game, i) => (
          <GameTile key={game.title} game={game} index={i} />
        ))}
      </div>

      {visible.length === 0 && <p className="py-16 text-center text-sm text-[#888]">No {genre.toLowerCase()} games yet. Check back soon.</p>}

      {filtered.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + PAGE_SIZE)}
          className="mx-auto mt-4 flex h-9 items-center rounded-md bg-white/[0.03] px-5 text-xs font-bold text-white outline outline-1 -outline-offset-1 outline-white/20 transition-all hover:-translate-y-0.5 hover:outline-brand"
        >
          Load more games
        </button>
      )}
    </section>
  );
}
