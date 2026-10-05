import { posters, trailers } from "@/lib/media";
import { GameCard } from "../GameCard";
import { Reveal } from "../Reveal";
import { Highlight, SectionHeading } from "../ui";

const trending = [
  { title: "Assassins Creed Shadows", image: posters.acShadows, trailer: trailers.acShadows },
  { title: "EA Sports FC 27", image: posters.eaFc },
  { title: "Assassin's Creed Black Flag Resynced", image: posters.blackFlag },
  { title: "Control Resonant", image: posters.control },
  { title: "Cyberpunk 2077", image: posters.cyberpunk },
  { title: "The Witcher 3: Wild Hunt", image: posters.witcher },
];

export function Trending() {
  return (
    <section className="relative flex flex-col gap-[47px]">
      <SectionHeading
        eyebrow="03 / ON THE RADAR"
        title={<>Trending <Highlight>worlds.</Highlight></>}
        action={{ label: "Explore the catalog", href: "#" }}
      />

      <div className="relative">
        <Reveal step="second" className="no-scrollbar flex gap-[19px] overflow-x-auto">
          {trending.map((game, i) => (
            <div key={game.title} className="relative h-[353px] w-[271px] shrink-0">
              <span className="absolute top-0 left-0 font-inter text-[300px] leading-none font-bold text-transparent select-none [-webkit-text-stroke:2px_rgba(255,255,255,0.35)]">
                {i + 1}
              </span>
              <div className="absolute top-[62px] left-[105px]">
                <GameCard {...game} />
              </div>
            </div>
          ))}
        </Reveal>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[53px] bg-[linear-gradient(270deg,#0a0a0a_0%,rgba(10,10,10,0)_100%)]" />
      </div>
    </section>
  );
}
