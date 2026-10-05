import { scenes } from "@/lib/media";
import { Reveal } from "../Reveal";
import { Button, Highlight, Icon, IconTile, Photo, SectionHeading } from "../ui";

const devices = [
  { label: "Desktop", icon: "cuida_monitor-outline" },
  { label: "Laptop", icon: "bi_laptop" },
  { label: "Mobile", icon: "basil_mobile-phone-outline-1" },
];

const topRow = [scenes.lastOfUs, scenes.odyssey];
const bottomRow = [scenes.shadows, scenes.ghostRecon, scenes.firstLight];

function SlantedTile({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`group relative h-full -skew-x-[14deg] overflow-hidden rounded-[14px] bg-black ${className}`}>
      <div className="absolute inset-y-0 -inset-x-[20%] skew-x-[14deg]">
        <Photo src={src} sizes="900px" className="transition-transform duration-[1500ms] ease-snap group-hover:scale-110" />
      </div>
    </div>
  );
}

export function PlayAnywhere() {
  return (
    <section id="play-anywhere" className="flex scroll-mt-32 flex-col gap-[47px]">
      <SectionHeading eyebrow="04 / PLAY ANYWHERE" title={<>Same worlds. New <Highlight>screens.</Highlight></>} />

      <div className="relative overflow-hidden rounded-[30px] bg-black md:h-[620px]">
        <div aria-hidden className="absolute inset-y-0 right-[-6%] left-[28%] hidden flex-col gap-1.5 md:flex">
          <div className="flex h-[78%] gap-1.5">
            {topRow.map((src) => (
              <SlantedTile key={src} src={src} className="flex-1" />
            ))}
          </div>
          <div className="-ml-[10%] flex flex-1 gap-1.5 opacity-50">
            {bottomRow.map((src) => (
              <SlantedTile key={src} src={src} className="flex-1" />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#000_25%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0)_75%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)_100%)]" />

        <div className="relative flex max-w-[640px] flex-col gap-4 px-6 py-12 md:px-[60px] md:pt-[50px]">
          <Reveal step="first">
            <IconTile>
              <Icon name="basil_mobile-phone-outline" className="size-[42px] text-white" />
            </IconTile>
          </Reveal>
          <Reveal step="second" className="flex flex-col gap-4">
            <h3 className="text-[40px] leading-[1.15] text-white capitalize md:text-[60px]">
              Familiar realms.
              <br />
              Fresh <Highlight>battles.</Highlight>
            </h3>
            <p className="text-xl leading-[30px] text-white">
              A laptop at your desk. A phone on the sofa. Nimbus brings cloud gaming to supported screens, without a local game installation.
            </p>
            <ul className="flex gap-[26px] border-y border-line py-[18px]">
              {devices.map((d) => (
                <li key={d.label} className="flex flex-col items-center gap-1.5">
                  <span className="relative flex size-[46px] items-center justify-center overflow-hidden rounded-md bg-black/5 outline outline-1 -outline-offset-1 outline-white/80 transition-colors hover:outline-brand">
                    <Icon name={d.icon} className="relative size-[22px] text-brand" />
                    <span aria-hidden className="absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />
                  </span>
                  <span className="font-inter text-xs text-ink">{d.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal step="third" className="pt-2">
            <Button arrow className="w-[182px]">Check your setup</Button>
          </Reveal>
        </div>

        <Reveal step="third" className="relative px-6 pb-10 md:absolute md:right-[30px] md:bottom-[30px] md:max-w-[520px] md:p-0">
          <p className="text-xl leading-[30px] text-white/50 md:text-right">
            Device, browser, controller and connection requirements vary. Check compatibility before you start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
