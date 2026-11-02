import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Destinations from '@/components/sections/Destinations';
import FeaturedVillas from '@/components/sections/FeaturedVillas';
import LuxuryCollections from '@/components/sections/LuxuryCollections';
import TrustSignals from '@/components/sections/TrustSignals';
import Testimonials from '@/components/sections/Testimonials';
import Offers from '@/components/sections/Offers';
import Blogs from '@/components/sections/Blogs';
import Instagram from '@/components/sections/Instagram';
import About from '@/components/sections/About';
import Newsletter from '@/components/sections/Newsletter';
import Footer from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Curated Luxury Villas & Private Stays',
  description: 'Discover handpicked luxury villas across India with private pools, in-house chefs, and personalized concierge service. Book your dream vacation with SEASALT Hospitality.',
};

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        <NavBar />
      </header>
      <main className="min-h-screen">
        <Hero />
        <Destinations />
        <FeaturedVillas />
        <LuxuryCollections />
        <TrustSignals />
        <Testimonials />
        <Offers />
        <Blogs />
        <Instagram />
        <About />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function NavBar() {
  return (
    <nav className="site-header px-4 sm:px-6 lg:px-8">
      <div className="container-main h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="SEASALT Hospitality Home">
          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9zM12 12c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" />
              <path d="M3 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0zM12 12c3-2.5 6-2.5 9 0-3 2.5-6 2.5-9 0z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="block text-lg font-bold tracking-[0.26em] text-white leading-none">SEASALT</span>
            <span className="block text-[10px] font-medium tracking-[0.35em] gold-accent mt-0.5">HOSPITALITY</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            <a href="/villas" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Explore Villas</a>
            <a href="/destinations" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Destinations</a>
            <a href="/collections" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Collections</a>
            <a href="/blogs" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">Blogs</a>
            <a href="/about" className="text-sm font-medium text-white/80 hover:gold-accent transition-colors">About Us</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:block text-sm font-medium text-white/80 hover:gold-accent transition-colors">Login</a>
            <a href="/register" className="hidden sm:block bg-gradient-gold hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
              Get in touch
              <svg className="w-4 h-4 ml-1.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12H5" />
              </svg>
            </a>
          </div>
        </div>

        <button className="md:hidden text-white p-2" aria-label="Open menu">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}