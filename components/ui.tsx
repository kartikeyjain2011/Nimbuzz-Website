import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Renders an SVG from /public/icons tinted with the current text color. */
export function Icon({ name, className = "size-4" }: { name: string; className?: string }) {
  const url = `url("${encodeURI(`/icons/${name}.svg`)}")`;
  const style: CSSProperties = {
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
  return <span aria-hidden style={style} className={`inline-block shrink-0 bg-current ${className}`} />;
}

export function ArrowUpRight({ className = "size-[18px]" }: { className?: string }) {
  return <Icon name="arrow-up-right" className={className} />;
}

export function ChevronRight({ className = "size-4" }: { className?: string }) {
  return <Icon name="akar-icons_chevron-down-small" className={className} />;
}

export function NimbusMark({ variant = "nav", className = "h-10 w-[60px]" }: { variant?: "nav" | "footer"; className?: string }) {
  return (
    <Image
      src={variant === "nav" ? "/icons/Logo.svg" : "/icons/Logo-1.svg"}
      alt="Nimbus"
      width={variant === "nav" ? 61 : 69}
      height={variant === "nav" ? 41 : 46}
      className={className}
    />
  );
}

/** Fills its nearest positioned parent. */
export function Photo({ src, alt = "", sizes = "100vw", className = "", priority = false }: { src: string; alt?: string; sizes?: string; className?: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export function Button({ children, href = "#", variant = "primary", arrow = false, className = "" }: ButtonProps) {
  const base =
    "group relative inline-flex h-[50px] items-center justify-center gap-1.5 overflow-hidden rounded-md px-3.5 text-base font-bold text-white transition-all duration-300 ease-snap";
  const styles =
    variant === "primary"
      ? "bg-brand shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_60px_6px_rgba(22,163,74,0.45)]"
      : "bg-black/5 outline outline-1 -outline-offset-1 outline-white/80 hover:bg-brand/10 hover:outline-brand";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {variant === "ghost" && (
        <span aria-hidden className="pointer-events-none absolute -left-5 top-3 h-[182px] w-[472px] rounded-full bg-brand/20 blur-[100px]" />
      )}
      <span className="relative">{children}</span>
      {arrow && <ArrowUpRight className="relative size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </a>
  );
}

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-brand">{children}</span>;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; href: string };
  aside?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action, aside }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
      <Reveal className="flex flex-col gap-2.5 md:gap-3.5">
        <p className="text-base text-accent">{eyebrow}</p>
        <h2 className="text-[32px] leading-[1.1] text-ink capitalize sm:text-[44px] md:text-[64px]">{title}</h2>
        {description && <p className="text-base leading-relaxed text-white md:text-2xl md:leading-[30px]">{description}</p>}
      </Reveal>
      {action && (
        <a href={action.href} className="group inline-flex shrink-0 items-center gap-2 text-base text-white">
          {action.label}
          <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      )}
      {aside}
    </div>
  );
}

export function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-[10px] md:size-[70px] md:rounded-[12.46px] outline outline-[0.98px] -outline-offset-[0.98px] outline-white/80">
      {children}
    </div>
  );
}
