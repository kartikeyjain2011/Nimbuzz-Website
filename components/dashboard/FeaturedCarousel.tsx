"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { dashArt, dashIcon, featured as defaultSlides, type FeaturedGame } from "@/lib/dashboard";
import { Icon } from "../ui";
import { MuteIcon, PlusIcon, VolumeIcon } from "./icons";

const PlayIcon = ({ className }: { className?: string }) => <Icon name={dashIcon("at-icons_play")} className={className} />;
const DotsIcon = ({ className }: { className?: string }) => <Icon name={dashIcon("akar-icons_more-horizontal")} className={`rotate-90 ${className ?? ""}`} />;

const SLIDE_MS = 8000;

export function FeaturedCarousel({ slides = defaultSlides }: { slides?: FeaturedGame[] }) {
  const featured = slides;
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % featured.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, featured.length]);

  const game = featured[index];
  const isSaved = saved.has(game.title);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[1038/584]"
    >
      {featured.map((slide, i) => (
        <div
          key={slide.title}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-snap ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.backdrop}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1280px) 1038px, 100vw"
            className={`object-cover ${i === index ? "animate-[ken-burns_8s_ease-out_both]" : ""}`}
          />
        </div>
      ))}

      {game.trailer && (
        <video
          key={game.trailer}
          src={game.trailer}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="absolute inset-0 size-full animate-[fade-in_1.2s_ease-out_1s_both] object-cover"
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)]" />

      <div key={game.title} className="absolute bottom-6 left-4 flex max-w-[337px] flex-col gap-4 sm:left-[34px] sm:bottom-10">
        <div className="flex animate-[fade-in_700ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col gap-1.5">
          {game.logo ? (
            <Image src={game.logo} alt={game.title} width={337} height={129} className="h-auto max-h-[110px] w-auto max-w-[280px] object-contain object-left sm:max-h-[129px] sm:max-w-[337px]" />
          ) : (
            <h1 className="text-3xl font-bold">{game.title}</h1>
          )}
          <p className="text-xs text-[#D0D0D0]">{game.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#D0D0D0]">
            <span>{game.genres}</span>
            <span className="h-4 w-px bg-white/60" />
            <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5">
              <Image src={dashArt.ratingStar} alt="" width={12} height={12} />
              {game.rating}
            </span>
            <span className="h-4 w-px bg-white/60" />
            <span className="rounded-full bg-black/70 px-2 py-0.5">{game.release}</span>
          </div>
        </div>
        <div className="flex animate-[fade-in_700ms_cubic-bezier(0.16,1,0.3,1)_150ms_both] items-center gap-2.5">
          <button type="button" className="flex h-8 w-[120px] items-center justify-center gap-1 rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]">
            <PlayIcon className="size-4" /> Play Now
          </button>
          <button
            type="button"
            onClick={() =>
              setSaved((prev) => {
                const next = new Set(prev);
                if (next.has(game.title)) next.delete(game.title);
                else next.add(game.title);
                return next;
              })
            }
            className={`flex h-8 w-[120px] items-center justify-center gap-1 rounded-md text-xs font-bold outline outline-1 -outline-offset-1 transition-all duration-300 ${
              isSaved ? "bg-brand/15 text-brand outline-brand" : "bg-white/[0.03] text-white outline-white/10 hover:outline-white/40"
            }`}
          >
            <PlusIcon className={`size-4 transition-transform duration-300 ${isSaved ? "rotate-45" : ""}`} />
            {isSaved ? "In Library" : "Add to Library"}
          </button>
          <button type="button" aria-label="More options" className="flex size-8 items-center justify-center rounded-md bg-white/[0.03] text-[#D9D9D9] outline outline-1 -outline-offset-1 outline-white/10 transition-colors hover:outline-white/40">
            <DotsIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="absolute right-4 bottom-6 flex flex-col items-end gap-3 sm:right-[34px] sm:bottom-10">
        {game.trailer && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute trailer" : "Mute trailer"}
            className="flex size-[31px] items-center justify-center rounded-full bg-white/[0.03] text-white outline outline-[0.7px] -outline-offset-[0.7px] outline-white/80 backdrop-blur transition-transform hover:scale-110"
          >
            {muted ? <MuteIcon className="size-4" /> : <VolumeIcon className="size-4" />}
          </button>
        )}
        <div className="flex items-center gap-1.5">
          {featured.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show ${slide.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-snap ${i === index ? "w-[33px] bg-white" : "w-1.5 bg-[#888] hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
