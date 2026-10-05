import { scenes } from "@/lib/media";
import { Reveal } from "../Reveal";
import { Button, Highlight, Photo } from "../ui";

export function Cta() {
  return (
    <section className="relative flex min-h-[360px] items-center overflow-hidden rounded-[20px] outline outline-1 -outline-offset-1 outline-white/80 md:min-h-[620px] md:rounded-none">
      <div className="absolute inset-y-0 left-0 w-[140%] md:w-[75%]">
        <Photo src={scenes.ctaCover} className="object-left transition-transform duration-[1500ms] ease-snap hover:scale-105" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.35)_35%,rgba(0,0,0,0.9)_62%,#000_80%)]" />

      <div className="relative ml-auto flex max-w-[60%] flex-col items-end gap-3 px-4 py-10 text-right md:mr-[38px] md:max-w-[788px] md:gap-4 md:px-6 md:py-16">
        <Reveal step="first">
          <p className="text-xs text-accent md:text-base">07 / YOUR NEXT CHAPTER</p>
        </Reveal>
        <Reveal step="second" className="flex flex-col items-end gap-3 md:gap-4">
          <h2 className="text-[26px] leading-tight text-white capitalize sm:text-[40px] md:text-[60px]">
            The world can wait.
            <br />
            Your game is <Highlight>calling.</Highlight>
          </h2>
          <p className="text-xs leading-relaxed text-white sm:text-base md:text-xl md:leading-[30px]">
            A laptop at your desk. A phone on the sofa. Nimbus brings cloud gaming to supported screens, without a local game installation.
          </p>
        </Reveal>
        <Reveal step="third">
          <Button variant="ghost" arrow className="h-11 px-4 md:h-[50px] md:w-[182px]">Start Playing</Button>
        </Reveal>
      </div>
    </section>
  );
}
