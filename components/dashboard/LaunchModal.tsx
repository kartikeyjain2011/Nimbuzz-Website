"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { stores } from "@/lib/gameDetail";
import { Icon } from "../ui";

type Server = { id: string; city: string; country: string; region: string; ping: number; quality: string; flag: string };

const servers: Server[] = [
  { id: "bom", city: "Mumbai", country: "India", region: "India · Mumbai", ping: 12, quality: "Excellent", flag: "/dashboard-icons/flag-india.png" },
  { id: "dxb", city: "Dubai", country: "United Arab Emirates", region: "UAE · Dubai", ping: 38, quality: "Good", flag: "/dashboard-icons/flag-uae.png" },
];

const bestServer = servers.reduce((a, b) => (b.ping < a.ping ? b : a));

type Timed = "session" | "starting" | "launching";

type Phase =
  | { kind: "choose" }
  | { kind: "server"; store: string }
  | { kind: Timed; store: string; server: Server }
  | { kind: "ready"; store: string; server: Server };

/** How long each timed screen takes, and which screen follows it. */
const timeline: Record<Timed, { ms: number; next: Timed | "ready" }> = {
  session: { ms: 5000, next: "starting" },
  starting: { ms: 5000, next: "launching" },
  launching: { ms: 4500, next: "ready" },
};

const icon = (file: string) => `/dashboard-icons/${file}`;

type Milestone = { label: string; until: number };

const labelAt = (milestones: Milestone[], progress: number) => (milestones.find((m) => progress < m.until) ?? milestones[milestones.length - 1]).label;

function ProgressBar({ label, progress }: { label: string; progress: number }) {
  return (
    <div className="flex flex-col gap-1.5" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <span key={label} className="animate-[fade-in_400ms_ease-out_both] text-xs font-light text-[#888]">
          {label}
        </span>
        <span className="text-sm font-medium text-white tabular-nums">{progress}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#333338]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="relative h-full rounded-full bg-[linear-gradient(90deg,#7C3AED_0%,#A855FF_100%)] transition-[width] duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute inset-0 animate-[shimmer_1.2s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] bg-[length:50%_100%] bg-no-repeat" />
        </div>
      </div>
    </div>
  );
}

