"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { ComponentType } from "react";
import { dashArt, dashIcon, player } from "@/lib/dashboard";
import { Icon, NimbusMark } from "../ui";
import { ChevronIcon, CloseIcon, CollapseIcon, HelpIcon, NewIcon } from "./icons";

type IconComponent = ComponentType<{ className?: string }>;

const fromFile = (name: string): IconComponent => {
  const FileIcon = ({ className }: { className?: string }) => <Icon name={dashIcon(name)} className={className} />;
  FileIcon.displayName = name;
  return FileIcon;
};

const HomeIcon = fromFile("solar_home-2-bold");
const GamesIcon = fromFile("famicons_game-controller-outline");
const LibraryIcon = fromFile("fluent_library-28-regular");
const StoreIcon = fromFile("fluent_shopping-bag-28-regular");
const TrendingIcon = fromFile("ant-design_fire-outlined");
const StarIcon = fromFile("bytesize_star");
const SettingsIcon = fromFile("hugeicons_setting-07");

type NavItem = { label: string; href: string; icon: IconComponent };

const sections: { title: string; items: NavItem[] }[] = [
  {
    title: "Main",
    items: [
      { label: "Home", href: "/dashboard", icon: HomeIcon },
      { label: "Games", href: "/dashboard/games", icon: GamesIcon },
      { label: "Library", href: "/dashboard#continue", icon: LibraryIcon },
      { label: "Store", href: "/#pricing", icon: StoreIcon },
    ],
  },
  {
    title: "Discover",
    items: [
      { label: "Trending", href: "/dashboard#trending", icon: TrendingIcon },
      { label: "New Releases", href: "/dashboard#new", icon: NewIcon },
      { label: "Recommended", href: "/dashboard#recommended", icon: StarIcon },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "#", icon: SettingsIcon },
      { label: "Help & Support", href: "/#faq", icon: HelpIcon },
    ],
  },
];

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => href === pathname;

  return (
    <>
      <div
        aria-hidden
        onClick={onCloseMobile}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[242px] flex-col border-r border-[#201B1B] bg-[linear-gradient(90deg,#000_0%,#0E0E0E_100%)] transition-[width,transform] duration-500 ease-snap lg:sticky lg:top-0 lg:h-svh lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[84px]" : "lg:w-[242px]"}`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between gap-2 border-b border-[#201B1B] px-4">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <NimbusMark className="h-[31px] w-[46px] shrink-0" />
            <span className={`text-xl font-bold tracking-[0.35em] whitespace-nowrap text-white transition-opacity duration-300 ${collapsed ? "lg:pointer-events-none lg:opacity-0" : ""}`}>NIMBUS</span>
          </Link>
          <button type="button" onClick={onToggleCollapse} aria-label="Collapse sidebar" className="hidden rounded-lg p-1 text-[#888] transition-colors hover:text-white lg:block">
            <CollapseIcon className="size-5" />
          </button>
          <button type="button" onClick={onCloseMobile} aria-label="Close menu" className="rounded-lg p-1 text-[#888] hover:text-white lg:hidden">
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-4 pt-8 pb-4">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <p className={`px-2 text-xs text-[#E9E8EB] transition-opacity ${collapsed ? "lg:opacity-0" : ""}`}>{section.title}</p>
              <ul className="flex flex-col gap-1">
                {section.items.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        onClick={onCloseMobile}
                        title={collapsed ? label : undefined}
                        className={`group relative flex h-[42px] items-center gap-2 overflow-hidden rounded-md px-3.5 text-sm transition-all duration-300 ${
                          active ? "bg-black/5 font-bold text-brand outline outline-1 -outline-offset-1 outline-white/80" : "font-medium text-white hover:bg-white/5 hover:pl-[18px]"
                        }`}
                      >
                        {active && <span aria-hidden className="absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />}
                        <Icon className={`relative size-[22px] shrink-0 ${active ? "drop-shadow-[0_0_4px_rgba(22,163,74,0.8)]" : ""}`} />
                        <span className={`relative whitespace-nowrap transition-opacity duration-300 ${collapsed ? "lg:opacity-0" : ""}`}>{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className={`flex shrink-0 flex-col gap-4 px-4 pb-6 ${collapsed ? "lg:hidden" : ""}`}>
          <div className="relative overflow-hidden rounded-3xl bg-[rgba(0,12,29,0.8)] px-6 pt-8 pb-6 outline-2 -outline-offset-2 outline-white/40">
            <span aria-hidden className="absolute -top-24 -right-36 size-52 animate-[glow-drift_8s_ease-in-out_infinite] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.8)_25%,rgba(17,78,53,0.8)_93%)] blur-[44px]" />
            <div className="relative flex flex-col gap-2">
              <Image src={dashArt.controller} alt="" width={60} height={57} className="h-[57px] w-[60px] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-rotate-6 hover:scale-110" />
              <p className="text-base leading-5 font-bold text-white">Upgrade to Pro</p>
              <p className="text-[10px] text-white">More gaming hours. Higher quality. Priority access.</p>
              <Link href="/#pricing" className="mt-1 flex h-8 items-center justify-center rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5">
                Upgrade →
              </Link>
            </div>
          </div>

          <button type="button" className="flex items-center gap-2.5 rounded-md bg-[#1E1E1E] p-1.5 text-left transition-colors hover:bg-[#262626]">
            <span className="relative size-[41px] shrink-0 overflow-hidden rounded-[5px]">
              <Image src={dashArt.avatar} alt={player.name} fill sizes="41px" className="object-cover object-top" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-1.5 text-base text-white">
                {player.name}
                <span className="size-3 rounded-full bg-[#35B9E9]" title="Verified" />
              </span>
              <span className="truncate text-xs leading-5 font-medium text-white">{player.email}</span>
            </span>
            <ChevronIcon className="size-[18px] rotate-90 text-white" />
          </button>
        </div>
      </aside>
    </>
  );
}
