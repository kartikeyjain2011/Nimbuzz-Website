"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { dashArt, dashIcon, type DashGame } from "@/lib/dashboard";
import { features, gameHref, stores, type GameDetail } from "@/lib/gameDetail";
import { Reveal } from "../Reveal";
import { Icon } from "../ui";
import { PlusIcon } from "./icons";
import { LaunchModal } from "./LaunchModal";
import { DashPoster, RowHeader, Scroller } from "./Rows";

const tabs = [
  { id: "details", label: "Details" },
  { id: "store", label: "Store" },
  { id: "media", label: "Media" },
  { id: "publishers", label: "Publishers" },
  { id: "similar", label: "Similar Games" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ghostBtn = "bg-white/[0.03] outline outline-1 -outline-offset-1 outline-white/10 transition-all duration-300 hover:outline-white/40";

function Hero({ game }: { game: GameDetail }) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [launching, setLaunching] = useState(false);

  return (
    <section className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[1038/584]">
      <Image src={game.backdrop} alt="" fill priority sizes="(min-width: 1280px) 1038px, 100vw" className="animate-[ken-burns_10s_ease-out_both] object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="absolute bottom-6 left-4 flex max-w-[380px] flex-col gap-4 sm:bottom-10 sm:left-[34px]">
        <div className="flex animate-[fade-in_700ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col gap-1.5">
          {game.logo ? (
            <Image src={game.logo} alt={game.title} width={337} height={125} className="h-auto max-h-[125px] w-auto max-w-[280px] object-contain object-left sm:max-w-[337px]" />
          ) : (
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{game.title}</h1>
          )}
          <p className="text-xs text-[#D0D0D0]">{game.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#D0D0D0]">
            <span>{game.genreLine}</span>
            <span className="h-4 w-px bg-white/60" />
            <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5">
              <Image src={dashArt.ratingStar} alt="" width={12} height={12} />
              {game.rating}
            </span>
            <span className="h-4 w-px bg-white/60" />
            <span className="rounded-full bg-black/70 px-2 py-0.5">{game.release}</span>
          </div>
        </div>

        <div className="flex animate-[fade-in_700ms_cubic-bezier(0.16,1,0.3,1)_120ms_both] items-center gap-2.5">
          <button type="button" onClick={() => setLaunching(true)} className="flex h-8 w-[120px] items-center justify-center gap-1 rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]">
            <Icon name={dashIcon("at-icons_play")} className="size-4" /> Play Now
          </button>
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            className={`flex h-8 w-[120px] items-center justify-center gap-1 rounded-md text-xs font-bold ${saved ? "bg-brand/15 text-brand outline outline-1 -outline-offset-1 outline-brand" : `text-white ${ghostBtn}`}`}
          >
            <PlusIcon className={`size-4 transition-transform duration-300 ${saved ? "rotate-45" : ""}`} />
            {saved ? "In Library" : "Add to Library"}
          </button>
          <button
            type="button"
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={liked}
            onClick={() => setLiked((l) => !l)}
            className={`flex size-8 items-center justify-center rounded-md ${liked ? "text-[#EA3232]" : "text-[#D9D9D9]"} ${ghostBtn}`}
          >
            <Icon name={dashIcon("basil_heart-outline")} className={`size-5 transition-transform duration-300 ${liked ? "scale-125" : ""}`} />
          </button>
          <button type="button" aria-label="More options" className={`flex size-8 items-center justify-center rounded-md text-[#D9D9D9] ${ghostBtn}`}>
            <Icon name={dashIcon("akar-icons_more-horizontal")} className="size-4 rotate-90" />
          </button>
        </div>

        <div className="flex animate-[fade-in_700ms_cubic-bezier(0.16,1,0.3,1)_240ms_both] flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#D0D0D0]">
          <span className="flex items-center gap-2">
            <Icon name={dashIcon("ep_monitor-1")} className="size-4 text-[#D9D9D9]" />
            Platform: {game.platforms}
          </span>
          <span className="hidden h-4 w-px bg-white/60 sm:block" />
          <span className="flex items-center gap-2">
            <Icon name={dashIcon("famicons_card-outline")} className="size-5 text-[#D9D9D9]" />
            Availability: {game.plan}
          </span>
        </div>
      </div>

      <div className="absolute right-4 bottom-6 hidden flex-col items-center gap-3 sm:right-[34px] sm:bottom-10 sm:flex">
        <p className="text-[13px] font-medium text-white">Launch via</p>
        <div className="flex gap-2">
          {stores.map((s) => (
            <button key={s.name} type="button" onClick={() => setLaunching(true)} aria-label={`Launch via ${s.name}`} className="flex size-[31px] items-center justify-center rounded-full bg-white/[0.03] text-white outline outline-[0.7px] -outline-offset-[0.7px] outline-white/80 transition-transform hover:scale-110">
              <Icon name={s.icon} className="size-5" />
            </button>
          ))}
        </div>
      </div>
      <LaunchModal open={launching} onClose={() => setLaunching(false)} title={game.title} poster={game.poster} backdrop={game.backdrop} playHref={`/play/${game.slug}`} />
    </section>
  );
}

function TabBar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  const refs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const [bar, setBar] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = refs.current[active];
    if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <nav className="sticky top-[60px] z-20 -mx-4 bg-black/85 px-4 pt-4 backdrop-blur-md sm:-mx-[34px] sm:px-[34px]">
      <div className="no-scrollbar relative flex gap-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`shrink-0 text-base whitespace-nowrap transition-colors ${active === t.id ? "font-medium text-white" : "text-white/60 hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
        <span aria-hidden className="absolute bottom-0 h-0.5 rounded-full bg-white transition-all duration-500 ease-snap" style={{ left: bar.left, width: bar.width }} />
      </div>
    </nav>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-xl font-bold text-white">{children}</h2>;
}

function MediaSection({ game }: { game: GameDetail }) {
  const [playing, setPlaying] = useState(false);
  const [main, ...thumbs] = game.gallery;
  const [selected, setSelected] = useState(main);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-[19px]">
      <div className="group relative aspect-video w-full overflow-hidden rounded-[19px] outline-[2.38px] -outline-offset-[2.38px] outline-white/80 md:w-[338px] md:shrink-0">
        {playing && game.trailer ? (
          <video src={game.trailer} autoPlay controls playsInline className="absolute inset-0 size-full bg-black object-cover" />
        ) : (
          <>
            <Image src={selected} alt="" fill sizes="338px" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_60%)]" />
            <p className="absolute top-4 left-3 right-3 text-base text-white">{game.trailerTitle}</p>
            {game.trailer && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play trailer"
                className="absolute top-1/2 left-1/2 flex size-[49px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.03] text-white outline outline-1 -outline-offset-1 outline-white/10 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-brand"
              >
                <Icon name={dashIcon("at-icons_play")} className="size-6" />
              </button>
            )}
          </>
        )}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 md:h-[190px] md:grid-rows-[105px_1fr]">
        {[main, ...thumbs].slice(0, 3).map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => {
              setSelected(src);
              setPlaying(false);
            }}
            className={`relative aspect-video overflow-hidden rounded-lg outline outline-1 -outline-offset-1 transition-all duration-300 md:aspect-auto ${i === 0 ? "col-span-2" : ""} ${
              selected === src ? "outline-brand" : "outline-white/80 hover:outline-brand/60"
            }`}
          >
            <Image src={src} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 hover:scale-110" />
          </button>
        ))}
      </div>
    </div>
  );
}

