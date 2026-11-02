import Link from 'next/link';
import { Compass, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'All Villas', href: '/villas' },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Collections', href: '/collections' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    popular: [
      { label: 'Villas in North Goa', href: '/villas?location=North Goa' },
      { label: 'Villas in South Goa', href: '/villas?location=South Goa' },
      { label: 'Villas in Udaipur', href: '/villas?location=Udaipur' },
      { label: 'Villas in Jaipur', href: '/villas?location=Jaipur' },
      { label: 'Villas in Manali', href: '/villas?location=Manali' },
      { label: 'Villas in Kerala', href: '/villas?location=Kerala' },
    ],
    company: [
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'List Your Villa', href: '/list-your-villa' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/seasalthospitality', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/seasalthospitality', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/seasalthospitality', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/seasalthospitality', label: 'YouTube' },
  ];

  return (
    <footer className="bg-luxDark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5" />
      <div className="relative container-main py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3" aria-label="SEASALT Hospitality Home">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
                  <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold tracking-[0.26em] leading-none">SEASALT</span>
                <span className="block text-[10px] font-medium tracking-[0.35em] text-luxPink mt-0.5">HOSPITALITY</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              SEASALT Hospitality offers exclusive deals on curated vacation rental properties, luxury private pool villas, and bespoke concierge stays across India.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-luxPink hover:text-white transition-all" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-luxPink transition-colors text-sm flex items-center gap-2">
                    {link.label}
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Popular Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.popular.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-luxPink transition-colors text-sm flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 opacity-50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-luxPink transition-colors text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <address className="not-italic space-y-3 text-white/70 text-sm">
              <p className="font-semibold text-white leading-relaxed">
                SEASALT HOSPITALITY<br />
                <span className="text-luxPink">Director: SANKET THAKUR</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-luxPink" />
                <span>Goa, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-luxPink" />
                <a href="https://wa.me/919399344077" target="_blank" rel="noopener noreferrer" className="hover:text-luxPink transition-colors">+91 93993 44077</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-luxPink" />
                <a href="mailto:info@seasalthospitality.com" className="hover:text-luxPink transition-colors">info@seasalthospitality.com</a>
              </p>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-sm text-white/40">
            &copy; {currentYear} SEASALT Hospitality | Directed by Sanket Thakur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}