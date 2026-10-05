"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";
import { Highlight, SectionHeading } from "../ui";

const faqs = [
  {
    q: "What is cloud gaming?",
    a: "The game runs on a remote computer, and video streams to your device while your controls are sent back. You don’t need to install the full game locally.",
  },
  {
    q: "Do I need to own the games?",
    a: "Access depends on the title. Some games require a purchase or a connected store account. Check each game’s details in the Nimbus catalog.",
  },
  {
    q: "What do I need to start?",
    a: "A Nimbus account, a supported device and browser, and a stable internet connection. Check the setup guide for controller and network requirements.",
  },
  {
    q: "Can I play on my phone?",
    a: "On supported mobile devices, yes. Available controls and browser support can vary by game and device. Review compatibility before launching.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set(faqs.map((_, i) => i)));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" className="flex scroll-mt-32 flex-col gap-[47px]">
      <SectionHeading
        eyebrow="06 / GOOD TO KNOW"
        title={<>Clear questions, clear <Highlight>answers.</Highlight></>}
        description="A few things worth knowing before your next adventure."
      />

      <Reveal step="second">
        <ul>
          {faqs.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <li key={item.q} className="border-t border-line py-6">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span className="flex-1 text-[21px] text-brand">{item.q}</span>
                  <span className="font-mono text-xl text-accent">{isOpen ? "−" : "+"}</span>
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-snap ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden font-inter text-[15px] leading-[25.5px] text-white">
                    <span className="block pt-3.5">{item.a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
