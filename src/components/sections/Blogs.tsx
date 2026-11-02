'use client';

import Link from 'next/link';
import { ChevronRight, Calendar, MapPin, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const blogs = [
  {
    slug: 'goa-private-pool-villas',
    title: 'Inside Goa\'s Most Private Luxury Pool Estates',
    excerpt: 'Discover the hidden gems of North Goa where luxury meets privacy in our handpicked villa collection.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'Goa',
    author: 'Sanket Thakur',
    date: '2026-10-26',
    readTime: '8 min read',
  },
  {
    slug: 'ladakh-luxury-gastronomy',
    title: 'Experiencing High-Altitude Luxury in Leh-Ladakh',
    excerpt: 'From private chefs to stargazing decks, explore how luxury is redefined at 11,000 feet.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    category: 'Ladakh',
    author: 'Priya Sharma',
    date: '2026-10-15',
    readTime: '6 min read',
  },
  {
    slug: 'udaipur-heritage-villas',
    title: 'Royal Heritage Meets Modern Private Pool Living',
    excerpt: 'Experience the grandeur of Rajasthan in villas that blend palace architecture with modern luxury.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    category: 'Udaipur',
    author: 'Rajesh Mehta',
    date: '2026-10-05',
    readTime: '7 min read',
  },
  {
    slug: 'manali-cedarwood-estates',
    title: 'Why Private Cedarwood Estates Are The Ultimate Mountain Retreat',
    excerpt: 'Escape to the Himalayas in villas that offer warmth, luxury, and breathtaking mountain views.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    category: 'Manali',
    author: 'Anita Desai',
    date: '2026-09-28',
    readTime: '5 min read',
  },
  {
    slug: 'kerala-backwater-villas',
    title: 'Serenity on the Backwaters: Kerala\'s Finest Villas',
    excerpt: 'Wake up to the gentle lapping of water in our curated collection of backwater-facing villas.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    category: 'Kerala',
    author: 'Vikram Nair',
    date: '2026-09-20',
    readTime: '6 min read',
  },
  {
    slug: 'jaipur-palace-villas',
    title: 'Living Like Royalty in Jaipur\'s Heritage Villas',
    excerpt: 'From restored havelis to modern palaces, discover Jaipur\'s most exclusive private stays.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    category: 'Jaipur',
    author: 'Meera Singh',
    date: '2026-09-12',
    readTime: '8 min read',
  },
];

export default function Blogs() {
  return (
    <section className="section-py bg-gray-50">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Journal</span>
            <h2 className="text-display-sm mt-2">SEASALT Hospitality <span className="script-accent font-normal text-luxPink">Blogs</span></h2>
            <p className="text-body-md text-gray-600 mt-2 max-w-md">
              Stories, places and moments that inspire a way of experiencing the world with calm, beauty and truth.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-luxPink hover:bg-luxPinkHover text-white font-semibold rounded-full transition-all self-start sm:self-auto"
          >
            Discover
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">{blog.category}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(blog.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-luxPink transition-colors">{blog.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&q=80" alt={blog.author} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                  </div>
                  <span className="text-sm font-semibold text-luxPink group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read more
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-luxPink hover:bg-luxPinkHover text-white font-semibold rounded-full transition-all"
          >
            View All Blogs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}