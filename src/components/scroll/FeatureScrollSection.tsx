"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeatureData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

interface FeatureScrollSectionProps {
  features: FeatureData[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function FeatureScrollSection({
  features = [],
  className = "",
  title = "World-Class <span className=\"gold-accent\">Amenities</span>",
  subtitle = "Every villa is equipped with premium facilities for an unforgettable stay",
}: FeatureScrollSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      // Stagger category headers
      categoryRefs.current.forEach((element, category) => {
        if (!element) return;

        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 50%",
              scrub: 0.6,
            },
          }
        );
      });

      // Stagger cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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
    }, root);

    return () => ctx.revert();
  }, [features.length]);

  // Group features by category
  const categories = features.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, FeatureData[]>);

  return (
    <section
      ref={root}
      className={`relative py-24 bg-stone-950 ${className}`}
    >
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <h2 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {title}
          </h2>
          <p className="text-body-lg text-white/70 mt-6 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(categories).map(([category, categoryFeatures], catIndex) => (
            <div key={category}>
              <div
                ref={(el) => categoryRefs.current.set(category, el!)}
                className="mb-8"
              >
                <h3 className="text-2xl font-semibold text-white/50 tracking-wider uppercase">
                  {category}
                </h3>
                <div className="w-20 h-px bg-gradient-gold mt-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFeatures.map((feature, featIndex) => (
                  <article
                    key={feature.id}
                    ref={(el) => {
                      cardsRef.current[catIndex * 10 + featIndex] = el!;
                    }}
                    className="group relative p-6 bg-stone-900/50 backdrop-blur-sm border border-stone-800 rounded-2xl transition-all duration-500 hover:border-gold-accent/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:scale-[1.02]"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-gold/20 flex items-center justify-center mb-4 group-hover:bg-gradient-gold transition-all duration-500">
                      <div className="text-2xl text-gold-accent group-hover:text-white transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-accent transition-colors">
                      {feature.name}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}