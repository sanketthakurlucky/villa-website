'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Users, Star, ChevronRight, ChevronLeft, Heart, Share2, Check, X, AlertCircle, Info, MapPin as MapPinIcon, Plane, Clock, Sun, Snowflake, TreePine, Waves, Mountain, Building2 } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

interface DestinationDetailClientProps {
  destination: any;
}

export default function DestinationDetailClient({ destination }: DestinationDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showAllVillas, setShowAllVillas] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'villas' | 'activities' | 'plan'>('overview');

  const formatNumber = (num: number) => num.toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main pb-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-goldAccent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/destinations" className="hover:text-goldAccent transition-colors">Destinations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/80">{destination.name}</span>
          </nav>

          {/* Title & Meta */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-goldAccent/20 text-goldAccent text-sm font-medium rounded-full">
                {destination.region}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full">
                {destination.villaCount} Villas
              </span>
            </div>
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-goldAccent" />
                <span>{destination.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-goldAccent text-goldAccent" />
                <span>4.9 (1,200+ reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>{destination.nearestAirport}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Content Tabs */}
      <div className="container-main py-16">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'villas', label: `${destination.villaCount} Villas`, icon: Building2 },
            { id: 'activities', label: 'Experiences', icon: Heart },
            { id: 'plan', label: 'Plan Your Trip', icon: MapPinIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-goldAccent/20 text-goldAccent border border-goldAccent/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12 max-w-4xl">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-white/80 text-body-lg leading-relaxed">{destination.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.highlights.map((highlight: string, i: number) => (
                    <Link
                      key={i}
                      href={`/villas?location=${encodeURIComponent(highlight)}`}
                      className="group p-5 bg-white/5 border border-white/10 rounded-xl hover:border-goldAccent/30 hover:bg-white/10 transition-all"
                    >
                      <h3 className="font-medium text-white group-hover:text-goldAccent transition-colors">{highlight}</h3>
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-goldAccent transition-colors mt-2 inline-block" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Best Time & Practical Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
                    <Sun className="w-6 h-6 text-goldAccent" />
                    Best Time to Visit
                  </h3>
                  <p className="text-white/80 text-body-lg">{destination.bestTime}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-semibold mb-4">
                    <Plane className="w-6 h-6 text-goldAccent" />
                    Nearest Airport
                  </h3>
                  <p className="text-white/80 text-body-lg">{destination.nearestAirport}</p>
                </div>
              </div>
            </div>
          )}

          {/* Villas Tab */}
          {activeTab === 'villas' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">{destination.villaCount} Luxury Villas in {destination.name}</h2>
                <button
                  onClick={() => setShowAllVillas(!showAllVillas)}
                  className="text-goldAccent hover:underline text-sm font-medium flex items-center gap-1"
                >
                  {showAllVillas ? 'Show Less' : 'Show All'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.villas.slice(0, showAllVillas ? destination.villas.length : 6).map((villa: any) => (
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
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {villa.bedrooms} Bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Sleeps {villa.bedrooms * 2}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {!showAllVillas && destination.villas.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllVillas(true)}
                    className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all font-medium"
                  >
                    View All {destination.villaCount} Villas
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div>
              <h2 className="text-2xl font-semibold mb-8">Experiences in {destination.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.activities.map((activity: string, i: number) => (
                  <div
                    key={i}
                    className="group p-6 bg-white/5 border border-white/10 rounded-2xl transition-all hover:border-goldAccent/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-gold/20 flex items-center justify-center mb-4 group-hover:bg-gradient-gold transition-all">
                      <Heart className="w-7 h-7 text-goldAccent group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-goldAccent transition-colors">
                      {activity}
                    </h3>
                    <p className="text-white/60 text-sm">Curated experiences with local experts</p>
                    <button className="mt-4 text-sm font-medium text-goldAccent hover:underline flex items-center gap-1">
                      Book Experience <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Plan Your Trip Tab */}
          {activeTab === 'plan' && (
            <div className="max-w-3xl space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-6">Essential Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Best Time to Visit</h4>
                      <p className="text-white/70">{destination.bestTime}</p>
                      <p className="text-white/50 text-sm mt-1">Peak season offers ideal weather but higher rates. Shoulder seasons offer better value.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                      <Plane className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Getting There</h4>
                      <p className="text-white/70">Nearest Airport: {destination.nearestAirport}</p>
                      <p className="text-white/50 text-sm mt-1">Private transfers available from airport to villa (arrange at booking).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Check-in / Check-out</h4>
                      <p className="text-white/70">Check-in: 2:00 PM | Check-out: 11:00 AM</p>
                      <p className="text-white/50 text-sm mt-1">Early check-in/late check-out subject to availability (additional charges may apply).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-goldAccent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Cancellation Policy</h4>
                      <p className="text-white/70">Standard: Free cancellation up to 30 days before. 50% refund up to 14 days. No refund within 14 days.</p>
                      <p className="text-white/50 text-sm mt-1">Heritage properties may have stricter policies (45/21 days). Check individual villa details.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Booking CTA */}
              <div className="bg-gradient-gold/10 border border-goldAccent/30 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-semibold mb-3">Ready to Book?</h3>
                <p className="text-white/80 mb-6 max-w-md mx-auto">
                  Browse available villas, check real-time availability, and secure your dream stay with our concierge team.
                </p>
                <Link
                  href={`/villas?location=${encodeURIComponent(destination.name)}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                >
                  View All Villas <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}