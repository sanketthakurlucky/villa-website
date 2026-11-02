'use client';

import Image from 'next/image';
import { ChevronRight, Users, Star, Heart, Award, Globe, Shield, Sparkles, Leaf, Wave, Mountain, Home } from 'lucide-react';
import Link from 'next/link';

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
            alt="SEASALT Hospitality Team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main py-20 text-center">
          <span className="inline-block bg-goldAccent/20 text-goldAccent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Story
          </span>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Crafting Unforgettable <span className="gold-accent">Villa Experiences</span>
          </h1>
          <p className="text-body-lg text-white/90 max-w-3xl mx-auto mb-10">
            We don't just book villas. We curate moments that become lifelong memories.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
          >
            Start Your Journey <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="container-main py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
            Our <span className="gold-accent">Mission</span>
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
            To redefine luxury travel in India by offering access to the country's most exceptional private villas, paired with service that anticipates every need and creates moments of genuine connection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Heart, title: 'Authentic Hospitality', desc: 'We believe true luxury is personal. Every guest is welcomed like family, with service that comes from the heart, not a manual.' },
            { icon: Sparkles, title: 'Curated Excellence', desc: 'Every villa in our collection is personally vetted—architecture, amenities, location, and staff. We accept only the top 1%.' },
            { icon: Shield, title: 'Trusted Partnership', desc: 'From first inquiry to farewell, our concierge team is your single point of contact. Transparent pricing, no hidden surprises.' },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-goldAccent/30 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-goldAccent/20 flex items-center justify-center mx-auto mb-6">
                <item.icon className="w-8 h-8 text-goldAccent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-stone-900/50">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
              Our <span className="gold-accent">Journey</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {[
              { year: '2019', title: 'The Beginning', desc: 'Founded by travelers who believed India\'s luxury villa scene deserved a curator—not a marketplace. Started with 12 handpicked villas in Goa.' },
              { year: '2020', title: 'Expansion', desc: 'Expanded to Rajasthan and Kerala. Launched 24/7 concierge service. Introduced personalized itinerary planning.' },
              { year: '2021', title: 'Heritage Collection', desc: 'Added restored palaces in Udaipur and Jaipur. Partnered with royal families for exclusive guest experiences.' },
              { year: '2022', title: 'National Footprint', desc: 'Expanded to Himachal, Kerala backwaters, Coorg, and Ladakh. 200+ villas across 8 destinations.' },
              { year: '2023', title: 'Tech & Service', desc: 'Launched seamless booking platform. 24/7 concierge app. Real-time availability. AI-powered villa matching.' },
              { year: '2024', title: 'Today', desc: '300+ villas across 12+ destinations. 10,000+ happy guests. 98% repeat booking rate. India\'s most trusted villa curator.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-24 text-right pr-6">
                  <span className="text-2xl font-bold text-goldAccent">{item.year}</span>
                  <div className="absolute left-full top-4 w-3 h-3 rounded-full bg-goldAccent -ml-1.5" />
                  {i < 5 && <div className="absolute left-full top-11 w-0.5 h-20 bg-white/10 ml-1" />}
                </div>
                <div className="flex-1 pt-2 pb-8 border-l border-white/10 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '300+', label: 'Curated Villas', icon: Home },
              { value: '12+', label: 'Destinations', icon: Globe },
              { value: '10K+', label: 'Happy Guests', icon: Users },
              { value: '98%', label: 'Repeat Rate', icon: Star },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-goldAccent/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-goldAccent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-goldAccent" />
                </div>
                <div className="text-3xl font-bold text-goldAccent mb-2">{item.value}</div>
                <div className="text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-stone-900/50">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
              Meet Our <span className="gold-accent">Leadership</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Passionate travelers, hospitality veterans, and local experts dedicated to crafting your perfect escape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Priya Sharma', role: 'Founder & CEO', bio: 'Former luxury hotel executive with 15+ years at Oberoi & Taj. Passionate about showcasing India\'s hidden luxury gems.', avatar: 'PS' },
              { name: 'Vikram Singh', role: 'Head of Operations', bio: 'Heritage hotel specialist. Managed palace restorations in Rajasthan. Ensures every villa meets our exacting standards.', avatar: 'VS' },
              { name: 'Anjali Nair', role: 'Head of Guest Experience', bio: 'Former concierge at The Leela. Designed our 24/7 concierge service. Knows every villa, every staff member, every secret spot.', avatar: 'AN' },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-40 h-40 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6 text-white font-bold text-3xl group-hover:scale-105 transition-transform">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-goldAccent text-sm font-medium mb-4">{member.role}</p>
                <p className="text-white/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
              Our <span className="gold-accent">Commitment</span>
            </h2>
            <div className="space-y-6 text-left max-w-xl mx-auto text-white/80">
              {[
                'Every villa is personally visited and vetted by our team before joining our collection.',
                'Transparent pricing—no hidden fees, no surprise charges at checkout.',
                '24/7 support from real humans who know your villa, your dates, and your preferences.',
                'Sustainable tourism practices—we partner with villas that employ locally and protect heritage.',
                'If something isn\'t right, we make it right. Your satisfaction is our only metric.',
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="w-8 h-8 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-goldAccent" />
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-stone-900/50 to-stone-950">
        <div className="container-main text-center">
          <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
            Ready to Experience the <span className="gold-accent">Difference</span>?
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-10">
            Let our concierge team match you with the perfect villa for your next escape.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/villas"
              className="px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              Browse Villas
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}