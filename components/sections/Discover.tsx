import { gameDetails } from "@/lib/games";
import { posters } from "@/lib/media";
import { GameCard } from "../GameCard";
import { Reveal } from "../Reveal";
import { Highlight, SectionHeading } from "../ui";

const games = [
  { title: "007 First Light", image: posters.firstLight, details: gameDetails.firstLight },
  { title: "Assassin's Creed Black Flag Resynced", image: posters.blackFlag, details: gameDetails.blackFlag },
  { title: "Death Stranding 2", image: posters.deathStranding, details: gameDetails.deathStranding },
  { title: "EA Sports FC 27", image: posters.eaFc, details: gameDetails.eaFc },
  { title: "Assassins Creed Shadows", image: posters.acShadows, details: gameDetails.acShadows },
  { title: "resident evil requiem", image: posters.residentEvil, details: gameDetails.residentEvil },
  { title: "God of War Ragnarök", image: posters.godOfWar, details: gameDetails.godOfWar },
  { title: "assassin's creed odyssey", image: posters.odyssey, details: gameDetails.odyssey },
];

const pillars = ["01 / YOUR GAMES, STREAMED", "02 / NO LOCAL INSTALLS", "03 / MORE WAYS TO PLAY"];

export function Discover() {
  return (
    <section id="discover" className="flex scroll-mt-32 flex-col gap-[47px]">
      <SectionHeading
        eyebrow="01 / DISCOVER"
        title={<>Your next <Highlight>obsession.</Highlight></>}
        action={{ label: "View all", href: "#" }}
      />

      <Reveal step="second" className="no-scrollbar -mx-4 flex snap-x gap-[19px] overflow-x-auto scroll-px-4 px-4 py-2 2xl:justify-between [&>*]:snap-start">
        {games.map((game) => (
          <GameCard key={game.title} {...game} capitalize />
        ))}
      </Reveal>

      <Reveal step="third">
        <div className="flex flex-wrap justify-center gap-3.5 border-y border-line px-2.5 py-[22px] text-center text-[11px] text-white sm:justify-between md:px-16">
          {pillars.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
