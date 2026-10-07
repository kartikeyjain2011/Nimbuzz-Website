"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { type DashGame, type Genre, genres } from "@/lib/dashboard";
import { Reveal } from "../Reveal";
import { ChevronIcon, PlayIcon } from "./icons";

/** Horizontal scroller with fade edge and arrow buttons. */
export function Scroller({ children, gap = "gap-[19px]" }: { children: ReactNode; gap?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="group/row relative">
      <div ref={ref} className={`no-scrollbar -mx-4 flex snap-x overflow-x-auto scroll-px-4 px-4 py-2 sm:mx-0 sm:px-0 [&>*]:snap-start ${gap}`}>
        {children}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-[linear-gradient(270deg,#0A0A0A_0%,rgba(10,10,10,0)_100%)]" />
      {[-1, 1].map((dir) => (
        <button
          key={dir}
          type="button"
          aria-label={dir === 1 ? "Scroll right" : "Scroll left"}
          onClick={() => scroll(dir as 1 | -1)}
          className={`absolute top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white opacity-0 outline outline-1 outline-white/30 backdrop-blur transition-opacity duration-300 group-hover/row:opacity-100 hover:bg-brand sm:flex ${
            dir === 1 ? "right-2" : "left-2"
          }`}
        >
          <ChevronIcon className={`size-4 ${dir === -1 ? "rotate-180" : ""}`} />
        </button>
      ))}
    </div>
  );
}

export function RowHeader({ title, href = "#", children }: { title: string; href?: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="shrink-0 text-base font-bold text-white">{title}</h2>
      {children}
      <a href={href} className="group flex shrink-0 items-center gap-1 text-xs text-white">
        View all
        <ChevronIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

function Fallback({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-start justify-end bg-[radial-gradient(circle_at_30%_20%,rgba(22,163,74,0.35),transparent_60%),linear-gradient(160deg,#1a1f1c,#0a0a0a)] p-3">
      <span className="text-[40px] leading-none font-bold text-white/10">{title.charAt(0)}</span>
    </div>
  );
}

export function DashPoster({ title, image, small = false }: DashGame & { small?: boolean }) {
  return (
    <div
      className={`group relative shrink-0 cursor-pointer overflow-hidden shadow-poster outline -outline-offset-[1.39px] outline-white/80 transition-all duration-500 ease-snap hover:-translate-y-2 hover:outline-brand ${
        small ? "h-[145px] w-[93px] rounded-md outline-[0.77px]" : "h-[259px] w-[166px] rounded-[11px] outline-[1.39px]"
      }`}
    >
      {image ? (
        <Image src={image} alt={title} fill sizes={small ? "93px" : "166px"} className="object-cover transition-transform duration-700 ease-snap group-hover:scale-110" />
      ) : (
        <Fallback title={title} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_50%,#000_100%)]" />
      <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center rounded-full bg-brand text-white opacity-0 shadow-glow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <PlayIcon className="size-4" />
      </span>
      <p className={`absolute capitalize text-white leading-tight ${small ? "inset-x-1.5 bottom-2 text-[9px]" : "inset-x-2.5 bottom-3 text-[16.62px]"}`}>{title}</p>
    </div>
  );
}

type ContinueGame = { title: string; image?: string; hours: number; progress: number };

export function ContinueCard({ title, image, hours, progress }: ContinueGame) {
  return (
    <div className="group relative h-[140px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-lg outline outline-1 -outline-offset-1 outline-white/80 transition-all duration-500 ease-snap hover:-translate-y-1 hover:outline-brand sm:w-[310px]">
      {image ? (
        <Image src={image} alt="" fill sizes="310px" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-110" />
      ) : (
        <Fallback title={title} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,#000_100%)]" />
      <div className="absolute bottom-3 left-[11px] flex w-[243px] flex-col gap-1.5">
        <p className="text-base text-white">{title}</p>
        <div className="h-1 w-[165px] overflow-hidden rounded-full bg-[#333338]">
          <div
            className="h-full origin-left animate-[bar-grow_1.2s_cubic-bezier(0.16,1,0.3,1)_0.4s_both] rounded-full bg-[linear-gradient(90deg,#7C3AED_0%,#A855FF_100%)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="flex items-center gap-1.5 text-xs">
          <span className="text-[#D0D0D0]">{hours}H played</span>
          <span className="h-3.5 w-px bg-white/60" />
          <span className="text-[#B9B9B9]">{progress}%</span>
        </p>
      </div>
      <button type="button" aria-label={`Resume ${title}`} className="absolute right-3 bottom-3 flex size-6 items-center justify-center rounded-[4.4px] bg-brand text-white shadow-[0_0_36px_1.5px_rgba(22,163,74,0.28)] transition-transform duration-300 group-hover:scale-125">
        <PlayIcon className="size-3" />
      </button>
    </div>
  );
}

export function ContinueRow({ games }: { games: ContinueGame[] }) {
  return (
    <Reveal step="first" className="flex flex-col gap-4">
      <RowHeader title="Continue Playing" />
      <Scroller>
        {games.map((g) => (
          <ContinueCard key={g.title} {...g} />
        ))}
      </Scroller>
    </Reveal>
  );
}

export function PosterRow({ id, title, games }: { id?: string; title: string; games: DashGame[] }) {
  return (
    <Reveal step="first" className="flex scroll-mt-20 flex-col gap-4">
      <section id={id} className="flex flex-col gap-4">
        <RowHeader title={title} />
        <Scroller>
          {games.map((g) => (
            <DashPoster key={g.title} {...g} />
          ))}
        </Scroller>
      </section>
    </Reveal>
  );
}

export function RankedRow({ id, title, games }: { id?: string; title: string; games: DashGame[] }) {
  return (
    <Reveal step="first">
      <section id={id} className="flex scroll-mt-20 flex-col">
        <RowHeader title={title} />
        <Scroller gap="gap-[10px] sm:gap-[19px]">
          {games.map((g, i) => (
            <div key={g.title} className="relative h-[197px] w-[151px] shrink-0 sm:h-[330px] sm:w-[271px]">
              <span className="absolute top-0 left-0 font-inter text-[167px] leading-none font-bold text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,0.35)] sm:text-[300px] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.35)]">
                {i + 1}
              </span>
              <div className="absolute top-[34px] left-[58px] sm:top-[62px] sm:left-[105px]">
                <div className="origin-top-left scale-[0.558] sm:scale-100">
                  <DashPoster {...g} />
                </div>
              </div>
            </div>
          ))}
        </Scroller>
      </section>
    </Reveal>
  );
}

export function RecommendedRow({ games }: { games: DashGame[] }) {
  const [genre, setGenre] = useState<"All" | Genre>("All");
  const visible = genre === "All" ? games : games.filter((g) => g.genres?.includes(genre));

  return (
    <Reveal step="first">
      <section id="recommended" className="flex scroll-mt-20 flex-col gap-4">
        <RowHeader title="Recommended For You">
          <div className="relative hidden min-w-0 flex-1 md:block">
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-1 py-1">
              {genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`relative shrink-0 overflow-hidden rounded-full px-3.5 py-1 text-sm leading-5 font-medium outline outline-1 -outline-offset-1 transition-all duration-300 ${
                    genre === g ? "text-brand outline-brand" : "text-white outline-white/80 hover:outline-brand/60"
                  }`}
                >
                  {genre === g && <span aria-hidden className="absolute inset-0 bg-brand/15" />}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(270deg,#0A0A0A,rgba(10,10,10,0))]" />
          </div>
        </RowHeader>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:hidden">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenre(g)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium outline outline-1 -outline-offset-1 ${genre === g ? "bg-brand/15 text-brand outline-brand" : "text-white outline-white/60"}`}
            >
              {g}
            </button>
          ))}
        </div>
        <Scroller>
          {visible.length ? (
            visible.map((g) => (
              <div key={`${genre}-${g.title}`} className="animate-[fade-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]">
                <DashPoster {...g} />
              </div>
            ))
          ) : (
            <p className="flex h-[259px] items-center text-sm text-[#888]">No {genre.toLowerCase()} picks yet — check back soon.</p>
          )}
        </Scroller>
      </section>
    </Reveal>
  );
}
