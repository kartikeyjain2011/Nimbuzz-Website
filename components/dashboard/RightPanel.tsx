import Image from "next/image";
import { dashArt, dashIcon, groups, player, recentlyPlayed } from "@/lib/dashboard";
import { Icon } from "../ui";
import { UsersIcon } from "./icons";

export function RightPanel() {
  const xpPct = Math.round((player.xp / player.xpGoal) * 100);

  return (
    <aside className="no-scrollbar sticky top-0 hidden h-svh w-[242px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-[#201B1B] bg-[linear-gradient(90deg,#000_0%,#0E0E0E_100%)] pb-6 xl:flex">
      <span aria-hidden className="pointer-events-none absolute -top-28 left-[121px] h-[182px] w-[472px] rounded-full bg-[rgba(1,218,127,0.53)] blur-[100px]" />

      <div className="relative flex h-20 shrink-0 items-center gap-1.5 border-b-[0.5px] border-[#B9B9B9] px-5">
        <span className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_0_9.6px_rgba(22,163,74,0.28)]">
          <Icon name={dashIcon("ion_trophy")} className="size-6" />
        </span>
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-base font-bold text-white">Level {player.level}</p>
          <div className="flex justify-between text-[9px]">
            <span className="text-white">XP Progress</span>
            <span className="text-brand">
              {player.xp.toLocaleString()} / {player.xpGoal.toLocaleString()}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-[#1F1F1F]">
            <div
              className="h-full origin-left animate-[bar-grow_1.4s_cubic-bezier(0.16,1,0.3,1)_0.3s_both] rounded-full bg-[linear-gradient(90deg,#16A34A_0%,#4ADE80_100%)]"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 px-4">
        <section className="flex flex-col gap-4">
          <p className="px-2 text-xs text-[#E9E8EB]">Recently Played</p>
          <ul className="flex flex-col gap-3">
            {recentlyPlayed.map((game, i) => (
              <li
                key={game.title}
                style={{ animationDelay: `${200 + i * 90}ms` }}
                className="group flex animate-[slide-in_600ms_cubic-bezier(0.16,1,0.3,1)_both] items-center justify-between rounded-md p-1.5 transition-colors hover:bg-white/5"
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="relative size-[45px] shrink-0 overflow-hidden rounded-[3px] bg-white">
                    <Image src={game.image} alt="" fill sizes="45px" className="object-contain p-1 transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base text-white">{game.title}</p>
                    <p className="text-[10px] leading-5 text-[#888]">Last Played {game.lastPlayed}</p>
                  </div>
                </div>
                <button type="button" aria-label={`Resume ${game.title}`} className="flex size-6 shrink-0 items-center justify-center rounded-[4.4px] bg-brand text-white shadow-[0_0_36px_1.5px_rgba(22,163,74,0.28)] transition-transform group-hover:scale-110">
                  <Icon name={dashIcon("at-icons_play")} className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="relative overflow-hidden rounded-3xl bg-[rgba(0,12,29,0.8)] px-6 pt-8 pb-6 outline-2 -outline-offset-2 outline-white/40">
          <span aria-hidden className="absolute -top-24 -right-36 size-52 animate-[glow-drift_8s_ease-in-out_infinite] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.8)_25%,rgba(17,78,53,0.8)_93%)] blur-[44px]" />
          <div className="relative flex flex-col gap-2">
            <span className="relative flex size-[42px] items-center justify-center overflow-hidden rounded-md bg-black/5 text-white outline outline-1 -outline-offset-1 outline-white/80">
              <UsersIcon className="size-6" />
            </span>
            <p className="mt-2 text-base leading-5 font-medium text-white">Invite friends to play</p>
            <p className="text-[10px] text-[#888]">Team up, challenge friends, and play together.</p>
            <button type="button" className="mt-1 flex h-8 items-center justify-center rounded-md bg-brand text-xs font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5">
              Add Friends →
            </button>
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <p className="px-2 text-xs text-[#E9E8EB]">Groups</p>
          {groups.map((group) => (
            <button key={group.name} type="button" className="group relative flex items-center gap-2 rounded-md p-1 text-left transition-colors hover:bg-white/5">
              <span className="flex size-[42px] items-center justify-center rounded-[10px] bg-[#063241] p-0.5 transition-transform group-hover:scale-105">
                <span className="relative size-[28px] overflow-hidden rounded-md">
                  <Image src={dashArt.groupAvatar} alt="" fill sizes="28px" className="object-cover" />
                </span>
              </span>
              <span className="flex flex-col">
                <span className="text-base text-white">{group.name}</span>
                <span className="text-[10px] leading-5 text-[#888]">{group.members}</span>
              </span>
              {group.unread && <span className="absolute top-0.5 left-[38px] size-2.5 animate-pulse rounded-full border border-white bg-[#EA3232]" />}
            </button>
          ))}
        </section>
      </div>
    </aside>
  );
}
