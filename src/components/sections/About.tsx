'use client';

import { ChevronRight, Compass, MapPin, Phone, Mail, Users, Award, Star, Waves, Utensils, Shield, Heart, MessageCircle } from 'lucide-react';

export default function About() {
  return (
    <section className="section-py bg-white">
      <div className="container-main">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Our Story</span>
            <h2 className="text-display-sm mt-2">Welcome To <span className="script-accent font-normal text-luxPink">SEASALT Hospitality</span></h2>
            <p className="text-body-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              At SEASALT Hospitality, led by Director <strong>Sanket Thakur</strong>, we understand the importance of finding the perfect accommodation for your dream vacation. With a passion for hospitality and a commitment to excellence, we curate a collection of the finest hand-picked luxury villas across Goa and India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
                alt="SEASALT Hospitality Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-luxPink/10 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-luxPink" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">1,200+ Villas Curated</p>
                    <p className="text-sm text-gray-500">Across 50+ Destinations</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-display-md font-bold mb-4">Our Vision & Mission</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  At SEASALT Hospitality, our vision is to redefine luxury villa stays in India. Under the leadership of Director Sanket Thakur, we believe every traveler deserves exquisite private accommodations and seamless concierge service that create unforgettable memories.
                </p>
                <p>
                  Our mission is to provide exceptional service, personalized attention, and a direct WhatsApp concierge booking experience. We carefully inspect and curate each villa in our portfolio to ensure the highest standards of quality, comfort, and privacy.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 p-4 bg-luxPink/5 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-luxPink flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Founder & Director</p>
                  <p className="text-sm text-luxPink font-medium">Sanket Thakur</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-display-md font-bold mb-4">The SEASALT Standard</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Every villa in our portfolio meets our signature standards — a promise of quality, comfort, and unforgettable experiences. From private pools and in-house chefs to dedicated butlers and curated local experiences, we ensure every detail is perfected.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Waves, title: 'Private Pool', desc: 'In every villa' },
                  { icon: Utensils, title: 'In-house Chef', desc: 'Customized menus' },
                  { icon: Users, title: 'Butler Service', desc: '24/7 assistance' },
                  { icon: Shield, title: 'Caretaker Onsite', desc: 'Round-the-clock' },
                  { icon: MapPin, title: 'Local Experiences', desc: 'Curated tours' },
                  { icon: Heart, title: 'Games & Recreation', desc: 'Indoor & outdoor' },
                  { icon: Award, title: 'Green Open Spaces', desc: 'Gardens & lawns' },
                  { icon: Star, title: 'Celebrations', desc: 'Personalized events' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-luxPink/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-luxPink" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Villa Interior"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center">
            <h3 className="text-display-sm font-bold mb-4">Ready to Experience Luxury?</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">Let our concierge team help you find the perfect villa for your next getaway.</p>
            <a
              href="https://wa.me/919399344077"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-luxPink hover:bg-luxPinkHover text-white font-semibold rounded-full text-lg transition-all shadow-lux"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}