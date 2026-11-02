import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DestinationDetailClient from './DestinationDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | SEASALT Hospitality`,
    description: `Explore ${slug.replace(/-/g, ' ')} - Luxury villas in ${slug.replace(/-/g, ' ')} with private pools, in-house chefs, and personalized concierge service.`,
  };
}

const destinationData: Record<string, any> = {
  'north-goa': {
    id: '1',
    name: 'North Goa',
    slug: 'north-goa',
    region: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
    villaCount: 24,
    description: 'North Goa is the vibrant heart of Goa\'s tourism, famous for its lively beaches, buzzing nightlife, and Portuguese heritage. From the bustling shores of Calangute and Baga to the quieter stretches of Morjim and Ashwem, North Goa offers a perfect blend of excitement and relaxation. The region is dotted with luxury villas nestled in coconut groves, many with private pools just steps from the Arabian Sea.',
    highlights: ['Calangute & Baga Beaches', 'Anjuna Flea Market', 'Fort Aguada', 'Chapora Fort', 'Vagator Beach', 'Morjim (Turtle Beach)'],
    bestTime: 'November to March',
    nearestAirport: 'Goa International Airport (GOI) - 45 km',
    villas: [
      { id: '1', name: 'Villa Serenity', price: 45000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '2', name: 'Coastal Breeze', price: 52000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '3', name: 'Ocean Pearl', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '4', name: 'Sunset Villa', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '5', name: 'Palm Haven', price: 42000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '6', name: 'Azure Retreat', price: 60000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Water Sports', 'Beach Hopping', 'Nightlife', 'Flea Markets', 'Fort Visits', 'Dolphin Watching', 'Sunset Cruises', 'Yoga Retreats'],
  },
  'south-goa': {
    id: '2',
    name: 'South Goa',
    slug: 'south-goa',
    region: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
    villaCount: 18,
    description: 'South Goa is the tranquil counterpart to its northern neighbor, offering pristine beaches, luxury resorts, and a serene atmosphere. Known for its unspoiled coastline, white-sand beaches like Palolem and Agonda, and a slower pace of life, South Goa is perfect for those seeking peace and natural beauty. Luxury villas here are often set in expansive tropical gardens with direct beach access.',
    highlights: ['Palolem Beach', 'Agonda Beach', 'Butterfly Beach', 'Cabo de Rama Fort', 'Colva Beach', 'Galjibaga Beach (Turtle Nesting)'],
    bestTime: 'November to March',
    nearestAirport: 'Goa International Airport (GOI) - 60 km',
    villas: [
      { id: '7', name: 'Coastal Paradise', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '8', name: 'Palolem Pearl', price: 58000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '9', name: 'Agonda Bliss', price: 52000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '10', name: 'Butterfly Bay', price: 65000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '11', name: 'Tranquil Shores', price: 45000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '12', name: 'Silent Sands', price: 50000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Beach Relaxation', 'Kayaking', 'Dolphin Spotting', 'Yoga & Meditation', 'Ayurvedic Spa', 'Sunset Watching', 'Beach Walks', 'Fishing Trips'],
  },
  'udaipur': {
    id: '3',
    name: 'Udaipur',
    slug: 'udaipur',
    region: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    villaCount: 12,
    description: 'Udaipur, the "City of Lakes," is Rajasthan\'s most romantic destination. Set around the shimmering Lake Pichola with the Aravalli Hills as backdrop, Udaipur captivates with its palaces, temples, and heritage havelis. Luxury villas here are often restored royal properties offering authentic regal experiences with modern amenities.',
    highlights: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Saheliyon Ki Bari', 'Fateh Sagar Lake', 'Monsoon Palace'],
    bestTime: 'October to March',
    nearestAirport: 'Maharana Pratap Airport (UDR) - 25 km',
    villas: [
      { id: '13', name: 'Palace by the Lake', price: 75000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '14', name: 'Royal Haveli', price: 68000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '15', name: 'Lakeview Mansion', price: 72000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '16', name: 'Heritage Villa', price: 58000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Boat Rides on Lake Pichola', 'City Palace Tour', 'Heritage Walks', 'Pottery Workshop', 'Miniature Painting', 'Sunset at Monsoon Palace', 'Rajasthani Cooking Class', 'Temple Visits'],
  },
  'jaipur': {
    id: '4',
    name: 'Jaipur',
    slug: 'jaipur',
    region: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80',
    villaCount: 15,
    description: 'Jaipur, the "Pink City," is a UNESCO World Heritage site and the capital of Rajasthan. Known for its magnificent forts, palaces, and vibrant bazaars, Jaipur offers a royal experience like no other. Luxury villas in Jaipur are often restored havelis in the historic quarter, featuring traditional architecture with modern luxuries.',
    highlights: ['Hawa Mahal', 'Amber Fort', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort', 'Albert Hall Museum'],
    bestTime: 'October to March',
    nearestAirport: 'Jaipur International Airport (JAI) - 12 km',
    villas: [
      { id: '17', name: 'Royal Heritage', price: 65000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
      { id: '18', name: 'Pink Palace', price: 70000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '19', name: 'Maharaja Villa', price: 85000, bedrooms: 6, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '20', name: 'Haveli Bliss', price: 55000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Amber Fort Elephant Ride', 'City Palace Tour', 'Jantar Mantar', 'Shopping in Bazaars', 'Rajasthani Thali', 'Hot Air Balloon', 'Nahargarh Sunset', 'Block Printing Workshop'],
  },
  'manali-shimla': {
    id: '5',
    name: 'Manali & Shimla',
    slug: 'manali-shimla',
    region: 'Himachal Pradesh, India',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
    villaCount: 22,
    description: 'The twin hill stations of Manali and Shimla in Himachal Pradesh offer breathtaking Himalayan vistas, pine forests, and year-round cool climate. From snow-capped peaks to apple orchards, this region is perfect for mountain lovers. Luxury villas here are chalet-style properties with heated pools, fireplaces, and panoramic mountain views.',
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hidimba Temple', 'Old Manali', 'Mall Road Shimla', 'Jakhu Temple', 'Kufri'],
    bestTime: 'March to June, September to December',
    nearestAirport: 'Kullu-Manali Airport (KUU) - 50 km / Shimla Airport (SLV) - 22 km',
    villas: [
      { id: '21', name: 'Mountain Escape', price: 35000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '22', name: 'Snow Peak Chalet', price: 42000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '23', name: 'Pine Valley Villa', price: 38000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '24', name: 'Himalayan Retreat', price: 45000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Skiing (Seasonal)', 'Paragliding', 'Trekking', 'River Rafting', 'Mountain Biking', 'Temple Visits', 'Apple Orchard Tours', 'Hot Springs'],
  },
  'kerala': {
    id: '6',
    name: 'Kerala',
    slug: 'kerala',
    region: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80',
    villaCount: 16,
    description: 'Kerala, "God\'s Own Country," is a tropical paradise of backwaters, beaches, and lush greenery. From the tranquil backwaters of Alleppey to the tea gardens of Munnar and the beaches of Kovalam, Kerala offers diverse experiences. Luxury villas range from private island retreats on the backwaters to cliffside properties overlooking the Arabian Sea.',
    highlights: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Kovalam Beach', 'Wayanad Wildlife', 'Kochi Heritage', 'Thekkady Periyar'],
    bestTime: 'October to March',
    nearestAirport: 'Cochin International Airport (COK) - 75 km / Trivandrum Airport (TRV)',
    villas: [
      { id: '25', name: 'Backwater Bliss', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '26', name: 'Coconut Grove', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '27', name: 'Spice Garden Villa', price: 52000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '28', name: 'Cliffside Haven', price: 60000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Houseboat Stay', 'Ayurvedic Treatments', 'Kathakali Performance', 'Spice Plantation Tour', 'Tea Garden Trek', 'Wildlife Safari', 'Beach Relaxation', 'Fishing'],
  },
  'leh-ladakh': {
    id: '7',
    name: 'Leh-Ladakh',
    slug: 'leh-ladakh',
    region: 'Ladakh, India',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    villaCount: 8,
    description: 'Leh-Ladakh is a high-altitude desert of stark beauty, ancient monasteries, and turquoise lakes. At 11,500+ feet, this region offers surreal landscapes of barren mountains, crystal-clear skies, and Buddhist culture. Luxury villas here are exclusive properties with heated floors, oxygen systems, and panoramic Himalayan views.',
    highlights: ['Pangong Lake', 'Nubra Valley', 'Monasteries (Thiksey, Hemis)', 'Magnetic Hill', 'Khardung La Pass', 'Tso Moriri'],
    bestTime: 'May to September',
    nearestAirport: 'Kushok Bakula Rimpochee Airport (IXL) - Leh',
    villas: [
      { id: '29', name: 'Ladakh Heights', price: 55000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80' },
      { id: '30', name: 'Monastery View', price: 60000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Monastery Tours', 'Pangong Lake Visit', 'Nubra Valley Camel Safari', 'River Rafting (Zanskar)', 'Mountain Biking', 'Stargazing', 'Meditation Retreats', 'High Pass Drives'],
  },
  'coorg': {
    id: '8',
    name: 'Coorg',
    slug: 'coorg',
    region: 'Karnataka, India',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
    villaCount: 10,
    description: 'Coorg (Kodagu) is the "Scotland of India" - a land of rolling hills, coffee plantations, and misty mornings. Known for its biodiversity, waterfalls, and Kodava culture, Coorg offers a serene escape in the Western Ghats. Luxury villas are often set within working coffee estates with infinity pools overlooking the valleys.',
    highlights: ['Coffee Plantations', 'Abbey Falls', 'Dubare Elephant Camp', 'Nagarhole National Park', 'Raja\'s Seat', 'Talakaveri'],
    bestTime: 'October to March',
    nearestAirport: 'Mangalore International Airport (IXE) - 135 km / Mysore Airport (MYQ) - 120 km',
    villas: [
      { id: '31', name: 'Coffee Estate Villa', price: 42000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
      { id: '32', name: 'Misty Mountains', price: 48000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    ],
    activities: ['Coffee Plantation Tour', 'Elephant Interaction', 'Wildlife Safari', 'Waterfall Trekking', 'Bird Watching', 'River Rafting', 'Kodava Cultural Experience', 'Spice Tour'],
  },
};

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinationData[slug];

  if (!destination) {
    notFound();
  }

  return <DestinationDetailClient destination={destination} />;
}