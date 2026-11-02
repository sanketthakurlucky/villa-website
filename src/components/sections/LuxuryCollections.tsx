'use client';

import Link from 'next/link';
import { Waves, Flame, Utensils, Heart, Users, Dog, Sunrise, Mountain, TreePine, Baby, Car, Music, Zap } from 'lucide-react';

const collections = [
  {
    name: 'Private Pool Villas',
    description: 'Exclusive villas with private swimming pools for uninterrupted relaxation',
    icon: Waves,
    count: 156,
    href: '/collections/private-pool',
    gradient: 'from-luxPink/20 to-luxTeal/20',
    color: 'text-luxPink',
    bgColor: 'bg-luxPink/10',
  },
  {
    name: 'Pet-Friendly Villas',
    description: 'Bring your furry friends along to our top pet-friendly villas',
    icon: Dog,
    count: 89,
    href: '/collections/pet-friendly',
    gradient: 'from-amber-200 to-orange-200',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    name: 'Wedding & Celebration Villas',
    description: 'Grand villas for your birthdays, anniversaries & intimate gatherings',
    icon: Heart,
    count: 67,
    href: '/collections/weddings',
    gradient: 'from-rose-200 to-pink-200',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
  },
  {
    name: 'Workation & Long Stays',
    description: 'For those working remotely - best balance of work, relaxation & views',
    icon: Zap,
    count: 45,
    href: '/collections/workation',
    gradient: 'from-blue-200 to-indigo-200',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Family & Kid-Friendly',
    description: 'Spacious villas suited for comfortable stays with family and children',
    icon: Baby,
    count: 78,
    href: '/collections/family',
    gradient: 'from-green-200 to-teal-200',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Romantic Getaway Villas',
    description: 'Handpicked villas for couples seeking intimate moments & sunset views',
    icon: Heart,
    count: 54,
    href: '/collections/romantic',
    gradient: 'from-purple-200 to-pink-200',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Beachfront Villas',
    description: 'Direct access to the shoreline with stunning ocean views',
    icon: Waves,
    count: 34,
    href: '/collections/beachfront',
    gradient: 'from-sky-200 to-blue-200',
    color: 'text-sky-600',
    bgColor: 'bg-sky-100',
  },
  {
    name: 'Mountain & Hill Station Villas',
    description: 'Wake up to breathtaking views of mountains, hills & valleys',
    icon: Mountain,
    count: 42,
    href: '/collections/mountain',
    gradient: 'from-emerald-200 to-green-200',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
];

export default function LuxuryCollections() {
  return (
    <section className="section-py bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Collections</span>
          <h2 className="text-display-sm mt-2">Curated <span className="script-accent font-normal text-luxPink">Collections</span></h2>
          <p className="text-body-md text-gray-600 mt-4">
            Discover handpicked villa collections tailored to your travel style and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, i) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 h-full flex flex-col">
                <div className={`${collection.bgColor} ${collection.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <collection.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-luxPink transition-colors">{collection.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{collection.count} villas</span>
                  <span className="text-sm font-semibold text-luxPink group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 px-6 py-3 bg-luxPink hover:bg-luxPinkHover text-white font-semibold rounded-full transition-all"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}