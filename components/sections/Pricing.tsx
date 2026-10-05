"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";
import { Highlight, Icon, SectionHeading } from "../ui";

type Billing = "monthly" | "annually";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  // TODO: replace with real annual pricing; placeholder is 10x monthly.
  annually: number;
  features: string[];
  icon: string;
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic",
    tagline: "Jump into cloud gaming with no hardware.",
    monthly: 799,
    annually: 7990,
    features: ["1080p at 60 FPS", "3-hour session length", "Standard queue priority", "10 GB cloud saves"],
    icon: "famicons_game-controller-outline",
  },
  {
    name: "Pro",
    tagline: "High frame rates and no queue wait.",
    monthly: 1499,
    annually: 14990,
    features: ["1440p at 120 FPS", "Ray tracing enabled", "No queue priority", "50 GB cloud saves", "5.1 surround sound"],
    icon: "reicon_bolt-lightning",
    recommended: true,
  },
  {
    name: "Premium",
    tagline: "4K at 120 FPS with full path tracing.",
    monthly: 2499,
    annually: 24990,
    features: ["4K at 120 FPS", "Full path tracing and DLSS 3.5", "VIP fast-track access", "250 GB personal NVMe", "Priority support"],
    icon: "hugeicons_crown-02",
  },
  {
    name: "Ultimate",
    tagline: "4K at 120 FPS with full path tracing.",
    monthly: 2999,
    annually: 29990,
    features: ["4K at 240 FPS, 8K preview", "Dedicated bare-metal node", "500 GB personal NVMe", "Dolby Atmos spatial audio", "24/7 dedicated support"],
    icon: "material-symbols-light_diamond-shine-outline-rounded",
  },
];

const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  return (
    <div className="group relative flex w-full flex-col gap-[30px] overflow-hidden rounded-t-[24px] rounded-b-[30px] bg-card p-6 shadow-card outline outline-1 -outline-offset-1 outline-card-line backdrop-blur-[6px] transition-transform duration-500 ease-snap hover:-translate-y-1.5">
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-40 h-64 w-[480px] rotate-[15deg] opacity-30 transition-opacity duration-700 group-hover:opacity-60">
        <div className="absolute inset-0 bg-brand blur-[125px]" />
        <div className={`absolute inset-10 blur-[80px] ${plan.recommended ? "bg-mint" : "bg-cyan"}`} />
        <div className="absolute inset-20 bg-white blur-[45px]" />
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="relative flex size-[60px] items-center justify-center overflow-hidden rounded-[8.57px] bg-black/5 outline outline-[1.43px] -outline-offset-[1.43px] outline-white/80">
          <span aria-hidden className="absolute -left-7 top-4 h-[260px] w-[674px] rounded-full bg-brand/20 blur-[148px]" />
          <Icon name={plan.icon} className={`relative text-white ${plan.name === "Ultimate" ? "size-11" : "size-9"}`} />
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[22px] leading-[25.3px] text-white">{plan.name}</h3>
            <p className="text-[17px] leading-[25.5px] text-dim">{plan.tagline}</p>
          </div>
          <p className="text-white">
            <span className="text-[48px] leading-[55.2px] font-medium">{formatPrice(plan[billing])}</span>
            <span className="text-[42px] leading-[48.3px] font-light">{billing === "monthly" ? "/mo" : "/yr"}</span>
          </p>
        </div>
      </div>

      <hr className="relative border-card-line" />

      <ul className="relative flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand shadow-glow-sm">
              <Icon name="Icon" className="h-[7px] w-[10px] text-white" />
            </span>
            <span className="text-[17px] leading-[25.5px] text-soft">{f}</span>
          </li>
        ))}
      </ul>

      <a href="#" className="relative flex h-[46px] items-center justify-center rounded-md bg-brand text-base font-bold text-white shadow-glow transition-shadow duration-300 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]">
        Select {plan.name}
      </a>
    </div>
  );
}

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div role="tablist" className="relative flex h-12 w-[218px] shrink-0 items-center rounded-[30px] bg-black/5 p-1 outline outline-1 -outline-offset-1 outline-white/80">
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 left-1 w-[105px] overflow-hidden rounded-3xl bg-[rgba(0,12,29,0.8)] outline-2 -outline-offset-2 outline-white/40 transition-transform duration-500 ease-snap ${value === "annually" ? "translate-x-[103px]" : ""}`}
      >
        <span className="absolute -inset-10 rotate-[156deg] rounded-full bg-[linear-gradient(135deg,rgba(22,163,74,0.8)_25%,rgba(17,78,53,0.8)_93%)] blur-[22px]" />
      </span>
      {(["monthly", "annually"] as const).map((b) => (
        <button
          key={b}
          role="tab"
          aria-selected={value === b}
          onClick={() => onChange(b)}
          className={`relative z-10 h-10 flex-1 rounded-3xl text-base capitalize transition-colors ${value === b ? "font-medium text-white" : "text-[#d0d0d0]"}`}
        >
          {b}
        </button>
      ))}
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="flex scroll-mt-32 flex-col gap-[47px]">
      <SectionHeading
        eyebrow="05 / PICK YOUR PLAN"
        title={<>Power that fits your <Highlight>play.</Highlight></>}
        aside={<BillingToggle value={billing} onChange={setBilling} />}
      />

      <Reveal step="second" className="grid grid-cols-1 items-end gap-[21px] md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) =>
          plan.recommended ? (
            <div key={plan.name} className="flex flex-col overflow-hidden rounded-t-[24px] rounded-b-[30px] outline-2 outline-brand">
              <div className="relative -mb-[34px] flex items-center justify-center gap-1.5 overflow-hidden rounded-t-[24px] bg-brand pt-1.5 pb-10">
                <span aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.15)_0_14px,transparent_14px_28px)]" />
                <span className="relative font-inter-tight text-[15px] leading-[22.5px] font-medium text-white">Our Recommendation</span>
                <Icon name="star-four-fill" className="relative size-4 text-white" />
              </div>
              <PlanCard plan={plan} billing={billing} />
            </div>
          ) : (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ),
        )}
      </Reveal>
    </section>
  );
}
