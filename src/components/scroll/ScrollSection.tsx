"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: React.ReactNode;
  height?: string;
  pin?: boolean;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  className?: string;
  id?: string;
}

export default function ScrollSection({
  children,
  height = "300vh",
  pin = true,
  scrub = 0.6,
  start = "top top",
  end = "bottom bottom",
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  className = "",
  id,
}: ScrollSectionProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start,
          end,
          scrub,
          pin,
          onEnter,
          onLeave,
          onEnterBack,
          onLeaveBack,
        },
      });

      return tl;
    }, root);

    return () => ctx.revert();
  }, [start, end, scrub, pin, onEnter, onLeave, onEnterBack, onLeaveBack]);

  return (
    <section
      ref={root}
      id={id}
      className={`relative ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}