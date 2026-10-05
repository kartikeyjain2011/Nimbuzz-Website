"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Presets match the Figma timeline: each step holds, then eases
 * (cubic-bezier 0.16, 1, 0.3, 1) upward while fading in.
 */
export const revealSteps = {
  first: { delay: 200, duration: 550, y: 26 },
  second: { delay: 380, duration: 550, y: 20 },
  third: { delay: 580, duration: 540, y: 14 },
} as const;

type RevealProps = {
  children: ReactNode;
  step?: keyof typeof revealSteps;
  className?: string;
};

export function Reveal({ children, step = "first", className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { delay, duration, y } = revealSteps[step];
  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  return (
    <div ref={ref} style={style} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
