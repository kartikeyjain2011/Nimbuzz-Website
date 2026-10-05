"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GameDetails } from "@/lib/games";
import { GamePreview } from "./GamePreview";
import { Photo } from "./ui";

type GameCardProps = {
  title: string;
  image: string;
  trailer?: string;
  details?: GameDetails;
  capitalize?: boolean;
  className?: string;
  children?: ReactNode;
};

const OPEN_DELAY = 250;
const CLOSE_DELAY = 120;

/**
 * Poster card. With `details`, hovering opens an expanded preview card;
 * otherwise the trailer (if any) plays inside the poster.
 */
export function GameCard({ title, image, trailer, details, capitalize = false, className = "", children }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hovering = useRef(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!anchor) return;
    const close = () => setAnchor(null);
    window.addEventListener("scroll", close, { passive: true, capture: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, { capture: true });
      window.removeEventListener("resize", close);
    };
  }, [anchor]);

  useEffect(
    () => () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    },
    [],
  );

  const keepOpen = () => clearTimeout(closeTimer.current);

  const start = () => {
    hovering.current = true;
    if (details) {
      keepOpen();
      openTimer.current = setTimeout(() => {
        if (cardRef.current) setAnchor(cardRef.current.getBoundingClientRect());
      }, OPEN_DELAY);
      return;
    }
    if (!trailer) return;
    setArmed(true);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setPlaying(true)).catch(() => {});
  };

  const stop = () => {
    hovering.current = false;
    if (details) {
      clearTimeout(openTimer.current);
      closeTimer.current = setTimeout(() => setAnchor(null), CLOSE_DELAY);
      return;
    }
    setPlaying(false);
    videoRef.current?.pause();
  };

  const inlineTrailer = !details && trailer;

  return (
    <div
      ref={cardRef}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      tabIndex={details ? 0 : undefined}
      className={`group relative h-[259px] w-[166px] shrink-0 overflow-hidden rounded-[11px] shadow-poster outline outline-[1.39px] -outline-offset-[1.39px] outline-white/80 transition-all duration-500 ease-snap hover:-translate-y-2 hover:outline-brand ${className}`}
    >
      <Photo src={image} alt={title} sizes="166px" className="transition-transform duration-700 ease-snap group-hover:scale-110" />
      {inlineTrailer && (
        <video
          ref={videoRef}
          src={armed ? trailer : undefined}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => {
            if (hovering.current) start();
          }}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_50%,#000_100%)] transition-opacity duration-500 ${playing ? "opacity-40" : ""}`} />
      <p className={`absolute inset-x-2.5 bottom-3 text-[16.62px] leading-tight text-white ${capitalize ? "capitalize" : ""}`}>{title}</p>
      {inlineTrailer && (
        <span className={`absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[10px] tracking-wider text-accent transition-opacity ${playing ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          ▶ TRAILER
        </span>
      )}
      {children}
      {details && anchor && (
        <GamePreview
          title={title}
          details={details}
          anchor={anchor}
          onEnter={keepOpen}
          onLeave={() => setAnchor(null)}
        />
      )}
    </div>
  );
}
