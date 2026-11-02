'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, MapPin, Calendar, Users, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface EnquiryData {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  villa: string;
  message: string;
}

const initialEnquiry: EnquiryData = {
  name: '',
  phone: '',
  email: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  villa: '',
  message: '',
};

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [enquiry, setEnquiry] = useState(initialEnquiry);

  useEffect(() => {
    // Pre-fill from URL params if coming from villa page
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const villa = params.get('villa');
      if (villa) setEnquiry(prev => ({ ...prev, villa }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi SEASALT Hospitality! I want to enquire about *${enquiry.villa || 'a villa'}*.

📅 Check-in: ${enquiry.checkIn || 'Flexible'}
📅 Check-out: ${enquiry.checkOut || 'Flexible'}
👥 Guests: ${enquiry.guests}
👤 Name: ${enquiry.name}
📱 Phone: ${enquiry.phone}
📧 Email: ${enquiry.email || 'Not provided'}

${enquiry.message ? `💬 Message: ${enquiry.message}` : ''}

Please share live availability and final price.`;

    window.open(`https://wa.me/919399344077?text=${encodeURIComponent(msg)}`, '_blank');
    setIsOpen(false);
    setStep(1);
    setEnquiry(initialEnquiry);
  };

  const nextStep = () => {
    if (step === 1 && (!enquiry.checkIn || !enquiry.checkOut)) return;
    if (step === 2 && (!enquiry.name || !enquiry.phone)) return;
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-luxPink text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300',
          isOpen && 'hidden'
        )}
        aria-label="Open WhatsApp enquiry"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">1</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setIsOpen(false); setStep(1); setEnquiry(initialEnquiry); }} />
          <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="bg-luxPink text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Enquire on WhatsApp</h3>
                <p className="text-xs text-white/80 mt-1">We'll respond within minutes</p>
              </div>
              <button onClick={() => { setIsOpen(false); setStep(1); setEnquiry(initialEnquiry); }} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                      s === step ? 'bg-luxPink text-white' : s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    )}>
                      {s < step ? <Check className="w-4 h-4" /> : s}
                    </div>
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Check-in</label>
                  <input
                    type="date"
                    value={enquiry.checkIn}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, checkIn: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                    required
                  />
                  <label className="block text-sm font-medium text-gray-700">Check-out</label>
                  <input
                    type="date"
                    value={enquiry.checkOut}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, checkOut: e.target.value }))}
                    min={enquiry.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                    required
                  />
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <select
                    value={enquiry.guests}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                  >
                    {[2, 4, 6, 8, 10, 12, 14, 16].map(g => <option key={g} value={g}>{g} Guests</option>)}
                  </select>
                  <Button type="button" className="w-full" onClick={nextStep}>Continue</Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={enquiry.name}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                    required
                  />
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex">
                    <span className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-l-xl text-gray-600">+91</span>
                    <input
                      type="tel"
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="93993 44077"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                      required
                    />
                  </div>
                  <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                  <input
                    type="email"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" type="button" className="flex-1" onClick={prevStep}>Back</Button>
                    <Button type="button" className="flex-1" onClick={nextStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Villa (Optional)</label>
                  <input
                    type="text"
                    value={enquiry.villa}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, villa: e.target.value }))}
                    placeholder="e.g., SS031 4BHK Assagao"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink"
                  />
                  <label className="block text-sm font-medium text-gray-700">Special Requests (Optional)</label>
                  <textarea
                    value={enquiry.message}
                    onChange={(e) => setEnquiry(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    placeholder="Any special requirements, occasions, dietary needs..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-luxPink/20 focus:border-luxPink resize-y"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" type="button" className="flex-1" onClick={prevStep}>Back</Button>
                    <Button type="submit" className="flex-1">Send on WhatsApp</Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}