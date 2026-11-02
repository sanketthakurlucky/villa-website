import { Metadata } from 'next';
import { SmoothScroll, HeroScrollSection, VillaShowcaseSection, DestinationParallaxSection, FeatureScrollSection } from '@/components/scroll';
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

const sampleVillas = [
  {
    id: "1",
    name: "Villa Serenity",
    location: "North Goa, India",
    price: 45000,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
  },
  {
    id: "2",
    name: "Palace by the Lake",
    location: "Udaipur, Rajasthan",
    price: 75000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
  },
  {
    id: "3",
    name: "Mountain Escape",
    location: "Manali, Himachal Pradesh",
    price: 35000,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
  },
  {
    id: "4",
    name: "Backwater Bliss",
    location: "Kerala, India",
    price: 55000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
  },
  {
    id: "5",
    name: "Royal Heritage",
    location: "Jaipur, Rajasthan",
    price: 65000,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
  },
  {
    id: "6",
    name: "Coastal Paradise",
    location: "South Goa, India",
    price: 48000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
  },
];

const sampleDestinations = [
  {
    id: "1",
    name: "North Goa",
    slug: "north-goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    villaCount: 24,
    region: "Goa, India",
  },
  {
    id: "2",
    name: "South Goa",
    slug: "south-goa",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    villaCount: 18,
    region: "Goa, India",
  },
  {
    id: "3",
    name: "Udaipur",
    slug: "udaipur",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    villaCount: 12,
    region: "Rajasthan, India",
  },
  {
    id: "4",
    name: "Jaipur",
    slug: "jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    villaCount: 15,
    region: "Rajasthan, India",
  },
  {
    id: "5",
    name: "Manali & Shimla",
    slug: "manali-shimla",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    villaCount: 22,
    region: "Himachal Pradesh, India",
  },
  {
    id: "6",
    name: "Kerala",
    slug: "kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    villaCount: 16,
    region: "Kerala, India",
  },
  {
    id: "7",
    name: "Leh-Ladakh",
    slug: "leh-ladakh",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    villaCount: 8,
    region: "Ladakh, India",
  },
  {
    id: "8",
    name: "Coorg",
    slug: "coorg",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    villaCount: 10,
    region: "Karnataka, India",
  },
];

const sampleFeatures = [
  { id: "1", name: "Private Pool", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v20M17 7H7a5 5 0 00-5 5v6a5 5 0 005 5h10a5 5 0 005-5v-6a5 5 0 00-5-5z" /></svg>, description: "Exclusive infinity pools with stunning views", category: "Outdoor" },
  { id: "2", name: "In-house Chef", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, description: "Personal chef creating customized culinary experiences", category: "Services" },
  { id: "3", name: "Butler Service", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>, description: "24/7 dedicated butler anticipating your every need", category: "Services" },
  { id: "4", name: "Spa & Wellness", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, description: "Private spa treatments and yoga sessions", category: "Wellness" },
  { id: "5", name: "Home Theater", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>, description: "State-of-the-art entertainment systems", category: "Entertainment" },
  { id: "6", name: "Smart Home", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, description: "Voice-controlled lighting, climate & entertainment", category: "Technology" },
  { id: "7", name: "Private Deck", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, description: "Expansive outdoor living spaces with views", category: "Outdoor" },
  { id: "8", name: "Gym & Fitness", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, description: "Fully equipped private gymnasiums", category: "Wellness" },
  { id: "9", name: "Wine Cellar", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, description: "Curated collection of fine wines & spirits", category: "Food & Beverage" },
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        <NavBar />
      </header>
      <SmoothScroll>
        <main className="min-h-screen bg-stone-950">
          <HeroScrollSection
            title="Curated Luxury Villas Across India"
            subtitle="Handpicked private pool villas with in-house chefs, butler service & personalized experiences. Your dream vacation starts here."
            backgroundVideo="/hero.mp4"
          />
          <VillaShowcaseSection villas={sampleVillas} />
          <DestinationParallaxSection destinations={sampleDestinations} />
          <FeatureScrollSection features={sampleFeatures} />
          <LuxuryCollections />
          <TrustSignals />
          <Testimonials />
          <Offers />
          <Blogs />
          <Instagram />
          <About />
          <Newsletter />
        </main>
      </SmoothScroll>
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