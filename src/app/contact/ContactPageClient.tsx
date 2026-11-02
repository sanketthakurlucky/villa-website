'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight, MessageSquare, User, Calendar, Users, Star, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPageClient() {
  const [activeTab, setActiveTab] = useState<'enquiry' | 'info'>('enquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    destination: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (formData.checkIn && formData.checkOut && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    if (!formData.guests || formData.guests < 1) newErrors.guests = 'At least 1 guest required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate submission
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: 2,
          destination: '',
          message: '',
        });
      }, 2000);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
            alt="Contact SEASALT Hospitality"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main py-20 text-center">
          <span className="inline-block bg-goldAccent/20 text-goldAccent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Get in Touch
          </span>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Let\'s Plan Your <span className="gold-accent">Perfect Escape</span>
          </h1>
          <p className="text-body-lg text-white/90 max-w-3xl mx-auto">
            Our concierge team is available 24/7 to answer questions, provide recommendations, and help you book the villa of your dreams.
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container-main py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-goldAccent/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-goldAccent" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Send an Enquiry</h2>
                  <p className="text-white/70 text-sm">Fill out the form and our team will respond within 2 hours</p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Enquiry Sent!</h3>
                  <p className="text-white/70 mb-6">Our concierge team will contact you within 2 hours to discuss your requirements.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.name ? 'border-red-500' : 'border-white/10'
                        )}
                        placeholder="Your full name"
                        required
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.email ? 'border-red-500' : 'border-white/10'
                        )}
                        placeholder="you@example.com"
                        required
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        )}
                        placeholder="+91 98765 43210"
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-white/70 mb-2">Number of Guests *</label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.guests ? 'border-red-500' : 'border-white/10'
                        )}
                        required
                      >
                        {[...Array(16)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1} Guest{i + 1 !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-white/70 mb-2">Check-in Date *</label>
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        min={today}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.checkIn ? 'border-red-500' : 'border-white/10'
                        )}
                        required
                      />
                      {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-white/70 mb-2">Check-out Date *</label>
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn || tomorrow}
                        className={cn(
                          'w-full px-4 py-3 rounded-xl bg-white/5 border text-white focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all',
                          errors.checkOut ? 'border-red-500' : 'border-white/10'
                        )}
                        required
                      />
                      {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-white/70 mb-2">Preferred Destination</label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all"
                    >
                      <option value="">Anywhere / Surprise Me</option>
                      <option value="North Goa">North Goa</option>
                      <option value="South Goa">South Goa</option>
                      <option value="Udaipur">Udaipur, Rajasthan</option>
                      <option value="Jaipur">Jaipur, Rajasthan</option>
                      <option value="Manali & Shimla">Manali & Shimla, Himachal Pradesh</option>
                      <option value="Kerala">Kerala (Backwaters/Munnar)</option>
                      <option value="Leh-Ladakh">Leh-Ladakh</option>
                      <option value="Coorg">Coorg, Karnataka</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Special Requests / Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 transition-all resize-none"
                      placeholder="Tell us about your ideal villa, special occasions, dietary needs, or any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                  >
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & Other Ways */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Phone, title: 'Call Our Concierge', value: '+91 93993 44077', desc: 'Available 24/7 for urgent bookings', color: 'bg-green-500/20' },
                { icon: Mail, title: 'Email Us', value: 'info@seasalthospitality.com', desc: 'Response within 2 hours during business hours', color: 'bg-blue-500/20' },
                { icon: MapPin, title: 'Visit Our Office', value: 'SEASALT Hospitality, Panaji, Goa', desc: 'Mon-Sat 10 AM - 7 PM (by appointment)', color: 'bg-purple-500/20' },
                { icon: Clock, title: 'WhatsApp Concierge', value: '+91 93993 44077', desc: 'Instant chat for quick queries & updates', color: 'bg-green-500/20' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-goldAccent/30 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-goldAccent font-semibold mb-1">{item.value}</p>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Why Contact Us */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Why Contact Our Concierge?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Sparkles, title: 'Personalized Matching', desc: 'We don\'t just show listings. We learn your preferences and match you with villas that exceed expectations.' },
                  { icon: Shield, title: 'End-to-End Support', desc: 'From initial inquiry to post-stay follow-up, one dedicated concierge handles everything.' },
                  { icon: Users, title: 'Group & Event Expertise', desc: 'Weddings, family reunions, corporate retreats—we handle logistics for groups of any size.' },
                  { icon: Star, title: 'Exclusive Access', desc: 'Villas not listed publicly, early-bird rates, complimentary upgrades, and VIP experiences.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-goldAccent/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-goldAccent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Quick Answers</h3>
              <div className="space-y-4">
                {[
                  { q: 'What\'s included in the villa price?', a: 'Accommodation, butler, chef service (meals at cost), housekeeping, WiFi, AC, pool maintenance, and concierge support. Meals, transfers, and activities are extra.' },
                  { q: 'How far in advance should I book?', a: 'Peak season (Dec-Feb): 6-12 months. Shoulder season: 2-3 months. Last-minute deals sometimes available—ask our concierge!' },
                  { q: 'Can I book for a wedding or event?', a: 'Absolutely. We specialize in weddings, anniversaries, family reunions, and corporate retreats. Dedicated event planning included.' },
                  { q: 'What\'s your cancellation policy?', a: 'Standard: Free cancellation 30+ days out, 50% refund 14-30 days, no refund within 14 days. Heritage properties: 45/21 days. Travel insurance recommended.' },
                  { q: 'Are pets allowed?', a: 'Many villas are pet-friendly! Filter for "Pet-Friendly" collection or ask our concierge. Additional pet deposit may apply.' },
                  { q: 'Do you offer airport transfers?', a: 'Yes, we arrange private transfers from all major airports. Luxury sedans, SUVs, and vintage cars available. Charges apply.' },
                ].map((item, i) => (
                  <details key={i} className="bg-white/5 rounded-xl p-5 group">
                    <summary className="flex items-center justify-between cursor-pointer font-medium text-white list-none">
                      {item.q}
                      <ChevronRight className="w-5 h-5 text-white/50 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-4 text-white/70 text-sm leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-stone-900/50 to-stone-950">
        <div className="container-main text-center">
          <h2 className="hero-title text-3xl sm:text-4xl leading-tight mb-6">
            Prefer to <span className="gold-accent">Chat on WhatsApp</span>?
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-10">
            Our concierge team is just a message away. Share your dates, preferences, and dreams—we\'ll send you curated options within hours.
          </p>
          <a
            href="https://wa.me/919399344077?text=Hi%20SEASALT%20team%2C%20I%27d%20like%20to%20inquire%20about%20a%20villa%20stay."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}