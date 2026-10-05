import { scenes } from "@/lib/media";
import { Reveal } from "../Reveal";
import { Button, Highlight, Photo } from "../ui";

export function Cta() {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden outline outline-1 -outline-offset-1 outline-white/80">
      <Photo src={scenes.ghostRecon} className="object-[30%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(244deg,#000_0%,rgba(0,0,0,0)_100%)]" />

      <div className="relative ml-auto flex max-w-[788px] flex-col items-end gap-4 px-6 py-16 text-right md:mr-[38px]">
        <Reveal step="first">
          <p className="text-base text-accent">07 / YOUR NEXT CHAPTER</p>
        </Reveal>
        <Reveal step="second" className="flex flex-col items-end gap-4">
          <h2 className="text-[40px] leading-tight text-white capitalize md:text-[60px]">
            The world can wait.
            <br />
            Your game is <Highlight>calling.</Highlight>
          </h2>
          <p className="text-xl leading-[30px] text-white">
            A laptop at your desk. A phone on the sofa. Nimbus brings cloud gaming to supported screens, without a local game installation.
          </p>
        </Reveal>
        <Reveal step="third">
          <Button variant="ghost" arrow className="w-[182px]">Start Playing</Button>
        </Reveal>
      </div>
    </section>
  );
}
