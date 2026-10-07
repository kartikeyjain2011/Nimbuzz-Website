"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui";

const icon = (file: string) => `/dashboard-icons/${file}`;

export const resolutionOptions = [
  { value: "720", label: "720P (HD)", size: "1280 × 720" },
  { value: "1080", label: "1080P (Full HD)", size: "1920 × 1080" },
  { value: "1440", label: "1440P (QHD)", size: "2560 × 1440" },
  { value: "2160", label: "4K (Ultra HD)", size: "3840 × 2160" },
] as const;

export const fpsOptions = [
  { value: "30", label: "30 FPS" },
  { value: "60", label: "60 FPS" },
  { value: "120", label: "120 FPS" },
] as const;

export const bitrateOptions = [
  { value: "auto", label: "Auto" },
  { value: "15", label: "15 Mbps" },
  { value: "25", label: "25 Mbps" },
  { value: "50", label: "50 Mbps" },
] as const;

export const serverOptions = [
  { value: "auto", label: "Auto (Best)" },
  { value: "Mumbai", label: "Mumbai, India" },
  { value: "Dubai", label: "Dubai, UAE" },
] as const;

export type StreamSettingsValue = {
  resolution: (typeof resolutionOptions)[number]["value"];
  fps: (typeof fpsOptions)[number]["value"];
  bitrate: (typeof bitrateOptions)[number]["value"];
  server: (typeof serverOptions)[number]["value"];
};

export const defaultStreamSettings: StreamSettingsValue = { resolution: "1080", fps: "60", bitrate: "auto", server: "auto" };

type Option = { value: string; label: string };

function Select({ value, options, onChange, label }: { value: string; options: readonly Option[]; onChange: (v: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full shrink-0 sm:w-[148px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[42px] w-full items-center justify-between gap-2 rounded-[10px] bg-black/5 px-3.5 text-xs text-[#D0D0D0] outline outline-1 -outline-offset-1 transition-colors ${open ? "outline-brand" : "outline-white/80 hover:outline-brand/60"}`}
      >
        {current.label}
        <Icon name={icon("set-chevron.png")} className={`size-[18px] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" aria-label={label} className="absolute top-[calc(100%+6px)] right-0 z-50 w-full min-w-[160px] animate-[fade-in_200ms_ease-out_both] overflow-hidden rounded-[10px] bg-[#141414] py-1 shadow-card outline outline-1 -outline-offset-1 outline-white/20">
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs transition-colors hover:bg-white/5 ${o.value === value ? "text-brand" : "text-[#D0D0D0]"}`}
              >
                {o.label}
                {o.value === value && <span className="size-1.5 rounded-full bg-brand shadow-glow-sm" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type Row = { key: keyof StreamSettingsValue; title: string; description: string; icon: string; options: readonly Option[] };

const rows: Row[] = [
  { key: "resolution", title: "Resolution", description: "Set the streaming resolution for the best balance of quality and performance.", icon: "set-monitor.png", options: resolutionOptions },
  { key: "fps", title: "FPS", description: "Choose your preferred frame rate for smoother gameplay.", icon: "set-fps.png", options: fpsOptions },
  { key: "bitrate", title: "Bitrate", description: "Adjust the video quality based on your internet connection.", icon: "set-signal.png", options: bitrateOptions },
  { key: "server", title: "Server Preference", description: "Select a preferred server region for lower latency.", icon: "set-server.png", options: serverOptions },
];

type StreamSettingsProps = {
  value: StreamSettingsValue;
  onChange: (next: StreamSettingsValue) => void;
  onClose: () => void;
};

export function StreamSettings({ value, onChange, onClose }: StreamSettingsProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="stream-settings-title">
      <button type="button" aria-label="Close settings" onClick={onClose} className="absolute inset-0 animate-[fade-in_250ms_ease-out_both] bg-black/50 backdrop-blur-sm" />

      <section className="relative w-full max-w-[1000px] animate-[preview-in_400ms_cubic-bezier(0.16,1,0.3,1)_both] rounded-md bg-white/[0.03] px-3.5 py-3 outline outline-1 -outline-offset-1 outline-white/10 backdrop-blur-xl">
        <span aria-hidden className="pointer-events-none absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />

        <div className="relative mb-3 flex items-center justify-between px-1">
          <h2 id="stream-settings-title" className="text-base font-medium text-white">Stream settings</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="flex size-[19px] items-center justify-center rounded-full bg-[#ED0C0C] text-white transition-transform duration-300 hover:rotate-90"
          >
            <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {rows.map((row, i) => (
            <div
              key={row.key}
              style={{ animationDelay: `${80 + i * 70}ms` }}
              className="relative z-0 flex animate-[slide-in_450ms_cubic-bezier(0.16,1,0.3,1)_both] flex-col has-[[aria-expanded=true]]:z-40 gap-3 rounded-md bg-[#1E1E1E] p-2.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-[42px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/[0.03] outline outline-1 -outline-offset-1 outline-white/10">
                  <span aria-hidden className="absolute -top-16 -left-52 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />
                  <Icon name={icon(row.icon)} className="relative size-[22px] text-[#D9D9D9]" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className="text-base leading-4 text-white">{row.title}</p>
                  <p className="text-xs leading-5 font-light text-[#D0D0D0]">{row.description}</p>
                </div>
              </div>
              <Select label={row.title} value={value[row.key]} options={row.options} onChange={(v) => onChange({ ...value, [row.key]: v })} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
