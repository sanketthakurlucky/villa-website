'use client';

import { Copy, Check, Gift } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const offers = [
  {
    id: 'hsbc',
    name: 'HSBC TravelOne',
    tag: 'Bank Offer',
    color: 'bg-red-600',
    discount: '11% off up to ₹5,000',
    description: 'Get 11% off on your SEASALT booking when you pay with HSBC TravelOne Credit Card.',
    code: 'HSBCTRAVEL',
    terms: 'Valid on minimum booking of ₹20,000. Max discount ₹5,000. T&C apply.',
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    tag: 'Bank Offer',
    color: 'bg-blue-800',
    discount: '5% off up to ₹2,500',
    description: 'Get 5% off on select HDFC Credit Cards for EMI transactions.',
    code: 'HDFCEMICC',
    terms: 'Valid on EMI transactions only. Max discount ₹2,500. T&C apply.',
  },
  {
    id: 'seasalt50',
    name: 'SEASALT50',
    tag: 'Direct Offer',
    color: 'bg-luxPink',
    discount: 'FLAT 50% OFF 2nd Night',
    description: 'Enjoy FLAT 50% OFF on 2nd night when you book newly launched villas.',
    code: 'SEASALT50',
    terms: 'Valid on select new villas. Minimum 2 nights stay. T&C apply.',
  },
  {
    id: 'earlybird',
    name: 'Early Bird',
    tag: 'Seasonal',
    color: 'bg-emerald-600',
    discount: '15% off + Free Upgrade',
    description: 'Book 60 days in advance and get 15% off plus complimentary room upgrade.',
    code: 'EARLYBIRD15',
    terms: 'Booking must be 60+ days prior to check-in. Subject to availability.',
  },
  {
    id: 'longstay',
    name: 'Long Stay',
    tag: 'Seasonal',
    color: 'bg-purple-600',
    discount: 'Pay for 5, Stay for 7',
    description: 'Book 7 nights and pay only for 5. Perfect for workations and extended stays.',
    code: 'LONGSTAY7',
    terms: 'Minimum 7 nights. Valid on select villas. Blackout dates apply.',
  },
  {
    id: 'group',
    name: 'Group Booking',
    tag: 'Special',
    color: 'bg-orange-600',
    discount: '10% off for 3+ Villas',
    description: 'Booking multiple villas for a large group? Get 10% off on 3 or more villas.',
    code: 'GROUP10',
    terms: 'Minimum 3 villas, same dates. Applicable on base rate only.',
  },
];

export default function Offers() {
  const [activeTab, setActiveTab] = useState<'all' | 'bank' | 'direct' | 'seasonal'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'all', label: 'All Offers' },
    { id: 'bank', label: 'Bank Offers' },
    { id: 'direct', label: 'Direct Offers' },
    { id: 'seasonal', label: 'Seasonal' },
  ];

  const filteredOffers = activeTab === 'all'
    ? offers
    : offers.filter(o => o.id.includes(activeTab) || (activeTab === 'bank' && o.tag === 'Bank Offer') || (activeTab === 'direct' && o.tag === 'Direct Offer') || (activeTab === 'seasonal' && o.tag === 'Seasonal'));

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="section-py bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Offers</span>
          <h2 className="text-display-sm mt-2">Exclusive Villa <span className="script-accent font-normal text-luxPink">Offers</span></h2>
          <p className="text-body-md text-gray-600 mt-4">
            Save more on your luxury stay with our curated offers and partner discounts.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-luxPink text-white shadow-lux'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer, i) => (
            <div key={offer.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${offer.color} flex items-center justify-center`}>
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{offer.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${offer.tag === 'Bank Offer' ? 'bg-blue-50 text-blue-700' : offer.tag === 'Direct Offer' ? 'bg-luxPink/10 text-luxPink' : 'bg-green-50 text-green-700'}`}>
                      {offer.tag}
                    </span>
                  </div>
                </div>
                <span className="text-lg font-bold text-luxPink">{offer.discount}</span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
              <p className="text-xs text-gray-400 mb-4">{offer.terms}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono text-gray-700 tracking-wider">{offer.code}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCode(offer.code)}
                  className={cn(copiedCode === offer.code && 'bg-green-50 text-green-700')}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}