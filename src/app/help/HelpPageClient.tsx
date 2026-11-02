'use client';

import { ChevronRight, Search, ChevronDown, ChevronUp, Check, Star, Shield, Sparkles, Users, Calendar, Mail, Phone, MapPin, Clock, CreditCard, Key, Wifi, Utensils, Car, Baby, Dog, Heart, Award, Leaf } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const faqCategories = [
  { id: 'booking', name: 'Booking & Reservations', icon: Calendar, count: 8 },
  { id: 'payment', name: 'Payments & Pricing', icon: CreditCard, count: 6 },
  { id: 'stay', name: 'During Your Stay', icon: Key, count: 10 },
  { id: 'cancellation', name: 'Cancellations & Changes', icon: Calendar, count: 5 },
  { id: 'services', name: 'Services & Amenities', icon: Sparkles, count: 8 },
  { id: 'policies', name: 'Policies & Guidelines', icon: Shield, count: 6 },
];

const faqs: Record<string, Array<{q: string, a: string}>> = {
  booking: [
    { q: 'How do I book a villa?', a: 'You can book directly through our website by selecting your dates, destination, and guest count. For personalized recommendations, contact our concierge team via WhatsApp, email, or phone. We\'ll send curated options within hours.' },
    { q: 'How far in advance should I book?', a: 'Peak season (Dec-Feb, Oct-Nov): 6-12 months ahead. Shoulder season (Mar-May, Sep): 2-3 months. Monsoon (Jun-Aug): 1-2 months. Last-minute deals occasionally available—ask our concierge.' },
    { q: 'Can I book for someone else as a gift?', a: 'Absolutely! We offer gift vouchers and can arrange surprise stays. The recipient receives a beautiful digital invitation with all details. Contact our concierge to arrange.' },
    { q: 'What\'s the minimum stay requirement?', a: 'Standard: 2 nights. Peak season (Dec 20-Jan 10): 5-7 nights minimum. Long weekends: 3 nights. Some heritage properties: 3 nights year-round.' },
    { q: 'Can I book multiple villas for a large group?', a: 'Yes! We specialize in group bookings. We\'ll find adjacent or nearby villas and coordinate shared staff, dining, and activities. Perfect for weddings, reunions, and corporate retreats.' },
    { q: 'Do you offer corporate/long-term rates?', a: 'Yes! Monthly rates (28+ nights) offer 20-30% discount. Includes dedicated workspace, high-speed WiFi, meeting room access, and housekeeping 3x/week. Popular for workations and relocations.' },
    { q: 'Can I modify my booking after confirmation?', a: 'Yes, subject to availability. Date changes: free up to 30 days before. Guest count changes: free up to 14 days before. Destination changes: treated as new booking. Contact concierge for any changes.' },
    { q: 'Is there a loyalty program?', a: 'Yes! SEASALT Gold: 5+ stays = 10% off, priority waitlist, complimentary upgrades, welcome amenities. SEASALT Platinum: 15+ stays = 15% off, private chef dinner, private transfer, dedicated relationship manager.' },
  ],
  payment: [
    { q: 'What payment methods do you accept?', a: 'Credit/Debit cards (Visa, Mastercard, Amex), UPI, Net Banking, Bank Transfer, and EMI options on select cards. International cards accepted. No surcharge on any payment method.' },
    { q: 'Is a deposit required?', a: 'Yes, 25% deposit at booking to secure the villa. Balance due 30 days before check-in. For bookings within 30 days: full payment at booking. Deposits are refundable per cancellation policy.' },
    { q: 'Are meals included in the price?', a: 'Villa stay includes butler, chef service, housekeeping, WiFi, AC, pool maintenance. Meals are at actual cost (ingredients + 20% service). You set the budget; chef shops daily for fresh ingredients. Average: ₹2,500-4,000/person/day for all meals.' },
    { q: 'Can I pay in installments?', a: 'Yes! 3-month no-cost EMI on select credit cards (min ₹50,000). 6-12 month EMI with interest on all cards. Bank transfer in 2-3 installments also available. Contact concierge to set up.' },
    { q: 'Are there any hidden fees?', a: 'No hidden fees. Transparent pricing: Villa rate + meals at cost + optional services (transfers, activities, spa). Taxes included. Security deposit (refundable) for some heritage properties. All charges disclosed before booking.' },
    { q: 'Do you accept international currencies?', a: 'Yes, we accept USD, GBP, EUR, AED, SGD via wire transfer or international cards. Exchange rate locked at booking. No foreign transaction fees on our end.' },
  ],
  stay: [
    { q: 'What time is check-in/check-out?', a: 'Check-in: 2:00 PM. Check-out: 11:00 AM. Early check-in (10 AM) / Late check-out (2 PM): free if available, otherwise 50% day rate. 24-hour stay guaranteed if booked previous/next night.' },
    { q: 'What\'s included in the villa?', a: 'Private pool, full kitchen, AC in all rooms, WiFi, TV/streaming, luxury linens, toiletries, welcome drinks, pool towels, beach towels (beachfront villas), basic spices/condiments, first-aid kit.' },
    { q: 'How does the chef service work?', a: 'Your private chef creates daily menus based on your preferences, dietary needs, and budget. You approve the menu each morning. Chef shops fresh daily. Meals served at your preferred times and locations (poolside, dining room, beach, terrace).' },
    { q: 'Is the pool private and heated?', a: 'All pools are exclusively yours. Most are heated (28-30°C) at no extra cost. Infinity pools, plunge pools, and lap pools vary by villa. Pool maintenance daily. Pool cleaning chemicals included.' },
    { q: 'Is WiFi reliable for work/video calls?', a: 'Yes! All villas have 50-100 Mbps fiber backup. Dedicated workspaces in workation villas. Mesh networks for large properties. 4G backup dongles available on request.' },
    { q: 'Are children welcome?', a: 'Absolutely! Most villas are family-friendly. We provide: child-safe pool fences, high chairs, cribs, baby monitors, kids\' menus, board games, and babysitting referrals (advance notice required). Child-safe pool fences available on request.' },
    { q: 'Are pets allowed?', a: 'Many villas are pet-friendly (filter "Pet-Friendly" collection). Requirements: updated vaccinations, house-trained, no aggressive breeds. Pet deposit: ₹5,000-10,000 (refundable). Pet beds, bowls, treats provided. Nearby vet contacts shared.' },
    { q: 'Is daily housekeeping included?', a: 'Yes! Daily cleaning, linen change every 3 days, towel change daily, pool cleaning, garden maintenance. Additional deep cleaning on request. Turndown service with local treats each evening.' },
    { q: 'What if something breaks or isn\'t working?', a: '24/7 on-call maintenance. Butlers handle minor issues immediately. Major issues: technician dispatched within 2 hours. If unresolved within 4 hours: alternative villa or prorated refund.' },
    { q: 'Can I host a small event/party?', a: 'Intimate gatherings (up to 20 guests): free with advance notice. Larger events: event fee applies. No loud music after 10 PM (local laws). External caterers/DJs need approval. Event planning services available.' },
  ],
  cancellation: [
    { q: 'What\'s the standard cancellation policy?', a: 'Free cancellation 30+ days before check-in. 50% refund 14-30 days before. No refund within 14 days. Deposit refunded per above. Travel insurance strongly recommended.' },
    { q: 'Are heritage properties different?', a: 'Yes. Heritage palaces/havelis: Free cancellation 45+ days, 50% refund 21-45 days, no refund within 21 days. Stricter due to limited inventory and staffing commitments.' },
    { q: 'Can I reschedule instead of cancel?', a: 'Yes! Reschedule free up to 30 days before (subject to availability). Within 30 days: treated as cancellation + new booking. Credit valid for 12 months if no dates available.' },
    { q: 'What if I need to leave early?', a: 'No refund for early departure. If villa rebooks those nights, prorated credit issued. Force majeure (natural disaster, government order): full credit for future stay valid 18 months.' },
    { q: 'What if the villa has issues on arrival?', a: 'If critical issues (no AC, pool not working, safety concerns): immediate alternative villa or full refund. Minor issues: fixed within 2 hours or pro-rata discount. Document with photos, contact concierge immediately.' },
  ],
  services: [
    { q: 'Can I request a specific chef cuisine?', a: 'Yes! Our chefs specialize in: Local regional, North Indian, South Indian, Continental, Italian, Asian, BBQ/Grill, Vegan/Vegetarian, Jain, Gluten-free, Keto. Mention preferences at booking or 2 weeks before arrival.' },
    { q: 'Do you arrange airport transfers?', a: 'Yes! Luxury sedans (Mercedes/BMW), SUVs (Fortuner/Innova Crysta), Tempo Travellers (groups), vintage cars (heritage destinations). Helicopter transfers available in select destinations. Pre-booked, driver tracks flight.' },
    { q: 'What activities can you arrange?', a: 'Private boat rides, guided heritage walks, cooking classes, spa/ayurveda, yoga/meditation, water sports, trekking, cycling, wildlife safaris, temple visits, market tours, photography sessions, sunset cruises, fishing trips.' },
    { q: 'Is babysitting available?', a: 'Yes, through vetted local agencies. 4-hour minimum. CPR-certified, background-checked. Activities: arts/crafts, storytelling, games, pool supervision. Rates: ₹800-1,500/hour. Book 48 hours in advance.' },
    { q: 'Can you arrange special celebrations?', a: 'Yes! Birthdays, anniversaries, proposals, honeymoons, birthdays. Includes: decorations, custom cakes, private dining setups, fireworks (where permitted), live music, photographers, custom menus. 2 weeks notice preferred.' },
    { q: 'Is laundry service available?', a: 'Yes! Daily laundry service included (wash, dry, fold, press). Express (4 hours): ₹200/item. Dry cleaning: external partners, 24-hour turnaround. Delicates handled separately. Laundry bags in each bathroom.' },
    { q: 'Do you provide baby equipment?', a: 'Yes, free on request: cribs, high chairs, baby monitors, bottle warmers, sterilizers, bathtubs, strollers, car seats. Organic cotton bedding, hypoallergenic toiletries. Request at booking or 1 week before arrival.' },
    { q: 'Can I rent bikes/cars/scooters?', a: 'Yes! Bicycles (free at most villas), electric scooters (₹500/day), motorbikes (₹800/day), self-drive cars (₹3,000-5,000/day), chauffeur-driven cars (₹4,000-8,000/day). Helmet, insurance, fuel included.' },
  ],
  policies: [
    { q: 'What\'s the smoking policy?', a: 'Strictly no smoking indoors. Designated outdoor smoking areas at each villa. ₹10,000 fine for indoor smoking (covers deep cleaning, linen replacement). Vaping treated same as smoking.' },
    { q: 'Are there noise restrictions?', a: 'Quiet hours: 10 PM - 8 AM. No loud music/parties after 10 PM. Intimate gatherings (under 10) permitted until midnight with advance notice. Local laws strictly enforced in residential areas.' },
    { q: 'Can I bring external guests?', a: 'Day visitors: free up to 4 guests with advance notice. Overnight guests: count toward occupancy limit, additional charges apply if exceeding max occupancy. All visitors must register with butler for security.' },
    { q: 'What\'s the security deposit?', a: 'Heritage properties: ₹25,000-50,000 (refundable within 7 days post-checkout). Standard villas: no deposit unless pets/events. Covers damages, excessive cleaning, lost keys/access cards. Inspected at checkout.' },
    { q: 'Are drones allowed?', a: 'Generally no (privacy, wildlife disturbance, heritage site restrictions). Special permission from local authorities required. Concierge can assist with applications for professional photography.' },
    { q: 'What happens if I damage something?', a: 'Accidents happen! Minor damages (broken glass, minor stains): covered by us. Significant damages: assessed at checkout, deducted from security deposit or charged to card. Honest reporting appreciated—we value transparency.' },
  ],
};

