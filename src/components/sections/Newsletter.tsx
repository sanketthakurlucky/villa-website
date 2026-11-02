'use client';

import { useState } from 'react';
import { Mail, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setMessage('Thanks for subscribing! You\'ll receive our best deals soon.');
    setEmail('');
  };

  return (
    <section className="section-py bg-luxDark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="relative container-main">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-display-sm font-semibold mb-4">Better Together.</h2>
              <p className="text-white/80 text-body-md max-w-md mx-auto lg:mx-0">
                Join our community of luxury travelers. Get exclusive access to new villas, special offers, and travel inspiration.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex gap-3">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status !== 'idle'}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-luxPink/50 focus:border-luxPink transition-all"
                />
                <Button type="submit" className="bg-luxPink hover:bg-luxPinkHover text-white font-semibold px-6 py-3.5 rounded-full transition-all shrink-0" disabled={status !== 'idle'}>
                  {status === 'submitting' ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  ) : status === 'success' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <>
                      Subscribe
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
              {message && (
                <p className={status === 'success' ? 'text-green-400' : 'text-red-400'} text-sm mt-3 text-center>{message}</p>
              )}
              <p className="text-xs text-white/40 text-center mt-3">No spam, unsubscribe anytime. <a href="/privacy" className="underline hover:text-white">Privacy Policy</a></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}