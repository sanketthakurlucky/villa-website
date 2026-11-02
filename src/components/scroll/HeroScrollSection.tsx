"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroScrollSectionProps {
  title: string;
  subtitle?: string;
  accentText?: string;
  className?: string;
  backgroundVideo?: string;
}

export default function HeroScrollSection({
  title,
  subtitle,
  accentText,
  className = "",
  backgroundVideo,
}: HeroScrollSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.from(chars, {
          y: 100,
          opacity: 0,
          stagger: 0.03,
          ease: "power3.out",
        }, 0);
      }

      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: 60,
          opacity: 0,
          ease: "power3.out",
        }, 0.1);
      }

      tl.to({}, { duration: 0.5 }); // hold
    }, root);

    return () => ctx.revert();
  }, []);

  // Split title into characters for stagger animation
  const titleChars = title.split("").map((char, i) =>
    <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
  );

  return (
    <section
      ref={root}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {backgroundVideo && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full object-cover"
            poster={backgroundVideo}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.4)_0%,rgba(10,10,10,0.65)_100%)]" />
        </div>
      )}

      <div className="relative z-10 w-full container-main px-6 py-20 text-center text-white">
        <h1
          ref={titleRef}
          className="hero-title leading-tight animate-slide-up text-white"
        >
          {titleChars.map((char, i) =>
            <span key={i} className={char.props.children === accentText?.charAt(0) ? "gold-accent" : ""}>
              {char.props.children}
            </span>
          )}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-body-lg sm:text-xl text-white/90 mt-6 max-w-2xl mx-auto animate-slide-up animation-delay-200"
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}