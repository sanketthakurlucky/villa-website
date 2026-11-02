"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DestinationData {
  id: string;
  name: string;
  slug: string;
  image: string;
  villaCount: number;
  region: string;
}

interface DestinationParallaxSectionProps {
  destinations: DestinationData[];
  className?: string;
}

export default function DestinationParallaxSection({
  destinations = [],
  className = "",
}: DestinationParallaxSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Parallax background elements
      gsap.to(".parallax-bg", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stagger cards in
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      });

      // Text reveal
      gsap.fromTo(
        ".dest-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dest-title",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.6,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "#050505" }}
    >
      {/* Parallax background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-gold-accent/10 via-transparent to-transparent blur-3xl" />
        <div className="parallax-bg absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-gold-accent/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container-main py-24">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <h2 className="dest-title hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Explore <span className="gold-accent">Destinations</span>
          </h2>
          <p className="text-body-lg text-white/70 mt-6 max-w-2xl mx-auto">
            From sun-kissed coasts to misty mountains — discover India's most exclusive villa destinations
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) cardsRef.current[0] = el;
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {destinations.map((dest, index) => (
            <article
              key={dest.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 cursor-pointer"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="text-xl font-semibold mb-1 group-hover:text-gold-accent transition-colors">
                  {dest.name}
                </h3>
                <p className="text-white/60 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {dest.region}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    {dest.villaCount} Villas
                  </span>
                  <span className="bg-gradient-gold px-4 py-1.5 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}