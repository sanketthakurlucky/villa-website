import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | SEASALT Hospitality Blog`,
    description: `Read our latest article on ${slug.replace(/-/g, ' ')} - Luxury travel tips, villa guides, and destination inspiration from SEASALT Hospitality.`,
  };
}

const blogData: Record<string, any> = {
  'ultimate-guide-luxury-villa-vacation-india': {
    id: '1',
    slug: 'ultimate-guide-luxury-villa-vacation-india',
    title: 'The Ultimate Guide to Luxury Villa Vacations in India',
    excerpt: 'Everything you need to know about booking, experiencing, and making the most of your luxury villa stay across India\'s most stunning destinations.',
    content: `
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">India's luxury villa scene has evolved dramatically over the past decade. What was once a well-kept secret among discerning travelers has become one of the most sought-after accommodation experiences in the country. From the sun-drenched beaches of Goa to the misty mountains of Himachal, from the royal palaces of Rajasthan to the tranquil backwaters of Kerala, India offers an unparalleled diversity of luxury villa experiences.</p>

      <h2 class="text-2xl font-semibold mb-4 text-white">Why Choose a Luxury Villa Over a Hotel?</h2>
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">The villa experience fundamentally differs from even the most luxurious hotels. It's about privacy, personalization, and living like a local aristocrat. When you book a villa through SEASALT Hospitality, you're not just booking a room—you're gaining access to an entire estate, complete with dedicated staff, private amenities, and the freedom to create your own schedule.</p>

      <ul class="space-y-4 mb-8 text-white/80">
        <li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-goldAccent mt-2 flex-shrink-0"></span><span><strong>Complete Privacy:</strong> No shared walls, no corridor noise, no other guests. The entire property is yours.</span></li>
        <li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-goldAccent mt-2 flex-shrink-0"></span><span><strong>Personalized Service:</strong> Your butler, chef, and housekeeping team cater exclusively to you and your party.</span></li>
        <li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-goldAccent mt-2 flex-shrink-0"></span><span><strong>Culinary Freedom:</strong> Your in-house chef creates menus tailored to your preferences, dietary needs, and schedule.</span></li>
        <li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-goldAccent mt-2 flex-shrink-0"></span><span><strong>Space to Breathe:</strong> Multiple bedrooms, living areas, gardens, and outdoor spaces—perfect for families and groups.</span></li>
        <li class="flex items-start gap-3"><span class="w-2 h-2 rounded-full bg-goldAccent mt-2 flex-shrink-0"></span><span><strong>Authentic Experience:</strong> Stay in heritage properties, beachfront estates, or mountain chalets that reflect local architecture and culture.</span></li>
      </ul>

      <h2 class="text-2xl font-semibold mb-4 text-white">Top Villa Destinations in India</h2>

      <h3 class="text-xl font-semibold mb-3 text-white mt-8">Goa: Beachfront Bliss</h3>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">Goa remains India's premier villa destination. North Goa offers vibrant energy with easy access to beaches, nightlife, and markets. South Goa provides tranquil, pristine beaches perfect for relaxation. Our villas range from Portuguese-style heritage homes to ultra-modern architectural masterpieces, all with private pools and beach access.</p>

      <h3 class="text-xl font-semibold mb-3 text-white mt-8">Rajasthan: Royal Heritage</h3>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">Experience the grandeur of Rajasthan's royal past. Stay in restored palaces and havelis in Udaipur (the City of Lakes) and Jaipur (the Pink City). These properties often feature original frescoes, marble courtyards, and staff trained in traditional Rajasthani hospitality.</p>

      <h3 class="text-xl font-semibold mb-3 text-white mt-8">Kerala: Backwater Serenity</h3>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">Kerala's backwaters offer a completely unique villa experience. Private island villas accessible only by boat, surrounded by coconut palms and tranquil waters. Combine your stay with Ayurvedic treatments, houseboat cruises, and traditional Kerala cuisine.</p>

      <h3 class="text-xl font-semibold mb-3 text-white mt-8">Himachal & Ladakh: Mountain Majesty</h3>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">For those seeking altitude and adventure, the Himalayan destinations offer chalet-style villas with heated pools, fireplaces, and panoramic mountain views. Perfect for summer escapes and winter wonderland experiences.</p>

      <h2 class="text-2xl font-semibold mb-4 text-white mt-8">Planning Your Villa Vacation</h2>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">Booking a luxury villa requires more planning than a hotel, but the rewards are exponentially greater. Here's our step-by-step guide:</p>

      <ol class="space-y-4 mb-8 text-white/80 list-decimal list-inside">
        <li><strong>Define Your Dates Early:</strong> Peak season (Nov-Mar) books 6-12 months in advance. Shoulder seasons offer better availability and rates.</li>
        <li><strong>Choose Your Destination First:</strong> Each region offers a completely different experience. Consider what matters most: beaches, culture, mountains, or wellness.</li>
        <li><strong>Determine Your Group Size:</strong> Villas range from 2-bedroom romantic retreats to 10-bedroom estates. Match the property to your party.</li>
        <li><strong>List Your Must-Haves:</strong> Private pool? Chef? Beach access? Gym? Heritage architecture? Prioritize to narrow your search.</li>
        <li><strong>Consult Our Concierge:</strong> Our team knows every property personally and can match you with the perfect villa based on your preferences.</li>
        <li><strong>Book Early for Peak Season:</strong> The best properties book 6-12 months ahead for December-February.</li>
        <li><strong>Plan Your Experiences:</strong> Pre-book private chefs, spa treatments, excursions, and special celebrations.</li>
      </ol>

      <h2 class="text-2xl font-semibold mb-4 text-white">What's Included in Your SEASALT Villa Stay</h2>
      <p class="text-white/80 text-body-lg leading-relaxed mb-4">Every villa booked through SEASALT Hospitality includes:</p>

      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <ul class="space-y-2 text-white/80">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Dedicated butler service</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>In-house chef (meals at cost)</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Daily housekeeping</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>High-speed WiFi</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Air conditioning throughout</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Welcome amenities</li>
        </ul>
        <ul class="space-y-2 text-white/80">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>24/7 concierge support</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Airport transfer coordination</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Experience booking assistance</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Child-safety features (on request)</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Pet-friendly options available</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-goldAccent"></span>Event planning support</li>
        </ul>
      </div>

      <h2 class="text-2xl font-semibold mb-4 text-white">Insider Tips for the Perfect Villa Stay</h2>
      <div class="space-y-4 mb-8 text-white/80">
        <p><strong>Communicate Early:</strong> Share dietary restrictions, celebration plans, and activity preferences at least 2 weeks before arrival.</p>
        <p><strong>Trust Your Chef:</strong> Our chefs are experts in local and international cuisine. Share preferences, then let them surprise you with seasonal specialties.</p>
        <p><strong>Use Your Butler:</strong> From arranging airport transfers to booking sunset cruises, your butler is your single point of contact for everything.</p>
        <p><strong>Respect the Property:</strong> Many villas are heritage properties or architectural landmarks. Treat them with care.</p>
        <p><strong>Tip Generously:</strong> Staff work tirelessly to make your stay perfect. A pooled tip at checkout is customary and appreciated.</p>
      </div>

      <div className="bg-gradient-gold/10 border border-goldAccent/30 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-3">Ready to Plan Your Villa Escape?</h3>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          Browse our curated collection of 300+ luxury villas across India. Our concierge team is ready to match you with your perfect property.
        </p>
        <a href="/villas" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold text-white font-semibold text-lg hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
          Explore All Villas <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    `,
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
    author: 'Priya Sharma',
    authorRole: 'Travel Editor',
    publishDate: '2024-12-15',
    readTime: '12 min read',
    tags: ['Travel Tips', 'Villa Guide', 'India', 'Luxury Travel'],
    relatedPosts: [
      { slug: 'top-10-hidden-gem-villas-goa', title: 'Top 10 Hidden Gem Villas in Goa' },
      { slug: 'royal-rajasthan-palace-stays', title: 'Royal Rajasthan: Palace Stays Like a Maharaja' },
      { slug: 'kerala-backwater-villa-guide', title: 'Kerala Backwaters: A Villa Guide' },
    ],
  },
  'top-10-hidden-gem-villas-goa': {
    id: '2',
    slug: 'top-10-hidden-gem-villas-goa',
    title: 'Top 10 Hidden Gem Villas in Goa',
    excerpt: 'Discover Goa\'s best-kept secrets—exclusive villas tucked away from the crowds, offering privacy, luxury, and authentic Goan charm.',
    content: `
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">Goa's villa scene goes far beyond the famous beachfront properties everyone knows about. We've curated 10 exceptional hidden gems that offer something truly special—whether it's a 300-year-old Portuguese mansion, a cliffside retreat with a private cove, or an architectural marvel hidden in a spice plantation.</p>
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">Each of these villas has been personally vetted by our team. They're not on the mainstream booking platforms, and they offer experiences you simply can't find elsewhere.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
    author: 'Rahul Mehta',
    authorRole: 'Goa Specialist',
    publishDate: '2024-12-10',
    readTime: '15 min read',
    tags: ['Goa', 'Hidden Gems', 'Villa Recommendations'],
    relatedPosts: [
      { slug: 'ultimate-guide-luxury-villa-vacation-india', title: 'Ultimate Guide to Luxury Villa Vacations in India' },
      { slug: 'south-goa-vs-north-goa', title: 'South Goa vs North Goa: Which Is Right for You?' },
    ],
  },
  'royal-rajasthan-palace-stays': {
    id: '3',
    slug: 'royal-rajasthan-palace-stays',
    title: 'Royal Rajasthan: Palace Stays Like a Maharaja',
    excerpt: 'Experience the grandeur of Rajasthan\'s royal heritage. Stay in restored palaces and havelis where every detail whispers of regal splendor.',
    content: `
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">Rajasthan's royal heritage isn't just preserved in museums—it's alive in the restored palaces and havelis that now welcome guests as maharajas once welcomed honored dignitaries. From Udaipur's lake palaces to Jaipur's pink city havelis, experience the pinnacle of Indian hospitality.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    author: 'Vikram Singh',
    authorRole: 'Rajasthan Correspondent',
    publishDate: '2024-12-05',
    readTime: '10 min read',
    tags: ['Rajasthan', 'Palace Stays', 'Heritage', 'Udaipur', 'Jaipur'],
    relatedPosts: [
      { slug: 'udaipur-vs-jaipur', title: 'Udaipur vs Jaipur: Choosing Your Royal Escape' },
      { slug: 'ultimate-guide-luxury-villa-vacation-india', title: 'Ultimate Guide to Luxury Villa Vacations in India' },
    ],
  },
  'kerala-backwater-villa-guide': {
    id: '4',
    slug: 'kerala-backwater-villa-guide',
    title: 'Kerala Backwaters: A Villa Guide',
    excerpt: 'Navigate the enchanting world of Kerala\'s backwater villas. Private islands, houseboat combinations, and Ayurvedic wellness await.',
    content: `
      <p class="text-white/80 text-body-lg leading-relaxed mb-8">Kerala's backwaters form a unique ecosystem of canals, lagoons, and lakes parallel to the Arabian Sea. Staying in a backwater villa isn't just accommodation—it's immersion in a way of life that has existed for centuries. Wake to the sound of kingfishers, dine on karimeen pollichathu prepared by your private chef, and drift to sleep on a houseboat under starlit skies.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    author: 'Anjali Nair',
    authorRole: 'Kerala Specialist',
    publishDate: '2024-12-01',
    readTime: '11 min read',
    tags: ['Kerala', 'Backwaters', 'Ayurveda', 'Houseboats'],
    relatedPosts: [
      { slug: 'ayurveda-wellness-villas-kerala', title: 'Ayurveda Wellness Villas in Kerala' },
      { slug: 'ultimate-guide-luxury-villa-vacation-india', title: 'Ultimate Guide to Luxury Villa Vacations in India' },
    ],
  },
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogData[slug];

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}