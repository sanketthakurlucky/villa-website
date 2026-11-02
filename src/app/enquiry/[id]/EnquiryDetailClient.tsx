'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Calendar, MapPin, Users, Star, MessageSquare, Send, Check, X, MoreVertical, Edit, Trash2, Download, Share2, Clock, CreditCard, Shield, Sparkles, AlertCircle, CheckCircle, Clock as ClockIcon } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface EnquiryDetailClientProps {
  enquiry: any;
}

export default function EnquiryDetailClient({ enquiry }: EnquiryDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'messages'>('overview');
  const [newMessage, setNewMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'quoted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'booked': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'quoted': return 'Quoted';
      case 'booked': return 'Booked';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In real app, this would send to API
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Header */}
      <header className="site-header px-4 sm:px-6 lg:px-8">
        <div className="container-main h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <ChevronLeft className="w-5 h-5 text-white/80 mr-2" />
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
                <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
              </svg>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-white/70">Enquiry Details</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container-main py-12">
        {/* Enquiry Header */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold">{enquiry.id}</h1>
                <span className={cn('px-3 py-1.5 rounded-full text-sm font-semibold', 
                  enquiry.status === 'new' && 'bg-blue-500/20 text-blue-400 border-blue-500/30 border',
                  enquiry.status === 'quoted' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border',
                  enquiry.status === 'booked' && 'bg-green-500/20 text-green-400 border-green-500/30 border',
                  enquiry.status === 'archived' && 'bg-gray-500/20 text-gray-400 border-gray-500/30 border',
                  'border border-white/20'
                )}>
                  {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Created: {new Date(enquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Updated: {new Date(enquiry.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Guest Info */}
          <div className="grid md:grid-cols-3 gap-6 p-4 bg-white/5 rounded-xl">
            <div>
              <p className="text-white/50 text-sm mb-1">Guest</p>
              <p className="font-semibold">{enquiry.guest.name}</p>
              <p className="text-white/60 text-sm">{enquiry.guest.email}</p>
              <p className="text-white/60 text-sm">{enquiry.guest.phone}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Travel Dates</p>
              <p className="font-semibold">{new Date(enquiry.requirements.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(enquiry.requirements.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              <p className="text-white/60 text-sm">{new Date(enquiry.requirements.checkIn).toLocaleDateString('en-IN', { weekday: 'long' })} - {new Date(enquiry.requirements.checkOut).toLocaleDateString('en-IN', { weekday: 'long' })}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Guests & Rooms</p>
              <p className="font-semibold">{enquiry.requirements.guests} Guests • {enquiry.requirements.bedrooms} Bedrooms</p>
              <p className="text-white/60 text-sm">Budget: ₹{enquiry.requirements.budget}/night</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/5 border border-white/10 rounded-xl p-1">
          {[
            { id: 'overview', label: 'Requirements', icon: Sparkles },
            { id: 'quotes', label: 'Quotes', icon: CreditCard },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Requirements */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-goldAccent" />
                  Travel Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Destination</p>
                    <p className="font-semibold">{enquiry.requirements.destination}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Check-in / Check-out</p>
                    <p className="font-semibold">{new Date(enquiry.requirements.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(enquiry.requirements.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Guests</p>
                    <p className="font-semibold">{enquiry.requirements.guests} Guests</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Bedrooms</p>
                    <p className="font-semibold">{enquiry.requirements.bedrooms} Bedrooms</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Budget (per night)</p>
                    <p className="font-semibold text-goldAccent">₹{enquiry.requirements.budget}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-white/50 text-sm mb-1">Special Requests</p>
                    <p className="text-white/80 whitespace-pre-wrap">{enquiry.requirements.specialRequests}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Create Quote
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Message Guest
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors font-medium flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Villa Quotes</h2>
                <button className="px-4 py-2 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  Add Quote
                </button>
              </div>

              {enquiry.quotes.length === 0 ? (
                <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
                  <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Quotes Yet</h3>
                  <p className="text-white/60 mb-6">Create your first quote for this enquiry</p>
                  <button className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all">
                    Create First Quote
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiry.quotes.map((quote: any, i: number) => (
                    <div
                      key={quote.villaId}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-goldAccent/30 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <div className="w-full h-full bg-gradient-gold/20 flex items-center justify-center">
                              <Sparkles className="w-8 h-8 text-goldAccent" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{quote.villaName}</h3>
                            <p className="text-white/60 text-sm flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {quote.location}
                            </p>
                            <p className="text-goldAccent font-semibold mt-1">₹{quote.price.toLocaleString('en-IN')}/night</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 md:flex-col md:items-end">
                          <span className={cn(
                            'px-3 py-1.5 rounded-full text-sm font-semibold',
                            quote.status === 'sent' && 'bg-blue-500/20 text-blue-400 border-blue-500/30 border',
                            quote.status === 'viewed' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border',
                            quote.status === 'accepted' && 'bg-green-500/20 text-green-400 border-green-500/30 border',
                            quote.status === 'declined' && 'bg-red-500/20 text-red-400 border-red-500/30 border',
                            'border border-white/20'
                          )}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm flex items-center gap-1">
                              <ChevronRight className="w-3.5 h-3.5" />
                              View
                            </button>
                            <button className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors text-sm flex items-center gap-1">
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Conversation</h2>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>End-to-end encrypted</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {enquiry.messages.map((msg: any, i: number) => (
                    <div
                      key={i}
                      className={cn(
                        'flex gap-4 max-w-[80%]',
                        msg.from === 'guest' ? 'ml-auto flex-row-reverse' : ''
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                        msg.from === 'guest' ? 'bg-gradient-gold' : 'bg-blue-500/20'
                      )}>
                        {msg.from === 'guest' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <MessageSquare className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div className={cn(
                        'px-4 py-3 rounded-2xl max-w-[70%]',
                        msg.from === 'guest' ? 'bg-gradient-gold text-white' : 'bg-white/10 text-white'
                      )}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={cn('text-xs mt-1', msg.from === 'guest' ? 'text-white/70' : 'text-white/50')}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-goldAccent/20"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-6 py-3 rounded-xl bg-gradient-gold text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}