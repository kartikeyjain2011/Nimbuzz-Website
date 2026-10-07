"use client";

import { useState } from "react";
import { NimbusMark } from "../ui";

const links = [
  { label: "Discover Games", href: "#discover" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Play Anywhere", href: "#play-anywhere" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-10">
      <nav className="mx-auto flex h-[76px] max-w-[1000px] items-center justify-between rounded-[20px] bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(14,14,14,0.8)_100%)] px-5 backdrop-blur-md md:h-20 md:px-[30px]">
        <a href="#" aria-label="Nimbus home" className="flex items-center gap-2.5">
          <NimbusMark className="h-[29px] w-[44px] md:h-10 md:w-[60px]" />
          <span className="text-xl font-bold tracking-[0.35em] text-white lg:hidden">NIMBUS</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-base leading-5 font-medium text-white transition-colors hover:text-brand">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <a href="/dashboard" className="text-base text-ink transition-colors hover:text-brand">Sign in</a>
          <a href="#pricing" className="inline-flex h-[42px] w-[156px] items-center justify-center rounded-md bg-brand text-base font-bold text-white shadow-glow transition-all duration-300 ease-snap hover:-translate-y-0.5">
            Start Streaming
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
        <a href="/dashboard" className="text-sm text-ink md:hidden">Sign in</a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 flex-col items-center justify-center gap-1.5"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
        </div>
      </nav>

      <div className={`mx-auto mt-2 max-w-[1000px] overflow-hidden rounded-[20px] bg-black/90 backdrop-blur-md transition-all duration-500 ease-snap lg:hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="flex flex-col gap-4 p-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="text-base font-medium text-white">{link.label}</a>
            </li>
          ))}
          <li className="pt-2 md:hidden">
            <a href="#pricing" onClick={() => setOpen(false)} className="flex h-11 items-center justify-center rounded-md bg-brand font-bold shadow-glow">Start Streaming</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
