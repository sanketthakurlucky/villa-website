'use client';

import { Check, Star, Users, Shield, Award, MapPin, Heart, Clock, Waves, Utensils, Home as HomeIcon } from 'lucide-react';

const stats = [
  { value: '1200+', label: 'Handpicked Villas', icon: HomeIcon },
  { value: '94%', label: 'Repeat Bookings', icon: Heart },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '50+', label: 'Destinations', icon: MapPin },
];

const features = [
  { icon: Waves, title: 'Private Pool', desc: 'Exclusive pools in every villa' },
  { icon: Utensils, title: 'In-house Chef', desc: 'Personalized culinary experiences' },
  { icon: Users, title: 'Butler Service', desc: 'Dedicated service throughout stay' },
  { icon: Shield, title: 'Caretaker Onsite', desc: '24/7 support & security' },
  { icon: MapPin, title: 'Local Experiences', desc: 'Curated activities & tours' },
  { icon: Heart, title: 'Games & Recreation', desc: 'Indoor & outdoor entertainment' },
  { icon: Award, title: 'Green Open Spaces', desc: 'Gardens, lawns & nature' },
  { icon: Clock, title: 'Personalised Celebrations', desc: 'Birthdays, anniversaries & more' },
];

function Home({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
}

export default function TrustSignals() {
  return (
    <section className="section-py bg-luxDark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="relative container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">The SEASALT Standard</span>
          <h2 className="text-display-sm mt-2">Signature Features <span className="script-accent font-normal text-luxPink">In Every Villa</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
          {features.map((feature, i) => (
            <div key={feature.title} className="text-center p-4 group" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-luxPink/20 transition-colors">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-luxPink" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}