export default function HelpPageClient() {
  const [activeCategory, setActiveCategory] = useState('booking');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = faqs[activeCategory]?.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
            alt="SEASALT Hospitality Help Center"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main py-20 text-center">
          <span className="inline-block bg-goldAccent/20 text-goldAccent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Help Center
          </span>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            How Can We <span className="gold-accent">Help</span>?
          </h1>
          <p className="text-body-lg text-white/90 max-w-3xl mx-auto mb-10">
            Search our knowledge base or browse categories below. Can't find what you need? Our concierge team is available 24/7.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full px-12 py-4 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20 focus:border-goldAccent/50 transition-all"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Content */}
      <section className="container-main py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Categories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3',
                    activeCategory === cat.id
                      ? 'bg-goldAccent/20 text-goldAccent border border-goldAccent/30'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <cat.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{cat.name}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    activeCategory === cat.id ? 'bg-goldAccent text-white' : 'bg-white/10 text-white/60'
                  )}>
                    {cat.count}
                  </span>
                </button>
              ))}

              {/* Contact CTA */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">Can't find what you need?</p>
                <a
                  href="/contact"
                  className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-white font-semibold text-sm hover:opacity-90 transition-all text-center block shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                >
                  Contact Concierge
                </a>
                <p className="text-white/50 text-xs text-center mt-3">Available 24/7 • Response within 2 hours</p>
              </div>
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold capitalize">{faqCategories.find(c => c.id === activeCategory)?.name}</h2>
                <p className="text-white/60 text-sm mt-1">{filteredFaqs.length} articles</p>
              </div>
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-goldAccent/20"
              >
                <option value="">All articles</option>
                <option value="book">Booking</option>
                <option value="cancel">Cancellation</option>
                <option value="pool">Pool</option>
                <option value="chef">Chef</option>
                <option value="pet">Pet</option>
                <option value="child">Children</option>
              </select>
            </div>

            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-white/60 mb-6">Try different keywords or browse categories</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}

            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <details
                  key={`${activeCategory}-${i}`}
                  className={cn(
                    'bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all',
                    openFaq === `${activeCategory}-${i}` && 'border-goldAccent/30 bg-white/10'
                  )}
                >
                  <summary className={cn(
                    'flex items-center justify-between p-5 cursor-pointer list-none font-medium text-white',
                    openFaq === `${activeCategory}-${i}` && 'text-goldAccent'
                  )}>
                    <span>{faq.q}</span>
                    <ChevronRight className={cn(
                      'w-5 h-5 text-white/50 transition-transform flex-shrink-0 ml-4',
                      openFaq === `${activeCategory}-${i}` && 'rotate-90'
                    )} />
                  </summary>
                  <div className="px-5 pb-5 text-white/70 leading-relaxed animate-slide-down">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {filteredFaqs.length === 0 && !searchQuery && (
              <div className="text-center py-16">
                <p className="text-white/60">No articles in this category yet.</p>
              </div>
            )}

            {/* Related Categories */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-6">Related Topics</h3>
              <div className="flex flex-wrap gap-3">
                {faqCategories
                  .filter(c => c.id !== activeCategory)
                  .map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-goldAccent/30 transition-all text-sm font-medium"
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}