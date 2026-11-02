import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionDetailClient from './CollectionDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Collection | SEASALT Hospitality`,
    description: `Explore our ${slug.replace(/-/g, ' ')} collection - Handpicked luxury villas with private pools, in-house chefs, and personalized experiences.`,
  };
}

const collectionData: Record<string, any> = {
  'private-pool': {
    id: 'private-pool',
    name: 'Private Pool Villas',
    slug: 'private-pool',
    tag: 'private-pool',
    icon: 'Waves',
    count: 156,
    description: 'Our most sought-after collection featuring villas with exclusive private pools. From infinity edges overlooking the ocean to secluded garden pools, each property offers your own aquatic sanctuary.',
    highlights: ['Infinity Pools', 'Heated Pools', 'Poolside Cabanas', 'Underwater Lighting', 'Pool Bars'],
    destinations: ['North Goa', 'South Goa', 'Udaipur', 'Kerala', 'Coorg'],
    villas: [
      { id: '1', name: 'Villa Serenity', location: 'North Goa', price: 45000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '2', name: 'Palace by the Lake', location: 'Udaipur', price: 75000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '3', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '4', name: 'Coastal Paradise', location: 'South Goa', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '5', name: 'Mountain Escape', location: 'Manali', price: 35000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '6', name: 'Royal Heritage', location: 'Jaipur', price: 65000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'pet-friendly': {
    id: 'pet-friendly',
    name: 'Pet-Friendly Villas',
    slug: 'pet-friendly',
    tag: 'pet-friendly',
    icon: 'Dog',
    count: 89,
    description: 'Travel with your furry family members. These villas welcome pets with open arms - featuring fenced gardens, pet beds, bowls, and nearby walking trails. No need to leave your four-legged friends behind.',
    highlights: ['Fenced Gardens', 'Pet Beds & Bowls', 'Walking Trails', 'Pet-Sitting Service', 'Vet on Call'],
    destinations: ['North Goa', 'South Goa', 'Coorg', 'Manali', 'Kerala'],
    villas: [
      { id: '7', name: 'Coastal Paradise', location: 'South Goa', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '8', name: 'Mountain Escape', location: 'Manali', price: 35000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '9', name: 'Coffee Estate Villa', location: 'Coorg', price: 42000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'weddings': {
    id: 'weddings',
    name: 'Wedding & Celebration Villas',
    slug: 'weddings',
    tag: 'weddings',
    icon: 'Heart',
    count: 67,
    description: 'Create unforgettable celebrations in stunning venues. These villas offer expansive lawns, banquet halls, and dedicated event teams for weddings, anniversaries, and milestone celebrations.',
    highlights: ['Event Lawns', 'Banquet Halls', 'Event Planning', 'Catering Partners', 'Decor Services', 'Guest Accommodation'],
    destinations: ['Udaipur', 'Jaipur', 'North Goa', 'Kerala', 'Coorg'],
    villas: [
      { id: '10', name: 'Palace by the Lake', location: 'Udaipur', price: 75000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '11', name: 'Royal Heritage', location: 'Jaipur', price: 65000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
      { id: '12', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'workation': {
    id: 'workation',
    name: 'Workation & Long Stays',
    slug: 'workation',
    tag: 'workation',
    icon: 'Zap',
    count: 45,
    description: 'Perfect for remote work and extended stays. High-speed WiFi, dedicated workspaces, meeting rooms, and special monthly rates. Combine productivity with paradise.',
    highlights: ['High-Speed WiFi', 'Dedicated Workspace', 'Meeting Rooms', 'Monthly Rates', 'Printing Services', 'Tech Support'],
    destinations: ['North Goa', 'South Goa', 'Kerala', 'Coorg', 'Udaipur'],
    villas: [
      { id: '13', name: 'Villa Serenity', location: 'North Goa', price: 45000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '14', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '15', name: 'Coffee Estate Villa', location: 'Coorg', price: 42000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'family': {
    id: 'family',
    name: 'Family & Kid-Friendly',
    slug: 'family',
    tag: 'family',
    icon: 'Baby',
    count: 78,
    description: 'Designed for family memories. Child-safe pools, kids\' clubs, game rooms, babysitting services, and family suites. Everything you need for a stress-free family vacation.',
    highlights: ['Child-Safe Pools', 'Kids Club', 'Game Rooms', 'Babysitting', 'Family Suites', 'Kids Menu'],
    destinations: ['North Goa', 'South Goa', 'Kerala', 'Coorg', 'Manali'],
    villas: [
      { id: '16', name: 'Villa Serenity', location: 'North Goa', price: 45000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '17', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
      { id: '18', name: 'Mountain Escape', location: 'Manali', price: 35000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'romantic': {
    id: 'romantic',
    name: 'Romantic Getaways',
    slug: 'romantic',
    tag: 'romantic',
    icon: 'Heart',
    count: 54,
    description: 'Intimate escapes for couples. Private pools, candlelit dinners, couples\' spa treatments, and secluded locations. Perfect for honeymoons, anniversaries, and romantic retreats.',
    highlights: ['Private Pools', 'Candlelit Dinners', 'Couples Spa', 'Secluded Locations', 'Sunset Views', 'In-Room Dining'],
    destinations: ['Udaipur', 'South Goa', 'Kerala', 'Coorg', 'Manali'],
    villas: [
      { id: '19', name: 'Palace by the Lake', location: 'Udaipur', price: 75000, bedrooms: 5, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: '20', name: 'Coastal Paradise', location: 'South Goa', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '21', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'beachfront': {
    id: 'beachfront',
    name: 'Beachfront Villas',
    slug: 'beachfront',
    tag: 'beachfront',
    icon: 'Waves',
    count: 34,
    description: 'Wake up to the sound of waves. Direct beach access, ocean views from every room, and beachfront infinity pools. The ultimate coastal luxury experience.',
    highlights: ['Direct Beach Access', 'Ocean Views', 'Beachfront Pools', 'Water Sports', 'Sunset Decks', 'Beach Dining'],
    destinations: ['North Goa', 'South Goa', 'Kerala'],
    villas: [
      { id: '22', name: 'Villa Serenity', location: 'North Goa', price: 45000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
      { id: '23', name: 'Coastal Paradise', location: 'South Goa', price: 48000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
      { id: '24', name: 'Backwater Bliss', location: 'Kerala', price: 55000, bedrooms: 4, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'mountain': {
    id: 'mountain',
    name: 'Mountain & Hill Station',
    slug: 'mountain',
    tag: 'mountain',
    icon: 'Mountain',
    count: 42,
    description: 'Breathe in the mountain air. Panoramic Himalayan views, pine forests, crisp weather, and cozy fireplaces. Perfect for adventure seekers and peace lovers alike.',
    highlights: ['Mountain Views', 'Heated Pools', 'Fireplaces', 'Trekking Access', 'Bonfire Areas', 'Mountain Bikes'],
    destinations: ['Manali & Shimla', 'Leh-Ladakh', 'Coorg'],
    villas: [
      { id: '25', name: 'Mountain Escape', location: 'Manali', price: 35000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
      { id: '26', name: 'Ladakh Heights', location: 'Leh-Ladakh', price: 55000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80' },
      { id: '27', name: 'Coffee Estate Villa', location: 'Coorg', price: 42000, bedrooms: 3, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80' },
    ],
  },
};

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = collectionData[slug];

  if (!collection) {
    notFound();
  }

  return <CollectionDetailClient collection={collection} />;
}