'use client';

import { useState } from 'react';
import { ChevronRight, Calendar, MapPin, Users, Star, Heart, Award, Settings, LogOut, Bell, MessageSquare, CreditCard, Ticket, Plus, Check, X, MoreVertical, Edit, Trash2, Download, Share2, Clock, Car, Utensils, Wifi, Waves, Sparkles, Shield } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import Link from 'next/link';

const mockBookings = [
  {
    id: 'BK-2024-001',
    villa: { name: 'Villa Serenity', location: 'North Goa, India', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', bedrooms: 4 },
    checkIn: '2024-12-20',
    checkOut: '2024-12-27',
    guests: 6,
    status: 'confirmed',
    total: 315000,
    paid: 78750,
    balanceDue: '2024-11-20',
    services: ['Airport Transfer', 'Private Chef', 'Sunset Cruise'],
  },
  {
    id: 'BK-2024-002',
    villa: { name: 'Palace by the Lake', location: 'Udaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', bedrooms: 5 },
    checkIn: '2025-01-15',
    checkOut: '2025-01-22',
    guests: 8,
    status: 'pending_balance',
    total: 525000,
    paid: 131250,
    balanceDue: '2024-12-16',
    services: ['Heritage Tour', 'Private Boat', 'Candlelit Dinner'],
  },
  {
    id: 'BK-2024-003',
    villa: { name: 'Backwater Bliss', location: 'Kerala, India', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', bedrooms: 4 },
    checkIn: '2024-11-10',
    checkOut: '2024-11-17',
    guests: 4,
    status: 'completed',
    total: 385000,
    paid: 385000,
    balanceDue: '2024-10-11',
    services: ['Houseboat Day', 'Ayurvedic Spa', 'Cooking Class'],
    review: { rating: 5, text: 'Absolutely magical experience! The backwaters, the service, the food—everything was perfect.' },
  },
];

const mockRewards = {
  tier: 'Gold',
  stays: 7,
  nextTier: 'Platinum',
  staysToNext: 8,
  benefits: [
    '10% off all bookings',
    'Priority waitlist access',
    'Complimentary room upgrade (subject to availability)',
    'Welcome amenities on arrival',
    'Priority concierge response',
  ],
  nextTierBenefits: [
    '15% off all bookings',
    'Private chef dinner experience',
    'Private airport transfer',
    'Dedicated relationship manager',
    'Early check-in / late check-out guaranteed',
  ],
};

export default function DashboardPageClient() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'rewards' | 'profile' | 'settings'>('bookings');
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending_balance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending_balance': return 'Balance Due';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="site-header px-4 sm:px-6 lg:px-8">
        <div className="container-main h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
                <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
              </svg>
            </div>
            <span className="block text-lg font-bold tracking-[0.26em] text-white leading-none">SEASALT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/villas" className="text-sm font-medium text-white/80 hover:text-goldAccent transition-colors">Browse Villas</Link>
            <Link href="/destinations" className="text-sm font-medium text-white/80 hover:text-goldAccent transition-colors">Destinations</Link>
            <Link href="/collections" className="text-sm font-medium text-white/80 hover:text-goldAccent transition-colors">Collections</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-white/80" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" aria-label="Messages">
              <MessageSquare className="w-5 h-5 text-white/80" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-goldAccent" />
            </button>
            <Link
              href="/villas"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              <Plus className="w-4 h-4" />
              New Booking
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container-main py-12">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold text-2xl">
              PJ
            </div>
            <div>
              <h1 className="text-2xl font-bold">Priya Joshi</h1>
              <p className="text-white/70">SEASALT Gold Member • 7 stays</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 px-3 py-1 bg-goldAccent/20 text-goldAccent text-sm font-medium rounded-full">
                  <Award className="w-3 h-3" /> Gold Member
                </span>
                <span className="text-white/50 text-sm">8 stays to Platinum</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/villas" className="px-5 py-2.5 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/5 border border-white/10 rounded-xl p-1">
          {[
            { id: 'bookings', label: 'My Bookings', icon: Calendar },
            { id: 'rewards', label: 'Rewards', icon: Award },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-goldAccent/20 text-goldAccent border border-goldAccent/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Bookings</h2>
                <Link
                  href="/villas"
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Booking
                </Link>
              </h2>

              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-goldAccent/30 transition-all"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={booking.villa.image}
                              alt={booking.villa.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{booking.villa.name}</h3>
                            <p className="text-white/60 text-sm flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {booking.villa.location}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(booking.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(booking.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {booking.guests} Guests</span>
                              <span className="flex items-center gap-1"><Waves className="w-3.5 h-3.5" /> {booking.villa.bedrooms}BHK</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:flex-col md:items-end">
                          <span className={cn('px-3 py-1.5 rounded-full text-sm font-semibold', getStatusColor(booking.status))}>
                            {getStatusLabel(booking.status)}
                          </span>
                          <p className="text-right">
                            <span className="text-2xl font-bold text-goldAccent">₹{booking.total.toLocaleString('en-IN')}</span>
                            <p className="text-white/50 text-sm">Total</p>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-6 text-sm text-white/70">
                          {booking.services.slice(0, 2).map((s, i) => (
                            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                              <Sparkles className="w-3.5 h-3.5 text-goldAccent" />
                              {s}
                            </span>
                          ))}
                          {booking.services.length > 2 && (
                            <span className="text-white/50">+{booking.services.length - 2} more</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {booking.status === 'pending_balance' && (
                            <button className="px-4 py-2 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all text-sm flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Pay Balance
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Settings className="w-4 h-4" />
                            Manage
                          </button>
                          {booking.status === 'completed' && !booking.review && (
                            <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="space-y-8">
              {/* Current Tier */}
              <div className="bg-gradient-to-br from-goldAccent/20 via-stone-900 to-stone-950 border border-goldAccent/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-goldAccent" />
                      <div>
                        <h3 className="text-3xl font-bold text-goldAccent">{mockRewards.tier} Member</h3>
                        <p className="text-white/70">{mockRewards.stays} lifetime stays</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 rounded-xl bg-goldAccent/20 text-goldAccent font-semibold">
                        {mockRewards.staysToNext} stays to {mockRewards.nextTier}
                      </div>
                      <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-gold rounded-full transition-all" style={{ width: `${(mockRewards.stays / (mockRewards.stays + mockRewards.staysToNext)) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="w-32 h-32 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold text-4xl mx-auto md:mx-0">
                    {mockRewards.tier.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Current Benefits */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  Your Gold Benefits
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockRewards.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Tier Preview */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-goldAccent" />
                  Platinum Tier (Coming Soon)
                </h3>
                <p className="text-white/70 mb-6">Just {mockRewards.staysToNext} more stays to unlock exclusive Platinum benefits:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockRewards.nextTierBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-8 h-8 rounded-xl bg-goldAccent/20 flex items-center justify-center">
                        <Award className="w-4 h-4 text-goldAccent" />
                      </div>
                      <span className="text-white">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stay History */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Stay History</h3>
                <div className="space-y-4">
                  {mockBookings.filter(b => b.status === 'completed').map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={booking.villa.image} alt={booking.villa.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{booking.villa.name}</h4>
                        <p className="text-white/60 text-sm">{booking.villa.location} • {new Date(booking.checkIn).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-goldAccent">₹{booking.total.toLocaleString('en-IN')}</p>
                        <p className="text-white/50 text-sm">{booking.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                      <input type="text" defaultValue="Priya" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                      <input type="text" defaultValue="Joshi" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                    <input type="email" defaultValue="priya.joshi@email.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Address</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" defaultValue="123 Marine Drive, Mumbai, Maharashtra 400020" />
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all">Save Changes</button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Travel Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Preferred Destinations</label>
                    <div className="flex flex-wrap gap-2">
                      {['Goa', 'Rajasthan', 'Kerala', 'Himachal', 'Ladakh', 'Coorg'].map((dest) => (
                        <label key={dest} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 cursor-pointer hover:border-goldAccent/30 hover:bg-white/10 transition-all text-sm">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          {dest}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Travel Style</label>
                    <div className="flex flex-wrap gap-2">
                      {['Luxury', 'Adventure', 'Wellness', 'Cultural', 'Romantic', 'Family'].map((style) => (
                        <label key={style} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 cursor-pointer hover:border-goldAccent/30 hover:bg-white/10 transition-all text-sm">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          {style}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Budget Range (per night)</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-goldAccent/20">
                        <option>₹25,000 - ₹50,000</option>
                        <option selected>₹50,000 - ₹75,000</option>
                        <option>₹75,000 - ₹1,00,000</option>
                        <option>₹1,00,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Special Requirements</label>
                      <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20" placeholder="Dietary restrictions, accessibility needs, celebration occasions, etc." />
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all">Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Booking confirmations & updates', enabled: true },
                    { label: 'Payment reminders', enabled: true },
                    { label: 'Promotional offers & deals', enabled: true },
                    { label: 'Newsletter & travel inspiration', enabled: true },
                    { label: 'Post-stay review requests', enabled: true },
                    { label: 'Loyalty program updates', enabled: true },
                  ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between cursor-pointer">
                      <span className="text-white">{item.label}</span>
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 text-goldAccent focus:ring-goldAccent"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Privacy & Security</h3>
                <div className="space-y-4">
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <Shield className="w-5 h-5 text-green-400" />
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                    <span>Manage Connected Devices</span>
                    <ChevronRight className="w-5 h-5 text-white/50" />
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                    <span>Download My Data</span>
                    <Download className="w-5 h-5 text-white/50" />
                  </button>
                  <button className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                    <span>Delete Account</span>
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Communication Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email', enabled: true, desc: 'Booking updates, offers, newsletter' },
                    { label: 'WhatsApp', enabled: true, desc: 'Instant booking support, reminders' },
                    { label: 'SMS', enabled: false, desc: 'Urgent alerts, payment reminders' },
                    { label: 'Push Notifications', enabled: true, desc: 'App notifications for bookings' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="w-5 h-5 rounded border-white/30 bg-white/10 text-goldAccent focus:ring-goldAccent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}