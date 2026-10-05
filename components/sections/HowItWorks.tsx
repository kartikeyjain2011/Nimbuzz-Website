"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { logos, scenes, videos } from "@/lib/media";
import { Reveal } from "../Reveal";
import { Highlight, Icon, IconTile, SectionHeading } from "../ui";

type Step = {
  lead: string;
  highlight: string;
  body: string;
  icon: string;
  video: string;
  poster: string;
  logo?: { src: string; className: string };
  align: "left" | "right";
};

const steps: Step[] = [
  {
    lead: "Play Games Anytime ",
    highlight: "Anywhere",
    body: "Connect your existing storefronts or pick new ones from the Nimbus library. Your save files and settings go with you.",
    icon: "codicon_search",
    video: videos.clip1,
    poster: scenes.firstLight,
    logo: { src: logos.firstLight, className: "right-[30px]" },
    align: "left",
  },
  {
    lead: "We render ",
    highlight: "it",
    body: "The game boots on a dedicated GPU in the data center closest to you. It's your own instance, not a shared session, so nothing throttles mid-match.",
    icon: "ep_loading",
    video: videos.clip2,
    poster: scenes.shadows,
    logo: { src: logos.shadows, className: "left-[30px]" },
    align: "right",
  },
  {
    lead: "Watch and ",
    highlight: "play",
    body: "Video streams to your screen, your inputs stream back, and the loop repeats around sixty times a second. The hardware stays invisible.",
    icon: "ep_monitor",
    video: videos.clip3,
    poster: scenes.lastOfUs,
    align: "left",
  },
];

const STACK_TOP = 120;
const STACK_OFFSET = 28;

export function HowItWorks() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        const inner = card?.firstElementChild as HTMLElement | null;
        if (!card || !inner) return;
        // How far the following cards have slid over this one (0..remaining cards).
        let covered = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const next = cards[j];
          if (!next) continue;
          const nextTop = next.getBoundingClientRect().top;
          const stuckAt = STACK_TOP + j * STACK_OFFSET;
          const travel = card.offsetHeight;
          covered += Math.min(Math.max((stuckAt + travel - nextTop) / travel, 0), 1);
        }
        inner.style.transform = `scale(${1 - covered * 0.05})`;
        inner.style.filter = `brightness(${1 - covered * 0.35})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="how-it-works" className="flex scroll-mt-32 flex-col gap-[47px]">
      <SectionHeading eyebrow="02 / THE SIMPLE PART" title={<span className="normal-case">Less setup. <Highlight>More game.</Highlight></span>} />

      <div className="flex flex-col gap-16 pb-10">
        {steps.map((step, i) => (
          <article
            key={step.highlight}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="sticky h-[560px] md:h-[715px]"
            style={{ top: STACK_TOP + i * STACK_OFFSET }}
          >
            <div className="group relative flex size-full origin-top items-center overflow-hidden rounded-[30px] shadow-[0_-20px_60px_rgba(0,0,0,0.6)] outline outline-1 -outline-offset-1 outline-white/80 will-change-transform">
              <video
                src={step.video}
                poster={step.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-snap group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 ${
                  step.align === "left"
                    ? "bg-[linear-gradient(245deg,rgba(0,0,0,0)_0%,#000_100%)]"
                    : "bg-[linear-gradient(244deg,#000_0%,rgba(0,0,0,0)_100%)]"
                }`}
              />
              {step.logo && (
                <Image src={step.logo.src} alt="" width={177} height={68} className={`absolute top-[30px] hidden h-[68px] w-auto md:block ${step.logo.className}`} />
              )}

              <div className={`relative w-full px-6 md:px-[60px] ${step.align === "right" ? "md:flex md:justify-end" : ""}`}>
                <div className="flex max-w-[788px] flex-col gap-2.5">
                  <Reveal step="first">
                    <IconTile>
                      <Icon name={step.icon} className="size-[42px] text-white" />
                    </IconTile>
                  </Reveal>
                  <Reveal step="second" className="flex flex-col gap-4">
                    <h3 className="text-[40px] leading-tight text-white capitalize md:text-[60px]">
                      {step.lead}
                      <Highlight>{step.highlight}</Highlight>
                    </h3>
                    <p className="text-xl leading-[30px] text-white">{step.body}</p>
                  </Reveal>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
