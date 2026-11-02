"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameSequence } from "./useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

interface FrameScrubberProps {
  sequenceName: string;
  progressStart: number;
  progressEnd: number;
  className?: string;
  canvasClassName?: string;
  onDraw?: (progress: number) => void;
}

export default function FrameScrubber({
  sequenceName,
  progressStart = 0,
  progressEnd = 1,
  className = "",
  canvasClassName = "",
  onDraw,
}: FrameScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ready, draw } = useFrameSequence(sequenceName);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = progressStart + self.progress * (progressEnd - progressStart);
            draw(canvasRef.current!, progress);
            onDraw?.(progress);
          },
        },
      });
      return tl;
    }, canvasRef);

    return () => ctx.revert();
  }, [ready, draw, progressStart, progressEnd, onDraw]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${canvasClassName}`}
      aria-hidden="true"
    />
  );
}