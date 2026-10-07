"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../ui";
import { StreamSettings, defaultStreamSettings, resolutionOptions, type StreamSettingsValue } from "./StreamSettings";

const icon = (file: string) => `/dashboard-icons/${file}`;

type Stats = { fps: number; ping: number; loss: number };

type StreamScreenProps = {
  title: string;
  logo?: string;
  /** Shown until a WebRTC MediaStream is attached to the video element. */
  fallbackFrame: string;
  exitHref: string;
  region?: string;
  gpu?: string;
};

const jitter = (base: number, spread: number) => base + (Math.random() - 0.5) * spread;

function useLiveStats(targetFps: number, basePing: number): Stats {
  const [stats, setStats] = useState<Stats>({ fps: targetFps - 0.8, ping: basePing, loss: 0.1 });
  useEffect(() => {
    const id = setInterval(() => {
      setStats({
        fps: Math.round(Math.min(targetFps, jitter(targetFps - 0.8, 1.6)) * 10) / 10,
        ping: Math.round(jitter(basePing, 14)),
        loss: Math.max(0, Math.round(jitter(0.1, 0.16) * 10) / 10),
      });
    }, 1500);
    return () => clearInterval(id);
  }, [targetFps, basePing]);
  return stats;
}

function useElapsed() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function StatGroup({ title, rows }: { title: string; rows: { label: string; value: string; accent?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-bold text-white">{title}</p>
      {rows.map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-3 text-xs">
          <span className="text-[#D0D0D0]">{r.label}</span>
          <span key={r.value} className={`animate-[fade-in_300ms_ease-out_both] tabular-nums ${r.accent ? "text-brand" : "text-white"}`}>
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const panel = "overflow-hidden rounded-md bg-[rgba(0,12,29,0.8)] outline-2 -outline-offset-2 outline-white/40 backdrop-blur-md";

export function StreamScreen({ title, logo, fallbackFrame, exitHref, region = "Mumbai", gpu = "RTX 4090" }: StreamScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [settings, setSettings] = useState<StreamSettingsValue>(defaultStreamSettings);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const activeRegion = settings.server === "auto" ? region : settings.server;
  const resolution = resolutionOptions.find((r) => r.value === settings.resolution) ?? resolutionOptions[1];
  const stats = useLiveStats(Number(settings.fps), activeRegion === "Dubai" ? 78 : 51);
  const duration = useElapsed();

  const [overlay, setOverlay] = useState(true);
  const [statsOpen, setStatsOpen] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.getElementById("stream-root")?.requestFullscreen();
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setOverlay((o) => !o);
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const screenshot = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    showToast("Screenshot saved to your library");
  };

  const toggleMic = async () => {
    if (micOn) {
      setMicOn(false);
      showToast("Microphone muted");
      return;
    }
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      stream?.getTracks().forEach((t) => t.stop());
      setMicOn(true);
      showToast("Microphone on");
    } catch {
      showToast("Microphone permission denied");
    }
  };

  const tools = [
    { label: fullscreen ? "Exit Full Screen" : "Full Screen", file: "frame.png", onClick: toggleFullscreen, active: fullscreen },
    { label: "Screenshots", file: "camera.png", onClick: screenshot, active: false },
    { label: "Microphone", file: "microphone.png", onClick: toggleMic, active: micOn },
    { label: "Settings", file: "settings.png", onClick: () => setSettingsOpen(true), active: settingsOpen },
  ];

  return (
    <div id="stream-root" className="relative h-svh w-full overflow-hidden bg-black text-white select-none">
      <Image src={fallbackFrame} alt="" fill priority sizes="100vw" className="object-cover" />
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 size-full object-cover" aria-label={`${title} game stream`} />
      <div className={`pointer-events-none absolute inset-0 bg-black/35 transition-opacity duration-500 ${overlay ? "opacity-100" : "opacity-0"}`} />
      <div aria-hidden className={`pointer-events-none absolute inset-0 bg-white transition-opacity duration-300 ${flash ? "opacity-70" : "opacity-0"}`} />

      <div className={`transition-opacity duration-500 ${overlay ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <header className="absolute inset-x-0 top-0 flex h-[60px] items-center justify-between gap-3 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(14,14,14,0.8)_100%)] px-4 backdrop-blur-sm sm:px-[21px] animate-[fade-in_500ms_ease-out_both]">
          <Link href={exitHref} className="flex items-center gap-[7px]" title="Leave stream">
            <Image src="/dasboard-images/nimbus-n.png" alt="" width={26} height={26} className="size-[26px] object-contain" />
            <span className="text-[17px] font-bold tracking-[0.35em] text-white">NIMBUS</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            {logo ? <Image src={logo} alt={title} width={110} height={43} className="hidden h-[43px] w-auto object-contain sm:block" /> : <span className="hidden text-sm sm:block">{title}</span>}
            <span className="flex h-8 items-center rounded-md bg-white/[0.03] px-3.5 text-xs tabular-nums outline outline-1 -outline-offset-1 outline-white/10">
              <span className="mr-2 size-1.5 animate-pulse rounded-full bg-brand" />
              {stats.ping} ms · {Math.round(stats.fps)} FPS · {resolution.value === "2160" ? "4K" : `${resolution.value}P`}
            </span>
            <button
              type="button"
              onClick={() => setStatsOpen((s) => !s)}
              aria-label="Toggle performance panel"
              className="flex size-[34px] items-center justify-center rounded-full bg-white/10 text-[#888] outline outline-1 -outline-offset-1 outline-[rgba(64,64,64,0.5)] backdrop-blur transition-all duration-500 hover:rotate-90 hover:text-white"
            >
              <Icon name={icon("settings.png")} className="size-[18px]" />
            </button>
          </div>
        </header>

        {statsOpen && (
          <aside className={`absolute top-[93px] right-4 w-[266px] animate-[slide-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] px-6 pt-8 pb-6 sm:right-[21px] ${panel}`}>
            <span aria-hidden className="pointer-events-none absolute -top-32 -right-40 h-[300px] w-[380px] rotate-[156deg] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.8)_25%,rgba(17,78,53,0.8)_93%)] opacity-60 blur-[44px]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16.6px] font-medium">Performance</h2>
                <button
                  type="button"
                  onClick={() => setStatsOpen(false)}
                  aria-label="Close performance panel"
                  className="flex size-[19px] items-center justify-center rounded-full bg-[#ED0C0C] transition-transform duration-300 hover:rotate-90"
                >
                  <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
                    <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="flex flex-col gap-3 px-1.5 [&>hr]:border-white/[0.06]">
                <StatGroup
                  title="Stream"
                  rows={[
                    { label: "Resolution", value: resolution.size },
                    { label: "FPS", value: `${stats.fps.toFixed(1)} FPS` },
                  ]}
                />
                <hr />
                <StatGroup
                  title="Network"
                  rows={[
                    { label: "Ping", value: `${stats.ping} ms` },
                    { label: "Packet Loss", value: `${stats.loss.toFixed(1)}%`, accent: stats.loss < 0.5 },
                  ]}
                />
                <hr />
                <StatGroup
                  title="Server"
                  rows={[
                    { label: "Region", value: activeRegion },
                    { label: "GPU", value: gpu },
                  ]}
                />
                <hr />
                <StatGroup
                  title="Session"
                  rows={[
                    { label: "Game", value: title.length > 18 ? `${title.slice(0, 17)}…` : title },
                    { label: "Duration", value: duration },
                  ]}
                />
              </div>
            </div>
          </aside>
        )}

        <div className={`absolute right-4 bottom-[86px] w-[266px] animate-[fade-in_500ms_ease-out_300ms_both] p-3 sm:right-[21px] sm:bottom-[31px] ${panel}`}>
          <p className="text-xs font-medium">
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-display">Ctrl+I</kbd>
          </p>
          <p className="mt-1.5 text-xs text-[#D0D0D0]">Press to show or hide the overlay</p>
        </div>

        <nav className="absolute bottom-[31px] left-1/2 flex h-[46px] w-[min(436px,calc(100%-32px))] -translate-x-1/2 animate-[fade-in_500ms_ease-out_150ms_both] items-center justify-between overflow-hidden rounded-md bg-white/[0.03] px-3.5 outline outline-1 -outline-offset-1 outline-white/10 backdrop-blur-md">
          <span aria-hidden className="pointer-events-none absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />
          {tools.map((t, i) => (
            <div key={t.file} className="relative flex items-center">
              {i > 0 && <span aria-hidden className="mr-2 h-6 w-px bg-white/30 sm:mr-3" />}
              <button
                type="button"
                onClick={t.onClick}
                aria-pressed={t.active}
                className={`group flex items-center gap-1 rounded px-1 py-1 text-xs transition-colors ${t.active ? "text-brand" : "text-white hover:text-brand"}`}
              >
                <Icon name={icon(t.file)} className="size-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            </div>
          ))}
        </nav>
      </div>

      {settingsOpen && (
        <StreamSettings
          value={settings}
          onChange={(next) => {
            setSettings(next);
            showToast("Stream settings updated");
          }}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {toast && (
        <div role="status" className="absolute top-20 left-1/2 -translate-x-1/2 animate-[fade-in_300ms_ease-out_both] rounded-md bg-[rgba(0,12,29,0.9)] px-4 py-2 text-xs outline outline-1 -outline-offset-1 outline-white/30">
          {toast}
        </div>
      )}
    </div>
  );
}
