"use client";

import { dashIcon } from "@/lib/dashboard";
import { Icon } from "../ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronIcon, MenuIcon } from "./icons";

const SearchIcon = ({ className }: { className?: string }) => <Icon name={dashIcon("boxicons_search")} className={className} />;
const BellIcon = ({ className }: { className?: string }) => <Icon name={dashIcon("ant-design_bell-outlined")} className={className} />;
const SettingsIcon = ({ className }: { className?: string }) => <Icon name={dashIcon("hugeicons_setting-07")} className={className} />;

const glass =
  "bg-white/10 outline outline-1 -outline-offset-1 outline-[rgba(64,64,64,0.5)] backdrop-blur-[12.5px] shadow-[-1px_3px_6px_rgba(0,0,0,0.08),-3px_11px_11px_rgba(0,0,0,0.07),-7px_24px_15px_rgba(0,0,0,0.04)]";

export function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between gap-3 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(14,14,14,0.8)_100%)] px-4 backdrop-blur-md md:justify-end md:px-6">
      <div className="flex items-center gap-3 md:mr-auto">
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" className={`flex size-[34px] items-center justify-center rounded-full text-[#888] lg:hidden ${glass}`}>
          <MenuIcon className="size-[18px]" />
        </button>
        {pathname !== "/dashboard" && (
          <Link
            href={pathname.startsWith("/dashboard/games/") ? "/dashboard/games" : "/dashboard"}
            className="group hidden items-center gap-1 text-xs font-medium text-[#D0D0D0] transition-colors hover:text-white sm:flex"
          >
            <ChevronIcon className="size-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            {pathname.startsWith("/dashboard/games/") ? "Back to Games" : "Back to Home"}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <label className={`group flex h-8 w-[180px] items-center gap-1.5 rounded-[20px] px-2.5 transition-[width] duration-500 ease-snap focus-within:w-[260px] sm:w-[220px] ${glass}`}>
          <SearchIcon className="size-[18px] shrink-0 text-[#888] transition-colors group-focus-within:text-brand" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-transparent text-xs font-medium text-white placeholder:text-[#888] focus:outline-none"
          />
        </label>
        <button type="button" aria-label="Notifications" className={`relative flex size-[34px] items-center justify-center rounded-full text-[#888] transition-colors hover:text-white ${glass}`}>
          <BellIcon className="size-[18px]" />
          <span className="absolute top-1.5 right-2 size-2 animate-pulse rounded-full bg-brand" />
        </button>
        <button type="button" aria-label="Settings" className={`flex size-[34px] items-center justify-center rounded-full text-[#888] transition-all duration-500 hover:rotate-90 hover:text-white ${glass}`}>
          <SettingsIcon className="size-[18px]" />
        </button>
      </div>
    </header>
  );
}
