"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VillaCardData {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

interface VillaShowcaseSectionProps {
  villas: VillaCardData[];
  className?: string;
}

export default function VillaShowcaseSection({
  villas = [],
  className = "",
}: VillaShowcaseSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!root.current || villas.length === 0) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${villas.length * 100}%`,
        pin: true,
        pinSpacing: true,
      });

      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: ScrollTrigger.getById("villa-showcase-pin") as any,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );
      });

      // Background color transitions
      gsap.to("body", {
        backgroundColor: "#0a0a0c",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [villas.length]);

  return (
    <section
      ref={root}
      id="villa-showcase"
      className={`relative bg-stone-950 ${className}`}
    >
      <div className="container-main py-20">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <h2 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Handpicked <span className="gold-accent">Villas</span>
          </h2>
          <p className="text-body-lg text-white/70 mt-6 max-w-2xl mx-auto">
            Each property personally vetted by our concierge team
          </p>
        </div>

        <div
          ref={(el) => {
            if (el) cardsRef.current[0] = el;
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {villas.map((villa, index) => (
            <article
              key={villa.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 transition-all duration-500 hover:border-gold-accent/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    {villa.bedrooms}BHK
                  </span>
                  <span className="bg-gradient-gold px-4 py-1.5 rounded-full text-sm font-semibold">
                    ₹{villa.price.toLocaleString()}/night
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-accent transition-colors">
                  {villa.name}
                </h3>
                <p className="text-white/60 text-sm mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {villa.location}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/50 border-t border-stone-800 pt-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16V8a2 2 0 012-2h4a2 2 0 012 2v8" />
                    </svg>
                    {villa.bedrooms} Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2" />
                    </svg>
                    {villa.bathrooms} Bath
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {villa.maxGuests} Guests
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