/** Vertical checklist; a step is done once progress passes its `until`. */
function Stepper({ milestones, progress }: { milestones: Milestone[]; progress: number }) {
  return (
    <ol className="flex flex-col">
      {milestones.map((m, i) => {
        const done = progress >= m.until;
        const active = !done && (i === 0 || progress >= milestones[i - 1].until);
        const isLast = i === milestones.length - 1;
        return (
          <li key={m.label} style={{ animationDelay: `${100 + i * 80}ms` }} className="relative flex h-11 animate-[slide-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] items-center gap-3">
            <span className="relative flex w-[22px] shrink-0 justify-center">
              {done ? (
                <Icon name={icon("tick-circle-filled.png")} className="size-5 animate-[preview-in_300ms_ease-out_both] text-brand drop-shadow-[0_0_8px_rgba(22,163,74,0.5)]" />
              ) : active ? (
                <Icon name={icon("loading-one.png")} className="size-5 animate-spin text-brand" />
              ) : (
                <Icon name={icon("radio-button-on.png")} className="size-5 text-[#888]" />
              )}
            </span>
            {!isLast && (
              <span
                aria-hidden
                className={`absolute top-[31px] left-[10.5px] h-6 w-px transition-colors duration-500 ${done ? "bg-brand shadow-glow-sm" : "bg-[#888]/60"}`}
              />
            )}
            <span className={`flex-1 text-xs transition-colors duration-300 ${done ? "text-white" : active ? "text-brand" : "text-[#888]"}`}>{m.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center justify-center rounded-md bg-[#ED0C0C] text-xs font-bold text-white shadow-[0_0_50px_2px_rgba(237,12,12,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(237,12,12,0.45)]"
    >
      Cancel
    </button>
  );
}

function Heading({ title, subtitle, dashed = false }: { title: string; subtitle: string; dashed?: boolean }) {
  return (
    <div className={`flex flex-col gap-1.5 pr-6 ${dashed ? "border-b border-dashed border-white/25 pb-3" : ""}`}>
      <h2 id="launch-title" className="text-xl leading-tight text-white">
        {title}
      </h2>
      <p className="text-sm text-[#888]">{subtitle}</p>
    </div>
  );
}

function ServerPicker({ onConnect }: { onConnect: (server: Server) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = servers.find((s) => s.id === selected);

  return (
    <div className="flex flex-col gap-4">
      <div role="radiogroup" aria-label="Server" className="flex flex-col gap-4">
        {servers.map((s, i) => {
          const active = (selected ?? bestServer.id) === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(s.id)}
              style={{ animationDelay: `${100 + i * 90}ms` }}
              className={`relative flex h-[42px] animate-[slide-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-between gap-2 overflow-hidden rounded-md bg-black/5 px-3.5 text-left outline outline-1 -outline-offset-1 transition-all duration-300 ${
                active ? "outline-white/80" : "outline-white/40 hover:outline-white/70"
              }`}
            >
              {active && <span aria-hidden className="absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />}
              <span className="relative flex min-w-0 items-center gap-2">
                <Image src={s.flag} alt="" width={22} height={22} className="size-[22px] shrink-0 object-contain" />
                <span className={`truncate ${active ? "text-[13px] font-semibold text-[#FEFEFE]" : "text-sm text-[#D0D0D0]"}`}>
                  {s.city}, {s.country}
                </span>
              </span>
              <span className="relative flex shrink-0 items-center gap-3">
                <span className={`text-[10px] transition-opacity ${active ? "text-[#9BA6B5] opacity-100" : "opacity-0"}`}>
                  {s.ping} ms · {s.quality}
                </span>
                <span className={`flex size-[18px] items-center justify-center rounded-full outline-[1.5px] -outline-offset-[1.5px] transition-colors ${active ? "shadow-glow outline-brand" : "outline-[#888]"}`}>
                  <span className={`size-2 rounded-full bg-brand transition-transform duration-300 ${active ? "scale-100" : "scale-0"}`} />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onConnect(chosen ?? bestServer)}
        className="flex h-8 items-center justify-center rounded-md bg-brand text-xs text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]"
      >
        {chosen ? (
          <span className="font-bold">Connect to {chosen.city}</span>
        ) : (
          <span>
            <span className="font-bold">Auto select </span>
            <span className="font-medium">(RECOMMENDED)</span>
          </span>
        )}
      </button>
    </div>
  );
}

const preparingMilestones: Milestone[] = [
  { label: "Allocating your cloud rig", until: 25 },
  { label: "Setting up your cloud environment", until: 70 },
  { label: "Signing in to your launcher", until: 92 },
  { label: "Starting the stream", until: 101 },
];

function Preparing({ title, poster, progress, server }: { title: string; poster?: string; progress: number; server: Server }) {
  const rows = [
    { label: "Region", value: server.region, icon: icon("geo_ui-earth-west.png") },
    { label: "Connection", value: server.quality, icon: icon("fluent_wifi-1-20-regular.png") },
    { label: "Cloud rig", value: progress >= 25 ? "RTX Ready" : "Allocating…", icon: icon("mage_chip.png") },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        <div className="relative aspect-[123/192] w-[44%] shrink-0 overflow-hidden rounded-lg shadow-poster outline outline-1 -outline-offset-1 outline-white/80">
          {poster && <Image src={poster} alt="" fill sizes="180px" className="animate-[ken-burns_6s_ease-out_both] object-cover" />}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_50%,#000_100%)]" />
          <p className="absolute inset-x-2.5 bottom-3 text-sm leading-tight text-white">{title}</p>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-6 rounded-md bg-[#1E1E1E] p-3">
          {rows.map((r, i) => (
            <div key={r.label} style={{ animationDelay: `${150 + i * 120}ms` }} className="flex animate-[slide-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-between gap-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-[#D0D0D0]">
                <span className="flex size-5 items-center justify-center rounded-[4px] bg-white/[0.03] outline outline-[0.6px] -outline-offset-[0.6px] outline-white/10">
                  <Icon name={r.icon} className="size-3.5 text-[#D9D9D9]" />
                </span>
                {r.label}
              </span>
              <span className="text-white">{r.value}</span>
            </div>
          ))}
          <div style={{ animationDelay: "510ms" }} className="flex animate-[slide-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-between gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#D0D0D0]">
              <span className="flex size-5 items-center justify-center rounded-[4px] bg-white/[0.03] outline outline-[0.6px] -outline-offset-[0.6px] outline-white/10">
                <Icon name={icon("loading-one.png")} className="size-3.5 animate-spin text-[#D9D9D9]" />
              </span>
              Preparing
            </span>
            <span className="text-white tabular-nums">{progress}%</span>
          </div>
        </div>
      </div>
      <ProgressBar label={labelAt(preparingMilestones, progress)} progress={progress} />
    </div>
  );
}

type LaunchModalProps = { open: boolean; onClose: () => void; title: string; poster?: string; backdrop?: string; playHref?: string };

export function LaunchModal({ open, onClose, title, poster, backdrop, playHref }: LaunchModalProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ kind: "choose" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (phase.kind !== "session" && phase.kind !== "starting" && phase.kind !== "launching") return;
    const { ms, next } = timeline[phase.kind];
    const started = performance.now();
    let advance: ReturnType<typeof setTimeout> | undefined;
    const tick = setInterval(() => {
      const pct = Math.min(100, Math.round(((performance.now() - started) / ms) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        advance = setTimeout(() => {
          setProgress(0);
          setPhase({ kind: next, store: phase.store, server: phase.server });
        }, 450);
      }
    }, 80);
    return () => {
      clearInterval(tick);
      clearTimeout(advance);
    };
  }, [phase]);

  if (!open) return null;

  const close = () => {
    setPhase({ kind: "choose" });
    setProgress(0);
    onClose();
  };

  const cancel = () => {
    setProgress(0);
    setPhase({ kind: "choose" });
  };

  const isLaunching = phase.kind === "launching";

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="launch-title">
      <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 animate-[fade-in_300ms_ease-out_both] bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative flex w-full max-w-[400px] animate-[preview-in_400ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col overflow-hidden rounded-3xl bg-[#000C1D] px-6 pt-8 pb-6 outline-2 -outline-offset-2 outline-white/40 transition-[min-height] duration-500 ${
          isLaunching ? "min-h-[440px] justify-end" : ""
        }`}
      >
        {isLaunching && backdrop ? (
          <div aria-hidden className="pointer-events-none absolute inset-0 animate-[fade-in_600ms_ease-out_both]">
            <Image src={backdrop} alt="" fill sizes="400px" className="animate-[ken-burns_8s_ease-out_both] object-cover object-top" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_45%,rgba(0,0,0,0.95)_100%)]" />
          </div>
        ) : (
          <>
            <span aria-hidden className="pointer-events-none absolute -top-24 -right-32 size-52 animate-[glow-drift_8s_ease-in-out_infinite] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.8)_25%,rgba(17,78,53,0.8)_93%)] blur-[44px]" />
            <span aria-hidden className="pointer-events-none absolute -top-40 -right-56 h-[300px] w-[400px] rotate-[156deg] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.5)_25%,rgba(17,78,53,0.5)_93%)] blur-[44px]" />
          </>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex size-[19px] items-center justify-center rounded-full bg-[#ED0C0C] text-white transition-transform duration-300 hover:rotate-90 hover:scale-110"
        >
          <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative flex flex-col gap-4">
          {phase.kind === "choose" && (
            <div key="choose" className="flex animate-[fade-in_400ms_ease-out_both] flex-col gap-3">
              <Heading title="Launch from" subtitle="We'll start your Cloud PC using your own account. No downloads needed." />
              <div className="flex flex-wrap gap-3">
                {stores.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setPhase({ kind: "server", store: s.name })}
                    style={{ animationDelay: `${120 + i * 80}ms` }}
                    className="flex h-8 min-w-[150px] flex-1 animate-[fade-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-center gap-1 rounded-md bg-white/[0.03] px-3.5 text-[13px] font-medium text-white outline outline-1 -outline-offset-1 outline-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/15 hover:outline-brand"
                  >
                    <Icon name={s.icon} className="size-[18px]" />
                    Launch via {s.name}
                  </button>
                ))}
              </div>
              <p className="text-xs font-light text-[#888]">
                Note: You must own the game on your chosen launcher. Console stores aren&apos;t included since they can&apos;t run on a cloud PC.
              </p>
            </div>
          )}

          {phase.kind === "server" && (
            <div key="server" className="flex animate-[fade-in_400ms_ease-out_both] flex-col gap-4">
              <Heading title="Choose your server" subtitle="We’ll connect you to the best region for smooth, low-latency play." />
              <ServerPicker
                onConnect={(server) => {
                  setProgress(0);
                  setPhase({ kind: "session", store: phase.store, server });
                }}
              />
            </div>
          )}

          {phase.kind === "session" && (
            <div key="session" className="flex animate-[fade-in_400ms_ease-out_both] flex-col gap-4">
              <Heading title="Starting your gaming session" subtitle="Allocating resources and configuring your cloud machine." />
              <Stepper
                progress={progress}
                milestones={[
                  { label: `Server selected · ${phase.server.city}`, until: 0 },
                  { label: `${phase.store} account linked`, until: 20 },
                  { label: "Starting virtual machine", until: 55 },
                  { label: "Initializing network", until: 80 },
                  { label: "Preparing game files", until: 100 },
                ]}
              />
              <ProgressBar label={progress < 60 ? "Configuring your cloud machine" : "Your cloud machine is almost ready"} progress={progress} />
              <CancelButton onClick={cancel} />
            </div>
          )}

          {phase.kind === "starting" && (
            <div key="starting" className="flex animate-[fade-in_400ms_ease-out_both] flex-col gap-4">
              <Heading title="Getting ready to game" subtitle={`Getting everything ready for ${title}`} dashed />
              <Preparing title={title} poster={poster} progress={progress} server={phase.server} />
              <CancelButton onClick={cancel} />
            </div>
          )}

          {phase.kind === "launching" && (
            <div key="launching" className="flex animate-[fade-in_500ms_ease-out_both] flex-col gap-3">
              <Heading title={`Starting game ${title}`} subtitle={`Connecting to Nimbus Cloud · ${phase.server.city}`} />
              <ProgressBar
                label={labelAt(
                  [
                    { label: "Opening secure session", until: 30 },
                    { label: "Launching game client", until: 75 },
                    { label: "Optimizing your stream", until: 101 },
                  ],
                  progress,
                )}
                progress={progress}
              />
              <Stepper
                progress={progress}
                milestones={[
                  { label: "Secure session connected", until: 30 },
                  { label: "Starting game client", until: 75 },
                  { label: "Initializing network", until: 100 },
                ]}
              />
              <CancelButton onClick={cancel} />
            </div>
          )}

          {phase.kind === "ready" && (
            <div key="ready" className="flex animate-[fade-in_400ms_ease-out_both] flex-col gap-3" aria-live="polite">
              <Heading title="You're in" subtitle={`${title} is running on Nimbus Cloud · ${phase.server.city}. Sign in to ${phase.store} in the stream window to start playing.`} />
              <div className="flex gap-3">
                <button type="button" onClick={() => (playHref ? router.push(playHref) : close())} className="flex h-8 flex-1 items-center justify-center rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5">
                  Open Stream
                </button>
                <button type="button" onClick={cancel} className="flex h-8 flex-1 items-center justify-center rounded-md bg-white/[0.03] text-xs font-bold text-white outline outline-1 -outline-offset-1 outline-white/10 hover:outline-white/40">
                  Change launcher
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
