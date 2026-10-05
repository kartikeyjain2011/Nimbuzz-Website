"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import type { GameDetails } from "@/lib/games";
import { Icon } from "./ui";

export const PREVIEW_WIDTH = 420;

type GamePreviewProps = {
  title: string;
  details: GameDetails;
  anchor: DOMRect;
  onEnter: () => void;
  onLeave: () => void;
};

/** Expanded hover card, rendered in a portal so scrolling rows can't clip it. */
export function GamePreview({ title, details, anchor, onEnter, onLeave }: GamePreviewProps) {
  const [trailerReady, setTrailerReady] = useState(false);

  const margin = 16;
  const width = Math.min(PREVIEW_WIDTH, window.innerWidth - margin * 2);
  const left = Math.min(
    Math.max(anchor.left + anchor.width / 2 - width / 2, margin),
    window.innerWidth - width - margin,
  );
  const top = Math.max(anchor.top + anchor.height / 2 - 160, margin);

  return createPortal(
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ left, top, width }}
      className="fixed z-[60] flex origin-center animate-[preview-in_350ms_cubic-bezier(0.16,1,0.3,1)] flex-col gap-[13px] overflow-hidden rounded-[30px] bg-black shadow-poster outline outline-1 -outline-offset-1 outline-white/80"
    >
      <div className="relative h-[200px] overflow-hidden rounded-t-[30px]">
        <Image src={details.backdrop} alt="" fill sizes={`${PREVIEW_WIDTH}px`} className="object-cover" />
        {details.trailer && (
          <video
            src={details.trailer}
            autoPlay
            muted
            loop
            playsInline
            onPlaying={() => setTrailerReady(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${trailerReady ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_60%)]" />
        {!trailerReady && (
          <span className="absolute top-1/2 left-1/2 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#404040] bg-[rgba(240,240,240,0.3)] backdrop-blur-[12.5px]">
            <Icon name="../game-images/griddy-icons_play-circle-filled" className="size-9 text-white" />
          </span>
        )}
        {details.logo && (
          <Image src={details.logo} alt={title} width={173} height={56} className="absolute bottom-3 left-4 h-auto max-h-[56px] w-auto max-w-[173px] object-contain" />
        )}
      </div>

      <div className="flex flex-col gap-[13px] px-3.5 pb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-medium text-white capitalize">{title}</p>
          <a
            href="#pricing"
            aria-label={`Play ${title}`}
            className="flex size-[34px] shrink-0 items-center justify-center rounded-md bg-brand shadow-glow transition-transform hover:scale-110"
          >
            <Icon name="../game-images/at-icons_play" className="size-4 text-white" />
          </a>
        </div>
        <p className="text-sm text-[#d0d0d0]">{details.description}</p>
      </div>
    </div>,
    document.body,
  );
}
