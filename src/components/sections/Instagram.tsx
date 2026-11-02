'use client';

import Link from 'next/link';
import { Instagram as InstagramIcon, ChevronRight, Heart, MessageCircle } from 'lucide-react';

const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', likes: '12.4k', comments: '234' },
  { image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', likes: '8.7k', comments: '156' },
  { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', likes: '15.2k', comments: '312' },
  { image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', likes: '9.3k', comments: '189' },
  { image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80', likes: '11.8k', comments: '267' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', likes: '7.9k', comments: '134' },
];

export default function Instagram() {
  return (
    <section className="section-py bg-luxTeal text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-luxTeal/90 to-luxTeal" />
      <div className="relative container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {instagramPosts.map((post, i) => (
            <a key={i} href="https://instagram.com/seasalthospitality" target="_blank" rel="noopener noreferrer" className="group relative rounded-2xl overflow-hidden aspect-square">
              <img src={post.image} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </div>
              </div>
              <InstagramIcon className="absolute top-3 left-3 w-5 h-5 text-white/80" />
            </a>
          ))}
        </div>

        <div className="text-center max-w-lg mx-auto mb-10">
          <h3 className="text-display-sm font-medium leading-snug mb-6">
            Traveling is a way of being.<br />Discover the little moments you\'ll cherish with us.
          </h3>
          <Link
            href="https://instagram.com/seasalthospitality"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-lg"
          >
            <InstagramIcon className="w-5 h-5 text-luxPink" />
            MORE ON INSTAGRAM
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}