function LinkedRow({ title, games }: { title: string; games: DashGame[] }) {
  return (
    <Reveal step="first" className="flex flex-col gap-2.5">
      <RowHeader title={title} href="/dashboard/games" />
      <Scroller>
        {games.map((g) => (
          <Link key={g.title} href={gameHref(g.title)}>
            <DashPoster {...g} />
          </Link>
        ))}
      </Scroller>
    </Reveal>
  );
}

export function GameDetailView({ game }: { game: GameDetail }) {
  const [active, setActive] = useState<TabId>("details");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id as TabId);
      },
      { rootMargin: "-130px 0px -55% 0px" },
    );
    tabs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: TabId) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero game={game} />
      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col gap-[30px] px-4 pb-16 sm:px-[34px]">
        <TabBar active={active} onSelect={go} />

        <section id="details" className="flex scroll-mt-32 flex-col gap-2.5">
          <Reveal step="first" className="flex flex-col gap-2.5">
            <SectionTitle>{`About ${game.title}`}</SectionTitle>
            <p className="max-w-[747px] text-sm leading-relaxed text-[#D0D0D0]">{game.about}</p>
            <div className="flex flex-wrap gap-1.5">
              {game.tags.map((t) => (
                <span key={t} className="rounded-full bg-[#1E1E1E] px-2.5 py-0.5 text-xs leading-5 text-white transition-colors hover:bg-brand/30">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="store" className="flex scroll-mt-32 flex-col gap-6">
          <Reveal step="first" className="flex flex-col gap-2.5">
            <SectionTitle>Store</SectionTitle>
            <div className="flex gap-4">
              {stores.map((s) => (
                <span key={s.name} title={s.name} className="relative">
                  <span className={`flex size-9 items-center justify-center rounded-lg text-white ${s.bg} ${s.name === "Steam" ? "rounded-full" : ""}`}>
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <Icon name={dashIcon("teenyicons_tick-circle-solid")} className="absolute -right-1 -bottom-1 size-3 text-[#1DB954]" />
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal step="second" className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:max-w-[658px]">
            {features.map((f, i) => (
              <div
                key={f.label}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group relative flex h-[66px] animate-[fade-in_600ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col justify-center gap-2 overflow-hidden rounded-lg bg-[#0B0B0B] px-2.5 outline outline-[0.5px] -outline-offset-[0.5px] outline-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:outline-brand"
              >
                <span aria-hidden className="absolute -top-28 left-[120px] h-[182px] w-[472px] rounded-full bg-[rgba(1,218,127,0.53)] blur-[100px] transition-transform duration-700 group-hover:-translate-x-10" />
                <Icon name={f.icon} className="relative size-5 text-[#D9D9D9]" />
                <span className="relative text-sm text-[#B9B9B9]">{f.label}</span>
              </div>
            ))}
          </Reveal>
        </section>

        <section id="media" className="flex scroll-mt-32 flex-col gap-2.5">
          <Reveal step="first" className="flex flex-col gap-2.5">
            <SectionTitle>Media</SectionTitle>
            <MediaSection game={game} />
          </Reveal>
        </section>

        <section id="publishers" className="flex scroll-mt-32 flex-col gap-[30px]">
          <Reveal step="first" className="flex flex-col gap-2.5">
            <SectionTitle>Publishers</SectionTitle>
            {game.publisherLogo && <Image src={game.publisherLogo} alt="Publisher" width={98} height={30} className="h-[30px] w-auto object-contain object-left" />}
            <p className="text-xs leading-relaxed text-[#D0D0D0]">{game.publisher}</p>
          </Reveal>
          <Reveal step="first" className="flex flex-col gap-2.5">
            <SectionTitle>Age</SectionTitle>
            <span className="flex h-[72px] w-[51px] flex-col items-center justify-center rounded-md bg-[#E2231A] text-white shadow-[0_6px_20px_rgba(226,35,26,0.35)]">
              <span className="text-2xl leading-none font-bold">{game.age.rating}</span>
              <span className="mt-1 text-[8px] tracking-widest">PEGI</span>
            </span>
            <p className="text-xs text-[#D0D0D0]">{game.age.descriptors}</p>
          </Reveal>
        </section>

        <section id="similar" className="flex scroll-mt-32 flex-col gap-[30px]">
          <LinkedRow title="Similar Games" games={game.similar} />
          <LinkedRow title="Games You May Like" games={game.mayLike} />
        </section>
      </div>
    </>
  );
}
