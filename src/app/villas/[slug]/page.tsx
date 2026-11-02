import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VillaDetailClient from './VillaDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | SEASALT Hospitality`,
    description: `Book ${slug.replace(/-/g, ' ')} - Luxury villa with private pool, in-house chef, and personalized concierge service.`,
  };
}

const villaData: Record<string, any> = {
  'villa-serenity': {
    id: '1',
    name: 'Villa Serenity',
    slug: 'villa-serenity',
    location: 'North Goa, India',
    price: 45000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    description: 'Nestled in the heart of North Goa, Villa Serenity offers an unparalleled luxury experience with its private infinity pool overlooking the Arabian Sea. This 4-bedroom sanctuary combines contemporary design with traditional Goan architecture, featuring handcrafted teak furniture, imported marble flooring, and floor-to-ceiling windows that frame breathtaking ocean views.',
    amenities: ['Private Infinity Pool', 'In-house Chef', 'Butler Service', 'Daily Housekeeping', 'High-speed WiFi', 'Air Conditioning', 'Smart Home System', 'Home Theater', 'Gym', 'Wine Cellar', 'Beach Access', 'Rooftop Terrace', 'BBQ Area', 'Garden', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.9,
    reviews: 127,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'No smoking indoors. No parties or events. Pets not allowed. Check-in after 2 PM. Check-out before 11 AM.',
    cancellationPolicy: 'Free cancellation up to 30 days before check-in. 50% refund up to 14 days before. No refund within 14 days.',
    nearbyAttractions: ['Calangute Beach (2 km)', 'Baga Beach (3 km)', 'Fort Aguada (5 km)', 'Anjuna Market (8 km)', 'Goa Airport (45 km)'],
  },
  'palace-by-the-lake': {
    id: '2',
    name: 'Palace by the Lake',
    slug: 'palace-by-the-lake',
    location: 'Udaipur, Rajasthan',
    price: 75000,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    description: 'Experience royal living at Palace by the Lake, a heritage property restored to its former glory on the banks of Lake Pichola. This 5-bedroom palace features original frescoes, marble jharokhas, and antique furnishings alongside modern luxuries. Wake up to views of the City Palace and Jag Mandir from your private terrace.',
    amenities: ['Private Pool', 'In-house Chef', 'Butler Service', 'Daily Housekeeping', 'High-speed WiFi', 'Air Conditioning', 'Heritage Tours', 'Boat Rides', 'Spa Services', 'Yoga Deck', 'Rooftop Dining', 'Library', 'Wine Cellar', 'Parking', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.9,
    reviews: 89,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'No smoking in heritage areas. Respect quiet hours 10 PM - 8 AM. No external guests without prior approval. Heritage items not to be moved.',
    cancellationPolicy: 'Free cancellation up to 45 days before check-in. 50% refund up to 21 days before. No refund within 21 days.',
    nearbyAttractions: ['City Palace (500 m)', 'Lake Pichola (100 m)', 'Jag Mandir (1 km)', 'Saheliyon Ki Bari (3 km)', 'Udaipur Airport (25 km)'],
  },
  'mountain-escape': {
    id: '3',
    name: 'Mountain Escape',
    slug: 'mountain-escape',
    location: 'Manali, Himachal Pradesh',
    price: 35000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    description: 'Perched at 8,000 feet in the Himalayas, Mountain Escape offers panoramic views of snow-capped peaks and pine forests. This 3-bedroom chalet features stone walls, wooden beams, and cozy fireplaces in every room. Perfect for families seeking adventure and tranquility in equal measure.',
    amenities: ['Private Pool (Heated)', 'In-house Chef', 'Caretaker Onsite', 'Daily Housekeeping', 'High-speed WiFi', 'Heating System', 'Fireplace', 'Mountain Bikes', 'Trekking Guide', 'Indoor Games', 'Rooftop Terrace', 'Garden', 'Parking', 'Doctor on Call'],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.8,
    reviews: 156,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'No smoking indoors. Conserve water and electricity. Respect local wildlife. No loud music after 9 PM. Trekking only with approved guides.',
    cancellationPolicy: 'Free cancellation up to 30 days before check-in. 50% refund up to 14 days before. No refund within 14 days.',
    nearbyAttractions: ['Solang Valley (5 km)', 'Rohtang Pass (25 km)', 'Hidimba Temple (8 km)', 'Old Manali (10 km)', 'Kullu Airport (50 km)'],
  },
  'backwater-bliss': {
    id: '4',
    name: 'Backwater Bliss',
    slug: 'backwater-bliss',
    location: 'Kerala, India',
    price: 55000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    description: 'Float in luxury on Kerala\'s famous backwaters at Backwater Bliss. This 4-bedroom villa sits on a private island accessible only by boat, surrounded by coconut palms and tranquil waters. Experience authentic Kerala with Ayurvedic treatments, traditional cuisine, and houseboat excursions.',
    amenities: ['Private Pool', 'In-house Chef (Kerala Cuisine)', 'Butler Service', 'Daily Housekeeping', 'High-speed WiFi', 'Air Conditioning', 'Ayurvedic Spa', 'Private Houseboat', 'Kayaking', 'Fishing', 'Yoga Deck', 'Rooftop Terrace', 'Garden', 'Parking', 'Boat Transfer'],
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.9,
    reviews: 203,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'No plastic waste in backwaters. Respect local fishing community. No motorized water sports near villa. Quiet hours 10 PM - 7 AM.',
    cancellationPolicy: 'Free cancellation up to 30 days before check-in. 50% refund up to 14 days before. No refund within 14 days.',
    nearbyAttractions: ['Alleppey Backwaters (0 km)', 'Marari Beach (15 km)', 'Kumarakom Bird Sanctuary (20 km)', 'Fort Kochi (50 km)', 'Cochin Airport (75 km)'],
  },
  'royal-heritage': {
    id: '5',
    name: 'Royal Heritage',
    slug: 'royal-heritage',
    location: 'Jaipur, Rajasthan',
    price: 65000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    description: 'Step into Rajasthan\'s royal legacy at Royal Heritage, a restored haveli in the heart of Jaipur\'s historic quarter. This 4-bedroom property features hand-painted frescoes, marble courtyards, and a private pool courtyard. Experience palace living with modern amenities in the Pink City.',
    amenities: ['Private Pool Courtyard', 'In-house Chef (Rajasthani Cuisine)', 'Butler Service', 'Daily Housekeeping', 'High-speed WiFi', 'Air Conditioning', 'Heritage Walks', 'Elephant Sanctuary Visit', 'Pottery Workshop', 'Rooftop Dining', 'Library', 'Wine Cellar', 'Parking', '24/7 Security'],
    images: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.8,
    reviews: 94,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'Respect heritage property. No smoking in courtyard. Traditional attire encouraged for dinner. No drones without permission.',
    cancellationPolicy: 'Free cancellation up to 45 days before check-in. 50% refund up to 21 days before. No refund within 21 days.',
    nearbyAttractions: ['Hawa Mahal (1 km)', 'City Palace (1.5 km)', 'Jantar Mantar (1.5 km)', 'Amber Fort (8 km)', 'Jaipur Airport (12 km)'],
  },
  'coastal-paradise': {
    id: '6',
    name: 'Coastal Paradise',
    slug: 'coastal-paradise',
    location: 'South Goa, India',
    price: 48000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    description: 'Discover pristine beaches and laid-back luxury at Coastal Paradise in South Goa. This 3-bedroom beachfront villa offers direct access to a secluded stretch of golden sand. With Portuguese-inspired architecture, tropical gardens, and a beachfront infinity pool, it\'s the ultimate Goan escape.',
    amenities: ['Beachfront Infinity Pool', 'In-house Chef (Goan & Continental)', 'Butler Service', 'Daily Housekeeping', 'High-speed WiFi', 'Air Conditioning', 'Beach Access', 'Water Sports', 'Sunset Deck', 'BBQ Area', 'Garden', 'Parking', 'Beach Shuttle'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
    ],
    rating: 4.7,
    reviews: 78,
    checkIn: '14:00',
    checkOut: '11:00',
    houseRules: 'No glass on beach. Respect turtle nesting areas (seasonal). No beach fires. Quiet hours 11 PM - 7 AM. Beach towels provided.',
    cancellationPolicy: 'Free cancellation up to 30 days before check-in. 50% refund up to 14 days before. No refund within 14 days.',
    nearbyAttractions: ['Palolem Beach (500 m)', 'Agonda Beach (3 km)', 'Cabo de Rama Fort (15 km)', 'Butterfly Beach (8 km)', 'Goa Airport (60 km)'],
  },
};

export default async function VillaDetailPage({ params }: Props) {
  const { slug } = await params;
  const villa = villaData[slug];

  if (!villa) {
    notFound();
  }

  return <VillaDetailClient villa={villa} />;
}