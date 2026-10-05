"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { logos, posters, scenes, trailers } from "@/lib/media";
import { Reveal } from "../Reveal";
import { Button, Highlight, Photo } from "../ui";

type Featured = { title: string; poster: string; scene: string; trailer?: string; logo?: string };

const featured: Featured[] = [
  { title: "Ghost Recon Breakpoint", poster: posters.ghostRecon, scene: scenes.ghostRecon, trailer: trailers.ghostRecon, logo: logos.ghostRecon },
  { title: "The Last of Us Part 1", poster: posters.lastOfUs, scene: scenes.lastOfUs, trailer: trailers.lastOfUs, logo: logos.lastOfUs },
  { title: "Assassins Creed Shadows", poster: posters.acShadows, scene: scenes.shadows, trailer: trailers.acShadows, logo: logos.shadows },
];

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [trailerReady, setTrailerReady] = useState(false);

  useEffect(() => {
    if (hovered !== null) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % featured.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, hovered]);

  const shown = hovered ?? active;
  const current = featured[shown];
  const trailer = hovered !== null ? featured[hovered].trailer : undefined;

  const preview = (i: number) => {
    if (i !== hovered) setTrailerReady(false);
    setHovered(i);
  };

  const endPreview = () => {
    setHovered(null);
    setTrailerReady(false);
  };

  return (
    <section className="relative px-2.5 pt-4">
      <div className="relative mx-auto h-[937px] max-w-[1703px] overflow-hidden rounded-[30px]">
        {featured.map((game, i) => (
          <div
            key={game.title}
            aria-hidden={i !== shown}
            className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-snap ${i === shown ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          >
            <Photo src={game.scene} priority={i === 0} />
          </div>
        ))}

        {trailer && (
          <video
            key={trailer}
            src={trailer}
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setTrailerReady(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-snap ${trailerReady ? "opacity-100" : "opacity-0"}`}
          />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[523px] bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)]" />

        {current.logo && (
          <Image key={current.title} src={current.logo} alt={current.title} width={148} height={55} className="absolute top-[42px] right-12 hidden h-auto w-[148px] animate-[fade-in_600ms_ease-out] md:block" />
        )}

        <div className="relative flex h-full flex-col justify-end gap-12 px-6 pb-16 md:px-11 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex max-w-[625px] flex-col gap-[30px] xl:mb-[243px]">
            <Reveal step="first">
              <h1 className="text-[56px] leading-none text-white md:text-[100px]">
                Big worlds. No <Highlight>limits.</Highlight>
              </h1>
            </Reveal>
            <Reveal step="second">
              <p className="max-w-[561px] text-xl leading-[30px] text-white">
                Your next adventure isn’t tied to a gaming rig. Discover games and stream them to the screen you already have.
              </p>
            </Reveal>
            <Reveal step="third" className="flex flex-wrap gap-[15px]">
              <Button arrow className="w-[182px] font-medium" href="#pricing">Join Today</Button>
              <Button variant="ghost" arrow className="w-[182px]" href="#discover">Explore games</Button>
            </Reveal>
          </div>

          <Reveal step="third">
            <div
              role="tablist"
              aria-label="Featured games"
              className="no-scrollbar flex gap-[19px] overflow-x-auto pt-3 pb-2 xl:overflow-visible"
              onMouseLeave={endPreview}
            >
              {featured.map((game, i) => {
                const isActive = i === shown;
                return (
                  <button
                    key={game.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => preview(i)}
                    onFocus={() => preview(i)}
                    onBlur={endPreview}
                    className={`group relative h-[259px] w-[166px] shrink-0 cursor-pointer overflow-hidden rounded-xl text-left shadow-poster outline -outline-offset-[1.39px] transition-all duration-500 ease-snap ${
                      isActive ? "-translate-y-3 outline-2 outline-brand shadow-glow" : "outline-[1.39px] outline-white/80 hover:-translate-y-1.5"
                    }`}
                  >
                    <Photo src={game.poster} alt={game.title} sizes="166px" className="transition-transform duration-700 ease-snap group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_50%,#000_100%)]" />
                    {game.trailer && (
                      <span
                        className={`absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] tracking-wider text-accent transition-opacity ${
                          hovered === i && trailerReady ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {hovered === i && trailerReady ? "● PLAYING" : "▶ TRAILER"}
                      </span>
                    )}
                    <p className="absolute inset-x-2.5 bottom-3 text-[16.62px] leading-tight text-white">{game.title}</p>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                      {isActive && hovered === null && (
                        <span
                          key={active}
                          className="block h-full origin-left bg-brand"
                          style={{ animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards` }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
