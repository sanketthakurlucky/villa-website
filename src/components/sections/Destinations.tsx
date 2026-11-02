'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const destinations = [
  { name: 'North Goa', region: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', villas: 45, slug: 'north-goa' },
  { name: 'South Goa', region: 'Goa', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', villas: 32, slug: 'south-goa' },
  { name: 'Udaipur', region: 'Rajasthan', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', villas: 28, slug: 'udaipur' },
  { name: 'Jaipur', region: 'Rajasthan', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', villas: 22, slug: 'jaipur' },
  { name: 'Manali & Shimla', region: 'Himachal', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', villas: 18, slug: 'manali-shimla' },
  { name: 'Kerala', region: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', villas: 25, slug: 'kerala' },
  { name: 'Leh-Ladakh', region: 'Ladakh', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80', villas: 12, slug: 'leh-ladakh' },
  { name: 'Coorg', region: 'Karnataka', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', villas: 15, slug: 'coorg' },
];

export default function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  const next = () => setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
  const prev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="section-py bg-white">
      <div className="container-main">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Explore</span>
            <h2 className="text-display-sm mt-2">Popular <span className="script-accent font-normal text-luxPink">Destinations</span></h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prev} disabled={currentIndex === 0} aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={next} disabled={currentIndex === maxIndex} aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDestinations.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/villas?location=${encodeURIComponent(dest.name)}`}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-white/70 uppercase tracking-wider">{dest.region}</span>
                <h3 className="text-xl font-semibold mt-1">{dest.name}</h3>
                <p className="text-sm text-white/80 mt-1">{dest.villas} villas available</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-luxPink hover:text-luxPinkHover"
          >
            View All Destinations
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';