'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, Share2, MapPin, Star, Building2, Waves, Dog, Heart as HeartIcon, Zap, Baby, Mountain, Waves as WavesIcon, Mountain as MountainIcon } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

const collectionIcons: Record<string, any> = {
  'private-pool': Waves,
  'pet-friendly': Dog,
  'weddings': HeartIcon,
  'workation': Zap,
  'family': Baby,
  'romantic': HeartIcon,
  'beachfront': WavesIcon,
  'mountain': MountainIcon,
};

interface CollectionDetailClientProps {
  collection: any;
}

export default function CollectionDetailClient({ collection }: CollectionDetailClientProps) {
  const IconComponent = collectionIcons[collection.tag] || Heart;

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.villas[0]?.image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80'}
            alt={collection.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main pb-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-goldAccent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/collections" className="hover:text-goldAccent transition-colors">Collections</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/80">{collection.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-goldAccent/20 text-goldAccent text-sm font-medium rounded-full flex items-center gap-2">
                <IconComponent className="w-4 h-4" />
                Collection
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full">
                {collection.count} Villas
              </span>
            </div>
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              {collection.name}
            </h1>
            <p className="text-body-lg text-white/90 max-w-2xl">
              {collection.description}
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
            <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-main py-16">
        {/* Highlights */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-2xl font-semibold mb-6">Why Choose This Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {collection.highlights.map((highlight: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-goldAccent/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-goldAccent" />
                </div>
                <span className="font-medium text-white">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Villas in Collection */}
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">{collection.count} Villas in This Collection</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.villas.map((villa: any) => (
              <Link
                key={villa.id}
                href={`/villas/${villa.id}`}
                className="group relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 transition-all hover:border-goldAccent/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-medium">
                      {villa.bedrooms}BHK
                    </span>
                    <span className="bg-gradient-gold px-4 py-1.5 rounded-full text-sm font-semibold">
                      ₹{villa.price.toLocaleString('en-IN')}/night
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-goldAccent transition-colors">
                    {villa.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {villa.location}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {villa.bedrooms} Bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-goldAccent text-goldAccent" />
                      4.9
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/villas?collection=${collection.tag}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              View All {collection.count} Villas <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Destinations in Collection */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Available In</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collection.destinations.map((dest: string, i: number) => (
              <Link
                key={i}
                href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                className="group p-5 bg-white/5 border border-white/10 rounded-xl hover:border-goldAccent/30 hover:bg-white/10 transition-all text-center"
              >
                <span className="block font-medium text-white group-hover:text-goldAccent transition-colors">{dest}</span>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-goldAccent transition-colors mt-2 inline-block" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}