'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, MapPin, Users, Bath } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn, formatPrice } from '@/lib/utils';

const villas = [
  {
    id: 'ss031',
    name: 'Seasalt Villa 01 — Assagao',
    codeName: 'SS031 4BHK Assagao',
    location: 'Assagao, North Goa',
    rating: 4.8,
    reviews: 142,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    price: 34500,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Pool', 'Chef', 'Beach Access'],
  },
  {
    id: 'ss032',
    name: 'Seasalt Villa 02 — Vagator',
    codeName: 'SS032 3BHK Vagator',
    location: 'Vagator, North Goa',
    rating: 4.7,
    reviews: 198,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    price: 26000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Pool', 'Jacuzzi', 'Sunset View'],
  },
  {
    id: 'ss033',
    name: 'Seasalt Villa 03 — Candolim',
    codeName: 'SS033 4BHK Candolim',
    location: 'Candolim, North Goa',
    rating: 4.9,
    reviews: 215,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    price: 38000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Pool', 'Garden', 'Beachfront'],
  },
  {
    id: 'ss034',
    name: 'Seasalt Villa 04 — Anjuna',
    codeName: 'SS034 5BHK Anjuna',
    location: 'Anjuna, North Goa',
    rating: 4.6,
    reviews: 164,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 14,
    price: 48000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Pool', 'Games Room', 'Rooftop'],
  },
];

export default function FeaturedVillas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  return (
    <section className="section-py bg-gray-50">
      <div className="container-main">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Featured</span>
            <h2 className="text-display-sm mt-2">Top Rated <span className="script-accent font-normal text-luxPink">Villas</span></h2>
          </div>
          <Link
            href="/villas"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-luxPink hover:text-luxPinkHover"
          >
            View All Villas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {villas.map((villa, i) => (
            <Link
              key={villa.id}
              href={`/villas/${villa.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:bg-luxPink hover:text-white transition-all" aria-label="Add to wishlist">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-luxPink">
                  {villa.tags[0]}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 group-hover:text-luxPink transition-colors line-clamp-1">{villa.name}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {villa.location}</p>

                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-900">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {villa.rating}
                  </span>
                  <span className="text-sm text-gray-400">({villa.reviews})</span>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {villa.maxGuests} Guests</span>
                  <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {villa.bathrooms} Baths</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{formatPrice(villa.price)}</p>
                    <p className="text-xs text-gray-400">per night + taxes</p>
                  </div>
                  <span className="px-3 py-1.5 bg-luxPink/10 text-luxPink text-xs font-semibold rounded-full">Enquire</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/villas"
            className="inline-flex items-center gap-2 text-sm font-medium text-luxPink hover:text-luxPinkHover"
          >
            View All Villas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';