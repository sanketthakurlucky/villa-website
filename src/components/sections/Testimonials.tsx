'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sanjana Shah',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Booked our Goa villa through SEASALT and it was the best decision we made. Great variety to choose from, beautiful interiors, modern amenities, and a very comfortable stay throughout. Would absolutely recommend!',
    stay: 'Goa, 4 nights',
  },
  {
    id: 2,
    name: 'Karthik Nair',
    location: 'Bangalore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'SEASALT made our holiday one to truly remember. The hospitality was top-notch and the villa staff went above and beyond for us. Three days were not enough — we\'re already planning our next visit!',
    stay: 'Udaipur, 3 nights',
  },
  {
    id: 3,
    name: 'Dilip Suthar',
    location: 'Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Had a lovely and comfortable stay booked through SEASALT. The team coordinated everything perfectly from start to finish. The entire team was super helpful and made us feel right at home.',
    stay: 'Kerala, 5 nights',
  },
  {
    id: 4,
    name: 'Richa Agarwal',
    location: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'The villa was stunning, the staff was warm and friendly, and every little detail was taken care of. An experience we will cherish for a long time. Thank you!',
    stay: 'Manali, 4 nights',
  },
  {
    id: 5,
    name: 'Harsh Jain',
    location: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Our Goa trip with SEASALT was simply fantastic. The team\'s care and coordination from check-in to check-out was seamless and thoughtful. Excellent service all around.',
    stay: 'North Goa, 6 nights',
  },
  {
    id: 6,
    name: 'Parth Dalal',
    location: 'Surat',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'The villa was beautiful and the service staff was incredibly prompt and attentive. The food prepared for us was delicious and tailored exactly to our preferences. A flawless stay.',
    stay: 'South Goa, 4 nights',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="section-py bg-gray-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-luxPink uppercase tracking-wider">Testimonials</span>
          <h2 className="text-display-sm mt-2">Real Stories, <span className="script-accent font-normal text-luxPink">Real Stays</span></h2>
          <p className="text-body-md text-gray-600 mt-4">
            Overheard from travellers who experienced the SEASALT difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, i) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-luxPink/30 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.stay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all',
                i === currentIndex ? 'bg-luxPink w-8' : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/reviews" className="inline-flex items-center gap-2 text-sm font-medium text-luxPink hover:text-luxPinkHover">
            Read All Reviews
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}