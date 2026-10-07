"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "../ui";

const STEP_MS = 3500;
const SECONDS_PER_PLACE = 22;

const icon = (file: string) => `/dashboard-icons/${file}`;

type QueueScreenProps = {
  title: string;
  logo?: string;
  backdrop: string;
  backHref: string;
  streamHref: string;
  startPosition?: number;
};

const formatWait = (position: number) => {
  const minutes = Math.max(1, Math.round((position * SECONDS_PER_PLACE) / 60));
  return `~ ${minutes} min`;
};

function StatRow({ iconFile, label, value }: { iconFile: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-[#1E1E1E] p-1.5">
      <span className="flex items-center gap-1.5 text-[10px] text-[#D0D0D0]">
        <span className="flex size-5 items-center justify-center rounded-[4px] bg-white/[0.03] outline outline-[0.6px] -outline-offset-[0.6px] outline-white/10">
          <Icon name={icon(iconFile)} className="size-3.5 text-[#D9D9D9]" />
        </span>
        {label}
      </span>
      <span key={value} className="animate-[fade-in_400ms_ease-out_both] text-[10px] font-bold text-white tabular-nums">
        {value}
      </span>
    </div>
  );
}

export function QueueScreen({ title, logo, backdrop, backHref, streamHref, startPosition = 8 }: QueueScreenProps) {
  const router = useRouter();
  const [position, setPosition] = useState(startPosition);
  const [notify, setNotify] = useState(false);
  const [staying, setStaying] = useState(false);

  useEffect(() => {
    if (position <= 0) return;
    const id = setTimeout(() => setPosition((p) => p - 1), STEP_MS);
    return () => clearTimeout(id);
  }, [position]);

  const ready = position <= 0;
  const progress = Math.round(((startPosition - position) / startPosition) * 100);

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black p-4">
      <Image src={backdrop} alt="" fill priority sizes="100vw" className="animate-[ken-burns_12s_ease-out_both] object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />

      <Link
        href={backHref}
        className="group absolute top-5 left-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-[#D0D0D0] backdrop-blur transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to game
      </Link>

      <section
        aria-live="polite"
        className="relative w-full max-w-[381px] animate-[preview-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded-md bg-white/[0.03] px-[30px] py-[17px] outline outline-1 -outline-offset-1 outline-white/10 backdrop-blur-xl"
      >
        <span aria-hidden className="pointer-events-none absolute -left-5 top-3 h-[182px] w-[472px] animate-[glow-drift_8s_ease-in-out_infinite] rounded-full bg-brand/20 blur-[100px]" />

        <div className="relative flex flex-col gap-[13px]">
          <div className="flex flex-col gap-1">
            {logo ? (
              <Image src={logo} alt={title} width={77} height={30} className="h-[30px] w-auto object-contain object-left" />
            ) : (
              <p className="text-xs font-medium tracking-wider text-[#888] uppercase">{title}</p>
            )}
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-xl leading-5 text-white">{ready ? "Your machine is ready" : "You’re in the queue"}</h1>
              <button
                type="button"
                onClick={() => setNotify((n) => !n)}
                aria-pressed={notify}
                aria-label={notify ? "Turn off ready notification" : "Notify me when ready"}
                title={notify ? "We'll notify you" : "Notify me when ready"}
                className={`flex size-[26px] shrink-0 items-center justify-center rounded-md outline outline-1 -outline-offset-1 transition-all duration-300 ${
                  notify ? "bg-brand/20 text-brand outline-brand" : "bg-white/[0.03] text-white outline-white/10 hover:outline-white/40"
                }`}
              >
                <Icon name={icon("bell.png")} className={`size-4 ${notify ? "animate-[bell-ring_700ms_ease-in-out]" : ""}`} />
              </button>
            </div>
            <p className="text-sm text-[#888]">
              {ready
                ? `Your cloud gaming machine for ${title} is set up and waiting.`
                : staying
                  ? "Hang tight, we’ll move you in as soon as a machine frees up."
                  : "We’re preparing a gaming machine for you. Stay here or leave the queue."}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <StatRow iconFile="trophy.png" label="Position" value={ready ? "You're up!" : `#${String(position).padStart(2, "0")}`} />
            <StatRow iconFile="time.png" label="Estimated wait" value={ready ? "Now" : formatWait(position)} />
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#333338]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Queue progress">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#16A34A_0%,#4ADE80_100%)] transition-[width] duration-700 ease-snap" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {ready ? (
            <button
              type="button"
              onClick={() => router.push(streamHref)}
              className="flex h-8 animate-[preview-in_400ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-center rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]"
            >
              Start playing
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStaying(true)}
              disabled={staying}
              className="flex h-8 items-center justify-center gap-2 rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-all duration-300 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)] disabled:opacity-80"
            >
              {staying && <span className="size-2 animate-pulse rounded-full bg-white" />}
              {staying ? "Waiting for your machine…" : "Stay in queue"}
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="flex h-8 items-center justify-center rounded-md bg-[#ED0C0C] text-xs font-bold text-white shadow-[0_0_50px_2px_rgba(237,12,12,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(237,12,12,0.45)]"
          >
            {ready ? "Not now" : "Cancel"}
          </button>
        </div>
      </section>
    </main>
  );
}
