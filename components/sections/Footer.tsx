import Image from "next/image";
import { logos } from "@/lib/media";
import { Icon, NimbusMark } from "../ui";

const columns = [
  { title: "EXPLORE", links: [["Discover games", "#discover"], ["How it works", "#how-it-works"], ["Supported devices", "#play-anywhere"]] },
  { title: "NIMBUS", links: [["Help center", "#"], ["Contact", "#"], ["Community", "#"]] },
];

const Dot = () => <span className="text-xs text-muted">·</span>;

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-[30px] bg-card">
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-40 h-[420px] w-[260px] -rotate-[7deg]">
        <div className="absolute inset-0 rounded-full bg-mint/70 blur-[80px]" />
        <div className="absolute inset-12 rounded-full bg-mint/60 blur-[40px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1365px] flex-col px-6 pt-[70px] md:px-10">
        <div className="flex flex-col items-center gap-3 border-b border-line pb-5">
          <p className="text-xs text-muted">Secure payments accepted</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Image src="/icons/razorpay_logo.svg.svg" alt="Razorpay" width={77} height={17} />
            <Dot />
            <Image src="/icons/Logo.svg.svg" alt="Mastercard" width={85} height={11} />
            <Dot />
            <Image src="/icons/visa_inc_logo.svg.svg" alt="Visa" width={28} height={9} />
            <Dot />
            <Image src={logos.upi} alt="RuPay" width={58} height={26} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 py-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Icon name="griddy-icons_lock-alt-02" className="size-4" />
            256-bit SSL encrypted
          </span>
          <Dot />
          <span className="flex items-center gap-1">
            <Icon name="bi_shield" className="size-4" />
            PCI DSS compliant gateway
          </span>
        </div>

        <div className="flex flex-col justify-between gap-12 py-10 md:flex-row md:items-start">
          <div className="flex max-w-[300px] flex-col gap-3">
            <a href="#" className="flex items-center gap-3">
              <NimbusMark variant="footer" className="h-[46px] w-[69px]" />
              <span className="text-[29.75px] font-bold tracking-[0.3em] text-white">NIMBUS</span>
            </a>
            <p className="text-[13px] text-muted">Lemonade Digital Media Technology Private Limited</p>
            <address className="mt-5 flex flex-col gap-1.5 text-[13px] text-muted not-italic">
              <span>91 Spring Board, Jhandewalan, Delhi‑110055</span>
              <a href="tel:+918588000993" className="transition-colors hover:text-white">+91 85880 00993</a>
              <a href="mailto:hi@playnimbuz.com" className="transition-colors hover:text-white">hi@playnimbuz.com</a>
            </address>
          </div>

          <div className="flex gap-16 md:gap-[100px]">
            {columns.map((col) => (
              <nav key={col.title} className="flex flex-col gap-4">
                <p className="font-mono text-base text-brand">{col.title}</p>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="text-base text-muted transition-colors hover:text-white">{label}</a>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-3 border-t border-line pt-4 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span>© 2026 Nimbus. All rights reserved.</span>
          <span>CIN U72900DL2021PTC388171 · GSTIN 07AAECL7835P1ZT</span>
          <span>
            <a href="#" className="hover:text-white">Privacy policy</a> / <a href="#" className="hover:text-white">Terms of service</a>
          </span>
        </div>

        <p
          aria-hidden
          className="pointer-events-none -mt-6 h-[clamp(60px,10vw,150px)] overflow-hidden text-center font-display text-[clamp(80px,15vw,230px)] leading-[0.85] font-medium tracking-[0.15em] text-transparent select-none [-webkit-text-stroke:1.5px_rgba(22,163,74,0.45)]"
        >
          NIMBUS
        </p>
      </div>
    </footer>
  );
}
