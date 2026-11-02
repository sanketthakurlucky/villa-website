'use client';

import { ChevronRight, ChevronDown, ChevronUp, Shield, FileText, User, Lock, Mail, Phone, Globe, CreditCard, Shield as ShieldIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const termsContent = `
  <h2>1. Acceptance of Terms</h2>
  <p>By accessing and using SEASALT Hospitality's website, services, and villa booking platform ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.</p>

  <h2>2. Definitions</h2>
  <ul>
    <li><strong>"SEASALT Hospitality"</strong> refers to SEASALT Hospitality Private Limited and its affiliates.</li>
    <li><strong>"Villa Owner/Partner"</strong> refers to the property owner or management company listing villas on our platform.</li>
    <li><strong>"Guest/You"</strong> refers to the person making a booking or using our Services.</li>
    <li><strong>"Villa"</strong> refers to the luxury property booked through our platform.</li>
    <li><strong>"Booking"</strong> refers to the confirmed reservation of a Villa for specified dates.</li>
    <li><strong>"Concierge"</strong> refers to our dedicated guest experience team.</li>
  </ul>

  <h2>3. Booking Process</h2>
  <p>3.1. Bookings can be made through our website, mobile app, or via our Concierge team.</p>
  <p>3.2. A Booking is confirmed only upon receipt of the required deposit (typically 25% of the total villa rate) and our written confirmation.</p>
  <p>3.3. The balance payment is due 30 days prior to check-in. For bookings made within 30 days of arrival, full payment is required at booking.</p>
  <p>3.4. All rates are in Indian Rupees (INR) unless otherwise specified. Taxes are included in displayed rates.</p>

  <h2>4. Villa Standards & Representations</h2>
  <p>4.1. We personally vet every Villa in our collection. Photos, descriptions, and amenities are accurate at the time of publication.</p>
  <p>4.2. Seasonal variations (foliage, water levels, weather) may affect the Villa experience. We strive to keep information current.</p>
  <p>4.3. Villa Owners are responsible for maintaining the property to our standards. We conduct regular audits but cannot guarantee real-time condition.</p>

  <h2>5. Included Services</h2>
  <p>Every confirmed Booking includes:</p>
  <ul>
    <li>Exclusive use of the Villa for the booked dates</li>
    <li>Dedicated butler and housekeeping staff</li>
    <li>Private chef (meals at actual cost + 20% service charge)</li>
    <li>Daily housekeeping, linen/towel service</li>
    <li>Pool maintenance, garden maintenance</li>
    <li>High-speed WiFi, air conditioning</li>
    <li>24/7 Concierge support</li>
    <li>Welcome amenities and local guide</li>
  </ul>

  <h2>5. Additional Services (Extra Charge)</h2>
  <ul>
    <li>Meals and beverages (at actual cost + 20% service)</li>
    <li>Airport transfers and local transportation</li>
    <li>Spa treatments, yoga sessions, personal trainers</li>
    <li>Guided tours, activity bookings, event planning</li>
    <li>Babysitting, special equipment rental</li>
  </ul>

  <h2>6. Guest Responsibilities</h2>
  <ul>
    <li>Provide accurate guest information and identification</li>
    <li>Respect the Villa, staff, neighbors, and local laws</li>
    <li>No smoking indoors; designated outdoor areas only</li>
    <li>Quiet hours: 10 PM - 8 AM</li>
    <li>Maximum occupancy must not be exceeded</li>
    <li>Pets only in designated pet-friendly villas with prior approval</li>
    <li>Report any damages or issues immediately to Concierge</li>
  </ul>

  <h2>7. Cancellation & Modification Policy</h2>
  <p>7.1. Standard Villas: Free cancellation 30+ days before check-in. 50% refund 14-30 days. No refund within 14 days.</p>
  <p>7.2. Heritage/Prime Villas: Free cancellation 45+ days. 50% refund 21-45 days. No refund within 21 days.</p>
  <p>7.3. Peak Season (Dec 20 - Jan 10): 60 days for full refund, 30 days for 50%, no refund within 30 days.</p>
  <p>7.4. Modifications: Free up to 30 days before (subject to availability). Within 30 days: treated as cancellation + new booking.</p>
  <p>7.5. Force Majeure: Full credit for future stay (valid 18 months) for government orders, natural disasters, pandemics.</p>

  <h2>8. Security Deposit</h2>
  <p>Heritage/Prime Villas: ₹25,000-50,000 refundable security deposit. Standard Villas: No deposit unless pets/events. Covers damages, excessive cleaning, lost keys. Refunded within 7 days post-checkout after inspection.</p>

  <h2>9. Payments</h2>
  <p>9.1. Accepted: Credit/Debit cards, UPI, Net Banking, Bank Transfer, EMI on select cards.</p>
  <p>9.2. 25% deposit at booking. Balance 30 days prior. Full payment if booking within 30 days.</p>
  <p>9.3. Meals and extra services charged at actuals + 20% service charge. Settled at checkout.</p>
  <p>9.3. International payments accepted in USD, GBP, EUR, AED, SGD. Exchange rate locked at booking.</p>

  <h2>10. Liability & Disclaimers</h2>
  <p>10.1. We act as a curator and concierge service. Villa Owners are responsible for property condition, safety, and service delivery.</p>
  <p>10.2. We are not liable for: Acts of God, government actions, strikes, weather, third-party service failures, guest negligence.</p>
  <p>10.3. Maximum liability limited to the total Booking value. No consequential, punitive, or indirect damages.</p>
  <p>10.4. Guests assume all risks associated with pool use, adventure activities, local travel, and wildlife encounters.</p>

  <h2>11. Privacy & Data</h2>
  <p>Your personal data is processed per our Privacy Policy. We share data with Villa Owners and service providers only as needed for your Booking.</p>

  <h2>12. Intellectual Property</h2>
  <p>All content, photos, branding, and technology on our platform are owned by SEASALT Hospitality or licensed. Unauthorized use prohibited.</p>

  <h2>13. Governing Law & Disputes</h2>
  <p>These Terms are governed by Indian law. Disputes subject to exclusive jurisdiction of courts in Panaji, Goa. We encourage mediation before litigation.</p>

  <h2>14. Changes to Terms</h2>
  <p>We may update these Terms. Material changes communicated via email and website notice. Continued use constitutes acceptance.</p>

  <h2>15. Contact</h2>
  <p>Questions about these Terms? Contact us at legal@seasalthospitality.com or +91 93993 44077.</p>

  <p><em>Last updated: January 2025</em></p>
`;

const privacyContent = `
  <h2>1. Introduction</h2>
  <p>SEASALT Hospitality ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile app, concierge services, and villa booking platform ("Services").</p>

  <h2>2. Information We Collect</h2>
  <h3>2.1 Personal Information You Provide</h3>
  <ul>
    <li>Contact details: Name, email, phone, address</li>
    <li>Booking details: Dates, destinations, guest count, preferences</li>
    <li>Payment information: Processed securely via payment partners (we don't store full card details)</li>
    <li>Identification: Government ID for security verification (where required)</li>
    <li>Preferences: Dietary, accessibility, celebration, activity preferences</li>
    <li>Communication: Chat logs, emails, call recordings (for quality)</li>
  </ul>

  <h3>2.2 Automatically Collected Information</h3>
  <ul>
    <li>Device info: IP address, browser type, OS, device IDs</li>
    <li>Usage data: Pages viewed, time spent, clicks, search queries</li>
    <li>Location: Approximate location from IP (for currency, language)</li>
    <li>Cookies & similar tech: See Cookie Policy below</li>
  </ul>

  <h3>2.3 Information from Third Parties</h3>
  <ul>
    <li>Payment processors: Transaction status, tokenized payment methods</li>
    <li>Villa Partners: Stay history, preferences, incident reports</li>
    <li>Third-party logins: Google, Apple (only with your consent)</li>
    <li>Public sources: Social media profiles (if you tag us or engage publicly)</li>
  </ul>

  <h2>3. How We Use Your Information</h2>
  <ul>
    <li><strong>Booking & Stay Management:</strong> Process bookings, communicate with Villa Partners, coordinate services, handle special requests</li>
    <li><strong>Personalization:</strong> Tailor recommendations, remember preferences, customize offers</li>
    <li><strong>Customer Support:</strong> Respond to inquiries, resolve issues, improve service</li>
    <li><strong>Payments & Security:</strong> Process payments, prevent fraud, verify identity, comply with legal obligations</li>
    <li><strong>Marketing (with consent):</strong> Newsletters, promotions, personalized offers, loyalty program updates</li>
    <li><strong>Analytics & Improvement:</strong> Understand usage, optimize platform, develop new features</li>
    <li><strong>Legal Compliance:</strong> Tax records, regulatory reporting, legal requests</li>
  </ul>

  <h2>4. Information Sharing & Disclosure</h2>
  <p>We do not sell your personal information. We share only as follows:</p>
  <ul>
    <li><strong>Villa Partners & Service Providers:</strong> Only information necessary for your stay (name, dates, preferences, special needs). Bound by confidentiality agreements.</li>
    <li><strong>Payment Processors:</strong> Razorpay, Stripe, banks—only for payment processing. We never store full card details.</li>
    <li><strong>Legal & Regulatory:</strong> When required by law, court order, or to protect rights/safety.</li>
    <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (with notice).</li>
    <li><strong>Emergency/Safety:</strong> To protect life, health, or property in emergencies.</li>
  </ul>

  <h2>5. Data Retention</h2>
  <ul>
    <li>Booking records: 7 years (tax/legal compliance)</li>
    <li>Account data: While account is active + 2 years after closure</li>
    <li>Communication logs: 3 years</li>
    <li>Payment tokens: Until you remove or card expires</li>
    <li>Analytics data: Aggregated/anonymized after 26 months</li>
  </ul>

  <h2>6. Your Rights (Under Indian Law & GDPR Principles)</h2>
  <ul>
    <li><strong>Access:</strong> Request a copy of your data</li>
    <li><strong>Rectification:</strong> Correct inaccurate data</li>
    <li><strong>Erasure:</strong> Request deletion (subject to legal retention)</li>
    <li><strong>Restriction:</strong> Limit processing in certain cases</li>
    <li><strong>Portability:</strong> Receive data in portable format</li>
    <li><strong>Objection:</strong> Opt out of marketing, profiling</li>
    <li><strong>Withdraw Consent:</strong> For marketing, non-essential processing</li>
  </ul>
  <p>Exercise rights: Email privacy@seasalthospitality.com. Response within 30 days.</p>

  <h2>7. Cookies & Tracking Technologies</h2>
  <h3>7.1 Types of Cookies</h3>
  <ul>
    <li><strong>Essential:</strong> Session, authentication, security, cart (cannot be disabled)</li>
    <li><strong>Analytics:</strong> Google Analytics, Mixpanel (usage patterns, performance)</li>
    <li><strong>Preference:</strong> Language, currency, region, login state</li>
    <li><strong>Marketing:</strong> Meta Pixel, Google Ads (only with consent)</li>
  </ul>
  <h3>7.2 Cookie Management</h3>
  <p>Manage via browser settings or our Cookie Banner (first visit). Disabling essential cookies breaks core functionality.</p>

  <h2>8. Data Security</h2>
  <ul>
    <li>Encryption: TLS 1.3 in transit, AES-256 at rest</li>
    <li>Access Control: Role-based, principle of least privilege, MFA</li>
    <li>Monitoring: 24/7 security monitoring, intrusion detection</li>
    <li>Audits: Annual third-party penetration testing, SOC 2 compliance</li>
    <li>Incident Response: 72-hour breach notification per regulations</li>
  </ul>

  <h2>9. International Transfers</h2>
  <p>Data may be processed in India, Singapore, USA (cloud providers). Transfers protected by Standard Contractual Clauses, adequacy decisions, or your consent.</p>

  <h2>10. Children's Privacy</h2>
  <p>Our Services are not directed to children under 13. We don't knowingly collect children's data. Parents: contact us if you believe we have child's data.</p>

  <h2>11. California Residents (CCPA)</h2>
  <p>If you're a California resident, you have additional rights: Right to Know, Delete, Opt-Out of Sale, Non-Discrimination. We don't sell data. Exercise rights via privacy@seasalthospitality.com.</p>

  <h2>11. International Users (GDPR)</h2>
  <p>If you're in the EEA/UK, GDPR applies. Legal bases: Contract performance, legitimate interest, consent, legal obligation. DPO: privacy@seasalthospitality.com.</p>

  <h2>12. Changes to This Policy</h2>
  <p>We may update this Policy. Material changes: email notice + website banner 30 days prior. Continued use = acceptance.</p>

  <h2>13. Contact Us</h2>
  <p>Data Protection Officer: privacy@seasalthospitality.com | +91 93993 44077<br>
  SEASALT Hospitality Private Limited, Panaji, Goa, India</p>

  <p><em>Last updated: January 2025</em></p>
`;

export default function LegalPageClient({ type }: { type: 'terms' | 'privacy' }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const content = type === 'terms' ? termsContent : privacyContent;
  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy';
  const icon = type === 'terms' ? FileText : ShieldIcon;

  // Parse content into sections
  const sections = content.split('<h2>').slice(1).map((section, i) => {
    const [heading, ...rest] = section.split('</h2>');
    return {
      id: `section-${i}`,
      heading: heading.trim(),
      content: rest.join('</h2>').trim(),
    };
  });

  const filteredSections = sections.filter(s =>
    s.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main py-20 text-center">
          <span className="inline-block bg-goldAccent/20 text-goldAccent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Legal
          </span>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            {title}
          </h1>
          <p className="text-body-lg text-white/90 max-w-3xl mx-auto">
            {type === 'terms'
              ? 'Our terms and conditions for booking and using SEASALT Hospitality services.'
              : 'How we collect, use, and protect your personal information.'}
          </p>

          <div className="relative max-w-xl mx-auto mt-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within document..."
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
          {/* Sidebar TOC */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="font-semibold text-white mb-4 px-2">Table of Contents</h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                {filteredSections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      setOpenSections(prev => ({ ...prev, [section.id]: !prev[section.id] }));
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 rounded-xl text-sm transition-all',
                      openSections[section.id]
                        ? 'bg-goldAccent/20 text-goldAccent border border-goldAccent/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <span className="text-xs text-white/50 mr-2">{i + 1}.</span>
                    {section.heading}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="/contact"
                  className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-white font-semibold text-sm hover:opacity-90 transition-all text-center block shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
                >
                  Have Questions? Contact Us
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert prose-lg max-w-none prose-h2:text-white prose-h3:text-white prose-strong:text-white prose-a:text-goldAccent prose-a:no-underline hover:prose-a:underline">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Booking Policy', href: '/help?category=booking' },
                  { label: 'Cancellation Policy', href: '/help?category=cancellation' },
                  { label: 'Payment Methods', href: '/help?category=payment' },
                  { label: 'During Your Stay', href: '/help?category=stay' },
                  { label: 'Contact Concierge', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-goldAccent/30 transition-all text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}